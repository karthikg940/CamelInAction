package com.ffss.datax.study.content.generator.plugin

import groovy.json.JsonSlurper

import com.google.common.collect.ArrayListMultimap
import com.google.common.collect.Multimap

abstract class AbstractACEPGeneratorPlugin implements GeneratorPlugin{

	abstract Object transformOther(data)

	def engine = new groovy.text.SimpleTemplateEngine()
	def processedTopics =[]
	def sectionLevelNarration
	
	def transform(worksheet){
		transformWorksheet(worksheet)
	}

	def transformWorksheet(worksheet) {
		def narrations = [:]
		
		def worksheetContent = new JsonSlurper().parseText(worksheet.content)
		def templateContent = new JsonSlurper().parseText(worksheet.template.templateContent)
		templateContent.sections.each {section ->
			def questions = section.topics
			sectionLevelNarration  = new StringBuilder()
			def selections = worksheetContent."${templateContent.id}"."${section.id}"
			if (selections) {
				processedTopics = []
				narrations.put(section.sectionNum, "${section.title}${transformSelections(questions, selections)}")
			} else{
				narrations.put(section.sectionNum,"${section.noSectionFound}")
			}
		}
		narrations
	}

	def transformSelections(questions, selections){
		questions.each { question ->
			sectionLevelNarration.append(selections."${question.id}" || selections.value?this."transform${question.dataFormat}"(question, selections):'')
			if(question.topics && selections."${question.id}"){
				transformSelections(question.topics,selections."${question.id}")
			}
		}
		sectionLevelNarration
	}
	def transformOptions(question, selections){ 
		def positiveOptions = []
		def negativeOptions = []
		def template = ''
		def questionMap = [:]
		Multimap<String, String> negValueTypeMap = ArrayListMultimap.create();
		def selectedValues = [:]
		def templateStr
		if (selections.containsKey(question.id)){
			selectedValues.put("values", selections."${question.id}".value)
		} else if (selections.containsKey("value")){
			selectedValues.put("values", selections.get("value"))
		}
		selectedValues.values.each {chosenOption, valueType->
			for(def i = 0 ; i < question.options.size(); i++){
				def configuredAnswer = question.options[i]
				if(configuredAnswer.topics && !processedTopics.contains(configuredAnswer.topics.id)){
					def selVal = selectedValues.values
					def topicId = configuredAnswer.topics.id
					if(selVal."${topicId[0]}"){
						processedTopics.add(configuredAnswer.topics.id)
						transformSelections(configuredAnswer.topics,selVal."${topicId[0]}")
					}
				}
				if (configuredAnswer.id == chosenOption || configuredAnswer.id == valueType){
					if (configuredAnswer.valueType == "positive") {
						positiveOptions.add(chosenOption)
						questionMap.put(question.positive,question.options[i].name)
					} else if(configuredAnswer.valueType == "negative"){
						negativeOptions.add(chosenOption)
						if(questionMap.containsKey(question.negative)){
							def name = question.options[i].name
							negValueTypeMap.put(question.negative, name)
						}else{
							questionMap.put(question.negative, question.options[i].name)
						}
					}
					break
				}
			}
		}
		questionMap.each{key, value ->
			template += engine.createTemplate(key).make([values:positiveOptions?positiveOptions.join(',~'):negativeOptions.join(',~'), name: value])
		}

		if(negValueTypeMap){
			def keySet = negValueTypeMap.keySet()
			def keyIterator = keySet.iterator()
			while (keyIterator.hasNext() ) {
				def key = (String) keyIterator.next()
				def value = negValueTypeMap.get(key).toString().replaceAll("[\\[\\]]","").replaceAll(", ","~")
				template += engine.createTemplate(key).make([values:negativeOptions?negativeOptions.join(','):'', name: value])
			}
		}
		if (!questionMap) {
			template += engine.createTemplate(question.noSelection?question.noSelection:'').make([values:positiveOptions.join(','), name: question.name])
		}
		template.toString()
	}

	def transformText(question, selections){
		def data = [name: question.name]
		// FIXME - Make this dynamic
		if (selections.containsKey(question.id)){
			data.put("values", selections."${question.id}".value)
		} else if (selections.containsKey("value")){
			data.put("values", selections.get("value"))
		}
		engine.createTemplate(question.narration).make(data)
	}
}
