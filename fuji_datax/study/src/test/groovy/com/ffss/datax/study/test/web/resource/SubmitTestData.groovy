package com.ffss.datax.study.test.web.resource

class SubmitTestData {

	static def msh = ['', '^~\\&', 'dataXUS', 'sendingFacility', 'EMR', 'receivingFacility', '', '', 'ORU^R01', '', 'P', '2.6']
	static def pid = ['1', '6000000000101', '98765^iviz', "Williams^John^^^", '', 'M']
	static def pv1 = ['1002^Doe^Cris', '']
	static def obr = ['1', '1000001', '10000000025', '9001^Cardiac']
	static def obx_indications = [
		'1',
		'TX',
		'^9001^Cardiac',
		'1',
		'Indications Summary:~Patient shows indications of cardiac-arrest,~hypotension~Comments: otherIndicationsComment'
	]
	static def obx_views = [
		'2',
		'TX',
		'^9001^Cardiac',
		'2',
		'~Views Summary:~Adequate views of subxiphoid-4-chamber is obtained~Limited views of parasternal-long-axis is obtained~Adequate views of parasternal-short-axis is obtained~Limited views of subxiphoid-long-axis-ivc-view is obtained~Views not obtained for apical-four-chamber~Comments: otherViewsComment'
	]
	static def obx_findings = [
		'3',
		'TX',
		'^9001^Cardiac',
		'3',
		'~Findings Summary:~pericardial-effusion is Present and the Size is Small~evidence-of-tamponade:IVC plethoric~global-ventricular-function is Hyperdynamic~right-ventricular-size is Normal~Signs of RV Strain :Tricuspid Regurgitation - Max Velocity is 23(m/s)~Signs of RV Strain : mcconnells-sign,~paradoxical-septal-motion,~rv-hypertrophy,~rv-hypokinesis,~tricuspid-regurgitation~thoracic-aorta is Absent~Size of Aortic Root is 1mm~Size of Thoracic Aorta Diameter is 1mm~ivc is Indeterminate~Maximum Diameter Size is 1mm~Minimum Diameter Size is 1mm~collapse is  lesser than 50%~Comments:otherFindingscomment'
	]
	static def obx_interpretations = [
		'4',
		'TX',
		'^9001^Cardiac',
		'4',
		'~Interpretations Summary:~Size of Pericardial Effusion is Moderate~global-ventricular-option is Hyperdynamic~No evidence of sonographic aortic root dilation~The patient found with depletion,~dilated-aortic-root,~dilatedIVC,~global-ventricular-function,~pericardialeffusion,~rv-dilation~No sonographic evidence of significant cardiac dysfunction~No cardiac activity/Cardiac standstill~No sonographic evidence of significant pericardial effusion~No sonographic evidence of RV size dilation~No sonographic evidence of volume depletion~Comments: otherintepretationscomment'
	]

	static def contentWithoutResult = ["wrk1":["examoverview":["type":"Diagnostic","category":"Symptom based","exam":"Initial exam"]]]

	static def contentWithIndications = ["wrk1":["examoverview":["type":"Diagnostic","category":"Symptom based","exam":"Initial exam"],
			"findings": [
				"right-ventricular-size": [ "value": [ "right-ventricular-size": "normal" ],
					"signs-of-rv-strian": [ "value": [ "rv-hypokinesis": true, "paradoxical-septal-motion": true, "mcconnells-sign": true,
							"tricuspid-regurgitation": true, "max-velocity": [ "value": "23" ], "rv-hypertrophy": true ] ] ],
				"others": [ "value": "otherFindingscomment" ] ],

			"interpretations": [ "standard": [ "value": [ "cardiac-dysfunction": true, "pericardial-effusion": true, "pericardialeffusion": true,
						"pericardialeffusion-size": [ "value": [ "pericardialeffusion-size": "moderate" ] ],
						"global-ventricular-option": [ "value": [ "global-ventricular-option": "hyperdynamic" ] ],"global-ventricular-function": true, "cardiac-standstill": true, "size-dilation": true, "rv-dilation": true,
						"volume-depletion": true, "depletion": true, "dilatedIVC": true, "aortic-root": true, "dilated-aortic-root": true ] ],
				"others": [ "value": "otherintepretationscomment" ] ]

		]]

	static def cardiacTestData = ["wrk1":["examoverview":["type":"Diagnostic","category":"Symptom based","exam":"Initial exam"],
			"indications": ["default": ["value": ["cardiac-arrest": true,"hypotension": true]],"others": ["value": "otherIndicationsComment"]],
			"views": ["subxiphoid-4-chamber": ["value": ["subxiphoid-4-chamber": "adequate"]],
				"parasternal-long-axis": ["value": ["parasternal-long-axis": "limited"]],
				"parasternal-short-axis": ["value": ["parasternal-short-axis": "adequate"]],
				"subxiphoid-long-axis-ivc-view": ["value": ["subxiphoid-long-axis-ivc-view": "limited"]],
				"apical-four-chamber": ["value": ["apical-four-chamber": "not-obtained"]],
				"others": ["value": "otherViewsComment"]],
			"findings": [ "pericardial-effusion": [ "value": [ "pericardial-effusion": "present" ], "if-present": [ "value": [ "if-present": "small" ] ],
					"evidence-of-tamponade": [ "value": [ "evidence-of-tamponade": "ivc-plethoric" ] ] ],
				"global-ventricular-function": [ "value": [ "global-ventricular-function": "hyperdynamic" ] ],
				"right-ventricular-size": [ "value": [ "right-ventricular-size": "normal" ],
					"signs-of-rv-strian": [ "value": [ "rv-hypokinesis": true, "paradoxical-septal-motion": true, "mcconnells-sign": true,
							"tricuspid-regurgitation": true, "max-velocity": [ "value": "23" ],"rv-hypertrophy": true ] ] ],
				"thoracic-aorta": [ "value": [ "thoracic-aorta": "absent" ], "aortic-root": [ "value": "1" ],
					"thoracic-aorta-diameter": [ "value": "1" ] ], "ivc": [ "value": [ "ivc": "indeterminate" ], "maximum-diameter": [ "value": "1" ],
					"minimum-diameter": [ "value": "1" ], "collapse": [ "value": [ "collapse": "lt-50" ] ] ], "others": [ "value": "otherFindingscomment" ] ],
			"interpretations": [ "standard": [ "value": [ "cardiac-dysfunction": true, "pericardial-effusion": true, "pericardialeffusion": true,
						"pericardialeffusion-size": [ "value": [ "pericardialeffusion-size": "moderate" ] ], "global-ventricular-function": true,
						"global-ventricular-option": [ "value": [ "global-ventricular-option": "hyperdynamic" ] ], "cardiac-standstill": true, "size-dilation": true, "rv-dilation": true,
						"volume-depletion": true, "depletion": true, "dilatedIVC": true, "aortic-root": true, "dilated-aortic-root": true ] ],
				"others": [ "value": "otherintepretationscomment" ] ]

		]]

	static def thoracicTestData = ["wrk1":["examoverview":["type":"Diagnostic","category":"Resuscitative","exam":"Initial exam"],
			"indications":["default":["value":["dyspnea":true,"hypotension":true,"chest pain":true,"pleurisy":true,"hypoxia":true,
						"educational":true,"penetrating thoracic trauma":true,"blunt thoracic trauma":true]],
				"others":["value":"Other indications"]],
			"views":["right-anterior-superior-thorax":["value":["right-anterior-superior-thorax":"limited"]],
				"right-lateral-inferior-thorax":["value":["right-lateral-inferior-thorax":"adequate"]],
				"left-anterior-superior-thorax":["value":["left-anterior-superior-thorax":"not-obtained"]],
				"left-lateral-inferior-thorax":["value":["left-lateral-inferior-thorax":"limited"]],
				"others":["value":"other views comment"]],
			"findings":["right-thorax":["lung-sliding":["value":["absent":true]],"lung-point-sign":["value":["lung-point-sign":"absent"]],
					"interstitium":["a-lines":["value":["absent":true]],"b-lines":["value":["b-lines":"absent"]]],
					"anterior-superior-region":["value":["anterior-superior-region":"absent"]],"inferior-lateral-region":["value":["inferior-lateral-region":"present"]],
					"pleural-effusion":["value":["pleural-effusion":"indeterminate"],"if-present":["value":["if-present":"complex"]]],
					"lung-consolidation":["value":["lung-consolidation":"indeterminate"]],"air-bronchograms":["value":["air-bronchograms":"indeterminate"]],
					"others":["value":"right thorax comment"]],"left-thorax":["lung-sliding":["value":["present":true]],"interstitium":["a-lines":["value":["indeterminate":true]]],
					"others":["value":"left thorax comment"]]],
			"interpretations":["standard":["value":["acute-pulmonary-disease":true,"pneumothorax":true,"pneumothorax-location":["value":["pneumothorax-location":"bilateral"]],
						"pleuraleffusion":true,"pericardialeffusion-size":["value":["pericardialeffusion-size":"right"]],
						"alveolar-interstitial-syndrome-focal":true,"alveolar-interstitial-syndrome-diffuse":true,"lung-consolidation":true,
						"lung-consolidation-size":["value":["lung-consolidation-size":"bilateral"]]]],
				"others":["value":"other interpretations comment"]]
		]]
}
