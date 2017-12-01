import {Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core'
import {AppState} from "./app.service";
import {StudylistService} from "./studylist/studylist.service";
import { ObservationsService } from "./imageviewer/observations/observations.service"
import {StudyStatus} from "./app.enum";
import {RuleService, RuleResult} from "./app.rule";

class ConditionalDirective {

  constructor(
    private el: ElementRef,
    private _appState: AppState,
    private _studyService: StudylistService,
    private _observationsService: ObservationsService,
    private renderer: Renderer) {

  }

  private studyStatus: string;
  private qaEnabled: boolean;
  private attestationEnabled: boolean;
  private loggedInUser: string;
  private pocUser: string;
  private currentUser: string;
  private qaUser: string;
  private qaSigned: boolean;
  private qaAttestationSignId: boolean;
  private attestedUser: string;
  private condition: string;

  private submitOnSign: boolean;

  ngOnInit(condition) {
    this.condition = condition;
    this.getPreferenceDetails();
    this.getStudyDetails();
    this.validate();
    this._studyService.getStudyUpdateEmitter().subscribe(res => {
      this.getStudyDetails();
      this.validate();
    });
    this._observationsService.getWrkshtUpdateEmitter().subscribe(res => {
      this.qaSigned = res.qaSigned;
      this.validate();
    });
    this._observationsService.getQaAttestedSignEmitter().subscribe(res => {
      this.qaAttestationSignId = res.qaAttestationSignId;
      this.validate();
    });
  }

  getPreferenceDetails() {
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

  }

  getStudyDetails() {
    var study = this._studyService.getCurrentStudy();
    if (study) {
      this.studyStatus = study[0].status[0];
      this.pocUser = (study[0].assignedUser[0]) ? study[0].assignedUser[0].id : null;
      this.qaUser = (study[0].qaUser[0]) ? study[0].qaUser[0].id : null;
      this.attestedUser = (study[0].attendingUser[0]) ? study[0].attendingUser[0].id : null;
      var studyStatusNum = StudyStatus[this.studyStatus];
      this.currentUser = (studyStatusNum <= StudyStatus.Signed) ? this.pocUser : ((studyStatusNum <= StudyStatus.QAInProgress) ? this.qaUser : this.attestedUser);
    } else {
      console.warn("No study details present in StudylistService");
    }
  }

  getWorksheetDetails() {
    this.qaSigned = this._observationsService.getQaSigned();
  }

  validate() {
    try {
      var studyStatus = this.studyStatus;
      var studyStatusNum = StudyStatus[this.studyStatus];
      var StudyStatusEnum = StudyStatus;
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
        this.failure()

    } catch (e) {
      console.error("Invalid condition" + this.condition, "Available variables studyStatus(string), studyStatusNum(integer), StudyStatusEnum(enum), qaEnabled(boolean), attestationEnabled(boolean), loggedInUser(string), pocUser(string), qaUser(string), attestedUser(string), currentUser(string), qaSigned(boolean).", e)
    }
  }

  success() {
  }

  failure() {
  }
}


@Directive({
  selector: '[hideOn]'
})
export class HideOnDirective extends ConditionalDirective {

  constructor(
    private el: ElementRef,
    private _appState: AppState,
    private _studyService: StudylistService,
    private _observationsService: ObservationsService,
    private renderer: Renderer) {
    super(el, _appState, _studyService, _observationsService, renderer);
  }

  @Input('hideOn') condition: string;

  ngOnInit() {
    console.log('HideOnDirective', this.condition);
    super.ngOnInit(this.condition);
  }

  success() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
  }

  failure() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
  }

  // <h2 [hideOn]="'qaEnabled'" class="m-y-10">{{title}}</h2>

}


@Directive({
  selector: '[disableOn]'
})
export class DisableOnDirective extends ConditionalDirective {

  constructor(
    private el: ElementRef,
    private _appState: AppState,
    private _studyService: StudylistService,
    private _observationsService: ObservationsService,
    private renderer: Renderer) {
    super(el, _appState, _studyService, _observationsService, renderer);
  }

  @Input('disableOn') condition: string;

  ngOnInit() {
    super.ngOnInit(this.condition);
  }

  success() {
    this.renderer.setElementProperty(this.el.nativeElement, 'disabled', true);
  }

  failure() {
    this.renderer.setElementProperty(this.el.nativeElement, 'disabled', false);
  }
  // <button [disableOn]="'qaEnabled'" class="btn btn-secondary"
  // type="button"><i class="glyphicon glyphicon-calendar fa
  // fa-calendar"></i></button>
}

@Directive({
  selector: '[enableOn]'
})
export class EnableOnDirective extends ConditionalDirective {

  constructor(
    private el: ElementRef,
    private _appState: AppState,
    private _studyService: StudylistService,
    private _observationsService: ObservationsService,
    private renderer: Renderer) {
    super(el, _appState, _studyService, _observationsService, renderer);
  }

  @Input('enableOn') condition: string;

  ngOnInit() {
    super.ngOnInit(this.condition);
  }

  success() {
    this.renderer.setElementProperty(this.el.nativeElement, 'disabled', false);
  }

  failure() {
    this.renderer.setElementProperty(this.el.nativeElement, 'disabled', true);
  }
  // <button [disableOn]="'qaEnabled'" class="btn btn-secondary"
  // type="button"><i class="glyphicon glyphicon-calendar fa
  // fa-calendar"></i></button>

}

@Directive({
  selector: '[innerHtmlOn]'
})
export class InnerHtmlOnDirective extends ConditionalDirective {

  constructor(
    private el: ElementRef,
    private _appState: AppState,
    private _studyService: StudylistService,
    private _observationsService: ObservationsService,
    private renderer: Renderer) {
    super(el, _appState, _studyService, _observationsService, renderer);
  }
  @Input('innerHtmlOn') condition: string;
  @Input('innerHtml') htmlString: string;
  @Input('defaultHtml') defaultHtmlString: string;

  private originalHtml: string;

  ngOnInit() {
    super.ngOnInit(this.condition);
  }

  success() {
    this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.htmlString);
  }

  failure() {
    this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.defaultHtmlString);
  }

  // <h2 [innerHtmlOn]="'!qaEnabled'" innerHtml="Test"
  // defaultHtml="Test1">Test1</h2>
}

@Directive({
  selector: '[uiRule]'
})
export class UIRuleDirective {

  constructor(
    private el: ElementRef,
    private _ruleService: RuleService,
    private renderer: Renderer) {
  }
  @Input('uiRule') ruleIds: string[];


  ngOnInit() {
    console.log("ruleIds", this.ruleIds);
    this._ruleService.getDataChangeEmitter().subscribe(() => {
      this.executeRules();
    });
    this.executeRules();
  }

  executeRules() {
    const results: RuleResult[] = this._ruleService.execute(this.ruleIds);
    console.log("results", results);
    for (let result of results) {
      if (result.hasOwnProperty('hide'))
        this.hide(result.hide);
      else if (result.hasOwnProperty('innerHTML'))
        this.innerHTML(result.innerHTML);
      else if (result.hasOwnProperty('disable'))
        this.disable(result.disable);
    }
  }

  hide(flag: boolean) {
    if (flag)
      this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    else
      this.renderer.setElementStyle(this.el.nativeElement, 'display', 'block');
  }

  innerHTML(content: string) {
    this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', content);
  }

  disable(flag: boolean) {
    if (flag)
      this.renderer.setElementProperty(this.el.nativeElement, 'disabled', true);
    else
      this.renderer.setElementProperty(this.el.nativeElement, 'disabled', false);
  }

  //<input type="text" class="form-control" [uiRule]="['WORKSHEET_SUBMIT_BUTTON_DISABLE']">

}
