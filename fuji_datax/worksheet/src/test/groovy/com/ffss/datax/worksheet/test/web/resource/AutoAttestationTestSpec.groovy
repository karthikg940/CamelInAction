package com.ffss.datax.worksheet.test.web.resource

import org.springframework.http.MediaType;
import com.ffss.datax.worksheet.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.worksheet.test.base.WebAppIntegrationBaseSpecification

import groovy.json.JsonOutput;
import groovy.json.JsonSlurper
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@TransactionalWebIntegrationTest
class AutoAttestationTestSpec extends WebAppIntegrationBaseSpecification {

	/*def 'check POC and Attending are same' (studyId,preferenceatt,preferenceqa) {
	 given: 'we have preference call and users id'
	 def token = WorksheetTestData.token1
	 when: 'both the users are same and attending preference is true'
	 def res=this.mockMvc.perform(get("/api/study/${studyId}/user")
	 .header("Authorization","Bearer "+token)
	 .accept(MediaType.APPLICATION_JSON))
	 then: 'we expect the status as true'
	 res.andExpect(status().isOk())
	 def result = new JsonSlurper().parseText(res.andReturn().response.contentAsString)
	 assert result.status == true
	 where:
	 studyId << [76000000010016]
	 preferenceatt << [false]
	 preferenceqa << [true]
	 }*/

	def 'attending Auto Attest signature'(wrkshtData, expectedStatus) {
		given: 'we are getting Signature for attestation'
		when: 'Got signature part from UI'
		def respForWrksht = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+WorksheetTestData.token1)
				.content(JsonOutput.toJson(wrkshtData))
				.contentType(MediaType.APPLICATION_JSON))
		then: 'The worksheet gets saved'
		respForWrksht.andExpect(status().is(201))

		String[] wrkshtFrag= respForWrksht.andReturn().response.headers['Location'].value.split("/");
		String wrkshtId =  wrkshtFrag[wrkshtFrag.length-1];
		
		when: 'we have data for save signature'
		def response = this.mockMvc.perform(post("/api/template/sign/attested")
				.header("Authorization","Bearer "+WorksheetTestData.token1)
				.content(JsonOutput.toJson(SignatureTestData.insertSignature(wrkshtId,'poc')))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'save signature and we expect status'
		response.andExpect(status().is(expectedStatus))

		String[] frag= response.andReturn().response.headers['Location'].value.split("/");
		String signId =  frag[frag.length-1];
		

		if(expectedStatus == 201){
			def res = this.mockMvc.perform(delete("/api/template/attested/sign/${signId}")
					.header("Authorization","Bearer "+WorksheetTestData.token1)
					.accept(MediaType.APPLICATION_JSON))

			then: 'delete signatures and we expect status'
			res.andExpect(status().isOk())
		}

		where:
		wrkshtData << [WorksheetTestData.saveData[0]]
		expectedStatus << [201]
	}

	/*def 'Delete attending Auto Attest signature'(signatureData, expectedStatus) {
	 given: 'we are getting workSheetId for remove sign'
	 def response = this.mockMvc.perform(post("/api/template/sign/attested")
	 .header("Authorization","Bearer "+WorksheetTestData.token1)
	 .content(JsonOutput.toJson(signatureData))
	 .contentType(MediaType.APPLICATION_JSON))
	 when: 'we have signature data'
	 String[] frag= response.andReturn().response.headers['Location'].value.split("/");
	 String signId =  frag[frag.length-1];
	 
	 def res = this.mockMvc.perform(delete("/api/template/attested/sign/${signId}")
	 .header("Authorization","Bearer "+WorksheetTestData.token1)
	 .accept(MediaType.APPLICATION_JSON))
	 then: 'delete signatures and we expect status'
	 res.andExpect(status().isOk())
	 where:
	 signatureData << [SignatureTestData.insertSignatureForPoc(3)]
	 expectedStatus << [201]
	 }*/
}
