var ac_main =
webpackJsonpac__name_([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(14))(455);

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppState; });



//import { Comment }           from '../model/comment';


// Import RxJs required methods


var AppState = (function () {
    function AppState(http, bearer, endPoint) {
        this.http = http;
        this.endPoint = endPoint;
        this._state = {};
        this.loadPref = false;
        this.bearer = null;
        this.login_event = null;
        this.bearer = bearer;
        this.setHttpAuthorizationToken();
    }
    AppState.prototype.setHttpAuthorizationToken = function () {
        if (this.bearer)
            this.http._defaultOptions.headers.set('Authorization', 'Bearer ' + this.bearer);
    };
    AppState.prototype.loadPreference = function () {
        var _this = this;
        if (this.loadPref)
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].of(true);
        return this.http.get(this.endPoint.preferenceUrl())
            .map(function (res) {
            var pref = res.json();
            for (var key in pref) {
                if (pref.hasOwnProperty(key)) {
                    _this.set("preference." + key, pref[key]);
                }
            }
            _this.loadPref = true;
            return true;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    AppState.prototype.getPreference = function () {
        return this.http.get(this.endPoint.preferenceUrl())
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    AppState.prototype.getldapConfigStatus = function () {
        return this.http.get(this.endPoint.ldapConfigStatusUrl())
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    AppState.prototype.getUserName = function () {
        var _this = this;
        // ...using get request
        return this.http.get(this.endPoint.displayUsernameUrl())
            .map(function (res) {
            var userNameJson = res.json();
            _this.set("userName", (userNameJson.prefix ? userNameJson.prefix + ". " : "") + userNameJson.firstName + " " + userNameJson.lastName);
            _this.set("userId", userNameJson.id);
            _this.set("orgId", userNameJson.orgId);
            return userNameJson;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    Object.defineProperty(AppState.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : null;
    };
    AppState.prototype.set = function (prop, value) {
        // internally mutate our state
        return this._state[prop] = value;
    };
    AppState.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    return AppState;
}());
AppState = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __param */](1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"])('bearer')),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], String, __WEBPACK_IMPORTED_MODULE_4__app_endpoints__["a" /* EndPoint */]])
], AppState);



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EndPoint; });
var EndPoint = (function () {
    function EndPoint() {
        this.LOGIN_URL = "auth/login?user=johnw&pwd=johny123&rememberMe=true";
        this.PREFERENCE_URL = "api/preference";
        this.DASHBOARD_SUMMARY_URL = "api/analytics/study";
        this.DASHBOARD_DETAIL_URL = "api/dashboard/detail";
        this.STUDYLIST_LIST_URL = "api/studylist";
        this.STUDYLIST_DETAIL_URL = "api/study/";
        this.UNASSIGN_STUDY_URL = "api/study";
        this.DISPALY_USERNAME_URL = "api/userprofile";
        this.GET_WORKSHEETS = "api/template/search";
        this.GET_WORKSHEET_TEMPLATE = "api/template";
        this.GET_WORKSHEET_URL = "api/worksheet/search";
        this.SAVE_WORKSHEET_URL = "api/worksheet";
        this.DELETE_WORKSHEET_URL = "api/worksheet";
        this.SAVE_SIGNATURE_URL = "api/template/sign";
        this.GET_SIGNATURE_URL = "api/template/sign";
        this.DELETE_SIGNATURE_URL = "api/template/sign";
        this.SAVE_TO_SUBMIT_URL = "api/study";
        this.SUBMIT_WORKSHEET_URL = "api/worksheet";
        this.SAVE_NEW_USER_URL = "api/user";
        this.GET_USERLIST_URL = "api/user";
        this.GET_UNIQUE_USER_NAME_URL = "api/user/search";
        this.GET_USER_URL = "api/user";
        this.GET_USER_GROUP_LIST_URL = "api/usergroup?";
        this.SAVE_NEW_USER_GROUP_URL = "api/usergroup";
        this.GET_UNIQUE_USER_GROUP_NAME_URL = "api/usergroup/search";
        this.GET_ACTIVE_STATUS_URL = "api/user";
        this.GET_USER_GROUP_BY_ID_URL = "api/usergroup";
        this.CHANGE_STATUS_URL = "api/study";
        this.ASSOCIATE_WORKSHEET_URL = "api/examtype";
        this.ACTIVE_USERLIST_URL = 'api/user/activeuser';
        this.SUBMIT_TO_REVIEW_URL = "api/worksheet";
        this.GET_QA_WORKSHEETS = "api/template/search/qa";
        this.GET_QA_WORKSHEET_URL = "api/worksheet/search";
        this.GET_QA_WORKSHEET_TEMPLATE = "api/template";
        this.GENERATE_PDF_URL = "api/export/worksheet";
        this.GENERATE_SR_REPORT_URL = "api/export/structuredreport/study";
        this.GET_EXAM_DETAILS_URL = 'api/exam';
        this.DELETE_EXAM_TYPE_URL = 'api/exam';
        this.GET_CPT_CODES_URL = 'api/exam/cptcode';
        this.GET_UNIQUE_EXAM_TYPE_NAME_URL = "api/exam/search";
        this.GET_WRKSHT_TEMPLATE_URL = "/api/exam/template";
        this.SAVE_ATTESTED_SIGNATURE_URL = "api/template/sign/attested";
        this.VALIDAE_ATTEND_QA = "/api/study";
        this.DELETE_ATTESTED_SIGNATURE_URL = "api/template/attested/sign";
        this.SAVE_LDAPCONFIG_DATA_URL = "api/ldapconfig";
        this.SAVE_PASSWORD_POLICY_URL = "api/config/passwordpolicy";
        this.UPDATE_PWD_CONFIG_URL = "api/config";
        this.ENABLE_LDAPCONFIG_URL = "/auth/passwordpolicy";
        this.ASSIGN_QAUSER_URL = "/api/study";
        this.ROLE_URL = "/api/role";
        this.GET_PERMISSIONS_URL = "/api/permissions";
        this.GET_UNIQUE_ROLE_NAME_URL = "/api/role/search";
        this.GET_ORGANIZATIONS_URL = "/api/organization";
        this.GET_TAGS_EXAMTYPE = "/api/exam";
        this.SAVE_TAGS_EXAMTYPE = "/api/studyTag";
        this.GET_QA_WORKSHEET = "api/worksheet/study";
        this.GET_SMTP_CONFIG = "/api/configuration/email";
        this.GET_ALERT = "api/notification/alert";
        this.PERSONAL_TAG = "/api/userTag";
        this.USER_PREFERENCE = '/api/user';
        this.USER_URL = '/api/userlist';
    }
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
    EndPoint.prototype.loginUrl = function () {
        return this.LOGIN_URL;
    };
    EndPoint.prototype.preferenceUrl = function () {
        return this.PREFERENCE_URL;
    };
    EndPoint.prototype.dashboardSummaryUrl = function () {
        return this.DASHBOARD_SUMMARY_URL;
    };
    EndPoint.prototype.dashboardDetailUrl = function () {
        return this.DASHBOARD_DETAIL_URL;
    };
    EndPoint.prototype.studyListUrl = function () {
        return this.STUDYLIST_LIST_URL;
    };
    EndPoint.prototype.studyDetailUrl = function () {
        return this.STUDYLIST_DETAIL_URL;
    };
    EndPoint.prototype.displayUsernameUrl = function () {
        return this.DISPALY_USERNAME_URL;
    };
    EndPoint.prototype.getWorksheets = function () {
        return this.GET_WORKSHEETS;
    };
    EndPoint.prototype.getWorksheetTemplate = function () {
        return this.GET_WORKSHEET_TEMPLATE;
    };
    EndPoint.prototype.getWorksheetUrl = function () {
        return this.GET_WORKSHEET_URL;
    };
    EndPoint.prototype.saveWorksheetUrl = function () {
        return this.SAVE_WORKSHEET_URL;
    };
    EndPoint.prototype.deleteWorksheetUrl = function () {
        return this.DELETE_WORKSHEET_URL;
    };
    EndPoint.prototype.saveSignatureUrl = function () {
        return this.SAVE_SIGNATURE_URL;
    };
    EndPoint.prototype.getSignatureUrl = function () {
        return this.GET_SIGNATURE_URL;
    };
    EndPoint.prototype.deleteSignatureUrl = function () {
        return this.DELETE_SIGNATURE_URL;
    };
    EndPoint.prototype.submitWorksheetUrl = function () {
        return this.SUBMIT_WORKSHEET_URL;
    };
    EndPoint.prototype.saveToSubmitUrl = function () {
        return this.SAVE_TO_SUBMIT_URL;
    };
    EndPoint.prototype.saveNewUserUrl = function () {
        return this.SAVE_NEW_USER_URL;
    };
    EndPoint.prototype.getUniqueUserName = function () {
        return this.GET_UNIQUE_USER_NAME_URL;
    };
    EndPoint.prototype.getUserListUrl = function () {
        return this.GET_USERLIST_URL;
    };
    EndPoint.prototype.getUserUrl = function () {
        return this.GET_USER_URL;
    };
    EndPoint.prototype.getUserGroupListUrl = function () {
        return this.GET_USER_GROUP_LIST_URL;
    };
    EndPoint.prototype.saveNewGroupUserUrl = function () {
        return this.SAVE_NEW_USER_GROUP_URL;
    };
    EndPoint.prototype.getUniqueUserGroupName = function () {
        return this.GET_UNIQUE_USER_GROUP_NAME_URL;
    };
    EndPoint.prototype.getActiveStatusUrl = function () {
        return this.GET_ACTIVE_STATUS_URL;
    };
    EndPoint.prototype.unAssignStudy = function () {
        return this.UNASSIGN_STUDY_URL;
    };
    EndPoint.prototype.getUserGroupById = function () {
        return this.GET_USER_GROUP_BY_ID_URL;
    };
    EndPoint.prototype.changeStatusUrl = function () {
        return this.CHANGE_STATUS_URL;
    };
    EndPoint.prototype.associateworksheetUrl = function () {
        return this.ASSOCIATE_WORKSHEET_URL;
    };
    EndPoint.prototype.unassignStudyUrl = function () {
        return this.UNASSIGN_STUDY_URL;
    };
    EndPoint.prototype.getActiveUserlistUrl = function () {
        return this.ACTIVE_USERLIST_URL;
    };
    EndPoint.prototype.getQaWorksheetUrl = function () {
        return this.GET_QA_WORKSHEET_URL;
    };
    EndPoint.prototype.getQaWorksheetTemplate = function () {
        return this.GET_QA_WORKSHEET_TEMPLATE;
    };
    EndPoint.prototype.getQaWorksheets = function () {
        return this.GET_QA_WORKSHEETS;
    };
    EndPoint.prototype.submitToReviewUrl = function () {
        return this.SUBMIT_TO_REVIEW_URL;
    };
    EndPoint.prototype.generatePdfUrl = function () {
        return this.GENERATE_PDF_URL;
    };
    EndPoint.prototype.generateSRReportUrl = function () {
        return this.GENERATE_SR_REPORT_URL;
    };
    EndPoint.prototype.getExamtypeDetailsUrl = function () {
        return this.GET_EXAM_DETAILS_URL;
    };
    EndPoint.prototype.deleteExamtypeUrl = function () {
        return this.DELETE_EXAM_TYPE_URL;
    };
    EndPoint.prototype.saveExamTypeUrl = function () {
        return this.GET_EXAM_DETAILS_URL;
    };
    EndPoint.prototype.getCptCodes = function () {
        return this.GET_CPT_CODES_URL;
    };
    EndPoint.prototype.getUniqueExamtypeName = function () {
        return this.GET_UNIQUE_EXAM_TYPE_NAME_URL;
    };
    EndPoint.prototype.getExamWorksheetTemplate = function () {
        return this.GET_WRKSHT_TEMPLATE_URL;
    };
    EndPoint.prototype.validateAttendingQaUserUrl = function () {
        return this.VALIDAE_ATTEND_QA;
    };
    EndPoint.prototype.deleteAttestedSignatureUrl = function () {
        return this.DELETE_ATTESTED_SIGNATURE_URL;
    };
    EndPoint.prototype.saveAttestedSignatureUrl = function () {
        return this.SAVE_ATTESTED_SIGNATURE_URL;
    };
    EndPoint.prototype.saveLdapConfigDataUrl = function () {
        return this.SAVE_LDAPCONFIG_DATA_URL;
    };
    EndPoint.prototype.savePasswordPolicyUrl = function () {
        return this.SAVE_PASSWORD_POLICY_URL;
    };
    EndPoint.prototype.updatePwdPolicyUrl = function () {
        return this.UPDATE_PWD_CONFIG_URL;
    };
    EndPoint.prototype.ldapConfigStatusUrl = function () {
        return this.ENABLE_LDAPCONFIG_URL;
    };
    EndPoint.prototype.assignQaUserUrl = function () {
        return this.ASSIGN_QAUSER_URL;
    };
    EndPoint.prototype.roleUrl = function () {
        return this.ROLE_URL;
    };
    EndPoint.prototype.getPermissionsUrl = function () {
        return this.GET_PERMISSIONS_URL;
    };
    EndPoint.prototype.getOrganizationsUrl = function () {
        return this.GET_ORGANIZATIONS_URL;
    };
    EndPoint.prototype.getUniqueRoleName = function () {
        return this.GET_UNIQUE_ROLE_NAME_URL;
    };
    EndPoint.prototype.getTagsForExamTypeUrl = function () {
        return this.GET_TAGS_EXAMTYPE;
    };
    EndPoint.prototype.getTagsForStudyUrl = function () {
        return this.SAVE_TAGS_EXAMTYPE;
    };
    EndPoint.prototype.saveTagsUrl = function () {
        return this.SAVE_TAGS_EXAMTYPE;
    };
    EndPoint.prototype.deleteTagUrl = function () {
        return this.SAVE_TAGS_EXAMTYPE;
    };
    EndPoint.prototype.getQaWorkseetIdUrl = function () {
        return this.GET_QA_WORKSHEET;
    };
    EndPoint.prototype.getSmtpConfigurationUrl = function () {
        return this.GET_SMTP_CONFIG;
    };
    EndPoint.prototype.saveSmtpConfigurationUrl = function () {
        return this.GET_SMTP_CONFIG;
    };
    EndPoint.prototype.getAlertUrl = function () {
        return this.GET_ALERT;
    };
    EndPoint.prototype.personalTagsUrl = function () {
        return this.PERSONAL_TAG;
    };
    EndPoint.prototype.userPreferenceUrl = function () {
        return this.USER_PREFERENCE;
    };
    EndPoint.prototype.userUrl = function () {
        return this.USER_URL;
    };
    return EndPoint;
}());



/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(14))(818);

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractService; });
var AbstractService = (function () {
    function AbstractService() {
    }
    AbstractService.prototype.getDurationString = function (duration) {
        console.log('duration', duration);
        if (duration && duration.label == "Past 24Hrs")
            return "fromDate=&toDate=";
        if (duration && duration.start && duration.end)
            return "fromDate=" + duration.start.format('YYYY-MM-DD') + "&toDate=" + duration.end.format('YYYY-MM-DD');
        return "fromDate=&toDate=";
    };
    AbstractService.prototype.getFilterString = function (filter) {
        var filterStr = "";
        for (var key in filter) {
            if (filter.hasOwnProperty(key)) {
                filterStr = filterStr + "&" + key + "=" + filter[key];
            }
        }
        return filterStr;
    };
    AbstractService.prototype.getParamString = function (filter) {
        var paramStr;
        var first = true;
        for (var key in filter) {
            if (filter.hasOwnProperty(key)) {
                if (first) {
                    paramStr = key + "=" + filter[key];
                    first = false;
                }
                else {
                    paramStr = paramStr + "&" + key + "=" + filter[key];
                }
            }
        }
        return paramStr;
    };
    return AbstractService;
}());



/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorksheetData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return QAWorksheetData; });
var WorksheetData = (function () {
    function WorksheetData(id, data) {
        this.id = id;
        this.data = data;
    }
    return WorksheetData;
}());

var QAWorksheetData = (function () {
    function QAWorksheetData(qaid, qadata) {
        this.qaid = qaid;
        this.qadata = qadata;
    }
    return QAWorksheetData;
}());



/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__studylist_studylist_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservationsService; });



// import { Comment } from '../model/comment';




// Import RxJs required methods


var ObservationsService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](ObservationsService, _super);
    function ObservationsService(http, endPoint, studyService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        _this.studyService = studyService;
        _this.wrkshtUpdateEmitter = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        _this.qaAttestationSignEmitter = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        _this.qaAttestationSignId = false;
        _this.qaSigned = false;
        return _this;
    }
    ObservationsService.prototype.getWrkshtUpdateEmitter = function () {
        return this.wrkshtUpdateEmitter;
    };
    ObservationsService.prototype.getQaAttestedSignEmitter = function () {
        return this.qaAttestationSignEmitter;
    };
    ObservationsService.prototype.getQaSigned = function () {
        return this.qaSigned;
    };
    ObservationsService.prototype.getWorksheet = function (studyId, type) {
        var url = this.endPoint.getWorksheetUrl() + "?" + this.getParamString({ studyId: studyId }) + "&" + this.getParamString({ type: type });
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getWorksheetList = function (studyId, examTypeFlag) {
        var url = this.endPoint.getWorksheets() + "?studyId=" + studyId + "&examTypeFlag=" + examTypeFlag;
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getWorksheetTemplate = function (id) {
        var url = this.endPoint.getWorksheetTemplate() + "/" + id;
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.saveWorksheet = function (studyId, assignToUserId, examTypeId, templateId, type, data) {
        var _this = this;
        var url = this.endPoint.saveWorksheetUrl();
        return this.http.post(url, { study: { id: parseInt(studyId) }, assignToUserId: { id: parseInt(assignToUserId) }, examType: { id: parseInt(examTypeId) }, template: { id: templateId }, wrkshtType: { type: type }, content: data })
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
            _this.studyService.refereshStudyDetails(studyId);
            console.error("saveWorksheet post response does not have location header");
            return null;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.updateWorksheet = function (worksheetId, data, studyId, examTypeId) {
        var url = this.endPoint.saveWorksheetUrl() + "/" + worksheetId;
        return this.http.put(url, { content: data, study: { id: studyId }, examId: { id: examTypeId } })
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.deleteWorksheet = function (worksheetId) {
        var url = this.endPoint.deleteWorksheetUrl() + "/" + worksheetId;
        return this.http.delete(url)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.saveSignature = function (worksheetId, type, sign, timestamp, studyId) {
        var _this = this;
        var url = this.endPoint.saveSignatureUrl();
        return this.http.post(url, { worksheet: { id: parseInt(worksheetId) }, type: type, sign: sign, timestamp: timestamp })
            .map(function (res) {
            _this.studyService.refereshStudyDetails(studyId);
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
            console.log('savesignature', res);
            return null;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.saveAttendingAttestedSignature = function (worksheetId, type, sign, timestamp, studyId) {
        var _this = this;
        var url = this.endPoint.saveSignatureUrl();
        return this.http.post(url, { worksheet: { id: parseInt(worksheetId) }, type: type, sign: sign, timestamp: timestamp })
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
            _this.studyService.refereshStudyDetails(studyId);
            console.log('savesignature', res);
        }).catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.saveAttestedSignature = function (worksheetId, type, sign, timestamp, studyId) {
        var _this = this;
        var url = this.endPoint.saveAttestedSignatureUrl();
        return this.http.post(url, { worksheet: { id: parseInt(worksheetId) }, type: type, sign: sign, timestamp: timestamp, studyId: studyId })
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
            _this.studyService.refereshStudyDetails(studyId);
            console.log('savesignature', res);
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getSignatureData = function (worksheetId) {
        var url = this.endPoint.getSignatureUrl() + "/" + worksheetId;
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.deleteSignature = function (signId, studyId) {
        var _this = this;
        var url = this.endPoint.deleteSignatureUrl() + "/" + signId;
        return this.http.delete(url)
            .map(function (res) {
            _this.studyService.refereshStudyDetails(studyId);
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.submitWorksheet = function (studyId) {
        var _this = this;
        var url = this.endPoint.saveToSubmitUrl() + "/" + studyId + "/complete";
        return this.http.put(url)
            .map(function (res) {
            _this.studyService.refereshStudyDetails(studyId);
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.worksheetAssociation = function (studyId, examTypeName, type, templateName) {
        var url = this.endPoint.associateworksheetUrl() + "/" + studyId + "/exam/" + examTypeName + "/template/" + templateName;
        return this.http.put(url)
            .map(function (res) {
            console.log('Worksheet Associated');
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getUserGroupDetails = function () {
        var url = this.endPoint.getUserGroupListUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getActiveUserDetails = function () {
        var url = this.endPoint.getActiveUserlistUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    /* QA Worksheet */
    ObservationsService.prototype.saveQaWorksheet = function (studyId, templateId, type, data) {
        var _this = this;
        var url = this.endPoint.saveWorksheetUrl();
        return this.http.post(url, { study: { id: parseInt(studyId) }, template: { id: templateId }, wrkshtType: { type: type }, content: data })
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
            _this.studyService.refereshStudyDetails(studyId);
            console.error("saveQAWorksheet post response does not have location header");
            return null;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.updateQAWorksheet = function (worksheetId, data) {
        var url = this.endPoint.saveWorksheetUrl() + "/" + worksheetId;
        return this.http.put(url, { content: data })
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getQaWorksheetList = function () {
        var url = this.endPoint.getQaWorksheets();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getQaWorksheet = function (studyId, type) {
        var url = this.endPoint.getQaWorksheetUrl() + "?" + this.getParamString({ studyId: studyId }) + "&" + this.getParamString({ type: type });
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getQaWorksheetTemplate = function (id) {
        var url = this.endPoint.getQaWorksheetTemplate() + "/" + id;
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getQASignatureData = function (worksheetId) {
        var _this = this;
        var url = this.endPoint.getSignatureUrl() + "/" + worksheetId;
        return this.http.get(url)
            .map(function (res) {
            var qasignData = res.json();
            var signed = qasignData.qa.id > 0;
            _this.qaSigned = signed;
            _this.wrkshtUpdateEmitter.emit({ qaSigned: signed });
            return qasignData;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.submitToQA = function (studyId, userId) {
        var _this = this;
        var url = this.endPoint.submitToReviewUrl() + "/submittoqa";
        return this.http.put(url, { studyId: parseInt(studyId), userId: parseInt(userId) })
            .map(function (res) {
            _this.studyService.refereshStudyDetails(studyId);
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.submitToAttending = function (studyId) {
        var _this = this;
        var url = this.endPoint.submitWorksheetUrl() + "/" + studyId + "/submittoattending";
        return this.http.put(url)
            .map(function (res) {
            _this.studyService.refereshStudyDetails(studyId);
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.saveQASignature = function (worksheetId, type, sign, timestamp, studyId) {
        var _this = this;
        var url = this.endPoint.saveSignatureUrl();
        return this.http.post(url, { worksheet: { id: parseInt(worksheetId) }, type: type, sign: sign, timestamp: timestamp, studyId: studyId })
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                _this.qaSigned = true;
                _this.wrkshtUpdateEmitter.emit({ qaSigned: true });
                return frag[frag.length - 1];
            }
            return null;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    /*saveQAAttestedSignature(worksheetId: String,type: String,sign: String,timestamp: String,studyId:String) : Observable<Response>{
            const url = this.endPoint.saveAttestedSignatureUrl();
            return this.http.post(url, {worksheet: {id:parseInt(worksheetId)}, type:type, sign:sign, timestamp:timestamp, studyId:studyId})
                 .map((res:Response) => {
                     const location: String = res.headers.get('Location');
                    if(location) {
                         const frag:String[] = location.split("/");
                         this.qaSigned = true;
                         this.qaAttestationSignId = true;

                         this.wrkshtUpdateEmitter.emit({qaSigned:true});
                         return frag[frag.length-1];
                 }
                    return null;
                    })
                    .catch((error:any) => Observable.throw(error || 'Server error'));
    }*/
    ObservationsService.prototype.deleteQASignature = function (qasignId) {
        var _this = this;
        var url = this.endPoint.deleteSignatureUrl() + "/" + qasignId;
        return this.http.delete(url)
            .map(function (res) {
            _this.qaSigned = false;
            _this.wrkshtUpdateEmitter.emit({ qaSigned: false });
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.deleteQAAttestedSignature = function (qasignId, studyId) {
        var _this = this;
        var url = this.endPoint.deleteAttestedSignatureUrl() + "/" + qasignId + "/" + studyId;
        return this.http.delete(url)
            .map(function (res) {
            _this.qaSigned = false;
            _this.studyService.refereshStudyDetails(studyId);
            _this.wrkshtUpdateEmitter.emit({ qaSigned: false });
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.generatePdfReport = function (wrkshtId) {
        var url = this.endPoint.generatePdfUrl() + "/" + wrkshtId;
        return this.http.get(url, { responseType: __WEBPACK_IMPORTED_MODULE_2__angular_http__["ResponseContentType"].Blob }).map(function (res) {
            return new Blob([res.blob()], { type: 'application/pdf' });
        });
    };
    ObservationsService.prototype.generateSRReport = function (studyId) {
        var url = this.endPoint.generateSRReportUrl() + "/" + studyId;
        return this.http.get(url, { responseType: __WEBPACK_IMPORTED_MODULE_2__angular_http__["ResponseContentType"].Blob }).map(function (res) {
            return new Blob([res.blob()], { type: 'application/pdf' });
        });
    };
    ObservationsService.prototype.getAttendingUser = function (studyId) {
        var url = this.endPoint.changeStatusUrl() + "/" + studyId + "/assignuser";
        return this.http.get(url)
            .map(function (res) {
            console.log('assigned user ', res);
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.assignStudyToAttending = function (studyId, userId) {
        var url = this.endPoint.changeStatusUrl() + "/" + studyId + "/assigntoattendUser/" + userId;
        return this.http.put(url)
            .map(function (res) {
            console.log("response", res);
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    // method to get list of examtypes based on templatename
    ObservationsService.prototype.getExamTypesByTemplate = function (templatename) {
        var url = this.endPoint.associateworksheetUrl() + "/search?templateName=" + templatename;
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getValidateSignature = function (studyId) {
        var _this = this;
        var url = this.endPoint.validateAttendingQaUserUrl() + "/" + studyId + "/attestation/uservalidate";
        return this.http.get(url)
            .map(function (res) {
            _this.qaAttestationSignId = true;
            _this.qaAttestationSignEmitter.emit({ qaAttestationSignId: true });
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.deleteAttestedSignature = function (signId, studyId) {
        var _this = this;
        var url = this.endPoint.deleteAttestedSignatureUrl() + "/" + signId;
        return this.http.delete(url)
            .map(function (res) {
            _this.studyService.refereshStudyDetails(studyId);
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    /* Tags Services*/
    ObservationsService.prototype.getTagsForExamType = function (id) {
        var url = this.endPoint.getTagsForExamTypeUrl() + "/" + parseInt(id) + "/tags";
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.saveTags = function (studyId, data) {
        var url = this.endPoint.saveTagsUrl() + "/" + parseInt(studyId) + "/tag";
        return this.http.post(url, data)
            .map(function (res) {
            return true;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getTagsForStudy = function (studyId) {
        var url = this.endPoint.getTagsForStudyUrl() + "/" + parseInt(studyId) + "/tag";
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.deleteTagsForStudyService = function (studyId) {
        var url = this.endPoint.deleteTagUrl() + "/" + parseInt(studyId) + "/tag";
        return this.http.delete(url)
            .map(function (res) {
            return true;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getQaWorksheetId = function (studyId) {
        var url = this.endPoint.getQaWorkseetIdUrl() + "/" + parseInt(studyId);
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.getStudy = function (studyId) {
        var url = this.endPoint.studyDetailUrl() + studyId;
        // ...using get request
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    ObservationsService.prototype.createOrderForStudy = function (studyId) {
        var url = this.endPoint.studyDetailUrl() + studyId + "/order";
        return this.http.post(url)
            .map(function (res) {
            return true;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ObservationsService.prototype.cancelOrder = function (studyId) {
        var url = this.endPoint.studyDetailUrl() + studyId + "/order";
        return this.http.delete(url)
            .map(function (res) {
            return true;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return ObservationsService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
ObservationsService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_6__app_endpoints__["a" /* EndPoint */], __WEBPACK_IMPORTED_MODULE_5__studylist_studylist_service__["a" /* StudylistService */]])
], ObservationsService);



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudylistService; });






// Import RxJs required methods


var StudylistService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](StudylistService, _super);
    function StudylistService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        _this.studyUpdateEmitter = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        return _this;
    }
    StudylistService.prototype.getCurrentStudy = function () {
        return this.currentStudy;
    };
    StudylistService.prototype.getStudyUpdateEmitter = function () {
        return this.studyUpdateEmitter;
    };
    StudylistService.prototype.getListDetails = function (duration, filter, searchData) {
        var url = this.getStudyListUrl(duration, filter, searchData);
        // ...using get request
        return this.http.put(url, searchData)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    StudylistService.prototype.getStudyDetails = function (studyId) {
        var _this = this;
        var url = this.endPoint.studyDetailUrl() + studyId;
        // ...using get request
        return this.http.get(url)
            .map(function (res) { _this.currentStudy = res.json(); _this.studyUpdateEmitter.emit(studyId); return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    StudylistService.prototype.refereshStudyDetails = function (studyId) {
        this.getStudyDetails(studyId).subscribe(function () {
            console.log("refereshStudyDetails complete");
        });
    };
    StudylistService.prototype.updateStatus = function (studyId, type) {
        var _this = this;
        if (type == 'qa') {
            var url = this.endPoint.assignQaUserUrl() + "/" + studyId + "/qaassign";
        }
        else {
            var url = this.endPoint.changeStatusUrl() + "/" + studyId + "/pocassign";
        }
        return this.http.post(url)
            .map(function (res) {
            _this.refereshStudyDetails(studyId);
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.getStudyListUrl = function (duration, filter, searchData) {
        return this.endPoint.studyListUrl() + "?" + this.getDurationString(duration) + this.getFilterString(filter);
    };
    StudylistService.prototype.unAssignStudyWorksheet = function (studyId) {
        var _this = this;
        var url = this.endPoint.deleteWorksheetUrl() + "/study/" + studyId;
        return this.http.delete(url)
            .map(function (res) {
            _this.refereshStudyDetails(studyId);
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.unAssignStudy = function (studyId) {
        var _this = this;
        var studyUrl = this.endPoint.changeStatusUrl() + "/" + studyId + "/admin/modifystatus";
        return this.http.delete(studyUrl)
            .map(function (res) {
            _this.refereshStudyDetails(studyId);
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.updateReassignUsername = function (studyId, userId) {
        var _this = this;
        var url = this.endPoint.changeStatusUrl() + "/" + studyId + "/reassignuser/" + userId;
        return this.http.put(url)
            .map(function (res) {
            _this.refereshStudyDetails(studyId);
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.modifyStatus = function (studyId) {
        var _this = this;
        var url = this.endPoint.unassignStudyUrl() + "/" + studyId + "/modifystatus";
        return this.http.put(url)
            .map(function (res) {
            _this.refereshStudyDetails(studyId);
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.showDropdown = function (studyId) {
        var url = this.endPoint.changeStatusUrl() + "/" + studyId + "/statuscheck";
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.deleteStudy = function (studyId) {
        var url = this.endPoint.changeStatusUrl() + "/" + studyId;
        return this.http.delete(url)
            .map(function (res) {
            console.log("response", res);
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.assignStudyToAttending = function (studyId, userId) {
        var url = this.endPoint.changeStatusUrl() + "/" + studyId + "/assigntoattendUser/" + userId;
        return this.http.put(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.assignStudyByAdmin = function (studyId, userId) {
        var _this = this;
        var url = this.endPoint.changeStatusUrl() + "/" + studyId + "/admin/" + userId;
        return this.http.post(url)
            .map(function (res) {
            _this.refereshStudyDetails(studyId);
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.getSearchStatus = function () {
        var url = this.endPoint.studyDetailUrl() + "statusList";
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    StudylistService.prototype.getSearchExamType = function () {
        var url = this.endPoint.getExamtypeDetailsUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return StudylistService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
StudylistService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], StudylistService);



/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserGroupService; });






// Import RxJs required methods


var UserGroupService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](UserGroupService, _super);
    function UserGroupService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    UserGroupService.prototype.saveNewUserGroup = function (data) {
        var url = this.endPoint.saveNewGroupUserUrl();
        return this.http.post(url, data)
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserGroupService.prototype.getUniqueGroupName = function (groupName) {
        var url = this.endPoint.getUniqueUserGroupName() + "?name=" + groupName;
        // ...using get request
        return this.http.get(url)
            .map(function (res) {
            var json = res.json();
            console.log("Returnded data", json);
            return json;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserGroupService.prototype.getUserDetails = function () {
        var url = this.endPoint.getUserListUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserGroupService.prototype.getUserList = function () {
        var url = this.endPoint.userUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserGroupService.prototype.getUserGroupById = function (userGroupId) {
        var url = this.endPoint.getUserGroupById() + "/" + userGroupId;
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserGroupService.prototype.updateUserGroup = function (userGroupId, data) {
        var url = this.endPoint.getUserGroupById() + "/" + userGroupId;
        return this.http.put(url, data)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserGroupService.prototype.getPermissions = function () {
        var url = this.endPoint.getPermissionsUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserGroupService.prototype.getOrganizations = function () {
        var url = this.endPoint.getOrganizationsUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserGroupService.prototype.getRole = function () {
        var url = this.endPoint.roleUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return UserGroupService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
UserGroupService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], UserGroupService);



/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudyStatus; });
var StudyStatus;
(function (StudyStatus) {
    StudyStatus[StudyStatus["New"] = 1] = "New";
    StudyStatus[StudyStatus["Assigned"] = 2] = "Assigned";
    StudyStatus[StudyStatus["Pending"] = 3] = "Pending";
    StudyStatus[StudyStatus["Signed"] = 4] = "Signed";
    StudyStatus[StudyStatus["QAUnassigned"] = 5] = "QAUnassigned";
    StudyStatus[StudyStatus["QAAssigned"] = 6] = "QAAssigned";
    StudyStatus[StudyStatus["QAInProgress"] = 7] = "QAInProgress";
    StudyStatus[StudyStatus["SubmittedForAttestation"] = 8] = "SubmittedForAttestation";
    StudyStatus[StudyStatus["Attested"] = 9] = "Attested";
    StudyStatus[StudyStatus["Submitted"] = 10] = "Submitted";
})(StudyStatus || (StudyStatus = {}));


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleService; });






// Import RxJs required methods


var RoleService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](RoleService, _super);
    function RoleService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    RoleService.prototype.saveNewRole = function (data) {
        var url = this.endPoint.roleUrl();
        return this.http.post(url, data)
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    RoleService.prototype.getPermissions = function () {
        var url = this.endPoint.getPermissionsUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    RoleService.prototype.getOrganizations = function () {
        var url = this.endPoint.getOrganizationsUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    RoleService.prototype.getUniqueRoleName = function (roleName) {
        var url = this.endPoint.getUniqueRoleName() + "?name=" + roleName;
        // ...using get request
        return this.http.get(url)
            .map(function (res) {
            var json = res.json();
            return json;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    RoleService.prototype.getRoleById = function (roleId) {
        var url = this.endPoint.roleUrl() + "/" + roleId;
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    RoleService.prototype.updateRole = function (roleId, data) {
        var url = this.endPoint.roleUrl() + "/" + roleId;
        return this.http.put(url, data)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return RoleService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
RoleService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], RoleService);



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Name; });
var Name = (function () {
    function Name(id, text) {
        this.id = id;
        this.text = text;
    }
    return Name;
}());



/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return decorateModuleRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ENV_PROVIDERS; });
// Angular 2
// rc2 workaround


// Environment Providers
var PROVIDERS = [];
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateModuleRef = function identity(value) { return value; };
if (false) {
    // Production
    disableDebugTools();
    enableProdMode();
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ApplicationRef"]);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["enableDebugTools"])(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
var decorateModuleRef = _decorateModuleRef;
var ENV_PROVIDERS = PROVIDERS.slice();


/***/ }),
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__studylist_studylist_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__imageviewer_observations_observations_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_enum__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_rule__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HideOnDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DisableOnDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return EnableOnDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return InnerHtmlOnDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return UIRuleDirective; });







var ConditionalDirective = (function () {
    function ConditionalDirective(el, _appState, _studyService, _observationsService, renderer) {
        this.el = el;
        this._appState = _appState;
        this._studyService = _studyService;
        this._observationsService = _observationsService;
        this.renderer = renderer;
    }
    ConditionalDirective.prototype.ngOnInit = function (condition) {
        var _this = this;
        this.condition = condition;
        this.getPreferenceDetails();
        this.getStudyDetails();
        this.validate();
        this._studyService.getStudyUpdateEmitter().subscribe(function (res) {
            _this.getStudyDetails();
            _this.validate();
        });
        this._observationsService.getWrkshtUpdateEmitter().subscribe(function (res) {
            _this.qaSigned = res.qaSigned;
            _this.validate();
        });
        this._observationsService.getQaAttestedSignEmitter().subscribe(function (res) {
            _this.qaAttestationSignId = res.qaAttestationSignId;
            _this.validate();
        });
    };
    ConditionalDirective.prototype.getPreferenceDetails = function () {
        this.qaEnabled = this._appState.get("preference.qaEnabled") ? true : false;
        console.log("this.qaEnabled ", this._appState.get("preference.qaEnabled"));
        this.attestationEnabled = this._appState.get("preference.attestationEnabled") ? true : false;
        console.log("this.attestationEnabled ", this._appState.get("preference.attestationEnabled"));
        this.submitOnSign = this._appState.get("preference.submitOnSign") ? true : false;
        console.log("this.submitOnSign ", this._appState.get("preference.submitOnSign"));
        this.loggedInUser = this._appState.get("userId");
        if (!this.loggedInUser) {
            console.error("Logged In User Id in AppState is null");
        }
    };
    ConditionalDirective.prototype.getStudyDetails = function () {
        var study = this._studyService.getCurrentStudy();
        if (study) {
            this.studyStatus = study[0].status[0];
            this.pocUser = (study[0].assignedUser[0]) ? study[0].assignedUser[0].id : null;
            this.qaUser = (study[0].qaUser[0]) ? study[0].qaUser[0].id : null;
            this.attestedUser = (study[0].attendingUser[0]) ? study[0].attendingUser[0].id : null;
            var studyStatusNum = __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */][this.studyStatus];
            this.currentUser = (studyStatusNum <= __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */].Signed) ? this.pocUser : ((studyStatusNum <= __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */].QAInProgress) ? this.qaUser : this.attestedUser);
        }
        else {
            console.warn("No study details present in StudylistService");
        }
    };
    ConditionalDirective.prototype.getWorksheetDetails = function () {
        this.qaSigned = this._observationsService.getQaSigned();
    };
    ConditionalDirective.prototype.validate = function () {
        try {
            var studyStatus = this.studyStatus;
            var studyStatusNum = __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */][this.studyStatus];
            var StudyStatusEnum = __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */];
            console.log(StudyStatusEnum.SubmittedForAttestation);
            var qaEnabled = this.qaEnabled;
            var submitOnSign = this.submitOnSign;
            var attestationEnabled = this.attestationEnabled;
            var loggedInUser = this.loggedInUser;
            var pocUser = this.pocUser;
            var qaUser = this.qaUser;
            var attestedUser = this.attestedUser;
            var currentUser = this.currentUser;
            var qaSigned = this.qaSigned;
            var qaAttestationSignId = this.qaAttestationSignId;
            var result = eval(this.condition);
            console.log(this.constructor.name, " => Condition:", this.condition, " | Result:", result);
            console.log(studyStatus, studyStatusNum);
            if (result)
                this.success();
            else
                this.failure();
        }
        catch (e) {
            console.error("Invalid condition" + this.condition, "Available variables studyStatus(string), studyStatusNum(integer), StudyStatusEnum(enum), qaEnabled(boolean), attestationEnabled(boolean), loggedInUser(string), pocUser(string), qaUser(string), attestedUser(string), currentUser(string), qaSigned(boolean).", e);
        }
    };
    ConditionalDirective.prototype.success = function () {
    };
    ConditionalDirective.prototype.failure = function () {
    };
    return ConditionalDirective;
}());
var HideOnDirective = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](HideOnDirective, _super);
    function HideOnDirective(el, _appState, _studyService, _observationsService, renderer) {
        var _this = _super.call(this, el, _appState, _studyService, _observationsService, renderer) || this;
        _this.el = el;
        _this._appState = _appState;
        _this._studyService = _studyService;
        _this._observationsService = _observationsService;
        _this.renderer = renderer;
        return _this;
    }
    HideOnDirective.prototype.ngOnInit = function () {
        console.log('HideOnDirective', this.condition);
        _super.prototype.ngOnInit.call(this, this.condition);
    };
    HideOnDirective.prototype.success = function () {
        this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    };
    HideOnDirective.prototype.failure = function () {
        this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
    };
    return HideOnDirective;
}(ConditionalDirective));
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('hideOn'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], HideOnDirective.prototype, "condition", void 0);
HideOnDirective = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"])({
        selector: '[hideOn]'
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__studylist_studylist_service__["a" /* StudylistService */],
        __WEBPACK_IMPORTED_MODULE_4__imageviewer_observations_observations_service__["a" /* ObservationsService */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
], HideOnDirective);

var DisableOnDirective = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](DisableOnDirective, _super);
    function DisableOnDirective(el, _appState, _studyService, _observationsService, renderer) {
        var _this = _super.call(this, el, _appState, _studyService, _observationsService, renderer) || this;
        _this.el = el;
        _this._appState = _appState;
        _this._studyService = _studyService;
        _this._observationsService = _observationsService;
        _this.renderer = renderer;
        return _this;
    }
    DisableOnDirective.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this, this.condition);
    };
    DisableOnDirective.prototype.success = function () {
        this.renderer.setElementProperty(this.el.nativeElement, 'disabled', true);
    };
    DisableOnDirective.prototype.failure = function () {
        this.renderer.setElementProperty(this.el.nativeElement, 'disabled', false);
    };
    return DisableOnDirective;
}(ConditionalDirective));
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('disableOn'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], DisableOnDirective.prototype, "condition", void 0);
DisableOnDirective = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"])({
        selector: '[disableOn]'
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__studylist_studylist_service__["a" /* StudylistService */],
        __WEBPACK_IMPORTED_MODULE_4__imageviewer_observations_observations_service__["a" /* ObservationsService */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
], DisableOnDirective);

var EnableOnDirective = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](EnableOnDirective, _super);
    function EnableOnDirective(el, _appState, _studyService, _observationsService, renderer) {
        var _this = _super.call(this, el, _appState, _studyService, _observationsService, renderer) || this;
        _this.el = el;
        _this._appState = _appState;
        _this._studyService = _studyService;
        _this._observationsService = _observationsService;
        _this.renderer = renderer;
        return _this;
    }
    EnableOnDirective.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this, this.condition);
    };
    EnableOnDirective.prototype.success = function () {
        this.renderer.setElementProperty(this.el.nativeElement, 'disabled', false);
    };
    EnableOnDirective.prototype.failure = function () {
        this.renderer.setElementProperty(this.el.nativeElement, 'disabled', true);
    };
    return EnableOnDirective;
}(ConditionalDirective));
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('enableOn'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], EnableOnDirective.prototype, "condition", void 0);
EnableOnDirective = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"])({
        selector: '[enableOn]'
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__studylist_studylist_service__["a" /* StudylistService */],
        __WEBPACK_IMPORTED_MODULE_4__imageviewer_observations_observations_service__["a" /* ObservationsService */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
], EnableOnDirective);

var InnerHtmlOnDirective = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](InnerHtmlOnDirective, _super);
    function InnerHtmlOnDirective(el, _appState, _studyService, _observationsService, renderer) {
        var _this = _super.call(this, el, _appState, _studyService, _observationsService, renderer) || this;
        _this.el = el;
        _this._appState = _appState;
        _this._studyService = _studyService;
        _this._observationsService = _observationsService;
        _this.renderer = renderer;
        return _this;
    }
    InnerHtmlOnDirective.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this, this.condition);
    };
    InnerHtmlOnDirective.prototype.success = function () {
        this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.htmlString);
    };
    InnerHtmlOnDirective.prototype.failure = function () {
        this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.defaultHtmlString);
    };
    return InnerHtmlOnDirective;
}(ConditionalDirective));
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('innerHtmlOn'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], InnerHtmlOnDirective.prototype, "condition", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('innerHtml'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], InnerHtmlOnDirective.prototype, "htmlString", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('defaultHtml'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], InnerHtmlOnDirective.prototype, "defaultHtmlString", void 0);
InnerHtmlOnDirective = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"])({
        selector: '[innerHtmlOn]'
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__studylist_studylist_service__["a" /* StudylistService */],
        __WEBPACK_IMPORTED_MODULE_4__imageviewer_observations_observations_service__["a" /* ObservationsService */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
], InnerHtmlOnDirective);

var UIRuleDirective = (function () {
    function UIRuleDirective(el, _ruleService, renderer) {
        this.el = el;
        this._ruleService = _ruleService;
        this.renderer = renderer;
    }
    UIRuleDirective.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ruleIds", this.ruleIds);
        this._ruleService.getDataChangeEmitter().subscribe(function () {
            _this.executeRules();
        });
        this.executeRules();
    };
    UIRuleDirective.prototype.executeRules = function () {
        var results = this._ruleService.execute(this.ruleIds);
        console.log("results", results);
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var result = results_1[_i];
            if (result.hasOwnProperty('hide'))
                this.hide(result.hide);
            else if (result.hasOwnProperty('innerHTML'))
                this.innerHTML(result.innerHTML);
            else if (result.hasOwnProperty('disable'))
                this.disable(result.disable);
        }
    };
    UIRuleDirective.prototype.hide = function (flag) {
        if (flag)
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
        else
            this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
    };
    UIRuleDirective.prototype.innerHTML = function (content) {
        this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', content);
    };
    UIRuleDirective.prototype.disable = function (flag) {
        if (flag)
            this.renderer.setElementProperty(this.el.nativeElement, 'disabled', true);
        else
            this.renderer.setElementProperty(this.el.nativeElement, 'disabled', false);
    };
    return UIRuleDirective;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('uiRule'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], UIRuleDirective.prototype, "ruleIds", void 0);
UIRuleDirective = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"])({
        selector: '[uiRule]'
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_6__app_rule__["a" /* RuleService */],
        __WEBPACK_IMPORTED_MODULE_1__angular_core__["Renderer"]])
], UIRuleDirective);



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmDeactivateGuard; });

var ConfirmDeactivateGuard = (function () {
    function ConfirmDeactivateGuard() {
    }
    ConfirmDeactivateGuard.prototype.canDeactivate = function (component) {
        //if there are no pending changes, just allow deactivation; else confirm first
        var res = component.canDeactivate();
        if (res instanceof __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["Observable"]) {
            return res.first().map(function (x) {
                console.log('isAdmin returned ' + x);
                if (!x) {
                    console.log('canActivate = false');
                    return false;
                }
                else {
                    console.log('canActivate = true');
                    return true;
                }
            });
        }
        return res;
    };
    return ConfirmDeactivateGuard;
}());



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PreferenceResolver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_RESOLVER_PROVIDERS; });




var PreferenceResolver = (function () {
    function PreferenceResolver(appService) {
        this.appService = appService;
    }
    PreferenceResolver.prototype.resolve = function (route, state) {
        return this.appService.loadPreference();
    };
    return PreferenceResolver;
}());
PreferenceResolver = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppState */]])
], PreferenceResolver);

// an array of services to resolve routes with data
var APP_RESOLVER_PROVIDERS = [
    PreferenceResolver
];


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__studylist_studylist_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__imageviewer_observations_observations_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_enum__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__uirule_test_rule__ = __webpack_require__(307);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RuleService; });







var ruleSet = [
    new __WEBPACK_IMPORTED_MODULE_6__uirule_test_rule__["a" /* TestRule1 */](),
    new __WEBPACK_IMPORTED_MODULE_6__uirule_test_rule__["b" /* TestRule2 */]()
];
var RuleService = (function () {
    function RuleService(_appState, _studyService, _observationsService) {
        this._appState = _appState;
        this._studyService = _studyService;
        this._observationsService = _observationsService;
        this.dataChangeEmitter = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.ruleMap = {};
        this.init();
    }
    RuleService.prototype.getDataChangeEmitter = function () {
        return this.dataChangeEmitter;
    };
    RuleService.prototype.init = function () {
        var _this = this;
        this.createRuleMap();
        this.getPreferenceDetails();
        this.getStudyDetails();
        this._studyService.getStudyUpdateEmitter().subscribe(function (res) {
            _this.getStudyDetails();
            _this.dataChangeEmitter.emit();
        });
        this._observationsService.getWrkshtUpdateEmitter().subscribe(function (res) {
            _this.qaSigned = res.qaSigned;
            _this.dataChangeEmitter.emit();
        });
    };
    RuleService.prototype.createRuleMap = function () {
        for (var _i = 0, ruleSet_1 = ruleSet; _i < ruleSet_1.length; _i++) {
            var ruleEntry = ruleSet_1[_i];
            var rule = ruleEntry;
            if (!this.ruleMap[rule.ruleId()]) {
                this.ruleMap[rule.ruleId()] = rule;
            }
            else {
                console.error("Duplicate Rule Definition found for rule id:", rule.ruleId());
            }
        }
    };
    RuleService.prototype.getPreferenceDetails = function () {
        this.qaEnabled = this._appState.get("preference.qaEnabled") ? true : false;
        console.log("this.qaEnabled ", this._appState.get("preference.qaEnabled"));
        this.attestationEnabled = this._appState.get("preference.attestationEnabled") ? true : false;
        console.log("this.attestationEnabled ", this._appState.get("preference.attestationEnabled"));
        this.loggedInUser = this._appState.get("userId");
        if (!this.loggedInUser) {
            console.error("Logged In User Id in AppState is null");
        }
    };
    RuleService.prototype.getStudyDetails = function () {
        var study = this._studyService.getCurrentStudy();
        if (study) {
            this.studyStatus = study[0].status[0];
            this.studyStatusNum = __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */][this.studyStatus];
            this.pocUser = (study[0].assignedUser) ? study[0].assignedUser.id : null;
            this.qaUser = (study[0].qaUser) ? study[0].qaUser.id : null;
            this.attestedUser = (study[0].attendingUser) ? study[0].attendingUser.id : null;
            var studyStatusNum = __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */][this.studyStatus];
            this.currentUser = (studyStatusNum <= __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */].Signed) ? this.pocUser : ((studyStatusNum <= __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */].QAInProgress) ? this.qaUser : this.attestedUser);
        }
        else {
            console.warn("No study details present in StudylistService");
        }
    };
    RuleService.prototype.getWorksheetDetails = function () {
        this.qaSigned = this._observationsService.getQaSigned();
    };
    RuleService.prototype.getContext = function () {
        var context = {};
        context.studyStatus = this.studyStatus;
        context.studyStatusNum = __WEBPACK_IMPORTED_MODULE_5__app_enum__["a" /* StudyStatus */][this.studyStatus];
        context.qaEnabled = this.qaEnabled;
        context.attestationEnabled = this.attestationEnabled;
        context.loggedInUser = this.loggedInUser;
        context.pocUser = this.pocUser;
        context.qaUser = this.qaUser;
        context.attestedUser = this.attestedUser;
        context.currentUser = this.currentUser;
        context.qaSigned = this.qaSigned;
        return context;
    };
    RuleService.prototype.execute = function (ruleIds) {
        var context = this.getContext();
        var results = [];
        for (var index in ruleIds) {
            var ruleId = ruleIds[index];
            var rule = this.ruleMap[ruleId];
            if (!rule) {
                console.error("No Rule Available For ID :" + ruleId);
                continue;
            }
            try {
                var ruleResult = rule.execute(context);
                ruleResult.ruleId = ruleId;
                results.push(ruleResult);
            }
            catch (e) {
                console.error("Error while executing rule" + ruleId, e);
            }
        }
        return results;
    };
    return RuleService;
}());
RuleService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__studylist_studylist_service__["a" /* StudylistService */],
        __WEBPACK_IMPORTED_MODULE_4__imageviewer_observations_observations_service__["a" /* ObservationsService */]])
], RuleService);



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadCrumService; });








var BreadCrumService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](BreadCrumService, _super);
    function BreadCrumService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    BreadCrumService.prototype.getPreference = function (id) {
        var url = this.endPoint.userPreferenceUrl() + '/' + id + '/preference?type=1';
        console.log("get url", url);
        return this.http.get(url)
            .map(function (res) {
            console.log('response from url is' + res, __WEBPACK_IMPORTED_MODULE_2__angular_http__["Response"]);
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    BreadCrumService.prototype.updatePreference = function (id, prefObj) {
        var url = this.endPoint.userPreferenceUrl() + '/' + id + '/preference';
        return this.http.post(url, prefObj)
            .map(function (res) {
            console.log('response from post' + res, __WEBPACK_IMPORTED_MODULE_2__angular_http__["Response"]);
            var location = res.headers.get('Location');
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return BreadCrumService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
BreadCrumService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], BreadCrumService);



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createexamtype_createexamtype_interface__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createexamtype_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateExamTypeComponent; });






var CreateExamTypeComponent = (function () {
    function CreateExamTypeComponent(createExamTypeService, router, route) {
        this.createExamTypeService = createExamTypeService;
        this.router = router;
        this.route = route;
        this.examAliasNames = [];
        this.tags = [];
        this.examTypeRequired = false;
        this.examTypePresent = false;
        this.cptManCode = [];
        this.cptOptCode = [];
        this.cptList = [];
        this.templateList = [];
        this.templateitems = [];
        this.examtype = {};
        this.activeCptManCode = [];
        this.savedWorksheet = [];
        this.examTypeError = false;
    }
    CreateExamTypeComponent.prototype.selected = function (value) {
        console.log('Selected value is: ', value);
        this.deleteCptCode(value.id);
    };
    CreateExamTypeComponent.prototype.deleteCptCode = function (id) {
        var _this = this;
        this.cptOptCode = this.cptManCode;
        this.cptManCode = [];
        this.cptOptCode.filter(function (element) {
            if (element.id == id) {
                console.log("BOTH IDS ARE SAME");
            }
            else
                _this.cptManCode.push(new __WEBPACK_IMPORTED_MODULE_2__createexamtype_createexamtype_interface__["a" /* CptCode */](element.id, element.text));
        });
    };
    CreateExamTypeComponent.prototype.removed = function (value) {
        var _this = this;
        this.cptOptCode = this.cptManCode;
        this.cptManCode = [];
        this.cptOptCode.filter(function (element) {
            _this.cptManCode.push(new __WEBPACK_IMPORTED_MODULE_2__createexamtype_createexamtype_interface__["a" /* CptCode */](element.id, element.text));
        });
        this.cptManCode.push(new __WEBPACK_IMPORTED_MODULE_2__createexamtype_createexamtype_interface__["a" /* CptCode */](value.id, value.text));
    };
    CreateExamTypeComponent.prototype.refreshValue = function (value) {
        this.examtype.worksheets = value;
    };
    CreateExamTypeComponent.prototype.refreshCptManValue = function (value) {
        this.examtype.manCptCode = value;
    };
    CreateExamTypeComponent.prototype.refreshCptOptValue = function (value) {
        this.examtype.optCptCode = value;
    };
    CreateExamTypeComponent.prototype.itemsToString = function (value) {
        if (value === void 0) { value = []; }
        return value
            .map(function (item) {
            return item.text;
        }).join(',');
    };
    CreateExamTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.formState = params['formState'];
            if (_this.formState == "Modify") {
                _this.route.params
                    .map(function (params) { return params['id']; })
                    .subscribe(function (id) {
                    _this.examTypeId = id;
                    _this.createExamTypeService.getExamTypeDetail(_this.examTypeId).subscribe(function (res) {
                        if (res.manCptCode) {
                            _this.generateArrayofActiveCptCode(res.manCptCode);
                        }
                        _this.examtype.manCptCode = _this.cptList;
                        if (res.optCptCode) {
                            _this.generateArrayofActiveCptCode(res.optCptCode);
                        }
                        _this.examtype.optCptCode = _this.cptList;
                        _this.examTypeName = res.examTypeName;
                        _this.examTypeDesc = res.examTypeDesc;
                        if (res.worksheets) {
                            _this.generateArrayOfSavedWorksheets(res.worksheets);
                        }
                        _this.examtype.worksheets = _this.savedWorksheet;
                        for (var len = res.examTypeAlias.length - 1; len >= 0; len--) {
                            _this.examAliasNames.push(res.examTypeAlias[len]);
                        }
                        for (var len = res.tagNames.length - 1; len >= 0; len--) {
                            _this.tags.push(res.tagNames[len]);
                        }
                        if (res.cptCodes) {
                            _this.generateArrayofActiveCptCode(res.cptCodes);
                            _this.cptManCode = _this.cptList;
                        }
                    });
                });
            }
            else {
                _this.createExamTypeService.getCptCodes().subscribe(function (res) {
                    _this.cptAll = res;
                    _this.generateArrayofCptCode(_this.cptAll);
                    _this.cptManCode = _this.cptList;
                    console.log("CPT List OnInit", _this.cptList);
                });
            }
        });
        this.createExamTypeService.getWorksheetTemplate().subscribe(function (res) {
            _this.templateDetails = res;
            _this.generateArrayofWorksheet(_this.templateDetails);
            _this.templateitems = _this.templateList;
            console.log("Template List onInit:", _this.templateList);
        });
    };
    CreateExamTypeComponent.prototype.generateArrayOfSavedWorksheets = function (worksheets) {
        var _this = this;
        worksheets.filter(function (element) {
            _this.savedWorksheet.push(new __WEBPACK_IMPORTED_MODULE_2__createexamtype_createexamtype_interface__["a" /* CptCode */](element.id, element.name));
        });
    };
    CreateExamTypeComponent.prototype.generateArrayofActiveCptCode = function (cptObjects) {
        var _this = this;
        this.cptList = [];
        cptObjects.filter(function (element) {
            _this.cptList.push(new __WEBPACK_IMPORTED_MODULE_2__createexamtype_createexamtype_interface__["a" /* CptCode */](element.id, element.code));
        });
    };
    CreateExamTypeComponent.prototype.navigateToExamTypeList = function () {
        this.router.navigate(['examtypelist']);
    };
    CreateExamTypeComponent.prototype.addType = function () {
        console.log("Exam Type Alias Name:", this.examTypeAlias, this.examAliasNames);
        if (this.examTypeAlias && this.examAliasNames.indexOf(this.examTypeAlias) < 0) {
            this.examAliasNames.push(this.examTypeAlias);
            this.examTypeAlias = '';
        }
    };
    CreateExamTypeComponent.prototype.deleteType = function (index) {
        this.examAliasNames.splice(this.examAliasNames.indexOf(index), 1);
    };
    CreateExamTypeComponent.prototype.addTag = function () {
        if (this.tagNames && this.tags.indexOf(this.tagNames) < 0) {
            this.tags.push(this.tagNames);
            this.tagNames = '';
        }
    };
    CreateExamTypeComponent.prototype.deleteTag = function (index) {
        this.tags.splice(this.tags.indexOf(index), 1);
    };
    CreateExamTypeComponent.prototype.generateArrayofCptCode = function (cptObjects) {
        var _this = this;
        this.cptList = [];
        cptObjects.results.filter(function (element) {
            _this.cptList.push(new __WEBPACK_IMPORTED_MODULE_2__createexamtype_createexamtype_interface__["a" /* CptCode */](element.id, element.code));
        });
    };
    CreateExamTypeComponent.prototype.generateArrayofWorksheet = function (templateObjects) {
        var _this = this;
        templateObjects.results.filter(function (element) {
            _this.templateList.push(new __WEBPACK_IMPORTED_MODULE_2__createexamtype_createexamtype_interface__["a" /* CptCode */](element.id, element.name));
        });
    };
    CreateExamTypeComponent.prototype.validateAlpha = function (e) {
        if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode < 123))
            return true;
        return false;
    };
    CreateExamTypeComponent.prototype.validateExamTypeName = function (examTypeName) {
        if (!examTypeName) {
            this.examTypeRequired = true;
            return true;
        }
        else {
            this.examTypeRequired = false;
            return false;
        }
    };
    CreateExamTypeComponent.prototype.getExamtypeName = function () {
        var _this = this;
        if (this.examTypeName) {
            return this.createExamTypeService.getUniqueExamType(this.examTypeName).subscribe(function (examTypeNameData) {
                _this.examTypePresent = examTypeNameData.isPresent;
            });
        }
    };
    CreateExamTypeComponent.prototype.removeExamtypeNameError = function () {
        this.examTypePresent = false;
        this.examTypeRequired = false;
        this.examTypeError = false;
    };
    CreateExamTypeComponent.prototype.cancelExamTypePopup = function () {
        if (this.formState === 'Add') {
            this.cancelExamPopUp.open();
        }
        else {
            this.examTypeModifyPopup.open();
        }
    };
    CreateExamTypeComponent.prototype.cancelExamType = function () {
        if (this.formState === 'Add') {
            this.cancelExamPopUp.close();
        }
        else {
            this.examTypeModifyPopup.close();
        }
    };
    CreateExamTypeComponent.prototype.confirmExamType = function () {
        this.navigateToExamTypeList();
    };
    CreateExamTypeComponent.prototype.doSave = function (createExamType) {
        var _this = this;
        this.errorMsg = this.validateExamTypeName(createExamType.examTypeName);
        if (this.errorMsg || this.examTypePresent)
            return;
        createExamType.tagNames = this.tags;
        createExamType.examTypeAlias = this.examAliasNames;
        createExamType.manCptCode = this.examtype.manCptCode;
        createExamType.optCptCode = this.examtype.optCptCode;
        createExamType.worksheets = this.examtype.worksheets;
        console.log("TAG VALUE IN OBJECT;", createExamType.tagName);
        console.log("TAG VALUE", this.tags);
        if (this.formState == "Add") {
            return this.createExamTypeService.saveExamType(createExamType).subscribe(function (res) {
                _this.examTypeCreatedPopUp.open();
                var that = _this;
                setTimeout(function () { that.examTypeCreatedPopUp.close(); that.navigateToExamTypeList(); }, 2000);
            }, function (error) { return console.error(error); });
        }
        else {
            return this.createExamTypeService.updateExamType(this.examTypeId, createExamType).subscribe(function (res) {
                _this.examTypeModifyToast.open();
                var that = _this;
                setTimeout(function () { that.examTypeModifyToast.close(); that.navigateToExamTypeList(); }, 2000);
            }, function (error) { return console.error(error); });
        }
    };
    return CreateExamTypeComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('examTypeCreatedPopUp'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateExamTypeComponent.prototype, "examTypeCreatedPopUp", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('cancelExamPopUp'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateExamTypeComponent.prototype, "cancelExamPopUp", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('examTypeModifyPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateExamTypeComponent.prototype, "examTypeModifyPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('examTypeModifyToast'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateExamTypeComponent.prototype, "examTypeModifyToast", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('createExamType'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], CreateExamTypeComponent.prototype, "createExamType", void 0);
CreateExamTypeComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(386)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__createexamtype_service__["a" /* CreateExamTypeService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_4__angular_router__["ActivatedRoute"]])
], CreateExamTypeComponent);



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateExamTypeService; });








var CreateExamTypeService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](CreateExamTypeService, _super);
    function CreateExamTypeService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    CreateExamTypeService.prototype.saveExamType = function (data) {
        var url = this.endPoint.saveExamTypeUrl();
        return this.http.post(url, data)
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    CreateExamTypeService.prototype.getCptCodes = function () {
        var url = this.endPoint.getCptCodes();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    CreateExamTypeService.prototype.getUniqueExamType = function (examtypeName) {
        var url = this.endPoint.getUniqueExamtypeName() + "?name=" + examtypeName;
        // ...using get request
        return this.http.get(url)
            .map(function (res) {
            var json = res.json();
            return json;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    CreateExamTypeService.prototype.getWorksheetTemplate = function () {
        var url = this.endPoint.getExamWorksheetTemplate();
        // ...using get request
        return this.http.get(url)
            .map(function (res) {
            var json = res.json();
            return json;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    CreateExamTypeService.prototype.getExamTypeDetail = function (examId) {
        var url = this.endPoint.getExamtypeDetailsUrl() + "/" + parseInt(examId);
        // ...using get request
        return this.http.get(url)
            .map(function (res) {
            var json = res.json();
            return json;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    CreateExamTypeService.prototype.updateExamType = function (examTypeId, data) {
        var url = this.endPoint.getExamtypeDetailsUrl() + "/" + parseInt(examTypeId);
        return this.http.put(url, data)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return CreateExamTypeService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
CreateExamTypeService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], CreateExamTypeService);



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createrole_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createrole_interface__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateRoleComponent; });







var CreateRoleComponent = (function () {
    function CreateRoleComponent(router, route, roleService) {
        this.router = router;
        this.route = route;
        this.roleService = roleService;
        this.roleData = {};
        this.permissionsChanged = false;
        this.permissionList = [];
        this.permissionsList = [];
        this.permissionExists = true;
        this.roleNameExceeds = true;
        this.organizationList = [];
        this.organizationsList = [];
        this.roleNameValid = true;
    }
    CreateRoleComponent.prototype.selectedPermissions = function (value) {
        this.permissionsChanged = true;
        this.permissionExists = true;
    };
    CreateRoleComponent.prototype.selectedOrganization = function (value) {
        this.permissionsChanged = true;
    };
    CreateRoleComponent.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
        this.permissionsChanged = true;
    };
    CreateRoleComponent.prototype.removedOrg = function (value) {
        console.log('Removed value is: ', value);
        this.permissionsChanged = true;
    };
    CreateRoleComponent.prototype.refreshValue = function (value) {
        this.roleData.permission = value;
        this.permissionsChanged = true;
    };
    CreateRoleComponent.prototype.refreshOrgValue = function (value) {
        this.roleData.organization = value;
        this.permissionsChanged = true;
    };
    CreateRoleComponent.prototype.generateArray = function (roles) {
        var _this = this;
        roles.results.filter(function (element) {
            _this.permissionList.push(new __WEBPACK_IMPORTED_MODULE_4__createrole_interface__["a" /* Name */](element.id, element.permissionName));
        });
    };
    CreateRoleComponent.prototype.organizationArray = function (organizations) {
        var _this = this;
        organizations.results.filter(function (element) {
            _this.organizationList.push(new __WEBPACK_IMPORTED_MODULE_4__createrole_interface__["a" /* Name */](element.id, element.orgName));
        });
    };
    CreateRoleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.formState = params['formState'];
            if (_this.formState == "Modify") {
                _this.route.params
                    .map(function (params) { return params['id']; })
                    .subscribe(function (id) {
                    _this.roleId = id;
                    _this.roleService.getRoleById(id).subscribe(function (res) {
                        _this.roleData.roleName = res.roleName;
                        _this.roleData.description = res.description;
                        _this.roleData.permission = [];
                        for (var len = res.permission.length, pos = 0; pos < len; pos++) {
                            _this.roleData.permission.push({ id: res.permission[pos].id, text: res.permission[pos].permissionName });
                        }
                        _this.roleData.organization = [];
                        for (var leng = res.organization.length, pos = 0; pos < leng; pos++) {
                            _this.roleData.organization.push({ id: res.organization[pos].id, text: res.organization[pos].orgName });
                        }
                    }, function (error) { return console.error(error); });
                });
            }
            else if (_this.formState == "Clone") {
                _this.route.params
                    .map(function (params) { return params['id']; })
                    .subscribe(function (id) {
                    _this.roleId = id;
                    _this.roleService.getRoleById(id).subscribe(function (res) {
                        _this.roleData.roleName = res.roleName + " Copy";
                        _this.roleData.description = res.description;
                        _this.roleData.permission = [];
                        for (var len = res.permission.length, pos = 0; pos < len; pos++) {
                            _this.roleData.permission.push({ id: res.permission[pos].id, text: res.permission[pos].permissionName });
                        }
                        _this.roleData.organization = [];
                    }, function (error) { return console.error(error); });
                });
            }
        });
        this.roleService.getPermissions().subscribe(function (res) {
            _this.permissions = res;
            _this.generateArray(_this.permissions);
            _this.permissionsList = _this.permissionList;
            console.log("Permission List onInit", _this.permissionList);
        });
        this.roleService.getOrganizations().subscribe(function (res) {
            _this.organizations = res;
            _this.organizationArray(_this.organizations);
            _this.organizationsList = _this.organizationList;
            console.log("Organization List onInit", _this.organizationList);
        });
    };
    CreateRoleComponent.prototype.duplicateRoleNameCheck = function (value, isValid) {
        var _this = this;
        this.roleService.getUniqueRoleName(value.roleName).subscribe(function (res) {
            _this.roleNameExists = res.isPresent;
            _this.roleNameValid = true;
            if (value.roleName.length > 50) {
                _this.roleNameExceeds = false;
            }
            else if (value.roleName.length <= 50) {
                _this.roleNameExceeds = true;
                _this.doSave(value, isValid);
            }
        });
    };
    CreateRoleComponent.prototype.validateAlpha = function (e) {
        if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode < 123) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 32)
            return true;
        return false;
    };
    CreateRoleComponent.prototype.navigateToRoleList = function () {
        this.router.navigate(['rolelist']);
    };
    CreateRoleComponent.prototype.doSave = function (value, isValid) {
        var _this = this;
        value.permission = this.roleData.permission;
        value.organization = this.roleData.organization;
        if (!value.permission || value.permission.length == 0) {
            this.permissionExists = false;
        }
        if ((isValid) && (!this.roleNameExists) && (this.roleNameValid != false)) {
            if (this.formState == "Add" || this.formState == "Clone") {
                return this.roleService.saveNewRole(value).subscribe(function (res) {
                    _this.roleId = res;
                    _this.roleAddedPopup.open();
                    var that = _this;
                    setTimeout(function () {
                        that.roleAddedPopup.close();
                        that.createRoleForm.reset();
                        that.navigateToRoleList();
                    }, 1500);
                }, function (error) { return console.error(error); });
            }
            else {
                return this.roleService.updateRole(this.roleId, value).subscribe(function (res) {
                    _this.roleUpdatePopup.open();
                    _this.permissionsChanged = false;
                    var that = _this;
                    setTimeout(function () {
                        that.roleUpdatePopup.close();
                        that.navigateToRoleList();
                    }, 1500);
                }, function (error) { return console.error(error); });
            }
        }
    };
    CreateRoleComponent.prototype.cancelPopup = function (value) {
        this.navigateToRoleList();
    };
    CreateRoleComponent.prototype.getRoleName = function (value) {
        var _this = this;
        if (!value) {
            this.roleNameExists = false;
            this.roleNameValid = true;
        }
        else if (value.trim() == "") {
            this.roleNameValid = false;
        }
        else {
            this.roleService.getUniqueRoleName(value).subscribe(function (roleNameData) {
                _this.roleNameExists = roleNameData.isPresent;
                _this.roleNameValid = true;
                if (value.length > 50) {
                    _this.roleNameExceeds = false;
                }
                else if (value.length <= 50) {
                    _this.roleNameExceeds = true;
                }
            });
        }
    };
    CreateRoleComponent.prototype.removeRoleNameError = function () {
        this.roleNameExists = false;
        this.roleNameValid = true;
    };
    return CreateRoleComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('createRoleForm'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_5__angular_forms__["NgForm"])
], CreateRoleComponent.prototype, "createRoleForm", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('roleAddedPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateRoleComponent.prototype, "roleAddedPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('roleUpdatePopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateRoleComponent.prototype, "roleUpdatePopup", void 0);
CreateRoleComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(387)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"],
        __WEBPACK_IMPORTED_MODULE_2__createrole_service__["a" /* RoleService */]])
], CreateRoleComponent);



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Name; });
var Name = (function () {
    function Name(id, text) {
        this.id = id;
        this.text = text;
    }
    return Name;
}());



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__createuser_interface__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUserComponent; });








var CreateUserComponent = (function () {
    function CreateUserComponent(userService, router, route) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.user = {};
        this.pattern = "[0-9]+";
        this.allList = [];
        this.userPrivilegeList = [];
        this.orgList = [];
        this.userRoleList = [];
        this.userGroupList = [];
        this.userExists = false;
        this.emailExists = false;
        this.invalidEmail = false;
        this.selectOption = [
            {
                value: "Select"
            }, {
                value: "Medical student"
            }, {
                value: "Fellow"
            }, {
                value: "Practicing physician"
            }, {
                value: "Physician"
            }, {
                value: "Physician assistant (PA)"
            }, {
                value: "Resident"
            }, {
                value: "Nurse"
            }, {
                value: "Specialist"
            }, {
                value: "Admin"
            }, {
                value: "Technician"
            }, {
                value: "Other"
            }
        ];
        this.selectOptionPrefix = [{
                value: "Select"
            }, {
                value: "Mr"
            }, {
                value: "Dr"
            },
            {
                value: "Ms"
            }];
        this.user.title = this.selectOption[0].value;
        this.user.prefix = this.selectOptionPrefix[0].value;
        this.titleExists = true;
    }
    CreateUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.formState = params['formState'];
            if (_this.formState == "Modify") {
                _this.route.params
                    .map(function (params) { return params['id']; })
                    .subscribe(function (id) {
                    _this.userId = id;
                    _this.userService.getUser(id).subscribe(function (res) {
                        _this.user.prefix = res.prefix ? res.prefix : 'Select';
                        _this.user.title = res.title;
                        _this.user.firstName = res.firstName;
                        _this.user.lastName = res.lastName;
                        _this.user.userName = res.userName;
                        _this.user.phoneCountryCode = res.phone.split(" ")[0];
                        _this.user.phoneStateCode = res.phone.split(" ")[1];
                        _this.user.phone = res.phone.split(" ")[2];
                        _this.user.email = res.email;
                        _this.userEmail = res.email;
                        _this.user.activePrivilegeList = [];
                        for (var len = res.permission.length, pos = 0; pos < len; pos++) {
                            _this.user.activePrivilegeList.push({ id: res.permission[pos].id, text: res.permission[pos].permissionName });
                        }
                        _this.user.activeOrgList = [];
                        for (var leng = res.userOrg.length, pos = 0; pos < leng; pos++) {
                            _this.user.activeOrgList.push({ id: res.userOrg[pos].id, text: res.userOrg[pos].orgName });
                        }
                        _this.user.activeRoleList = [];
                        for (var leng = res.role.length, pos = 0; pos < leng; pos++) {
                            _this.user.activeRoleList.push({ id: res.role[pos].id, text: res.role[pos].roleName });
                        }
                        _this.user.activeGroupList = [];
                        for (var leng = res.userGroup.length, pos = 0; pos < leng; pos++) {
                            _this.user.activeGroupList.push({ id: res.userGroup[pos].id, text: res.userGroup[pos].groupName });
                        }
                    }, function (error) { return console.error(error); });
                });
            }
        });
        this.userService.getPermissions().subscribe(function (res) {
            _this.generateArrayForPermission(res);
            _this.userPrivilegeList = _this.allList;
        });
        this.userService.getOrganizations().subscribe(function (res) {
            _this.generateArrayForOrganization(res);
            _this.orgList = _this.allList;
        });
        this.userService.getRole().subscribe(function (res) {
            _this.generateArrayForRole(res);
            _this.userRoleList = _this.allList;
        });
        this.userService.getUserGroup().subscribe(function (res) {
            _this.generateArrayForGroup(res);
            _this.userGroupList = _this.allList;
        });
    };
    CreateUserComponent.prototype.generateArrayForPermission = function (roles) {
        var _this = this;
        this.allList = [];
        roles.results.filter(function (element) {
            _this.allList.push(new __WEBPACK_IMPORTED_MODULE_5__createuser_interface__["a" /* Name */](element.id, element.permissionName));
        });
    };
    CreateUserComponent.prototype.generateArrayForOrganization = function (organizations) {
        var _this = this;
        this.allList = [];
        organizations.results.filter(function (element) {
            _this.allList.push(new __WEBPACK_IMPORTED_MODULE_5__createuser_interface__["a" /* Name */](element.id, element.orgName));
        });
    };
    CreateUserComponent.prototype.generateArrayForRole = function (role) {
        var _this = this;
        this.allList = [];
        role.results.filter(function (element) {
            _this.allList.push(new __WEBPACK_IMPORTED_MODULE_5__createuser_interface__["a" /* Name */](element.id, element.roleName));
        });
    };
    CreateUserComponent.prototype.generateArrayForGroup = function (group) {
        var _this = this;
        this.allList = [];
        group.results.filter(function (element) {
            _this.allList.push(new __WEBPACK_IMPORTED_MODULE_5__createuser_interface__["a" /* Name */](element.userGroupId, element.groupName));
        });
    };
    CreateUserComponent.prototype.navigateToUserList = function () {
        this.router.navigate(['userlist']);
    };
    CreateUserComponent.prototype.onChange = function (event) {
        this.titleExists = true;
    };
    CreateUserComponent.prototype.validateAlpha = function (e) {
        if ((e.keyCode < 65 || e.keyCode > 90) && (e.keyCode < 97 || e.keyCode > 123) && e.keyCode != 32)
            return false;
        return true;
    };
    CreateUserComponent.prototype.validateNum = function (e) {
        if (e.keyCode >= 48 && e.keyCode <= 57)
            return true;
        return false;
    };
    CreateUserComponent.prototype.doSave = function (value, isValid, isUpdateChanges) {
        var _this = this;
        value.activeRoleList = this.user.activeRoleList;
        value.activePrivilegeList = this.user.activePrivilegeList;
        value.activeGroupList = this.user.activeGroupList;
        value.activeOrgList = this.user.activeOrgList;
        if (value.title != "Select") {
            this.titleExists = true;
        }
        else {
            this.titleExists = false;
        }
        if (value.prefix == "Select") {
            value.prefix = '';
        }
        if ((isValid) && (!this.userExists) && (!this.emailExists) && (this.titleExists) && (!this.invalidEmail)) {
            if (value.phoneCountryCode == undefined) {
                value.phoneCountryCode = '';
            }
            if (value.phoneStateCode == undefined) {
                value.phoneStateCode = '';
            }
            if (value.phone == undefined) {
                value.phone = '';
            }
            var mobileNumber = value.phoneCountryCode + " " + value.phoneStateCode + " " + value.phone;
            value.phone = mobileNumber;
            if (this.formState == "Add") {
                return this.userService.saveNewUser(value).subscribe(function (res) {
                    _this.userId = res;
                    _this.userAddedPopup.open();
                    var that = _this;
                    setTimeout(function () { that.userAddedPopup.close(); }, 1500);
                    setTimeout(function () { that.navigateToUserList(); }, 1505);
                }, function (error) { return console.error(error); });
            }
            else {
                return this.userService.updateUser(this.userId, value).subscribe(function (res) {
                    _this.userUpdatePopup.open();
                    var that = _this;
                    setTimeout(function () { that.userUpdatePopup.close(); }, 1500);
                    if (!isUpdateChanges) {
                        setTimeout(function () { that.navigateToUserList(); that.createUserForm.reset(); }, 1505);
                    }
                }, function (error) { return console.error(error); });
            }
        }
    };
    CreateUserComponent.prototype.isFormInProgress = function () {
        return this.createUserForm.dirty;
    };
    CreateUserComponent.prototype.getUser = function (value) {
        var _this = this;
        if (!value) {
            this.userExists = false;
        }
        else {
            this.userService.getUniqueName(value).subscribe(function (userNameData) {
                _this.userExists = userNameData.isPresent;
            });
        }
    };
    CreateUserComponent.prototype.getEmailCheck = function (value, u) {
        if (!value || value == this.userEmail) {
            this.invalidEmail = false;
            this.emailExists = false;
        }
        else {
            var EMAIL_REGEXP = /^[a-zA-Z0-9]([\.-_]?[a-zA-Z0-9])*@+[a-zA-Z0-9]([\.-]?[a-zA-Z0-9])*(\.[a-zA-Z0-9]{2,})+$/;
            if (!EMAIL_REGEXP.test(value)) {
                this.invalidEmail = true;
            }
            else {
                var personal_info = value.split("@");
                var domain = personal_info[1];
                console.log("FIRST CHARATCER FOR PERSONAL", personal_info[0].charAt(0));
                if (personal_info[0].length > 64 || domain.length > 35 || (personal_info[0].indexOf('^') >= 0) || (value.lastIndexOf('@') - personal_info[0].length > 0)) {
                    this.invalidEmail = true;
                }
                else {
                    this.emailDuplicateCheck(value);
                }
            }
        }
    };
    CreateUserComponent.prototype.emailDuplicateCheck = function (value) {
        var _this = this;
        this.userService.getEmailUnique(value).subscribe(function (userEmailData) {
            _this.invalidEmail = false;
            _this.emailExists = userEmailData.isPresent;
        });
    };
    CreateUserComponent.prototype.cancelUser = function () {
        this.cancelUserPopup.close();
    };
    CreateUserComponent.prototype.cancelPopup = function () {
        this.cancelUserPopup.open();
    };
    CreateUserComponent.prototype.confirmUserCancel = function () {
        this.cancelUserPopup.close();
        this.createUserForm.reset();
        this.navigateToUserList();
    };
    CreateUserComponent.prototype.removeAlert = function () {
        this.invalidEmail = false;
        this.emailExists = false;
    };
    CreateUserComponent.prototype.updatechanges = function () {
        this.userModifyPopup.close();
        this.doSave(this.createUserForm.form.value, this.createUserForm.valid, true);
        if (this.deactivateGaurdRes) {
            this.deactivateGaurdRes.next(true);
        }
    };
    CreateUserComponent.prototype.cancelchanges = function () {
        this.userModifyPopup.close();
        if (this.deactivateGaurdRes) {
            this.deactivateGaurdRes.next(true);
        }
    };
    CreateUserComponent.prototype.canDeactivate = function () {
        var _this = this;
        if (this.isFormInProgress()) {
            this.userModifyPopup.open();
            var res = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"](function (obs) { return _this.deactivateGaurdRes = obs; });
            return res;
        }
        return true;
    };
    CreateUserComponent.prototype.removeUserNameError = function () {
        this.userExists = false;
    };
    CreateUserComponent.prototype.refreshOrgValue = function (dataEvent) {
        this.user.activeOrgList = dataEvent;
    };
    CreateUserComponent.prototype.refreshUserGroup = function (dataEvent) {
        this.user.activeGroupList = dataEvent;
    };
    CreateUserComponent.prototype.refreshPrivilege = function (dataEvent) {
        this.user.activePrivilegeList = dataEvent;
    };
    CreateUserComponent.prototype.refreshRole = function (dataEvent) {
        this.user.activeRoleList = dataEvent;
    };
    return CreateUserComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], CreateUserComponent.prototype, "userExists", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], CreateUserComponent.prototype, "emailExists", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], CreateUserComponent.prototype, "invalidEmail", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('userAddedPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateUserComponent.prototype, "userAddedPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('cancelUserPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateUserComponent.prototype, "cancelUserPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('userUpdatePopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateUserComponent.prototype, "userUpdatePopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('userModifyPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateUserComponent.prototype, "userModifyPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('createUserForm'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"])
], CreateUserComponent.prototype, "createUserForm", void 0);
CreateUserComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(388),
        styles: [__webpack_require__(437)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_7__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_7__angular_router__["ActivatedRoute"]])
], CreateUserComponent);



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });






// Import RxJs required methods


var UserService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](UserService, _super);
    function UserService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    UserService.prototype.saveNewUser = function (data) {
        var url = this.endPoint.userUrl();
        return this.http.post(url, data)
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserService.prototype.getUniqueName = function (userName) {
        var url = this.endPoint.getUniqueUserName() + "?username=" + userName + "&email=";
        // ...using get request
        return this.http.get(url)
            .map(function (res) {
            var json = res.json();
            return json;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getEmailUnique = function (email) {
        var url = this.endPoint.getUniqueUserName() + "?email=" + email + "&username=";
        // ...using get request
        return this.http.get(url)
            .map(function (res) {
            var json = res.json();
            return json;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    UserService.prototype.getUser = function (userId) {
        var url = this.endPoint.userUrl() + "/" + userId;
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    /*update user*/
    UserService.prototype.updateUser = function (userId, data) {
        var url = this.endPoint.userUrl() + "/" + userId;
        return this.http.put(url, data)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserService.prototype.getPermissions = function () {
        var url = this.endPoint.getPermissionsUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserService.prototype.getOrganizations = function () {
        var url = this.endPoint.getOrganizationsUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserService.prototype.getRole = function () {
        var url = this.endPoint.roleUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserService.prototype.getUserGroup = function () {
        var url = this.endPoint.getUserGroupListUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return UserService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
UserService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], UserService);



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__createusergroup_interface__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__createusergroup_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateUserGroupComponent; });








var CreateUserGroupComponent = (function () {
    function CreateUserGroupComponent(userGroupService, router, route) {
        this.userGroupService = userGroupService;
        this.router = router;
        this.route = route;
        this.options = [];
        this.items = [];
        this.nameList = [];
        this.userGroup = {};
        this.userListChanged = false;
        this.value = ['Athens'];
        this._disabledV = '0';
        this.disabled = false;
        this.allList = [];
        this.userRoleList = [];
        this.permissionList = [];
        this.organizationList = [];
        this.groupNamenotValid = true;
    }
    Object.defineProperty(CreateUserGroupComponent.prototype, "disabledV", {
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    CreateUserGroupComponent.prototype.selected = function (value) {
        console.log('Selected value is: ', value);
        this.userListChanged = true;
    };
    CreateUserGroupComponent.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
        this.userListChanged = true;
    };
    CreateUserGroupComponent.prototype.refreshValue = function (value) {
        this.userGroup.users = value;
        this.userListChanged = true;
    };
    CreateUserGroupComponent.prototype.itemsToString = function (value) {
        if (value === void 0) { value = []; }
        return value
            .map(function (item) {
            return item.text;
        }).join(',');
    };
    CreateUserGroupComponent.prototype.generateArray = function (userOjects) {
        var _this = this;
        userOjects.results.filter(function (element) {
            if (element.userStatus == 'Y')
                _this.nameList.push(new __WEBPACK_IMPORTED_MODULE_6__createusergroup_interface__["a" /* Name */](element.userId, element.firstName + " " + element.lastName));
        });
    };
    CreateUserGroupComponent.prototype.navigateToUsergroupList = function () {
        this.router.navigate(['usergrouplist']);
    };
    CreateUserGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.formState = params['formState'];
            if (_this.formState == "Modify") {
                _this.route.params
                    .map(function (params) { return params['id']; })
                    .subscribe(function (id) {
                    _this.userGroupId = id;
                    _this.userGroupService.getUserGroupById(id).subscribe(function (res) {
                        _this.userGroup.groupName = res.groupName;
                        _this.userGroup.description = res.description;
                        _this.userGroup.users = [];
                        for (var len = res.users.length, pos = 0; pos < len; pos++) {
                            _this.userGroup.users.push({ id: res.users[pos].id, text: res.users[pos].text });
                        }
                        _this.userGroup.roles = [];
                        for (var len = res.role.length, pos = 0; pos < len; pos++) {
                            _this.userGroup.roles.push({ id: res.role[pos].id, text: res.role[pos].roleName });
                        }
                        _this.userGroup.userOrg = [];
                        for (var leng = res.userOrg.length, pos = 0; pos < leng; pos++) {
                            _this.userGroup.userOrg.push({ id: res.userOrg[pos].id, text: res.userOrg[pos].orgName });
                        }
                        _this.userGroup.permissions = [];
                        for (var leng = res.permission.length, pos = 0; pos < leng; pos++) {
                            _this.userGroup.permissions.push({ id: res.permission[pos].id, text: res.permission[pos].permissionName });
                        }
                    }, function (error) { return console.error(error); });
                });
            }
        });
        this.userGroupService.getPermissions().subscribe(function (res) {
            _this.generateArrayForPermission(res);
            _this.permissionList = _this.allList;
        });
        this.userGroupService.getUserList().subscribe(function (res) {
            _this.userdetails = res;
            _this.generateArray(_this.userdetails);
            _this.items = _this.nameList;
        });
        this.userGroupService.getOrganizations().subscribe(function (res) {
            _this.generateArrayForOrganization(res);
            _this.organizationList = _this.allList;
        });
        this.userGroupService.getRole().subscribe(function (res) {
            _this.generateArrayForRole(res);
            _this.userRoleList = _this.allList;
        });
    };
    CreateUserGroupComponent.prototype.generateArrayForPermission = function (roles) {
        var _this = this;
        this.allList = [];
        roles.results.filter(function (element) {
            _this.allList.push(new __WEBPACK_IMPORTED_MODULE_6__createusergroup_interface__["a" /* Name */](element.id, element.permissionName));
        });
    };
    CreateUserGroupComponent.prototype.generateArrayForOrganization = function (organizations) {
        var _this = this;
        this.allList = [];
        organizations.results.filter(function (element) {
            _this.allList.push(new __WEBPACK_IMPORTED_MODULE_6__createusergroup_interface__["a" /* Name */](element.id, element.orgName));
        });
    };
    CreateUserGroupComponent.prototype.generateArrayForRole = function (role) {
        var _this = this;
        this.allList = [];
        role.results.filter(function (element) {
            _this.allList.push(new __WEBPACK_IMPORTED_MODULE_6__createusergroup_interface__["a" /* Name */](element.id, element.roleName));
        });
    };
    CreateUserGroupComponent.prototype.validateAlpha = function (e) {
        if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode < 123) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 32)
            return true;
        return false;
    };
    CreateUserGroupComponent.prototype.doSave = function (value, isValid, savePopupFlow) {
        var _this = this;
        value.users = this.userGroup.users;
        value.roles = this.userGroup.roles;
        value.permissions = this.userGroup.permissions;
        value.userOrg = this.userGroup.userOrg;
        if ((isValid) && (!this.groupNameExists)) {
            if (this.formState == "Add") {
                return this.userGroupService.saveNewUserGroup(value).subscribe(function (res) {
                    _this.userGroupId = res;
                    _this.userGroupAddedPopup.open();
                    _this.userListChanged = false;
                    var that = _this;
                    setTimeout(function () {
                        that.userGroupAddedPopup.close();
                        that.createUserGroupForm.reset();
                        that.navigateToUsergroupList();
                    }, 1500);
                    console.log("THIS.VALUE---", value);
                }, function (error) { return console.error(error); });
            }
            else {
                return this.userGroupService.updateUserGroup(this.userGroupId, value).subscribe(function (res) {
                    _this.userGroupupdatePopup.open();
                    _this.userListChanged = false;
                    var that = _this;
                    setTimeout(function () {
                        that.userGroupupdatePopup.close();
                        if (!savePopupFlow) {
                            that.createUserGroupForm.reset();
                            that.navigateToUsergroupList();
                        }
                    }, 1500);
                    console.log("THIS.VALUE---", value);
                }, function (error) { return console.error(error); });
            }
        }
    };
    CreateUserGroupComponent.prototype.cancelPopup = function (value) {
        if (value.groupName == null && value.description == null && this.userGroup.users == null)
            this.navigateToUsergroupList();
        else
            this.cancelUsergroupPopup.open();
    };
    CreateUserGroupComponent.prototype.cancelUsergroup = function () {
        this.cancelUsergroupPopup.close();
    };
    CreateUserGroupComponent.prototype.confirmUsergroupCancel = function () {
        this.cancelUsergroupPopup.close();
        this.userListChanged = false;
        this.createUserGroupForm.reset();
        this.navigateToUsergroupList();
    };
    CreateUserGroupComponent.prototype.getUserGroupName = function (value) {
        var _this = this;
        if (!value) {
            this.groupNameExists = false;
            this.groupNamenotValid = true;
        }
        else {
            this.userGroupService.getUniqueGroupName(value).subscribe(function (userGroupNameData) {
                _this.groupNameExists = userGroupNameData.isPresent;
                _this.groupNamenotValid = true;
            });
        }
    };
    CreateUserGroupComponent.prototype.removeGroupNameError = function () {
        this.groupNameExists = false;
        this.groupNamenotValid = true;
    };
    CreateUserGroupComponent.prototype.isFormInProgress = function () {
        console.log("Form State In Change", this.createUserGroupForm);
        return this.createUserGroupForm.dirty;
    };
    CreateUserGroupComponent.prototype.canDeactivate = function () {
        var _this = this;
        if (this.isFormInProgress()) {
            this.userGroupModifyPopup.open();
            var res = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"](function (obs) { return _this.deactivateGaurdRes = obs; });
            return res;
        }
        return true;
    };
    CreateUserGroupComponent.prototype.updatechanges = function () {
        this.userGroupModifyPopup.close();
        this.doSave(this.createUserGroupForm.form.value, this.createUserGroupForm.valid, true);
        if (this.deactivateGaurdRes) {
            this.deactivateGaurdRes.next(true);
        }
    };
    CreateUserGroupComponent.prototype.cancelchanges = function () {
        this.userGroupModifyPopup.close();
        if (this.deactivateGaurdRes) {
            this.deactivateGaurdRes.next(true);
        }
    };
    CreateUserGroupComponent.prototype.refreshOrgValue = function (dataEvent) {
        this.userGroup.userOrg = dataEvent;
    };
    CreateUserGroupComponent.prototype.refreshPermission = function (dataEvent) {
        this.userGroup.permissions = dataEvent;
    };
    CreateUserGroupComponent.prototype.refreshRole = function (dataEvent) {
        this.userGroup.roles = dataEvent;
    };
    return CreateUserGroupComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('createUserGroupForm'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"])
], CreateUserGroupComponent.prototype, "createUserGroupForm", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"])('window:beforeunload'),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('cancelUsergroupPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateUserGroupComponent.prototype, "cancelUsergroupPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('userGroupAddedPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateUserGroupComponent.prototype, "userGroupAddedPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('userGroupupdatePopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateUserGroupComponent.prototype, "userGroupupdatePopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('userGroupModifyPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], CreateUserGroupComponent.prototype, "userGroupModifyPopup", void 0);
CreateUserGroupComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(389)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__createusergroup_service__["a" /* UserGroupService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_4__angular_router__["ActivatedRoute"]])
], CreateUserGroupComponent);



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardService; });



//import { Comment }           from '../model/comment';



// Import RxJs required methods


var DashboardService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](DashboardService, _super);
    function DashboardService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    DashboardService.prototype.getWidgets = function (ids, duration) {
        var url = this.endPoint.dashboardSummaryUrl() + "?" + this.getDurationString(duration);
        // ...using get request
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    DashboardService.prototype.getWidgetDetails = function (id, duration) {
        var url = this.endPoint.dashboardDetailUrl() + "?" + this.getDurationString(duration) + "&type=" + id;
        // ...using get request
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error.json().error || 'Server error'); });
    };
    return DashboardService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
DashboardService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], DashboardService);



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard_component__ = __webpack_require__(271);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__dashboard_component__["a"]; });



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__examtypelist_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamTypeListComponent; });






var ExamTypeListComponent = (function () {
    function ExamTypeListComponent(router, examtypelistService, appState, bearer) {
        this.router = router;
        this.examtypelistService = examtypelistService;
        this.appState = appState;
        this.bearer = bearer;
    }
    ExamTypeListComponent.prototype.navigateToCreateExamType = function () {
        this.formState = "Add";
        this.router.navigate(['createexamtype', this.formState]);
    };
    ExamTypeListComponent.prototype.navigateToUpdateExamType = function (examTypeId) {
        this.formState = "Modify";
        this.router.navigate(['createexamtype', this.formState, examTypeId]);
    };
    ExamTypeListComponent.prototype.ngOnInit = function () {
        this.initExamTypeListDataTable();
    };
    ExamTypeListComponent.prototype.initExamTypeListDataTable = function () {
        var url = this.examtypelistService.getExamtypeDetails();
        var that = this;
        this.table = $('#tableExamTypeList').DataTable({
            "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'f><'col-xs-12 col-sm-5 m-b-10'<'examListToolBar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
            "asStripeClasses": [],
            "rowId": "id",
            "ajax": {
                "url": url,
                "type": "GET",
                "dataSrc": "results",
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + that.bearer);
                }
            },
            "columns": [
                { "data": "examTypeDesc" },
                { "data": "examTypeDetailDesc" },
                {
                    orderable: false,
                    "data": "id",
                    render: function (id, data, row) {
                        var str = "";
                        str = str + '<div class="dropdown table-dropdown usergrouplistaction p-5 align-left">'
                            + '<button class="btn btn-default dropdown-toggle" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
                            + '<span class="caret"></span>'
                            + '</button>'
                            + '<ul class="dropdown-menu dropdown-menu-right">';
                        if (row.isDeleted == 'Y' && row.isEnabled == 'Y') {
                            str = str + '<li><a href="javascript:void(0)" class="modifybtn" examtypeId="' + id + '"> View/Modify</a></li>'
                                + '<li><a href="javascript:void(0)" class="disableExamtype" examtypeId="' + id + '"> Disable</a></li>';
                        }
                        else if (row.isDeleted == 'Y' && row.isEnabled == 'N') {
                            str = str + '<li><a href="javascript:void(0)" class="modifybtn" examtypeId="' + id + '"> View/Modify</a></li>'
                                + '<li><a href="javascript:void(0)" class="enableExamtype" examtypeId="' + id + '"> Enable</a></li>';
                        }
                        else if (row.isEnabled == 'Y') {
                            str = str + '<li><a href="javascript:void(0)" class="modifybtn" examtypeId="' + id + '"> View/Modify</a></li>'
                                + '<li><a href="javascript:void(0)" class="deleteExamtype" examtypeId="' + id + '"> Delete</a></li>'
                                + '<li><a href="javascript:void(0)" class="disableExamtype" examtypeId="' + id + '"> Disable</a></li>';
                        }
                        else if (row.isEnabled == 'N') {
                            str = str + '<li><a href="javascript:void(0)" class="modifybtn" examtypeId="' + id + '"> View/Modify</a></li>'
                                + '<li><a href="javascript:void(0)" class="deleteExamtype" examtypeId="' + id + '"> Delete</a></li>'
                                + '<li><a href="javascript:void(0)" class="enableExamtype" examtypeId="' + id + '"> Enable</a></li>';
                        }
                        str = str + '</ul>' + '</div>';
                        return str;
                    }
                }
            ],
            "aaSorting": [],
            "order": [[0, "asc"]],
            "language": {
                "zeroRecords": "No examtype available"
            },
            "fnDrawCallback": function (settings) {
                $('.deleteExamtype').on('click', function () {
                    var examtypeId = $(this).attr('examtypeId');
                    console.log("examtypeId inside data", examtypeId);
                    that.deleteExamType(examtypeId);
                });
                $('.modifybtn').on('click', function () {
                    var examtypeId = $(this).attr('examtypeId');
                    console.log("examtypeId inside data", examtypeId);
                    that.navigateToUpdateExamType(examtypeId);
                });
                $('.disableExamtype').on('click', function () {
                    var examtypeId = $(this).attr('examtypeId');
                    console.log("examtypeId inside data", examtypeId);
                    that.disableExamType(examtypeId);
                });
                $('.enableExamtype').on('click', function () {
                    var examtypeId = $(this).attr('examtypeId');
                    console.log("examtypeId inside data", examtypeId);
                    that.enableExamType(examtypeId);
                });
                /*Action Drop Down for list ends*/
            },
            "fnRowCallback": function (nRow, row) {
                if (row.isEnabled == 'N') {
                    $('td', nRow).css('background-color', '#e2e2e2');
                }
                else if (row.isEnabled == 'Y') {
                    $('td', nRow).css('background-color', '#fff');
                }
            }
        });
        $(".examListToolBar").html('<div class="btn-toolbar pull-right">' +
            '<div class="btn-group" role="group" aria-label="...">' +
            '<a id="btnCreateExamType" href="javascript:void(0)" class="btn btn-default" role="button">Add exam type</a>' +
            '</div>' +
            '</div>');
        $('#btnCreateExamType').on('click', function () {
            that.navigateToCreateExamType();
        });
    };
    ExamTypeListComponent.prototype.cancelDelete = function () {
        this.confirmDelete.close();
    };
    ExamTypeListComponent.prototype.deleteExamType = function (id) {
        this.selectedExamtypeId = id;
        this.confirmDelete.open();
    };
    ExamTypeListComponent.prototype.confirmDeleteExamType = function () {
        var _this = this;
        console.log("inside confirmDeleteExamType", this.selectedExamtypeId);
        this.confirmDelete.close();
        this.examtypelistService.deleteExamType(this.selectedExamtypeId).subscribe(function (response) {
            _this.table.row('#' + _this.selectedExamtypeId).remove().draw('page');
        }, function (error) { return console.error(error); });
    };
    ExamTypeListComponent.prototype.disableExamType = function (id) {
        this.selectedExamtypeId = id;
        this.disableExamtypePopup.open();
    };
    ExamTypeListComponent.prototype.confirmDisable = function () {
        var _this = this;
        this.disableExamtypePopup.close();
        var changeStatus = false;
        this.examtypelistService.disableandEnableExamtype(this.selectedExamtypeId, changeStatus).subscribe(function (res) {
            _this.disableres = res;
            var rowData = _this.table.row('#' + _this.selectedExamtypeId).data();
            rowData.isEnabled = "N";
            _this.table.row('#' + _this.selectedExamtypeId).data(rowData).draw('page');
        }, function (error) { return console.error(error); });
    };
    ExamTypeListComponent.prototype.cancelDisable = function () {
        this.disableExamtypePopup.close();
    };
    ExamTypeListComponent.prototype.enableExamType = function (id) {
        this.selectedExamtypeId = id;
        this.enableExamtypePopup.open();
    };
    ExamTypeListComponent.prototype.confirmEnable = function () {
        var _this = this;
        this.enableExamtypePopup.close();
        var changeStatus = true;
        this.examtypelistService.disableandEnableExamtype(this.selectedExamtypeId, changeStatus).subscribe(function (res) {
            _this.enableres = res;
            var rowData = _this.table.row('#' + _this.selectedExamtypeId).data();
            rowData.isEnabled = "Y";
            _this.table.row('#' + _this.selectedExamtypeId).data(rowData).draw('page');
        }, function (error) { return console.error(error); });
    };
    ExamTypeListComponent.prototype.cancelEnable = function () {
        this.enableExamtypePopup.close();
    };
    return ExamTypeListComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('confirmDelete'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], ExamTypeListComponent.prototype, "confirmDelete", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('enableExamtypePopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], ExamTypeListComponent.prototype, "enableExamtypePopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('disableExamtypePopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], ExamTypeListComponent.prototype, "disableExamtypePopup", void 0);
ExamTypeListComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(393)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __param */](3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"])('bearer')),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_3__examtypelist_service__["a" /* ExamtypelistService */],
        __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AppState */], String])
], ExamTypeListComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamtypelistService; });






//Import RxJs required methods


var ExamtypelistService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](ExamtypelistService, _super);
    function ExamtypelistService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    ExamtypelistService.prototype.getExamtypeDetails = function () {
        return this.endPoint.getExamtypeDetailsUrl();
    };
    ExamtypelistService.prototype.deleteExamType = function (examid) {
        var url = this.endPoint.deleteExamtypeUrl() + "/remove/" + examid;
        return this.http.delete(url)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    ExamtypelistService.prototype.disableandEnableExamtype = function (examid, data) {
        var url = this.endPoint.getExamtypeDetailsUrl() + "/" + examid + "/renderexamtype";
        return this.http.put(url, { enable: data })
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return ExamtypelistService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
ExamtypelistService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], ExamtypelistService);



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderService; });






// Import RxJs required methods


var HeaderService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](HeaderService, _super);
    function HeaderService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    HeaderService.prototype.getAlert = function (loginuserid) {
        var url = this.endPoint.getAlertUrl() + "?datax_receiver=" + loginuserid;
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    HeaderService.prototype.updateAlertStatus = function (data) {
        var url = this.endPoint.getAlertUrl();
        return this.http.put(url, data)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return HeaderService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
HeaderService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], HeaderService);



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabComponent; });


var TabComponent = (function () {
    function TabComponent() {
        this.active = false;
    }
    return TabComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('tabTitle'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], TabComponent.prototype, "title", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('tabIcon'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], TabComponent.prototype, "icon", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], TabComponent.prototype, "active", void 0);
TabComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'tab',
        template: "\n    <div [hidden]=\"!active\" class=\"pane\">\n      <ng-content></ng-content>\n    </div>\n  "
    })
], TabComponent);



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__observations_observations_component__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__studylist_studylist_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageViewerComponent; });






var ImageViewerComponent = (function () {
    function ImageViewerComponent(ref, activatedRoute, studyService, appState) {
        this.ref = ref;
        this.activatedRoute = activatedRoute;
        this.studyService = studyService;
        this.appState = appState;
        this.viewerTableData = {};
        this.isWorsheetOpen = false;
        this.viewerDetail = {};
        this.worksheetInprogress = false;
        this.routeBolleanValue = false;
        this.loginUserId = null;
    }
    ImageViewerComponent.prototype.canDeactivate = function () {
        return true;
    };
    ImageViewerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadUserName();
        this.loadPreference();
        this.viewerDetail = null;
        this.activatedRoute.params
            .map(function (params) { return params['id']; })
            .subscribe(function (id) {
            _this.studyId = id;
            _this.studyService.getStudyDetails(id).subscribe(function (viewerData) {
                _this.viewerDetail = viewerData[0];
                _this.examType = _this.viewerDetail["examType"];
                _this.status = _this.viewerDetail["status"];
                _this.referringPhysicianId = _this.viewerDetail.referringphysician.id;
                _this.assignedUser = _this.viewerDetail.assignedUser[0].id;
                _this.qaUser = _this.viewerDetail.qaUser[0] ? _this.viewerDetail.qaUser[0].id : "13";
                _this.attendingUser = _this.viewerDetail.attendingUser[0].id;
                _this.objectId = _this.viewerDetail.objectId;
                _this.studyUid = _this.viewerDetail.studyUid;
                _this.dicomProtocol = _this.viewerDetail.dicomProtocol;
                console.log("this.seriesUid", _this.studyUid, _this.objectId);
                console.log("this.qaUser", _this.qaUser);
                console.log("referringphysicianid" + _this.referringPhysicianId);
                console.log("assignedUser", _this.assignedUser);
                console.log('imageViewer', viewerData);
                console.log('imageViewer status', _this.status);
            });
        });
    };
    ImageViewerComponent.prototype.loadUserName = function () {
        var _this = this;
        this.appState.getUserName().subscribe(function (userNameData) {
            _this.Uname = userNameData;
            _this.loginUserId = userNameData.id;
            return userNameData;
        }, function (error) { return console.error(error); });
    };
    ImageViewerComponent.prototype.loadPreference = function () {
        var _this = this;
        this.appState.getPreference().subscribe(function (preference) {
            _this.workflowPreference = preference;
            _this.workflowStatus = preference.qaEnabled;
            _this.attendingWorkflowStatus = preference.attestationEnabled;
            _this.qaAttendingWorkflowStatus = preference.pocQaAttending;
            _this.submitOnSignFlag = preference.submitOnSign;
            console.log('Preference res', preference);
        }, function (error) { return console.error(error); });
    };
    ImageViewerComponent.prototype.ngAfterViewInit = function () {
        var that = this;
        $('document').ready(function () {
            $('.btnWorksheet').click(function () {
                if ($(".worksheet").hasClass("active")) {
                    that.isWorksheetOpen = false;
                    $(".worksheet").removeClass("active");
                    $(".wrksheetMovableContainer").removeClass('m-l-320');
                    that.ref.detectChanges();
                }
                else {
                    that.isWorksheetOpen = true;
                    $(".worksheet").addClass("active");
                    $(".wrksheetMovableContainer").addClass('m-l-320');
                    that.ref.detectChanges();
                }
            });
        });
    };
    ImageViewerComponent.prototype.onWorsheetInprogress = function (event) {
        console.log("onWorsheetInprogress", event);
        if (event.flag != null) {
            this.worksheetInprogress = event.flag;
        }
    };
    ImageViewerComponent.prototype.isWorksheetInProgress = function () {
        console.log("isWorksheetInProgress", this.worksheetInprogress);
        return this.worksheetInprogress;
    };
    ImageViewerComponent.prototype.onNotify = function (message) {
        this.isWorksheetOpen = message;
        console.log("Some Value for Close:", this.isWorksheetOpen);
    };
    return ImageViewerComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__observations_observations_component__["a" /* Observations */]),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3__observations_observations_component__["a" /* Observations */])
], ImageViewerComponent.prototype, "childcmp", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"])('window:beforeunload'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Function),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", []),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:returntype", Object)
], ImageViewerComponent.prototype, "canDeactivate", null);
ImageViewerComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(399),
        styles: [__webpack_require__(441)],
        encapsulation: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewEncapsulation"].None
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"],
        __WEBPACK_IMPORTED_MODULE_4__studylist_studylist_service__["a" /* StudylistService */], __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppState */]])
], ImageViewerComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservationsTabComponent; });


var ObservationsTabComponent = (function () {
    function ObservationsTabComponent() {
        this.active = false;
    }
    return ObservationsTabComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])('tabTitle'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], ObservationsTabComponent.prototype, "title", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], ObservationsTabComponent.prototype, "active", void 0);
ObservationsTabComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'observations-tab',
        template: "\n    <div [hidden]=\"!active\" class=\"pane\">\n      <ng-content></ng-content>\n    </div>\n  "
    })
], ObservationsTabComponent);



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__observations_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__studylist_studylist_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__createusergroup_createusergroup_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__createusergroup_createusergroup_interface__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__userpreference_userpreference_service__ = __webpack_require__(84);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observations; });









var Observations = (function () {
    function Observations(observationService, studylistComponent, userGroupService, userPreferenceService) {
        var _this = this;
        this.observationService = observationService;
        this.studylistComponent = studylistComponent;
        this.userGroupService = userGroupService;
        this.userPreferenceService = userPreferenceService;
        this.userNamesItems = [];
        this.usersNameList = [];
        this.examTypesList = [];
        this.listExamTypes = [];
        this.userNameExists = true;
        this.examTypeExists = true;
        this.worksheets = [];
        this.data = {};
        this.sdata = {};
        this.inprogress = false;
        this.submitResponse = {};
        this.disableQAWorksheet = true;
        this.items = [];
        this.nameList = [];
        this.userGroup = {};
        this.autoSave = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Subject"]();
        this.worksheetCreationEvent = null;
        this.enableLoadingIcon = false;
        this.pdfResponse = {};
        this.listTags = [];
        this.tagsList = [];
        this.activeTagList = [];
        this.disableSubmitQA = true;
        this.qasign = false;
        this.disableQaSign = false;
        this.pdfWorksheet = null;
        this.pdfQa = null;
        this.value = ['Athens'];
        this._disabledV = '0';
        this.disabled = false;
        this.isValid = false;
        this.onInprogress = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.isWorksheetOpen = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        if (this.attendingWorkflowStatus == 'Y' || this.attendingWorkflowStatus == 'y') {
            this.attendingWorkflowStatus = true;
        }
        else if (this.qaAttendingWorkflowStatus == 'Y' || this.qaAttendingWorkflowStatus == 'y') {
            this.qaAttendingWorkflowStatus == true;
        }
        this.autoSaveAlert = true;
        this.autoSave.bufferTime(5000)
            .subscribe(function (val) {
            if (val.length) {
                if (!_this.worksheetId) {
                    if (_this.worksheetCreationEvent) {
                        _this.autoSave.next();
                        return;
                    }
                }
                _this.enableLoadingIcon = true;
                _this.saveWorksheet(false, "Procedural").subscribe(function (res) {
                    _this.enableLoadingIcon = false;
                }, function (err) {
                    _this.worksheetCreationEvent = null;
                });
            }
        });
    }
    Object.defineProperty(Observations.prototype, "disabledV", {
        // ***************ng2-select
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    Observations.prototype.selected = function (value) {
        console.log('Selected value is: ', value.id);
    };
    Observations.prototype.selectedExamTypes = function (value) {
        this.selectExamType = value.text;
    };
    Observations.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
    };
    Observations.prototype.refreshValue = function (value) {
        this.userId = value.id;
    };
    Observations.prototype.typed = function (value) {
        console.log('New search input: ', value);
    };
    Observations.prototype.itemsToString = function (value) {
        if (value === void 0) { value = []; }
        return value
            .map(function (item) {
            return item.text;
        }).join(',');
    };
    Observations.prototype.generateArrayForAllUsers = function (userOjects) {
        var _this = this;
        userOjects.results.filter(function (element) {
            if (element.userStatus == 'Y') {
                _this.usersNameList.push(new __WEBPACK_IMPORTED_MODULE_7__createusergroup_createusergroup_interface__["a" /* Name */]("" + element.userId, element.firstName + " " + element.lastName));
            }
        });
    };
    Observations.prototype.generateExamTypeArray = function (examTypeObject) {
        var _this = this;
        this.listExamTypes = [];
        examTypeObject.results.filter(function (element) {
            _this.listExamTypes.push(new __WEBPACK_IMPORTED_MODULE_7__createusergroup_createusergroup_interface__["a" /* Name */]("" + element.id, element.name));
        });
    };
    Observations.prototype.ngOnInit = function () {
        var _this = this;
        this.userGroupService.getUserList().subscribe(function (res) {
            _this.generateArrayForAllUsers(res);
            _this.userNamesItems = _this.usersNameList;
        });
    };
    Observations.prototype.selected = function (value) {
        this.userId = value.id;
    };
    Observations.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
    };
    Observations.prototype.refreshValue = function (value) {
        this.userId = value ? value.id : value;
    };
    Observations.prototype.initWorksheet = function () {
        if (this.examType && this.examType.length > 0 && this.studyId) {
            this.selectedExamType = this.examType[0][0]['examtype'];
            this.selectedExamTypeId = this.examType[0][0]['id'];
            this.tagsForExamType(this.selectedExamTypeId);
            this.tagsForStudy(this.studyId);
            this.loadWorksheetList(this.selectedExamType);
            this.loadWorksheet();
        }
    };
    Observations.prototype.ngOnChanges = function (changes) {
        console.log("Worksheet ngOnChanges", changes, this.data);
        if (changes['examType'])
            this.initWorksheet();
    };
    Observations.prototype.clearWorksheet = function () {
        this.data = {};
        this.sdata = {};
        this.template = null;
        this.worksheetId = null;
        this.worksheetCreationEvent = null;
    };
    Observations.prototype.loadWorksheet = function () {
        var _this = this;
        if ((this.status[0] == "QAAssigned" || this.status[0] == "QAInProgress") && this.workflowStatus == true) {
            return this.observationService.getWorksheet(this.studyId, "Procedural").subscribe(function (res) {
                if (res.result && res.result.template && res.result.content) {
                    _this.worksheetId = res.result.id;
                    _this.template = res.result.template.content;
                    _this.selectedTemplateId = res.result.template.id;
                    _this.selectedTemplateName = res.result.template.name;
                    _this.data = res.result.content;
                    _this.publishInprogressState(false);
                    return _this.observationService.getSignatureData(_this.worksheetId).subscribe(function (res) {
                        _this.sdata = res;
                        _this.signId = res.poc.id;
                        _this.signId1 = res.attending.id;
                        return true;
                    });
                    return true;
                }
                console.log("worksheet data empty");
                return false;
            }, function (error) { return console.error(error); });
        }
        else {
            return this.observationService.getWorksheet(this.studyId, "Procedural").subscribe(function (res) {
                if (res.result && res.result.template && res.result.content) {
                    _this.worksheetId = res.result.id;
                    _this.template = res.result.template.content;
                    _this.selectedTemplateId = res.result.template.id;
                    _this.selectedTemplateName = res.result.template.name;
                    _this.data = res.result.content;
                    _this.publishInprogressState(false);
                    return _this.observationService.getSignatureData(_this.worksheetId).subscribe(function (res) {
                        _this.sdata = res;
                        _this.signId = res.poc.id;
                        _this.signId1 = res.attending.id;
                        return true;
                    });
                    return true;
                }
                return false;
            }, function (error) { return console.error(error); });
        }
    };
    Observations.prototype.loadWorksheetList = function (examType) {
        var _this = this;
        if (examType == 'viewmore') {
            this.isValid = true;
            this.examTypeFlag = false;
        }
        else if (examType == 'Unspecified') {
            this.isValid = true;
            this.viewmore = true;
            this.examTypeFlag = false;
        }
        else if ((this.status[0] == 'Pending' || this.status[0] == 'New' || this.status[0] == 'Assigned') && (examType !== 'Unspecified') && (this.loginUserId == this.assignedUser)) {
            this.isValid = false;
            this.viewmore = false;
            this.examTypeFlag = true;
        }
        else {
            this.isValid = true;
        }
        this.observationService.getWorksheetList(this.studyId, this.examTypeFlag).subscribe(function (res) {
            _this.worksheets = res['results'];
            if (examType == 'viewmore') {
                var myProgressBar = document.querySelector(".moreClose");
                myProgressBar.classList.add('open');
            }
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.loadWorksheetTemplate = function () {
        var _this = this;
        this.observationService.getWorksheetTemplate(this.selectedTemplateId).subscribe(function (res) {
            _this.template = res.result.content;
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.deleteWorksheet = function () {
        if (this.worksheetId)
            this.observationService.deleteWorksheet(this.worksheetId).subscribe(function (res) {
                console.log('deleteWorksheet', res);
            }, function (error) { return console.error(error); });
    };
    Observations.prototype.onWorksheetSelection = function (id, name) {
        this.changedTemplateId = id;
        this.changedTemplateName = name;
        this.selectedTemplateId = id;
    };
    Observations.prototype.onWorksheetChangesModelPopup = function () {
        var _this = this;
        this.examTypeChangePopup.open();
        var res = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"](function (obs) { return _this.deactivateGaurdRes = obs; });
        console.log('onWorksheetChangesModelPopup', res);
        return res;
    };
    Observations.prototype.onExamTypeChangeComplete = function () {
        this.selectedExamTypeId = this.changedExamTypeId;
        this.selectedExamType = this.changedExamType;
        this.selectedTemplateId = null;
        this.selectedTemplateName = null;
        this.clearWorksheet();
        this.loadWorksheetList(this.selectedExamType);
        this.loadWorksheet();
        this.publishInprogressState(false);
    };
    Observations.prototype.saveWorksheet = function (skipSetWorksheetId, wrkshttype) {
        var _this = this;
        if (!this.worksheetId) {
            if (this.worksheetCreationEvent)
                return this.worksheetCreationEvent;
            this.worksheetCreationEvent = this.observationService.saveWorksheet(this.studyId, this.referringPhysicianId, this.selectedExamTypeId, this.selectedTemplateId, wrkshttype, this.data).map(function (res) {
                if (res && !skipSetWorksheetId)
                    _this.worksheetId = res;
                _this.worksheetCreationEvent = null;
                _this.publishInprogressState(false);
                _this.autoSaveAlert = true;
            }, function (error) { return console.error(error); });
            return this.worksheetCreationEvent;
        }
        else
            return this.observationService.updateWorksheet(this.worksheetId, this.data, this.studyId, this.selectedExamTypeId).map(function (res) {
                _this.publishInprogressState(false);
                _this.autoSaveAlert = true;
                if ((_this.status[0] == "QAAssigned" || _this.status[0] == "QAInProgress") && _this.workflowStatus == true) {
                    _this.disableSubmitButton = true;
                    _this.disableExamApproval = true;
                }
            }, function (error) { return console.error(error); });
    };
    Observations.prototype.displaySaveToast = function () {
        this.saveSuccessPopup.open();
        var that = this;
        setTimeout(function () { that.saveSuccessPopup.close(); }, 2000);
        if (this.deactivateGaurdRes) {
            this.deactivateGaurdRes.next(true);
        }
    };
    Observations.prototype.displaySubmitToEMRToast = function () {
        this.submitToEMR.open();
        var that = this;
        setTimeout(function () { that.submitToEMR.close(); }, 2000);
        if (this.deactivateGaurdRes) {
            this.deactivateGaurdRes.next(true);
        }
    };
    Observations.prototype.saveSignature = function (type, sign, timestamp) {
        var _this = this;
        if (this.submitOnSignFlag == true) {
            return this.observationService.saveSignature(this.worksheetId, type, sign, timestamp, this.studyId).subscribe(function (res) {
                if (res)
                    if (type == "poc") {
                        _this.signId = res;
                    }
                    else {
                        _this.signId1 = res;
                    }
                var that = _this;
                _this.autoSaveAlert = true;
                _this.publishInprogressState(false);
                _this.submitOnSignFlow();
            }, function (error) { return console.error(error); });
        }
        else {
            this.saveSignaturePopUp.open();
            return this.observationService.saveSignature(this.worksheetId, type, sign, timestamp, this.studyId).subscribe(function (res) {
                if (res)
                    if (type == "poc") {
                        _this.signId = res;
                    }
                    else {
                        _this.signId1 = res;
                    }
                var that = _this;
                _this.autoSaveAlert = true;
                setTimeout(function () { that.saveSignaturePopUp.close(); }, 2000);
                _this.publishInprogressState(false);
            }, function (error) { return console.error(error); });
        }
    };
    Observations.prototype.submitOnSignFlow = function () {
        var _this = this;
        this.observationService.getStudy(this.studyId).subscribe(function (res) {
            _this.studyStat = res[0].status[0];
            if (_this.workflowStatus == true && _this.attendingWorkflowStatus == true) {
                if (_this.studyStat == 'Signed' || _this.studyStat == 'signed') {
                    _this.submitToReview();
                }
                else if (_this.studyStat == 'Attested' || _this.studyStat == 'attested') {
                    _this.submitWorksheet();
                }
            }
            else if (_this.workflowStatus == true) {
                if (_this.studyStat == 'Signed' || _this.studyStat == 'signed') {
                    _this.submitToReview();
                }
                else {
                    _this.submitWorksheet();
                }
            }
            else if (_this.attendingWorkflowStatus == true) {
                if (_this.studyStat == 'Signed' || _this.studyStat == 'signed') {
                    _this.submitForAttending();
                }
                else if (_this.studyStat == 'Attested' || _this.studyStat == 'attested') {
                    _this.submitWorksheet();
                }
            }
            else {
                _this.submitWorksheet();
            }
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.saveAttestedSignature = function (type, sign, timestamp) {
        var _this = this;
        if (this.submitOnSignFlag == false) {
            this.saveAttestedSignaturePopUp.open();
        }
        return this.observationService.saveAttestedSignature(this.worksheetId, type, sign, timestamp, this.studyId).subscribe(function (res) {
            if (res)
                if (type == "poc") {
                    _this.signId = res;
                }
                else {
                    _this.signId1 = res;
                }
            _this.observationService.submitToAttending(_this.studyId).subscribe(function (res) {
                _this.submitResponse = { readyForAttestation: false };
                _this.submitResponse = res;
                if (_this.submitOnSignFlag == true) {
                    _this.submitWorksheet();
                }
            }, function (error) { return console.error(error); });
            var that = _this;
            _this.autoSaveAlert = true;
            setTimeout(function () { that.saveAttestedSignaturePopUp.close(); }, 2000);
            _this.publishInprogressState(false);
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.saveWorksheetAndSignature = function (type, sign, timestamp) {
        var _this = this;
        this.isValid = true;
        this.studyType = type;
        this.userSign = sign;
        this.signTimestamp = timestamp;
        this.type = this.data.wrk1;
        if (this.data.wrk1) {
            if (this.type.hasOwnProperty('examoverview')) {
                if (Object.keys(this.type.examoverview).length === 3) {
                    console.log("inside saveWorksheetAndSignature", "type", type + " " + sign + " " + timestamp);
                    if (this.attendingWorkflowStatus == true) {
                        return this.observationService.getAttendingUser(this.studyId).subscribe(function (res) {
                            if (res.status == true) {
                                _this.saveValidateSignature(_this.studyType, _this.userSign, _this.signTimestamp);
                            }
                            else if (res.status == false) {
                                _this.assignstudytoattendingPop();
                            }
                        }, function (error) { return console.error(error); });
                    }
                    else {
                        this.saveValidateSignature(this.studyType, this.userSign, this.signTimestamp);
                    }
                }
                else {
                    this.isValid = false;
                    this.worksheetValidationPopup.open();
                }
            }
            else {
                this.isValid = false;
                this.worksheetValidationPopup.open();
            }
        }
        else {
            this.isValid = false;
            this.worksheetValidationPopup.open();
        }
    };
    Observations.prototype.saveValidateSignature = function (studyType, userSign, signTimestamp) {
        var _this = this;
        this.observationService.getValidateSignature(this.studyId).subscribe(function (res) {
            if (res.userAttestedStatus == true && _this.workflowStatus === false) {
                _this.sdata['attending'].sign = _this.userSign;
                _this.sdata['attending'].timestamp = _this.signTimestamp;
                _this.sdata['attending'].signed = true;
                _this.saveAttestedSignature(_this.studyType, _this.userSign, _this.signTimestamp);
            }
            else {
                _this.saveSignature(_this.studyType, _this.userSign, _this.signTimestamp);
            }
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.assignstudytoattendingPop = function () {
        this.assignstudytoattendingPopup.open();
    };
    Observations.prototype.cancelAssignToAttend = function () {
        this.isValid = false;
        this.sdata = {};
        this.assignstudytoattendingPopup.close();
    };
    Observations.prototype.confirmAssignToAttend = function () {
        var _this = this;
        if (this.userId) {
            this.userNameExists = true;
            return this.observationService.assignStudyToAttending(this.studyId, this.userId).subscribe(function (res) {
                _this.assignstudytoattendingPopup.close();
                _this.saveValidateSignature(_this.studyType, _this.userSign, _this.signTimestamp);
            }, function (error) { return console.error(error); });
        }
        else {
            this.userNameExists = false;
        }
    };
    Observations.prototype.deleteSignature = function (type) {
        var _this = this;
        if (type == "poc") {
            this.isValid = false;
            this.observationService.getValidateSignature(this.studyId).subscribe(function (res) {
                if (res.userAttestedStatus === true && _this.workflowStatus === false) {
                    _this.observationService.deleteAttestedSignature(_this.signId, _this.studyId).subscribe(function (res) {
                        console.log('deletesignature', res);
                    }, function (error) { return console.error(error); });
                }
                else {
                    _this.observationService.deleteSignature(_this.signId, _this.studyId).subscribe(function (res) {
                        console.log('deletesignature', res);
                    }, function (error) { return console.error(error); });
                }
            }, function (error) { return console.error(error); });
        }
        else {
            this.observationService.deleteSignature(this.signId1, this.studyId).subscribe(function (res) {
                console.log('delete Attending signature ', res);
            }, function (error) { return console.error(error); });
        }
    };
    Observations.prototype.submitWorksheetbtn = function () {
        this.submitWorksheetPopup.open();
    };
    Observations.prototype.submitWorksheet = function () {
        var _this = this;
        this.disableExamApproval = true;
        this.statusMsg = '';
        this.observationService.submitWorksheet(this.studyId).subscribe(function (res) {
            _this.submitResponse = { readyForSubmission: false };
            _this.submitResponse = res;
            _this.disableQaSign = true;
            _this.statusMsg = 'Study successfully submitted to EMR';
            _this.displaySubmitToEMRToast(_this.statusMsg);
        }, function (error) {
            if (error.status == 412) {
                _this.cancelOrderToast.open();
                _this.cancelAndCreateOrder();
            }
            else if (error.status == 428) {
                _this.createOrderPopUp.open();
            }
            console.error(error);
        });
    };
    Observations.prototype.confirmSubmitChange = function () {
        this.isValid = true;
        this.submitWorksheetPopup.close();
        this.submitWorksheet();
    };
    Observations.prototype.cancelSubmitChange = function () {
        this.submitWorksheetPopup.close();
    };
    Observations.prototype.cancelWorksheetChange = function () {
        this.worksheetChangePopup.close();
    };
    Observations.prototype.confirmWorksheetChange = function () {
        this.worksheetChangePopup.close();
        this.selectedTemplateId = this.changedTemplateId;
        this.selectedTemplateName = this.changedTemplateName;
        this.deleteWorksheet();
        this.clearWorksheet();
        this.loadWorksheetTemplate();
    };
    Observations.prototype.cancelWorksheet = function () {
        this.cancelPopup.open();
    };
    Observations.prototype.resetWorksheet = function () {
        this.resetPopup.open();
    };
    Observations.prototype.confirmReset = function () {
        this.resetPopup.close();
        this.autoSave.next();
        this.data = {};
    };
    Observations.prototype.cancelReset = function () {
        this.resetPopup.close();
    };
    Observations.prototype.confirmCancel = function () {
        $(".wrkshtpanelbody").slideUp();
        this.cancelPopup.close();
        if ($(".worksheet").hasClass("active")) {
            this.isWorksheetOpenCancel = true;
            this.isWorksheetOpen.emit(this.isWorksheetOpenCancel);
        }
        this.data = {};
        this.loadWorksheet();
    };
    Observations.prototype.cancelCancel = function () {
        this.cancelPopup.close();
    };
    Observations.prototype.confirmChanges = function () {
        var _this = this;
        this.examTypeChangePopup.close();
        this.saveWorksheet(true, "Procedural").subscribe(function (res) { return _this.displaySaveToast(); });
        this.onExamTypeChangeComplete();
    };
    Observations.prototype.cancelChanges = function () {
        this.examTypeChangePopup.close();
        this.onExamTypeChangeComplete();
        if (this.deactivateGaurdRes) {
            this.deactivateGaurdRes.next(true);
        }
    };
    Observations.prototype.disableQa = function (qId) {
        if (qId) {
            this.qasign = true;
        }
        else
            this.qasign = false;
    };
    Observations.prototype.onWorksheetUpdate = function (event) {
        var _this = this;
        if (event.instruction) {
            switch (event.instruction) {
                case 'SAVE':
                    this.saveWorksheet(false, "Procedural").subscribe(function (res) { return _this.displaySaveToast(); });
                    break;
                case 'CANCEL':
                    this.cancelWorksheet();
                    break;
                case 'RESET':
                    this.resetWorksheet();
                    break;
                case 'SIGN':
                    this.saveWorksheetAndSignature(event.type, event.sign, event.timestamp);
                    break;
                case 'UNSIGN':
                    this.deleteSignature(event.type);
                    break;
                case 'SAVEQASIGN':
                    this.saveQAAttestedAttendSignature(event.type, event.sign, event.timestamp);
                    break;
                // case 'DELETEQASIGN': this.enableQa();break;
                default: break;
            }
        }
        else {
            this.data[event.id] = event.data;
            this.publishInprogressState(true);
            this.autoSave.next();
        }
    };
    Observations.prototype.saveQAAttestedAttendSignature = function (type, sign, timestamp) {
        var _this = this;
        this.sdata['attending'].sign = sign;
        this.sdata['attending'].timestamp = timestamp;
        this.sdata['attending'].signed = true;
        this.saveWorksheet(false, "Procedural").subscribe(function (res) { return _this.saveAttendingAttestedSignature(type, sign, timestamp); });
    };
    Observations.prototype.saveAttendingAttestedSignature = function (type, sign, timestamp) {
        var _this = this;
        if (this.submitOnSignFlag == false) {
            this.saveAttestedSignaturePopUp.open();
        }
        this.observationService.saveAttendingAttestedSignature(this.worksheetId, type, sign, timestamp, this.studyId).subscribe(function (res) {
            if (res)
                if (type == "poc") {
                    _this.signId = res;
                }
                else {
                    _this.signId1 = res;
                }
            var that = _this;
            _this.autoSaveAlert = true;
            _this.observationService.submitToAttending(_this.studyId).subscribe(function (res) {
                _this.submitResponse = { readyForAttestation: false };
                _this.submitResponse = res;
                if (_this.submitOnSignFlag == true) {
                    _this.submitWorksheet();
                }
            }, function (error) { return console.error(error); });
            setTimeout(function () { that.saveAttestedSignaturePopUp.close(); }, 2000);
            _this.publishInprogressState(false);
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.enableQa = function () {
        this.sdata['attending'] = {};
    };
    Observations.prototype.publishInprogressState = function (pendingFlag) {
        this.inprogress = pendingFlag;
        this.onInprogress.emit({
            flag: pendingFlag
        });
    };
    Observations.prototype.textInAssociateWrkshtPopup = function () {
        if (!this.worksheetId) {
            this.assocPopup = true;
            this.newAssociationWrksht.open();
        }
        else if (this.worksheetId && (this.selectExamType != this.examType[0][0].examtype)) {
            this.assocPopup = false;
            this.associateWorksheetPopup.open();
        }
    };
    Observations.prototype.selectExamTypesByTemplate = function () {
        if (!this.selectedTemplateName) {
            this.textInAssociateWrkshtPopup();
        }
        else if (this.selectedTemplateName != this.changedTemplateName) {
            this.textInAssociateWrkshtPopup();
        }
        else {
            console.log("INSIDE NO DROP DOWN DATA");
        }
    };
    Observations.prototype.onDropDownSelection = function (name) {
        var _this = this;
        return this.observationService.getExamTypesByTemplate(name).subscribe(function (res) {
            if (res.results.length > 1) {
                _this.examTypeslistPopup.open();
                _this.generateExamTypeArray(res);
                _this.examTypesList = _this.listExamTypes;
            }
            else {
                _this.examTypeSelcted = res.results[0].name;
                _this.selectExamTypesByTemplate();
            }
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.confirmAssociation = function () {
        var _this = this;
        this.confirmWorksheetChange();
        if (this.assocPopup == true) {
            this.newAssociationWrksht.close();
        }
        else if (this.assocPopup == false) {
            this.associateWorksheetPopup.close();
        }
        this.examType[0][0].id = this.selectedExamTypeId;
        if (this.selectExamType) {
            this.examTypeSelect = this.selectExamType;
        }
        else {
            this.examTypeSelect = this.examTypeSelcted;
        }
        this.observationService.worksheetAssociation(this.studyId, this.examTypeSelect, "Procedural", this.selectedTemplateName).subscribe(function (res) {
            _this.selectExamType = null;
            _this.examTypeExists = true;
            if ((_this.examType[0][0].examtype != undefined) && res.status == true && (_this.examType[0][0].examtype == res.name)) {
                _this.tagsForExamType(res.id);
                _this.tagsForStudy(_this.studyId);
            }
            else {
                _this.deleteTagsForStudy(_this.studyId);
                _this.tagsForExamType(res.id);
                _this.activeTagList = [];
                _this.tagsList = [];
            }
            _this.examType[0][0].examtype = res.name;
            _this.loadWorksheetList(res.name);
            _this.isValid = false;
            _this.saveWorksheet(false, "Procedural").subscribe(console.log("wrksht saved inside save"));
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.cancelAssociation = function () {
        if (this.assocPopup == true) {
            this.newAssociationWrksht.close();
        }
        else if (this.assocPopup == false) {
            this.associateWorksheetPopup.close();
        }
    };
    Observations.prototype.validateWorksheet = function () {
        this.worksheetValidationPopup.close();
        this.sdata = {};
    };
    Observations.prototype.activeUserslist = function () {
        var _this = this;
        return this.observationService.getActiveUserDetails().subscribe(function (res) {
            _this.activeUsers = res;
            _this.generateArray(_this.activeUsers);
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.activeGroupslist = function () {
        var _this = this;
        return this.observationService.getUserGroupDetails().subscribe(function (res) {
            _this.activeGroups = res;
            if (!(Object.keys(_this.activeGroups.results).length === 0)) {
                _this.generateArrayofGroup(_this.activeGroups);
            }
            var that = _this;
            setTimeout(function () { that.items = that.nameList; that.userlistAndGrouplistPopup.open(); }, 300);
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.submitforQA = function () {
        this.submitToReview();
    };
    Observations.prototype.submitForAttending = function () {
        var _this = this;
        this.isValid = true;
        this.disableExamApproval = true;
        this.observationService.submitToAttending(this.studyId).subscribe(function (res) {
            _this.submitResponse = { readyForAttestation: false };
            console.log('submit for Attestaion', res);
            _this.submitResponse = res;
            if (_this.submitOnSignFlag == true) {
                _this.submitForAttestationToast.open();
            }
            var that = _this;
            _this.autoSaveAlert = true;
            setTimeout(function () { that.submitForAttestationToast.close(); }, 2000);
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.generateArray = function (userObjects) {
        var _this = this;
        userObjects.results.filter(function (element) {
            _this.nameList.push(new __WEBPACK_IMPORTED_MODULE_7__createusergroup_createusergroup_interface__["a" /* Name */]("" + element.userId, element.firstName + " " + element.lastName));
        });
    };
    Observations.prototype.generateArrayofGroup = function (groupObjects) {
        var _this = this;
        groupObjects.results.filter(function (element) {
            _this.nameList.push(new __WEBPACK_IMPORTED_MODULE_7__createusergroup_createusergroup_interface__["a" /* Name */]("" + element.userGroupId, element.groupName + "   " + "-G"));
        });
    };
    Observations.prototype.selectUserorGroup = function () {
        this.userlistAndGrouplistPopup.close();
        this.submitToReview();
    };
    Observations.prototype.submitToReview = function () {
        var _this = this;
        this.isValid = true;
        this.userQaId = '';
        return this.observationService.submitToQA(this.studyId, this.userQaId).subscribe(function (res) {
            _this.reviewResponse = { readyForReview: false };
            _this.submitToReviewToast.open();
            var that = _this;
            _this.autoSaveAlert = true;
            setTimeout(function () { that.submitToReviewToast.close(); }, 2000);
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.cancelUserorGroup = function () {
        this.userlistAndGrouplistPopup.close();
    };
    Observations.prototype.generatePdf = function () {
        if (this.workflowStatus == true || this.qaAttendingWorkflowStatus == true) {
            this.choosePdfPopup.open();
        }
        else {
            var win = window.open('', '_blank');
            return this.observationService.generatePdfReport(this.worksheetId).subscribe(function (res) {
                var fileURL = URL.createObjectURL(res);
                win.location.href = fileURL;
                win.focus();
            }, function (error) { return console.error(error); });
        }
    };
    Observations.prototype.generateSRReport = function () {
        var win = window.open('', '_blank');
        return this.observationService.generateSRReport(this.studyId).subscribe(function (res) {
            var fileURL = URL.createObjectURL(res);
            win.location.href = fileURL;
            win.focus();
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.confirmExamType = function () {
        if (this.selectExamType != null) {
            this.changeExamTypesTemplate();
            this.examTypeslistPopup.close();
        }
        else {
            this.examTypeExists = false;
        }
    };
    Observations.prototype.changeExamTypesTemplate = function () {
        if (!this.selectedTemplateName) {
            this.textInAssociateWrkshtPopup();
        }
        else if (this.examType[0][0].examtype != this.selectExamType || this.selectedTemplateName != this.changedTemplateName) {
            this.textInAssociateWrkshtPopup();
        }
    };
    Observations.prototype.cancelExamType = function () {
        this.examTypeslistPopup.close();
        this.selectExamType = null;
        this.examTypeExists = true;
    };
    /*Tags*/
    Observations.prototype.tagsForExamType = function (id) {
        var _this = this;
        this.observationService.getTagsForExamType(id).subscribe(function (res) {
            _this.generateTagArray(res);
            _this.tagsList = _this.listTags;
            _this.userPreferenceService.getAllPersonalTags(_this.loginUserId).subscribe(function (response) {
                _this.generateTagArray(response);
                _this.tagsList = _this.tagsList.concat(_this.listTags);
                console.log("<<<<<<<" + JSON.stringify(_this.tagsList));
            }, function (error) { return console.error(error); });
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.generateTagArray = function (tagsObject) {
        this.listTags = [];
        for (var len = tagsObject.length, pos = 0; pos < len; pos++) {
            this.listTags.push({ id: tagsObject[pos].id, name: tagsObject[pos].name, type: tagsObject[pos].type });
        }
    };
    Observations.prototype.tagsForStudy = function (studyId) {
        var _this = this;
        this.observationService.getTagsForStudy(studyId).subscribe(function (res) {
            _this.generateTagArray(res);
            _this.activeTagList = _this.listTags;
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.deleteTagsForStudy = function (studyId) {
        this.observationService.deleteTagsForStudyService(studyId).subscribe(function (res) {
        }, function (error) { return console.error(error); });
    };
    /* Pdf Viewer */
    Observations.prototype.onChangeWorksheetPdf = function (type, value) {
        var _this = this;
        if (value) {
            if (type == "qaPdfId") {
                this.pdfWorksheet = null;
                return this.observationService.getQaWorksheetId(this.studyId).subscribe(function (res) {
                    _this.pdfQa = res.qaId;
                });
            }
            else if (type == "worksheetPdfId") {
                this.pdfQa = null;
                this.pdfWorksheet = this.worksheetId;
            }
        }
    };
    Observations.prototype.confirmGeneratePDF = function () {
        this.choosePdfPopup.close();
        var win = window.open('', '_blank');
        if (this.pdfWorksheet && !this.pdfQa) {
            return this.observationService.generatePdfReport(this.pdfWorksheet).subscribe(function (res) {
                var fileURL = URL.createObjectURL(res);
                win.location.href = fileURL;
                win.focus();
            }, function (error) { return console.error(error); });
        }
        else if (!this.pdfWorksheet && this.pdfQa) {
            return this.observationService.generatePdfReport(this.pdfQa).subscribe(function (res) {
                var fileURL = URL.createObjectURL(res);
                win.location.href = fileURL;
                win.focus();
            }, function (error) { return console.error(error); });
        }
    };
    Observations.prototype.cancelGeneratePDF = function () {
        this.choosePdfPopup.close();
    };
    Observations.prototype.confirmCreateOrder = function () {
        var _this = this;
        return this.observationService.createOrderForStudy(this.studyId).subscribe(function (res) {
            _this.createOrderPopUp.close();
            _this.createOrderSuccessToast.open();
            var that = _this;
            setTimeout(function () { that.createOrderSuccessToast.close(); }, 2000);
        }, function (error) { return console.error(error); });
    };
    Observations.prototype.cancelCreateOrder = function () {
        this.createOrderPopUp.close();
    };
    Observations.prototype.cancelAndCreateOrder = function () {
        var _this = this;
        return this.observationService.cancelOrder(this.studyId).subscribe(function (res) {
            var that = _this;
            setTimeout(function () { that.cancelOrderToast.close(); }, 3000);
        }, function (error) {
            _this.cancelOrderToast.close();
            console.error(error);
        });
    };
    return Observations;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Observations.prototype, "studyId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], Observations.prototype, "examType", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], Observations.prototype, "status", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], Observations.prototype, "patientDetails", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Observations.prototype, "referringPhysicianId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], Observations.prototype, "onInprogress", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], Observations.prototype, "isWorksheetOpen", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Observations.prototype, "assignedUser", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Observations.prototype, "loginUserId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Observations.prototype, "workflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Observations.prototype, "attendingWorkflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Observations.prototype, "qaAttendingWorkflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Observations.prototype, "submitOnSignFlag", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Observations.prototype, "attendingUser", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Observations.prototype, "qaUser", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('resetPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "resetPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('cancelPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "cancelPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('saveSuccessPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "saveSuccessPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('submitToEMR'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "submitToEMR", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('worksheetChangePopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "worksheetChangePopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('examTypeChangePopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "examTypeChangePopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('saveSignaturePopUp'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "saveSignaturePopUp", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('submitWorksheetPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "submitWorksheetPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('associateWorksheetPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "associateWorksheetPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('worksheetValidationPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "worksheetValidationPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('userlistAndGrouplistPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "userlistAndGrouplistPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('submitToReviewToast'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "submitToReviewToast", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('submitForAttestationToast'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "submitForAttestationToast", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('assignstudytoattendingPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "assignstudytoattendingPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('examTypeslistPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "examTypeslistPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('saveAttestedSignaturePopUp'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "saveAttestedSignaturePopUp", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('choosePdfPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "choosePdfPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('newAssociationWrksht'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "newAssociationWrksht", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('createOrderPopUp'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "createOrderPopUp", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('createOrderSuccessToast'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "createOrderSuccessToast", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('cancelOrderToast'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], Observations.prototype, "cancelOrderToast", void 0);
Observations = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'observations',
        template: __webpack_require__(400),
        styles: [],
        encapsulation: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewEncapsulation"].None,
        providers: [__WEBPACK_IMPORTED_MODULE_5__studylist_studylist_component__["a" /* StudyListComponent */], __WEBPACK_IMPORTED_MODULE_6__createusergroup_createusergroup_service__["a" /* UserGroupService */], __WEBPACK_IMPORTED_MODULE_8__userpreference_userpreference_service__["a" /* UserPreferenceService */]]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__observations_service__["a" /* ObservationsService */], __WEBPACK_IMPORTED_MODULE_5__studylist_studylist_component__["a" /* StudyListComponent */], __WEBPACK_IMPORTED_MODULE_6__createusergroup_createusergroup_service__["a" /* UserGroupService */], __WEBPACK_IMPORTED_MODULE_8__userpreference_userpreference_service__["a" /* UserPreferenceService */]])
], Observations);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ldapconfiguration_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LdapConfigurationComponent; });






var LdapConfigurationComponent = (function () {
    function LdapConfigurationComponent(route, router, ldapConfigurationService) {
        this.route = route;
        this.router = router;
        this.ldapConfigurationService = ldapConfigurationService;
        this.ldapData = {};
        this.saveTest = true;
        this.selectOption = [
            {
                value: "Choose DirectoryType"
            },
            {
                value: "Active Directory"
            }
        ];
        this.ldapData.directoryType = this.selectOption[0].value;
        this.typeExists = true;
    }
    LdapConfigurationComponent.prototype.ngOnInit = function () {
        this.getldapConfig();
    };
    LdapConfigurationComponent.prototype.onChange = function (event) {
        this.typeExists = true;
    };
    LdapConfigurationComponent.prototype.doSave = function (value) {
        var _this = this;
        if (this.ldapConfigId) {
            return this.ldapConfigurationService.updateLdapConfig(this.ldapConfigId, value).subscribe(function (res) {
                _this.saveLdapConfigPopup.open();
                var that = _this;
                setTimeout(function () { that.saveLdapConfigPopup.close(); }, 1500);
                _this.saveTest = true;
            }, function (error) { return console.error(error); });
        }
        else {
            if (value.directoryType != "Choose DirectoryType") {
                this.typeExists = true;
                return this.ldapConfigurationService.saveldapConfig(value).subscribe(function (res) {
                    _this.saveLdapConfigPopup.open();
                    var that = _this;
                    _this.ldapConfigId = res;
                    setTimeout(function () { that.saveLdapConfigPopup.close(); }, 1500);
                    _this.saveTest = true;
                }, function (error) { return console.error(error); });
            }
            else {
                this.typeExists = false;
            }
        }
    };
    LdapConfigurationComponent.prototype.doValidateConn = function (value) {
        var _this = this;
        return this.ldapConfigurationService.validateConnection(value).subscribe(function (res) {
            _this.isValidConn = res.isValidConn;
            if (_this.isValidConn == true) {
                _this.testConnPopup.open();
                _this.saveTest = false;
            }
            else {
                _this.isValidConn = false;
                _this.testConnFailPopup.open();
            }
        });
    };
    LdapConfigurationComponent.prototype.validateNum = function (e) {
        if (e.keyCode >= 48 && e.keyCode <= 57)
            return true;
        return false;
    };
    LdapConfigurationComponent.prototype.getldapConfig = function () {
        var _this = this;
        this.ldapConfigurationService.getLdapConfig().subscribe(function (res) {
            _this.ldapConfigId = res.id;
            _this.ldapData.directoryType = res.directoryType;
            _this.ldapData.remoteServer = res.remoteServer;
            _this.ldapData.accessGroup = res.accessGroup;
            _this.ldapData.searchRoot = res.searchRoot;
            _this.ldapData.ldapPort = res.ldapPort;
            _this.ldapData.userDn = res.userDn;
            _this.ldapData.manageDn = res.manageDn;
            _this.ldapData.managePassword = res.managePassword;
        }, function (error) { return console.error(error); });
    };
    LdapConfigurationComponent.prototype.cancelPopup = function () {
        this.createldapConfigForm.reset();
        this.getldapConfig();
        this.saveTest = true;
    };
    LdapConfigurationComponent.prototype.successOk = function () {
        this.testConnPopup.close();
    };
    LdapConfigurationComponent.prototype.failTestOk = function () {
        this.testConnFailPopup.close();
    };
    LdapConfigurationComponent.prototype.chengesInForm = function (e) {
        this.saveTest = true;
        if (e.keyCode == 8 || e.keyCode == 46)
            this.saveTest = true;
    };
    return LdapConfigurationComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('saveLdapConfigPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], LdapConfigurationComponent.prototype, "saveLdapConfigPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('testConnPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], LdapConfigurationComponent.prototype, "testConnPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('testConnFailPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_3_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], LdapConfigurationComponent.prototype, "testConnFailPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('createldapConfigForm'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NgForm"])
], LdapConfigurationComponent.prototype, "createldapConfigForm", void 0);
LdapConfigurationComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(419)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_router__["ActivatedRoute"],
        __WEBPACK_IMPORTED_MODULE_5__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_4__ldapconfiguration_service__["a" /* LdapConfigurationService */]])
], LdapConfigurationComponent);



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LdapConfigurationService; });






// Import RxJs required methods


var LdapConfigurationService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](LdapConfigurationService, _super);
    function LdapConfigurationService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    LdapConfigurationService.prototype.saveldapConfig = function (data) {
        var url = this.endPoint.saveLdapConfigDataUrl();
        return this.http.post(url, data)
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    LdapConfigurationService.prototype.validateConnection = function (data) {
        var url = this.endPoint.saveLdapConfigDataUrl() + "/validate";
        return this.http.post(url, data)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    LdapConfigurationService.prototype.getLdapConfig = function () {
        var url = this.endPoint.saveLdapConfigDataUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    LdapConfigurationService.prototype.updateLdapConfig = function (ldapConfigId, data) {
        var url = this.endPoint.saveLdapConfigDataUrl() + "/" + ldapConfigId;
        return this.http.put(url, data)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return LdapConfigurationService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
LdapConfigurationService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], LdapConfigurationService);



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__passwordconfiguration_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordConfigurationComponent; });




var PasswordConfigurationComponent = (function () {
    function PasswordConfigurationComponent(pwdConfigService, appState) {
        this.pwdConfigService = pwdConfigService;
        this.appState = appState;
        this.pwdConfig = {};
        this.loginPolicy = {};
        this.lpChangeVal = {};
        this.lpDefaultVal = {};
        this.emptyNumber = 1;
    }
    PasswordConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orgId = this.appState.get("orgId");
        this.pwdConfigService.getPasswordConfigPolicy(this.orgId).subscribe(function (res) {
            _this.sizeVal = res.results.length;
            if (_this.sizeVal == '2') {
                _this.lpVal = res.results[0].isDefault;
                if (_this.lpVal == 'Y') {
                    _this.lpDefaultVal = res.results[0];
                    console.log("this.loginPolicy if yes at First", _this.loginPolicy);
                    _this.lpChangeVal = res.results[1];
                    _this.orgLoginPolicyId = res.results[1].id;
                    console.log("this.lpChangeVal if yes at First", _this.lpChangeVal);
                    if (_this.lpChangeVal.pwdminlen > 0)
                        _this.assignValueToTextBox(_this.lpChangeVal);
                    else
                        _this.assignValueToTextBox(_this.lpDefaultVal);
                }
                else {
                    _this.lpDefaultVal = res.results[0];
                    console.log("this.lpDefaultVal if yes at Second", _this.lpDefaultVal);
                    _this.lpChangeVal = res.results[1];
                    _this.orgLoginPolicyId = res.results[1].id;
                    console.log("this.loginPolicy if yes at Second", _this.lpChangeVal);
                    if (_this.lpChangeVal.pwdminlen > 0)
                        _this.assignValueToTextBox(_this.lpChangeVal);
                    else
                        _this.assignValueToTextBox(_this.lpDefaultVal);
                }
            }
            else {
                _this.lpDefaultVal = res.results[0];
                console.log("this.emptyValue if yes at Second", _this.lpDefaultVal);
                _this.assignValueToTextBox(_this.lpDefaultVal);
            }
        }, function (error) { return console.error(error); });
    };
    PasswordConfigurationComponent.prototype.assignValueToTextBox = function (value) {
        this.pwdConfig.isUppercase = value ? value.isUppercase : this.isUppercase;
        this.pwdConfig.isLowercase = value ? value.isLowercase : this.isLowercase;
        this.pwdConfig.isNumber = value ? value.isNumber : this.isNumber;
        this.pwdConfig.isSplChar = value ? value.isSplChar : this.isSplChar;
        this.pwdConfig.pwdminlen = value ? value.pwdminlen : this.pwdminlen;
        this.pwdConfig.sysgenpwd = value ? value.sysgenpwd : this.sysgenpwd;
        this.pwdConfig.userdfndpwdexp = value ? value.userdfndpwdexp : this.userdfndpwdexp;
        this.pwdConfig.pwdReuseRestriction = value ? value.pwdReuseRestriction : this.pwdReuseRestriction;
        this.pwdConfig.accntlockmax = value ? value.accntlockmax : this.accntlockmax;
        this.pwdConfig.tmplock = value ? value.tmplock : this.tmplock;
    };
    PasswordConfigurationComponent.prototype.validateNum = function (e) {
        if (e.keyCode >= 48 && e.keyCode <= 57)
            return true;
        return false;
    };
    PasswordConfigurationComponent.prototype.savePolicy = function (value, isValid) {
        var _this = this;
        for (var k in value) {
            var a = 0;
            if (value.isUppercase) {
                a = a + 1;
            }
            if (value.isLowercase) {
                a = a + 1;
            }
            if (value.isNumber) {
                a = a + 1;
            }
            if (value.isSplChar) {
                a = a + 1;
            }
            if (a < 3) {
                this.checkminthree = true;
                return;
            }
            else {
                this.checkminthree = false;
            }
            if (value[k] === "0")
                return;
        }
        if (!this.orgLoginPolicyId) {
            return this.pwdConfigService.savePasswordConfigPolicy(value).subscribe(function (res) {
                _this.lpChangeVal = value;
                _this.orgLoginPolicyId = res;
                console.log("THIS.VALUE AS RESPONSE", res);
                if (res) {
                    alert("saved successfully");
                }
            }, function (error) { return console.error(error); });
        }
        else {
            this.pwdConfigService.updatePasswordConfigPolicy(value, this.orgLoginPolicyId).subscribe(function (res) {
                _this.lpChangeVal = value;
                console.log("THIS.VALUE AS RESPONSE", res);
                if (res) {
                    alert("updated successfully");
                }
            }, function (error) { return console.error(error); });
        }
    };
    PasswordConfigurationComponent.prototype.resetForm = function () {
        this.pwdConfig.pwdminlen = this.lpChangeVal ? this.lpChangeVal.pwdminlen : this.pwdminlen;
        this.pwdConfig.isUppercase = this.lpChangeVal ? this.lpChangeVal.isUppercase : this.isUppercase;
        this.pwdConfig.isLowercase = this.lpChangeVal ? this.lpChangeVal.isLowercase : this.isLowercase;
        this.pwdConfig.isNumber = this.lpChangeVal ? this.lpChangeVal.isNumber : this.isNumber;
        this.pwdConfig.isSplChar = this.lpChangeVal ? this.lpChangeVal.isSplChar : this.isSplChar;
        this.pwdConfig.sysgenpwd = this.lpChangeVal ? this.lpChangeVal.sysgenpwd : this.sysgenpwd;
        this.pwdConfig.userdfndpwdexp = this.lpChangeVal ? this.lpChangeVal.userdfndpwdexp : this.userdfndpwdexp;
        this.pwdConfig.pwdReuseRestriction = this.lpChangeVal ? this.lpChangeVal.pwdReuseRestriction : this.pwdReuseRestriction;
        this.pwdConfig.accntlockmax = this.lpChangeVal ? this.lpChangeVal.accntlockmax : this.accntlockmax;
        this.pwdConfig.tmplock = this.lpChangeVal ? this.lpChangeVal.tmplock : this.tmplock;
        this.hideErrorMsg();
    };
    PasswordConfigurationComponent.prototype.resetDefault = function () {
        this.pwdConfig.pwdminlen = this.lpDefaultVal ? this.lpDefaultVal.pwdminlen : this.pwdminlen;
        this.pwdConfig.sysgenpwd = this.lpDefaultVal ? this.lpDefaultVal.sysgenpwd : this.sysgenpwd;
        this.pwdConfig.userdfndpwdexp = this.lpDefaultVal ? this.lpDefaultVal.userdfndpwdexp : this.userdfndpwdexp;
        this.pwdConfig.pwdReuseRestriction = this.lpDefaultVal ? this.lpDefaultVal.pwdReuseRestriction : this.pwdReuseRestriction;
        this.pwdConfig.accntlockmax = this.lpDefaultVal ? this.lpDefaultVal.accntlockmax : this.accntlockmax;
        this.pwdConfig.tmplock = this.lpDefaultVal ? this.lpDefaultVal.tmplock : this.tmplock;
        this.pwdConfig.isUppercase = this.lpDefaultVal ? this.lpDefaultVal.isUppercase : this.isUppercase;
        this.pwdConfig.isLowercase = this.lpDefaultVal ? this.lpDefaultVal.isLowercase : this.isLowercase;
        this.pwdConfig.isNumber = this.lpDefaultVal ? this.lpDefaultVal.isNumber : this.isNumber;
        this.pwdConfig.isSplChar = this.lpDefaultVal ? this.lpDefaultVal.isSplChar : this.isSplChar;
        this.hideErrorMsg();
    };
    PasswordConfigurationComponent.prototype.hideErrorMsg = function () {
        this.errsyspwd = false;
        this.erruserdndpwd = false;
        this.errpwdreuse = false;
        this.errlockmax = false;
        this.errtmplock = false;
        this.errsyspwd = false;
        this.errpwdminlen = false;
        this.checkminthree = false;
    };
    PasswordConfigurationComponent.prototype.diserrsyspwd = function (value) {
        if (value == 'hide' || !value)
            this.errsyspwd = false;
        else if (value == 0)
            this.errsyspwd = true;
    };
    PasswordConfigurationComponent.prototype.diserruserdndpwd = function (value) {
        if (value == 'hide' || !value)
            this.erruserdndpwd = false;
        else if (value == 0)
            this.erruserdndpwd = true;
    };
    PasswordConfigurationComponent.prototype.diserrpwdreuse = function (value) {
        if (value == 'hide' || !value)
            this.errpwdreuse = false;
        else if (value == 0 || value > 10)
            this.errpwdreuse = true;
    };
    PasswordConfigurationComponent.prototype.diserrlockmax = function (value) {
        if (value == 'hide' || !value)
            this.errlockmax = false;
        else if (value == 0)
            this.errlockmax = true;
    };
    PasswordConfigurationComponent.prototype.diserrtmplock = function (value) {
        if (value == 'hide' || !value)
            this.errtmplock = false;
        else if (value == 0)
            this.errtmplock = true;
    };
    PasswordConfigurationComponent.prototype.dispwdminlen = function (value) {
        if (value == 'hide' || !value)
            this.errpwdminlen = false;
        else if (value < 8 || value > 64)
            this.errpwdminlen = true;
    };
    return PasswordConfigurationComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('pwdConfigForm'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], PasswordConfigurationComponent.prototype, "pwdConfigForm", void 0);
PasswordConfigurationComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(421)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__passwordconfiguration_service__["a" /* PasswordConfigurationService */], __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppState */]])
], PasswordConfigurationComponent);



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordConfigurationService; });








var PasswordConfigurationService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](PasswordConfigurationService, _super);
    function PasswordConfigurationService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    PasswordConfigurationService.prototype.savePasswordConfigPolicy = function (policyData) {
        var url = this.endPoint.savePasswordPolicyUrl();
        return this.http.post(url, policyData)
            .map(function (res) {
            var location = res.headers.get('Location');
            if (location) {
                var frag = location.split("/");
                return frag[frag.length - 1];
            }
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    PasswordConfigurationService.prototype.getPasswordConfigPolicy = function () {
        var url = this.endPoint.savePasswordPolicyUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    PasswordConfigurationService.prototype.updatePasswordConfigPolicy = function (value, orgLoginPolicyId) {
        var url = this.endPoint.updatePwdPolicyUrl() + "/" + parseInt(orgLoginPolicyId) + "/passwordpolicy";
        return this.http.put(url, value)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return PasswordConfigurationService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
PasswordConfigurationService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], PasswordConfigurationService);



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rolelist_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__createrole_createrole_interface__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__createrole_createrole_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleListComponent; });








var RoleListComponent = (function () {
    function RoleListComponent(router, rolelistservice, roleService, appState, bearer) {
        this.router = router;
        this.rolelistservice = rolelistservice;
        this.roleService = roleService;
        this.appState = appState;
        this.roleTable = null;
        this.roleData = {};
        this.roleList = [];
        this.rolesList = [];
        this.reallocatedRoleSelected = true;
        this.bearer = bearer;
    }
    RoleListComponent.prototype.selected = function (value) {
        console.log('Selected value is: ', value.id);
        this.newRoleId = value.id;
    };
    RoleListComponent.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
    };
    RoleListComponent.prototype.refreshValue = function (value) {
        this.newRoleId = value ? value.id : value;
        if (this.newRoleId) {
            this.reallocatedRoleSelected = true;
        }
        else {
            this.reallocatedRoleSelected = false;
        }
    };
    RoleListComponent.prototype.typed = function (value) {
        console.log('New search input: ', value);
    };
    RoleListComponent.prototype.generateArray = function (roles) {
        var _this = this;
        this.roleList = [];
        roles.results.filter(function (element) {
            if (_this.selectedRoleId != element.id) {
                _this.roleList.push(new __WEBPACK_IMPORTED_MODULE_6__createrole_createrole_interface__["a" /* Name */](element.id, element.roleName));
            }
        });
    };
    RoleListComponent.prototype.navigateToCreateRole = function () {
        this.formState = "Add";
        this.router.navigate(['createrole', this.formState]);
    };
    RoleListComponent.prototype.ngOnInit = function () {
        this.initRoleListDataTable();
    };
    RoleListComponent.prototype.initRoleListDataTable = function () {
        var url = this.rolelistservice.getRolesList();
        var that = this;
        this.roleTable = $('#tableRoleList').DataTable({
            "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'f><'col-xs-12 col-sm-5 m-b-10'<'roleListToolBar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
            "rowId": "roleId",
            "asStripeClasses": [],
            "ajax": {
                "url": url,
                "type": "GET",
                "dataSrc": "results",
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + that.bearer);
                }
            },
            "columns": [
                { "data": "roleName" },
                { "data": "description" },
                {
                    orderable: false,
                    "data": "id",
                    render: function (data) {
                        return '<div class="dropdown table-dropdown p-5 align-center">'
                            + '<button class="btn btn-default dropdown-toggle" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
                            + '<span class="caret"></span>'
                            + '</button>'
                            + '<ul class="dropdown-menu dropdown-menu-right">'
                            + '<li><a href="javascript:void(0)" class="modifybtn" roleId="' + data + '"> View/Modify</a></li>'
                            + '<li><a href="javascript:void(0)" class="deleteRole" roleId="' + data + '"> Delete</a></li>'
                            + '<li><a href="javascript:void(0)" class="cloneRole" roleId="' + data + '"> Clone</a></li>'
                            + '</ul>'
                            + '</div>';
                    }
                }
            ],
            "aaSorting": [],
            "order": [[0, "asc"]],
            "language": {
                "zeroRecords": "No Role available"
            },
            "fnDrawCallback": function (settings) {
                $('.modifybtn').on('click', function () {
                    this.formState = "Modify";
                    var roleId = $(this).attr('roleId');
                    that.navigateToUpdateRole(roleId, this.formState);
                });
                $('.deleteRole').on('click', function () {
                    var roleId = $(this).attr('roleId');
                    that.deleteRole(roleId);
                });
                $('.cloneRole').on('click', function () {
                    this.formState = "Clone";
                    var roleId = $(this).attr('roleId');
                    that.navigateToUpdateRole(roleId, this.formState);
                });
            }
        });
        $(".roleListToolBar").html('<div class="btn-toolbar pull-right">' +
            '<div class="btn-group" role="group" aria-label="...">' +
            '<a id="btnCreateRole" href="javascript:void(0)" class="btn btn-default" role="button">Add Role</a>' +
            '</div>' +
            '</div>');
        var that = this;
        $('#btnCreateRole').on('click', function () {
            that.navigateToCreateRole();
        });
    };
    RoleListComponent.prototype.navigateToUpdateRole = function (roleId, formState) {
        this.router.navigate(['createrole', formState, roleId]);
    };
    RoleListComponent.prototype.roleAllocateList = function () {
        var _this = this;
        this.rolelistservice.getRoles().subscribe(function (res) {
            _this.roles = res;
            _this.generateArray(_this.roles);
            _this.rolesList = [];
            _this.rolesList = _this.roleList;
            _this.roleService.getRoleById(_this.selectedRoleId).subscribe(function (response) {
                if (_this.rolesList.length == 0 || response.countStatus == false) {
                    _this.oneRoleDelete.open();
                }
                else {
                    _this.confirmDelete.open();
                }
            }, function (error) { return console.error(error); });
        });
    };
    RoleListComponent.prototype.deleteRole = function (id) {
        this.selectedRoleId = id;
        this.roleAllocateList();
    };
    RoleListComponent.prototype.noReallocate = function () {
        this.confirmDeleteRole();
    };
    RoleListComponent.prototype.confirmDeleteRole = function () {
        var _this = this;
        this.rolelistservice.deleteRole(this.selectedRoleId).subscribe(function (response) {
            if (response == 204) {
                _this.confirmDelete.close();
                _this.oneRoleDelete.close();
                var url = _this.rolelistservice.getRolesList();
                _this.roleTable.ajax.url(url).load().draw('false');
            }
        }, function (error) { return console.error(error); });
    };
    RoleListComponent.prototype.reAllocateRole = function () {
        this.reAllocatePopup.open();
        this.confirmDelete.close();
    };
    RoleListComponent.prototype.confirmReassign = function () {
        var _this = this;
        if (this.newRoleId) {
            this.reAllocatePopup.close();
            this.rolelistservice.reAllocateRoles(this.selectedRoleId, this.newRoleId).subscribe(function (res) {
                _this.newRoleId = '';
                _this.confirmDelete.close();
                var url = _this.rolelistservice.getRolesList();
                _this.roleTable.ajax.url(url).load().draw('false');
            }, function (error) { return console.error(error); });
        }
        else {
            this.reallocatedRoleSelected = false;
        }
    };
    RoleListComponent.prototype.cancelReassign = function () {
        this.newRoleId = '';
        this.reAllocatePopup.close();
        this.reallocatedRoleSelected = true;
    };
    RoleListComponent.prototype.noDelete = function () {
        this.oneRoleDelete.close();
    };
    return RoleListComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('confirmDelete'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], RoleListComponent.prototype, "confirmDelete", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('reAllocatePopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], RoleListComponent.prototype, "reAllocatePopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('oneRoleDelete'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], RoleListComponent.prototype, "oneRoleDelete", void 0);
RoleListComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(422)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __param */](4, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"])('bearer')),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_3__rolelist_service__["a" /* RoleListService */],
        __WEBPACK_IMPORTED_MODULE_7__createrole_createrole_service__["a" /* RoleService */],
        __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppState */], String])
], RoleListComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleListService; });






// Import RxJs required methods


var RoleListService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](RoleListService, _super);
    function RoleListService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    RoleListService.prototype.getRolesList = function () {
        return this.endPoint.roleUrl();
    };
    RoleListService.prototype.getRoles = function () {
        var url = this.endPoint.roleUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    RoleListService.prototype.deleteRole = function (roleId) {
        var url = this.endPoint.roleUrl() + "/" + roleId;
        return this.http.delete(url)
            .map(function (res) {
            return res.status;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    RoleListService.prototype.reAllocateRoles = function (roleId, newRoleId) {
        var url = this.endPoint.roleUrl() + "/" + roleId + "/reallocate" + "?roleId=" + newRoleId;
        ;
        return this.http.put(url)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return RoleListService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
RoleListService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], RoleListService);



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__smtpconfiguration_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmtpConfigurationComponent; });





var SmtpConfigurationComponent = (function () {
    function SmtpConfigurationComponent(appState, smtpConfiguration) {
        this.appState = appState;
        this.smtpConfiguration = smtpConfiguration;
        this.smtpConfig = {};
        this.userNameError = true;
        this.passwordError = true;
        this.invalidEmail = true;
        this.disableUserName = false;
        this.disablePassword = false;
    }
    SmtpConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectOption = [
            {
                value: "Select"
            },
            {
                value: "Yes"
            }, {
                value: "No"
            }
        ];
        this.smtpConfig.isSSL = this.selectOption[0].value;
        this.smtpConfig.isAuth = this.selectOption[0].value;
        this.appState.getUserName().subscribe(function (res) {
            _this.getSmtpData(res.orgId);
        });
    };
    SmtpConfigurationComponent.prototype.getSmtpData = function (orgId) {
        var _this = this;
        this.smtpConfiguration.getSmtpConfiguration(orgId).subscribe(function (res) {
            _this.smtpConfig.id = res.id;
            _this.smtpConfig.orgId = res.orgId;
            _this.smtpConfig.userName = res.userName;
            _this.smtpConfig.password = res.password;
            _this.smtpConfig.port = res.port;
            _this.smtpConfig.server = res.server;
            _this.smtpConfig.isAuth = (res.isAuth == true) ? 'Yes' : 'No';
            _this.smtpConfig.isSSL = (res.isSSL == true) ? 'Yes' : 'No';
            _this.smtpConfig.defaultEmail = res.defaultEmail;
            if (_this.smtpConfig.isAuth == 'No') {
                _this.disableUserName = true;
                _this.disablePassword = true;
            }
        });
    };
    SmtpConfigurationComponent.prototype.saveSmtpConfiguration = function (smtpConfig, smtpConfigvalidation) {
        if (smtpConfigvalidation && smtpConfig.defaultEmail != null && smtpConfig.defaultEmail.trim() != '') {
            this.emailValidation(smtpConfig.defaultEmail);
        }
        if (smtpConfig.isAuth == 'Yes') {
            if (smtpConfig.userName == null || smtpConfig.userName == '') {
                this.userNameError = false;
            }
            else {
                this.userNameError = true;
            }
            if (smtpConfig.password == null || smtpConfig.password == '') {
                this.passwordError = false;
            }
            else {
                this.passwordError = true;
            }
        }
        else {
            this.passwordError = true;
            this.userNameError = true;
        }
        if (smtpConfigvalidation && this.passwordError && this.userNameError && this.invalidEmail) {
            smtpConfig.isSSL = false;
            smtpConfig.isAuth = (smtpConfig.isAuth == 'Yes') ? true : false;
            smtpConfig.orgId = this.smtpConfig.orgId;
            smtpConfig.isEnable = true;
            if (this.smtpConfig.id != null) {
                this.smtpConfiguration.updateSmtpConfiguration(this.smtpConfig.id, smtpConfig).subscribe(function (res) {
                    console.log("Updated Successfully");
                });
            }
            else { }
        }
    };
    SmtpConfigurationComponent.prototype.resetForm = function () {
        this.smtpConfigForm.reset();
        this.smtpConfig.isAuth = this.selectOption[0].value;
    };
    SmtpConfigurationComponent.prototype.validateAlpha = function (e) {
        if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 46 || e.keyCode == 45 || (e.keyCode >= 97 && e.keyCode < 123) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 32)
            return true;
        return false;
    };
    SmtpConfigurationComponent.prototype.validateNum = function (e) {
        if (e.keyCode >= 48 && e.keyCode <= 57)
            return true;
        return false;
    };
    SmtpConfigurationComponent.prototype.removePasswordError = function () {
        this.passwordError = true;
    };
    SmtpConfigurationComponent.prototype.removeUserNameError = function () {
        this.userNameError = true;
    };
    SmtpConfigurationComponent.prototype.emailValidation = function (value) {
        var EMAIL_REGEXP = /^[a-zA-Z0-9]([\.-_]?[a-zA-Z0-9])*@+[a-zA-Z0-9]([\.-]?[a-zA-Z0-9])*(\.[a-zA-Z0-9]{2,})+$/;
        if (!EMAIL_REGEXP.test(value)) {
            this.invalidEmail = false;
        }
        else {
            var personal_info = value.split("@");
            var domain = personal_info[1];
            if (personal_info[0].length > 64 || domain.length > 35 || (personal_info[0].indexOf('^') >= 0) || (value.lastIndexOf('@') - personal_info[0].length > 0)) {
                this.invalidEmail = false;
            }
            else {
                this.invalidEmail = true;
            }
        }
    };
    SmtpConfigurationComponent.prototype.removeEmailError = function () {
        this.invalidEmail = true;
    };
    SmtpConfigurationComponent.prototype.getText = function (event) {
        if (this.smtpConfig.isAuth == 'Yes') {
            this.disableUserName = false;
            this.disablePassword = false;
        }
        else {
            this.smtpConfig.userName = '';
            this.smtpConfig.password = '';
            this.disableUserName = true;
            this.disablePassword = true;
            this.userNameError = true;
            this.passwordError = true;
        }
    };
    return SmtpConfigurationComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('smtpConfigForm'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_4__angular_forms__["NgForm"])
], SmtpConfigurationComponent.prototype, "smtpConfigForm", void 0);
SmtpConfigurationComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(423)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */], __WEBPACK_IMPORTED_MODULE_3__smtpconfiguration_service__["a" /* SmtpConfigurationService */]])
], SmtpConfigurationComponent);



/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmtpConfigurationService; });






// Import RxJs required methods


var SmtpConfigurationService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](SmtpConfigurationService, _super);
    function SmtpConfigurationService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    SmtpConfigurationService.prototype.getSmtpConfiguration = function (orgId) {
        var url = this.endPoint.getSmtpConfigurationUrl() + "?orgId=" + parseInt(orgId);
        return this.http.get(url)
            .map(function (res) {
            var json = res.json();
            return json;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    SmtpConfigurationService.prototype.updateSmtpConfiguration = function (configId, data) {
        var url = this.endPoint.saveSmtpConfigurationUrl() + "/" + parseInt(configId);
        return this.http.put(url, data)
            .map(function (res) {
            return res;
        });
    };
    SmtpConfigurationService.prototype.catch = function () { };
    return SmtpConfigurationService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
SmtpConfigurationService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], SmtpConfigurationService);

(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
;


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__studylist_component__ = __webpack_require__(78);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__studylist_component__["a"]; });



/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__studylist_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__createusergroup_createusergroup_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__createusergroup_createusergroup_interface__ = __webpack_require__(39);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudyListComponent; });









var StudyListComponent = (function () {
    function StudyListComponent(ref, route, router, studylistService, userGroupService, appState, bearer) {
        this.ref = ref;
        this.route = route;
        this.router = router;
        this.studylistService = studylistService;
        this.userGroupService = userGroupService;
        this.appState = appState;
        this.studylistTableData = {};
        this.studyDetail = null;
        this.userNameData = {};
        this.defaultDuration = {};
        this.loginUserId = null;
        this.userNameExists = true;
        this.items = [];
        this.nameList = [];
        this.userNamesItems = [];
        this.usersNameList = [];
        this.userGroup = {};
        this.table = null;
        this.filter = {
            type: ""
        };
        this.searchData = {};
        this.token = {};
        this.Uname = {};
        this.status = ["Assigned"];
        // ***************ng2-select
        this.value = ['Athens'];
        this._disabledV = '0';
        this.disabled = false;
        this.bearer = bearer;
    }
    StudyListComponent.prototype.generateArray = function (userOjects) {
        var _this = this;
        userOjects.results.filter(function (element) {
            if (element.userStatus == 'Y') {
                if (_this.loginUserId != element.userId) {
                    _this.nameList.push(new __WEBPACK_IMPORTED_MODULE_8__createusergroup_createusergroup_interface__["a" /* Name */](element.userId, element.firstName + " " + element.lastName));
                }
            }
        });
    };
    StudyListComponent.prototype.generateArrayForAllUsers = function (userOjects) {
        var _this = this;
        userOjects.results.filter(function (element) {
            if (element.userStatus == 'Y') {
                _this.usersNameList.push(new __WEBPACK_IMPORTED_MODULE_8__createusergroup_createusergroup_interface__["a" /* Name */](+element.userId, element.firstName + " " + element.lastName));
            }
        });
    };
    Object.defineProperty(StudyListComponent.prototype, "disabledV", {
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    StudyListComponent.prototype.selected = function (value) {
        console.log('Selected value is: ', value.id);
        this.userId = value.id;
    };
    StudyListComponent.prototype.removed = function (value) {
        console.log('Removed value is: ', value);
    };
    StudyListComponent.prototype.refreshValue = function (value) {
        this.userId = value ? value.id : value;
        if (this.userId) {
            this.userNameExists = true;
        }
        else {
            this.userNameExists = false;
        }
    };
    StudyListComponent.prototype.typed = function (value) {
        console.log('New search input: ', value);
    };
    StudyListComponent.prototype.itemsToString = function (value) {
        if (value === void 0) { value = []; }
        return value
            .map(function (item) {
            return item.text;
        }).join(',');
    };
    StudyListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadUsername();
        this.route.queryParams
            .subscribe(function (params) {
            console.log('queryParams', params);
            if (params.id)
                _this.filter.type = params.id;
            else {
                _this.filter.type = '';
            }
            if (params.start && params.end && params.label) {
                _this.defaultDuration = {
                    start: __WEBPACK_IMPORTED_MODULE_3_moment___default()(parseInt(params.start)),
                    end: __WEBPACK_IMPORTED_MODULE_3_moment___default()(parseInt(params.end)),
                    label: params.label
                };
            }
            else {
                _this.defaultDuration = null;
            }
            _this.onDurationChange(_this.defaultDuration ? _this.defaultDuration : _this.selectedDuration);
        });
        this.userGroupService.getUserList().subscribe(function (res) {
            _this.userdetails = res;
            _this.generateArray(_this.userdetails);
            _this.items = _this.nameList;
            var url = _this.studylistService.getStudyListUrl(_this.selectedDuration, _this.filter, _this.searchData);
            _this.table.ajax.url(url).load().draw('false');
        });
        this.userGroupService.getUserList().subscribe(function (res) {
            _this.userdetails = res;
            _this.generateArrayForAllUsers(_this.userdetails);
            _this.userNamesItems = _this.usersNameList;
            var url = _this.studylistService.getStudyListUrl(_this.selectedDuration, _this.filter, _this.searchData);
            _this.table.ajax.url(url).load().draw('false');
        });
        this.getStatus();
        this.getExamType();
    };
    StudyListComponent.prototype.loadStudyDetail = function (studyid) {
        var _this = this;
        console.log('loadStudyDetail', studyid);
        this.studyDetail = null;
        this.studylistService.getStudyDetails(studyid).subscribe(function (studyDetailData) {
            _this.studyDetail = studyDetailData[0];
            var that = _this;
            _this.ref.detectChanges();
            // setTimeout(function(){that.showAccordion(studyid);},0);
        }, function (error) { return console.error(error); });
    };
    StudyListComponent.prototype.onDurationChange = function (event) {
        console.log("onDurationChange", event);
        this.selectedDuration = event;
        if (!this.table) {
            this.initDataTable();
        }
        else {
            var oldUrl = this.table.ajax.url();
            var newUrl = this.studylistService.getStudyListUrl(this.selectedDuration, this.filter, this.searchData);
            if (oldUrl !== newUrl) {
                this.table.ajax.url(newUrl).load();
            }
        }
    };
    StudyListComponent.prototype.onClickClearAll = function () {
        this.filter = { type: "" };
        this.defaultDuration = {};
        //this.searchData = {};
        this.createAdvancedSearchForm.reset();
    };
    StudyListComponent.prototype.navigateToStudyList = function () {
        this.router.navigate(['studylist']);
    };
    StudyListComponent.prototype.navigateToImageViewer = function (studyId) {
        this.router.navigate(['imageviewer', studyId]);
    };
    StudyListComponent.prototype.navigatetoViewer = function () {
        var that = this;
        $('.imageviewerbtn').on('click', function () {
            var studyId = $(this).attr('studyId');
            that.navigateToImageViewer(studyId);
        });
    };
    /*
    * showAccordion(studyid:String){ var currTr = $('#'+studyid); var tr =
    * currTr.closest('tr'); var row = this.table.row( tr ); if(row.length !=
    * 0){ // Open this row row.child( $('#accordion').html() ).show();
    * row.child().addClass('accordion');
    * row.child().attr('id','accordion-'+studyid) tr.addClass('shown');
    * tr.hide(); $('div.slider', row.child()).slideDown(); } }
    *
    * hideAccordion(id: String) { var currTr = $('#'+id);
    * console.log("CurreTR",currTr); var tr = currTr.closest('tr');
    * console.log("TR",tr); var row = this.table.row( tr );
    * console.log('loadAccordion', row); console.log('Length', row.length);
    * if(row.length == 0){ if ( $('tr').hasClass('accordion') ) { // This
    * row is already open - close it // $('div.slider',
    * row.child()).slideUp( function () {
    * currTr.prev('tr').removeClass('shown').show(); currTr.hide(); // } ); } } }
    */
    StudyListComponent.prototype.initDataTable = function () {
        var that = this;
        var isGrid = [];
        isGrid[0] = false;
        var url = this.studylistService.getStudyListUrl(this.selectedDuration, this.filter, this.searchData);
        this.table = $('#tableStudyList')
            .on('order.dt', function () { console.log('Order'); })
            .on('search.dt', function () { console.log('Search'); })
            .on('page.dt', function () { console.log('Page'); })
            .DataTable({
            "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'<'col-xs-12 col-sm-4'f><'col-xs-12 col-sm-8'<'filters'>>><'col-xs-12 col-sm-5 m-b-10'<'toolbar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
            "asStripeClasses": [],
            "rowId": "studyId",
            "bStateSave": true,
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('tableStudyList', JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('tableStudyList'));
            },
            "ajax": {
                "url": url,
                "type": "POST",
                "dataSrc": "results",
                "contentType": "application/json",
                "data": function (searchData) {
                    return JSON.stringify(that.searchData);
                },
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + that.bearer);
                },
            },
            "columns": [
                {
                    orderable: false,
                    render: function (data, type, row) {
                        return '<input type="checkbox">';
                    }
                },
                {
                    orderable: false,
                    render: function (data, type, row) {
                        return '<i class="fa fa-fw fa-folder-o fw-35"></i>';
                    }
                },
                {
                    "data": "studyType",
                    render: function (data, type, row) {
                        var str;
                        if (data == "Educational")
                            return '<span class="label color-white bg-gray b-1-gray">' + data + '</span>';
                        else
                            return '<span class="label color-gray b-1-gray">' + data + '</span>';
                    }
                },
                {
                    "data": "examType",
                    render: function (data) {
                        var str = "";
                        str = str + '<div class="col-xs-12 p-x-0"><span class="col-xs-12 fw-86p label bg-examtype">'
                            + '<span>' + data + '</span>'
                            + '</span></div>';
                        return str;
                    }
                },
                {
                    "data": "modality",
                    render: function (data) {
                        var str = "";
                        if (data.length > 1)
                            str = str + '<div class="col-xs-12 p-x-0">'
                                + '<span class="col-xs-9 p-x-0">' + data[0] + '</span>'
                                + '<span class="col-xs-2 badge badgecount m-l-5">' + ((data.length) - 1) + '</span>'
                                + '</div>';
                        else
                            str = str + '<div class="col-xs-12 p-x-0">'
                                + '<span class="col-xs-9 p-x-0">' + data[0] + '</span>'
                                + '</div>';
                        return str;
                    }
                },
                { "data": "patient.id" },
                {
                    "data": "patient",
                    render: function (data) {
                        return data.firstName + " " + data.middleName + " " + data.lastName;
                    }
                },
                {
                    "data": "assignedUser",
                    render: function (data) {
                        return data[0].prefix + " " + data[0].firstName + " " + data[0].middleName + " " + data[0].lastName;
                    }
                },
                {
                    "data": "qaUser",
                    render: function (data) {
                        return data[0].prefix + " " + data[0].firstName + " " + data[0].middleName + " " + data[0].lastName;
                    }
                },
                {
                    "data": "attendingUser",
                    render: function (data) {
                        return data[0].prefix + " " + data[0].firstName + " " + data[0].middleName + " " + data[0].lastName;
                    }
                },
                { "data": "date" },
                {
                    "data": "tags",
                    render: function (data) {
                        var str = "";
                        if (data.length > 1)
                            str = str + '<div class="col-xs-12 p-x-0"><span class="col-xs-8">'
                                + data[0] + '</span>'
                                + '<span class="col-xs-3 badge badgecount m-l-5">' + ((data.length) - 1) + '</span>'
                                + '</div>';
                        else if (data.length == 0)
                            str = str + '<div class="col-xs-12 p-x-0"><span class="col-xs-8"></span></div>';
                        else
                            str = str + '<div class="col-xs-12 p-x-0"><span class="col-xs-8">'
                                + data[0] + '</span></div>';
                        return str;
                    }
                },
                {
                    orderable: false,
                    "data": "status",
                    render: function (data) {
                        var str;
                        if (data[0] == "New")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                        else if (data[0] == "Assigned")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                        else if (data[0] == "Pending" || data[0] == "In-Progress")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                        else if (data[0] == "Signed")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                        else if (data[0] == "QAUnassigned" || data[0] == "qa-unassigned")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaunassigned" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                        else if (data[0] == "SubmittedForAttestation" || data[0] == "Submitted-for-Attestation")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                        else if (data[0] == "Attested" || data[0] == "Attested")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Attested" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                        else if (data[0] == "QAAssigned" || data[0] == "qa-assigned")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                        else if (data[0] == "QAInProgress" || data[0] == "qa-inprogress")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                        else if (data[0] == "Submitted" || data[0] == "Submitted-to-EMR")
                            return '<div class="progress"><div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Attested" role="progressbar" style="width:11.1%" title=' + data + '></div><div class="progress-bar bg-Submitted" role="progressbar" style="width:11.1%" title=' + data + '></div></div>';
                    }
                },
                {
                    orderable: false,
                    "data": "studyId",
                    render: function (id, data, row) {
                        var str = "";
                        str = '<div class="dropdown table-dropdown action p-5 align-center b-1-lightgray">'
                            + '<a class="va-m imageviewerbtn" studyId="' + id + '"onclick="" href="javascript:void(0)"><i class="fa fa-fw fa-picture-o m-r-5"></i></a>';
                        if (row.status == 'Submitted') {
                            str = str + '<button class="btn btn-default dropdown-toggle" studyId="' + id + '" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" disabled>'
                                + '<span class="caret"></span>'
                                + '</button>';
                        }
                        else {
                            str = str + '<button class="btn btn-default dropdown-toggle" studyId="' + id + '" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
                                + '<span class="caret"></span>'
                                + '</button>'
                                + '<ul class="dropdown-menu dropdown-menu-right">';
                            if (row.status == 'New') {
                                str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="assignbtn">Assign to me</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="assignstudybyadminbtn">Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
                            }
                            else if (row.status == 'Pending') {
                                str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="unassignAdm">Un-Assign</a></li>';
                                if (row.assignedUser[0].id == that.loginUserId) {
                                    str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="reassignbtn">Re-Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="reassigntoattendingbtn">Assign/change Attending</a></li>';
                                }
                                else {
                                    str = str + '<li><a studyId="' + id + '" class="disabled">Re-Assign</a></li>';
                                }
                                str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
                            }
                            else if (row.status == 'Assigned') {
                                if (row.assignedUser[0].id == that.loginUserId) {
                                    str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="unassignbtn">Un-Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="reassignbtn">Re-Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="reassigntoattendingbtn">Assign/change Attending</a></li>'
                                        + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
                                }
                                else {
                                    str = str + '<li><a studyId="' + id + '" class="disabled">Re-Assign</a></li>'
                                        + '<li><a studyId="' + id + '" class="disabled">Un-Assign</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
                                }
                            }
                            else if (row.status == 'QAUnassigned') {
                                str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="qaassignbtn">Assign me as QA</a></li>' + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
                            }
                            else {
                                str = str + '<li><a href="javascript:void(0)" studyId="' + id + '" class="deletebtn">Delete</a></li>';
                            }
                        }
                        str = str + '</ul></div>';
                        return str;
                    }
                },
                {
                    orderable: false,
                    visible: false,
                    render: function (data, type, row, meta) {
                        var str = "";
                        str = '<div class="col-xs-12">' +
                            '<div class="panel panel-default">' +
                            '<div class="panel-heading p-y-0">' +
                            '<div class="row">' +
                            '<div class="col-xs-3 pull-left m-t-5"><i class="fa fa-fw fa-folder-o fa-3x pull-left"></i></div>' +
                            '<div class="col-xs-5 fw-18 m-t-10 p-x-0"><span class="m-l-20"></span></div>' +
                            '<div class="col-xs-4 pull-right m-t-10">' +
                            '<a class="imageviewerbtn" studyId="' + row.studyId + '" href="javascript:void(0)"><i class="fa fa-fw fa-picture-o fa-2x pull-right"></i></a>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<!-- START Content -->' +
                            '<div class="panel-body p-x-0">' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Study Type:</label></div>' +
                            '<div class="col-xs-7" >';
                        if (row.studyType == "Clinical") {
                            str = str + '<span class=" label color-gray b-1-gray">' + row.studyType + '</span></div>';
                        }
                        else {
                            str = str + '<span class="label color-white bg-gray b-1-gray">' + row.studyType + '</span></div>';
                        }
                        str = str + '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Exam Type:</label></div>' +
                            '<div class="col-xs-7">';
                        str = str + '<span class="label bg-examtype">' + row.examType;
                        str = str + '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Device:</label></div>' +
                            '<div class="col-xs-7">';
                        if (row.modality.length > 1) {
                            str = str + '<span>' + row.modality[0] + ' &nbsp&nbsp</span>' +
                                '<span class="badge badgecount">' + (row.modality.length - 1) + '</span></span>';
                        }
                        else {
                            str = str + '<span>' + row.modality[0] + '</span>';
                        }
                        str = str + '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Patient ID:</label></div>' +
                            '<div class="col-xs-7"><span>' + row.patient.id + '</span></div>' +
                            '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Patient Name:</label></div>' +
                            '<div class="col-xs-7"><span>' +
                            row.patient.firstName + ' ' +
                            row.patient.middleName + ' ' +
                            row.patient.lastName + '</span></div>' +
                            '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Performing Physician:</label></div>' +
                            '<div class="col-xs-7"><span>' + row.assignedUser.prefix + ' ' +
                            row.assignedUser.firstName + ' ' +
                            row.assignedUser.middleName + ' ' +
                            row.assignedUser.lastName + '</span></div>' +
                            '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>QA Reviewer:</label></div>' +
                            '<div class="col-xs-7"><span>' + row.qaUser.prefix + ' ' +
                            row.qaUser.firstName + ' ' +
                            row.qaUser.middleName + ' ' +
                            row.qaUser.lastName + '</span></div>' +
                            '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Attending Physician:</label></div>' +
                            '<div class="col-xs-7"><span>' + row.attendingUser.prefix + ' ' +
                            row.attendingUser.firstName + ' ' +
                            row.attendingUser.middleName + ' ' +
                            row.attendingUser.lastName + '</span></div>' +
                            '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Date:</label></div>' +
                            '<div class="col-xs-7"><span>' + row.date + '</span></div>' +
                            '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Tags:</label></div>' +
                            '<div class="col-xs-7">' +
                            '</div>' +
                            '<div class="col-xs-12 p-x-0">' +
                            '<div class="col-xs-5 b-r-1-lightergray"><label>Study Progress:</label></div>';
                        if (row.status == "New") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (row.status == "Assigned") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (row.status == "Pending" || row.status == "In-Progress") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (row.status == "Signed") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (row.status == "QAUnassigned" || row.status == "qa-unassigned") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qaunassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (row.status == "QAAssigned" || row.status == "qa-assigned") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (row.status == "SubmittedForAttestation" || row.status == "Submitted-for-Attestation") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (row.status == "Attested" || row.status == "Attested") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Attested" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (row.status == "QAInProgress" || row.status == "qa-inprogress") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        else if (row.status == "Submitted-to-EMR" || row.status == "Submitted") {
                            str = str + '<div class="col-xs-7  m-t-5">' +
                                '<div class="progress">' +
                                '<div class="progress-bar bg-New" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Assigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Pending" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Signed" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qaassigned" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Qainprogress" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Submitted-for-Attestation" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Attested" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '<div class="progress-bar bg-Submitted" role="progressbar" style="width:11.1%" title=' + row.status + '></div>' +
                                '</div>' +
                                '</div>';
                        }
                        str = str + '</div>' +
                            '</div>' +
                            '<!-- Content Ends -->' +
                            '</div>' +
                            '</div>';
                        return str;
                    }
                }
            ],
            "aaSorting": [],
            "order": [[10, "desc"]],
            "language": {
                "zeroRecords": "No records found"
            },
            "fnDrawCallback": function (settings) {
                $('.imageviewerbtn').on('click', function () {
                    var studyId = $(this).attr('studyId');
                    that.navigateToImageViewer(studyId);
                });
                $('.assignbtn').on('click', function () {
                    that.selectedStudyId = $(this).attr('studyId');
                    that.assignStudy();
                });
                $('.reassignbtn').on('click', function () {
                    that.selectedStudyId = $(this).attr('studyId');
                    that.reassignStudy();
                });
                $('.unassignAdm').on('click', function () {
                    that.selectedStudyId = $(this).attr('studyId');
                    that.unAssignPopUp();
                });
                $('.qaassignbtn').on('click', function () {
                    that.selectedStudyId = $(this).attr('studyId');
                    that.qaassigntomePopup();
                });
                $('.unassignbtn').on('click', function () {
                    that.selectedStudyId = $(this).attr('studyId');
                    that.unassignStudyPop();
                });
                $('.reassigntoattendingbtn').on('click', function () {
                    that.selectedStudyId = $(this).attr('studyId');
                    that.reassignstudytoattending();
                });
                $('.deletebtn').on('click', function () {
                    that.selectedStudyId = $(this).attr('studyId');
                    that.deleteStudyPop();
                });
                $('.assignstudybyadminbtn').on('click', function () {
                    that.selectedStudyId = $(this).attr('studyId');
                    that.assignStudyByAdminPop();
                });
            }
        });
        var that = this;
        var column = that.table.columns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
        column.visible(true);
        that.table.column(14).visible(false);
        $('#tableStudyList tbody').on('click', 'tr', function () {
            var id = $(this).attr('id');
            if (event.target.nodeName != "BUTTON" && event.target.nodeName != "A" && event.target.nodeName != "INPUT" &&
                event.target.parentNode.nodeName != "BUTTON" && event.target.parentNode.nodeName != "A" && isGrid[0] != true) {
                if (id.startsWith('accordion')) {
                    // that.hideAccordion(id);
                    return;
                }
                else {
                    var childrow = $('tr.accordion');
                    childrow.prev('tr').removeClass('shown').show();
                    childrow.hide();
                    that.loadStudyDetail($(this).attr('id'));
                }
            }
        });
        /* Tool Bar */
        $(".toolbar").html('<div class="btn-toolbar pull-right">' +
            '<div class="btn-group" role="group" aria-label="...">' +
            '<a id="btnClearAll" href="javascript:void(0)" class="btn btn-default" role="button">Clear Filters</a>' +
            '</div>' +
            '</div>');
        /* Switching Between Grid and List view */
        $('#studylistbtn').on('click', function () {
            isGrid[0] = false;
            $('#tableStudyList tbody').removeClass('isGrid clearfix');
            var column = that.table.columns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
            column.visible(true);
            that.table.column(14).visible(false);
            /* Navigate To Image Viewer From List */
            that.navigatetoViewer();
        });
        $('#studygridbtn').on('click', function () {
            isGrid[0] = true;
            $('#tableStudyList tbody').addClass('isGrid clearfix');
            // Hide Columns
            var column = that.table.columns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
            column.visible(false);
            that.table.column(14).visible(true);
            // Hide Accordion when moving to Grid
            /*
            * if($('#tableStudyList tr.accordion:visible')){ var
            * accordionid = $('tr.accordion:visible').attr('id');
            * that.hideAccordion(accordionid); }
            */
            if (!that.table.data().count()) {
                if ($('#tableStudyList tbody').hasClass('isGrid clearfix')) {
                    $('#tableStudyList tr').css({ 'float': 'none' });
                }
                else {
                    $('#tableStudyList tr').css({ 'float': 'left' });
                }
            }
            /* Navigate To Image Viewer From Grid */
            that.navigatetoViewer();
        });
        /* Functionality of Clear Filters Button */
        $('#btnClearAll').on('click', function () {
            that.onClickClearAll();
        });
        /* ToolBox Make only one button active */
        $('.highlightbtn a').on('click', function () {
            var currentTab = $(this);
            currentTab.addClass('active');
            currentTab.siblings('a').removeClass('active');
        });
    };
    StudyListComponent.prototype.assignStudy = function () {
        this.assignPopup.open();
    };
    StudyListComponent.prototype.reassignStudy = function () {
        this.reassignPopup.open();
    };
    StudyListComponent.prototype.loadUsername = function () {
        var _this = this;
        this.appState.getUserName().subscribe(function (userNameData) {
            _this.Uname = userNameData;
            _this.loginUserId = userNameData.id;
            return userNameData;
        }, function (error) { return console.error(error); });
    };
    StudyListComponent.prototype.confirmAssign = function (type) {
        var _this = this;
        console.log('inside assign popup', this.selectedStudyId);
        if (type == 'qa') {
            this.qaassignPopup.close();
        }
        else {
            this.assignPopup.close();
        }
        this.loadUsername();
        this.studylistService.updateStatus(this.selectedStudyId, type).subscribe(function (res) {
            var rowData = _this.table.row('#' + _this.selectedStudyId).data();
            if (type == 'qa') {
                rowData.qaUser[0] = res;
                rowData.status = ["QAAssigned"];
            }
            else {
                rowData.assignedUser[0] = res;
                rowData.status = _this.status;
            }
            var url = _this.studylistService.getStudyListUrl(_this.selectedDuration, _this.filter, _this.searchData);
            _this.table.ajax.url(url).load().draw('false');
        }, function (error) { return console.error(error); });
    };
    StudyListComponent.prototype.cancelAssign = function () {
        this.assignPopup.close();
    };
    StudyListComponent.prototype.unAssignPopUp = function () {
        this.unAssignStudyWorksheetPopUp.open();
    };
    StudyListComponent.prototype.qacancelAssign = function () {
        this.qaassignPopup.close();
    };
    StudyListComponent.prototype.qaassigntomePopup = function () {
        this.confirmAssign('qa');
    };
    StudyListComponent.prototype.cancelUnAssignStudy = function () {
        this.unAssignStudyWorksheetPopUp.close();
    };
    StudyListComponent.prototype.confirmUnAssignStudy = function () {
        var _this = this;
        console.log('inside unassign component', this.selectedStudyId);
        this.unAssignStudyWorksheetPopUp.close();
        this.studylistService.unAssignStudyWorksheet(this.selectedStudyId).subscribe(function (res) {
            if (res.status == true) {
                _this.studylistService.unAssignStudy(_this.selectedStudyId).subscribe(function (response) {
                    var url = _this.studylistService.getStudyListUrl(_this.selectedDuration, _this.filter, _this.searchData);
                    _this.table.ajax.url(url).load().draw('false');
                }, function (error) { return console.error(error); });
            }
        }, function (error) { return console.error(error); });
    };
    StudyListComponent.prototype.confirmReassign = function () {
        var _this = this;
        if (this.userId) {
            this.reassignPopup.close();
            var that = this;
            setTimeout(function () {
                that.reassignToast.open();
            }, 1000);
            this.studylistService.updateReassignUsername(this.selectedStudyId, this.userId).subscribe(function (res) {
                _this.userId = '';
                if (res)
                    setTimeout(function () {
                        that.reassignToast.close();
                    }, 3000);
                var url = _this.studylistService.getStudyListUrl(_this.selectedDuration, _this.filter, _this.searchData);
                _this.table.ajax.url(url).load().draw('false');
            }, function (error) { return console.error(error); });
        }
        else {
            this.userNameExists = false;
        }
    };
    StudyListComponent.prototype.cancelReassign = function () {
        this.userId = '';
        this.userNameExists = true;
        this.reassignPopup.close();
    };
    StudyListComponent.prototype.unassignStudyPop = function () {
        this.unassignPopup.open();
    };
    StudyListComponent.prototype.confirmUnassign = function () {
        var _this = this;
        console.log('inside unassign popup', this.selectedStudyId);
        this.unassignPopup.close();
        this.studylistService.modifyStatus(this.selectedStudyId).subscribe(function (res) {
            var url = _this.studylistService.getStudyListUrl(_this.selectedDuration, _this.filter, _this.searchData);
            _this.table.ajax.url(url).load().draw('false');
        }, function (error) { return console.error(error); });
    };
    StudyListComponent.prototype.cancelUnassign = function () {
        this.unassignPopup.close();
    };
    StudyListComponent.prototype.deleteStudyPop = function () {
        this.deletePopup.open();
    };
    StudyListComponent.prototype.cancelDelete = function () {
        this.deletePopup.close();
    };
    StudyListComponent.prototype.confirmDelete = function () {
        var _this = this;
        console.log('inside delete popup', this.selectedStudyId);
        this.deletePopup.close();
        this.studylistService.deleteStudy(this.selectedStudyId).subscribe(function (res) {
            _this.table.row('#' + _this.selectedStudyId).remove().draw('page');
        }, function (error) { return console.error(error); });
    };
    StudyListComponent.prototype.reassignstudytoattending = function () {
        this.reassignstudytoattendingPopup.open();
    };
    StudyListComponent.prototype.cancelAssignToAttend = function () {
        this.userId = '';
        this.reassignstudytoattendingPopup.close();
        this.userNameExists = true;
    };
    StudyListComponent.prototype.confirmAssignToAttend = function () {
        var _this = this;
        if (this.userId) {
            this.studylistService.assignStudyToAttending(this.selectedStudyId, this.userId).subscribe(function (res) {
                _this.userId = '';
                _this.reassignstudytoattendingPopup.close();
                var rowData = _this.table.row('#' + _this.selectedStudyId).data();
                rowData.attendingUser[0] = res;
                _this.table.row('#' + _this.selectedStudyId).data(rowData).draw('page');
            }, function (error) { return console.error(error); });
        }
        else {
            this.userNameExists = false;
        }
    };
    StudyListComponent.prototype.assignStudyByAdminPop = function () {
        this.assignStudyByAdminPopup.open();
    };
    StudyListComponent.prototype.cancelAssignStudyByAdmin = function () {
        this.userId = '';
        this.assignStudyByAdminPopup.close();
        this.userNameExists = true;
    };
    StudyListComponent.prototype.confirmAssignStudyByAdmin = function () {
        var _this = this;
        if (this.userId) {
            this.assignStudyByAdminPopup.close();
            var that = this;
            setTimeout(function () {
                that.assignToast.open();
            }, 1000);
            this.studylistService.assignStudyByAdmin(this.selectedStudyId, this.userId).subscribe(function (res) {
                _this.userId = '';
                var rowData = _this.table.row('#' + _this.selectedStudyId).data();
                rowData.assignedUser[0] = res;
                rowData.status = ['Assigned'];
                _this.table.row('#' + _this.selectedStudyId).data(rowData).draw('page');
                var that = _this;
                if (res)
                    setTimeout(function () {
                        that.assignToast.close();
                    }, 3000);
            }, function (error) { return console.error(error); });
        }
        else {
            this.userNameExists = false;
        }
    };
    StudyListComponent.prototype.getStatus = function () {
        var _this = this;
        this.studylistService.getSearchStatus().subscribe(function (res) {
            _this.searchStatuses = res;
        });
    };
    StudyListComponent.prototype.getExamType = function () {
        var _this = this;
        this.studylistService.getSearchExamType().subscribe(function (res) {
            _this.searchExamtypes = res.results;
        });
    };
    StudyListComponent.prototype.searchStudies = function (value) {
        value.patientName = this.searchData.patientName;
        value.pocName = this.searchData.pocName;
        value.searchExamType = this.searchData.searchExamType;
        value.searchStatus = this.searchData.searchStatus;
        console.log("Input of search criteria", value, this.searchData);
        var url = this.studylistService.getStudyListUrl(this.selectedDuration, this.filter, this.searchData);
        this.table.ajax.url(url).load().draw('false');
    };
    return StudyListComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('assignPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "assignPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('qaassignPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "qaassignPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('reassignPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "reassignPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('reassignToast'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "reassignToast", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('unAssignStudyWorksheetPopUp'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "unAssignStudyWorksheetPopUp", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('unassignPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "unassignPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('deletePopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "deletePopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('reassignstudytoattendingPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "reassignstudytoattendingPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('assignStudyByAdminPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "assignStudyByAdminPopup", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('assignToast'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_6_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], StudyListComponent.prototype, "assignToast", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('createAdvancedSearchForm'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], StudyListComponent.prototype, "createAdvancedSearchForm", void 0);
StudyListComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(424)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __param */](6, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"])('bearer')),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ChangeDetectorRef"],
        __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"],
        __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_4__studylist_service__["a" /* StudylistService */],
        __WEBPACK_IMPORTED_MODULE_7__createusergroup_createusergroup_service__["a" /* UserGroupService */],
        __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppState */], String])
], StudyListComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__usergrouplist_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserGroupListComponent; });






var UserGroupListComponent = (function () {
    function UserGroupListComponent(router, usergrouplistservice, appState, bearer) {
        this.router = router;
        this.usergrouplistservice = usergrouplistservice;
        this.appState = appState;
        this.bearer = bearer;
    }
    UserGroupListComponent.prototype.navigateToCreateUserGroup = function () {
        this.formState = "Add";
        this.router.navigate(['createusergroup', this.formState]);
    };
    UserGroupListComponent.prototype.ngOnInit = function () {
        this.initUserListDataTable();
    };
    UserGroupListComponent.prototype.deleteUserGroup = function (id) {
        this.selectedUserGroupId = id;
        this.confirmDelete.open();
    };
    UserGroupListComponent.prototype.initUserListDataTable = function () {
        var url = this.usergrouplistservice.getUserGroupDetails();
        var that = this;
        this.usertable = $('#tableUserGroupList').DataTable({
            "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'f><'col-xs-12 col-sm-5 m-b-10'<'userListToolBar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
            "asStripeClasses": [],
            "rowId": "userGroupId",
            "ajax": {
                "url": url,
                "type": "GET",
                "dataSrc": "results",
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + that.bearer);
                }
            },
            "columns": [
                { "data": "groupName" },
                { "data": "description" },
                {
                    orderable: false,
                    "data": "userGroupId",
                    render: function (data) {
                        return '<div class="dropdown table-dropdown usergrouplistaction p-5 align-center">'
                            + '<button class="btn btn-default dropdown-toggle" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
                            + '<span class="caret"></span>'
                            + '</button>'
                            + '<ul class="dropdown-menu dropdown-menu-right">'
                            + '<li><a href="javascript:void(0)" class="modifybtn" userGroupId="' + data + '"> View/Modify</a></li>'
                            + '<li><a href="javascript:void(0)" class="deleteUserGroup" userGroupId="' + data + '"> Delete</a></li>'
                            + '</ul>'
                            + '</div>';
                    }
                }
            ],
            "aaSorting": [],
            "order": [[0, "asc"]],
            "language": {
                "zeroRecords": "No user group available"
            },
            "fnDrawCallback": function (settings) {
                $('.deleteUserGroup').on('click', function () {
                    var userGroupId = $(this).attr('userGroupId');
                    that.deleteUserGroup(userGroupId);
                });
                $('.modifybtn').on('click', function () {
                    //this.formState = "Modify";
                    var userGroupId = $(this).attr('userGroupId');
                    that.navigateToUpdateUserGroup(userGroupId);
                });
            }
        });
        $(".userListToolBar").html('<div class="btn-toolbar pull-right">' +
            '<div class="btn-group" role="group" aria-label="...">' +
            '<a id="btnCreateUserGroup" href="javascript:void(0)" class="btn btn-default" role="button">Create New User Group</a>' +
            '</div>' +
            '</div>');
        var that = this;
        $('#btnCreateUserGroup').on('click', function () {
            that.navigateToCreateUserGroup();
        });
    };
    UserGroupListComponent.prototype.confirmDeleteGroup = function () {
        var _this = this;
        console.log("USER ID INSIDE ANOTHER METHOD", this.selectedUserGroupId);
        this.usergrouplistservice.deleteUserGroup(this.selectedUserGroupId).subscribe(function (response) {
            if (response == 204) {
                _this.confirmDelete.close();
                if (!_this.usertable) {
                    _this.initUserListDataTable();
                }
                else {
                    var url = _this.usergrouplistservice.getUserGroupDetails();
                    _this.usertable.row('#' + _this.selectedUserGroupId).remove().draw('page');
                }
            }
            else { }
        });
    };
    UserGroupListComponent.prototype.cancelDelete = function () {
        this.confirmDelete.close();
    };
    UserGroupListComponent.prototype.navigateToUpdateUserGroup = function (userId) {
        this.formState = "Modify";
        this.router.navigate(['createusergroup', this.formState, userId]);
    };
    return UserGroupListComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('confirmDelete'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_5_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], UserGroupListComponent.prototype, "confirmDelete", void 0);
UserGroupListComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(425)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __param */](3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"])('bearer')),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_3__usergrouplist_service__["a" /* UserGrouplistService */],
        __WEBPACK_IMPORTED_MODULE_4__app_service__["a" /* AppState */], String])
], UserGroupListComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserGrouplistService; });






// Import RxJs required methods


var UserGrouplistService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](UserGrouplistService, _super);
    function UserGrouplistService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    UserGrouplistService.prototype.getUserGroupDetails = function () {
        return this.endPoint.getUserGroupListUrl();
    };
    UserGrouplistService.prototype.deleteUserGroup = function (groupId) {
        var url = this.endPoint.saveNewGroupUserUrl() + "/" + groupId;
        return this.http.delete(url)
            .map(function (res) {
            return res.status;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return UserGrouplistService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
UserGrouplistService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], UserGrouplistService);



/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userlist_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserListComponent; });






var UserListComponent = (function () {
    function UserListComponent(router, userlistservice, appState, bearer) {
        this.router = router;
        this.userlistservice = userlistservice;
        this.appState = appState;
        this.userTable = null;
        this.bearer = bearer;
    }
    UserListComponent.prototype.navigateToCreateUser = function () {
        this.formState = "Add";
        this.router.navigate(['createuser', this.formState]);
    };
    UserListComponent.prototype.ngOnInit = function () {
        this.initUserListDataTable();
    };
    UserListComponent.prototype.initUserListDataTable = function () {
        var url = this.userlistservice.getUserDetails();
        var that = this;
        this.userTable = $('#tableUserList').DataTable({
            "sDom": "<'row m-t-15'<'col-xs-12 col-sm-7 m-b-10'f><'col-xs-12 col-sm-5 m-b-10'<'userListToolBar'>>>" + "<'row m-t-5'<'col-xs-12 bg-white'tr>>" + "<'row m-t-5'<'col-xs-2'l><'col-xs-3'i><'col-xs-6'p>>",
            "asStripeClasses": [],
            "rowId": "userId",
            "ajax": {
                "url": url,
                "type": "GET",
                "dataSrc": "results",
                "beforeSend": function (request) {
                    request.setRequestHeader("Authorization", "Bearer " + that.bearer);
                }
            },
            "columns": [
                { "data": "title" },
                {
                    "data": null,
                    render: function (data) {
                        return data.firstName + " " + data.lastName;
                    }
                },
                { "data": "userName" },
                { "data": "phoneNo" },
                { "data": "email" },
                {
                    orderable: false,
                    "data": "userId",
                    render: function (id, data, row) {
                        var str = "";
                        str = str + '<div class="dropdown table-dropdown userlistaction p-5 align-center">'
                            + '<button class="btn btn-default dropdown-toggle" onclick="" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'
                            + '<span class="caret"></span>'
                            + '</button>'
                            + '<ul class="dropdown-menu dropdown-menu-right">';
                        if (row.userStatus == 'Y') {
                            str = str + '<li><a class="deactive-select" userId="' + id + '" href="javascript:void(0)" > Deactivate</a></li>'
                                + '<li><a class="modify-select" userId="' + id + '" href="javascript:void(0)" > View/Modify</a></li>';
                        }
                        else if (row.userStatus == 'N') {
                            str = str + '<li><a class="active-select" userId="' + id + '" href="javascript:void(0)" > Activate</a></li>';
                        }
                        if (row.locked == 'Y') {
                            str = str + '<li><a class="unlock-user" userId="' + id + '" href="javascript:void(0)" > Unlock</a></li>';
                        }
                        str = str + '</ul>' + '</div>';
                        return str;
                    }
                }
            ],
            "aaSorting": [],
            "order": [[2, "asc"]],
            "fnDrawCallback": function (index, settings) {
                $('.active-select').on('click', function () {
                    that.selectedUserId = $(this).attr('userId');
                    console.log("that. userid", that.selectedUserId);
                    that.buttonActive();
                });
                $('.deactive-select').on('click', function () {
                    that.selectedUserId = $(this).attr('userId');
                    that.butttonDeactive();
                });
                $('.modify-select').on('click', function () {
                    //  this.formState = "Modify";
                    that.selectedUserId = $(this).attr('userId');
                    that.navigateToUpdateUser(that.selectedUserId);
                });
                $('.unlock-user').on('click', function () {
                    that.selectedUserId = $(this).attr('userId');
                    that.confirmUnLockUser();
                });
                /*Action Drop Down for list ends*/
            },
            "fnRowCallback": function (nRow, row) {
                if (row.userStatus == 'N') {
                    $('td', nRow).css('background-color', '#e2e2e2');
                }
                else if (row.userStatus == 'Y') {
                    $('td', nRow).css('background-color', '#fff');
                }
            }
        });
        $(".userListToolBar").html('<div class="btn-toolbar pull-right">' +
            '<div class="btn-group" role="group" aria-label="...">' +
            '<a id="btnCreateUser" href="javascript:void(0)" class="btn btn-default" role="button">Create New User</a>' +
            '</div>' +
            '</div>');
        var that = this;
        $('#btnCreateUser').on('click', function () {
            that.navigateToCreateUser();
        });
    };
    UserListComponent.prototype.navigateToUpdateUser = function (userId) {
        this.formState = "Modify";
        this.router.navigate(['createuser', this.formState, userId]);
    };
    UserListComponent.prototype.buttonActive = function () {
        this.activateUserStatus.open();
    };
    UserListComponent.prototype.cancelActivate = function () {
        this.activateUserStatus.close();
    };
    UserListComponent.prototype.confirmActivate = function () {
        var _this = this;
        this.activateUserStatus.close();
        var changeStatus = "true";
        console.log("user id  ", this.selectedUserId);
        this.userlistservice.getActiveStatus(this.selectedUserId, changeStatus).subscribe(function (res) {
            _this.uresp = res;
            var rowData = _this.userTable.row('#' + _this.selectedUserId).data();
            rowData.userStatus = "Y";
            _this.userTable.row('#' + _this.selectedUserId).data(rowData).draw('page');
        }, function (error) { return console.error(error); });
    };
    UserListComponent.prototype.butttonDeactive = function () {
        this.deactivateUserStatus.open();
    };
    UserListComponent.prototype.cancelDeactivate = function () {
        this.deactivateUserStatus.close();
    };
    UserListComponent.prototype.confirmDeactivate = function () {
        var _this = this;
        this.deactivateUserStatus.close();
        var changeStatus = "false";
        console.log("user id  ", this.selectedUserId);
        this.userlistservice.getActiveStatus(this.selectedUserId, changeStatus).subscribe(function (res) {
            _this.uresp = res;
            var rowData = _this.userTable.row('#' + _this.selectedUserId).data();
            rowData.userStatus = "N";
            _this.userTable.row('#' + _this.selectedUserId).data(rowData).draw('page');
        }, function (error) { return console.error(error); });
    };
    UserListComponent.prototype.confirmUnLockUser = function () {
        var _this = this;
        this.userlistservice.unlockUser(this.selectedUserId).subscribe(function (res) {
            var rowData = _this.userTable.row('#' + _this.selectedUserId).data();
            rowData.locked = "N";
            _this.userTable.row('#' + _this.selectedUserId).data(rowData).draw('page');
            _this.userUnlockToast.open();
            var that = _this;
            setTimeout(function () { that.userUnlockToast.close(); }, 1500);
        }, function (error) { return console.error(error); });
    };
    return UserListComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('deactivateUserStatus'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], UserListComponent.prototype, "deactivateUserStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('activateUserStatus'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], UserListComponent.prototype, "activateUserStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('userUnlockToast'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], UserListComponent.prototype, "userUnlockToast", void 0);
UserListComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        template: __webpack_require__(426),
        encapsulation: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewEncapsulation"].None
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __param */](3, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"])('bearer')),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"],
        __WEBPACK_IMPORTED_MODULE_3__userlist_service__["a" /* UserlistService */],
        __WEBPACK_IMPORTED_MODULE_5__app_service__["a" /* AppState */], String])
], UserListComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserlistService; });






// Import RxJs required methods


var UserlistService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](UserlistService, _super);
    function UserlistService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    UserlistService.prototype.getUserDetails = function () {
        return this.endPoint.userUrl();
    };
    UserlistService.prototype.getUser = function () {
        var url = this.endPoint.userUrl();
        return this.http.get(url)
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserlistService.prototype.getActiveStatus = function (id, data) {
        var url = this.endPoint.getActiveStatusUrl() + "/" + id + "/changeStatus";
        return this.http.put(url, { status: data })
            .map(function (res) {
            return res.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserlistService.prototype.unlockUser = function (userId) {
        var url = "/api/account/" + parseInt(userId) + "/unlock";
        return this.http.put(url)
            .map(function (res) {
            return res;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return UserlistService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
UserlistService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], UserlistService);



/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userpreference_service__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserpreferenceComponent; });





var UserpreferenceComponent = (function () {
    function UserpreferenceComponent(appState, userpreferenceservice) {
        this.appState = appState;
        this.userpreferenceservice = userpreferenceservice;
        this.listTags = [];
        this.personalTagsList = [];
        this.addTags = [];
        this.lst = [];
        this.examTags = [];
        this.savedvalue = [];
    }
    UserpreferenceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appState.getUserName().subscribe(function (res) {
            _this.loginUserId = res.id;
            _this.userpreferenceservice.getAllPersonalTags(_this.loginUserId).subscribe(function (response) {
                _this.generateTagArray(response);
                _this.personalTagsList = _this.listTags;
            });
        });
    };
    UserpreferenceComponent.prototype.addType = function () {
        this.isDuplicate = false;
        if (this.newPersonalTag) {
            for (var _i = 0, _a = this.personalTagsList; _i < _a.length; _i++) {
                var t = _a[_i];
                if (t.name == this.newPersonalTag) {
                    this.isDuplicate = true;
                    break;
                }
            }
            if (this.isDuplicate) {
                this.titleMsg = 'Duplicate Personal Tag';
                this.subMsg = 'Tag already Exists!';
                this.infoPopUp.open();
                var that = this;
                setTimeout(function () { that.infoPopUp.close(); }, 2000);
            }
            else {
                this.personalTagsList.push({ name: this.newPersonalTag });
                this.newPersonalTag = '';
            }
        }
    };
    UserpreferenceComponent.prototype.generateTagArray = function (tagsObject) {
        this.listTags = [];
        for (var len = tagsObject.length, pos = 0; pos < len; pos++) {
            this.listTags.push({
                id: tagsObject[pos].id,
                name: tagsObject[pos].name,
                type: tagsObject[pos].type
            });
        }
    };
    UserpreferenceComponent.prototype.deleteType = function (index) {
        this.personalTagsList.splice(this.personalTagsList.indexOf(index), 1);
    };
    UserpreferenceComponent.prototype.savePersonalTags = function () {
        var _this = this;
        this.userpreferenceservice.deleteAllTags(this.loginUserId).subscribe(function (resp) {
        });
        if (this.personalTagsList.length > 0) {
            this.addTags = [];
            for (var _i = 0, _a = this.personalTagsList; _i < _a.length; _i++) {
                var p = _a[_i];
                this.addTags.push({ name: p.name });
            }
            this.userpreferenceservice.savePersonalTags(this.loginUserId, this.addTags).subscribe(function (res) {
                _this.titleMsg = 'Save Personal Tag';
                _this.subMsg = 'Saved Successfully!';
                _this.infoPopUp.open();
                var that = _this;
                setTimeout(function () { that.infoPopUp.close(); }, 2000);
            }, function (err) {
            });
        }
    };
    UserpreferenceComponent.prototype.clearAll = function () {
        var _this = this;
        this.userpreferenceservice.deleteAllTags(this.loginUserId).subscribe(function (resp) {
            _this.titleMsg = 'Clear Personal Tag';
            _this.subMsg = 'Deleted Successfully!';
            _this.infoPopUp.open();
            var that = _this;
            setTimeout(function () { that.infoPopUp.close(); }, 2000);
            _this.personalTagsList = [];
        });
    };
    return UserpreferenceComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('infoPopUp'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_4_ng2_bs3_modal_ng2_bs3_modal__["ModalComponent"])
], UserpreferenceComponent.prototype, "infoPopUp", void 0);
UserpreferenceComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-userpreference',
        template: __webpack_require__(427),
        styles: [__webpack_require__(444)],
        providers: [__WEBPACK_IMPORTED_MODULE_3__userpreference_service__["a" /* UserPreferenceService */]]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */], __WEBPACK_IMPORTED_MODULE_3__userpreference_service__["a" /* UserPreferenceService */]])
], UserpreferenceComponent);



/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_abstract_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPreferenceService; });






//Import RxJs required methods


var UserPreferenceService = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __extends */](UserPreferenceService, _super);
    function UserPreferenceService(http, endPoint) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.endPoint = endPoint;
        return _this;
    }
    UserPreferenceService.prototype.getAllPersonalTags = function (loginuserid) {
        var url = this.endPoint.personalTagsUrl() + "/" + loginuserid + "/tag";
        return this.http.get(url)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserPreferenceService.prototype.savePersonalTags = function (loginUserId, data) {
        var url = this.endPoint.personalTagsUrl() + "/" + parseInt(loginUserId) + "/tag";
        return this.http.post(url, data)
            .map(function (res) {
            return true;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    UserPreferenceService.prototype.deleteAllTags = function (loginuserid) {
        var url = this.endPoint.personalTagsUrl() + "/" + loginuserid + "/tag";
        return this.http.delete(url)
            .map(function (resp) {
            return resp;
        })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].throw(error || 'Server error'); });
    };
    return UserPreferenceService;
}(__WEBPACK_IMPORTED_MODULE_4__app_abstract_service__["a" /* AbstractService */]));
UserPreferenceService = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_5__app_endpoints__["a" /* EndPoint */]])
], UserPreferenceService);



/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorksheetconfigComponent; });


var WorksheetconfigComponent = (function () {
    function WorksheetconfigComponent() {
        this.wsConfig = {};
    }
    WorksheetconfigComponent.prototype.ngOnInit = function () {
    };
    WorksheetconfigComponent.prototype.savePolicy = function (value, isValid) {
        console.log("submit");
    };
    return WorksheetconfigComponent;
}());
WorksheetconfigComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-worksheetconfig',
        template: __webpack_require__(428),
        styles: [__webpack_require__(445)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], WorksheetconfigComponent);



/***/ }),
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, " /* html, body{\r\n  height: 100%;\r\n  font-family: Arial, Helvetica, sans-serif\r\n}\r\n\r\nng-select span.ui-select-match-item.btn{\r\n\twhite-space:normal;\r\n}\r\n\r\nspan.active {\r\n  background-color: gray;\r\n}  */\r\n\r\nng-select span.ui-select-match-item.btn{\r\n\twhite-space:normal;\r\n}\r\n\r\n/*Common*/\r\n*{\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n.color-primary {\r\n    color: #337ab7 !important;\r\n}\r\n\r\n\r\n.clearfix:after,.clearfix:before{\r\n    content:\" \";\r\n    display:table\r\n}\r\n.clearfix:after{\r\n    clear:both\r\n}\r\nbody{\r\n    font-size:13px;\r\n    font-family: \"Calibri\";\r\n    color: #333;\r\n}\r\nul{\r\n    list-style-type: none;\r\n}\r\na{\r\n    text-decoration: none !important;\r\n    color:#333;\r\n}\r\na:hover{\r\n    color:#333;\r\n}\r\n.align-center{\r\n    text-align: center;\r\n}\r\n.align-left{\r\n    text-align: left;\r\n}\r\n.daterange{\r\n    cursor: pointer;\r\n    width: 300px;\r\n}\r\n.contentpage {\r\n  margin-top:55px;\r\n}\r\n.label{\r\n  white-space: normal;\r\n}\r\n.disabled{\r\n\topacity:0.6 !important;\r\n}\r\n/*Common Ends/*\r\n\r\n\r\n\r\n/*Height Width and Line Height*/\r\n.h-30{\r\n    height:30px;\r\n}\r\n.h-34{\r\n    height:34px;\r\n}\r\n.lh-35{\r\n    line-height:35px;\r\n}\r\n.lh-30{\r\n    line-height:30px;\r\n}\r\n.lh-26{\r\n    line-height:26px;\r\n}\r\n.va-m{\r\n    vertical-align: middle;\r\n}\r\n/*Height ends*/\r\n\r\n\r\n/*Font Size*/\r\n.fw-15{\r\n    font-size: 15px;\r\n}\r\n.fw-18{\r\n    font-size: 18px;\r\n}\r\n.fw-35{\r\n    font-size: 35px;\r\n}\r\n.fw-86p{\r\n  font-size: 86%;\r\n}\r\n/*Font Size Ends*/\r\n\r\n\r\n/*Top and Left*/\r\n.t-8{\r\n    top:8px;\r\n}\r\n/*Top and Left Ends*/\r\n\r\n\r\n/*Padding*/\r\n.p-x-0{\r\n    padding-right: 0px !important;\r\n    padding-left: 0px !important;\r\n}\r\n.p-y-0{\r\n    padding-top:0px !important;\r\n    padding-bottom:0px !important;\r\n}\r\n.p-y-10{\r\n    padding-top:10px;\r\n    padding-bottom:10px;\r\n}\r\n.p-2{\r\n    padding:2px !important;\r\n}\r\n.p-4{\r\n    padding:4px !important;\r\n}\r\n.p-5{\r\n    padding:5px !important;\r\n}\r\n.p-10{\r\n    padding:10px !important;\r\n}\r\n.p-15{\r\n    padding:15px !important;\r\n}\r\n.p-l-0{\r\n    padding-left:0px !important;\r\n}\r\n.p-l-10{\r\n    padding-left:10px !important;\r\n}\r\n.p-l-15{\r\n    padding-left: 15px !important;\r\n}\r\n.p-r-0{\r\n    padding-right: 0px !important;\r\n}\r\n.p-r-1{\r\n    padding-right: 1rem !important;\r\n}\r\n.p-r-10{\r\n    padding-right: 10px !important;\r\n}\r\n.p-r-20{\r\n    padding-right: 20px !important;\r\n}\r\n.p-b-0{\r\n    padding-bottom: 0px !important;\r\n}\r\n.p-b-5{\r\n    padding-bottom: 5px !important;\r\n}\r\n.p-t-10{\r\n    padding-top: 10px;\r\n}\r\n/*Padding Ends*/\r\n\r\n\r\n/*Margin*/\r\n.m-y-0{\r\n    margin-top:0px !important;\r\n    margin-bottom:0px !important;\r\n}\r\n.m-x-0{\r\n    margin-right:0px !important;\r\n    margin-left:0px !important;\r\n}\r\n.m-x-3{\r\n    margin-right:3px !important;\r\n    margin-left:3px !important;\r\n}\r\n.m-y-10{\r\n    margin-top:10px !important;\r\n    margin-bottom:10px !important;\r\n}\r\n.m-l-0{\r\n    margin-left: 0px !important;\r\n}\r\n.m-l-65{\r\n    margin-left: 50px;\r\n}\r\n.m-l-5{\r\n    margin-left: 5px;\r\n}\r\n.m-l-10{\r\n    margin-left: 10px !important;\r\n}\r\n.m-l-15{\r\n    margin-left: 15px !important;\r\n}\r\n.m-l-20{\r\n    margin-left: 20px;\r\n}\r\n.m-l-320{\r\n    margin-left: 320px !important;\r\n}\r\n.m-t-9{\r\n    margin-top: 9px !important;\r\n}\r\n.m-t-10{\r\n    margin-top: 10px !important;\r\n}\r\n.m-t-5{\r\n    margin-top: 5px ;\r\n}\r\n.m-t-15{\r\n    margin-top: 15px !important;\r\n}\r\n.m-b-0{\r\n    margin-bottom: 0px !important;\r\n}\r\n.m-b-10{\r\n    margin-bottom: 10px !important;\r\n}\r\n.m-r-5{\r\n    margin-right: 5px !important;\r\n}\r\n.m-r-15{\r\n    margin-right:15px;\r\n}\r\n/*Margin Ends*/\r\n\r\n/*Borders*/\r\n.b-1-lightgray{\r\n    border : 1px solid #dedede;\r\n}\r\n.b-1-lightergray{\r\n    border:1px solid #ddd !important;\r\n}\r\n.b-1-gray{\r\n    border:1px solid gray !important;\r\n}\r\n.b-r-1-lightergray{\r\n    border-right:1px solid #ddd !important;\r\n}\r\n.b-b-1-lightgray{\r\n    border-bottom:1px solid #ddd !important;\r\n}\r\n.b-1-warning{\r\n    border:1px solid #e76d3b !important;\r\n}\r\n.b-1-ssblue{\r\n    border:1px solid #4274B9 !important;\r\n}\r\n/*Borders Ends*/\r\n\r\n\r\n/*Background and text Color*/\r\n.bg-pagebg{\r\n    background-color: #f5f5f5;\r\n}\r\n.bg-black{\r\n    background-color: #000;\r\n}\r\n.bg-white{\r\n    background-color: #fff;\r\n}\r\n.bg-lightgray{\r\n    background-color: #dedede;\r\n}\r\n.bg-ssblue{\r\n    background-color: #4274B9 !important;\r\n}\r\n.bg-darkgray{\r\n    background-color: #6D6E71;\r\n}\r\n.bg-lightergray{\r\n    background-color: #ddd;\r\n}\r\n.bg-primary {\r\n    background-color: #337ab7 !important;\r\n}\r\n.bg-warning{\r\n    background-color:#e76d3b !important;\r\n}\r\n\r\n/* .bg-Qainprogress{\r\n\tbackground-color: #1D2D75;\r\n} */\r\n.bg-Submitted-to-EMR, .bg-Submitted\r\n {\r\n    background-color: #7AA242;\r\n}\r\n.bg-Submitted {\r\n     background-color: #7AA242;\r\n}\r\n.bg-New {\r\n    background-color: #2D96D0;\r\n}\r\n.bg-In-Progress, .bg-Pending{\r\n    background-color: #DE7528;\r\n}\r\n.bg-Assigned{\r\n    background-color: #2F4F4F;\r\n}\r\n/*.bg-Submitted-to-EMR, .bg-Submitted {\r\n    background-color:#7AA242;\r\n}*/\r\n.bg-Signed {\r\n    background-color: #75CAC2;\r\n}\r\n.bg-My-QA-Reviews, .bg-QA-Assigned, .bg-Qaassigned {\r\n\tbackground-color: #266de0;\r\n}\r\n.bg-My-QA-InProgress, .bg-QA-InProgress, .bg-Qainprogress {\r\n    background-color: #f46b42;\r\n}\r\n.bg-QA-UnAssigned, .bg-Qaunassigned {\r\n    background-color: #129977;\r\n}\r\n.bg-Reviewed {\r\n    background-color: darkgoldenrod;\r\n}\r\n.bg-Unspecified {\r\n    background-color: #cf8585;\r\n}\r\n.bg-Submitted-for-Attestation\r\n{\r\n    background-color: #a55a82;\r\n}\r\n.bg-examtype\r\n{\r\n\tbackground-color: #800000 !important;\r\n}\r\n.bg-Attested\r\n{\r\n    background-color: #8e956a;\r\n}\r\n/*.bg-pg-blue{\r\n    background-color: #2D96D9;\r\n}\r\n.bg-pg-orange{\r\n    background-color:#DE7528;\r\n}\r\n.bg-pg-green{\r\n    background-color: #7AA242;\r\n}\r\n.bg-pg-aquamarine{\r\n    background-color: #75CAC2;\r\n}*/\r\n.bg-gray{\r\n  background-color: gray;\r\n}\r\n.color-white{\r\n    color: #fff!important;\r\n}\r\n.color-black{\r\n    color: #333!important;\r\n}\r\n.color-new{\r\n    color: #2D96D9;\r\n}\r\n.color-assigned{\r\n    color: #2F4F4F;\r\n}\r\n.color-submitted-to-emr {\r\n    color:#7AA242;\r\n}\r\n.color-in-progress{\r\n    color: #DE7528;\r\n}\r\n.color-signed{\r\n    color: #75CAC2;\r\n}\r\n.color-my-qa-reviews, .color-qa-assigned, .color-QA-Assigned{\r\n    color: #1D2D75;\r\n}\r\n.color-my-qa-inprogress, .color-qa-inprogress{\r\n    color: #f46b42;\r\n}\r\n.color-qa-unassigned{\r\n    color: #129977;\r\n}\r\n.color-red{\r\n  color : #ff0000;\r\n}\r\n.color-gray{\r\n    color: gray;\r\n}\r\n.color-warning{\r\n    color:#e76d3b;\r\n}\r\n/*Background and text Color Ends*/\r\n\r\n\r\n@media screen and (max-width: 979px) and (min-width: 768px){\r\n.p-leftmenu {\r\n    padding : 10px 0px 10px 20px !important;\r\n}\r\n.p-resize.p-l-0, .p-resize.p-r-0{\r\n    padding-left: 0px ;\r\n    padding-right: 0px;\r\n}\r\n.tags-width {\r\n\t    width: 165px;\r\n}\r\n\r\n}\r\n@media screen and (max-width: 767px) and (min-width: 320px){\r\n\r\n.tags-width {\r\n\t    width: 165px;\r\n}\r\n/*BreadCrumb*/\r\n.daterange.pull-right, .btn-toolbar.pull-right{\r\n    float:left !important;\r\n    clear:left !important;\r\n}\r\n/*BreadCrumb Ends*/\r\n.m-l-65{\r\n    margin-left: 15px;\r\n}\r\n.mob-dropdown{\r\n    width:100%;\r\n    top:0px;\r\n    left:0px;\r\n    background-color: #333;\r\n    color:#fff;\r\n}\r\n.m-lmob-10{\r\n   margin-left: 10px;\r\n}\r\n.p-resize.p-l-0, .p-resize.p-r-0{\r\n    padding-left: 0px ;\r\n    padding-right: 0px;\r\n}\r\n.p-resize .col-xs-7.align-center{\r\n    padding-right:0px;\r\n    padding-left:0px;\r\n}\r\n.p-resize .col-xs-3.pull-right{\r\n    float:right;\r\n    clear:right;\r\n    padding-left:0px;\r\n}\r\n.dropdown-menu > li>a:hover, .dropdown-menu > li>a:focus{\r\n    background-color:#4e4e4e;\r\n    color:#fff;\r\n    box-shadow: 3px 0 0 0 #4274b9 inset;\r\n}\r\n.exp-leftnav li a,.exp-leftnav li a:hover, .exp-leftnav li a:focus, .exp-leftnav li a.active{\r\n    padding: 5px 0 0 15px;\r\n}\r\n.cf:before,\r\n.cf:after {\r\n    content: \" \"; /* 1 */\r\n    display: table; /* 2 */\r\n}\r\n.cf:after {\r\n    clear: both;\r\n}\r\n.cf {\r\n    *zoom: 1;\r\n    z-index:0;\r\n}\r\n\r\n}\r\n\r\n .avatar img{\r\n     border-radius: 50%;\r\n     width:40px;\r\n     height:40px;\r\n     margin-left:10px;\r\n }\r\n\r\n .loading img{\r\n     border-radius: 50%;\r\n     width:20px;\r\n     height:20px;\r\n     margin-left:10px;\r\n}\r\n\r\n.fontSize {\r\n\tfont-size: 12px;\r\n}\r\n\r\n\r\n .btn-leftmenu{\r\n     position: relative;\r\n     float: right;\r\n     padding: 9px 10px;\r\n     margin-top: 8px;\r\n     margin-right: 15px;\r\n     margin-bottom: 8px;\r\n     background-color: transparent;\r\n     background-image: none;\r\n     border: 1px solid transparent;\r\n     border-radius: 4px;\r\n }\r\n\r\n/* studylist.css starts*/\r\n/*Table*/\r\n.color\r\n{\r\n\tcolor:#804040!important;\r\n\tmargin-bottom:15px;\r\n}\r\n.btn-group #btnClearAll.btn-default:focus, .btn-group #btnClearAll.btn-default:hover, .btn-group #btnCreateUser.btn-default:focus, .btn-group #btnCreateUser.btn-default:hover{\r\n\tbackground-color:#fff !important;\r\n}\r\n.dataTables_filter {\r\nfloat: left !important;\r\n}\r\n.dataTables_filter input, .grid-search{\r\n    width:200px !important;\r\n\r\n    padding:3px;\r\n    border: 1px solid #adadad;\r\n    border-radius: 2px;\r\n}\r\n.dataTables_length{\r\n    float:left !important;\r\n    margin-right: 25px;\r\n    margin-top: 4px;\r\n}\r\n.dataTables_paginate{\r\n    float: right!important;\r\n}\r\ntable.dataTable tbody{\r\n    font-size:14px;\r\n}\r\ntable.dataTable thead th {\r\n    position: relative;\r\n    background-image: none !important;\r\n}\r\n\r\ntable.dataTable thead th.sorting:after,\r\ntable.dataTable thead th.sorting_asc:after,\r\ntable.dataTable thead th.sorting_desc:after {\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 8px;\r\n    display: block;\r\n    font-family: FontAwesome;\r\n}\r\ntable.dataTable thead th.sorting:after {\r\n    content: \"\\F0DC\";\r\n    color: #333;\r\n    font-size: 1em;\r\n}\r\ntable.dataTable thead th.sorting_asc:after {\r\n    content: \"\\F0DE\";\r\n}\r\ntable.dataTable thead th.sorting_desc:after {\r\n    content: \"\\F0DD\";\r\n}\r\ntable.dataTable tbody tr:hover{\r\n    background-color: #f5f5f5 !important;\r\n}\r\n\r\n/*Tag Column*/\r\n.pos-td{\r\n    position: relative;\r\n}\r\n.pos-badge{\r\n    position: Absolute;\r\n    right: 0px;\r\n    top: 3px;\r\n}\r\n.pos-grid-badge{\r\n    position: Absolute;\r\n    right: 60px;\r\n    top: 3px;\r\n}\r\n.badgecount{\r\n  padding: 2px 4px;\r\n  font-size:10px;\r\n  vertical-align: inherit;\r\n}\r\n.fol-merge-badge {\r\n    top: -24px;\r\n    left: -16px;\r\n    color: #fff;\r\n    background-color: #2D96D9;\r\n    border-radius: 50px;\r\n    padding: 1px 5px!important;\r\n}\r\n/*Tag Column Ends*/\r\n\r\n/*Accordion*/\r\n.slider{\r\n    display:none;\r\n}\r\n/*.shown{\r\n    display:none;\r\n}*/\r\n/*Accordion Ends*/\r\n\r\n/*Grid*/\r\n.isGrid tr{\r\n    float:left;\r\n    width:25%;\r\n}\r\n/*Grid Ends*/\r\n\r\n/*Table Ends*/\r\n\r\n\r\n .action{\r\n    border-radius:3px;\r\n}\r\n\r\n.action .btn{\r\n    border:0px !important;\r\n    padding:3px;\r\n}\r\n.action .btn:hover{\r\n    border:0px !important;\r\n    background-color: #f5f5f5;\r\n}\r\n.action .dropdown-menu {\r\n    right: 0px;\r\n    left: auto;\r\n    top: 31px;\r\n    right: 0px;\r\n    position: absolute;\r\n}\r\n.bg-Cardiac{\r\n    background-color: #4FC3F7 !important;\r\n}\r\n.bg-Thoracic{\r\n    background-color: #F57F17 !important;\r\n}\r\n.bg-MSK{\r\n     background-color: #F4511E !important;\r\n}\r\n.bg-Venous{\r\n     background-color: #D81B60 !important;\r\n}\r\n.bg-Ocular{\r\n     background-color: #9C27B0 !important;\r\n}\r\n.bg-Brain{\r\n     background-color: #388E3C !important;\r\n}\r\n.bg-Cardiac01{\r\n    background-color: #4FC3F7 !important;\r\n}\r\n\r\n.fa-border{\r\n\t/*margin-top: 50px;\r\n\tmargin-left:200px;\r\n\twidth: 100px;*/\r\n\theight:100px;\r\n    max-height: 100px;\r\n    overflow: auto;\r\n}\r\n.fa-close {\r\n  cursor: pointer;\r\n}\r\n\r\n.fa-borderbox{\r\n    border: 2px solid #a1a1a1;\r\n    background: transparent;\r\n    border-radius: 19px;\r\n}\r\n\r\n.tags-width {\r\n\t    width: 165px;\r\n}\r\n/*Studylist css Ends*/\r\n", ""]);

// exports


/***/ }),
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_module__ = __webpack_require__(262);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_module__["a"]; });
// App



/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__i18n_providers__ = __webpack_require__(310);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__i18n_providers__["a"]; });
// App



/***/ }),
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(369);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });

/*
 * Angular 2 decorators and services
 */



/*
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent(appState, translate) {
        this.appState = appState;
        this.userName = {};
        this.workflowPreference = {};
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('Initial App State', this.appState.state);
        this.loadUsername();
        this.loadPreference();
    };
    AppComponent.prototype.loadUsername = function () {
        var _this = this;
        this.appState.getUserName().subscribe(function (userNameData) {
            _this.userName = userNameData;
            console.log('UserName res:', userNameData);
        }, function (error) { return console.error(error); });
    };
    AppComponent.prototype.loadPreference = function () {
        var _this = this;
        this.appState.getPreference().subscribe(function (preference) {
            _this.workflowPreference = preference;
            console.log('Preference res', preference);
        }, function (error) { return console.error(error); });
    };
    return AppComponent;
}());
AppComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app',
        encapsulation: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewEncapsulation"].None,
        styles: [
            __webpack_require__(434),
            __webpack_require__(431),
            __webpack_require__(433),
            __webpack_require__(432),
            __webpack_require__(435)
        ],
        template: __webpack_require__(384)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppState */], __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["d" /* TranslateService */]])
], AppComponent);

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */


/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angularclass_hmr__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angularclass_hmr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__angularclass_hmr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_translate_ng2_translate__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_bs3_modal_ng2_bs3_modal__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_bs3_modal_ng2_bs3_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_bs3_modal_ng2_bs3_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_select_ng2_select__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_select_ng2_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ng2_select_ng2_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__environment__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_routes__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_resolver__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_endpoints__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_guard__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__dashboard__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__breadcrum_breadcrum_component__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__studylist__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__header_header_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__header_header_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__dashboard_graphical_detail_graphical_detail_component__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__dashboard_graphical_summary_graphical_summary_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__dashboard_dashboard_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__studylist_studylist_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__leftnav__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__imageviewer_imageviewer_component__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__imageviewer_imageviewer_details_viewer_details_component__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__imageviewer_viewerheader_viewerheader_component__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__imageviewer_patient_image_patient_image_component__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__imageviewer_imageViewer_thumbnail_imageViewer_thumbnail_component__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__imageviewer_imageviewer_details_patient_details_patient_details_component__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__imageviewer_imageviewer_details_study_details_study_details_component__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__imageviewer_imageviewer_details_tab_component__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__imageviewer_imageviewer_details_tabs_component__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__imageviewer_observations_observations_component__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__imageviewer_observations_observations_tab_component__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__imageviewer_observations_observations_tabs_component__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__imageviewer_observations_observations_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__imageviewer_observations_worksheet_worksheet_component__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__imageviewer_observations_worksheet_section_worksheet_section_component__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__imageviewer_observations_worksheet_section_examoverview_worksheet_section_examoverview_component__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__imageviewer_observations_worksheet_section_examapproval_worksheet_section_examapproval_component__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__imageviewer_observations_worksheet_section_savereset_worksheet_section_savereset_component__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__imageviewer_observations_worksheet_section_quality_assurance_worksheet_section_quality_assurance_component__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__imageviewer_observations_worksheet_section_quality_assurance_qa_topic_worksheet_qa_topic_component__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__imageviewer_observations_worksheet_section_quality_assurance_qa_topic_option_dropdown_worksheet_option_dropdown_component__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__imageviewer_observations_worksheet_section_quality_assurance_qa_topic_option_dropdown_accordion_worksheet_option_dropdown_accordion_component__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__imageviewer_observations_worksheet_section_quality_assurance_qa_topic_option_qa_text_worksheet_option_qa_text_component__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__imageviewer_observations_worksheet_section_topic_worksheet_topic_component__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__imageviewer_observations_worksheet_section_topic_option_text_worksheet_option_text_component__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__imageviewer_observations_worksheet_section_topic_option_text_number_worksheet_option_textnumber_component__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__imageviewer_observations_worksheet_section_topic_option_single_select_worksheet_option_singleselect_component__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__imageviewer_observations_worksheet_section_topic_option_multi_select_worksheet_option_multiselect_component__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__userlist_userlist_component__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__createuser_createuser_component__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__createuser_user_service__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__userlist_userlist_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__usergrouplist_usergrouplist_component__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__createusergroup_createusergroup_component__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__usergrouplist_usergrouplist_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__createusergroup_createusergroup_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__examtypelist_examtypelist_component__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__examtypelist_examtypelist_service__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__createexamtype_createexamtype_component__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__createexamtype_createexamtype_service__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__passwordconfiguration_passwordconfiguration_component__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__passwordconfiguration_passwordconfiguration_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__ldapconfiguration_ldapconfiguration_component__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__ldapconfiguration_ldapconfiguration_service__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__smtpconfiguration_smtpconfiguration_component__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__smtpconfiguration_smtpconfiguration_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__app_directive__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__app_rule__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__styles_style_scss__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__styles_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_76__styles_style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__rolelist_rolelist_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__rolelist_rolelist_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__createrole_createrole_component__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__createrole_createrole_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__imageviewer_observations_worksheet_section_tags_worksheet_section_tags_component__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__userpreference_userpreference_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__worksheetconfig_worksheetconfig_component__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84__breadcrum_breadcrum_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });











/*
 * Platform and Environment providers/directives/pipes
 */


// App is our top level component









































































// Application wide providers
var APP_PROVIDERS = __WEBPACK_IMPORTED_MODULE_14__app_resolver__["a" /* APP_RESOLVER_PROVIDERS */].concat([
    __WEBPACK_IMPORTED_MODULE_15__app_service__["a" /* AppState */],
    __WEBPACK_IMPORTED_MODULE_16__app_endpoints__["a" /* EndPoint */]
]);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appRef, appState) {
        this.appRef = appRef;
        this.appState = appState;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state)
            return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            var restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // save state
        var state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__angularclass_hmr__["createNewHosts"])(cmpLocation);
        // save input values
        store.restoreInputValues = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__angularclass_hmr__["createInputTransfer"])();
        // remove styles
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__angularclass_hmr__["removeNgStyles"])();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    return AppModule;
}());
AppModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        bootstrap: [__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */]],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_19__breadcrum_breadcrum_component__["a" /* BreadcrumComponent */],
            __WEBPACK_IMPORTED_MODULE_21__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_27__leftnav__["a" /* LeftNavComponent */],
            __WEBPACK_IMPORTED_MODULE_18__dashboard__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_23__dashboard_graphical_detail_graphical_detail_component__["a" /* GraphicalDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_24__dashboard_graphical_summary_graphical_summary_component__["a" /* GraphicalSummaryComponent */],
            __WEBPACK_IMPORTED_MODULE_20__studylist__["a" /* StudyListComponent */],
            __WEBPACK_IMPORTED_MODULE_29__imageviewer_imageviewer_details_viewer_details_component__["a" /* ViewerDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_30__imageviewer_viewerheader_viewerheader_component__["a" /* ViewerHeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_31__imageviewer_patient_image_patient_image_component__["a" /* PatientImageComponent */],
            __WEBPACK_IMPORTED_MODULE_32__imageviewer_imageViewer_thumbnail_imageViewer_thumbnail_component__["a" /* ImageViewerThumbnailComponent */],
            __WEBPACK_IMPORTED_MODULE_28__imageviewer_imageviewer_component__["a" /* ImageViewerComponent */],
            __WEBPACK_IMPORTED_MODULE_33__imageviewer_imageviewer_details_patient_details_patient_details_component__["a" /* PatientDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_34__imageviewer_imageviewer_details_study_details_study_details_component__["a" /* StudyDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_35__imageviewer_imageviewer_details_tab_component__["a" /* TabComponent */],
            __WEBPACK_IMPORTED_MODULE_36__imageviewer_imageviewer_details_tabs_component__["a" /* TabsComponent */],
            __WEBPACK_IMPORTED_MODULE_37__imageviewer_observations_observations_component__["a" /* Observations */],
            __WEBPACK_IMPORTED_MODULE_38__imageviewer_observations_observations_tab_component__["a" /* ObservationsTabComponent */],
            __WEBPACK_IMPORTED_MODULE_39__imageviewer_observations_observations_tabs_component__["a" /* ObservationsTabsComponent */],
            __WEBPACK_IMPORTED_MODULE_41__imageviewer_observations_worksheet_worksheet_component__["a" /* Worksheet */],
            __WEBPACK_IMPORTED_MODULE_42__imageviewer_observations_worksheet_section_worksheet_section_component__["a" /* WorksheetSection */],
            __WEBPACK_IMPORTED_MODULE_43__imageviewer_observations_worksheet_section_examoverview_worksheet_section_examoverview_component__["a" /* ExamOverviewSection */],
            __WEBPACK_IMPORTED_MODULE_44__imageviewer_observations_worksheet_section_examapproval_worksheet_section_examapproval_component__["a" /* ExamApprovalSection */],
            __WEBPACK_IMPORTED_MODULE_45__imageviewer_observations_worksheet_section_savereset_worksheet_section_savereset_component__["a" /* SaveResetSection */],
            __WEBPACK_IMPORTED_MODULE_46__imageviewer_observations_worksheet_section_quality_assurance_worksheet_section_quality_assurance_component__["a" /* QualityAssuranceSection */],
            __WEBPACK_IMPORTED_MODULE_47__imageviewer_observations_worksheet_section_quality_assurance_qa_topic_worksheet_qa_topic_component__["a" /* QaWorksheetTopic */],
            __WEBPACK_IMPORTED_MODULE_48__imageviewer_observations_worksheet_section_quality_assurance_qa_topic_option_dropdown_worksheet_option_dropdown_component__["a" /* OptionDropDown */],
            __WEBPACK_IMPORTED_MODULE_49__imageviewer_observations_worksheet_section_quality_assurance_qa_topic_option_dropdown_accordion_worksheet_option_dropdown_accordion_component__["a" /* OptionDropDownAccordion */],
            __WEBPACK_IMPORTED_MODULE_50__imageviewer_observations_worksheet_section_quality_assurance_qa_topic_option_qa_text_worksheet_option_qa_text_component__["a" /* OptionQaText */],
            __WEBPACK_IMPORTED_MODULE_51__imageviewer_observations_worksheet_section_topic_worksheet_topic_component__["a" /* WorksheetTopic */],
            __WEBPACK_IMPORTED_MODULE_54__imageviewer_observations_worksheet_section_topic_option_single_select_worksheet_option_singleselect_component__["a" /* OptionSingleSelect */],
            __WEBPACK_IMPORTED_MODULE_55__imageviewer_observations_worksheet_section_topic_option_multi_select_worksheet_option_multiselect_component__["a" /* OptionMultiSelect */],
            __WEBPACK_IMPORTED_MODULE_52__imageviewer_observations_worksheet_section_topic_option_text_worksheet_option_text_component__["a" /* OptionText */],
            __WEBPACK_IMPORTED_MODULE_53__imageviewer_observations_worksheet_section_topic_option_text_number_worksheet_option_textnumber_component__["a" /* OptionTextNumber */],
            __WEBPACK_IMPORTED_MODULE_56__userlist_userlist_component__["a" /* UserListComponent */],
            __WEBPACK_IMPORTED_MODULE_57__createuser_createuser_component__["a" /* CreateUserComponent */],
            __WEBPACK_IMPORTED_MODULE_60__usergrouplist_usergrouplist_component__["a" /* UserGroupListComponent */],
            __WEBPACK_IMPORTED_MODULE_61__createusergroup_createusergroup_component__["a" /* CreateUserGroupComponent */],
            __WEBPACK_IMPORTED_MODULE_64__examtypelist_examtypelist_component__["a" /* ExamTypeListComponent */],
            __WEBPACK_IMPORTED_MODULE_66__createexamtype_createexamtype_component__["a" /* CreateExamTypeComponent */],
            __WEBPACK_IMPORTED_MODULE_74__app_directive__["a" /* HideOnDirective */],
            __WEBPACK_IMPORTED_MODULE_74__app_directive__["b" /* DisableOnDirective */],
            __WEBPACK_IMPORTED_MODULE_74__app_directive__["c" /* EnableOnDirective */],
            __WEBPACK_IMPORTED_MODULE_74__app_directive__["d" /* InnerHtmlOnDirective */],
            __WEBPACK_IMPORTED_MODULE_74__app_directive__["e" /* UIRuleDirective */],
            __WEBPACK_IMPORTED_MODULE_82__userpreference_userpreference_component__["a" /* UserpreferenceComponent */],
            __WEBPACK_IMPORTED_MODULE_83__worksheetconfig_worksheetconfig_component__["a" /* WorksheetconfigComponent */],
            __WEBPACK_IMPORTED_MODULE_70__ldapconfiguration_ldapconfiguration_component__["a" /* LdapConfigurationComponent */],
            __WEBPACK_IMPORTED_MODULE_68__passwordconfiguration_passwordconfiguration_component__["a" /* PasswordConfigurationComponent */],
            __WEBPACK_IMPORTED_MODULE_72__smtpconfiguration_smtpconfiguration_component__["a" /* SmtpConfigurationComponent */],
            __WEBPACK_IMPORTED_MODULE_77__rolelist_rolelist_component__["a" /* RoleListComponent */],
            __WEBPACK_IMPORTED_MODULE_79__createrole_createrole_component__["a" /* CreateRoleComponent */],
            __WEBPACK_IMPORTED_MODULE_81__imageviewer_observations_worksheet_section_tags_worksheet_section_tags_component__["a" /* TagsSection */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["RouterModule"].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_routes__["a" /* ROUTES */], { useHash: true }),
            __WEBPACK_IMPORTED_MODULE_7_ng2_translate_ng2_translate__["a" /* TranslateModule */].forRoot({
                provide: __WEBPACK_IMPORTED_MODULE_7_ng2_translate_ng2_translate__["b" /* TranslateLoader */],
                useFactory: function (http) { return new __WEBPACK_IMPORTED_MODULE_7_ng2_translate_ng2_translate__["c" /* TranslateStaticLoader */](http, '/locale', '.json'); },
                deps: [__WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"]]
            }),
            __WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_9_ng2_bs3_modal_ng2_bs3_modal__["Ng2Bs3ModalModule"],
            __WEBPACK_IMPORTED_MODULE_10_ng2_select_ng2_select__["SelectModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_11__environment__["b" /* ENV_PROVIDERS */],
            APP_PROVIDERS,
            __WEBPACK_IMPORTED_MODULE_22__header_header_service__["a" /* HeaderService */],
            __WEBPACK_IMPORTED_MODULE_25__dashboard_dashboard_service__["a" /* DashboardService */],
            __WEBPACK_IMPORTED_MODULE_26__studylist_studylist_service__["a" /* StudylistService */],
            __WEBPACK_IMPORTED_MODULE_40__imageviewer_observations_observations_service__["a" /* ObservationsService */],
            __WEBPACK_IMPORTED_MODULE_59__userlist_userlist_service__["a" /* UserlistService */],
            __WEBPACK_IMPORTED_MODULE_17__app_guard__["a" /* ConfirmDeactivateGuard */],
            __WEBPACK_IMPORTED_MODULE_58__createuser_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_62__usergrouplist_usergrouplist_service__["a" /* UserGrouplistService */],
            __WEBPACK_IMPORTED_MODULE_63__createusergroup_createusergroup_service__["a" /* UserGroupService */],
            __WEBPACK_IMPORTED_MODULE_67__createexamtype_createexamtype_service__["a" /* CreateExamTypeService */],
            __WEBPACK_IMPORTED_MODULE_65__examtypelist_examtypelist_service__["a" /* ExamtypelistService */],
            __WEBPACK_IMPORTED_MODULE_71__ldapconfiguration_ldapconfiguration_service__["a" /* LdapConfigurationService */],
            __WEBPACK_IMPORTED_MODULE_75__app_rule__["a" /* RuleService */],
            __WEBPACK_IMPORTED_MODULE_78__rolelist_rolelist_service__["a" /* RoleListService */],
            __WEBPACK_IMPORTED_MODULE_80__createrole_createrole_service__["a" /* RoleService */],
            __WEBPACK_IMPORTED_MODULE_69__passwordconfiguration_passwordconfiguration_service__["a" /* PasswordConfigurationService */],
            __WEBPACK_IMPORTED_MODULE_73__smtpconfiguration_smtpconfiguration_service__["a" /* SmtpConfigurationService */],
            __WEBPACK_IMPORTED_MODULE_84__breadcrum_breadcrum_service__["a" /* BreadCrumService */],
            { provide: 'bearer', useValue: window['bearer'] }
        ]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_15__app_service__["a" /* AppState */]])
], AppModule);



/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashboard__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__studylist__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__imageviewer__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__userlist__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createuser__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_guard_ts__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_resolver__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__usergrouplist__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__createusergroup__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__examtypelist__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__createexamtype__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ldapconfiguration__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__passwordconfiguration__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__smtpconfiguration__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__rolelist_rolelist_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__createrole_createrole_component__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__userpreference_userpreference_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__worksheetconfig_worksheetconfig_component__ = __webpack_require__(85);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROUTES; });


















var ROUTES = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_0__dashboard__["a" /* DashboardComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'studylist', component: __WEBPACK_IMPORTED_MODULE_1__studylist__["a" /* StudyListComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    {
        path: 'imageviewer/:id',
        component: __WEBPACK_IMPORTED_MODULE_2__imageviewer__["a" /* ImageViewerComponent */],
        canDeactivate: [__WEBPACK_IMPORTED_MODULE_5__app_guard_ts__["a" /* ConfirmDeactivateGuard */]],
        resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] }
    },
    { path: 'userlist', component: __WEBPACK_IMPORTED_MODULE_3__userlist__["a" /* UserListComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'createuser/:formState', component: __WEBPACK_IMPORTED_MODULE_4__createuser__["a" /* CreateUserComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    {
        path: 'createuser/:formState/:id',
        component: __WEBPACK_IMPORTED_MODULE_4__createuser__["a" /* CreateUserComponent */],
        canDeactivate: [__WEBPACK_IMPORTED_MODULE_5__app_guard_ts__["a" /* ConfirmDeactivateGuard */]],
        resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] }
    },
    { path: 'usergrouplist', component: __WEBPACK_IMPORTED_MODULE_7__usergrouplist__["a" /* UserGroupListComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'createusergroup/:formState', component: __WEBPACK_IMPORTED_MODULE_8__createusergroup__["a" /* CreateUserGroupComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    {
        path: 'createusergroup/:formState/:id',
        component: __WEBPACK_IMPORTED_MODULE_8__createusergroup__["a" /* CreateUserGroupComponent */],
        canDeactivate: [__WEBPACK_IMPORTED_MODULE_5__app_guard_ts__["a" /* ConfirmDeactivateGuard */]],
        resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] }
    },
    { path: 'examtypelist', component: __WEBPACK_IMPORTED_MODULE_9__examtypelist__["a" /* ExamTypeListComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'createexamtype/:formState', component: __WEBPACK_IMPORTED_MODULE_10__createexamtype__["a" /* CreateExamTypeComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    {
        path: 'createexamtype/:formState/:id',
        component: __WEBPACK_IMPORTED_MODULE_10__createexamtype__["a" /* CreateExamTypeComponent */],
        resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] }
    },
    { path: 'ldapconfig', component: __WEBPACK_IMPORTED_MODULE_11__ldapconfiguration__["a" /* LdapConfigurationComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'passwordconfig', component: __WEBPACK_IMPORTED_MODULE_12__passwordconfiguration__["a" /* PasswordConfigurationComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'userpreference', component: __WEBPACK_IMPORTED_MODULE_16__userpreference_userpreference_component__["a" /* UserpreferenceComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'worksheetconfig', component: __WEBPACK_IMPORTED_MODULE_17__worksheetconfig_worksheetconfig_component__["a" /* WorksheetconfigComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'smtpconfig', component: __WEBPACK_IMPORTED_MODULE_13__smtpconfiguration__["a" /* SmtpConfigurationComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'rolelist', component: __WEBPACK_IMPORTED_MODULE_14__rolelist_rolelist_component__["a" /* RoleListComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'createrole/:formState', component: __WEBPACK_IMPORTED_MODULE_15__createrole_createrole_component__["a" /* CreateRoleComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } },
    { path: 'createrole/:formState/:id', component: __WEBPACK_IMPORTED_MODULE_15__createrole_createrole_component__["a" /* CreateRoleComponent */], resolve: { preference: __WEBPACK_IMPORTED_MODULE_6__app_resolver__["b" /* PreferenceResolver */] } }
];


/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__breadcrum_model__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__breadcrum_service__ = __webpack_require__(52);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumComponent; });






var BreadcrumComponent = (function () {
    function BreadcrumComponent(appState, breadCrumService) {
        this.appState = appState;
        this.breadCrumService = breadCrumService;
        this.initComplete = false;
        this.durationChange = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.preferenceValueObj = [];
    }
    BreadcrumComponent.prototype.ngOnChanges = function (changes) {
        console.log("BreadcrumComponent ngOnChanges", changes, this.defaultDuration);
        if (changes['defaultDuration']) {
            this.getLoginUserId();
        }
    };
    BreadcrumComponent.prototype.ngAfterViewInit = function () {
        if (!this.initComplete) {
            this.getLoginUserId();
        }
    };
    BreadcrumComponent.prototype.getLoginUserId = function () {
        var _this = this;
        console.log("inside the getLoginUserId method");
        this.appState.getUserName().subscribe(function (res) {
            _this.loginUserId = res.id;
            _this.getPreference(res.id);
        }, function (error) { return console.error(error); });
    };
    BreadcrumComponent.prototype.getPreference = function (userId) {
        var _this = this;
        console.log("inside the get preference");
        this.breadCrumService.getPreference(userId).subscribe(function (data) {
            _this.preferenceValueObj = data;
            var userPreferenceValue;
            data.forEach(function (value, index) {
                if (value.default) {
                    userPreferenceValue = value.name;
                }
            });
            _this.initDateRange(userPreferenceValue);
        }, function (error) { return console.error(error); });
    };
    BreadcrumComponent.prototype.initDateRange = function (userPreferenceValue) {
        var dateFormat = {};
        dateFormat['Past 24Hrs'] = __WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(24, 'hours');
        dateFormat['One Week'] = __WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(6, 'days');
        dateFormat['One Month'] = __WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(1, 'month');
        dateFormat['Six Months'] = __WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(6, 'month');
        dateFormat['One Year'] = __WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(1, 'year');
        var that = this;
        var start, end, label;
        console.log('defaultDuration', that.defaultDuration);
        if (that.defaultDuration && that.defaultDuration.start && that.defaultDuration.end && that.defaultDuration.label) {
            start = that.defaultDuration.start;
            end = that.defaultDuration.end;
            label = that.defaultDuration.label;
        }
        else if (userPreferenceValue) {
            start = dateFormat[userPreferenceValue];
            end = __WEBPACK_IMPORTED_MODULE_4_moment___default()();
            label = userPreferenceValue;
        }
        else {
            start = __WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(24, 'hours');
            end = __WEBPACK_IMPORTED_MODULE_4_moment___default()();
            label = userPreferenceValue;
        }
        function cb(start, end, label) {
            console.log('label', label);
            if (label == 'Custom Range') {
                $('#reportrange input').val(start.format('MMM DD,YYYY') + ' to ' + end.format('MMM DD,YYYY'));
            }
            else {
                $('#reportrange input').val(label);
            }
            that.durationChange.emit(new __WEBPACK_IMPORTED_MODULE_2__breadcrum_model__["a" /* Duration */](start, end, label));
        }
        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Past 24Hrs': [__WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(24, 'hours'), __WEBPACK_IMPORTED_MODULE_4_moment___default()()],
                'One Week': [__WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(6, 'days'), __WEBPACK_IMPORTED_MODULE_4_moment___default()()],
                'One Month': [__WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(1, 'month'), __WEBPACK_IMPORTED_MODULE_4_moment___default()()],
                'Six Months': [__WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(6, 'month'), __WEBPACK_IMPORTED_MODULE_4_moment___default()()],
                'One Year': [__WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(1, 'year'), __WEBPACK_IMPORTED_MODULE_4_moment___default()()]
            },
            applyClass: "applyBtn",
            cancelClass: "cancelBtn"
        }, cb);
        cb(start, end, label);
        that.initComplete = true;
    };
    BreadcrumComponent.prototype.updatePreference = function () {
        var daterange = $('#reportrange input').val();
        if (this.prevDaterange != daterange) {
            var that_1 = this;
            this.preferenceValueObj.forEach(function (value, index) {
                if (value.name == daterange) {
                    that_1.prevDaterange = daterange;
                    that_1.breadCrumService.updatePreference(that_1.loginUserId, value)
                        .subscribe(function (response) {
                        console.log("successfully updated");
                    }, function (error) { return console.error(error); });
                }
            });
        }
    };
    return BreadcrumComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], BreadcrumComponent.prototype, "title", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], BreadcrumComponent.prototype, "secondtitle", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], BreadcrumComponent.prototype, "icon", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], BreadcrumComponent.prototype, "durationChange", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], BreadcrumComponent.prototype, "defaultDuration", void 0);
BreadcrumComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({ selector: 'breadcrum', template: __webpack_require__(385), styles: [__webpack_require__(436)] }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppState */], __WEBPACK_IMPORTED_MODULE_5__breadcrum_service__["a" /* BreadCrumService */]])
], BreadcrumComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Duration; });
var Duration = (function () {
    function Duration(start, end, label) {
        this.start = start;
        this.end = end;
        this.label = label;
    }
    return Duration;
}());



/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CptCode; });
var CptCode = (function () {
    function CptCode(id, text) {
        this.id = id;
        this.text = text;
    }
    return CptCode;
}());



/***/ }),
/* 267 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createexamtype_component__ = __webpack_require__(53);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__createexamtype_component__["a"]; });



/***/ }),
/* 268 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Name; });
var Name = (function () {
    function Name(id, text) {
        this.id = id;
        this.text = text;
    }
    return Name;
}());



/***/ }),
/* 269 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createuser_component__ = __webpack_require__(57);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__createuser_component__["a"]; });



/***/ }),
/* 270 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createusergroup_component__ = __webpack_require__(59);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__createusergroup_component__["a"]; });



/***/ }),
/* 271 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });




var DashboardComponent = (function () {
    function DashboardComponent(dashboardService, appState) {
        this.dashboardService = dashboardService;
        this.appState = appState;
        this.graphicalSummaryData = {};
        this.graphicalDetailData = {
            result: {
                examtype: [],
                series: [{
                        label: "",
                        data: []
                    }]
            }
        };
    }
    DashboardComponent.prototype.loadAllWidgets = function () {
        this.loadSummaryWidgets();
        this.loadDetailWidget();
    };
    DashboardComponent.prototype.loadSummaryWidgets = function () {
        var _this = this;
        var widgetList = this.appState.get('preference.widgets');
        this.selectedWidgetId = widgetList ? widgetList[0] : null;
        this.dashboardService.getWidgets(widgetList, this.selectedDuration).subscribe(function (widgetsData) {
            _this.graphicalSummaryData = widgetsData;
            console.log('loadSummaryWidgets res:', widgetsData);
        }, function (error) { return console.error(error); });
    };
    DashboardComponent.prototype.loadDetailWidget = function () {
        var _this = this;
        this.dashboardService.getWidgetDetails(this.selectedWidgetId, this.selectedDuration).subscribe(function (widgetsDetailData) {
            console.log("widgetsDetailDatawidgetsDetailData", widgetsDetailData);
            for (var len = 0; len < widgetsDetailData.result.series.length; len++) {
                widgetsDetailData.result.series[len].label = widgetsDetailData.result.series[len].status;
                delete widgetsDetailData.result.series[len].status;
            }
            _this.graphicalDetailData = widgetsDetailData;
            console.log('loadDetailWidget res:', widgetsDetailData);
        }, function (error) { return console.error(error); });
    };
    DashboardComponent.prototype.onDurationChange = function (event) {
        console.log("onDurationChange", event);
        this.selectedDuration = event;
        this.loadAllWidgets();
    };
    DashboardComponent.prototype.onWidgetSelection = function (event) {
        console.log('onWidgetSelection', event);
        this.selectedWidgetId = event.id;
        this.loadDetailWidget();
    };
    return DashboardComponent;
}());
DashboardComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'dashboard',
        template: __webpack_require__(390),
        styles: [__webpack_require__(438)], encapsulation: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewEncapsulation"].None
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__dashboard_service__["a" /* DashboardService */], __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppState */]])
], DashboardComponent);



/***/ }),
/* 272 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphicalDetailComponent; });


var GraphicalDetailComponent = (function () {
    function GraphicalDetailComponent() {
        this.colorMapping = { "New": "#2D96D9", "Assigned": "#2F4F4F", "In-Progress": "#DE7528", "Signed": "#75CAC2", "Submitted-to-EMR": "#7AA242", "Submitted-for-Attestation": "#a55a82", "Attested": "#8e956a", "My-QA-Reviews": "#266de0", "QA-Assigned": "#266de0", "My-QA-InProgress": "#f46b42", "QA-InProgress": "#f46b42", "QA-UnAssigned": "#129977" };
        this.colors = [];
        this.legend = false;
        this.options = {
            scales: {
                xAxes: [{
                        stacked: true
                    }],
                yAxes: [{
                        stacked: true,
                        ticks: {
                            /*min:0,
                            max:100,
                            stepSize:20*/
                            beginAtZero: true
                        }
                    }]
            }
        };
    }
    // events
    GraphicalDetailComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    GraphicalDetailComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    GraphicalDetailComponent.prototype.ngOnChanges = function () {
        var that = this;
        var widgetColors = [];
        if (this.datasets.length == 0) {
            this.datasets = [
                {
                    data: [0]
                }
            ];
        }
        for (var _i = 0, _a = this.datasets; _i < _a.length; _i++) {
            var barcolor = _a[_i];
            var status = barcolor.label;
            widgetColors.push({ 'backgroundColor': this.colorMapping[status] });
        }
        this.colors = widgetColors;
        console.log("colors are", this.colors);
    };
    return GraphicalDetailComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], GraphicalDetailComponent.prototype, "labels", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], GraphicalDetailComponent.prototype, "datasets", void 0);
GraphicalDetailComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'graphical-detail',
        template: __webpack_require__(391),
        styles: [__webpack_require__(439)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [])
], GraphicalDetailComponent);



/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphicalSummaryComponent; });


var GraphicalSummaryComponent = (function () {
    function GraphicalSummaryComponent() {
        this.widgetSelected = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.colorMapping = { "New": "#2D96D9", "Assigned": "#2F4F4F", "In-Progress": "#DE7528", "Signed": "#75CAC2", "Submitted-to-EMR": "#7AA242", "Submitted-for-Attestation": "#a55a82", "Attested": "#8e956a", "My-QA-Reviews": "#266de0", "QA-Assigned": "#266de0", "My-QA-InProgress": "#f46b42", "QA-InProgress": "#f46b42", "QA-UnAssigned": "#129977" };
        this.colors = [{ backgroundColor: [] }];
    }
    // events
    GraphicalSummaryComponent.prototype.chartClicked = function (e) {
        this.widgetSelected.emit({
            id: this.data["id"]
        });
    };
    GraphicalSummaryComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    GraphicalSummaryComponent.prototype.ngOnChanges = function () {
        var that = this;
        setTimeout(function () {
            that.resizeWidgets();
        }, 0);
        var widgetColors = [];
        for (var index in this.data.status) {
            var status = this.data.status[index];
            widgetColors.push(this.colorMapping[status]);
        }
        this.colors[0].backgroundColor = widgetColors;
    };
    GraphicalSummaryComponent.prototype.resizeWidgets = function () {
        $('.graphical-summary').each(function () {
            var max = -1;
            $(this).find('.legends').each(function () {
                var h = $(this).height();
                max = h > max ? h : max;
            });
            $(this).find('.legends').css({ "height": max });
        });
        $('.graphical-summary').each(function () {
            var max = -1;
            $(this).find('.panel-heading row').each(function () {
                var h = $(this).height();
                max = h > max ? h : max;
            });
            $(this).find('.panel-heading row').css({ "height": max });
        });
        $('.graphical-summary').each(function () {
            var max = -1;
            $(this).find('.panel-footer row').each(function () {
                var h = $(this).height();
                max = h > max ? h : max;
            });
            $(this).find('.panel-footer row').css({ "height": max });
        });
    };
    return GraphicalSummaryComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], GraphicalSummaryComponent.prototype, "data", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], GraphicalSummaryComponent.prototype, "selectedDuration", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], GraphicalSummaryComponent.prototype, "widgetSelected", void 0);
GraphicalSummaryComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'graphical-summary',
        template: __webpack_require__(392),
        styles: ['.chart {display: block}']
    })
], GraphicalSummaryComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__examtypelist_component__ = __webpack_require__(62);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__examtypelist_component__["a"]; });



/***/ }),
/* 275 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__header_service__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });





var HeaderComponent = (function () {
    function HeaderComponent(appState, headerservice, bearer) {
        var _this = this;
        this.appState = appState;
        this.headerservice = headerservice;
        this.alert = [];
        this.alertId = [];
        this.newarrayname = [];
        this.updateAlert = {};
        this.personalTagsList = [];
        this.bearer = bearer;
        __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].interval(10000).subscribe(function (x) {
            _this.getAlertOnLoad();
        });
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appState.getldapConfigStatus().subscribe(function (res) {
            _this.ldapConfigEnabled = res.ldapConfigEnabled;
            console.log("ldapConfigEnabled in header", _this.ldapConfigEnabled);
        });
        this.appState.getUserName().subscribe(function (res) {
            _this.loginUserId = res.id;
            _this.getAlertOnLoad();
        });
    };
    HeaderComponent.prototype.getAlertOnLoad = function () {
        var _this = this;
        this.headerservice.getAlert(this.loginUserId).subscribe(function (res) {
            _this.unreadAlertCount = res.unreadAlertsCount;
            _this.alert = res.results;
            console.log("Res of GetAlert", _this.alert);
        });
    };
    HeaderComponent.prototype.updateAlertStatus = function (alertid, currentStatus) {
        var _this = this;
        this.newarrayname = [];
        this.alert.filter(function (element) {
            if (currentStatus == "UNREAD") {
                _this.changedStatus = "READ";
            }
            else {
                _this.changedStatus = "UNREAD";
            }
            if (alertid.length > 1) {
                _this.alertId.filter(function (elementid) {
                    if (element.alertId == elementid) {
                        _this.newarrayname.push(element.alertId);
                        _this.updateAlert.orgId = element.orgId;
                    }
                    _this.updateAlert.id = _this.newarrayname;
                });
            }
            else {
                if (element.alertId == alertid) {
                    _this.newarrayname.push(element.alertId);
                    _this.updateAlert.orgId = element.orgId;
                }
                _this.updateAlert.id = _this.newarrayname;
            }
            _this.updateAlert.status = _this.changedStatus;
            _this.updateAlert.dataXUser = element.datax_receiver;
        });
        console.log("On update", this.updateAlert);
        this.headerservice.updateAlertStatus(this.updateAlert).subscribe(function (res) {
            _this.getAlertOnLoad();
        });
    };
    HeaderComponent.prototype.updateStatus = function () {
        this.alertId = [];
        for (var i = 0; i < this.alert.length; i++) {
            if (this.alert[i].status == "UNREAD") {
                this.alertId[i] = this.alert[i].alertId;
            }
        }
        console.log("List of alert id", this.alertId);
        this.updateAlertStatus(this.alertId, "UNREAD");
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        var that = this;
        $('.dropdown-menu').on('click', function (e) {
            e.stopPropagation();
        });
        /*Header Alert Menu */
        $("body").click(function () {
            if ($("#alertLi").hasClass("open")) {
                that.updateStatus();
            }
        });
        /* Header Alert Menu Ends*/
        /* Search  */
        $("#search_bar").click(function () {
            $("#search_bar").hide();
            $("#search_close").show();
            $(".search_box").toggle();
        });
        $("#search_close").click(function () {
            $("#search_close").hide();
            $("#search_bar").show();
            $(".search_box").toggle();
        });
        /* Search Ends */
        /* Mast Head User Dropdown */
        $(".user-dropdown").click(function () {
            $(".user-dropdown ul.dropdown-menu").toggle();
        });
        $('#overlaymenu').click(function () {
            $('ul.mob-dropdown').toggle();
        });
        $('.userDropDownMobile').click(function () {
            $('.userDropDownMobileOptions').slideToggle();
        });
        /* Mast Head User Dropdown Ends */
        $("#logout").click(function () {
            $.ajax({
                method: "GET",
                url: "/auth/logout",
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    window.location.href = 'login.html';
                }
            });
        });
        $("#changePassword").click(function () {
            window.location.href = 'changePassword.html';
        });
    };
    return HeaderComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], HeaderComponent.prototype, "name", void 0);
HeaderComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'header',
        template: __webpack_require__(394),
        styles: [__webpack_require__(440)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __param */](2, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"])('bearer')),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */],
        __WEBPACK_IMPORTED_MODULE_3__header_service__["a" /* HeaderService */], String])
], HeaderComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 276 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageViewerThumbnailComponent; });


var ImageViewerThumbnailComponent = (function () {
    function ImageViewerThumbnailComponent() {
    }
    return ImageViewerThumbnailComponent;
}());
ImageViewerThumbnailComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'imageViewer-thumbnail',
        template: __webpack_require__(395)
    })
], ImageViewerThumbnailComponent);



/***/ }),
/* 277 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientDetailsComponent; });


var PatientDetailsComponent = (function () {
    function PatientDetailsComponent() {
    }
    return PatientDetailsComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], PatientDetailsComponent.prototype, "patientDetails", void 0);
PatientDetailsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'patient-details',
        template: __webpack_require__(396)
    })
], PatientDetailsComponent);



/***/ }),
/* 278 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudyDetailsComponent; });


var StudyDetailsComponent = (function () {
    function StudyDetailsComponent() {
    }
    return StudyDetailsComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], StudyDetailsComponent.prototype, "patientDetails", void 0);
StudyDetailsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'study-details',
        template: __webpack_require__(397),
    })
], StudyDetailsComponent);



/***/ }),
/* 279 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tab_component__ = __webpack_require__(65);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsComponent; });



var TabsComponent = (function () {
    function TabsComponent() {
    }
    TabsComponent.prototype.ngAfterContentInit = function () {
        //get active tabs
        var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        //Default visible tab
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    TabsComponent.prototype.selectTab = function (tab) {
        //deactivate tabs
        this.tabs.toArray().forEach(function (tab) { return tab.active = false; });
        //when user clicks the tab is visbile
        tab.active = true;
    };
    return TabsComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_2__tab_component__["a" /* TabComponent */]),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["QueryList"])
], TabsComponent.prototype, "tabs", void 0);
TabsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'tabs',
        template: "\n    <ul class=\"nav nav-tabs\">\n      <li class=\"details-tab\" *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\" [class.active]=\"tab.active\">\n        <a href=\"javascript:void(0)\" class=\"color-white\"><i class=\"{{tab.icon}}\"></i></a>\n      </li>\n    </ul>\n    <ng-content></ng-content>\n  "
    })
], TabsComponent);



/***/ }),
/* 280 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewerDetailsComponent; });


var ViewerDetailsComponent = (function () {
    function ViewerDetailsComponent() {
    }
    return ViewerDetailsComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], ViewerDetailsComponent.prototype, "patientDetails", void 0);
ViewerDetailsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'imageviewer-details',
        template: __webpack_require__(398)
    })
], ViewerDetailsComponent);



/***/ }),
/* 281 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__imageviewer_component__ = __webpack_require__(66);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__imageviewer_component__["a"]; });



/***/ }),
/* 282 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__observations_tab_component__ = __webpack_require__(67);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservationsTabsComponent; });



var ObservationsTabsComponent = (function () {
    function ObservationsTabsComponent() {
    }
    ObservationsTabsComponent.prototype.ngAfterContentInit = function () {
        //get active tabs
        var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        //Default visible tab
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    ObservationsTabsComponent.prototype.selectTab = function (tab) {
        //deactivate tabs
        this.tabs.toArray().forEach(function (tab) { return tab.active = false; });
        //when user clicks the tab is visbile
        tab.active = true;
    };
    return ObservationsTabsComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_2__observations_tab_component__["a" /* ObservationsTabComponent */]),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["QueryList"])
], ObservationsTabsComponent.prototype, "tabs", void 0);
ObservationsTabsComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'observations-tabs',
        template: "\n    <ul class=\"m-t-10 nav nav-tabs\">\n      <li class=\"observations-details-tab\" *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\" [class.active]=\"tab.active\">\n        <a href=\"javascript:void(0)\">{{tab.title}}</a>\n      </li>\n    </ul>\n    <ng-content></ng-content>\n  "
    })
], ObservationsTabsComponent);



/***/ }),
/* 283 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(moment, $) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__worksheet_section_examapproval_model__ = __webpack_require__(284);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamApprovalSection; });




var ExamApprovalSection = (function () {
    function ExamApprovalSection(appState) {
        this.appState = appState;
        this.sdata = {};
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    ExamApprovalSection.prototype.ngOnInit = function () {
        console.log("----------", this.status[0]);
        this.initModel();
    };
    ExamApprovalSection.prototype.initModel = function () {
        if (!this.sdata) {
            this.sdata = {};
        }
        if (!this.sdata['poc']) {
            this.sdata['poc'] = {};
        }
        this.sdata['poc'].signed = this.sdata['poc'].sign ? true : false;
        if (!this.sdata['attending']) {
            this.sdata['attending'] = {};
        }
        this.sdata['attending'].signed = this.sdata['attending'].sign ? true : false;
    };
    ExamApprovalSection.prototype.ngOnChanges = function (changes) {
        console.log('ExamApprovalSection ngOnChanges', changes);
        if (changes['sdata']) {
            this.initModel();
        }
    };
    ExamApprovalSection.prototype.onChange = function (type, value) {
        this.sdata[type].signed = value;
        console.log("value", value);
        if (value) {
            this.sdata[type].sign = this.appState.get("userName");
            this.sdata[type].timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
            this.publishSign(type);
        }
        else {
            delete this.sdata[type].sign;
            delete this.sdata[type].timestamp;
            this.publishUnsign(type);
        }
    };
    ExamApprovalSection.prototype.publishSign = function (type) {
        this.onUpdate.emit(new __WEBPACK_IMPORTED_MODULE_3__worksheet_section_examapproval_model__["a" /* WorksheetSectionData */]('SIGN', type, this.sdata[type].sign, this.sdata[type].timestamp));
    };
    ExamApprovalSection.prototype.publishUnsign = function (type) {
        this.onUpdate.emit({
            instruction: 'UNSIGN',
            type: type
        });
    };
    ExamApprovalSection.prototype.onSave = function () {
        this.onUpdate.emit({
            instruction: "SAVE",
            wrkshttype: "Procedural"
        });
    };
    ExamApprovalSection.prototype.onCancel = function () {
        this.onUpdate.emit({
            instruction: "CANCEL"
        });
    };
    ExamApprovalSection.prototype.onReset = function () {
        this.onUpdate.emit({
            instruction: "RESET"
        });
    };
    ExamApprovalSection.prototype.ngAfterViewInit = function () {
        var id = this.id;
        $('#' + this.id).click(function () {
            var currentPanel = $(this).next('.wrkshtpanelbody');
            $('.wrkshtpanelbody').each(function () {
                if ($(this).attr('id') != "panel-" + id) {
                    $(this).slideUp();
                }
            });
            currentPanel.slideToggle();
        });
    };
    return ExamApprovalSection;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], ExamApprovalSection.prototype, "sdata", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], ExamApprovalSection.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], ExamApprovalSection.prototype, "disableWorksheet", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], ExamApprovalSection.prototype, "disableExamApproval", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], ExamApprovalSection.prototype, "studyId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], ExamApprovalSection.prototype, "examType", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], ExamApprovalSection.prototype, "selectedExamTypeId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], ExamApprovalSection.prototype, "onUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], ExamApprovalSection.prototype, "status", void 0);
ExamApprovalSection = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'exam-approval',
        template: __webpack_require__(401),
        styles: []
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */]])
], ExamApprovalSection);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1), __webpack_require__(7)))

/***/ }),
/* 284 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorksheetSectionData; });
var WorksheetSectionData = (function () {
    function WorksheetSectionData(instruction, type, sign, timestamp, qaId) {
        this.instruction = instruction;
        this.type = type;
        this.sign = sign;
        this.timestamp = timestamp;
        this.qaId = qaId;
    }
    return WorksheetSectionData;
}());



/***/ }),
/* 285 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__worksheet_model__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExamOverviewSection; });



var ExamOverviewSection = (function () {
    function ExamOverviewSection() {
        this.data = {};
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.types = ['Diagnostic', 'Educational', 'Procedural'];
        this.categories = ['Resuscitative', 'Symptom based', 'Procedural', 'Unknown/ other'];
        this.exam = ['Initial exam', 'Repeat exam'];
    }
    ExamOverviewSection.prototype.ngOnInit = function () {
        this.initModel();
    };
    ExamOverviewSection.prototype.initModel = function () {
        if (!this.data) {
            this.data = {};
        }
    };
    ExamOverviewSection.prototype.ngOnChanges = function (changes) {
        console.log("ExamOverviewSection ngOnChanges", changes);
        if (changes['data'])
            this.initModel();
    };
    ExamOverviewSection.prototype.onChange = function (value, id) {
        this.data[id] = value;
        this.publishChange();
    };
    ExamOverviewSection.prototype.publishChange = function () {
        this.onUpdate.emit(new __WEBPACK_IMPORTED_MODULE_2__worksheet_model__["a" /* WorksheetData */](this.id, this.data));
    };
    ExamOverviewSection.prototype.ngAfterViewInit = function () {
        var id = this.id;
        $('#' + this.id).click(function () {
            var currentPanel = $(this).next('.wrkshtpanelbody');
            $('.wrkshtpanelbody').each(function () {
                if ($(this).attr('id') != "panel-" + id) {
                    $(this).slideUp();
                }
            });
            currentPanel.slideToggle();
        });
    };
    return ExamOverviewSection;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], ExamOverviewSection.prototype, "data", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], ExamOverviewSection.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], ExamOverviewSection.prototype, "onUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], ExamOverviewSection.prototype, "qasign", void 0);
ExamOverviewSection = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'exam-overview',
        template: __webpack_require__(402),
        styles: []
    })
], ExamOverviewSection);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 286 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__worksheet_model__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionDropDownAccordion; });



var OptionDropDownAccordion = (function () {
    function OptionDropDownAccordion() {
        this.qaOptions = [];
        this.onQAUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    OptionDropDownAccordion.prototype.ngOnInit = function () {
        this.initModel();
        if (!this.qaColumnLayout) {
            this.qaColumnLayout = 2;
        }
    };
    OptionDropDownAccordion.prototype.initModel = function () {
        if (!this.qaData) {
            this.qaData = {};
        }
    };
    OptionDropDownAccordion.prototype.ngOnChanges = function (changes) {
        if (changes['qaData'])
            this.initModel();
    };
    OptionDropDownAccordion.prototype.onQAChange = function (qaValue, qaId) {
        this.qaData[qaId] = qaValue;
        console.log("qqqqqqqqqqq", this.qaData[qaId]);
        this.publishQAChange();
    };
    OptionDropDownAccordion.prototype.publishQAChange = function () {
        console.log("inside publish method");
        this.onQAUpdate.emit(new __WEBPACK_IMPORTED_MODULE_2__worksheet_model__["b" /* QAWorksheetData */](this.qaId, this.qaData));
    };
    return OptionDropDownAccordion;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionDropDownAccordion.prototype, "qaId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], OptionDropDownAccordion.prototype, "qaData", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionDropDownAccordion.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], OptionDropDownAccordion.prototype, "qaOptions", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Number)
], OptionDropDownAccordion.prototype, "qaColumnLayout", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionDropDownAccordion.prototype, "workflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], OptionDropDownAccordion.prototype, "status", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionDropDownAccordion.prototype, "disableQAWorksheet", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], OptionDropDownAccordion.prototype, "onQAUpdate", void 0);
OptionDropDownAccordion = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'option-dropdown-accordion',
        template: __webpack_require__(403),
        styles: []
    })
], OptionDropDownAccordion);



/***/ }),
/* 287 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__worksheet_model__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionDropDown; });



var OptionDropDown = (function () {
    function OptionDropDown() {
        this.qaOptions = [];
        this.onQAUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    OptionDropDown.prototype.ngOnInit = function () {
        this.initModel();
        if (!this.qaColumnLayout) {
            this.qaColumnLayout = 2;
        }
    };
    OptionDropDown.prototype.initModel = function () {
        if (!this.qaData) {
            this.qaData = {};
        }
    };
    OptionDropDown.prototype.ngOnChanges = function (changes) {
        if (changes['qaData'])
            this.initModel();
    };
    OptionDropDown.prototype.onQAChange = function (qaValue, qaId) {
        this.qaData[qaId] = qaValue;
        console.log("drop down value for QA", qaValue);
        this.publishQAChange();
    };
    OptionDropDown.prototype.publishQAChange = function () {
        this.onQAUpdate.emit(new __WEBPACK_IMPORTED_MODULE_2__worksheet_model__["b" /* QAWorksheetData */](this.qaId, this.qaData));
    };
    return OptionDropDown;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionDropDown.prototype, "qaId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionDropDown.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], OptionDropDown.prototype, "qaData", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], OptionDropDown.prototype, "qaOptions", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Number)
], OptionDropDown.prototype, "qaColumnLayout", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionDropDown.prototype, "workflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], OptionDropDown.prototype, "status", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], OptionDropDown.prototype, "onQAUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionDropDown.prototype, "disableQAWorksheet", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionDropDown.prototype, "qasign", void 0);
OptionDropDown = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'option-dropdown',
        template: __webpack_require__(404),
        styles: []
    })
], OptionDropDown);



/***/ }),
/* 288 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionQaText; });


var OptionQaText = (function () {
    function OptionQaText() {
        this.onQAUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    OptionQaText.prototype.onQAChange = function (qaValue) {
        console.log("GGGGGGGGGG", qaValue);
        this.qaData = qaValue;
        this.publishQAChange();
    };
    OptionQaText.prototype.publishQAChange = function () {
        this.onQAUpdate.emit({
            qaId: 'qaValue',
            qaData: this.qaData
        });
    };
    return OptionQaText;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionQaText.prototype, "qaLabel", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionQaText.prototype, "qaId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionQaText.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], OptionQaText.prototype, "qaData", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionQaText.prototype, "workflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionQaText.prototype, "disableQAWorksheet", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], OptionQaText.prototype, "onQAUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionQaText.prototype, "qasign", void 0);
OptionQaText = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'option-qa-text',
        template: __webpack_require__(405),
        styles: []
    })
], OptionQaText);



/***/ }),
/* 289 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__worksheet_model__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QaWorksheetTopic; });



var QaWorksheetTopic = (function () {
    function QaWorksheetTopic() {
        this.qaData = {};
        this.qaOptions = [];
        this.onQAUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    QaWorksheetTopic.prototype.ngOnInit = function () {
        this.initModel();
    };
    QaWorksheetTopic.prototype.initModel = function () {
        if (!this.qaData) {
            this.qaData = {};
        }
    };
    QaWorksheetTopic.prototype.ngOnChanges = function (changes) {
        if (changes['qaData'])
            this.initModel();
    };
    QaWorksheetTopic.prototype.onQAChildChange = function (event) {
        console.log("TOPIC QA DATA", event);
        this.qaData[event.qaId] = event.qaData;
        this.publishQAChange();
    };
    QaWorksheetTopic.prototype.publishQAChange = function () {
        console.log("topic emit", this.qaId);
        this.onQAUpdate.emit(new __WEBPACK_IMPORTED_MODULE_2__worksheet_model__["b" /* QAWorksheetData */](this.qaId, this.qaData));
    };
    return QaWorksheetTopic;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], QaWorksheetTopic.prototype, "qaData", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], QaWorksheetTopic.prototype, "qaId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], QaWorksheetTopic.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], QaWorksheetTopic.prototype, "qaName", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QaWorksheetTopic.prototype, "qaRequired", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], QaWorksheetTopic.prototype, "qaType", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Number)
], QaWorksheetTopic.prototype, "qaColumnLayout", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], QaWorksheetTopic.prototype, "qaOptions", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], QaWorksheetTopic.prototype, "onQAUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QaWorksheetTopic.prototype, "workflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QaWorksheetTopic.prototype, "disableQAWorksheet", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QaWorksheetTopic.prototype, "qasign", void 0);
QaWorksheetTopic = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'worksheet-qa-topic',
        template: __webpack_require__(406),
        styles: []
    })
], QaWorksheetTopic);



/***/ }),
/* 290 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, moment) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__observations_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QualityAssuranceSection; });





var QualityAssuranceSection = (function () {
    function QualityAssuranceSection(observationService, appState) {
        var _this = this;
        this.observationService = observationService;
        this.appState = appState;
        this.qaWorksheets = [];
        this.sqaData = {};
        this.sdata = {};
        this.qaData = {};
        this.autoSave = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Subject"]();
        this.onQAUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
        if (this.attendingWorkflowStatus == 'Y' || this.attendingWorkflowStatus == 'y') {
            this.attendingWorkflowStatus = true;
        }
        this.autoSave.bufferTime(5000)
            .subscribe(function (val) {
            if (val.length) {
                _this.saveQAWorksheet().subscribe(function (res) {
                    // display auto save complete message
                }, function (err) {
                });
            }
        });
    }
    QualityAssuranceSection.prototype.ngOnInit = function () {
        this.initModel();
    };
    QualityAssuranceSection.prototype.initQaWorksheet = function () {
        this.loadQaWorksheetList();
        this.loadQaWorksheet();
    };
    QualityAssuranceSection.prototype.initModel = function () {
        if (!this.qaData) {
            this.qaData = {};
        }
        if (!this.sqaData) {
            this.sqaData = {};
        }
        if (!this.sqaData['qa']) {
            this.sqaData['qa'] = {};
        }
        console.log("sqaData ... 1", this.sqaData['qa']);
    };
    QualityAssuranceSection.prototype.ngOnChanges = function (changes) {
        this.initQaWorksheet();
        if (changes['qaData']) {
            this.initModel();
        }
        if (changes['sqaData']) {
            this.initModel();
            console.log("dddd", this.sqaData);
        }
    };
    QualityAssuranceSection.prototype.onQAChildChange = function (event) {
        console.log("SECTION QA DATA", event);
        this.qaData[event.qaId] = event.qaData;
        this.autoSave.next();
    };
    QualityAssuranceSection.prototype.onChildChange = function (event) {
        this.publishChange();
    };
    QualityAssuranceSection.prototype.publishChange = function () {
        this.onUpdate.emit({
            instruction: "SAVE",
            wrkshttype: "Procedural"
        });
    };
    QualityAssuranceSection.prototype.loadQaWorksheetList = function () {
        var _this = this;
        this.observationService.getQaWorksheetList(this.studyId).subscribe(function (res) {
            _this.qaWorksheets = res['results'];
        }, function (error) { return console.error(error); });
    };
    QualityAssuranceSection.prototype.loadQaWorksheet = function () {
        var _this = this;
        return this.observationService.getQaWorksheet(this.studyId, "QA").subscribe(function (res) {
            if (res.result && res.result.template && res.result.content) {
                _this.qaWorksheetId = res.result.id;
                _this.qaTemplate = res.result.template.content;
                _this.qaSelectedTemplateId = res.result.template.id;
                _this.qaSelectedTemplateName = res.result.template.name;
                _this.qaData = res.result.content;
                console.log("qadata", _this.qaData);
                console.log("qaworksheetId", _this.qaWorksheetId);
                return _this.observationService.getQASignatureData(_this.qaWorksheetId).subscribe(function (res) {
                    _this.sqaData = res;
                    _this.qaSignId = res.qa.id;
                    _this.sqaData['qa'].signed = _this.sqaData['qa'].sign ? true : false;
                    if (_this.sqaData['qa'].signed) {
                        _this.disableQAWorksheet = true;
                    }
                    console.log("qa Signature Data.......2", _this.sqaData);
                    console.log("qa Sign Id", _this.qaSignId);
                    return true;
                });
                return true;
            }
            console.log("template id", _this.qaSelectedTemplateId);
            console.log("worksheet data empty");
            return false;
        }, function (error) { return console.error(error); });
    };
    QualityAssuranceSection.prototype.loadQaWorksheetTemplate = function () {
        var _this = this;
        this.observationService.getQaWorksheetTemplate(this.qaSelectedTemplateId).subscribe(function (res) {
            _this.qaTemplate = res.result.content;
        }, function (error) { return console.error(error); });
    };
    QualityAssuranceSection.prototype.onQaDropDownSelection = function (name) {
        if (!this.qaSelectedTemplateName) {
            this.textInAssociateQaWrkshtPopup();
        }
        else if (this.qaSelectedTemplateName != this.qaChangedTemplateName) {
            this.textInAssociateQaWrkshtPopup();
        }
        else {
            console.log("INSIDE NO DROP DOWN DATA");
        }
    };
    QualityAssuranceSection.prototype.onQaWorksheetSelection = function (id, name) {
        this.qaChangedTemplateId = id;
        this.qaChangedTemplateName = name;
        this.qaSelectedTemplateId = id;
        console.log(this.qaSelectedTemplateId);
    };
    QualityAssuranceSection.prototype.textInAssociateQaWrkshtPopup = function () {
        this.newQaAssociationWrksht.open();
    };
    QualityAssuranceSection.prototype.confirmQaAssociation = function () {
        this.confirmWorksheetChange();
        this.newQaAssociationWrksht.close();
        this.saveQAWorksheet().subscribe(console.log("QA wrksht saveed inside save"));
    };
    QualityAssuranceSection.prototype.saveQAWorksheet = function () {
        var _this = this;
        console.log("this.QAworksheetId", this.qaWorksheetId, this.qaData);
        if (!this.qaWorksheetId) {
            console.log("true");
            return this.observationService.saveQaWorksheet(this.studyId, this.qaSelectedTemplateId, "QA", this.qaData).map(function (res) {
                _this.qaWorksheetId = res;
                console.log("inside qa worksheet", _this.qaWorksheetId);
            }, function (error) { return console.error(error); });
        }
        else {
            console.log("Updating QA Worksheet", this.qaWorksheetId, this.qaData, this.studyId);
            return this.observationService.updateQAWorksheet(this.qaWorksheetId, this.qaData).map(function (res) {
                console.log("qaid", _this.qaWorksheetId);
            }, function (error) { return console.error(error); });
        }
    };
    QualityAssuranceSection.prototype.cancelQaAssociation = function () {
        this.newQaAssociationWrksht.close();
    };
    QualityAssuranceSection.prototype.confirmWorksheetChange = function () {
        this.qaSelectedTemplateId = this.qaChangedTemplateId;
        this.qaSelectedTemplateName = this.qaChangedTemplateName;
        this.loadQaWorksheetTemplate();
    };
    QualityAssuranceSection.prototype.ngAfterViewInit = function () {
        var id = this.id;
        $('#' + this.id).click(function () {
            var currentPanel = $(this).next('.wrkshtpanelbody');
            $('.wrkshtpanelbody').each(function () {
                if ($(this).attr('id') != "panel-" + id) {
                    $(this).slideUp();
                }
            });
            currentPanel.slideToggle();
        });
    };
    QualityAssuranceSection.prototype.onSave = function () {
        this.saveQAWorksheet().subscribe(function (res) {
            console.log(res);
        });
        this.publishChange();
    };
    QualityAssuranceSection.prototype.onChange = function (type, value) {
        this.sqaData[type].signed = value;
        console.log("value", value, this.appState.get("userName"));
        if (value) {
            this.sqaData[type].sign = this.appState.get("userName");
            this.sqaData[type].timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
            this.saveQASignature(type, this.sqaData[type].sign, this.sqaData[type].timestamp);
        }
        else {
            delete this.sqaData[type].sign;
            delete this.sqaData[type].timestamp;
            this.deleteQASignature();
        }
    };
    QualityAssuranceSection.prototype.saveQASignature = function (type, sign, timestamp) {
        var _this = this;
        this.observationService.getValidateSignature(this.studyId).subscribe(function (res) {
            if (res.userAttestedStatus === true) {
                _this.observationService.saveQASignature(_this.qaWorksheetId, type, sign, timestamp, _this.studyId).subscribe(function (res) {
                    if (res) {
                        _this.qaSignId = res;
                        console.log("qasignId", _this.qaSignId);
                        _this.disableQAWorksheet = true;
                        _this.onUpdate.emit({
                            instruction: "SAVEQASIGN",
                            type: "attending", sign: sign, timestamp: timestamp
                        });
                    }
                }, function (error) { return console.error(error); });
            }
            else {
                _this.observationService.saveQASignature(_this.qaWorksheetId, type, sign, timestamp, _this.studyId).subscribe(function (res) {
                    _this.qaSignId = res;
                    console.log("qasignId", _this.qaSignId);
                    _this.disableQAWorksheet = true;
                    if (_this.submitOnSignFlag == true) {
                        _this.onSubmitSignFlow();
                    }
                }, function (error) { return console.error(error); });
            }
        }, function (error) { return console.error(error); });
    };
    QualityAssuranceSection.prototype.deleteQASignature = function () {
        var _this = this;
        console.log("qaSignId", this.qaSignId);
        this.observationService.getValidateSignature(this.studyId).subscribe(function (res) {
            if (res.userAttestedStatus === true) {
                console.log("inside qa attending attestation");
                _this.observationService.deleteQAAttestedSignature(_this.qaSignId, _this.studyId).subscribe(function (res) {
                    console.log('deletesignature', res);
                    _this.disableQAWorksheet = false;
                }, function (error) { return console.error(error); });
            }
            else {
                _this.observationService.deleteQASignature(_this.qaSignId).subscribe(function (res) {
                    console.log('deletesignature', res);
                    _this.disableQAWorksheet = false;
                }, function (error) { return console.error(error); });
            }
        });
    };
    QualityAssuranceSection.prototype.onSubmitSignFlow = function () {
        var _this = this;
        if (this.workflowStatus == true && this.attendingWorkflowStatus == true) {
            this.observationService.submitToAttending(this.studyId).subscribe(function (res) {
                _this.submitForAttestationToast.open();
                var that = _this;
                setTimeout(function () { that.submitForAttestationToast.close(); }, 2000);
            }, function (error) { return console.error(error); });
        }
        else {
            this.observationService.submitWorksheet(this.studyId).subscribe(function (res) {
                _this.submitToEMR.open();
                var that = _this;
                setTimeout(function () { that.submitToEMR.close(); }, 2000);
            }, function (error) { return console.error(error); });
        }
    };
    return QualityAssuranceSection;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QualityAssuranceSection.prototype, "workflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QualityAssuranceSection.prototype, "disableQAWorksheet", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], QualityAssuranceSection.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], QualityAssuranceSection.prototype, "studyId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], QualityAssuranceSection.prototype, "onQAUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], QualityAssuranceSection.prototype, "onUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QualityAssuranceSection.prototype, "disableQaSign", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QualityAssuranceSection.prototype, "qasign", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QualityAssuranceSection.prototype, "attendingWorkflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QualityAssuranceSection.prototype, "qaAttendingWorkflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], QualityAssuranceSection.prototype, "submitOnSignFlag", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('newQaAssociationWrksht'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], QualityAssuranceSection.prototype, "newQaAssociationWrksht", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('submitForAttestationToast'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], QualityAssuranceSection.prototype, "submitForAttestationToast", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('submitToEMR'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], QualityAssuranceSection.prototype, "submitToEMR", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('associateQaWorksheetPopup'),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], QualityAssuranceSection.prototype, "associateQaWorksheetPopup", void 0);
QualityAssuranceSection = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'quality-assurance',
        template: __webpack_require__(407),
        styles: []
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__observations_service__["a" /* ObservationsService */],
        __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */]])
], QualityAssuranceSection);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7), __webpack_require__(1)))

/***/ }),
/* 291 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SaveResetSection; });



var SaveResetSection = (function () {
    function SaveResetSection(appState) {
        this.appState = appState;
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    SaveResetSection.prototype.onSave = function () {
        this.onUpdate.emit({
            instruction: "SAVE"
        });
    };
    SaveResetSection.prototype.onReset = function () {
        this.onUpdate.emit({
            instruction: "RESET"
        });
    };
    return SaveResetSection;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], SaveResetSection.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], SaveResetSection.prototype, "disableWorksheet", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], SaveResetSection.prototype, "studyId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], SaveResetSection.prototype, "onUpdate", void 0);
SaveResetSection = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'save-reset',
        template: __webpack_require__(408),
        styles: []
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppState */]])
], SaveResetSection);



/***/ }),
/* 292 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__observations_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TagsSection; });




var TagsSection = (function () {
    function TagsSection(observationService) {
        var _this = this;
        this.observationService = observationService;
        this.autoSave = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Subject"]();
        this.tagsList = [];
        this.errortags = 0;
        this.autoSave.bufferTime(2000)
            .subscribe(function (val) {
            if (val.length) {
                _this.observationService.saveTags(_this.studyId, _this.activeTagList).subscribe(function (res) {
                }, function (err) {
                });
            }
        });
    }
    TagsSection.prototype.selected = function (value) {
        console.log('Selected value is: ', value);
    };
    TagsSection.prototype.ngOnInit = function () {
        this.disableTags = this.assignedUser ? (this.loginUserId == this.assignedUser) : false;
        if (this.disableTags == false)
            this.disableTags = this.qaUser ? (this.loginUserId == this.qaUser) : false;
        if (this.disableTags == false)
            this.disableTags = this.attendingUser ? (this.loginUserId == this.attendingUser) : false;
        for (var i = 0; i < this.tagList.length; i++) {
            this.tagsList.push({ id: this.tagList[i].id, name: this.tagList[i].name, type: this.tagList[i].type });
        }
        var inputTags = $j('#inputTags').tagSuggest({
            data: this.tagsList,
            sortOrder: 'name',
            maxDropHeight: 200,
            name: 'inputTags'
        });
        console.log(':::::::::::active tag list ' + JSON.stringify(this.activeTagList));
        console.log('::::::::::: tag list ' + JSON.stringify(this.tagsList));
        if (this.activeTagList.length > 0) {
            for (var i = 0; i < this.activeTagList.length; i++) {
                var activetag = this.activeTagList[i].name;
                if (this.activeTagList[i].type == "global") {
                    document.getElementById('tag-sel-ctn-0').innerHTML += '<div class="tag-sel-item">' + activetag + '<span class="tag-close-btn"></span></div>';
                }
                else {
                    document.getElementById('tag-sel-ctn-0').innerHTML += '<div class="tag-sel-item tag-sel-personal">' + activetag + '<span class="tag-close-btn"></span></div>';
                }
            }
        }
    };
    TagsSection.prototype.ngAfterViewInit = function () {
        var id = this.id;
        $('#' + this.id).click(function () {
            var currentPanel = $(this).next('.wrkshtpanelbody');
            $('.wrkshtpanelbody').each(function () {
                if ($(this).attr('id') != "panel-" + id) {
                    $(this).slideUp();
                }
            });
            currentPanel.slideToggle();
        });
    };
    TagsSection.prototype.saveInputTags = function () {
        var saveinputTagsvalue = JSON.parse(document.getElementById('inputTagsHidden').value);
        if (saveinputTagsvalue.length > 0) {
            this.errortags = 0;
            this.activeTagList = saveinputTagsvalue;
            this.autoSave.next();
        }
        else {
            this.errortags = 1;
        }
    };
    return TagsSection;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], TagsSection.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], TagsSection.prototype, "tagList", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], TagsSection.prototype, "studyId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], TagsSection.prototype, "activeTagList", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], TagsSection.prototype, "loginUserId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], TagsSection.prototype, "qaUser", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], TagsSection.prototype, "assignedUser", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], TagsSection.prototype, "attendingUser", void 0);
TagsSection = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'tags',
        template: __webpack_require__(409),
        styles: []
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__observations_service__["a" /* ObservationsService */]])
], TagsSection);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 293 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionMultiSelect; });


var OptionMultiSelect = (function () {
    function OptionMultiSelect() {
        this.options = [];
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    OptionMultiSelect.prototype.ngOnInit = function () {
        this.initModel();
        if (!this.columnLayout) {
            this.columnLayout = 2;
        }
    };
    OptionMultiSelect.prototype.initModel = function () {
        if (!this.data) {
            this.data = {};
        }
    };
    OptionMultiSelect.prototype.ngOnChanges = function (changes) {
        if (changes['data'])
            this.initModel();
    };
    OptionMultiSelect.prototype.onChange = function (value, id) {
        this.data[id] = value;
        this.publishChange();
    };
    OptionMultiSelect.prototype.publishChange = function () {
        this.onUpdate.emit({
            id: "value",
            data: this.data
        });
    };
    OptionMultiSelect.prototype.onChildChange = function (event) {
        this.data[event.id] = event.data;
        this.publishChange();
    };
    return OptionMultiSelect;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionMultiSelect.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], OptionMultiSelect.prototype, "data", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], OptionMultiSelect.prototype, "options", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Number)
], OptionMultiSelect.prototype, "columnLayout", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], OptionMultiSelect.prototype, "onUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionMultiSelect.prototype, "qasign", void 0);
OptionMultiSelect = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'option-multi-select',
        template: __webpack_require__(410),
        styles: []
    })
], OptionMultiSelect);



/***/ }),
/* 294 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionSingleSelect; });


var OptionSingleSelect = (function () {
    function OptionSingleSelect() {
        this.options = [];
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    OptionSingleSelect.prototype.ngOnInit = function () {
        this.initModel();
        if (!this.columnLayout) {
            this.columnLayout = 3;
        }
    };
    OptionSingleSelect.prototype.initModel = function () {
        if (!this.data) {
            this.data = {};
        }
    };
    OptionSingleSelect.prototype.ngOnChanges = function (changes) {
        if (changes['data'])
            this.initModel();
    };
    OptionSingleSelect.prototype.onChange = function (value) {
        this.data[this.id] = value;
        this.publishChange();
    };
    OptionSingleSelect.prototype.publishChange = function () {
        this.onUpdate.emit({
            id: 'value',
            data: this.data
        });
    };
    OptionSingleSelect.prototype.onChildChange = function (event) {
        this.data[event.id] = event.data;
        this.publishChange();
    };
    return OptionSingleSelect;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionSingleSelect.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], OptionSingleSelect.prototype, "data", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], OptionSingleSelect.prototype, "options", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Number)
], OptionSingleSelect.prototype, "columnLayout", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], OptionSingleSelect.prototype, "onUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionSingleSelect.prototype, "qasign", void 0);
OptionSingleSelect = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'option-single-select',
        template: __webpack_require__(411),
        styles: []
    })
], OptionSingleSelect);



/***/ }),
/* 295 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionTextNumber; });


var OptionTextNumber = (function () {
    function OptionTextNumber() {
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    OptionTextNumber.prototype.onChange = function (value) {
        this.data = value;
        this.publishChange();
    };
    OptionTextNumber.prototype.publishChange = function () {
        this.onUpdate.emit({
            id: 'value',
            data: this.data
        });
    };
    return OptionTextNumber;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionTextNumber.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], OptionTextNumber.prototype, "data", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionTextNumber.prototype, "label", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], OptionTextNumber.prototype, "onUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionTextNumber.prototype, "qasign", void 0);
OptionTextNumber = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'option-text-number',
        template: __webpack_require__(412),
        styles: []
    })
], OptionTextNumber);



/***/ }),
/* 296 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionText; });


var OptionText = (function () {
    function OptionText() {
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    OptionText.prototype.onChange = function (value) {
        this.data = value;
        this.publishChange();
    };
    OptionText.prototype.publishChange = function () {
        this.onUpdate.emit({
            id: 'value',
            data: this.data
        });
    };
    return OptionText;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionText.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], OptionText.prototype, "data", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], OptionText.prototype, "label", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], OptionText.prototype, "onUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], OptionText.prototype, "qasign", void 0);
OptionText = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'option-text',
        template: __webpack_require__(413),
        styles: []
    })
], OptionText);



/***/ }),
/* 297 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__worksheet_model__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorksheetTopic; });



var WorksheetTopic = (function () {
    function WorksheetTopic() {
        this.columnLayout = 0;
        this.data = {};
        this.options = [];
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    WorksheetTopic.prototype.ngOnInit = function () {
        this.initModel();
    };
    WorksheetTopic.prototype.initModel = function () {
        if (!this.data) {
            this.data = {};
        }
    };
    WorksheetTopic.prototype.ngOnChanges = function (changes) {
        if (changes['data'])
            this.initModel();
    };
    WorksheetTopic.prototype.onChildChange = function (event) {
        this.data[event.id] = event.data;
        this.publishChange();
    };
    WorksheetTopic.prototype.publishChange = function () {
        this.onUpdate.emit(new __WEBPACK_IMPORTED_MODULE_2__worksheet_model__["a" /* WorksheetData */](this.id, this.data));
    };
    return WorksheetTopic;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], WorksheetTopic.prototype, "type", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], WorksheetTopic.prototype, "name", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], WorksheetTopic.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Number)
], WorksheetTopic.prototype, "columnLayout", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], WorksheetTopic.prototype, "data", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], WorksheetTopic.prototype, "options", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], WorksheetTopic.prototype, "topics", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], WorksheetTopic.prototype, "onUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], WorksheetTopic.prototype, "qasign", void 0);
WorksheetTopic = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'worksheet-topic',
        template: __webpack_require__(414),
        styles: []
    })
], WorksheetTopic);



/***/ }),
/* 298 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__worksheet_model__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorksheetSection; });



var WorksheetSection = (function () {
    function WorksheetSection() {
        this.data = {};
        this.topics = [];
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    WorksheetSection.prototype.ngOnInit = function () {
        this.initModel();
    };
    WorksheetSection.prototype.initModel = function () {
        if (!this.data) {
            this.data = {};
        }
    };
    WorksheetSection.prototype.ngOnChanges = function (changes) {
        console.log("WorksheetSection ngOnChanges", changes);
        if (changes['data'])
            this.initModel();
    };
    WorksheetSection.prototype.onChildChange = function (event) {
        this.data[event.id] = event.data;
        this.publishChange();
    };
    WorksheetSection.prototype.publishChange = function () {
        this.onUpdate.emit(new __WEBPACK_IMPORTED_MODULE_2__worksheet_model__["a" /* WorksheetData */](this.id, this.data));
    };
    WorksheetSection.prototype.ngAfterViewInit = function () {
        var id = this.id;
        $('#' + this.id).click(function () {
            var currentPanel = $(this).next('.wrkshtpanelbody');
            $('.wrkshtpanelbody').each(function () {
                if ($(this).attr('id') != "panel-" + id) {
                    $(this).slideUp();
                }
            });
            currentPanel.slideToggle();
        });
    };
    return WorksheetSection;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], WorksheetSection.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], WorksheetSection.prototype, "name", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], WorksheetSection.prototype, "required", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], WorksheetSection.prototype, "data", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], WorksheetSection.prototype, "topics", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], WorksheetSection.prototype, "onUpdate", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], WorksheetSection.prototype, "qasign", void 0);
WorksheetSection = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'worksheet-section',
        template: __webpack_require__(415),
        styles: []
    })
], WorksheetSection);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 299 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__worksheet_model__ = __webpack_require__(22);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Worksheet; });



var Worksheet = (function () {
    function Worksheet() {
        this.onUpdate = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"]();
    }
    Worksheet.prototype.ngOnInit = function () {
        this.initModel();
    };
    Worksheet.prototype.initModel = function () {
        if (!this.data) {
            this.data = {};
        }
    };
    Worksheet.prototype.ngOnChanges = function (changes) {
        console.log("Worksheet ngOnChanges", changes, this.data);
        if (changes['data']) {
            this.initModel();
        }
    };
    Worksheet.prototype.onChildChange = function (event) {
        console.log('onChildChange', event);
        if (event.instruction) {
            // for save, cancel, reset
            this.onUpdate.emit(event);
        }
        else {
            // for data updates
            this.data[event.id] = event.data;
            this.publishChange();
        }
    };
    Worksheet.prototype.publishChange = function () {
        this.onUpdate.emit(new __WEBPACK_IMPORTED_MODULE_2__worksheet_model__["a" /* WorksheetData */](this.id, this.data));
    };
    return Worksheet;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], Worksheet.prototype, "template", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Worksheet.prototype, "id", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], Worksheet.prototype, "data", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Object)
], Worksheet.prototype, "sdata", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Worksheet.prototype, "studyId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], Worksheet.prototype, "examType", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Worksheet.prototype, "selectedExamTypeId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Worksheet.prototype, "disableQaSign", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Worksheet.prototype, "qasign", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], Worksheet.prototype, "tagList", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], Worksheet.prototype, "activeTagList", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Worksheet.prototype, "loginUserId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Worksheet.prototype, "qaUser", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Worksheet.prototype, "assignedUser", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], Worksheet.prototype, "attendingUser", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Worksheet.prototype, "submitOnSignFlag", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Worksheet.prototype, "workflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Worksheet.prototype, "attendingWorkflowStatus", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], Worksheet.prototype, "status", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], Worksheet.prototype, "disableQAWorksheet", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Output"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["EventEmitter"])
], Worksheet.prototype, "onUpdate", void 0);
Worksheet = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'worksheet',
        template: __webpack_require__(416),
        styles: []
    })
], Worksheet);



/***/ }),
/* 300 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatientImageComponent; });



var PatientImageComponent = (function () {
    function PatientImageComponent(domSanitizer) {
        this.domSanitizer = domSanitizer;
        this.valueChange = 0;
        // this.name = 'Angular2'
        console.log("constructor", this.studyObjectId);
    }
    PatientImageComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            var chng = changes[propName];
            var cur = JSON.stringify(chng.currentValue);
            var prev = JSON.stringify(chng.previousValue);
            if (!cur || cur == undefined) {
            }
            else {
                this.valueChange = this.valueChange + 1;
                if (this.valueChange > 1) {
                }
                else {
                    this.imageIds = addItemToStacks(this.studyObjectId, this.sopInstanceId);
                    this.seriesList = $('#studyViewerTemplate').find('.thumbnails')[0];
                    this.imageViewer = new ImageViewer($('#studyViewerTemplate'), $('#viewportWrapper'));
                    this.imageViewer.setLayout('1x1');
                    this.wadoLoader = this.wadoLoader;
                    initViewports(this);
                    resizeStudyViewer(this);
                    retrieveDataFromStack(this);
                    displayMasterImage(this);
                    displaySelectedThumbnail(this);
                    setupButtons($('#viewer'));
                }
            }
        }
    };
    return PatientImageComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", String)
], PatientImageComponent.prototype, "studyObjectId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Array)
], PatientImageComponent.prototype, "sopInstanceId", void 0);
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], PatientImageComponent.prototype, "wadoLoader", void 0);
PatientImageComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'patient-image',
        styles: [
            __webpack_require__(442)
        ],
        template: __webpack_require__(417)
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["DomSanitizer"]])
], PatientImageComponent);

function addItemToStacks(studyUid, objectId) {
    var url = "http://localhost:1337/172.25.242.25/wado/?requestType=WADO&studyUID=";
    var stack = [];
    objectId.filter(function (element) {
        var seriesUid = element.seriesUid;
        var sopUid = element.sopUid;
        var frameCount = element.frameCount;
        if (frameCount > 0) {
            stack.push(url + studyUid + "&seriesUID=" + seriesUid + "&objectUID=" + sopUid + "&contentType=application/dicom");
        }
        else {
            stack.push(url + studyUid + "&seriesUID=" + seriesUid + "&objectUID=" + sopUid + "&contentType=image/jpeg");
        }
    });
    return stack;
}
function displayImage(thumbnail, image) {
    cornerstone.displayImage(thumbnail, image);
}
function initViewports(object) {
    object.imageViewer.forEachElement(function (el) {
        cornerstone.enable(el);
    });
}
function retrieveDataFromStack(object) {
    object.imageIds.forEach(function (stack, stackIndex) {
        // Create series thumbnail item
        var seriesEntry = '<a class="list-group-item" + ' +
            'oncontextmenu="return false"' +
            'id="' + stack + '"' +
            'unselectable="on"' +
            'onselectstart="return false;"' +
            'onmousedown="return false;">' +
            '<div class="csthumbnail" ' +
            'oncontextmenu="return false"' +
            'unselectable="on"' +
            'onselectstart="return false;"' +
            'onmousedown="return false;"></div>' +
            "<div class='text-center small'>" + '</div></a>';
        // Add to series list
        var seriesElement = $(seriesEntry).appendTo(object.seriesList);
        // Find thumbnail
        var thumbnail = $(seriesElement).find('div')[0];
        // Enable cornerstone on the thumbnail
        cornerstone.enable(thumbnail);
        if (stackIndex === 0) {
            $(seriesElement).addClass('active');
        }
        if (stack.endsWith("dicom")) {
            cornerstone.loadImage(stack, displayImage, thumbnail);
        }
        else {
            cornerstone.loadAndCacheImage(stack, displayImage, thumbnail);
        }
        // Handle thumbnail click
        $(seriesElement).on('click touchstart', function () {
            useItemStack(0, stackIndex, object);
        }).data('stack', stackIndex);
    });
}
function displayMasterImage(object) {
    if (object.imageIds.length != 0) {
        if (object.imageIds[0].endsWith("dicom") == true) {
            cornerstone.loadImage(object.imageIds[0], displayImage, $('#viewport')[0]);
        }
        else {
            cornerstone.loadAndCacheImage(object.imageIds[0], displayImage, $('#viewport')[0]);
        }
    }
}
function displaySelectedThumbnail(object) {
    var imageId;
    $("#viewport").unbind();
    $('.list-group-item').click(function () {
        $('.list-group-item').removeClass('active');
        $("#viewport").unbind();
        cornerstone.disable($('#viewport')[0]);
        this.imageId = $(this).attr('id');
        $(this).addClass('active');
        cornerstone.enable($('#viewport')[0]);
        if (this.imageId.endsWith("dicom")) {
            cornerstone.loadImage(this.imageId, displayImage, $('#viewport')[0]);
        }
        else {
            cornerstone.loadAndCacheImage(this.imageId, displayImage, $('#viewport')[0]);
        }
    });
}
function useItemStack(item, stack, object) {
    var element = object.imageViewer.getElement(item);
    if ($(element).data('waiting')) {
        $(element).data('waiting', false);
    }
    $(element).data('useStack', stack);
}
function resizeStudyViewer(object) {
    var imageViewerElement = $('#studyViewerTemplate').find('.imageViewer')[0];
    var parentDiv = $('#studyViewerTemplate').find('.viewer')[0];
    var studyRow = $('#studyViewerTemplate').find('.studyContainer')[0];
    var height = $(studyRow).height();
    var width = $(studyRow).width();
    console.log($(studyRow).innerWidth(), $(studyRow).outerWidth(), $(studyRow).width());
    $(object.seriesList).height("100%");
    $(imageViewerElement).css({ height: 540 });
    object.imageViewer.forEachElement(function (el, vp) {
        cornerstone.resize(el, true);
        if ($(el).data('waiting')) {
            var ol = vp.find('.overlay-text');
            if (ol.length < 1) {
                ol = $('<div class="overlay overlay-text">Please drag a stack onto here to view images.</div>').appendTo(vp);
            }
            var ow = vp.width() / 2, oh = vp.height() / 2;
            ol.css({ top: oh, left: ow - (ol.width() / 2) });
        }
    });
}

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 301 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewerHeaderComponent; });


var ViewerHeaderComponent = (function () {
    function ViewerHeaderComponent() {
    }
    return ViewerHeaderComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"])(),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:type", Boolean)
], ViewerHeaderComponent.prototype, "isWorksheetOpen", void 0);
ViewerHeaderComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'viewerheader',
        template: __webpack_require__(418),
    })
], ViewerHeaderComponent);



/***/ }),
/* 302 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ldapconfiguration_component__ = __webpack_require__(69);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ldapconfiguration_component__["a"]; });



/***/ }),
/* 303 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leftnav_component__ = __webpack_require__(304);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__leftnav_component__["a"]; });



/***/ }),
/* 304 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeftNavComponent; });




var LeftNavComponent = (function () {
    function LeftNavComponent(router, appState) {
        this.router = router;
        this.appState = appState;
    }
    LeftNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appState.getldapConfigStatus().subscribe(function (res) {
            _this.ldapConfigEnabled = res.ldapConfigEnabled;
            console.log("ldapConfigEnabled in leftnav", _this.ldapConfigEnabled);
        });
    };
    LeftNavComponent.prototype.ngAfterViewInit = function () {
        /*Left nav popover*/
        $('.popover-menu, .popup').hover(function () {
            var iconnumber = $(this).data('icon');
            $('.icon' + iconnumber).show();
        }, function () {
            if (!($('.popover-menu:hover').length > 0))
                $('.popover-menu').hide();
        });
        /*Left nav popover Ends*/
        /*Left Nav*/
        $('#leftmenu').click(function () {
            if ($('.left-nav').hasClass("slim")) {
                $('.left-nav').removeClass("slim");
                $('.popover-menu').removeClass('hide');
                $('.sidebar').animate({ "width": "50px" }, 400);
                setTimeout(function () {
                    $('.left-nav span').addClass("parentli");
                    $('.submenu').slideUp(150);
                }, 150);
            }
            else {
                $('.left-nav').addClass("slim");
                $('.popover-menu').addClass('hide');
                $('.sidebar').animate({ "width": "250px" }, 400);
                setTimeout(function () {
                    $('.submenu').slideDown(200);
                    $('.left-nav span').removeClass("parentli");
                }, 200);
            }
        });
        $('#mobile_leftmenu').click(function () {
            $("#mob_sidemenu").toggle();
            $('#mob_sidemenu nav.left-nav').addClass("slim");
            $('#mob_sidemenu nav.sidebar').animate({ "width": "250px" }, 400);
            $('#mob_sidemenu nav.left-nav span').removeClass("parentli");
        });
        $(".mob_close").click(function () {
            $("#mob_sidemenu").hide();
            $('#mob_sidemenu nav.left-nav').removeClass("slim");
            $('#mob_sidemenu nav.sidebar').animate({ "width": "0px" }, 400);
            $('#mob_sidemenu nav.left-nav span').addClass("parentli");
        });
        $("#dash_toggle").click(function () {
            $(".dash_submenu").toggle();
        });
        $("#dash_submenu").click(function () {
            $("ul.dash_exp").toggle();
        });
        /*Left Nav Ends*/
    };
    return LeftNavComponent;
}());
LeftNavComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'leftnav',
        template: __webpack_require__(420),
        styles: [__webpack_require__(443)]
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppState */]])
], LeftNavComponent);


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)))

/***/ }),
/* 305 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__passwordconfiguration_component__ = __webpack_require__(71);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__passwordconfiguration_component__["a"]; });



/***/ }),
/* 306 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__smtpconfiguration_component__ = __webpack_require__(75);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__smtpconfiguration_component__["a"]; });



/***/ }),
/* 307 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_enum__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestRule1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TestRule2; });

var TestRule1 = (function () {
    function TestRule1() {
    }
    TestRule1.prototype.execute = function (context) {
        var result = {};
        console.log("TestRule1", context);
        if (context.loggedInUser !== context.currentUser) {
            result.disable = true;
        }
        else {
            result.disable = false;
        }
        return result;
    };
    TestRule1.prototype.ruleId = function () {
        return "WORKSHEET_SUBMIT_BUTTON_DISABLE";
    };
    return TestRule1;
}());

var TestRule2 = (function () {
    function TestRule2() {
    }
    TestRule2.prototype.execute = function (context) {
        var result = {};
        if (context.studyStatusNum < __WEBPACK_IMPORTED_MODULE_0__app_enum__["a" /* StudyStatus */].QAUnassigned && context.qaEnabled) {
            result.innerHTML = "Submit For QA";
        }
        else if (context.studyStatusNum < __WEBPACK_IMPORTED_MODULE_0__app_enum__["a" /* StudyStatus */].SubmittedForAttestation && context.attestationEnabled) {
            result.innerHTML = "Submit For Attestation";
        }
        else {
            result.innerHTML = "Submit To EMR";
        }
        return result;
    };
    TestRule2.prototype.ruleId = function () {
        return "WORKSHEET_SUBMIT_BUTTON_INNERHTML";
    };
    return TestRule2;
}());



/***/ }),
/* 308 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__usergrouplist_component__ = __webpack_require__(79);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__usergrouplist_component__["a"]; });



/***/ }),
/* 309 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userlist_component__ = __webpack_require__(81);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__userlist_component__["a"]; });



/***/ }),
/* 310 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = getTranslationProviders;

//import {translation} from '../../locale/messages.fr'
function getTranslationProviders() {
    // Get the locale id from the global
    var locale = document['locale'];
    // return no providers if fail to get translation file for locale
    var noProviders = [];
    // No locale or U.S. English: no translation providers
    if (!locale || locale === 'en-US') {
        return Promise.resolve(noProviders);
    }
    var translation = './locale/messages.${locale}.xlf';
    return Promise.resolve([
        { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["TRANSLATIONS"], useValue: translation },
        { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["TRANSLATIONS_FORMAT"], useValue: 'xlf' },
        { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["LOCALE_ID"], useValue: locale }
    ]);
}


/***/ }),
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports
exports.i(__webpack_require__(92), "");
exports.i(__webpack_require__(89), "");
exports.i(__webpack_require__(91), "");
exports.i(__webpack_require__(90), "");
exports.i(__webpack_require__(93), "");

// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "\r\n/*Breadcrumb*/\r\n .ranges li{\r\n    background: none;\r\n    border:0px;\r\n    color:#4274b9;\r\n}\r\n.ranges li:hover, .ranges li.active, .ranges li:focus{\r\n    background-color: #4274b9;\r\n    border:0px;\r\n    color:#fff;\r\n}\r\n.applyBtn, .cancelBtn{\r\n    background: none;\r\n    border: 1px solid #ccc;\r\n    color: #333;\r\n}\r\n.applyBtn:hover, .applyBtn:focus, .applyBtn:active, .cancelBtn:hover, .cancelBtn:focus{\r\n    background-color: #4274b9;\r\n    border:1px solid #ccc;\r\n    color:#fff;\r\n}\r\n.updateDefaultTimePeriod{\r\n\tfloat: right;\r\n\theight: 3.445rem;\r\n\tborder-radius: 5px 0 0 5px;\r\n\tmargin: 10px 0;\r\ncolor:#424242;\r\n } \r\n.cus-input {\r\n    border-radius: 0px;\r\n}\r\n \r\n/*Breadcrumb Ends*/\r\n\r\n", ""]);

// exports


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".newuser-avatar img{\r\n    border-radius: 50%;\r\n    width:60px;\r\n    height:70px;\r\n    margin-left:10px;\r\n}\r\n#phoneCountryCode, #phoneStateCode{\r\n  width:50px;\r\n}\r\n#phone{\r\n  width:81px;\r\n}\r\n#spanHifen{\r\n  line-height: 30px;\r\n}\r\n.alertRequired{\r\npadding: 3px;\r\n}    ", ""]);

// exports


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".legend-badge{\r\n    padding:2px 4px !important;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".barChart{\r\n    height:445px !important;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "\r\n/*Master Head*/\r\n.p-logo{\r\n    padding: 10px 0px 0px 15px !important;\r\n}\r\n.p-leftmenu{\r\n    padding: 10px 10px 10px 0px !important;\r\n}\r\n.masterhead{\r\n  position:fixed;\r\n  background-color:#f5f5f5;\r\n  z-index:999;\r\n}\r\n.msthead_menu ul li{\r\n    float:left;\r\n}\r\n#search_close{\r\n    display:none;\r\n}\r\n.searchbox_styl{\r\n  background:none;\r\n  border-radius:0px;\r\n  border:1px solid #ccc;\r\n    padding: 3px !important;\r\n}\r\n.search_box{\r\n  float:left;\r\n  display:none;\r\n}\r\n.badge_bg{\r\n  top:-10px;\r\n  left:-9px;\r\n  color:#fff;\r\n  background:#b74545;\r\n  border-radius:50px;\r\n  padding:3px 5px !important;\r\n}\r\n.user-dropdown{\r\n    position:relative;\r\n}\r\n.userdrop{\r\n    right:0px;\r\n    left:auto;\r\n    top:52px;\r\n    right: 15px;\r\n    position: absolute;\r\n}\r\n.alertdrop{\r\n    width: 350px;\r\n    left: 95px;\r\n    font-size: 14px;\r\n    line-height: 15px;\r\n    height: 350px;\r\n    overflow-y: auto;\r\n    background-color: #dedede;\r\n    padding-top:0px;\r\n    margin-top:0px;\r\n}\r\n.dropdown-menu > li {\r\n  float:left;\r\n  clear:left;\r\n}\r\n.dropdown-menu.mob-dropdown{\r\n    right:0px;\r\n    left:auto;\r\n    top:0px;\r\n    right: 0px;\r\n    position: absolute;\r\n}\r\n\r\n\r\n\r\n/*Master Head Ends*/\r\n", ""]);

// exports


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "/*Image Viewer Right Menu*/\r\n.img-vie-right-menu{\r\n    border:0px !important;\r\n    background-color: #4274B9 !important;\r\n    color:#fff !important;\r\n}\r\n.p-imgview{\r\n    padding: 0px 26px 15px 15px !important;\r\n}\r\n.p-patientdet{\r\n     padding: 0px 50px 0px 0px !important;\r\n}\r\nhr{\r\n    border-top: 1px solid #dedede;\r\n}\r\n.details-tab.active a, .details-tab.active a:hover, .details-tab.active a:focus, .details-tab a:hover, .details-tab a:focus{\r\n    background-color: #fff !important;\r\n    border: 1px solid #fff !important;\r\n    color: #4274B9 !important;\r\n    border-radius: 0px;\r\n}\r\n\r\n/*Image Viewer Study Details Tab*/\r\n.scroll-335 {\r\n    max-height: 335px;\r\n    overflow-y: auto;\r\n}\r\n.custom-scrollbar {\r\n    position: relative;\r\n    background-color: #fff;\r\n}\r\n\r\n/*Media Queries*/\r\n/*Tablet*/\r\n@media screen and (max-width: 979px) and (min-width: 768px){\r\n.btn-toolbar.pull-right, .btn-group.pull-right{\r\n    float:left !important;\r\n}\r\n.tab-viewer{\r\n    margin-top:10px;\r\n}\r\nlabel{\r\n    margin-bottom: 0px;\r\n}\r\n}\r\n\r\n/*Mobile*/\r\n@media screen and (max-width: 767px) and (min-width: 320px){\r\nlabel{\r\n    margin-bottom: 0px;\r\n}\r\n.btn-toolbar.pull-right, .btn-group.pull-right{\r\n    float:left !important;\r\n}\r\n.tab-viewer{\r\n    margin-top:10px;\r\n}\r\n}\r\n\r\n\r\n/*Procedural Worksheet*/\r\n\r\n.worksheet{\r\n    height: 700px;\r\n    position : absolute;\r\n    top:122px;\r\n    left:65px;\r\n    width:0%;\r\n    /*transition: all .5s ease-in;\r\n    z-index:-2;*/\r\n    /*background-color: #fff;*/\r\n    display : none;\r\n}\r\n.worksheet.active{\r\n    left:65px !important;\r\n    z-index:1 !important;\r\n    width:304px;\r\n    display:block !important;\r\n}\r\n.label-fw-13{\r\n    font-size:13px;\r\n}\r\n\r\n/*Scroll Bar*/\r\n.scroll-400{\r\n    max-height: 400px;\r\n    overflow-y: scroll;\r\n    overflow-x: hidden;\r\n}\r\n.custom-scrollbar {\r\n    position: relative;\r\n    background-color: #fff;\r\n}\r\n::-webkit-scrollbar\r\n{\r\n width: 8px;\r\n}\r\n::-webkit-scrollbar-track\r\n{\r\n -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\r\n border-radius:10px;\r\n}\r\n::-webkit-scrollbar-thumb\r\n{\r\n background-color: #c1c1c1;\r\n border-radius:10px;\r\n}\r\n::-moz-scrollbar\r\n{\r\n width: 8px;\r\n}\r\n::-moz-scrollbar-track\r\n{\r\n -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\r\n border-radius:10px;\r\n}\r\n::-moz-scrollbar-thumb\r\n{\r\n background-color: #c1c1c1;\r\n border-radius:10px;\r\n}\r\n\r\n/*Other Text Box*/\r\n.wrksht-text{\r\n    padding:5px;\r\n}\r\n.txtNumber{\r\n    width:40px;\r\n    padding:5px;\r\n}\r\n\r\n/*Choose Worksheet Dropdown*/\r\n.ddWorksheet .dropdown-menu{\r\n    top: 32px;\r\n    right: 122px;\r\n}\r\n.ddWorksheet .btn-default:hover, .ddWorksheet .btn-default:focus,.open>.dropdown-toggle.btn-default:focus, .open>.dropdown-toggle.btn-default:hover {\r\n    background-color: #fff;\r\n}\r\n.worksheetActive{\r\n    font-size:15px;\r\n}\r\n\r\n/*Worksheet Accordion*/\r\n.wrkshtpanelhead{\r\n    background-color: #4274B9 !important;\r\n    color:white !important;\r\n}\r\n.qawrkshtpanelhead{\r\n    background-color: #149447 !important;\r\n    color:white !important;\r\n}\r\n.wrkshtpanelbody{\r\n    display:none;\r\n}\r\n\r\n/*Demographics*/\r\n.observations-details-tab a{\r\n    background-color: #4274B9 !important;\r\n    border: 2px solid #4274B9 !important;\r\n    color: #fff !important;\r\n    font-weight:bold;\r\n}\r\n.observations-details-tab.active a, .observations-details-tab.active a:hover, .observations-details-tab.active a:focus, .observations-details-tab a:hover, .observations-details-tab a:focus{\r\n    background-color: #fff !important;\r\n    border: 2px solid #4274B9 !important;\r\n    color: #4274B9 !important;\r\n    border-bottom-color: #fff !important;\r\n    font-weight:bold;\r\n}\r\n\r\n/*hr*/\r\n.wrkshtHr {\r\n    border-top: 1px solid #dedede;\r\n}\r\n\r\n\r\n/*Study Tab Tag*/\r\n.tagscss{\r\n\tmargin-top:5px;\r\n\tmargin-right:5px;\r\n\tdisplay:inline-block;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, ".thumbnailSelector {\r\n    width: 106px;\r\n    float: left;\r\n    margin-left: 0px;\r\n    height: 100%;\r\n    padding-top:30px;\r\n}\r\n.viewport {\r\n\ttop:0px;\r\n    left:0px;\r\n    position: inherit;    \r\n}\r\n\r\n.viewportWrapper {\r\n\twidth: 100%;\r\n    box-sizing: border-box;\r\n    border: 2px solid #777;\r\n}\r\n.viewer {\r\n\twidth: calc(98% - 106px);\r\n\theight:600px;\r\n    float: left;\r\n    box-sizing: border-box;\r\n}\r\n.csthumbnail {\r\n    color: white;\r\n    background-color:black;\r\n    width:100px;\r\n    height:100px;\r\n    border: 0px;\r\n    padding: 0px;\r\n}\r\n\r\n.image-actions {\r\n  color: #ffffff;\r\n  background-color: #424242;\r\n  border-color: #424242;\r\n}\r\n.thumbnails.list-group{\r\n\tpadding-left:18px\r\n}", ""]);

// exports


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "\r\n/*Left Nav*/\r\n.sidebar img{\r\n    width:15px;\r\n    height: 15px;\r\n}\r\n.left-nav{\r\n    height:100%;\r\n}\r\n.sidebar{\r\n    left:0;\r\n    width: 50px;\r\n    position: fixed;\r\n    z-index:1;\r\n    margin-top:55px;\r\n}\r\n/*.sidebar li a:hover{\r\n    background-color:#4e4e4e;\r\n    color:#333;\r\n}\r\n.sidebar .active{\r\n     background-color:#4e4e4e;\r\n    color:#333;\r\n    box-shadow: 4px 0 0 0 #00539c inset;\r\n}*/\r\n.parentmenu{\r\n    position: relative;\r\n}\r\n.exp-leftnav li a:hover, .exp-leftnav li a:focus, .exp-leftnav li a.active, .popover-menu li:hover, .popover-menu li:focus, .popover-menu li.active{\r\n    background-color:#4e4e4e;\r\n    color:#fff;\r\n    box-shadow: 3px 0 0 0 #4274b9 inset;\r\n}\r\n.popover-menu{\r\n    position: fixed;\r\n    left: 50px;\r\n    z-index: 999;\r\n    background: #000;\r\n    display: none;\r\n}\r\n.icon1{\r\n  top: 55px;\r\n}\r\n.icon2{\r\n  top: 102px;\r\n}\r\n.icon3{\r\n  top: 150px;\r\n}\r\n.icon4{\r\n  top: 198px;\r\n}\r\n.parentli, .submenu{\r\n    z-index: -1;\r\n    display:none;\r\n}\r\n.slim{\r\n    z-index: 3;\r\n    display:block;\r\n}\r\n.exp-leftnav li a{\r\n    width: 100%;\r\n    padding: 15px 25px 15px 20px;\r\n    position: relative;\r\n    display: block;\r\n}\r\n.user-submenu-mobile li{\r\n    float: none !important;\r\n}\r\n.userDropDownMobileOptions{\r\n    color:#fff;\r\n    display: none;\r\n}\r\n.userDropDownMobileOptions a{\r\n    color:#fff;\r\n}\r\n\r\n/*Left Nav Ends*/\r\n\r\n/*Mobile Sidemenu */\r\n#mob_sidemenu{display:none;}\r\n.afix_top{\r\n    top:0;\r\n    width:250px;\r\n}\r\n.sidebar img{\r\n    width:67%;\r\n    height: 30px;\r\n}\r\n.sidebar-logo{\r\n    float:left;\r\n    clear:left;\r\n    border-bottom:1px solid #999;\r\n    padding-bottom:10px;\r\n    margin-top:21px;\r\n}\r\n.mob_close{\r\n    font-size:23px !important;\r\n    margin-top:10px;\r\n}\r\n.side_menu ul{\r\n    list-style:none;\r\n    margin:0;\r\n    padding:0px;\r\n}\r\n.side_menu ul li{\r\n    float:left;\r\n    clear:left;\r\n    padding:20px 10px;\r\n}\r\n.side_menu ul li a{\r\n    color:#ccc;\r\n}\r\n.side_menu ul li:hover,.side_menu ul li:focus,.side_menu ul li.active{\r\n    display:block;\r\n    width:100%;\r\n    background-color:#4e4e4e;\r\n    color:#333;\r\n}\r\n.side_menu ul li a i{\r\n    margin-right:12px;\r\n}\r\nul.dash_submenu{\r\n    display:none;\r\n    float:left;\r\n    clear:left;\r\n    width:100%;\r\n}\r\nul.dash_submenu li.active{\r\n    box-shadow:none;\r\n    background:#666;\r\n    padding:9px 0px 8px 47px;\r\n}\r\nul.dash_submenu li.active a{color:#fff;}\r\nul.dash_submenu li{\r\n    padding:9px 0px 8px 47px;\r\n    border-bottom:1px dotted;\r\n    float:left;\r\n    clear:left;\r\n    width:100%;\r\n}\r\n/*Mobile Sidemenu Ends*/\r\n", ""]);

// exports


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n    <header [name]=\"userName\"></header>\r\n    <leftnav></leftnav>\r\n    <router-outlet></router-outlet>\r\n</div>\r\n\r\n\r\n"

/***/ }),
/* 385 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-x-0 bg-ssblue\">\r\n  <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n    <div class=\"pull-left color-white\">\r\n      <h2 class=\"m-y-10\">{{title}}</h2>\r\n    </div>\r\n    <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n      <li> <i class=\"fa {{icon}} fa-fw color-white\"></i></li>\r\n      <li><a  class=\"color-white\" href=\"javascript:void(0)\">{{secondtitle}}</a></li>\r\n    </ol>\r\n  </div>\r\n  <div class=\"col-xs-12 col-sm-6 p-r-20\">\r\n    <div id=\"reportrange\" class=\"daterange pull-right m-y-10\">\r\n      <div class=\"input-group\">\r\n        <input type=\"text\" class=\"form-control cus-input\" title=\"Calender\" readonly>\r\n        <span class=\"input-group-btn\">\r\n        <button class=\"btn btn-secondary\" type=\"button\" title=\"Calender\">\r\n        <i class=\"glyphicon glyphicon-calendar fa fa-calendar\"></i>\r\n        </button>\r\n        </span>\r\n      </div>\r\n    </div> \r\n   <button (click)=\"updatePreference()\" class=\"updateDefaultTimePeriod\" title=\"Set As Default\">Set As Default &nbsp;</button>\r\n  </div>\r\n</div>\r\n"

/***/ }),
/* 386 */
/***/ (function(module, exports) {

module.exports = "<modal #examTypeCreatedPopUp [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Save ExamType</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Exam added successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #cancelExamPopUp [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Cancel Create ExamType</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Please Confirm Cancellation\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelExamType()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmExamType()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #examTypeModifyPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Cancel update ExamType</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    There may be unsaved data. Please confirm to save changes before navigating\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelExamType()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmExamType()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #examTypeModifyToast [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Update ExamType</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Changes saved successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<!--Create Exam Type Page -->\r\n\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-15\">\r\n  <!-- Breadcrumbs -->\r\n  <div class=\"row m-x-0 bg-ssblue\">\r\n    <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n      <div class=\"pull-left color-white\">\r\n        <h2 class=\"m-y-10\">Admin</h2>\r\n      </div>\r\n      <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n        <li><i class=\"fa fa-lg fa-list-alt fa-fw color-white\"></i></li>\r\n        <li class=\"color-white\"><a routerLink=\"/examtypelist\" class=\"color-white\">Exam Types</a></li>\r\n        <li class=\"color-white\" *ngIf=\"formState == 'Modify'\">Modify Exam Type</li>\r\n        <li class=\"color-white\" *ngIf=\"formState == 'Add'\">Create New Exam type</li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <!-- Breadcrumbs Ends -->\r\n\r\n  <div class=\"row m-t-15 m-x-0\">\r\n  <div class=\"col-xs-12\">\r\n    <form #createExamType=\"ngForm\" novalidate>\r\n    <div class=\"col-md-offset-2 col-md-8 b-1-lightgray bg-white\">\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-6 col-md-3\">\r\n          <h3 *ngIf=\"formState == 'Add'\">New Exam Type</h3>\r\n          <h3 *ngIf=\"formState == 'Modify'\">Modify Exam Type</h3>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-x-0 m-t-5\">\r\n      <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\">\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Exam Type Name<span class=\"color-red\">*</span></label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <input type=\"text\" class=\"form-control\" (keypress)=\"validateAlpha($event);\" oncopy=\"return false\" onpaste=\"return false\"  [(ngModel)]=\"examTypeName\" name=\"examTypeName\" maxlength=\"50\" (focus)=\"removeExamtypeNameError()\" (blur) = \"formState == 'Modify'?true:getExamtypeName()\" [readonly] = \"formState == 'Modify'?true:false\">\r\n              <div [hidden]=\"!examTypeRequired\" class=\"alert alert-danger alertRequired\">Exam type name required\r\n              </div>\r\n              <div [hidden]=\"!examTypePresent\" class=\"alert alert-danger\">\r\n              Exam type already exists\r\n              </div>\r\n              <div [hidden]=\"!examTypeError\" class=\"alert alert-danger\">\r\n              Exam type already exists\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Exam Type Description</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <textarea class=\"form-control\" [(ngModel)]=\"examTypeDesc\" name=\"examTypeDesc\" maxlength=\"100\"></textarea>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Exam name from modality</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <div class=\"col-xs-10 col-md-10 p-x-0\">\r\n                <input type=\"text\"  class=\"form-control\" [(ngModel)]=\"examTypeAlias\" name=\"examTypeAlias\" #title=\"ngModel\" />\r\n              </div>\r\n              <div class=\"col-xs-2 col-md-2 p-r-10\">\r\n                <i class=\"fa fa-plus-circle color-primary fw-20 m-t-5 fa-close\" aria-hidden=\"true\" (click)=\"addType()\"></i>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-xs-12 p-x-0\">\r\n              <div class=\"col-xs-12 form-group p-x-0 p-t-10\">\r\n                <div class=\"col-xs-6 col-md-4\"></div>\r\n                <div class=\"col-xs-6 col-md-6\" >\r\n                  <ul class=\"form-control fa-border\"> <li *ngFor=\"let examname of examAliasNames; let i = examname\" [attr.data]=\"i\">\r\n                  <span class=\"fa fa-times color-primary fa-close\" aria-hidden=\"true\" (click)=\"deleteType(examname)\"></span><span>{{examname}}</span></li></ul>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Tags for exam type</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <div class=\"col-xs-10 col-md-10 p-x-0\">\r\n                <input type=\"text\"  class=\"form-control\" [(ngModel)]=\"tagNames\" name=\"tagNames\" #title=\"ngModel\" />\r\n              </div>\r\n              <div class=\"col-xs-2 col-md-2 p-r-10\">\r\n                <i class=\"fa fa-plus-circle color-primary fw-20 m-t-5 fa-close\" aria-hidden=\"true\" (click)=\"addTag()\"></i>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-xs-12 p-x-0\">\r\n              <div class=\"col-xs-12 form-group p-x-0 p-t-10\">\r\n                <div class=\"col-xs-6 col-md-4\"></div>\r\n                <div class=\"col-xs-6 col-md-6\" >\r\n                  <ul class=\"form-control fa-border\"> <li  *ngFor=\"let tag of tags; let i = tag\" [attr.data]=\"i\">\r\n                  <i aria-hidden=\"true\"></i><span >{{tag}}</span></li></ul>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Worksheets</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <ng-select [(ngModel)]=\"worksheets\" [items]=\"templateitems\" [active]=\"examtype.worksheets\" id=\"worksheets\" name=\"worksheets\"\r\n              [multiple]=\"true\"\r\n              (data) = \"refreshValue($event)\"\r\n              (selected)=\"selected($event)\"\r\n              (removed)=\"removed($event)\"\r\n              ngDefaultControl></ng-select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>CPT Codes (Mandatory)</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <ng-select [(ngModel)]=\"manCptCodes\" [items]=\"cptManCode\" [active]=\"examtype.manCptCode\" id=\"manCptCode\" name=\"manCptCode\"\r\n              [multiple]=\"true\"\r\n              (data)=\"refreshCptManValue($event)\"\r\n              (selected)=\"selected($event)\"\r\n              (removed)=\"removed($event)\"\r\n              ngDefaultControl ></ng-select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>CPT Codes (Optional)</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\" >\r\n              <ng-select [(ngModel)]=\"optCptCodes\" [items]=\"cptManCode\" [active] = \"examtype.optCptCode\"id=\"optCptCode\" name=\"optCptCode\"\r\n              [multiple]=\"true\" (data)=\"refreshCptOptValue($event)\"\r\n              (selected)=\"selected($event)\"\r\n              (removed)=\"removed($event)\"\r\n              ngDefaultControl></ng-select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 m-b-10 p-x-0\">\r\n          <div class=\"col-xs-offset-3 col-md-offset-4\">\r\n            <button class=\"btn btn-primary m-l-10\" (click)=\"cancelExamTypePopup()\">Cancel</button>\r\n            <button type=\"submit\" (click)=\"doSave(createExamType.value)\"class=\"btn btn-primary\" *ngIf=\"formState == 'Add'\">Save</button>\r\n            <button type=\"submit\" (click)=\"doSave(createExamType.value)\"class=\"btn btn-primary\" *ngIf=\"formState == 'Modify'\">Modify</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      </div>\r\n    </div>\r\n    </form>\r\n  </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 387 */
/***/ (function(module, exports) {

module.exports = "<modal #roleAddedPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Add Role</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    New Role created successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #roleUpdatePopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Update Role</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Role changes saved successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<!--New Role Creation-->\r\n\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-10\">\r\n  <!-- Breadcrumbs -->\r\n  <div class=\"row m-x-0 bg-ssblue\">\r\n    <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n      <div class=\"pull-left color-white\">\r\n        <h2 class=\"m-y-10\">Roles</h2>\r\n      </div>\r\n      <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n        <li><i class=\"fa fa-lg fa-user-circle color-white\"></i></li>\r\n        <li class=\"color-white\"><a routerLink=\"/rolelist\" class=\"color-white\">Roles List</a></li>\r\n        <li *ngIf=\"formState == 'Add'\" class=\"color-white\">New Role</li>\r\n        <li *ngIf=\"formState == 'Modify'\" class=\"color-white\">View or Modify Role</li>\r\n        <li *ngIf=\"formState == 'Clone'\" class=\"color-white\">Clone Role</li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <!-- Breadcrumbs Ends -->\r\n\r\n  <div class=\"row m-t-15 m-x-0\">\r\n  <div class=\"col-xs-12\">\r\n    <form novalidate #createRoleForm=\"ngForm\" novalidate>\r\n    <div class=\"col-md-offset-2 col-md-8 b-1-lightgray bg-white\">\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-12\">\r\n          <h3 *ngIf=\"formState == 'Add'\">New Role</h3>\r\n          <h3 *ngIf=\"formState == 'Modify'\">View or Modify Role</h3>\r\n          <h3 *ngIf=\"formState == 'Clone'\">Clone Role</h3>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-x-0 m-t-5\">\r\n        <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\"></div>\r\n      </div>\r\n    <div class=\"row m-x-0 m-t-5\">\r\n      <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\">\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Role Name <span class=\"color-red\">*</span></label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <input type=\"text\" class=\"form-control\" id=\"roleName\" required [(ngModel)]=\"roleData.roleName\" (keypress)=\"validateAlpha($event);\" (focus)=\"removeRoleNameError()\" name=\"roleName\" #roleName=\"ngModel\" maxlength=\"50\" (blur)=\"formState == 'Modify'?true:getRoleName(roleName.value)\"\r\n              [readonly] = \"formState == 'Modify'?true:false\" required>\r\n              <div [hidden]=\"roleNameExceeds || (!createRoleForm.submitted)\" class=\"alert alert-danger alertRequired\">Role Name can be maximum of 50 characters\r\n              </div>\r\n              <div [hidden]=\"(roleName.valid || (!createRoleForm.submitted))|| roleNameExceeds == false\" class=\"alert alert-danger alertRequired\">Please provide Role name\r\n              </div>\r\n              <div [hidden]=\"roleNameValid\" class=\"alert alert-danger alertRequired\">Special characters not allowed\r\n              </div>\r\n              <div [hidden]=\"!roleNameExists || !roleName.valid || roleNameExceeds == false\" class=\"alert alert-danger\">\r\n              Role name already exists in system. Please provide a different Role name\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Role Description <span class=\"color-red\">*</span></label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <textarea class=\"form-control\" id=\"description\" required [(ngModel)]=\"roleData.description\" name=\"description\" #description=\"ngModel\" maxlength=\"255\" required></textarea>\r\n              <div [hidden]=\"description.valid || (!createRoleForm.submitted)\" class=\"alert alert-danger alertRequired\">Please provide Role Description\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Privileges Association<span class=\"color-red\">*</span></label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <ng-select [items]=\"permissionsList\" [active]=\"roleData.permission\" id=\"permissions\" name=\"permissions\" [multiple]=\"true\" (data)=\"refreshValue($event)\" (selected)=\"selectedPermissions($event)\" (removed)=\"removed($event)\" ngDefaultControl></ng-select>\r\n              <div [hidden]=\"permissionExists\" class=\"alert alert-danger alertRequired\">Please choose atleast one Privilege\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Org Level </label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <ng-select [items]=\"organizationsList\" [active]=\"roleData.organization\" id=\"organizations\" name=\"organizations\" [multiple]=\"true\" (data)=\"refreshOrgValue($event)\" (selected)=\"selectedOrganization($event)\" (removed)=\"removedOrg($event)\" ngDefaultControl></ng-select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 m-b-10 p-x-0\">\r\n        <div class=\"col-xs-offset-4 col-md-offset-4\">\r\n          <button type=\"button\" id=\"cancel\" class=\"btn btn-primary m-l-10\" (click)=\"cancelPopup(createRoleForm.value)\">Cancel</button>\r\n          <button type=\"submit\" id=\"save\" class=\"btn btn-primary\" (click)=\"formState == 'Clone'?duplicateRoleNameCheck(createRoleForm.value,createRoleForm.valid):doSave(createRoleForm.value,createRoleForm.valid)\">Save</button>\r\n        </div>\r\n        </div>\r\n      </div>\r\n      </div>\r\n    </div>\r\n    </form>\r\n  </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 388 */
/***/ (function(module, exports) {

module.exports = "<modal #userAddedPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Add User</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n      User added successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #cancelUserPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Cancel user profile</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Please Confirm Cancellation\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelUser()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmUserCancel()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #userUpdatePopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Update User</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n      Changes saved successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #userModifyPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Cancel update user profile</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    There may be unsaved data. Please confirm to save changes before navigating\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelchanges()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"updatechanges()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<!-- User Creation Page -->\r\n\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-10\">\r\n  <!-- Breadcrumbs -->\r\n  <div class=\"row m-x-0 bg-ssblue\">\r\n    <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n      <div class=\"pull-left color-white\">\r\n        <h2 class=\"m-y-10\">User Profile</h2>\r\n      </div>\r\n      <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n        <li><i class=\"fa fa-lg fa-user-circle color-white\"></i></li>\r\n        <li class=\"color-white\"><a routerLink=\"/userlist\" class=\"color-white\">User Profiles</a></li>\r\n        <li *ngIf=\"formState == 'Add'\" class=\"color-white\">New Profile</li>\r\n        <li *ngIf=\"formState == 'Modify'\" class=\"color-white\">View or Modify Profile</li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <!-- Breadcrumbs Ends -->\r\n\r\n  <div class=\"row m-t-15 m-x-0\">\r\n  <div class=\"col-xs-12\">\r\n    <form novalidate  #createUserForm=\"ngForm\" novalidate>\r\n    <div class=\"col-md-offset-2 col-md-8 b-1-lightgray bg-white\">\r\n    <div class=\"row m-x-0\">\r\n    <div class=\"col-xs-12\">\r\n    <h3 *ngIf=\"formState == 'Add'\">New Profile</h3>\r\n    <h3 *ngIf=\"formState == 'Modify'\">View or Modify Profile</h3>\r\n    </div>\r\n    </div>\r\n    <div class=\"row m-x-0 m-t-5\">\r\n    <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\">\r\n    <!--div class=\"col-xs-12 col-sm-3 col-md-2 p-x-0\">\r\n    <span class=\"newuser-avatar\"><img src=\"/assets/images/default-user-image.png\"></span>\r\n    </div>\r\n    <div class=\"col-xs-12 col-md-10 p-x-0\">\r\n    <div class=\"row m-x-0\"><h3 class=\"m-y-0\">Upload Avatar</h3></row></div>\r\n    <div class=\"row m-x-0\"><span>Drag the image file here or Browse for the image</span></row></div>\r\n    </div-->\r\n    <!--div class=\"col-sm-offset-4 col-xs-12 col-sm-3 col-md-2 p-x-0 align-center\">\r\n    <span class=\"newuser-avatar\"><img src=\"/assets/images/default-user-image.png\"></span>\r\n    </div-->\r\n    </div>\r\n    </div>\r\n    <div class=\"row m-x-0 m-t-5\">\r\n    <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\">\r\n    <div class=\"col-xs-12 p-x-0\">\r\n    <div class=\"col-xs-12 form-group\">\r\n    <div class=\"col-xs-6 col-md-3\">\r\n    <label>Title <span class=\"color-red\">*</span></label>\r\n    </div>\r\n    <div class=\"col-xs-6 col-md-6\">\r\n\r\n    <select class=\"form-control\" id=\"title\" required [(ngModel)]=\"user.title\" name=\"title\" #title=\"ngModel\" (change)=\"onChange($event)\">\r\n    <option *ngFor=\"let item of selectOption\" [value]=\"item.value\" [disabled]=\"item.value=='Select'\">{{item.value}}</option>\r\n    </select>\r\n    <div [hidden]=\"titleExists\" class=\"alert alert-danger alertRequired\">Title required</div>\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class=\"col-xs-12 p-x-0\">\r\n    <div class=\"col-xs-12 form-group\">\r\n    <div class=\"col-xs-6 col-md-3\">\r\n    <label>Prefix</label>\r\n    </div>\r\n    <div class=\"col-xs-6 col-md-6\">\r\n    <select class=\"form-control\" id=\"prefix\" name=\"prefix\"  [(ngModel)]=\"user.prefix\">\r\n    <option *ngFor=\"let item of selectOptionPrefix\" [value]=\"item.value\" [disabled]=\"item.value=='Select'\">{{item.value}}</option>\r\n    </select>\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class=\"col-xs-12 p-x-0\">\r\n    <div class=\"col-xs-12 form-group\">\r\n    <div class=\"col-xs-6 col-md-3\">\r\n    <label>First Name <span class=\"color-red\">*</span></label>\r\n    </div>\r\n    <div class=\"col-xs-6 col-md-6\">\r\n    <input type=\"text\" class=\"form-control\" (keypress)=\"validateAlpha($event);\" id=\"firstName\" required [(ngModel)]=\"user.firstName\"\r\n    name=\"firstName\" #firstName=\"ngModel\" maxlength=\"25\">\r\n    <div [hidden]=\"firstName.valid || (!createUserForm.submitted)\" class=\"alert alert-danger alertRequired \">First Name required\r\n    </div>\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class=\"col-xs-12 p-x-0\">\r\n    <div class=\"col-xs-12 form-group\">\r\n    <div class=\"col-xs-6 col-md-3\">\r\n    <label>Last Name <span class=\"color-red\">*</span></label>\r\n    </div>\r\n    <div class=\"col-xs-6 col-md-6\">\r\n    <input type=\"text\" class=\"form-control\" (keypress)=\"validateAlpha($event);\" id=\"lastName\" required [(ngModel)]=\"user.lastName\" name=\"lastName\" #lastName=\"ngModel\" maxlength=\"35\">\r\n    <div [hidden]=\"lastName.valid || (!createUserForm.submitted)\" class=\"alert alert-danger alertRequired\">Last Name required\r\n    </div>\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class=\"col-xs-12 p-x-0\">\r\n    <div class=\"col-xs-12 form-group\">\r\n    <div class=\"col-xs-6 col-md-3\">\r\n    <label>Username <span class=\"color-red\">*</span></label>\r\n    </div>\r\n    <div class=\"col-xs-6 col-md-6\">\r\n    <input type=\"text\" class=\"form-control\" id=\"userName\" required [(ngModel)]=\"user.userName\" name=\"userName\" #userName=\"ngModel\" maxlength=\"20\" (blur) = \"formState == 'Modify'?true:getUser(userName.value)\" [readonly] = \"formState == 'Modify'?true:false\" (focus)=\"removeUserNameError()\">\r\n\r\n    <div [hidden]=\"userName.valid || (!createUserForm.submitted)\" class=\"alert alert-danger alertRequired\">\r\n    User Name required\r\n    </div>\r\n    <div [hidden]=\"!userExists || !userName.valid\" class=\"alert alert-danger \">\r\n    User with this username already available in system. Please provide a different username\r\n    </div>\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class=\"col-xs-12 p-x-0\">\r\n    <div class=\"col-xs-12 form-group\">\r\n    <div class=\"col-xs-6 col-md-3\">\r\n    <label>Mobile Number</label>\r\n    </div>\r\n    <div class=\"col-xs-6 col-md-6 clearfix\">\r\n    <input type=\"text\" class=\"form-control pull-left\" (keypress)=\"validateNum($event);\" id=\"phoneCountryCode\" [(ngModel)]=\"user.phoneCountryCode\" name=\"phoneCountryCode\" #phoneCountryCode=\"ngModel\" maxlength=\"3\">\r\n    <input type=\"text\" class=\"form-control pull-left m-l-5\" (keypress)=\"validateNum($event);\" id=\"phoneStateCode\" [(ngModel)]=\"user.phoneStateCode\" name=\"phoneStateCode\" #phoneStateCode=\"ngModel\" maxlength=\"3\"><span id=\"spanHifen\" class=\"pull-left m-x-3\"> - </span>\r\n    <input type=\"text\" class=\"form-control pull-left\" (keypress)=\"validateNum($event);\" id=\"phone\" [(ngModel)]=\"user.phone\" name=\"phone\" #phone=\"ngModel\" maxlength=\"7\">\r\n    </div>\r\n    </div>\r\n    </div>\r\n    <div class=\"col-xs-12 p-x-0\">\r\n    <div class=\"col-xs-12 form-group\">\r\n    <div class=\"col-xs-6 col-md-3\">\r\n    <label>Email<span class=\"color-red\">*</span></label>\r\n    </div>\r\n    <div class=\"col-xs-6 col-md-6\">\r\n    <input type=\"text\" class=\"form-control\" id=\"email\" required [(ngModel)]=\"user.email\" name=\"email\" #email=\"ngModel\" maxlength=\"100\" (blur) = getEmailCheck(email.value) (focus)=\"removeAlert()\">\r\n    <div [hidden]=\"!invalidEmail\" class=\"alert alert-danger\">\r\n    Please enter a valid Email ID\r\n    </div>\r\n    <div [hidden]=\"!email.valid || !emailExists\" class=\"alert alert-danger\">\r\n    User with this email ID already available in system. Please provide a different email ID\r\n    </div>\r\n    <div [hidden]=\"email.valid || (!createUserForm.submitted)\" class=\"alert alert-danger alertRequired\">Email required\r\n    </div>\r\n    </div>\r\n    </div>\r\n    </div>\r\n\r\n      <div class=\"col-xs-12 p-x-0\">\r\n        <div class=\"col-xs-12 form-group\">\r\n          <div class=\"col-xs-6 col-md-3\">\r\n            <label>Privileges</label>\r\n          </div>\r\n          <div class=\"col-xs-6 col-md-6 clearfix\">\r\n            <ng-select id=\"privileges\" name=\"privileges\" [multiple]=\"true\" [items]=\"userPrivilegeList\"\r\n            [active]=\"user.activePrivilegeList\"  (data)=\"refreshPrivilege($event)\"  ngDefaultControl></ng-select>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-xs-12 p-x-0\">\r\n        <div class=\"col-xs-12 form-group\">\r\n          <div class=\"col-xs-6 col-md-3\">\r\n            <label>Roles</label>\r\n          </div>\r\n          <div class=\"col-xs-6 col-md-6 clearfix\">\r\n            <ng-select id=\"roles\" name=\"roles\" [multiple]=\"true\" [items]=\"userRoleList\"\r\n            [active]=\"user.activeRoleList\" (data)=\"refreshRole($event)\"></ng-select>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-xs-12 p-x-0\">\r\n        <div class=\"col-xs-12 form-group\">\r\n          <div class=\"col-xs-6 col-md-3\">\r\n            <label>User Group</label>\r\n          </div>\r\n          <div class=\"col-xs-6 col-md-6 clearfix\">\r\n            <ng-select id=\"usergroup\" name=\"usergroup\" [multiple]=\"true\" [items]=\"userGroupList\"\r\n            [active]=\"user.activeGroupList\" (data)=\"refreshUserGroup($event)\"></ng-select>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-xs-12 p-x-0\">\r\n        <div class=\"col-xs-12 form-group\">\r\n          <div class=\"col-xs-6 col-md-3\">\r\n            <label>Org Level</label>\r\n          </div>\r\n          <div class=\"col-xs-6 col-md-6 clearfix\">\r\n            <ng-select id=\"organizations\" name=\"organizations\" [multiple]=\"true\" [items]=\"orgList\"\r\n            [active]=\"user.activeOrgList\" (data)=\"refreshOrgValue($event)\"></ng-select>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-xs-12 m-b-10 p-x-0\">\r\n        <div class=\"col-xs-offset-4 col-md-offset-4\">\r\n          <button type=\"button\" class=\"btn btn-primary m-l-10\" (click)=\"cancelPopup()\">Cancel</button>\r\n          <button type=\"submit\" class=\"btn btn-primary\" (click)=\"doSave(createUserForm.value,createUserForm.valid,false)\">Save</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    </div>\r\n    </div>\r\n    </form>\r\n  </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 389 */
/***/ (function(module, exports) {

module.exports = "<modal #userGroupAddedPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Add User Group</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    New User Group created successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #userGroupupdatePopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Update User Group</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    User Group changes saved successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #cancelUsergroupPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Cancel user group</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Please Confirm Cancellation\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelUsergroup()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmUsergroupCancel()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #userGroupModifyPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Cancel update usergroup details</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    There may be unsaved data. Please confirm to save changes before navigating\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelchanges()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"updatechanges()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<!-- User Group Creation Page -->\r\n\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-10\">\r\n  <!-- Breadcrumbs -->\r\n  <div class=\"row m-x-0 bg-ssblue\">\r\n  <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n  <div class=\"pull-left color-white\">\r\n  <h2 class=\"m-y-10\">User Group</h2>\r\n  </div>\r\n  <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n  <li>\r\n  <i class=\"fa fa-lg fa-users color-white\"></i>\r\n  </li>\r\n  <li class=\"color-white\"><a routerLink=\"/usergrouplist\" class=\"color-white\">User Groups</a></li>\r\n  <li *ngIf=\"formState == 'Add'\" class=\"color-white\">New User Group Creation</li>\r\n  <li *ngIf=\"formState == 'Modify'\" class=\"color-white\">View or Modify User Group</li>\r\n  </ol>\r\n  </div>\r\n  </div>\r\n  <!-- Breadcrumbs Ends -->\r\n\r\n  <div class=\"row m-t-15 m-x-0\">\r\n  <div class=\"col-xs-12\">\r\n    <form novalidate  #createUserGroupForm=\"ngForm\" novalidate>\r\n    <div class=\"col-md-offset-2 col-md-8 b-1-lightgray bg-white\">\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-12\">\r\n          <h3 *ngIf=\"formState == 'Add'\">New User Group</h3>\r\n          <h3 *ngIf=\"formState == 'Modify'\">View or Modify User Group</h3>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-x-0 m-t-5\">\r\n      <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\">\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>User Group Name<span class=\"color-red\">*</span></label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <input type=\"text\" class=\"form-control\" id=\"groupName\" required [(ngModel)]=\"userGroup.groupName\" (keypress)=\"validateAlpha($event);\" (focus)=\"removeGroupNameError()\" name=\"groupName\" #groupName=\"ngModel\" maxlength=\"50\" (blur) = \"formState == 'Modify'?true:getUserGroupName(groupName.value)\" [readonly] = \"formState == 'Modify'?true:false\" required>\r\n              <div [hidden]=\"groupName.valid || (!createUserGroupForm.submitted)\" class=\"alert alert-danger alertRequired\">Please provide User Group name\r\n              </div>\r\n              <div [hidden]=\"groupNamenotValid\" class=\"alert alert-danger alertRequired\">Special characters not allowed\r\n              </div>\r\n              <div [hidden]=\"!groupNameExists || !groupName.valid\" class=\"alert alert-danger\">User Group name already exists in system. Please provide a different User Group name\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>User Group Description<span class=\"color-red\">*</span></label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <textarea class=\"form-control\" id=\"description\" required [(ngModel)]=\"userGroup.description\" name=\"description\" #description=\"ngModel\" maxlength=\"255\" required></textarea>\r\n              <div [hidden]=\"description.valid || (!createUserGroupForm.submitted)\" class=\"alert alert-danger alertRequired\">Please provide User Group Description\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>User List</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6\">\r\n              <ng-select [items]=\"items\" [active]=\"userGroup.users\" id=\"users\" name=\"users\"\r\n              [multiple]=\"true\"\r\n              (data)=\"refreshValue($event)\"\r\n              (selected)=\"selected($event)\"\r\n              (removed)=\"removed($event)\" ngDefaultControl></ng-select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Roles</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6 clearfix\">\r\n              <ng-select id=\"roles\" name=\"roles\" [items]=\"userRoleList\" [active]=\"userGroup.roles\"   [multiple]=\"true\" (data)=\"refreshRole($event)\"></ng-select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Privileges</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6 clearfix\">\r\n              <ng-select id=\"privileges\" name=\"privileges\" [items]=\"permissionList\" [active]=\"userGroup.permissions\" [multiple]=\"true\" (data)=\"refreshPermission($event)\"></ng-select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-12 form-group\">\r\n            <div class=\"col-xs-6 col-md-4\">\r\n              <label>Org Level</label>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-6 clearfix\">\r\n              <ng-select id=\"organizations\" name=\"organizations\"  [items]=\"organizationList\" [active]=\"userGroup.userOrg\"[multiple]=\"true\" (data)=\"refreshOrgValue($event)\"></ng-select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 m-b-10 p-x-0\">\r\n          <div class=\"col-xs-offset-4 col-md-offset-4\">\r\n            <button type=\"button\" id=\"cancel\" class=\"btn btn-primary\" (click)=\"cancelPopup(createUserGroupForm.value)\">Cancel</button>\r\n            <button type=\"submit\" id=\"save\" class=\"btn btn-primary\" (click)=\"doSave(createUserGroupForm.value,createUserGroupForm.valid,false)\">Save</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      </div>\r\n    </div>\r\n    </form>\r\n  </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 390 */
/***/ (function(module, exports) {

module.exports = "<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-10\">\r\n  <breadcrum title=\"Dashboard\"  secondtitle=\"My Tasks\" icon=\"fa-pie-chart\" (durationChange)=\"onDurationChange($event);\"></breadcrum>\r\n  <div class=\"row m-t-15 m-x-0\">\r\n    <div class=\"graphical-summary col-xs-12 p-x-0\">\r\n      <graphical-summary *ngFor=\"let data of graphicalSummaryData.results\" [data]=\"data\" [selectedDuration]=\"selectedDuration\" (widgetSelected)=\"onWidgetSelection($event);\"></graphical-summary>\r\n    </div>\r\n  </div>\r\n\r\n  <!--  <div class=\"row m-t-15 m-x-0\">\r\n    <div class=\"col-xs-12\">\r\n      <graphical-detail  [labels]=\"graphicalDetailData.result.examtype\" [datasets]=\"graphicalDetailData.result.series\"></graphical-detail>\r\n    </div>\r\n  </div> -->\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 391 */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 col-sm-12 col-md-8 p-resize p-l-0\">\r\n<div class=\"panel panel-default\">\r\n  <!-- Heading Starts-->\r\n  <div class=\"panel-heading\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12 align-center fw-18\"><span>Exam Studies Overview</span></div>\r\n    </div>\r\n  </div>\r\n  <!-- Heading Ends -->\r\n  <!-- Content Starts -->\r\n  <div class=\"panel-body\">\r\n    <div class=\"legends row m-x-0 align-center\">\r\n      <div class=\"col-md-offset-2\">\r\n        <div class=\"col-md-2 p-x-0\" *ngFor=\"let series of datasets\">\r\n          <div class=\"col-md-12 p-x-0\">\r\n            <span><i class=\"fa fa-fw fa-circle color-{{series.label | lowercase}}\"></i></span>\r\n            <span>{{series.label}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <canvas baseChart id=\"barChart\" class=\"barChart\"\r\n    [datasets]=\"datasets\"\r\n    [labels]=\"labels\"\r\n    [colors]=\"colors\"\r\n    [chartType]=\"'bar'\"\r\n    [options]=\"options\"\r\n    [legend]=\"false\"\r\n    (chartClick)=\"chartClicked($event)\"></canvas>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 392 */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 col-sm-6 col-md-3 p-0\">\r\n<div class=\"panel panel-default\">\r\n  <!-- Header -->\r\n  <div class=\"panel-heading clearfix\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-12 align-center fw-18\"><span>{{data.type | uppercase}}</span></div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Content -->\r\n  <div class=\"panel-body align-center\">\r\n    <h4 class=\"align-center\" *ngIf=\"selectedDuration.label!='Custom Range'\">{{selectedDuration.label}}</h4>\r\n    <h4 class=\"align-center\" *ngIf=\"selectedDuration.label=='Custom Range'\">{{selectedDuration.start.format('MMM DD,YYYY')}} to {{selectedDuration.end.format('MMM DD,YYYY')}}</h4>\r\n    <h1 class=\"align-center\">{{data.total}}</h1>\r\n    <canvas baseChart class=\"chart\"\r\n    [data]=\"data.value\"\r\n    [labels]=\"data.status\"\r\n    [colors]=\"colors\"\r\n    [legend]=\"false\"\r\n    [chartType]=\"'doughnut'\"\r\n    (chartClick)=\"chartClicked($event)\"></canvas>\r\n    <div class=\"legends row m-x-0 align-left\">\r\n      <div *ngIf=\"data.total != 0\">\r\n        <div class=\"col-md-6 p-x-0\" *ngFor=\"let status of data.status; let i=index\">\r\n          <div class=\"col-md-12 p-x-0\" >\r\n            <span class=\"legend-badge badge bg-{{status}}\">{{data.value[i]}}</span>\r\n            <span>{{status}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Footer -->\r\n  <div class=\"panel-footer bg-ssblue align-center clearfix\">\r\n    <a routerLink=\"/studylist\" [queryParams]=\"{ id: data.id, start:selectedDuration.start, end:selectedDuration.end, label: selectedDuration.label}\" routerLinkActive=\"active\" class=\"fw-18 color-white\">Go To {{data.type}} <i class=\"m-l-5 fa fa-angle-right\"></i></a>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 393 */
/***/ (function(module, exports) {

module.exports = "<modal #confirmDelete [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Delete exam Type</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Are you sure you want to delete this exam type?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"cancelDelete()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"confirmDeleteExamType()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #enableExamtypePopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Enable exam type</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Are you sure you want to Enable this exam type?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelEnable()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmEnable()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #disableExamtypePopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Disable exam type</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Are you sure you want to disable this exam type?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelDisable()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmDisable()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<!-- User List Page -->\r\n\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-15\">\r\n<!-- Breadcrumbs -->\r\n  <div class=\"row m-x-0 bg-ssblue\">\r\n    <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n      <div class=\"pull-left color-white\">\r\n        <h2 class=\"m-y-10\">Admin</h2>\r\n      </div>\r\n      <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n        <li><i class=\"fa fa-lg fa-list-alt fa-fw color-white\"></i></li>\r\n        <li class=\"color-white\"><a routerLink=\"/examtypelist\" class=\"color-white\">Exam types</a></li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <!-- Breadcrumbs Ends -->\r\n\r\n  <div class=\"row m-t-15 m-x-0\">\r\n    <div class=\"col-xs-12\">\r\n      <table id=\"tableExamTypeList\" class=\"display table\">\r\n        <thead>\r\n          <tr>\r\n            <th>Exam Type Name</th>\r\n            <th>Exam Type Description</th>\r\n            <th>Action</th>\r\n          </tr>\r\n        </thead>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 394 */
/***/ (function(module, exports) {

module.exports = "<!--MAST HEAD-->\r\n<div class=\"row m-l-0\">\r\n<div class=\"col-xs-12 masterhead bg-white p-x-0 p-b-5\">\r\n  <div class=\"col-xs-12 col-sm-7 clearfix p-x-0\">\r\n    <!--MAST HEAD LOGO-->\r\n      <div class=\"col-xs-6 col-sm-4 col-md-3 p-logo\">\r\n        <img src=\"/assets/images/blue_logo.png\" alt=\"Logo\" class=\"h-30\">\r\n      </div>\r\n    <!--MAST HEAD LOGO Ends-->\r\n\r\n    <!--Mobile Menu Starts-->\r\n      <div class=\"pull-right p-x-0 visiblie-xs hidden-md hidden-lg hidden-sm\">\r\n        <button class=\"bg-ssblue color-white navbar-toggle user_bar collapsed\" data-target=\"#navbar\" data-toggle=\"collapse\" type=\"button\">\r\n          <i class=\"fa fa-fw fa-align-right text-white\"></i>\r\n        </button>\r\n        <button id=\"overlaymenu\" class=\"bg-ssblue color-white dropdown dropdown-toggle btn-leftmenu\" data-toggle=\"dropdown\" type=\"button\">\r\n          <i class=\"fa fa-fw fa-user text-white\"></i>\r\n        </button>\r\n        <button id=\"mobile_leftmenu\" class=\"bg-ssblue color-white action-right-sidebar-toggle btn-leftmenu\" data-toggle=\"collapse\" type=\"button\">\r\n          <i class=\"fa fa-fw fa-bars text-white\"></i>\r\n        </button>\r\n      </div>\r\n    <!--Mobile Menu Ends-->\r\n  </div>\r\n\r\n  <!--MAST HEAD RIGHT MENU-->\r\n  <div class=\"col-xs-12 col-sm-5 p-x-0\">\r\n  <div class=\"col-xs-12 msthead_menu p-10 lh-35 p-b-0\">\r\n    <ul class=\"pull-right clearfix m-b-0 hidden-xs\">\r\n      <li id=\"alertLi\">\r\n      <a href=\"javascript:void(0)\" class=\"dropdown-toggle user-dropdown p-10\" data-toggle=\"dropdown\"><i class=\"fa fa-lg fa-bell-o\"></i><sup *ngIf= \"unreadAlertCount > 0\" class=\"badge_bg\">{{unreadAlertCount}}</sup></a>{{results}}\r\n        <ul class=\"dropdown-menu hidden-xs alertdrop\" *ngIf= \"alert !=null && alert.length > 0\">\r\n          <div>\r\n            <li class=\"p-y-10 {{alerts.status=='UNREAD'?'bg-white':'bg-lightgray'}}\" *ngFor=\"let alerts of alert\">\r\n              <div class=\"col-sm-12\">\r\n                <div class=\"col-sm-1 p-x-0\">\r\n                  <span (click)=\"updateAlertStatus(alerts.alertId,alerts.status)\"><i class=\"fa fw-15 {{alerts.status=='UNREAD'?'fa-flag':'fa-flag-o'}}\" aria-hidden=\"true\" title=\"{{alerts.status=='UNREAD'?'Unread':'Read'}}\"></i></span>\r\n                </div>\r\n                <div class=\"col-sm-11 p-x-0\">\r\n                  <div class=\"col-sm-12 p-x-0\">\r\n                    <span>{{alerts.message}}</span>\r\n                  </div>\r\n                  <div class=\"col-sm-12 p-x-0\">\r\n                    <span class=\"pull-right\">{{alerts.createdDateTime}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </li>\r\n          </div>\r\n        </ul>\r\n      </li>\r\n      <li class=\"\"><a href=\"javascript:void(0)\" class=\"dropdown-toggle user-dropdown p-10\" data-toggle=\"dropdown\">\r\n      <span *ngIf=\"name?.prefix\">{{name.prefix}}. {{name.firstName}} {{name.lastName}}</span>\r\n      <span *ngIf=\"!name?.prefix\"> {{name.firstName}} {{name.lastName}}</span></a>\r\n        <ul class=\"dropdown-menu hidden-xs userdrop\">\r\n          <li>\r\n            <a href=\"javascript:void(0)\" id=\"logout\"><i class=\"fa fa-sign-out p-r-10\"></i>Log Out</a>\r\n          </li>\r\n          <li class=\"{{ldapConfigEnabled?'hide':'show'}}\">\r\n            <a href=\"javascript:void(0)\" id=\"changePassword\"><i class=\"fa fa-sign-out p-r-10\"></i>Change Password</a>\r\n          </li>\r\n          <li>\r\n            <a routerLink=\"/userpreference\" routerLinkActive=\"active\"   id=\"\"><i class=\"fa fa-sign-out p-r-1\"></i>User Preference</a>\r\n          </li>\r\n        </ul>\r\n    </li>\r\n    </ul>\r\n\r\n    <!-- Mobile Dropdown-->\r\n    <ul class=\"dropdown-menu mob-dropdown hidden-lg hidden-sm hidden-md user-submenu-mobile\">\r\n      <li class=\"userDropDownMobile\">\r\n        <a href=\"javascript:void(0)\" class=\"p-10 color-white\"><span>{{name.prefix}}.{{name.firstName}} {{name.lastName}}</span><!--span class=\"avatar\"><img src=\"/assets/images/default-user-image.png\"></span--></a>\r\n      </li>\r\n      <div class=\"exp-leftnav userDropDownMobileOptions\">\r\n        <ul>\r\n          <li>\r\n            <a href=\"javascript:void(0)\" id=\"logout\"><i class=\"fa fa-sign-out p-r-1\"></i>Log Out</a>\r\n          </li>\r\n          <li class=\"{{ldapConfigEnabled?'hide':'show'}}\">\r\n            <a href=\"javascript:void(0)\" id=\"changePassword\"><i class=\"fa fa-sign-out p-r-1\"></i>Change Password</a>\r\n          </li>\r\n          <li>\r\n            <a routerLink=\"/userpreference\" routerLinkActive=\"active\"  id=\"\"><i class=\"fa fa-sign-out p-r-1\"></i>User Preference</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </ul>\r\n  </div>\r\n  </div>\r\n  <!--MAST HEAD RIGHT MENU Ends-->\r\n</div>\r\n</div>\r\n<!--END MAST HEAD-->\r\n"

/***/ }),
/* 395 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-x-0\">\r\n    <div class=\"col-xs-12 m-x-0 m-t-10\">\r\n        <div id=\"imgviewer-thumbnail\" class=\"\" style=\"height:100px\">\r\n            <ul>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/xr_chest.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/iVizImage_161018_130559_L.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/xr_chest.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/iVizImage_161018_130559_L.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/xr_chest.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/iVizImage_161018_130559_L.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/xr_chest.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/iVizImage_161018_130559_L.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/xr_chest.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/iVizImage_161018_130559_L.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/xr_chest.png\" height=\"100\" width=\"100\"></li>\r\n                <li class=\"pull-left m-l-10 m-t-5\"><img src=\"/assets/images/iVizImage_161018_130559_L.png\" height=\"100\" width=\"100\"></li>\r\n\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),
/* 396 */
/***/ (function(module, exports) {

module.exports = "<div class=\" bg-white\">\r\n  <div class=\"row clearfix m-x-0 p-10\">\r\n    <div class=\"row m-x-0\">\r\n      <h3 class=\"m-t-0\">Patient Details</h3>\r\n    </div>\r\n    <div class=\"row m-x-0\">\r\n      <div class=\"col-xs-12 col-md-9 p-x-0\">\r\n        <div class=\"tab-viewer col-xs-12 col-md-7 p-x-0\">\r\n          <div class=\"row m-x-0\">\r\n            <div class=\"col-xs-4 p-x-0\">\r\n              <label>Patient: </label>\r\n            </div>\r\n            <div class=\"col-xs-8 p-x-0\">\r\n              <span>\r\n                {{patientDetails?.patient?.firstName}}\r\n                {{patientDetails?.patient?.middleName}}\r\n                {{patientDetails?.patient?.lastName}}\r\n              </span>\r\n            </div>\r\n          </div>\r\n          <div class=\"row m-x-0\">\r\n            <div class=\"col-xs-4 p-x-0\">\r\n              <label>Patient ID: </label>\r\n            </div>\r\n            <div class=\"col-xs-8 p-x-0\">\r\n              <span>{{patientDetails?.patient?.id}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"tab-viewer col-xs-12 col-md-3 p-x-0\">\r\n          <div class=\"row m-x-0\">\r\n            <span class=\"label bg-ssblue b-1-ssblue\">{{patientDetails?.patient?.gender}}</span>\r\n          </div>\r\n          <div class=\"row m-x-0 m-t-5\">\r\n            <span class=\"label bg-gray b-1-gray\">{{patientDetails?.patient?.ethnicOrigin}}</span>\r\n          </div>\r\n          <div class=\"row m-x-0 m-t-5\">\r\n            <span class=\"label bg-warning b-1-warning\">{{patientDetails?.patient?.dob}}</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"tab-viewer col-xs-12 col-md-2 p-x-0\">\r\n          <div class=\"row m-x-0\" *ngIf=\"patientDetails?.height\">\r\n            <span class=\"label bg-ssblue b-1-ssblue\">{{patientDetails?.height}}cm</span>\r\n          </div>\r\n          <div class=\"row m-x-0 m-t-5\" *ngIf=\"patientDetails?.weight\">\r\n            <span class=\"label bg-gray b-1-gray\">{{patientDetails?.weight}}lbs</span>\r\n          </div>\r\n          <div class=\"row m-x-0 m-t-5\">\r\n            <span class=\"label bg-warning b-1-warning\">{{patientDetails?.age}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <hr class=\"m-y-0\">\r\n  <div class=\"row m-x-0 p-10\">\r\n    <div class=\"row m-x-0\">\r\n      <div class=\"row m-x-0 b-b-1-lightgray\">\r\n        <h4 class=\"m-t-0\">Patient Data</h4>\r\n      </div>\r\n    </div>\r\n    <div class=\"row m-x-0 m-t-10\">\r\n      <div class=\"row m-x-0 bg-darkgray align-center color-white fw-18 p-5\">\r\n        <span>MR Number: <span>{{patientDetails?.patient?.mrnno}}</span></span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),
/* 397 */
/***/ (function(module, exports) {

module.exports = "<div class=\" bg-white\">\r\n  <div class=\"row clearfix m-x-0 p-10\">\r\n    <div class=\"row m-x-0\">\r\n      <h3 class=\"m-t-0\">Study Details</h3>\r\n    </div>\r\n    <div class=\"row m-x-0\">\r\n      <div class=\"col-xs-12 col-md-9 p-x-0\">\r\n        <div class=\"tab-viewer col-xs-12 p-x-0\">\r\n          <div class=\"row m-x-0\">\r\n            <div class=\"col-xs-3 p-x-0\">\r\n              <label>Patient: </label>\r\n            </div>\r\n            <div class=\"col-xs-9 p-x-0\">\r\n              <span>\r\n                {{patientDetails?.patient?.firstName}}\r\n                {{patientDetails?.patient?.middleName}}\r\n                {{patientDetails?.patient?.lastName}}\r\n              </span>\r\n            </div>\r\n          </div>\r\n          <div class=\"row m-x-0\">\r\n            <div class=\"col-xs-3 p-x-0\">\r\n              <label>Patient ID: </label>\r\n            </div>\r\n            <div class=\"col-xs-9 p-x-0\">\r\n              <span>{{patientDetails?.patient?.id}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <hr class=\"m-y-0\">\r\n  <div class=\"row m-x-0 p-10\">\r\n    <div class=\"row m-x-0\">\r\n      <div class=\"row m-x-0 b-b-1-lightgray\">\r\n        <h4 class=\"m-t-0\">Exams Details</h4>\r\n      </div>\r\n    </div>\r\n    <div class=\"row m-x-0 m-t-10\">\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-2 pull-left\">\r\n          <i class=\"fa fa-fw fa-folder-o fa-3x pull-left\"></i>\r\n        </div>\r\n        <div class=\"col-xs-4 fw-15 m-t-10 p-x-0\">\r\n          <span class=\"m-l-20\">{{patientDetails?.studyNo}}</span>\r\n        </div>\r\n        <div class=\"col-xs-6 m-t-10\">\r\n          <label>Study Progress:</label>\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'New'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'Assigned'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Assigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'Pending'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Assigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Pending\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'Signed'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Assigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Pending\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Signed\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'QAUnassigned'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Assigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Pending\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Signed\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Qaunassigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'SubmittedForAttestation'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Assigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Pending\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Signed\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Submitted-for-Attestation\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'Attested'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Assigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Pending\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Signed\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Submitted-for-Attestation\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Attested\" role=\"progressbar\"\r\n              style=\"width:14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'QAAssigned'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Assigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Pending\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Signed\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Qaassigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'QAInProgress'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Assigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Pending\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Signed\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Qaassigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Qainprogress\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"row m-x-0\"\r\n            *ngIf=\"patientDetails && patientDetails?.status == 'Submitted'\">\r\n            <div class=\"progress\">\r\n              <div class=\"progress-bar bg-New\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Assigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Pending\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Signed\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Qaassigned\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Qainprogress\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n              <div class=\"progress-bar bg-Submitted\" role=\"progressbar\"\r\n              style=\"width: 14.2%\" title=\"{{patientDetails?.status}}\"></div>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-7\">\r\n          <label>Study Created Date and Time:</label>\r\n        </div>\r\n        <div class=\"col-xs-5\">\r\n          <span>{{patientDetails?.date| date:'MMM d,y H:mm:ss'}}</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row m-x-0 m-t-10 scroll-335 custom-scrollbar\">\r\n      <div *ngFor=\"let item of patientDetails?.examType;let i = index;\">\r\n        <div *ngFor=\"let items of item\">\r\n          <div class=\"row m-x-0 m-b-10\">\r\n            <div class=\"col-xs-6 col-md-3\">\r\n              <div class=\"row m-x-0\"><label>Study Type</label></div>\r\n              <div class=\"row m-x-0\"><span class=\"label color-white bg-gray b-1-gray\">{{patientDetails?.studyType}}</span></div>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-3\">\r\n              <div class=\"row m-x-0\"><label>Exam Type</label></div>\r\n              <div class=\"row m-x-0\"><span class=\"label bg-examtype\"><span>{{items?.examtype}}</span></span>  </div>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-3\">\r\n              <div class=\"row m-x-0\"><label>Images</label></div>\r\n              <div class=\"row m-x-0\"><span><span>{{patientDetails?.Images}}</span></span>  </div>\r\n            </div>\r\n            <div class=\"col-xs-6 col-md-3\">\r\n              <div class=\"row m-x-0\"><label>Clips</label></div>\r\n              <div class=\"row m-x-0\"><span><span></span></span>  </div>\r\n            </div>\r\n          </div>\r\n        <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-12 col-md-6\">\r\n        <div class=\"row m-x-0\"><label>Tag</label></div>\r\n        <div class=\"row m-x-0\">\r\n        <span class=\"label color-white bg-warning b-1-warning tagscss\" *ngFor=\"let tag of patientDetails?.tags\">{{tag}}</span>\r\n        </div>\r\n        </div>\r\n        </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-x-0 m-t-10\">\r\n        <div class=\"col-xs-12 col-md-7 p-x-0\">\r\n          <div class=\"row m-x-0\">\r\n            <div class=\"col-xs-7\"><label>POC Doctor:</label></div>\r\n            <div class=\"col-xs-5 p-x-0\">\r\n              <span>{{patientDetails?.assignedUser[0]?.prefix}}\r\n                    {{patientDetails?.assignedUser[0]?.firstName}}\r\n                    {{patientDetails?.assignedUser[0]?.middleName}}\r\n                    {{patientDetails?.assignedUser[0]?.lastName}}\r\n              </span>\r\n            </div>\r\n          </div>\r\n          <div class=\"row m-x-0\">\r\n            <div class=\"col-xs-7\"><label>Department:</label></div>\r\n            <div class=\"col-xs-5 p-x-0\"><span>{{patientDetails?.department}}</span></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 col-md-5 p-x-0 p-5 b-1-lightgray\">\r\n          <div class=\"col-xs-7 p-x-0\">\r\n            <div class=\"col-xs-12 p-x-0\">\r\n              <label>Device</label>\r\n            </div>\r\n            <div class=\"col-xs-12 p-x-0\">\r\n              <span>{{patientDetails?.modality}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),
/* 398 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row clearfix bg-ssblue m-x-0\">\r\n<div class=\"col-xs-12 pull-left p-x-0\">\r\n  <div class=\"col-xs-12 pull-left p-x-0\">\r\n    <tabs>\r\n      <tab tabIcon=\"fa fa-address-card-o fw-15\">\r\n        <!--  patient-details  -->\r\n        <patient-details [patientDetails]=\"patientDetails\"></patient-details>\r\n      </tab>\r\n    <tab tabIcon=\"fa fa-newspaper-o fw-15\">\r\n      <!--  Study-Details -->\r\n      <study-details [patientDetails]=\"patientDetails\"></study-details>\r\n    </tab>\r\n    </tabs>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 399 */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-10\">\r\n  <!-- Breadcrumbs -->\r\n  <div class=\"row m-x-0\">\r\n    <div class=\"col-xs-12 p-l-15 bg-ssblue\">\r\n      <div class=\"pull-left color-white\">\r\n        <h2 class=\"m-y-10\">Studies</h2>\r\n      </div>\r\n      <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n        <li><i class=\"color-white fa fa-th-list fa-fw\"></i></li>\r\n        <li><a class=\"color-white\" routerLink=\"/studylist\" href=\"javascript:void(0)\">Study List</a></li>\r\n        <li  *ngIf=\"viewerDetail?.studyNo \" class=\"color-white\">{{viewerDetail?.studyNo }} - {{viewerDetail?.date| date:'MMM d,y H:mm:ss'}}</li>\r\n        <li  *ngIf=\"!viewerDetail?.studyNo\" class=\"color-white\">{{viewerDetail?.date| date:'MMM d,y H:mm:ss'}}</li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <!-- Breadcrumbs Ends -->\r\n\r\n  <observations [qaUser]=\"qaUser\" (isWorksheetOpen)='onNotify($event)' [patientDetails]=\"viewerDetail\" [studyId]=\"studyId\" [examType]=\"examType\" [status]=\"status\" [referringPhysicianId]=\"referringPhysicianId\"  [assignedUser]=\"assignedUser\" [attendingUser]=\"attendingUser\" [loginUserId]=\"loginUserId\" (onInprogress)='onWorsheetInprogress($event)' [workflowStatus]=\"workflowStatus\" [attendingWorkflowStatus]=\"attendingWorkflowStatus\" [submitOnSignFlag]=\"submitOnSignFlag\" [qaAttendingWorkflowStatus]=\"qaAttendingWorkflowStatus\"\r\n   \r\n  ></observations>\r\n\r\n  <!--Image Viewer-->\r\n  <div class=\"row m-t-15 m-x-0\">\r\n    <div class=\"col-xs-12 p-x-0\">\r\n      <div class=\"col-xs-12 col-sm-{{isWorksheetOpen?12:8}}\">\r\n        <div class=\"wrksheetMovableContainer\">\r\n          <viewerheader [isWorksheetOpen]=\"isWorksheetOpen\"></viewerheader>\r\n          <patient-image [studyObjectId]=\"studyUid\" [sopInstanceId]=\"objectId\" [wadoLoader]=\"dicomProtocol\"></patient-image>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-xs-12 col-sm-4 p-l-0 {{isWorksheetOpen?'hide':'show'}}\">\r\n        <div class=\" b-1-lightgray m-lmob-10\">\r\n          <imageviewer-details [patientDetails]=\"viewerDetail\"></imageviewer-details>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!--<div class=\"wrksheetMovableContainer\">\r\n    <imageViewer-thumbnail></imageViewer-thumbnail>\r\n  </div>-->\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 400 */
/***/ (function(module, exports) {

module.exports = "\r\n<modal #choosePdfPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Choose Worksheet</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    <div class=\"color\">Select the worksheet to view pdf</div>\r\n    <input type=\"radio\" value=\"worksheetPdfId\" name =\"pdfreport\" [ngModel]=\"pdfreport\" (ngModelChange)=\"onChangeWorksheetPdf('worksheetPdfId',$event)\"> Procedure Report<br><br>\r\n    <input type=\"radio\" value=\"qaPdfId\" name =\"pdfreport\" [ngModel]=\"pdfreport\" (ngModelChange)=\"onChangeWorksheetPdf('qaPdfId',$event)\"> QA Report\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelGeneratePDF()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmGeneratePDF()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #assignstudytoattendingPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Choose Attending</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    <div class=\"color\">Select attending doctor for the study</div>\r\n    <ng-select [allowClear]=\"true\"\r\n    [items]=\"userNamesItems\"\r\n    [disabled]=\"disabled\"\r\n    (data)=\"refreshValue($event)\"\r\n    (selected)=\"selected($event)\"\r\n    (typed)=\"typed($event)\"\r\n    (removed)=\"removed($event)\">\r\n    </ng-select>\r\n    <div [hidden]=\"userNameExists\" class=\"alert alert-danger alertRequired\">Please select a proper Username</div>\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelAssignToAttend()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmAssignToAttend()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #associateWorksheetPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Replace worksheet</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    The current worksheet data will be lost. Do you want to replace the worksheet?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"confirmAssociation()\">Yes</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"cancelAssociation()\">No</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #submitToEMR [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Submit to EMR</h4>\r\n  </modal-header>\r\n  <modal-body>{{statusMsg}}\r\n   <!--Study successfully submitted to EMR  -->\r\n  </modal-body>\r\n</modal>\r\n<modal #createOrderPopUp [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Order Reconciliation</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    No order associated with study. Do you want to create order?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"confirmCreateOrder()\">Yes</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"cancelCreateOrder()\">No</button>\r\n  </modal-footer>\r\n</modal>\r\n<modal #createOrderSuccessToast [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Order Reconciliation </h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    New order created Successfully!\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #cancelOrderToast [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Order Reconciliation </h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Mismatch in order associated with study. Cancelling the existing Order and Create new Order\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #submitForAttestationToast [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Submit for Attestation</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Study successfully submitted for Attestation\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #newAssociationWrksht [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Associate worksheet</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Please confirm to associate worksheet to study\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"confirmAssociation()\">Ok</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"cancelAssociation()\">Cancel</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #worksheetValidationPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Worksheet Validation</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Please provide all the minimum required details before signing the worksheet/study\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"validateWorksheet()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #resetPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Reset worksheet</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Data entered will be lost.Continue Reset?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelReset()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmReset()\">Reset</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #saveSuccessPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Save worksheet</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Saved Successfully!\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #saveSignaturePopUp [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Save worksheet and signature</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Worksheet saved and signed Successfully. To make further changes kindly remove your signature.\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #saveAttestedSignaturePopUp [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Save worksheet and attested signature</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Worksheet auto attested. To make further changes kindly remove your signature.\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #examTypeChangePopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Save changes</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Do you want to save changes for current Worksheet?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelChanges()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmChanges()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #cancelPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Cancel worksheet</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Unsaved data will be lost.Are you sure to cancel worksheet?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelCancel()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmCancel()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #worksheetChangePopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">New worksheet</h4>\r\n  </modal-header>\r\n    <modal-body>\r\n  Current worksheet will be lost.Are you sure you want to replace?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelWorksheetChange()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmWorksheetChange()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #submitWorksheetPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Submit worksheet</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Please confirm to submit worksheet to complete study\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelSubmitChange()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmSubmitChange()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #userlistAndGrouplistPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Assign to QA</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    <div class=\"color\">Please choose user/group for QA</div>\r\n    <ng-select [allowClear]=\"true\"\r\n    [items]=\"items\"\r\n    [disabled]=\"disabled\"\r\n    (data)=\"refreshValue($event)\"\r\n    (selected)=\"selected($event)\"\r\n    (typed)=\"typed($event)\"\r\n    (removed)=\"removed($event)\"\r\n    placeholder=\"Select QA\">\r\n    </ng-select>\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelUserorGroup()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"selectUserorGroup()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #examTypeslistPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Choose ExamType</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    <div class=\"color\">Please choose ExamType</div>\r\n    <ng-select [allowClear]=\"true\"\r\n    [items]=\"examTypesList\"\r\n    (selected)=\"selectedExamTypes($event)\"\r\n    [active]='examTypeslistPopup.visible?null:\"\"'\r\n    (typed)=\"typed($event)\"\r\n    (removed)=\"removed($event)\"\r\n    placeholder=\"Select ExamType\">\r\n    </ng-select>\r\n    <div [hidden]=\"examTypeExists\" class=\"alert alert-danger alertRequired\">Please select ExamType</div>\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelExamType()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmExamType()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #submitToReviewToast [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Submit for Review</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Study submitted for QA Review\r\n  </modal-body>\r\n</modal>\r\n\r\n\r\n<div class=\"worksheet\">\r\n<div class=\"panel panel-default\">\r\n  <div class=\"panel-heading bg-ssblue color-white clearfix p-5\">\r\n    <div class=\"col-xs-2 p-x-0\">\r\n      <span href=\"javascript:void(0)\" class=\"btnWorksheet img-vie-right-menu btn btn-default \"><i class=\"fa fa-list\"></i></span>\r\n    </div>\r\n    <div class=\"col-xs-10 p-x-0 lh-30\">\r\n      <span class=\"color-white fw-15 m-l-10\">Worksheet</span>\r\n    </div>\r\n  </div>\r\n  <observations-tabs>\r\n    <observations-tab tabTitle=\"Demographics\">\r\n      <div class=\"panel-body fw-15\">\r\n        <div class=\"row\">\r\n        <div class=\"col-md-9\">\r\n          <div class=\"row m-x-0\">\r\n            {{patientDetails?.patient.firstName}}\r\n            {{patientDetails?.patient.middleName}}\r\n            {{patientDetails?.patient.lastName}}\r\n          </div>\r\n          <div class=\"row m-x-0 clearfix m-t-5\">\r\n            <span class=\"pull-left label bg-ssblue b-1-ssblue\">{{patientDetails?.patient.gender}}</span>\r\n            <div class=\"pull-left m-l-10\">\r\n              <span class=\"label bg-gray b-1-gray\">{{patientDetails?.patient.dob}}</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        </div>\r\n        <div class=\"row m-y-10\">\r\n          <div class=\"col-md-12\">\r\n            <label>MR Number: <span>{{patientDetails?.patient.mrnno}}</span></label>\r\n          </div>\r\n        </div>\r\n        <hr class=\"m-y-0\">\r\n      </div>\r\n    </observations-tab>\r\n\r\n    <observations-tab tabTitle=\"Exam Report\">\r\n      <div class=\"panel-body fw-15\">\r\n        <div>\r\n          <span *ngFor=\"let exam of examType\"><span  class=\"label bg-examtype m-r-5\" >{{exam[0].examtype}}</span></span>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"ddWorksheet dropdown m-t-10 col-md-12\">\r\n                                    <div class=\"btn-group\" role=\"group\" aria-label=\"Button group with nested dropdown\">\r\n                                                <div class=\"moreClose btn-group\" role=\"group\">\r\n                                                            <button class=\"btn btn-default dropdown-toggle\"\r\n                                                            [disableOn]=\"'studyStatusNum >= StudyStatusEnum.Signed || (loggedInUser != currentUser)'\"\r\n                                                            type=\"button\" data-toggle=\"dropdown\">{{(selectedTemplateName)?selectedTemplateName :'Choose Worksheet' }}\r\n                                                            <span class=\"caret\"></span></button>\r\n<ul class=\"dropdown-menu\">\r\n                                                              <li *ngFor=\"let worksheet of worksheets\" (click)=\"onWorksheetSelection(worksheet.id, worksheet.name); onDropDownSelection(worksheet.name)\" ><a href=\"javascript:void(0)\">{{worksheet.name}}</a></li>\r\n                                                            </ul>\r\n                                                </div>\r\n                                                 <button type=\"button\" class=\"btn btn-primary fontSize h-34\" data-toggle=\"button\" aria-pressed=\"false\" autocomplete=\"off\"  [disabled]=\"isValid\" (click)=\"loadWorksheetList('viewmore')\" >View More</button>\r\n                                    </div>\r\n                          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"ddWorksheet dropdown m-t-10 col-md-14\">\r\n\t\t\t<button class=\"btn btn-primary m-l-5 m-r-3 pull-right\" [disableOn]=\"'studyStatus == \\'New\\''\" (click)=\"generateSRReport()\">View SR</button>\r\n            <button class=\"btn btn-primary m-l-5 pull-right\" [disableOn]=\"'studyStatus != \\'Submitted\\''\" (click)=\"generatePdf()\">View PDF</button>\r\n            <button class=\"btn btn-primary m-l-5 pull-right\"\r\n            [hideOn]=\"'!qaEnabled || studyStatusNum > StudyStatusEnum.Signed || (submitOnSign)'\"\r\n            [disableOn]=\"'(loggedInUser != currentUser) || studyStatusNum < StudyStatusEnum.Signed'\"\r\n            (click)=\"submitforQA()\">Submit for QA</button>\r\n            <button class=\"btn btn-primary m-l-3 pull-right\"\r\n            [hideOn]=\"'(studyStatusNum < StudyStatusEnum.SubmittedForAttestation && attestationEnabled) || (studyStatusNum < StudyStatusEnum.QAUnassigned && qaEnabled) || (submitOnSign)'\"\r\n            [disableOn]=\"'(loggedInUser !== currentUser) || (studyStatusNum === StudyStatusEnum.Submitted) || (attestationEnabled && studyStatusNum !== StudyStatusEnum.Attested) || (qaEnabled && !qaSigned) ||(!qaEnabled && !attestationEnabled && studyStatusNum < StudyStatusEnum.Signed)'\"\r\n            (click)=\"submitWorksheetbtn()\">Submit to EMR</button>\r\n            <button class=\"btn btn-primary m-l-3 pull-right\"\r\n            [hideOn]=\"'!attestationEnabled || (qaEnabled && studyStatusNum < StudyStatusEnum.QAUnassigned) || (studyStatusNum >= StudyStatusEnum.SubmittedForAttestation) || (submitOnSign)'\"\r\n            [disableOn]=\"'(loggedInUser != currentUser) || (!qaSigned && qaEnabled) || (!qaEnabled && studyStatusNum !== StudyStatusEnum.Signed)' \"\r\n            (click)=\"submitForAttending()\">Submit for Attending</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <worksheet *ngIf=\"template\" [template]=\"template\" [sdata]=\"sdata\"\r\n      [data]=\"data[template.id]\" [id]=\"template.id\"\r\n      (onUpdate)=\"onWorksheetUpdate($event)\"\r\n      [studyId]=\"studyId\" [examType]=\"examType\"\r\n      [selectedExamTypeId]=\"selectedExamTypeId\"\r\n      (onInprogress)=\"onWorksheetUpdate($event)\"\r\n      [workflowStatus]=\"workflowStatus\"\r\n      [attendingWorkflowStatus]=\"attendingWorkflowStatus\"\r\n      [status]=\"status\"\r\n      [disableQaSign]=\"disableQaSign\"\r\n      [qasign]=\"qasign\"\r\n      [tagList]=\"tagsList\"\r\n      [activeTagList]=\"activeTagList\"\r\n      [qaUser]=\"qaUser\"  [assignedUser]=\"assignedUser\"\r\n      [attendingUser]=\"attendingUser\" [loginUserId]=\"loginUserId\" [submitOnSignFlag]=\"submitOnSignFlag\"></worksheet>\r\n    </observations-tab>\r\n  </observations-tabs>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 401 */
/***/ (function(module, exports) {

module.exports = "<div id=\"{{id}}\" class=\"wrkshtpanelhead panel-heading clearfix\">\r\n    <h4 class=\"m-y-0 pull-left\">Exam Approval</h4>\r\n    <span class=\"pull-right\"><span><i class=\"fa fa-chevron-down\"></i></span></span>\r\n</div>\r\n<div id=\"panel-{{id}}\" class=\"wrkshtpanelbody panel-body fw-15\">\r\n    <div class=\"row m-b-10\">\r\n        <div class=\"col-md-12\">\r\n            <label>Signatures</label>\r\n        </div>\r\n    </div>\r\n\r\n    <!--Performing Physician -->\r\n    <div class=\"row m-y-10\">\r\n        <div class=\"col-md-12 p-x-0\">\r\n            <div class=\"col-md-3\">\r\n                <label>Performing Physician</label>\r\n            </div>\r\n            <div class=\"col-md-9\">\r\n                <div class=\"input-group\">\r\n                    <span class=\"input-group-addon\">\r\n                    <input type=\"checkbox\"\r\n                    [disableOn]=\"'((pocUser !== attestedUser && !qaEnabled && (studyStatusNum > StudyStatusEnum.QAUnassigned && studyStatusNum < StudyStatusEnum.Attested)) || studyStatus == \\'Submitted\\' || (loggedInUser!==currentUser)) ||\r\n\t\t\t\t\t\t\t\t\t\t(qaEnabled && (studyStatusNum > StudyStatusEnum.QAUnassigned && studyStatusNum < StudyStatusEnum.Attested)) ||\r\n\t\t\t\t\t\t\t\t\t\t(!attestationEnabled && !qaEnabled && studyStatusNum > StudyStatusEnum.Signed) ||\r\n                    ((pocUser !== attestedUser) && (studyStatusNum === StudyStatusEnum.Attested)) ||\r\n                    (studyStatusNum > StudyStatusEnum.Signed && qaEnabled)'\" [ngModel]=\"sdata.poc.signed\" (ngModelChange)=\"onChange('poc',$event)\" aria-label=\"Checkbox for following text input\">\r\n                    </span>\r\n                    <input type=\"text\" class=\"form-control\" [ngModel]=\"sdata.poc.sign\" aria-label=\"Text input with checkbox\" readonly>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <span class=\"pull-right\">{{sdata.poc.timestamp| date:'MMM d,y H:mm:ss'}}</span>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- Attending Physician -->\r\n    <div [hideOn]=\"'(!attestationEnabled || studyStatusNum < StudyStatusEnum.SubmittedForAttestation) || ((qaEnabled && attestationEnabled)?(!((qaUser===attestedUser || qaUser!==attestedUser) && qaSigned)) : false)'\">\r\n      <div class=\"row m-y-10\">\r\n          <div class=\"col-md-12 p-x-0\">\r\n              <div class=\"col-md-3\">\r\n                  <label>Attending Physician</label>\r\n              </div>\r\n              <div class=\"col-md-9\">\r\n                  <div class=\"input-group\">\r\n                      <span class=\"input-group-addon\">\r\n                        <input type=\"checkbox\" [disableOn]=\"'studyStatus == \\'Submitted\\' || (loggedInUser!==currentUser) || (pocUser===attestedUser && !qaEnabled) || (qaUser===attestedUser && qaEnabled && attestationEnabled)'\" [ngModel]=\"sdata.attending.signed\" (ngModelChange)=\"onChange('attending',$event)\" aria-label=\"Checkbox for following text input\">\r\n                      </span>\r\n                      <input type=\"text\" class=\"form-control\" [ngModel]=\"sdata.attending.sign\"  aria-label=\"Text input with checkbox\" readonly>\r\n                  </div>\r\n              </div>\r\n          </div>\r\n      </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n           <span class=\"pull-right\">{{sdata.attending.timestamp| date:'MMM d,y H:mm:ss'}}</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n</div>\r\n\r\n<hr class=\"wrkshtHr m-y-0\">\r\n\r\n <div class=\"row m-y-10\"   [hideOn]=\"'(studyStatusNum > StudyStatusEnum.QAUnassigned)'\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"pull-left\">\r\n            <button class=\"btn btn-primary\" [disableOn]=\"'studyStatus == \\'Submitted\\' || studyStatus == \\'Signed\\'|| (loggedInUser!==currentUser)'\" (click)=\"onReset()\">Reset</button>\r\n        </div>\r\n        <span class=\"pull-right\"><button class=\"btn btn-primary\" [disableOn]=\"'studyStatus == \\'Signed\\' || studyStatus == \\'QAUnassigned\\' ||(loggedInUser!==currentUser)'\" (click)=\"onSave()\">Save</button></span>\r\n      </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),
/* 402 */
/***/ (function(module, exports) {

module.exports = "<div id=\"{{id}}\" class=\"wrkshtpanelhead panel-heading clearfix\">\r\n    <h4 class=\"m-y-0 pull-left\">Exam Overview</h4>\r\n    <span class=\"pull-right\"><span>* Required</span></span>\r\n</div>\r\n<div id=\"panel-{{id}}\" class=\"wrkshtpanelbody panel-body fw-15\">\r\n    <div class=\"row m-y-10\">\r\n        <div class=\"col-md-12 lh-26\">\r\n                <div class=\"col-md-6 p-x-0\"><label>Type</label></div>\r\n                <div class=\"col-md-6 p-x-0\">\r\n                  <div class=\"dropdown\">\r\n                      <button class=\"btn btn-default dropdown-toggle\"   [disableOn]=\"'studyStatus == \\'Submitted\\' ||\r\n                        studyStatus == \\'Signed\\' ||\r\n                        studyStatus == \\'QAUnassigned\\' ||\r\n                        studyStatus == \\'Attested\\' ||\r\n                        studyStatus == \\'SubmittedForAttestation\\'||\r\n                        qaSigned == true || (loggedInUser!==currentUser)'\" type=\"button\" data-toggle=\"dropdown\">{{(data.type)?data.type :'Choose Type' }}\r\n                          <span class=\"caret\"></span></button>\r\n                      <ul class=\"dropdown-menu\">\r\n                          <li *ngFor=\"let type of types\" (click)=\"onChange(type, 'type')\"><a href=\"javascript:void(0)\">{{type}}</a></li>\r\n                      </ul>\r\n                  </div>\r\n                </div>\r\n          </div>\r\n    </div>\r\n    <div class=\"row m-y-10\">\r\n      <div class=\"col-md-12 lh-26\">\r\n              <div class=\"col-md-6 p-x-0\"><label>Category</label></div>\r\n              <div class=\"col-md-6 p-x-0\">\r\n                <div class=\"dropdown\">\r\n                    <button class=\"btn btn-default dropdown-toggle\"   [disableOn]=\"'studyStatus == \\'Submitted\\' ||\r\n                      studyStatus == \\'Signed\\' ||\r\n                      studyStatus == \\'QAUnassigned\\' ||\r\n                      studyStatus == \\'Attested\\' ||\r\n                      studyStatus == \\'SubmittedForAttestation\\'||\r\n                      qaSigned == true || (loggedInUser!==currentUser)'\" type=\"button\" data-toggle=\"dropdown\">{{(data.category)?data.category :'Choose Category' }}\r\n                        <span class=\"caret\"></span></button>\r\n                    <ul class=\"dropdown-menu\">\r\n                          <li *ngFor=\"let category of categories\" (click)=\"onChange(category, 'category')\"><a href=\"javascript:void(0)\">{{category}}</a></li>\r\n                    </ul>\r\n                </div>\r\n              </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row m-y-10\">\r\n      <div class=\"col-md-12 lh-26\">\r\n              <div class=\"col-md-6 p-x-0\"><label>Exam</label></div>\r\n              <div class=\"col-md-6 p-x-0\">\r\n                <div class=\"dropdown\">\r\n                    <button class=\"btn btn-default dropdown-toggle\"   [disableOn]=\"'studyStatus == \\'Submitted\\' ||\r\n                      studyStatus == \\'Signed\\' ||\r\n                      studyStatus == \\'QAUnassigned\\' ||\r\n                      studyStatus == \\'Attested\\' ||\r\n                      studyStatus == \\'SubmittedForAttestation\\'||\r\n                      qaSigned == true || (loggedInUser!==currentUser) '\" type=\"button\" data-toggle=\"dropdown\">{{(data.exam)?data.exam :'Choose Exam' }}\r\n                        <span class=\"caret\"></span></button>\r\n                    <ul class=\"dropdown-menu\">\r\n                       <li *ngFor=\"let examvalue of exam\" (click)=\"onChange(examvalue, 'exam')\"><a href=\"javascript:void(0)\">{{examvalue}}</a></li>\r\n                    </ul>\r\n                </div>\r\n              </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<hr class=\"m-y-0\">\r\n"

/***/ }),
/* 403 */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-{{12/qaColumnLayout}} input group pull-left p-x-0\">\r\n\r\n  <div class=\"col-md-12\">\r\n    <div class=\"dropdown\">\r\n        <button class=\"btn btn-default dropdown-toggle label-fw-13 align-left\" [disabled]=\"disableQAWorksheet\" type=\"button\" data-toggle=\"dropdown\" style=\"width:100%\">{{(qaData.qaOption)?qaData.qaOption :'Choose Grade Scale' }}\r\n            <span class=\"caret\"></span></button>\r\n        <ul class=\"dropdown-menu\" style=\"width:100%\">\r\n            <li *ngFor=\"let qaOption of qaOptions\" (click)=\"onQAChange(qaOption, 'qaOption')\"><a href=\"javascript:void(0)\" class=\"label-fw-13\">{{qaOption}}</a></li>\r\n        </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),
/* 404 */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"col-md-{{12/qaColumnLayout}} input group pull-left p-x-0 m-b-10\">\r\n  <div class=\"col-md-6\">\r\n      <label class=\"label-fw-13\">Image Quality</label>{{qaOptions.qualityid}}\r\n  </div>\r\n  <div class=\"col-md-6\">\r\n    <div class=\"dropdown align-center\">\r\n        <button class=\"btn btn-default dropdown-toggle\" [disableOn]=\"'studyStatus == \\'Attested\\' ||\r\n        studyStatus == \\'SubmittedForAttestation\\'||\r\n        studyStatus == \\'Submitted\\' ||\r\n        qaSigned == true ||  (loggedInUser!==currentUser)'\" type=\"button\" data-toggle=\"dropdown\">{{(qaData.quality)?qaData.quality :'Choose' }}\r\n            <span class=\"caret\"></span></button>\r\n        <ul class=\"dropdown-menu\">\r\n            <li *ngFor=\"let quality of qaOptions[0].value\" (click)=\"onQAChange(quality, 'quality')\"><a href=\"javascript:void(0)\" class=\"label-fw-13\">{{quality}}</a></li>\r\n        </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"col-md-{{12/qaColumnLayout}} input group pull-left p-x-0 m-b-10\">\r\n  <div class=\"col-md-6\">\r\n      <label class=\"label-fw-13\">Interpretation of Images</label>\r\n  </div>\r\n  <div class=\"col-md-6\">\r\n    <div class=\"dropdown align-center\">\r\n        <button class=\"btn btn-default dropdown-toggle\" [disableOn]=\"'studyStatus == \\'Attested\\' ||\r\n        studyStatus == \\'SubmittedForAttestation\\'||\r\n        studyStatus == \\'Submitted\\' ||\r\n        qaSigned == true ||  (loggedInUser!==currentUser)'\" type=\"button\" data-toggle=\"dropdown\">{{(qaData.accuracy)?qaData.accuracy :'Choose' }}\r\n            <span class=\"caret\"></span></button>\r\n        <ul class=\"dropdown-menu\">\r\n            <li *ngFor=\"let accuracy of qaOptions[1].value\" (click)=\"onQAChange(accuracy, 'accuracy')\"><a href=\"javascript:void(0)\" class=\"label-fw-13\">{{accuracy}}</a></li>\r\n        </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"col-md-{{12/qaColumnLayout}} input group pull-left p-x-0 m-b-10\">\r\n  <div class=\"col-md-6\">\r\n      <label class=\"label-fw-13\">Gold Standard Interpretation </label>\r\n  </div>\r\n  <div class=\"col-md-6\">\r\n    <div class=\"dropdown align-center\">\r\n        <button class=\"btn btn-default dropdown-toggle\" [disableOn]=\"'studyStatus == \\'Attested\\' ||\r\n        studyStatus == \\'SubmittedForAttestation\\'||\r\n        studyStatus == \\'Submitted\\' ||\r\n        qaSigned == true || (loggedInUser!==currentUser) '\" type=\"button\" data-toggle=\"dropdown\">{{(qaData.standard)?qaData.standard :'Choose' }}\r\n            <span class=\"caret\"></span></button>\r\n        <ul class=\"dropdown-menu\">\r\n            <li *ngFor=\"let standard of qaOptions[2].value\" (click)=\"onQAChange(standard, 'standard')\"><a href=\"javascript:void(0)\" class=\"label-fw-13\">{{standard}}</a></li>\r\n        </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),
/* 405 */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12 input group pull-left lh-30\">\r\n    <div class=\"col-md-3 p-x-0\">\r\n        <span><label class=\"pull-left label-fw-13\">{{qaLabel}}: </label></span>\r\n    </div>\r\n    <div class=\"col-md-9 p-x-0\">\r\n        <input class=\"pull-left form-control\" [disableOn]=\"'studyStatus == \\'Attested\\' ||\r\n        studyStatus == \\'SubmittedForAttestation\\'||\r\n        studyStatus == \\'Submitted\\' ||\r\n        qaSigned == true || (loggedInUser!==currentUser)'\" [ngModel]=\"qaData\" (ngModelChange)=\"onQAChange($event)\"/>\r\n    </div>\r\n</div>\r\n\r\n"

/***/ }),
/* 406 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-y-10\">\r\n  <div class=\"col-md-12 m-t-10\">\r\n      <option-dropdown  *ngIf=\"qaType == 'dropdown'\" [qasign]=\"qasign\" [disableQAWorksheet]=\"disableQAWorksheet\" [id]=\"id\" [qaId]=\"qaId\" [qaData]=\"qaData\" [qaColumnLayout]=\"qaColumnLayout\" [qaOptions]=\"qaOptions\" (onQAUpdate)=\"onQAChildChange($event)\"></option-dropdown>\r\n      <option-qa-text *ngIf=\"qaType == 'text'\" [qasign]=\"qasign\" [disableQAWorksheet]=\"disableQAWorksheet\" [id]=\"id\" [qaId]=\"qaId\" [qaData]=\"qaData.qaValue\" [qaLabel]=\"qaName\" (onQAUpdate)=\"onQAChildChange($event)\"></option-qa-text>\r\n  </div>\r\n</div>\r\n"

/***/ }),
/* 407 */
/***/ (function(module, exports) {

module.exports = "<modal #submitToEMR [keyboard]=\"false\" [backdrop]=\"false\">\r\n    <modal-header [show-close]=\"false\">\r\n        <h4 class=\"modal-title\">SubmitToEMR</h4>\r\n    </modal-header>\r\n    <modal-body>\r\n    Study successfully submitted to EMR\r\n    </modal-body>\r\n</modal>\r\n\r\n<modal #submitForAttestationToast [keyboard]=\"false\" [backdrop]=\"false\">\r\n    <modal-header [show-close]=\"false\">\r\n        <h4 class=\"modal-title\">Submit for Attestation</h4>\r\n    </modal-header>\r\n    <modal-body>\r\n    Study successfully submitted for Attestation\r\n    </modal-body>\r\n</modal>\r\n\r\n<modal #newQaAssociationWrksht [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n    <modal-header [show-close]=\"false\">\r\n        <h4 class=\"modal-title\">Associate worksheet</h4>\r\n    </modal-header>\r\n    <modal-body>\r\n     Please confirm to associate worksheet to study\r\n    </modal-body>\r\n    <modal-footer>\r\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"confirmQaAssociation()\">Ok</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"cancelQaAssociation()\">Cancel</button>\r\n    </modal-footer>\r\n</modal>\r\n\r\n<modal #associateQaWorksheetPopup [keyboard]=\"false\" [backdrop]=\"'static'\">\r\n    <modal-header [show-close]=\"false\">\r\n        <h4 class=\"modal-title\">Replace worksheet</h4>\r\n    </modal-header>\r\n    <modal-body>\r\n     The current worksheet data will be lost. Do you want to replace the worksheet?\r\n    </modal-body>\r\n    <modal-footer>\r\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"confirmQaAssociation()\">Yes</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"cancelQaAssociation()\">No</button>\r\n    </modal-footer>\r\n</modal>\r\n\r\n<div id=\"{{id}}\" class=\"qawrkshtpanelhead panel-heading clearfix\">\r\n  <h4 class=\"m-y-0 pull-left\">Quality Assurance</h4>\r\n  <span class=\"pull-right\"><span><i class=\"fa fa-chevron-down\"></i></span></span>\r\n</div>\r\n<div id=\"panel-{{id}}\" class=\"wrkshtpanelbody panel-body fw-15\">\r\n  <div class=\"row\">\r\n    <div class=\"ddWorksheet dropdown m-t-10 col-md-12\">\r\n      <button class=\"btn btn-default dropdown-toggle\" [disableOn]=\"'studyStatus == \\'Attested\\' ||\r\n      studyStatus == \\'SubmittedForAttestation\\'||\r\n      studyStatus == \\'Submitted\\' ||\r\n      qaSigned == true ||  (loggedInUser!==currentUser)'\"  type=\"button\" data-toggle=\"dropdown\">{{(qaSelectedTemplateName)?qaSelectedTemplateName :'Choose Worksheet' }}\r\n      <span class=\"caret\"></span></button>\r\n      <ul class=\"dropdown-menu\">\r\n        <li *ngFor=\"let qaWorksheet of qaWorksheets\" (click)=\"onQaWorksheetSelection(qaWorksheet.id, qaWorksheet.name); onQaDropDownSelection(qaWorksheet.name)\" ><a href=\"javascript:void(0)\">{{qaWorksheet.name}}</a></li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <hr class=\"m-y-10 p-x-0\">\r\n  <div  *ngIf=\"qaTemplate\" class=\"row m-t-10\">\r\n    <worksheet-qa-topic *ngFor=\"let qatopic of qaTemplate.topic\" [qasign]=\"qasign\" [id]=\"id\" [qaId]=\"qatopic.id\" [qaName]=\"qatopic.name\" [qaType]=\"qatopic.type\" [qaColumnLayout]=\"qatopic.columnLayout\" [qaOptions]=\"qatopic.options\" [qaRequired]=\"qatopic.required\" [qaData]=\"qaData\" (onQAUpdate)=\"onQAChildChange($event)\" (onUpdate)=\"onChildChange($event)\"></worksheet-qa-topic>\r\n    <div class=\"col-md-12 m-t-10\">\r\n      <div class=\"row m-b-10\">\r\n        <div class=\"col-md-12\">\r\n          <label>Signatures</label>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-y-10\">\r\n        <div class=\"col-md-12 p-x-0\">\r\n          <div class=\"col-md-3\">\r\n            <label>QA</label>\r\n          </div>\r\n          <div class=\"col-md-9\">\r\n            <div class=\"input-group\">\r\n              <span class=\"input-group-addon\">\r\n              <input type=\"checkbox\" aria-label=\"Checkbox for following text input\" [disableOn]=\"'studyStatus == \\'SubmittedForAttestation\\'||\r\n              studyStatus == \\'Submitted\\' || (loggedInUser!==currentUser) || (attestedUser!==qaUser && studyStatusNum===StudyStatusEnum.Attested)'\" [ngModel]=\"sqaData.qa.signed\" (ngModelChange)=\"onChange('qa',$event)\">\r\n              </span>\r\n              <input type=\"text\" class=\"form-control\" [ngModel]=\"sqaData.qa.sign\" aria-label=\"Text input with checkbox\" readonly>\r\n            </div>\r\n        </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n          <span class=\"pull-right\">{{sqaData.qa.timestamp| date:'MMM d,y H:mm:ss'}}</span>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-y-10\">\r\n        <div class=\"col-md-12\">\r\n          <div class=\"col-md-12\">\r\n            <span class=\"pull-right\"><button class=\"btn btn-primary\" [disableOn]=\"'studyStatus == \\'Attested\\' ||\r\n            studyStatus == \\'SubmittedForAttestation\\'||\r\n            studyStatus == \\'Submitted\\' ||\r\n            qaSigned == true ||  (loggedInUser!==currentUser)'\" (click)=\"onSave()\">Save</button></span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),
/* 408 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-y-10\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"pull-left\">\r\n            <button class=\"btn btn-primary\" (click)=\"onReset()\">Reset</button>\r\n        </div>\r\n        <span class=\"pull-right\"><button class=\"btn btn-primary\" (click)=\"onSave()\">Save</button></span>\r\n      </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),
/* 409 */
/***/ (function(module, exports) {

module.exports = "<div id=\"{{id}}\" class=\"wrkshtpanelhead panel-heading clearfix\">\r\n  <h4 class=\"m-y-0 pull-left\">Tags</h4>\r\n  <span class=\"pull-right\"><span><i class=\"fa fa-chevron-down\"></i></span></span>\r\n</div>\r\n<div id=\"panel-{{id}}\" class=\"wrkshtpanelbody panel-body fw-15\">\r\n  <div class=\"row m-y-10\">\r\n    <div class=\"col-md-12 lh-26\">\r\n      <div class=\"col-md-3 p-x-0\"><label>Tags</label></div>\r\n      <div class=\"col-md-9 p-x-0\">\r\n       <input id=\"inputTags\"  type=\"text\" name=\"inputTags\" [value]=\"tagList\"  class=\"tags-width pull-left\" [disabled]=\"!disableTags\" />\r\n               <i class=\"fa fa-plus-circle color-primary m-t-5 fa-close savetags\" aria-hidden=\"true\"  (click)=\"saveInputTags()\"></i>\r\n      </div>\r\n    </div>\r\n  </div>\r\n <div class=\"col-md-12 \" *ngIf=\"errortags==1\">\r\n    \t<span class=\"text-danger pull-right\">Please Add the Tags</span>\r\n    </div>\r\n</div>\r\n<hr class=\"m-y-0\">\r\n"

/***/ }),
/* 410 */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let option of options\" class=\"col-md-{{12/columnLayout}} input group pull-left p-x-0\">\r\n    <div class=\"col-md-2 p-x-0\">\r\n        <input type=\"checkbox\" name=\"{{id}}\"   [disableOn]=\"'studyStatus == \\'Submitted\\' ||\r\n          studyStatus == \\'Signed\\' ||\r\n          studyStatus == \\'QAUnassigned\\' ||\r\n          studyStatus == \\'Attested\\' ||\r\n          studyStatus == \\'SubmittedForAttestation\\'||\r\n          qaSigned == true || (loggedInUser!==currentUser)'\"  [ngModel]=\"data[option.id]\" (ngModelChange)=\"onChange($event, option.id)\" >\r\n    </div>\r\n    <div class=\"col-md-10 p-x-0\">\r\n        <span><span class=\"label-fw-13\">{{option.name}}</span></span>\r\n    </div>\r\n    <div class=\"col-md-12 p-x-0\">\r\n        <worksheet-topic  *ngFor=\"let subtopic of option.topics\" [id]=\"subtopic.id\" [name]=\"subtopic.name\" [type]=\"subtopic.type\" [data]=\"data[subtopic.id]\" [topics]=\"subtopic.topics\" [columnLayout]=\"subtopic.columnLayout\" [options]=\"subtopic.options\" (onUpdate)=\"onChildChange($event)\"></worksheet-topic>\r\n    </div>\r\n</div>\r\n"

/***/ }),
/* 411 */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let option of options;\" class=\"col-md-{{12/columnLayout}} input group pull-left p-x-0\">\r\n    <div class=\"col-md-2 p-x-0\">\r\n        <input type=\"radio\" name=\"{{id}}\" value=\"{{option.id}}\"   [disableOn]=\"'studyStatus == \\'Submitted\\' ||\r\n          studyStatus == \\'Signed\\' ||\r\n          studyStatus == \\'QAUnassigned\\' ||\r\n          studyStatus == \\'Attested\\' ||\r\n          studyStatus == \\'SubmittedForAttestation\\'||\r\n          qaSigned == true || (loggedInUser!==currentUser)'\"  [ngModel]=\"data[id]\" (ngModelChange)=\"onChange($event)\" >\r\n    </div>\r\n    <div class=\"col-md-10 p-x-0\">\r\n        <span><span class=\"label-fw-13\">{{option.name}}</span></span>\r\n    </div>\r\n    <div class=\"col-md-12 p-x-0\">\r\n        <worksheet-topic  *ngFor=\"let subtopic of option.topics\" [id]=\"subtopic.id\" [name]=\"subtopic.name\" [type]=\"subtopic.type\" [data]=\"data[subtopic.id]\" [topics]=\"subtopic.topics\" [columnLayout]=\"subtopic.columnLayout\" [options]=\"subtopic.options\" (onUpdate)=\"onChildChange($event)\"></worksheet-topic>\r\n    </div>\r\n</div>\r\n"

/***/ }),
/* 412 */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12 input group pull-left p-x-0 lh-30\">\r\n    <div class=\"col-md-10 p-x-0 pull-right\">\r\n        <span><label class=\"pull-left label-fw-13\">{{label}}: </label>\r\n        <input class=\"m-l-10 pull-left txtNumber form-control\"\r\n        [disableOn]=\"'studyStatus == \\'Submitted\\' ||\r\n        studyStatus == \\'Signed\\' ||\r\n        studyStatus == \\'QAUnassigned\\' ||\r\n        studyStatus == \\'Attested\\' ||\r\n        studyStatus == \\'SubmittedForAttestation\\'||\r\n        qaSigned == true || (loggedInUser!==currentUser)'\" [ngModel]=\"data\" (ngModelChange)=\"onChange($event)\"></span>\r\n    </div>\r\n</div>"

/***/ }),
/* 413 */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12 input group pull-left p-x-0 lh-30\">\r\n    <div class=\"col-md-3 p-x-0\">\r\n        <span><label class=\"pull-left label-fw-13\">{{label}}: </label></span>\r\n    </div>\r\n    <div class=\"col-md-9 p-x-0\">\r\n        <input class=\"m-l-10 pull-left form-control\"   [disableOn]=\"'studyStatus == \\'Submitted\\' ||\r\n          studyStatus == \\'Signed\\' ||\r\n          studyStatus == \\'QAUnassigned\\' ||\r\n          studyStatus == \\'Attested\\' ||\r\n          studyStatus == \\'SubmittedForAttestation\\'||\r\n          qaSigned == true || (loggedInUser!==currentUser)'\" [ngModel]=\"data\" (ngModelChange)=\"onChange($event)\"/>\r\n    </div>\r\n</div>\r\n\r\n"

/***/ }),
/* 414 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row m-y-10\">\r\n    <div class=\"col-md-12\"><label *ngIf=\"name!=='' &&  type !== 'text' && type !== 'text-number' \" class=\"fw-15\">{{name}}:</label></div>\r\n    <div class=\"col-md-12\">\r\n        <option-single-select *ngIf=\"type == 'single-select'\" [qasign]=\"qasign\" [id]=\"id\" [data]=\"data.value\" [columnLayout]=\"columnLayout\" [options]=\"options\" (onUpdate)=\"onChildChange($event);\"></option-single-select>\r\n        <option-multi-select *ngIf=\"type == 'multi-select'\" [qasign]=\"qasign\" [id]=\"id\" [data]=\"data.value\" [columnLayout]=\"columnLayout\" [options]=\"options\" (onUpdate)=\"onChildChange($event);\"></option-multi-select>\r\n        <option-text *ngIf=\"type == 'text'\" [qasign]=\"qasign\" [id]=\"id\" [data]=\"data.value\" [label]=\"name\" (onUpdate)=\"onChildChange($event);\"></option-text>\r\n        <option-text-number *ngIf=\"type == 'text-number'\" [qasign]=\"qasign\" [id]=\"id\" [data]=\"data.value\" [label]=\"name\" (onUpdate)=\"onChildChange($event);\"></option-text-number>\r\n    </div>\r\n    <div class=\"m-l-15\">\r\n        <worksheet-topic *ngFor=\"let subtopic of topics\"\r\n        [qasign]=\"qasign\" [id]=\"subtopic.id\" [name]=\"subtopic.name\"\r\n        [type]=\"subtopic.type\" [data]=\"data[subtopic.id]\"\r\n        [topics]=\"subtopic.topics\" [columnLayout]=\"subtopic.columnLayout\"\r\n        [options]=\"subtopic.options\" (onUpdate)=\"onChildChange($event)\">\r\n      </worksheet-topic>\r\n    </div>\r\n</div>\r\n"

/***/ }),
/* 415 */
/***/ (function(module, exports) {

module.exports = "<div id=\"{{id}}\" class=\"wrkshtpanelhead panel-heading clearfix\">\r\n  <h4 class=\"m-y-0 pull-left\">{{name}}</h4>\r\n  <span *ngIf=\"required\" class=\"pull-right\"><span><i class=\"fa fa-chevron-down\"></i></span></span>\r\n</div>\r\n<div id=\"panel-{{id}}\" class=\"wrkshtpanelbody panel panel-default panel-body scroll-400 custom-scrollbar\">\r\n  <div *ngFor=\"let topic of topics; let last = last;\">\r\n    <worksheet-topic [qasign]=\"qasign\" [id]=\"topic.id\" [name]=\"topic.name\" [type]=\"topic.type\" [data]=\"data[topic.id]\" [topics]=\"topic.topics\" [columnLayout]=\"topic.columnLayout\" [options]=\"topic.options\" (onUpdate)=\"onChildChange($event)\">\r\n    </worksheet-topic>\r\n    <hr *ngIf=\"!last\" class=\"wrkshtHr m-y-0\">\r\n  </div>\r\n</div>\r\n<hr class=\"m-y-0\">\r\n"

/***/ }),
/* 416 */
/***/ (function(module, exports) {

module.exports = "<div>\r\n\t<tags [tagList]=\"tagList\" [id]=\"'tags'\" [activeTagList]=\"activeTagList\"[studyId]=\"studyId\"  [qaUser]=\"qaUser\"  [assignedUser]=\"assignedUser\"\r\n        [attendingUser]=\"attendingUser\" [loginUserId]=\"loginUserId\"></tags>\r\n\t<exam-overview [qasign]=\"qasign\" [data]=\"data.examoverview\"  [id]=\"'examoverview'\" (onUpdate)=\"onChildChange($event)\"></exam-overview>\r\n\t<worksheet-section [qasign]=\"qasign\" *ngFor=\"let section of template.sections\" [id]=\"section.id\" [name]=\"section.name\" [required]=\"section.required\" [data]=\"data[section.id]\" [topics]=\"section.topics\" (onUpdate)=\"onChildChange($event)\"></worksheet-section>\r\n\t<exam-approval [sdata]=\"sdata\" [id]=\"'examapproval'\" [studyId]=\"studyId\" [examType]=\"examType\" [selectedExamTypeId]=\"selectedExamTypeId\" (onUpdate)=\"onChildChange($event)\"\r\n\t    [status]=\"status\"></exam-approval>\r\n\t<quality-assurance\r\n\t[hideOn]=\"'(studyStatusNum < StudyStatusEnum.QAAssigned && (qaEnabled ||attestationEnabled)) || (!qaEnabled)'\" [id]=\"'qualityassurance'\"\r\n\t[studyId]=\"studyId\" [qasign]=\"qasign\" [workflowStatus]=\"workflowStatus\"[attendingWorkflowStatus]=\"attendingWorkflowStatus\" [submitOnSignFlag]=\"submitOnSignFlag\"(onUpdate)=\"onChildChange($event)\"></quality-assurance>\r\n</div>\r\n"

/***/ }),
/* 417 */
/***/ (function(module, exports) {

module.exports = "<div id=\"studyViewerTemplate\" class=\"tab-pane active\"\r\n\tstyle=\"height:100%\">\r\n\t\r\n\t<div class=\"studyContainer\" style=\"height: 100%; overflow: hidden;\">\r\n\t\t<div class=\"studyRow row\" style=\"height: 100%\">\r\n\r\n\t\t\t<!-- Thumbnails -->\r\n\t\t\t<div class=\"thumbnailSelector\">\r\n\t\t\t\t<div class=\"thumbnails list-group\"></div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<!-- Viewer -->\r\n\t\t\t<div id=\"viewer\" class=\"viewer\">\r\n\t\t\t\t<!-- Toolbar -->\r\n\t\t\t\t<div class=\"text-center\">\r\n\t\t\t\t\t<div  class=\"btn-group\">\r\n                        <!-- Zoom -->\r\n                        <button id=\"zoom-in-image\" type=\"button\" class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"ZoomIn\"><span class=\"fa fa-plus\"></span></button>\r\n                        \r\n                        <button id=\"zoom-out-image\" type=\"button\" class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"ZoomOut\"><span class=\"fa fa-minus\"></span></button>\r\n                        \r\n                        \r\n                        <!-- Pan -->\r\n                       <button id=\"pan-image\" type=\"button\" class=\"btn btn-sm btn-default\" data-container='body' data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Pan\"><span class=\"fa fa-arrows\"></span></button>\r\n\r\n                    </div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<!-- Viewer -->\r\n\t\t\t\t<div class=\"imageViewer\">\r\n\t\t\t\t\t<div id=\"viewportWrapper\" class=\"viewportWrapper\"\r\n\t\t\t\t\t\tstyle=\"width: 100%; height: 100%;position:relative;color: white;float:left;\" class='cornerstone-enabled-image' onmousedown='return false;'>\r\n\t\t\t\t\t\t<!-- Viewport -->\r\n\t\t\t\t\t\t<div id=\"viewport\" class=\"viewport\"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div style=\"clear: both;\"></div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),
/* 418 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row bg-ssblue m-x-0 p-4\">\r\n  <div class=\"col-xs-12 col-md-6 pull-left p-x-0\">\r\n      <div class=\"col-xs-1 pull-left p-x-0 {{isWorksheetOpen?'hide':'show'}}\">\r\n          <a href=\"javascript:void(0)\" class=\"btnWorksheet img-vie-right-menu btn btn-default \" role=\"button\"><i class=\"fa fa-list\"></i></a>\r\n      </div>\r\n      <div class=\"col-xs-10 pull-left p-x-0 lh-30\">\r\n          <span class=\"color-white fw-15 m-l-10\">Exam Study Step 1 of 3 / Review Study</span>\r\n      </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),
/* 419 */
/***/ (function(module, exports) {

module.exports = "<modal #saveLdapConfigPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Ldap Configuration</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Configured successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #testConnPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Test Connection</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Test connection succeeded\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"successOk()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #testConnFailPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Test Connection</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Test connection failed\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"failTestOk()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<!-- LDAP Configuration -->\r\n\r\n<div class=\"contentpage m-l-65\">\r\n  <div class=\"\">\r\n    <!-- Breadcrumbs -->\r\n    <div class=\"row m-x-0 bg-ssblue\">\r\n      <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n        <div class=\"pull-left color-white\">\r\n          <h2 class=\"m-y-10\">Adminstrator</h2>\r\n        </div>\r\n        <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n          <li>\r\n            <a href=\"#\" class=\"color-white\">\r\n              <i class=\"fa fa-lg fa-cog\"></i>\r\n            </a>\r\n          </li>\r\n          <li class=\"color-white\">System Configuration</li>\r\n          <li class=\"color-white\">LDAP/AD</li>\r\n        </ol>\r\n      </div>\r\n    </div>\r\n    <!-- Breadcrumbs Ends -->\r\n\r\n    <div class=\"row m-t-15 m-x-0\">\r\n      <div class=\"col-xs-12\">\r\n        <form novalidate #createldapConfigForm=\"ngForm\" novalidate>\r\n          <div class=\"col-md-offset-2 col-md-8 b-1-lightgray bg-white\">\r\n            <div class=\"row m-x-0\">\r\n              <div class=\"col-xs-12\">\r\n                <h3>LDAP/AD Configuration</h3>\r\n              </div>\r\n            </div>\r\n            <div class=\"row m-x-0 m-t-5\">\r\n              <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\">\r\n              </div>\r\n            </div>\r\n            <div class=\"row m-x-0 m-t-5\">\r\n              <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\">\r\n                <div class=\"col-xs-12 p-x-0\">\r\n                  <div class=\"col-xs-12 form-group\">\r\n                    <div class=\"col-xs-6 col-md-4\">\r\n                      <label>Type</label>\r\n                    </div>\r\n                    <div class=\"col-xs-6 col-md-6\">\r\n\r\n                      <select class=\"form-control\" id=\"directoryType\" required [(ngModel)]=\"ldapData.directoryType\" name=\"directoryType\" #directoryType=\"ngModel\" (change)=\"onChange($event)\">\r\n                                  <option *ngFor=\"let item of selectOption\" [value]=\"item.value\" [disabled]=\"item.value=='Choose DirectoryType'\">{{item.value}}</option>\r\n                                  </select>\r\n                      <div [hidden]=\"typeExists\" class=\"alert alert-danger alertRequired\">Type required</div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-xs-12 p-x-0\">\r\n                  <div class=\"col-xs-12 form-group\">\r\n                    <div class=\"col-xs-6 col-md-4\">\r\n                      <label>Remote Server</label>\r\n                    </div>\r\n                    <div class=\"col-xs-6 col-md-6\">\r\n                      <input type=\"text\" class=\"form-control\" id=\"remoteServer\" required [(ngModel)]=\"ldapData.remoteServer\" name=\"remoteServer\" #remoteServer=\"ngModel\" (keypress)=\"chengesInForm($event)\" (keydown)=\"chengesInForm($event)\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-xs-12 p-x-0\">\r\n                  <div class=\"col-xs-12 form-group\">\r\n                    <div class=\"col-xs-6 col-md-4\">\r\n                      <label>Access Groups</label>\r\n                    </div>\r\n                    <div class=\"col-xs-6 col-md-6\">\r\n                      <input type=\"text\" class=\"form-control\" id=\"accessGroup\" required [(ngModel)]=\"ldapData.accessGroup\" name=\"accessGroup\" #accessGroup=\"ngModel\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-xs-12 p-x-0\">\r\n                  <div class=\"col-xs-12 form-group\">\r\n                    <div class=\"col-xs-6 col-md-4\">\r\n                      <label>Search Root</label>\r\n                    </div>\r\n                    <div class=\"col-xs-6 col-md-6\">\r\n                      <input type=\"text\" class=\"form-control\" id=\"searchRoot\" required [(ngModel)]=\"ldapData.searchRoot\" name=\"searchRoot\" #searchRoot=\"ngModel\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-xs-12 p-x-0\">\r\n                  <div class=\"col-xs-12 form-group\">\r\n                    <div class=\"col-xs-6 col-md-4\">\r\n                      <label>LDAP Port</label>\r\n                    </div>\r\n                    <div class=\"col-xs-6 col-md-6\">\r\n                      <input type=\"text\" class=\"form-control\" (keypress)=\"validateNum($event);\" id=\"ldapPort\" [(ngModel)]=\"ldapData.ldapPort\" name=\"ldapPort\" #ldapPort=\"ngModel\" (keypress)=\"chengesInForm($event)\" (keydown)=\"chengesInForm($event)\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-xs-12 p-x-0\">\r\n                  <div class=\"col-xs-12 form-group\">\r\n                    <div class=\"col-xs-6 col-md-4\">\r\n                      <label>User Dn</label>\r\n                    </div>\r\n                    <div class=\"col-xs-6 col-md-6\">\r\n                      <input type=\"text\" class=\"form-control\" id=\"userDn\" required [(ngModel)]=\"ldapData.userDn\" name=\"userDn\" #userDn=\"ngModel\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-xs-12 p-x-0\">\r\n                  <div class=\"col-xs-12 form-group\">\r\n                    <div class=\"col-xs-6 col-md-4\">\r\n                      <label>Manager DN</label>\r\n                    </div>\r\n                    <div class=\"col-xs-6 col-md-6\">\r\n                      <input type=\"text\" class=\"form-control\" id=\"manageDn\" required [(ngModel)]=\"ldapData.manageDn\" name=\"manageDn\" #manageDn=\"ngModel\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-xs-12 p-x-0\">\r\n                  <div class=\"col-xs-12 form-group\">\r\n                    <div class=\"col-xs-6 col-md-4\">\r\n                      <label>Manager Password</label>\r\n                    </div>\r\n                    <div class=\"col-xs-6 col-md-6\">\r\n                      <input type=\"text\" class=\"form-control\" id=\"managePassword\" required [(ngModel)]=\"ldapData.managePassword\" name=\"managePassword\" #managePassword=\"ngModel\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-xs-12 p-x-0\">\r\n                  <div class=\"col-xs-12 form-group\">\r\n                    <div class=\"col-xs-6 col-md-4\">\r\n                      <label>IT Admin User Name</label>\r\n                    </div>\r\n                    <div class=\"col-xs-6 col-md-6\">\r\n                      <input type=\"text\" class=\"form-control\" id=\"itAdminUserName\" required [(ngModel)]=\"ldapData.itAdminUserName\" name=\"itAdminUserName\" #itAdminUserName=\"ngModel\" (keypress)=\"chengesInForm($event)\" (keydown)=\"chengesInForm($event)\">\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-xs-12 m-b-10 p-x-0\">\r\n                  <div class=\"col-xs-offset-3 col-md-offset-4\">\r\n                    <button class=\"btn btn-primary\" (click)=\"doValidateConn(createldapConfigForm.value)\">Test Connection</button>\r\n                    <button class=\"btn btn-primary\" (click)=\"cancelPopup()\">Reset</button>\r\n                    <button class=\"btn btn-primary\" [disabled]=\"saveTest\" (click)=\"doSave(createldapConfigForm.value)\">Save</button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),
/* 420 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\"  >\r\n<!-- Start Left Nav -->\r\n  <div>\r\n    <nav class=\"left-nav sidebar bg-black hidden-xs\">\r\n      <ul class=\"exp-leftnav\">\r\n        <li class=\"parentmenu popup\" data-icon=\"1\">\r\n          <a class=\"color-white p-15\">\r\n            <i class=\"fa fa-pie-chart fa-lg active\"></i>\r\n            <span class=\"fw-15 p-l-10 parentli\">Dashboard</span>\r\n          </a>\r\n          <div>\r\n            <ul class=\"submenu\">\r\n              <li class=\"\">\r\n                <a routerLink=\"/dashboard\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">My Tasks</span>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </li>\r\n        <li class=\"parentmenu popup\" data-icon=\"2\">\r\n          <a class=\"color-white p-15\">\r\n            <i class=\"fa fa-th-list fa-lg\"></i>\r\n            <span class=\"fw-15 p-l-10 parentli\">StudyList</span>\r\n          </a>\r\n          <div>\r\n            <ul class=\"submenu\">\r\n            <li class=\"\">\r\n              <a routerLink=\"/studylist\" [queryParams]=\"{ id: 'mystudies', start:'', end:'', label: 'Past 24Hrs'}\" routerLinkActive=\"active\" class=\"color-white\">\r\n                <span class=\"fw-15 active\">My Studies</span>\r\n              </a>\r\n            </li>\r\n            <li class=\"\">\r\n              <a routerLink=\"/studylist\" [queryParams]=\"{ id: 'myattestation', start:'', end:'', label: 'Past 24Hrs'}\" routerLinkActive=\"active\" class=\"color-white\">\r\n                <span class=\"fw-15 active\">My Attestation</span>\r\n              </a>\r\n            </li>\r\n            </ul>\r\n          </div>\r\n        </li>\r\n        <li class=\"parentmenu popup\" data-icon=\"3\">\r\n          <a class=\"color-white p-15\">\r\n            <i class=\"fa fa-lg fa-user-circle\"></i>\r\n            <span class=\"fw-15 p-l-10 parentli\">Admin</span>\r\n          </a>\r\n          <div>\r\n            <ul class=\"submenu\">\r\n              <li class=\"\">\r\n                <a routerLink=\"/userlist\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">User Profile</span>\r\n                </a>\r\n              </li>\r\n              <li class=\"\">\r\n                <a routerLink=\"/usergrouplist\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">User Group</span>\r\n                </a>\r\n              </li>\r\n\t\t\t  <li class=\"\">\r\n                <a routerLink=\"/worksheetconfig\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">Worksheet Config</span>\r\n                </a>\r\n              </li>\r\n              <li class=\"\">\r\n                <a routerLink=\"/examtypelist\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">Exam Type</span>\r\n                </a>\r\n              </li>\r\n              <li class=\"\">\r\n                <a routerLink=\"/rolelist\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">Roles</span>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </li>\r\n        <li class=\"parentmenu popup\" data-icon=\"4\">\r\n          <a class=\"color-white p-15\">\r\n            <i class=\"fa fa-cog fa-lg\"></i>\r\n            <span class=\"fw-15 p-l-10 parentli\">Settings</span>\r\n          </a>\r\n          <div>\r\n            <ul class=\"submenu\">\r\n              <li class=\"{{ldapConfigEnabled?'hide':'show'}}\">\r\n                <a routerLink=\"/passwordconfig\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">Password Configuration</span>\r\n                </a>\r\n              </li>\r\n              <li class=\"\">\r\n                <a routerLink=\"/ldapconfig\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">LDAP Configuration</span>\r\n                </a>\r\n              </li>\r\n              <li class=\"\">\r\n                <a routerLink=\"/smtpconfig\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">SMTP Configuration</span>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n    </nav>\r\n  </div>\r\n<!-- End Left Nav -->\r\n\r\n<!--POP UOP MENU-->\r\n<div class=\"popover-menu icon1 hidden-xs\">\r\n  <ul>\r\n    <li class=\"p-15\">\r\n      <a routerLink=\"/dashboard\" routerLinkActive=\"active\" class=\"color-white\">\r\n        <span class=\"fw-15 active\">My Tasks</span>\r\n      </a>\r\n    </li>\r\n  </ul>\r\n</div>\r\n<div class=\"popover-menu icon2 hidden-xs\">\r\n  <ul>\r\n    <li class=\"p-15\">\r\n      <a routerLink=\"/studylist\"[queryParams]=\"{ id: 'mystudies', start:'', end:'', label: 'Past 24Hrs'}\"  routerLinkActive=\"active\" class=\"color-white\">\r\n        <span class=\"fw-15 active\">My Studies</span>\r\n      </a>\r\n    </li>\r\n    <li class=\"p-15\">\r\n      <a routerLink=\"/studylist\" [queryParams]=\"{ id: 'myattestation', start:'', end:'', label: 'Past 24Hrs'}\" routerLinkActive=\"active\" class=\"color-white\">\r\n        <span class=\"fw-15 active\">My Attestation</span>\r\n      </a>\r\n    </li>\r\n  </ul>\r\n</div>\r\n<div class=\"popover-menu icon3 hidden-xs\">\r\n  <ul>\r\n    <li class=\"p-15\">\r\n      <a routerLink=\"/userlist\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n        <span class=\"fw-15 active\">User Profile</span>\r\n      </a>\r\n    </li>\r\n    <li class=\"p-15\">\r\n      <a routerLink=\"/usergrouplist\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n        <span class=\"fw-15 active\">User Group</span>\r\n      </a>\r\n    </li>\r\n\t<li class=\"p-15\">\r\n\t<a routerLink=\"/worksheetconfig\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n                  <span class=\"fw-15 active\">Worksheet Config</span>\r\n                </a>\r\n\t</li>\r\n    <li class=\"p-15\">\r\n      <a routerLink=\"/examtypelist\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n        <span class=\"fw-15 active\">Exam Type</span>\r\n      </a>\r\n    </li>\r\n    <li class=\"p-15\">\r\n      <a routerLink=\"/rolelist\" routerLinkActive=\"active\" class=\"color-white p-15\">\r\n        <span class=\"fw-15 active\">Roles</span>\r\n      </a>\r\n    </li>\r\n  </ul>\r\n</div>\r\n<div class=\"popover-menu icon4 hidden-xs\">\r\n  <ul>\r\n    <li class=\"p-15 {{ldapConfigEnabled?'hide':'show'}}\">\r\n      <a routerLink=\"/passwordconfig\" routerLinkActive=\"active\" class=\"color-white\">\r\n        <span class=\"fw-15 active\">Password Configuration</span>\r\n      </a>\r\n    </li>\r\n    <li class=\"p-15\">\r\n      <a routerLink=\"/ldapconfig\" routerLinkActive=\"active\" class=\"color-white\">\r\n        <span class=\"fw-15 active\">LDAP Configuration</span>\r\n      </a>\r\n    </li>\r\n    <li class=\"p-15\">\r\n      <a routerLink=\"/smtpconfig\" routerLinkActive=\"active\" class=\"color-white\">\r\n        <span class=\"fw-15 active\">SMTP Configuration</span>\r\n      </a>\r\n    </li>\r\n  </ul>\r\n</div>\r\n<!--POP UOP MENU Ends-->\r\n\r\n<!-- Mobile Sidemenu -->\r\n<div id=\"mob_sidemenu\">\r\n  <nav class=\"left-nav sidebar afix_top bg-black clearfix\">\r\n    <div class=\"col-xs-12 sidebar-logo\">\r\n      <img class=\"logo-default\" src=\"/assets/images/logo.png\" alt=\"Logo\" />\r\n      <div class=\"pull-right\"><i class=\"fa fa-close mob_close\"></i></div>\r\n    </div>\r\n    <div class=\"side_menu col-xs-12 p-x-0 pull-left\">\r\n      <ul>\r\n        <li class=\"active\" id=\"dash_toggle\">\r\n          <a routerLink=\"/dashboard\" routerLinkActive=\"active\" title=\"Dashboards\">\r\n            <i class=\"fa fa-pie-chart fa-lg fa-fw\"></i><span class=\"nav-label\">Dashboard</span>\r\n          </a>\r\n        </li>\r\n        <ul class=\"dash_submenu\">\r\n          <li class=\"\">\r\n            <a routerLink=\"/dashboard\" routerLinkActive=\"active\"><span class=\"nav-label\">My Tasks</span></a>\r\n          </li>\r\n        </ul>\r\n        <li>\r\n          <a routerLink=\"/studylist\" routerLinkActive=\"active\" title=\"Study List\">\r\n            <i class=\"fa fa-lg fa-th-list fa-fw\"></i><span class=\"nav-label\">StudyList</span>\r\n          </a>\r\n        </li>\r\n        <ul class=\"dash_submenu\">\r\n          <li class=\"\">\r\n          <a class=\"nav-label\" routerLink=\"/studylist\" [queryParams]=\"{ id: 'myattestation', start:'', end:'', label: 'Past 24Hrs'}\" routerLinkActive=\"active\" class=\"color-white\">\r\n            <span class=\"nav-label\">My Attestation</span>\r\n          </a>\r\n          </li>\r\n        </ul>\r\n        <li>\r\n          <a routerLink=\"/studylist\" routerLinkActive=\"active\" title=\"Study List\">\r\n            <i class=\"fa fa-user-circle fa-fw fa-lg\"></i>\r\n            <span class=\"nav-label\">Admin</span>\r\n          </a>\r\n        </li>\r\n        <ul class=\"dash_submenu\">\r\n          <li class=\"\">\r\n            <a routerLink=\"/userlist\" title=\"Layouts\"><span class=\"nav-label\">User Profile</span></a>\r\n          </li>\r\n          <li>\r\n            <a routerLink=\"/usergrouplist\" title=\"Layouts\"><span class=\"nav-label\">User Group</span></a>\r\n          </li>\r\n\t\t   <li>\r\n\t\t    <a routerLink=\"/worksheetconfig\" title=\"Layouts\"><span class=\"nav-label\">Worksheet Config</span></a>\r\n          </li>\r\n          <li>\r\n            <a routerLink=\"/examtypelist\" title=\"Layouts\"><span class=\"nav-label\">Exam Type</span></a>\r\n          </li>\r\n          <li class=\"\">\r\n            <a routerLink=\"/rolelist\" title=\"Layouts\"><span class=\"nav-label\">Roles</span></a>\r\n          </li>\r\n        </ul>\r\n        <li>\r\n          <a title=\"Settings\">\r\n            <i class=\"fa fa-cog fa-lg fa-fw\"></i><span class=\"nav-label\">Settings</span>\r\n          </a>\r\n        </li>\r\n        <ul class=\"dash_submenu\">\r\n          <li class=\"{{ldapConfigEnabled?'hide':'show'}}\">\r\n            <a routerLink=\"/passwordconfig\" routerLinkActive=\"active\"><span class=\"nav-label\">Password Configuration</span></a>\r\n          </li>\r\n          <li class=\"\">\r\n            <a routerLink=\"/ldapconfig\" routerLinkActive=\"active\"><span class=\"nav-label\">LDAP Configuration</span></a>\r\n          </li>\r\n          <li class=\"\">\r\n            <a routerLink=\"/smtpconfig\" routerLinkActive=\"active\"><span class=\"nav-label\">SMTP Configuration</span></a>\r\n          </li>\r\n        </ul>\r\n      </ul>\r\n    </div>\r\n  </nav>\r\n</div>\r\n<!-- Mobile Sidemenu end-->\r\n"

/***/ }),
/* 421 */
/***/ (function(module, exports) {

module.exports = "<div class=\"contentpage m-l-65\">\r\n\t<div class=\"\">\r\n\t\t<!-- Breadcrumbs -->\r\n\t\t<div class=\"row m-x-0 bg-ssblue\">\r\n\t\t\t<div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n\t\t\t\t<div class=\"pull-left color-white\">\r\n\t\t\t\t\t<h2 class=\"m-y-10\">Adminstrator</h2>\r\n\t\t\t\t</div>\r\n\t\t\t\t<ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n\t\t\t\t\t<li><a href=\"#\" class=\"color-white\"><i\r\n\t\t\t\t\t\t\tclass=\"fa fa-lg fa-cog\"></i></a></li>\r\n\t\t\t\t\t<li class=\"color-white\">System Configuration</li>\r\n\t\t\t\t\t<li class=\"color-white\">Login Security Policy</li>\r\n\t\t\t\t</ol>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!-- Breadcrumbs Ends -->\r\n\r\n\t\t<!--Password Configuration-->\r\n\r\n\t\t<div class=\"row m-t-15 m-x-0\">\r\n\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t<form #pwdConfigForm=\"ngForm\" novalidate>\r\n\t\t\t\t\t<div class=\"col-md-offset-2 col-md-8 b-1-lightgray bg-white\">\r\n\t\t\t\t\t\t<div class=\"row m-x-0\">\r\n\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t<h3>Login Security Policy Configuration</h3>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row m-x-0 m-t-5\">\r\n\t\t\t\t\t\t\t<div\r\n\t\t\t\t\t\t\t\tclass=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row m-x-0 m-t-5\">\r\n\t\t\t\t\t\t\t<div class=\"col-xs-12 col-sm-10 p-10\">\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12 form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Password Complexity(Minimum 3 Required)</label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-offset-1\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"checkbox\"> <input id=\"isUppercase\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"checkbox\" value=\"1\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"pwdConfig.isUppercase\" name=\"isUppercase\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t#isUppercase=\"ngModel\">Upper Case Characters (A to\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tZ)\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"checkbox\"> <input id=\"isLowercase\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"checkbox\" value=\"1\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"pwdConfig.isLowercase\" name=\"isLowercase\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t#isLowercase=\"ngModel\"> Lower Case Characters (a to\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tz)\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"checkbox\"> <input id=\"isNumber\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"checkbox\" value=\"1\" [(ngModel)]=\"pwdConfig.isNumber\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tname=\"isNumber\" #isNumber=\"ngModel\"> Numbers (0 to\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t9)\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label class=\"checkbox\"> <input id=\"isSplChar\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\ttype=\"checkbox\" value=\"1\" [(ngModel)]=\"pwdConfig.isSplChar\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tname=\"isSplChar\" #isSplChar=\"ngModel\"> Special\r\n\t\t\t\t\t\t\t\t\t\t\t\t\tCharacters (`~!@#$%^&*-+=.,:;?)\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12 form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-8 col-md-8\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Password Minimum Length<span class=\"color-red\">*</span></label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-2 col-md-2 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tid=\"pwdminlen\" required [(ngModel)]=\"pwdConfig.pwdminlen\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tname=\"pwdminlen\" #pwdminlen=\"ngModel\" maxlength=\"2\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tonpaste=\"return false\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(blur)=\"dispwdminlen(pwdminlen.value)\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(focus)=\"dispwdminlen('hide')\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(keypress)=\"validateNum($event);\">\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t\t\t<div [hidden]=\"!errpwdminlen\"\r\n\t\t\t\t\t\t\t\t\t\t\tclass=\"col-xs-offset-8 col-xs-4 alert alert-danger p-5\">\r\n\t\t\t\t\t\t\t\t\t\t\tPassword length should be in the range of 8 - 64</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12 form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-8 col-md-8\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>User defined password expires in (days)</label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-2 col-md-2 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tid=\"userdfndpwdexp\" [(ngModel)]=\"pwdConfig.userdfndpwdexp\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tname=\"userdfndpwdexp\" #userdfndpwdexp=\"ngModel\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tmaxlength=\"3\" onpaste=\"return false\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(blur)=\"diserruserdndpwd(userdfndpwdexp.value)\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(focus)=\"diserruserdndpwd('hide')\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(keypress)=\"validateNum($event);\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div [hidden]=\"!erruserdndpwd\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\t\t\t\t\t\t\tInvalid entry</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12 form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-8 col-md-8\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>History of password reuse restriction count<span\r\n\t\t\t\t\t\t\t\t\t\t\t\tclass=\"color-red\">*</span></label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-2 col-md-2 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tid=\"pwdReuseRestriction\" maxlength=\"2\" required\r\n\t\t\t\t\t\t\t\t\t\t\t\t[(ngModel)]=\"pwdConfig.pwdReuseRestriction\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tname=\"pwdReuseRestriction\" #pwdReuseRestriction=\"ngModel\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tonpaste=\"return false\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(blur)=\"diserrpwdreuse(pwdReuseRestriction.value)\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(focus)=\"diserrpwdreuse('hide')\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(keypress)=\"validateNum($event);\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div [hidden]=\"!errpwdreuse\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\t\t\t\t\t\t\tplease provide value from 1 to 10</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12 form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-8 col-md-8\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Account Lock-Out threshold (unsuccessful\r\n\t\t\t\t\t\t\t\t\t\t\t\tattempts)</label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-2 col-md-2 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" class=\"form-control\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tid=\"accntlockmax\" [(ngModel)]=\"pwdConfig.accntlockmax\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tname=\"accntlockmax\" #accntlockmax=\"ngModel\" maxlength=\"3\"\r\n\t\t\t\t\t\t\t\t\t\t\t\tonpaste=\"return false\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(blur)=\"diserrlockmax(accntlockmax.value)\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(focus)=\"diserrlockmax('hide')\"\r\n\t\t\t\t\t\t\t\t\t\t\t\t(keypress)=\"validateNum($event);\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div [hidden]=\"!errlockmax\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\t\t\t\t\t\t\tInvalid entry</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t\t<div [hidden]=\"!checkminthree\"\r\n\t\t\t\t\t\t\t\t\t\tclass=\"col-xs-offset-2 col-xs-6 alert alert-danger p-5\">\r\n\t\t\t\t\t\t\t\t\t\tPlease select Minimum 3 Complexity Constraints</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12 m-b-10 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-offset-4 col-md-offset-5\">\r\n\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" (click)=\"resetDefault()\">Reset\r\n\t\t\t\t\t\t\t\t\t\t\tTo Default</button>\r\n\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" (click)=\"resetForm()\"\r\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"orgLoginPolicyId?false:true\">Reset</button>\r\n\t\t\t\t\t\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\"\r\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"!pwdConfigForm.form.valid||erruserdndpwd||errsyspwd||errpwdreuse || errtmplock || errlockmax||errpwdminlen||erruserdndpwd\"\r\n\t\t\t\t\t\t\t\t\t\t\t(click)=\"savePolicy(pwdConfigForm.value,pwdConfigForm.valid)\">Save</button>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</form>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),
/* 422 */
/***/ (function(module, exports) {

module.exports = "<modal #confirmDelete [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Reallocate Role</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Do you want to re-allocate users and groups from this role before deletion?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"noReallocate()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"reAllocateRole()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #reAllocatePopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Reallocate Role</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    <div class=\"color\">Please choose a Role</div>\r\n    <ng-select [allowClear]=\"true\"\r\n    [items]=\"rolesList\"\r\n    [disabled]=\"disabled\"\r\n    [active]='reAllocatePopup.visible?null:\"\"'\r\n    (data)=\"refreshValue($event)\"\r\n    (selected)=\"selected($event)\"\r\n    (typed)=\"typed($event)\"\r\n    (removed)=\"removed($event)\">\r\n    </ng-select>\r\n    <div [hidden]=\"reallocatedRoleSelected\" class=\"alert alert-danger alertRequired\">Please select a Role</div>\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelReassign()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmReassign()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #oneRoleDelete [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Delete Role</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Do you want to delete the Role?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"noDelete()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"noReallocate()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<!-- Role List Page -->\r\n\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-10\">\r\n  <!-- Breadcrumbs -->\r\n  <div class=\"row m-x-0 bg-ssblue\">\r\n    <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n      <div class=\"pull-left color-white\">\r\n        <h2 class=\"m-y-10\">Roles</h2>\r\n      </div>\r\n      <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n        <li><i class=\"fa fa-lg fa-user-circle color-white\"></i></li>\r\n        <li class=\"color-white\"><a routerLink=\"/rolelist\" class=\"color-white\">Roles List</a></li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <!-- Breadcrumbs Ends -->\r\n\r\n  <div class=\"row m-t-15 m-x-0\">\r\n  <div class=\"col-xs-12\">\r\n    <table id=\"tableRoleList\" class=\"display table\" width=\"100%\">\r\n    <thead>\r\n    <tr>\r\n    <th>Role Name </th>\r\n    <th>Role Description</th>\r\n    <th>Action</th>\r\n    </tr>\r\n    </thead>\r\n    </table>\r\n  </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 423 */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"\">\r\n  <!-- Breadcrumbs -->\r\n  <div class=\"row m-x-0 bg-ssblue\">\r\n    <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n      <div class=\"pull-left color-white\">\r\n        <h2 class=\"m-y-10\">Administrator</h2>\r\n      </div>\r\n      <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n        <li><a href=\"#\" class=\"color-white\"><i class=\"fa fa-lg fa-cog\"></i></a></li>\r\n        <li class=\"color-white\">System Configuration</li>\r\n        <li class=\"color-white\">SMTP</li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <!-- Breadcrumbs Ends -->\r\n\r\n  <!--Smtp Configuration-->\r\n\r\n  <div class=\"row m-t-15 m-x-0\">\r\n  <div class=\"col-xs-12\">\r\n    <form novalidate  #smtpConfigForm=\"ngForm\" >\r\n    <div class=\"col-md-offset-2 col-md-8 b-1-lightgray bg-white\">\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-12\">\r\n          <h3>SMTP Configuration</h3>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-x-0 m-t-5\">\r\n        <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\"></div>\r\n      </div>\r\n      <div class=\"row m-x-0 m-t-5\">\r\n        <div class=\"col-sm-offset-2 col-md-offset-2 col-xs-12 col-sm-8 p-10\">\r\n          <div class=\"col-xs-12 p-x-0\">\r\n            <div class=\"col-xs-12 form-group\">\r\n              <div class=\"col-xs-6 col-md-4\">\r\n                <label>SMTP Server</label>\r\n              </div>\r\n              <div class=\"col-xs-6 col-md-6\">\r\n                <input type=\"text\" class=\"form-control\" required [(ngModel)]=\"smtpConfig.server\" (keypress)=\"validateAlpha($event);\" name=\"server\" id=\"server\" #server=\"ngModel\" maxlength=\"50\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xs-12 p-x-0\">\r\n            <div class=\"col-xs-12 form-group\">\r\n              <div class=\"col-xs-6 col-md-4\">\r\n                <label>SMTP Port</label>\r\n              </div>\r\n              <div class=\"col-xs-6 col-md-6\">\r\n                <input type=\"text\" class=\"form-control\" required [(ngModel)]=\"smtpConfig.port\"  (keypress)=\"validateNum($event)\"name=\"port\" id=\"port\" #port=\"ngModel\" maxlength=\"5\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xs-12 p-x-0\">\r\n            <div class=\"col-xs-12 form-group\">\r\n              <div class=\"col-xs-6 col-md-4\">\r\n                <label>From Address</label>\r\n              </div>\r\n              <div class=\"col-xs-6 col-md-6\">\r\n                <input type=\"text\" class=\"form-control\" required [(ngModel)]=\"smtpConfig.defaultEmail\" name=\"defaultEmail\" id=\"defaultEmail\" #defaultEmail=\"ngModel\" maxlength=\"100\" (focus)=\"removeEmailError()\">\r\n\r\n                <div [hidden]=\"invalidEmail\" class=\"alert alert-danger\">Please enter a valid Email ID</div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xs-12 p-x-0\">\r\n            <div class=\"col-xs-12 form-group\">\r\n              <div class=\"col-xs-6 col-md-4\">\r\n                <label>Enable Authentication</label>\r\n              </div>\r\n              <div class=\"col-xs-6 col-md-6\">\r\n                <select class=\"form-control\" id=\"isAuth\" name=\"isAuth\"  [(ngModel)]=\"smtpConfig.isAuth\" (change)=\"getText($event)\">\r\n                  <option *ngFor=\"let item of selectOption\" [value]=\"item.value\" [disabled]=\"item.value=='Select'\" >{{item.value}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xs-12 p-x-0\">\r\n            <div class=\"col-xs-12 form-group\">\r\n              <div class=\"col-xs-6 col-md-4\">\r\n                <label>Authenticate Username</label>\r\n              </div>\r\n              <div class=\"col-xs-6 col-md-6\">\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"smtpConfig.userName\" id=\"userName\" name=\"userName\" #userName=\"ngModel\" (focus)=\"removeUserNameError()\" [readonly]=\"disableUserName\">\r\n                <div [hidden]=\"userNameError\" class=\"alert alert-danger alertRequired\">Please provide user name\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xs-12 p-x-0\">\r\n            <div class=\"col-xs-12 form-group\">\r\n              <div class=\"col-xs-6 col-md-4\">\r\n                <label>Authenticate Password</label>\r\n              </div>\r\n              <div class=\"col-xs-6 col-md-6\">\r\n                <input type=\"password\" class=\"form-control\" [(ngModel)]=\"smtpConfig.password\" id=\"password\" name=\"password\" #password=\"ngModel\" (focus)=\"removePasswordError()\" [readonly]=\"disablePassword\">\r\n                <div [hidden]=\"passwordError\" class=\"alert alert-danger alertRequired\">Please provide password\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xs-12 m-b-10 p-x-0\">\r\n            <div class=\"col-xs-offset-5 col-md-offset-5\">\r\n              <button class=\"btn btn-primary\" (click)=\"resetForm()\">Reset</button>\r\n              <button type=\"submit\" class=\"btn btn-primary\" [disabled]= \"!smtpConfigForm.form.valid\" (click)=\"saveSmtpConfiguration(smtpConfigForm.value,smtpConfigForm.valid)\">Save</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    </form>\r\n  </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 424 */
/***/ (function(module, exports) {

module.exports = "<modal #assignPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Assign study</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Please confirm study assignment to self\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelAssign()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmAssign('poc')\">OK</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #qaassignPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Assign qa study</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Please confirm study assignment to self\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"qacancelAssign()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmAssign('qa')\">OK</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #unassignPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Unassign study</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Please confirm to un-assign study\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelUnassign()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmUnassign()\">OK</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #unAssignStudyWorksheetPopUp [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Un-Assign study</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    The data saved in the Worksheet will be lost. Do you want to continue?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelUnAssignStudy()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmUnAssignStudy()\">OK</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #reassignPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Reassign study</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    <div class=\"color\">Please choose user for Re-Assigning study</div>\r\n      <ng-select [allowClear]=\"true\"\r\n        [items]=\"items\"\r\n        [disabled]=\"disabled\"\r\n        (data)=\"refreshValue($event)\"\r\n        (selected)=\"selected($event)\"\r\n        (typed)=\"typed($event)\"\r\n        (removed)=\"removed($event)\">\r\n      </ng-select>\r\n    <div [hidden]=\"userNameExists\" class=\"alert alert-danger alertRequired\">Please select a proper Username</div>\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelReassign()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmReassign()\">Re-Assign</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #assignStudyByAdminPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Assign study</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    <div class=\"color\">Please choose user for Assigning study</div>\r\n      <ng-select [allowClear]=\"true\"\r\n        [items]=\"userNamesItems\"\r\n        [disabled]=\"disabled\"\r\n        [active]='assignStudyByAdminPopup.visible?null:\"\"'\r\n        (data)=\"refreshValue($event)\"\r\n        (selected)=\"selected($event)\"\r\n        (typed)=\"typed($event)\"\r\n        (removed)=\"removed($event)\">\r\n      </ng-select>\r\n    <div [hidden]=\"userNameExists\" class=\"alert alert-danger alertRequired\">Please select a proper Username</div>\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelAssignStudyByAdmin()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmAssignStudyByAdmin()\">Assign</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #assignToast [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Assign study</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Study Assigned successfully\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #reassignToast [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Reassign study</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Study successfully Re-Assigned\r\n  </modal-body>\r\n</modal>\r\n\r\n<modal #reassignstudytoattendingPopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Choose Attending</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    <div class=\"color\">Select attending doctor for the study</div>\r\n      <ng-select [allowClear]=\"true\"\r\n        [items]=\"userNamesItems\"\r\n        [disabled]=\"disabled\"\r\n        [active]='reassignstudytoattendingPopup.visible?null:\"\"'\r\n        (data)=\"refreshValue($event)\"\r\n        (selected)=\"selected($event)\"\r\n        (typed)=\"typed($event)\"\r\n        (removed)=\"removed($event)\">\r\n      </ng-select>\r\n    <div [hidden]=\"userNameExists\" class=\"alert alert-danger alertRequired\">Please select a proper Username</div>\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelAssignToAttend()\">Cancel</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmAssignToAttend()\">Ok</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<modal #deletePopup [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Delete Study</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Do you really want to delete the selected study?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelDelete()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmDelete()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<!-- Study List Page -->\r\n\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-10\">\r\n  <breadcrum title=\"Study List\" secondtitle=\"Studies\" icon=\"fa-th-list\" [defaultDuration]=\"defaultDuration\" (durationChange)=\"onDurationChange($event);\"></breadcrum>\r\n\r\n  <!--Advanced Search-->\r\n  <form novalidate #createAdvancedSearchForm=\"ngForm\" novalidate>\r\n    <div class=\"row m-t-15 bg-lightergray p-10\">\r\n      <div class=\"col-sm-2\">\r\n        <div class=\"col-sm-12\">\r\n          <input type=\"text\" class=\"form-control\" placeholder=\"Patient Name\" id=\"patientName\" required #patientName=\"ngModel\" name=\"patientName\" [(ngModel)]=\"searchData.patientName\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-2\">\r\n        <div class=\"col-sm-12\">\r\n          <input type=\"text\" class=\"form-control\" placeholder=\"Performing Physician\" id=\"pocName\" #pocName=\"ngModel\" required name=\"pocName\" [(ngModel)]=\"searchData.pocName\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-2\">\r\n        <div class=\"col-sm-12\">\r\n          <select class=\"form-control\" id=\"searchExamType\" name=\"searchExamType\" [ngModel]=\"searchData.searchExamType?searchData.searchExamType:'ExamType'\" [(ngModel)]=\"searchData.searchExamType\" required>\r\n            <option value=\"ExamType\" disabled>Exam Type</option>\r\n            <option *ngFor=\"let item of searchExamtypes\" [value]=\"item.examTypeDesc\" >{{item.examTypeDesc}}</option>\r\n          </select>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-2\">\r\n        <div class=\"col-sm-12\">\r\n          <select class=\"form-control\" id=\"searchStatus\" name=\"searchStatus\" required [ngModel]=\"searchData.searchStatus?searchData.searchStatus:'Status'\" [(ngModel)]=\"searchData.searchStatus\">\r\n            <option value=\"Status\" disabled>Status</option>\r\n            <option *ngFor=\"let item of searchStatuses\" [value]=\"item.name\">{{item.name}}</option>\r\n          </select>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-2\">\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"searchStudies(createAdvancedSearchForm.value)\"> Search </button>\r\n      </div>\r\n    </div>\r\n  </form>\r\n\r\n  <!--Study Table-->\r\n  <div class=\"row m-t-15 m-x-0\">\r\n  <div class=\"col-xs-12\">\r\n    <table id=\"tableStudyList\" class=\"display table\" width=\"100%\">\r\n      <thead>\r\n        <tr >\r\n          <th class=\"sorting_disabled\"></th>\r\n          <th>Study</th>\r\n          <th>Study Type</th>\r\n          <th>Exam Type</th>\r\n          <th>Device</th>\r\n          <th>Patient ID</th>\r\n          <th>Patient Name</th>\r\n          <th>Performing Physician</th>\r\n          <th>QA Reviewer</th>\r\n          <th>Attending Physician</th>\r\n          <th>Study Date & Time</th>\r\n          <th>Tags</th>\r\n          <th>Study Progress</th>\r\n          <th>Actions</th>\r\n          <th></th>\r\n        </tr>\r\n      </thead>\r\n    </table>\r\n  </div>\r\n  </div>\r\n\r\n  <!--Study Table Accordion -->\r\n\r\n  <div id=\"accordion\" style=\"display: none;\">\r\n  <div class=\"row m-x-0\">\r\n    <div class=\"col-xs-4 b-r-1-lightergray\">\r\n      <div class=\"col-xs-2 p-x-0\">\r\n        <div class=\"row m-x-0\">\r\n          <span class=\"avatar\"><img src=\"/assets/images/avatar-49.jpg\"></span>\r\n        </div>\r\n        <div class=\"row m-x-0 m-t-10\">\r\n          <i class=\"fa fa-fw fa-folder-o fa-2x\"></i><span>Split</span>\r\n        </div>\r\n      </div>\r\n    <div class=\"col-xs-10\">\r\n      <div class=\"row m-x-0\">\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-3 p-x-0\">\r\n            <label> Patient: </label>\r\n          </div>\r\n          <div class=\"col-xs-9 p-x-0\">\r\n            <span>\r\n            {{studyDetail?.patient.firstName}}\r\n            {{studyDetail?.patient.middleName}}\r\n            {{studyDetail?.patient.lastName}}</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-3 p-x-0\">\r\n            <label> Patient ID:</label>\r\n          </div>\r\n          <div class=\"col-xs-9 p-x-0\">\r\n            <span> {{studyDetail?.patient.id}} </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      </div>\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"row m-x-0\">\r\n          <div class=\"col-xs-3 p-x-0\">\r\n            <span>{{studyDetail?.patient.ethnicOrigin}}</span>\r\n          </div>\r\n          <div class=\"col-xs-2 p-x-0\">\r\n            <span>{{studyDetail?.patient.gender}}</span>\r\n          </div>\r\n          <div class=\"col-xs-2 p-x-0\">\r\n            <span>{{studyDetail?.age}} yrs</span>\r\n          </div>\r\n          <div class=\"col-xs-2 p-x-0\">\r\n            <span>{{studyDetail?.weight}}</span>\r\n          </div>\r\n          <div class=\"col-xs-2 p-x-0\">\r\n            <span>{{studyDetail?.height}} cm</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-2 p-x-0\">\r\n            <label>Indications:</label>\r\n          </div>\r\n          <div class=\"col-xs-10 p-x-0\">\r\n            <span></span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    </div>\r\n    <div class=\"col-xs-4 b-r-1-lightergray\">\r\n      <div class=\"row m-x-0\">\r\n        <label>Patient Exam Types</label>\r\n      </div>\r\n      <div *ngFor=\"let item of studyDetail?.examType;let i = index;\" class=\"row m-x-0 m-t-10\">\r\n        <div *ngFor=\"let items of item\">\r\n          <div class=\"col-xs-2 p-x-0\">\r\n            <span class=\"label bg-examtype\">\r\n            <span>{{items?.examtype}}</span>\r\n            </span>\r\n          </div>\r\n          <div class=\"col-xs-2 p-x-0\">\r\n            <label>Images:</label>\r\n            <span> {{studyDetail?.Images[0]}}</span>\r\n          </div>\r\n          <div class=\"col-xs-3 p-x-0\">\r\n            <label>Clips:</label>\r\n            <span> {{studyDetail?.Images[1]}}</span>\r\n          </div>\r\n          <div class=\"col-xs-5 p-x-0\">\r\n            <label>Progress:</label>\r\n            <span> {{items?.examtypeProgress}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-4\">\r\n    <div class=\"col-xs-6 p-x-0\">\r\n      <div class=\"row m-x-0\">\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-5 p-x-0\">\r\n            <label>POC Doctor:</label>\r\n          </div>\r\n          <div class=\"col-xs-7 p-x-0\">\r\n            <span> {{studyDetail?.requestingphysician.prefix}}\r\n            {{studyDetail?.requestingphysician.firstName}}\r\n            {{studyDetail?.requestingphysician.middleName}}\r\n            {{studyDetail?.requestingphysician.lastName}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-x-0 m-t-10\">\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-7 p-x-0\">\r\n            <label>Attending Doctor:</label>\r\n          </div>\r\n          <div class=\"col-xs-5 p-x-0\">\r\n            <span> {{studyDetail?.referringphysician.prefix}}\r\n            {{studyDetail?.referringphysician.firstName}}\r\n            {{studyDetail?.referringphysician.middleName}}\r\n            {{studyDetail?.referringphysician.lastName}}</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row m-x-0 m-t-10\">\r\n        <div class=\"col-xs-12 p-x-0\">\r\n          <div class=\"col-xs-6 p-x-0\">\r\n            <label>Shared Doctor:</label>\r\n          </div>\r\n          <div class=\"col-xs-6 p-x-0\">\r\n            <span> </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-6 p-x-0\">\r\n      <div class=\"col-xs-8 p-5 b-1-lightergray\">\r\n        <div class=\"col-xs-7 p-x-0\">\r\n          <div class=\"row m-x-0\">\r\n            <label>Device</label>\r\n          </div>\r\n          <div class=\"row m-x-0\">\r\n            <span *ngFor=\"let item of studyDetail?.modality\">{{item + ' '}}</span>\r\n          </div>\r\n        </div>\r\n      <div class=\"col-xs-5 p-x-0\">\r\n        <span class=\"avatar\"><img src=\"/assets/images/avatar-49.jpg\"></span>\r\n      </div>\r\n      </div>\r\n      <div class=\"col-xs-4 action p-r-0\">\r\n        <div class=\"dropdown table-dropdown action align-center p-4 b-1-lightgray clearfix lh-26\">\r\n          <a class=\"va-m pull-left\" routerLink=\"/imageviewer/{{studyDetail?.studyId}}\" routerLinkActive=\"active\"><i class=\"fa fa-fw fa-picture-o m-r-5\"></i></a>\r\n          <button class=\"btn btn-default dropdown-toggle pull-left\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\r\n            <span class=\"caret\"></span>\r\n          </button>\r\n          <ul class=\"dropdown-menu dropdown-menu-right\">\r\n            <li><a href=\"javascript:void(0)\"><i class=\"fa fa-fw fa-folder-open text-gray-lighter m-r-1\"></i> View</a></li>\r\n            <li><a href=\"javascript:void(0)\"><i class=\"fa fa-ticket text-gray-lighter fa-fw m-r-1\"></i> Add Task</a></li>\r\n            <li><a href=\"javascript:void(0)\"><i class=\"fa fa-fw fa-paperclip text-gray-lighter m-r-1\"></i> Add Files</a></li>\r\n            <li role=\"separator\" class=\"divider\"></li>\r\n            <li><a href=\"javascript:void(0)\" data-toggle=\"modal\" data-target=\".modal-alert-danger\"><i class=\"fa fa-fw fa-trash text-gray-lighter m-r-1\"></i> Delete</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 425 */
/***/ (function(module, exports) {

module.exports = "<modal #confirmDelete [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">Delete user group</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n     Do you want to delete the UserGroup?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"cancelDelete()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"confirmDeleteGroup()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-10\">\r\n  <!-- Breadcrumbs -->\r\n  <div class=\"row m-x-0 bg-ssblue\">\r\n    <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n      <div class=\"pull-left color-white\">\r\n        <h2 class=\"m-y-10\">User Group</h2>\r\n      </div>\r\n      <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n        <li><i class=\"fa fa-lg fa-users color-white\"></i></li>\r\n        <li class=\"color-white\"><a routerLink=\"/usergrouplist\" class=\"color-white\">User Groups</a></li>\r\n      </ol>\r\n    </div>\r\n  </div>\r\n  <!-- Breadcrumbs Ends -->\r\n\r\n  <!-- User Group List Page -->\r\n  <div class=\"row m-t-15 m-x-0\">\r\n    <div class=\"col-xs-12\">\r\n      <table id=\"tableUserGroupList\" class=\"display table\" width=\"80%\">\r\n        <thead>\r\n          <tr>\r\n            <th width=\"30%\">User Group Name</th>\r\n            <th width=\"65%\">User Group Description</th>\r\n            <th>Action</th>\r\n          </tr>\r\n        </thead>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 426 */
/***/ (function(module, exports) {

module.exports = "<modal #deactivateUserStatus [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">change user status</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n    Confirm User Deactivation?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelDeactivate()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmDeactivate()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n<modal #userUnlockToast [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-body>\r\n      User account unlocked successfully\r\n  </modal-body>\r\n</modal>\r\n<modal #activateUserStatus [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">change user status</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n   Confirm User activation?\r\n  </modal-body>\r\n  <modal-footer>\r\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"cancelActivate()\">No</button>\r\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmActivate()\">Yes</button>\r\n  </modal-footer>\r\n</modal>\r\n\r\n<div class=\"contentpage m-l-65\">\r\n<div class=\"m-r-10\">\r\n  <!-- Breadcrumbs -->\r\n   <div class=\"row m-x-0 bg-ssblue\">\r\n   <div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n     <div class=\"pull-left color-white\">\r\n       <h2 class=\"m-y-10\">User Profile</h2>\r\n     </div>\r\n     <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n       <li>\r\n           <i class=\"fa fa-lg fa-user-circle color-white\"></i>\r\n       </li>\r\n       <li class=\"color-white\"><a routerLink=\"/userlist\" class=\"color-white\">User Profiles</a></li>\r\n     </ol>\r\n   </div>\r\n   </div>\r\n   <!-- Breadcrumbs Ends -->\r\n\r\n   <!-- User List Page -->\r\n\r\n   <div class=\"row m-t-15 m-x-0\">\r\n   <div class=\"col-xs-12\">\r\n     <table id=\"tableUserList\" class=\"display table\" width=\"100%\">\r\n       <thead>\r\n         <tr>\r\n           <th>Title</th>\r\n           <th>Name</th>\r\n           <th>Username</th>\r\n           <th>Mobile Number</th>\r\n           <th>Email</th>\r\n           <th>Action</th>\r\n         </tr>\r\n       </thead>\r\n     </table>\r\n   </div>\r\n   </div>\r\n</div>\r\n</div>\r\n"

/***/ }),
/* 427 */
/***/ (function(module, exports) {

module.exports = "<div class=\"contentpage m-l-65\">\r\n\t<div class=\"\">\r\n\t\t<!-- Breadcrumbs -->\r\n\t\t<div class=\"row m-x-0 bg-ssblue\">\r\n\t\t\t<div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n\t\t\t\t<div class=\"pull-left color-white\">\r\n\t\t\t\t\t<h2 class=\"m-y-10\">User Preference</h2>\r\n\t\t\t\t</div>\r\n\t\t\t\t<!-- <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n\t\t\t\t\t<li><a href=\"#\" class=\"color-white\"><i\r\n\t\t\t\t\t\t\tclass=\"fa fa-lg fa-cog\"></i></a></li>\r\n\t\t\t\t\t<li class=\"color-white\">System Configuration</li>\r\n\t\t\t\t\t<li class=\"color-white\">Login Security Policy</li>\r\n\t\t\t\t</ol> -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!-- Breadcrumbs Ends -->\r\n\r\n\t\t<!--userpreference Configuration-->\r\n\r\n\t\t<div class=\"row m-t-15 m-x-0\">\r\n\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t<form #userpreference=\"ngForm\" novalidate>\r\n\t\t\t\t\t<div class=\"col-md-offset-2 col-md-8 b-1-lightgray bg-white\">\r\n\t\t\t\t\t\t<div class=\"row m-x-0\">\r\n\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t<h3>User Preference Configuration</h3>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row m-x-0 m-t-5\">\r\n\t\t\t\t\t\t\t<div\r\n\t\t\t\t\t\t\t\tclass=\"col-xs-12 col-sm-12 p-10 bg-lightgray fw-15\"> Study Management </div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row m-x-0 m-t-5\">\r\n\t\t\t\t\t\t\t<div class=\"col-xs-12 col-sm-10 p-10\">\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12 form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-8 col-md-8\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Manage Personal tags</label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-4 col-md-4 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t\t \t<div class=\"col-xs-12 col-md-12\">\r\n\t\t\t\t\t\t\t\t              <div class=\"col-xs-10 col-md-10 p-x-0\">\r\n\t\t\t\t\t\t\t\t                <input type=\"text\"  class=\"form-control\" [(ngModel)]=\"newPersonalTag\" name=\"newPersonalTag\" #title=\"ngModel\" />\r\n\t\t\t\t\t\t\t\t              </div>\r\n\t\t\t\t\t\t\t\t              <div class=\"col-xs-2 col-md-2 p-r-10\">\r\n\t\t\t\t\t\t\t\t                <i class=\"fa fa-plus-circle color-primary fw-20 m-t-5 fa-close\" aria-hidden=\"true\" (click)=\"addType()\"></i>\r\n\t\t\t\t\t\t\t\t              </div>\r\n\t\t\t\t\t\t\t\t            </div>\r\n\t\t\t\t\t\t\t\t            <div class=\"col-xs-12 p-x-0\">\r\n\t\t\t\t\t\t\t\t              <div class=\"col-xs-12 form-group p-x-0 p-t-10\">\r\n\t\t\t\t\t\t\t\t                <div class=\"col-xs-12 col-md-8\"></div>\r\n\t\t\t\t\t\t\t\t                <div class=\"col-xs-12 col-md-12\" >\r\n\t\t\t\t\t\t\t\t                  <ul class=\"form-control fa-border\"> <li *ngFor=\"let tag of personalTagsList; let i = tag\" [attr.data]=\"i\">\r\n\t\t\t\t\t\t\t\t                  <span class=\"fa fa-times color-primary fa-close\" aria-hidden=\"true\" (click)=\"deleteType(tag)\"></span><span>{{tag.name}}</span></li></ul>\r\n\t\t\t\t\t\t\t\t                </div>\r\n\t\t\t\t\t\t\t\t              </div>\r\n\t\t\t\t\t\t\t\t            </div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t <div class=\"col-xs-12 m-b-10 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-offset-4 col-md-offset-5\">\r\n\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click) = \"clearAll()\">Clear All</button>\r\n\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" (click)=\"savePersonalTags()\">Save</button>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div> \r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</form>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<modal #infoPopUp [keyboard]=\"false\" [backdrop]=\"false\">\r\n  <modal-header [show-close]=\"false\">\r\n    <h4 class=\"modal-title\">{{titleMsg}}</h4>\r\n  </modal-header>\r\n  <modal-body>\r\n   {{subMsg}}\r\n  </modal-body>\r\n</modal>\r\n\r\n"

/***/ }),
/* 428 */
/***/ (function(module, exports) {

module.exports = "<div class=\"contentpage m-l-65\">\r\n\t<div class=\"\">\r\n\t\t<!-- Breadcrumbs -->\r\n\t\t<div class=\"row m-x-0 bg-ssblue\">\r\n\t\t\t<div class=\"col-xs-12 col-sm-6 p-l-15\">\r\n\t\t\t\t<div class=\"pull-left color-white\">\r\n\t\t\t\t\t<h2 class=\"m-y-10\">Worksheet Configuration</h2>\r\n\t\t\t\t</div>\r\n\t\t\t\t<!-- <ol class=\"breadcrumb bg-ssblue pull-left fw-15 m-b-0 m-t-10 p-l-15\">\r\n\t\t\t\t\t<li><a href=\"#\" class=\"color-white\"><i\r\n\t\t\t\t\t\t\tclass=\"fa fa-lg fa-cog\"></i></a></li>\r\n\t\t\t\t\t<li class=\"color-white\">System Configuration</li>\r\n\t\t\t\t\t<li class=\"color-white\">Login Security Policy</li>\r\n\t\t\t\t</ol> -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<!-- Breadcrumbs Ends -->\r\n\r\n\t\t<!--userpreference Configuration-->\r\n\r\n\t\t<div class=\"row m-t-15 m-x-0\">\r\n\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t<form #werksheetConfigForm=\"ngForm\" >\r\n\t\t\t\t\t<div class=\"col-md-offset-2 col-md-8 b-1-lightgray bg-white\">\r\n\t\t\t\t\t\t<div class=\"row m-x-0\">\r\n\t\t\t\t\t\t\t<div class=\"col-xs-12\">\r\n\t\t\t\t\t\t\t\t<h3>Worksheet Configuration</h3>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<!--<div class=\"row m-x-0 m-t-5\">\r\n\t\t\t\t\t\t\t<div\r\n\t\t\t\t\t\t\t\tclass=\"col-xs-12 col-sm-12 p-10 bg-lightgray fw-15\"> Study Management </div>\r\n\t\t\t\t\t\t</div>-->\r\n\t\t\t\t\t\t<div class=\"row m-x-0 m-t-5\">\r\n\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<div class=\"col-xs-12 col-sm-10 p-10\">\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12 form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-8 col-md-8\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Aging alert notification</label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-2 col-md-2 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"  \r\n\t\t\t\t\t\t\t\t\t\t\t\tid=\"aginalertnotify\" name=\"aginalertnotify\"  \r\n\t\t\t\t\t\t\t\t\t\t\t\tmaxlength=\"2\"  ngControl=\"msisdnForm\"  required >\r\n\t\t\t\t\t\t\t\t\t\t\t<div [hidden]=\"!erruserdndpwd\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\t\t\t\t\t\t\tInvalid entry</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div class=\"col-xs-12 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-12 form-group\">\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-8 col-md-8\">\r\n\t\t\t\t\t\t\t\t\t\t\t<label>Remainder alert notification</label>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-2 col-md-2 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\"  \r\n\t\t\t\t\t\t\t\t\t\t\t\tid=\"reminderalertnotify\"  name=\"reminderalertnotify\"  \r\n\t\t\t\t\t\t\t\t\t\t\t\tmaxlength=\"3\" required>\r\n\t\t\t\t\t\t\t\t\t\t\t<div [hidden]=\"!erruserdndpwd\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\t\t\t\t\t\t\tInvalid entry</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t <div class=\"col-xs-12 m-b-10 p-x-0\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"col-xs-offset-4 col-md-offset-5\">\r\n\t\t\t\t\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary\"\r\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"!werksheetConfigForm.form.valid\"\r\n\t\t\t\t\t\t\t\t\t\t\t(click)=\"savePolicy(werksheetConfigForm.value,werksheetConfigForm.valid)\">Save</button>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div> \r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</form>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),
/* 429 */,
/* 430 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(358);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(429)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(93);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(359);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(360);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(361);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(362);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(363);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(364);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(365);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(366);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(367);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(368);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_environment__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angularclass_hmr__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angularclass_hmr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__angularclass_hmr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__i18n__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_css_style_css__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_css_style_css__);
/* harmony export (immutable) */ __webpack_exports__["main"] = main;
/*
 * Angular bootstraping
 */



/*

 * App Module
 * our top level module that holds all of our components
 */

/*
 * Translation Template
 */


/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__i18n__["a" /* getTranslationProviders */])().then(function (providers) {
        var options = { providers: providers };
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["platformBrowserDynamic"])()
            .bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app__["a" /* AppModule */], options).then(function(MODULE_REF) {
  if (false) {
    module["hot"]["accept"]();
    
    if (MODULE_REF.instance["hmrOnInit"]) {
      module["hot"]["data"] && MODULE_REF.instance["hmrOnInit"](module["hot"]["data"]);
    }
    if (MODULE_REF.instance["hmrOnStatus"]) {
      module["hot"]["apply"](function(status) {
        MODULE_REF.instance["hmrOnStatus"](status);
      });
    }
    if (MODULE_REF.instance["hmrOnCheck"]) {
      module["hot"]["check"](function(err, outdatedModules) {
        MODULE_REF.instance["hmrOnCheck"](err, outdatedModules);
      });
    }
    if (MODULE_REF.instance["hmrOnDecline"]) {
      module["hot"]["decline"](function(dependencies) {
        MODULE_REF.instance["hmrOnDecline"](dependencies);
      });
    }
    module["hot"]["dispose"](function(store) {
      MODULE_REF.instance["hmrOnDestroy"] && MODULE_REF.instance["hmrOnDestroy"](store);
      MODULE_REF.destroy();
      MODULE_REF.instance["hmrAfterDestroy"] && MODULE_REF.instance["hmrAfterDestroy"](store);
    });
  }
  return MODULE_REF;
})
            .then(__WEBPACK_IMPORTED_MODULE_1__app_environment__["a" /* decorateModuleRef */]);
        // .catch(err => console.error(err));
    });
}
// needed for hmr
// in prod this is replace for document ready
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angularclass_hmr__["bootloader"])(main);


/***/ })
],[588]);
//# sourceMappingURL=main.bundle.js.map