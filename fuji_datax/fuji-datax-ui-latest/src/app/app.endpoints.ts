export class EndPoint {

  private LOGIN_URL: string = "auth/login?user=johnw&pwd=johny123&rememberMe=true";

  private PREFERENCE_URL: string = "api/preference";

  private DASHBOARD_SUMMARY_URL: string = "api/analytics/study";

  private DASHBOARD_DETAIL_URL: string = "api/dashboard/detail";

  private STUDYLIST_LIST_URL: string = "api/studylist";

  private STUDYLIST_DETAIL_URL: string = "api/study/";

  private UNASSIGN_STUDY_URL: string = "api/study";

  private DISPALY_USERNAME_URL: string = "api/userprofile";

  private GET_WORKSHEETS: string = "api/template/search";

  private GET_WORKSHEET_TEMPLATE: string = "api/template";

  private GET_WORKSHEET_URL: string = "api/worksheet/search";

  private SAVE_WORKSHEET_URL: string = "api/worksheet";

  private DELETE_WORKSHEET_URL: string = "api/worksheet";

  private SAVE_SIGNATURE_URL: string = "api/template/sign";

  private GET_SIGNATURE_URL: string = "api/template/sign";

  private DELETE_SIGNATURE_URL: string = "api/template/sign";

  private SAVE_TO_SUBMIT_URL: string = "api/study";

  private SUBMIT_WORKSHEET_URL: string = "api/worksheet";

  private SAVE_NEW_USER_URL: string = "api/user";

  private GET_USERLIST_URL: string = "api/user";

  private GET_UNIQUE_USER_NAME_URL: string = "api/user/search";

  private GET_USER_URL: string = "api/user";

  private GET_USER_GROUP_LIST_URL: string = "api/usergroup?";

  private SAVE_NEW_USER_GROUP_URL: string = "api/usergroup";

  private GET_UNIQUE_USER_GROUP_NAME_URL = "api/usergroup/search";

  private GET_ACTIVE_STATUS_URL: string = "api/user";

  private GET_USER_GROUP_BY_ID_URL: string = "api/usergroup";

  private CHANGE_STATUS_URL: string = "api/study";

	 private ASSOCIATE_WORKSHEET_URL: string = "api/examtype";

	 private ACTIVE_USERLIST_URL: string = 'api/user/activeuser'

	 private SUBMIT_TO_REVIEW_URL: string = "api/worksheet";

	 private GET_QA_WORKSHEETS: string = "api/template/search/qa";

	 private GET_QA_WORKSHEET_URL: string = "api/worksheet/search";

	 private GET_QA_WORKSHEET_TEMPLATE: string = "api/template";

	 private GENERATE_PDF_URL: string = "api/export/worksheet"
	 
	 private GENERATE_SR_REPORT_URL : string = "api/export/structuredreport/study"

  private GET_EXAM_DETAILS_URL: string = 'api/exam';

	 private DELETE_EXAM_TYPE_URL: string = 'api/exam';

  private GET_CPT_CODES_URL: string = 'api/exam/cptcode';

	 private GET_UNIQUE_EXAM_TYPE_NAME_URL: string = "api/exam/search";

	 private GET_WRKSHT_TEMPLATE_URL: string = "/api/exam/template";

  private SAVE_ATTESTED_SIGNATURE_URL: String = "api/template/sign/attested";

  private VALIDAE_ATTEND_QA: String = "/api/study";

  private DELETE_ATTESTED_SIGNATURE_URL: String = "api/template/attested/sign";

  private SAVE_LDAPCONFIG_DATA_URL: String = "api/ldapconfig";

  private SAVE_PASSWORD_POLICY_URL: String = "api/config/passwordpolicy";

  private UPDATE_PWD_CONFIG_URL: string = "api/config";

  private ENABLE_LDAPCONFIG_URL: string = "/auth/passwordpolicy";

  private ASSIGN_QAUSER_URL: string = "/api/study";

  private ROLE_URL: string = "/api/role";
  private GET_PERMISSIONS_URL: string = "/api/permissions";
  private GET_UNIQUE_ROLE_NAME_URL = "/api/role/search";
  private  GET_ORGANIZATIONS_URL = "/api/organization";

   private GET_TAGS_EXAMTYPE = "/api/exam";

   private SAVE_TAGS_EXAMTYPE = "/api/studyTag";

   private GET_QA_WORKSHEET:string = "api/worksheet/study";
   private GET_SMTP_CONFIG:String = "/api/configuration/email";

   private GET_ALERT:string = "api/notification/alert"; 
   private PERSONAL_TAG :string = "/api/userTag";			
   
   private USER_PREFERENCE = '/api/user'
   
   private USER_URL = '/api/userlist';

  /*
   private LOGIN_URL: string =
    "auth/login?user=johnw&pwd=johny123&rememberMe=true";

   private PREFERENCE_URL: string = "proxy/preference.json";

    private DASHBOARD_SUMMARY_URL: string =
   "proxy/dashboard.widget.summary.json";

    private DASHBOARD_DETAIL_URL: string = "proxy/dashboard.widget.detail.json";

    private STUDYLIST_LIST_URL: string = "proxy/studylist.data.json";

    private STUDYLIST_DETAIL_URL: string = "proxy/studylist.detail.json?";

    private DISPALY_USERNAME_URL: string ="proxy/displayuser.json";

    private GET_WORKSHEETS: string ="proxy/worksheet.list.json";

    private GET_WORKSHEET_TEMPLATE: string ="proxy/worksheet.template.json?";

    private GET_WORKSHEET_URL: string ="proxy/worksheet.json";

    private SAVE_WORKSHEET_URL: string ="proxy/worksheet.save.json?";

    private GET_SIGNATURE_URL: string ="proxy/signature.get.json";

    private DELETE_WORKSHEET_URL: string ="proxy/worksheet.delete.json";

    private DELETE_SIGNATURE_URL: string ="proxy/signature.delete.json";

    private SAVE_TO_SUBMIT_URL: string ="proxy/submitResponse.json?";

    private SUBMIT_WORKSHEET_URL: string ="proxy/submitResponse.json?";

    private GET_USERLIST_URL: string ="proxy/userlist.json";

    private GET_USER_URL: string ="proxy/userData.json?";

    private GET_USER_GROUP_LIST_URL: string ="proxy/usergroupList.json?";

    private GET_UNIQUE_USER_NAME_URL:string = "proxy/userValidation.json";

    private GET_UNIQUE_USER_GROUP_NAME_URL:
    string="proxy/groupUniqueness.response.json";

    private GET_ACTIVE_STATUS_URL: string ="proxy/ActiveStatus.json";

    private GET_USER_GROUP_BY_ID_URL: string="proxy/modifyUsergroup.json?";

    private CHANGE_STATUS_URL: string="proxy/changeStatus.json";

     private UNASSIGN_STUDY_URL:string = "proxy/unassignstudy.json?";

     private ACTIVE_USERLIST_URL:string = 'proxy/userlist.json'

     private GET_QA_WORKSHEET_TEMPLATE: string ="proxy/qaWorksheet.template.json?";

     private GET_QA_WORKSHEET_URL : string = "proxy/qaWorksheet.template.json?";

     private GET_QA_WORKSHEETS: string ="proxy/qaWorksheet.list.json";

     private SUBMIT_TO_REVIEW_URL: string='proxy/submitReview.json';

        private GET_EXAM_DETAILS_URL: string = 'proxy/examtype.json';

        private DELETE_EXAM_TYPE_URL: string = 'proxy/examtype.delete.json';

        private GET_CPT_CODES_URL: string = 'proxy/getcptcode.json';

        private GET_UNIQUE_EXAM_TYPE_NAME_URL:string = "proxy/groupuniqueness.json";

    private GET_WRKSHT_TEMPLATE_URL : string = "proxy/worksheet.list.json";

    private ENABLE_LDAPCONFIG_URL:string = "proxy/enable_ldapconfig.json";
	private PERSONAL_TAG = "proxy/api/userTag";												   


  */

  loginUrl() {
    return this.LOGIN_URL;
  }

  preferenceUrl() {
    return this.PREFERENCE_URL;
  }

  dashboardSummaryUrl() {
    return this.DASHBOARD_SUMMARY_URL;
  }

  dashboardDetailUrl() {
    return this.DASHBOARD_DETAIL_URL;
  }

  studyListUrl() {
    return this.STUDYLIST_LIST_URL;
  }

  studyDetailUrl() {
    return this.STUDYLIST_DETAIL_URL;
  }

  displayUsernameUrl() {
    return this.DISPALY_USERNAME_URL;
  }

  getWorksheets() {
    return this.GET_WORKSHEETS;
  }

  getWorksheetTemplate() {
    return this.GET_WORKSHEET_TEMPLATE;
  }

  getWorksheetUrl() {
    return this.GET_WORKSHEET_URL;
  }

  saveWorksheetUrl() {
    return this.SAVE_WORKSHEET_URL;
  }

  deleteWorksheetUrl() {
    return this.DELETE_WORKSHEET_URL;
  }

  saveSignatureUrl() {
    return this.SAVE_SIGNATURE_URL;
  }

  getSignatureUrl() {
    return this.GET_SIGNATURE_URL;
  }

  deleteSignatureUrl() {
    return this.DELETE_SIGNATURE_URL;
  }

  submitWorksheetUrl() {
    return this.SUBMIT_WORKSHEET_URL;
  }
  saveToSubmitUrl() {
    return this.SAVE_TO_SUBMIT_URL;
  }
  saveNewUserUrl() {
  		return this.SAVE_NEW_USER_URL;
  }
  getUniqueUserName() {
		  return this.GET_UNIQUE_USER_NAME_URL;
  }
  getUserListUrl() {
    return this.GET_USERLIST_URL;
  }

  getUserUrl() {
    return this.GET_USER_URL;
  }

  getUserGroupListUrl() {
    return this.GET_USER_GROUP_LIST_URL;
  }

  saveNewGroupUserUrl() {
    return this.SAVE_NEW_USER_GROUP_URL;
  }

  getUniqueUserGroupName() {
    return this.GET_UNIQUE_USER_GROUP_NAME_URL;
  }

  getActiveStatusUrl() {
    return this.GET_ACTIVE_STATUS_URL;
  }

  unAssignStudy() {
    return this.UNASSIGN_STUDY_URL;
  }

  getUserGroupById() {
    return this.GET_USER_GROUP_BY_ID_URL;
  }

	 changeStatusUrl() {
    return this.CHANGE_STATUS_URL;
  }
	 associateworksheetUrl() {
    return this.ASSOCIATE_WORKSHEET_URL;
  }

	 unassignStudyUrl() {
    return this.UNASSIGN_STUDY_URL;
	 }

	 getActiveUserlistUrl() {
    return this.ACTIVE_USERLIST_URL;
	 }

  getQaWorksheetUrl() {
    return this.GET_QA_WORKSHEET_URL;
  }
  getQaWorksheetTemplate() {
    return this.GET_QA_WORKSHEET_TEMPLATE;
  }

  getQaWorksheets() {
    return this.GET_QA_WORKSHEETS;
  }

  submitToReviewUrl() {
    return this.SUBMIT_TO_REVIEW_URL;
	 }

  generatePdfUrl() {
    return this.GENERATE_PDF_URL;
  }
  
  generateSRReportUrl(){
	 return this.GENERATE_SR_REPORT_URL;
  }

  getExamtypeDetailsUrl() {
    return this.GET_EXAM_DETAILS_URL;
  }

  deleteExamtypeUrl() {
    return this.DELETE_EXAM_TYPE_URL;
  }
  saveExamTypeUrl() {
    return this.GET_EXAM_DETAILS_URL;
  }
  getCptCodes() {

    return this.GET_CPT_CODES_URL;
  }
  getUniqueExamtypeName() {
    return this.GET_UNIQUE_EXAM_TYPE_NAME_URL;
  }
  getExamWorksheetTemplate() {
    return this.GET_WRKSHT_TEMPLATE_URL;
  }

  validateAttendingQaUserUrl() {
    return this.VALIDAE_ATTEND_QA;
  }

  deleteAttestedSignatureUrl() {
    return this.DELETE_ATTESTED_SIGNATURE_URL;
  }

  saveAttestedSignatureUrl() {
    return this.SAVE_ATTESTED_SIGNATURE_URL;
  }

  saveLdapConfigDataUrl() {
    return this.SAVE_LDAPCONFIG_DATA_URL;
  }
  savePasswordPolicyUrl() {
    return this.SAVE_PASSWORD_POLICY_URL;
  }


  updatePwdPolicyUrl() {
    return this.UPDATE_PWD_CONFIG_URL;
  }

  ldapConfigStatusUrl() {
    return this.ENABLE_LDAPCONFIG_URL;
  }
  assignQaUserUrl() {
    return this.ASSIGN_QAUSER_URL;
  }

  roleUrl() {
    return this.ROLE_URL;
  }
  getPermissionsUrl() {
    return this.GET_PERMISSIONS_URL;
  }

  getOrganizationsUrl() {
    return this.GET_ORGANIZATIONS_URL;
  }

  getUniqueRoleName() {
    return this.GET_UNIQUE_ROLE_NAME_URL;
  }

    getTagsForExamTypeUrl(){
        return this.GET_TAGS_EXAMTYPE;
    }
    getTagsForStudyUrl(){
        return this.SAVE_TAGS_EXAMTYPE;
    }
    saveTagsUrl(){
        return this.SAVE_TAGS_EXAMTYPE;
    }
    deleteTagUrl(){
        return this.SAVE_TAGS_EXAMTYPE;
    }
	getQaWorkseetIdUrl()
    {
    return this.GET_QA_WORKSHEET;
    }

    getSmtpConfigurationUrl(){
      return this.GET_SMTP_CONFIG;
    }

    saveSmtpConfigurationUrl(){
      return this.GET_SMTP_CONFIG;
    }

    getAlertUrl(){
        return this.GET_ALERT;
    }
	personalTagsUrl(){
    	return this.PERSONAL_TAG;
    }				
	userPreferenceUrl(){
		return this.USER_PREFERENCE;
	}
	
	userUrl(){
	return this.USER_URL;
	}
}
