package com.ffss.datax.common.domain.study

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.userprofile.Organization

@Entity
@Table(name='DICOM_MAP')
class DicomMap extends Audit{
	
		@Id
		@GeneratedValue
		@Column(name='DICOM_DATAX_MAP_PK')
		Long id
		
		@JsonBackReference
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name='ORG_FK')
		Organization organization
		
		@Column(name='DICOM_SOURCE_NAME')
		String dicomSourceName
		
		@Column(name='DICOM_SOURCE_VERSION')
		String dicomSourceVersion
		
		@Column(name='DICOM_ENTITY_NAME')
		String dicomEntityName
		
		@Column(name='DICOM_ATTR_NAME')
		String dicomAttrName
		
		@Column(name='APP_ENTITY_NAME')
		String appEntityName
		
		@Column(name='APP_ATTR_NAME')
		String appAttrName
		
		@Column(name='APP_UINAME')
		String appUiName
		
		@Column(name='APP_VERSION')
		String appVersion
		

}
