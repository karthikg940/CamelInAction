package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.constants.Constants

@Component
class OrganizationTransformer {

	def transformAll(organizations){
		[results:transform(organizations)]
	}

	def transform(organizations) {
		
		organizations.collect{
			if(it.isPmo==(Constants.unChecked)  && it.isStmo==(Constants.unChecked)){
				[ 'id':it.id, 'orgName': 'FMO - '+it.orgName]
			}
			else if(it.isPmo==(Constants.checked)  && it.isStmo==(Constants.unChecked)){
				[ 'id':it.id, 'orgName': 'PMO - '+it.orgName]
			}
			else if(it.isPmo==(Constants.unChecked)  && it.isStmo==(Constants.checked)){
				[ 'id':it.id, 'orgName': 'STMO - '+it.orgName]
			}
			else if(it.isPmo==(Constants.checked)  && it.isStmo==(Constants.checked)){
				[ 'id':it.id, 'orgName': 'PMO/STMO - '+it.orgName]
			}
		}
	}
}
