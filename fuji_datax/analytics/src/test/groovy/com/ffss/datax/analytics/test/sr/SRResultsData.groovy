package com.ffss.datax.analytics.test.sr

import org.junit.After;



class SRResultsData {


	static def testSRData = ["Cardiac":[
			["Name: HR Value: 90{H.B.}/min" : [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: Systolic BP Value: 98mm[Hg]" : [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: Diastolic BP Value: 70mm[Hg]": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: Height Value: 157.48cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: Weight Value: 408.24kg": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: Exam Type Value: Cardiac": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: BSA Value: 3.62m2": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVWs Mean Value: 1.58cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVWs[1] Value: 1.64cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVWs[2] Value: 1.52cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVDs Mean Value: 1.33cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVDs[1] Value: 1.20cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVDs[2] Value: 1.21cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVDs[3] Value: 1.58cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV IVSs Mean Value: 1.43cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV IVSs[1] Value: 1.20cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV IVSs[2] Value: 1.20cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV IVSs[3] Value: 1.89cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVDs Mean Value: 1.62cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVDs[1] Value: 1.39cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVDs[2] Value: 1.84cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVPWs Mean Value: 1.70cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVPWs[1] Value: 1.21cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVPWs[2] Value: 2.18cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVWd Mean Value: 2.44cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVWd[1] Value: 1.03cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVWd[2] Value: 3.85cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVDd Mean Value: 2.00cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVDd[1] Value: 1.99cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV RVDd[2] Value: 2.01cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV IVSd Mean Value: 1.00cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV IVSd[1] Value: 1.00cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV IVSd[2] Value: 0.99cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVDd Mean Value: 2.80cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVDd[1] Value: 1.99cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVDd[2] Value: 1.99cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVDd[3] Value: 4.43cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVPWd Mean Value: 1.79cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVPWd[1] Value: 1.00cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVPWd[2] Value: 2.59cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV CO Value: 2.0l/min": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV SV Value: 22.2ml": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV EF Value: 75%": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV CI Value: 0.55l/min/m2": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV SI Value: 6.13ml/m2": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVESV Value: 7.40ml": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVEDV Value: 29.6ml": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV IVS FT Value: 43.0%": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVWPFT Value: -5.03%": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: 2D LV LVDFS Value: 42.1%": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVWs Mean Value: 2.46cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVWs[1] Value: 2.46cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVDs Mean Value: 1.81cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVDs[1] Value: 1.81cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV IVSs Mean Value: 1.20cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV IVSs[1] Value: 1.20cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV LVDs Mean Value: 3.01cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV LVDs[1] Value: 3.01cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV LVDs[2] Value: 3.01cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV LVPWs Mean Value: 1.20cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV LVPWs[1] Value: 1.20cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVWd Mean Value: 3.47cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVWd[1] Value: 2.26cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVWd[2] Value: 2.36cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVWd[3] Value: 4.46cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVWd[4] Value: 4.62cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV RVWd[5] Value: 3.66cm": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]],
			["Name: M Mode LV LVESV Value: 35.3ml": [CodeValue:121071, CodingSchemeDesignator:"DCM", CodeMeaning:"Finding"]]
		],
		"OB":[]
	]
}







