import { Injectable, Inject, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AppState} from "./app.service";
import {StudylistService} from "./studylist/studylist.service";
import { ObservationsService } from "./imageviewer/observations/observations.service"
import {StudyStatus} from "./app.enum";
import {TestRule1, TestRule2} from "./uirule/test.rule";


const ruleSet: Rule[] = [
  new TestRule1(),
  new TestRule2()
];

export type RuleResult = {
  ruleId: string,
  disable : boolean,
  innerHTML: string,
  hide: boolean
};

export type RuleContext = {
  studyStatus: string,
  qaEnabled: boolean,
  attestationEnabled: boolean,
  loggedInUser: string,
  pocUser: string,
  currentUser: string,
  qaUser: string,
  qaSigned: boolean,
  attestedUser: string,
  studyStatusNum: number,
};

type RuleMap = {
  [key : string] : Rule
};


@Injectable()
export class RuleService {

  private studyStatus: string;
  private qaEnabled: boolean;
  private attestationEnabled: boolean;
  private loggedInUser: string;
  private pocUser: string;
  private currentUser: string;
  private qaUser: string;
  private qaSigned: boolean;
  private attestedUser: string;
  private studyStatusNum: number;

  private dataChangeEmitter : EventEmitter  = new EventEmitter();

  private ruleMap: RuleMap = {};

  constructor(
    private _appState: AppState,
    private _studyService: StudylistService,
    private _observationsService: ObservationsService) {
    this.init();
  }

  getDataChangeEmitter():EventEmitter{
    return this.dataChangeEmitter;
  }

  init() {
    this.createRuleMap();
    this.getPreferenceDetails();
    this.getStudyDetails();
    this._studyService.getStudyUpdateEmitter().subscribe(res=>{
      this.getStudyDetails();
      this.dataChangeEmitter.emit();
    });
    this._observationsService.getWrkshtUpdateEmitter().subscribe(res=>{
      this.qaSigned = res.qaSigned;
      this.dataChangeEmitter.emit();
    });
  }

  createRuleMap(){
      for(let ruleEntry of ruleSet){
        const rule: Rule = <Rule>ruleEntry;
        if(!this.ruleMap[rule.ruleId()]) {
          this.ruleMap[rule.ruleId()] = rule;
        } else {
          console.error("Duplicate Rule Definition found for rule id:", rule.ruleId());
        }
      }
  }

  getPreferenceDetails(){
    this.qaEnabled = this._appState.get("preference.qaEnabled") ? true : false;
    console.log("this.qaEnabled ",this._appState.get("preference.qaEnabled"));

    this.attestationEnabled = this._appState.get("preference.attestationEnabled") ? true : false;
    console.log("this.attestationEnabled ",this._appState.get("preference.attestationEnabled"));

    this.loggedInUser = this._appState.get("userId");
    if(!this.loggedInUser){
      console.error("Logged In User Id in AppState is null");
    }
  }

  getStudyDetails(){
    var study = this._studyService.getCurrentStudy();
    if(study){
      this.studyStatus = study[0].status[0];
      this.studyStatusNum = StudyStatus[this.studyStatus];
      this.pocUser = (study[0].assignedUser) ? study[0].assignedUser.id : null;
      this.qaUser = (study[0].qaUser) ? study[0].qaUser.id : null;
      this.attestedUser = (study[0].attendingUser) ? study[0].attendingUser.id : null;
      var studyStatusNum = StudyStatus[this.studyStatus];
      this.currentUser = (studyStatusNum <= StudyStatus.Signed) ? this.pocUser : ((studyStatusNum <= StudyStatus.QAInProgress)? this.qaUser : this.attestedUser);
    }else{
      console.warn("No study details present in StudylistService");
    }
  }

  getWorksheetDetails(){
    this.qaSigned = this._observationsService.getQaSigned();
  }

  getContext(){
    const context = <RuleContext> {};
    context.studyStatus = this.studyStatus;
    context.studyStatusNum = StudyStatus[this.studyStatus];
    context.qaEnabled = this.qaEnabled;
    context.attestationEnabled = this.attestationEnabled;
    context.loggedInUser = this.loggedInUser;
    context.pocUser = this.pocUser;
    context.qaUser = this.qaUser;
    context.attestedUser = this.attestedUser;
    context.currentUser = this.currentUser;
    context.qaSigned = this.qaSigned;
    return context;
  }

  execute(ruleIds:string[]):RuleResult[]{
    const context = this.getContext();
    const results = [];
    for(let index in ruleIds){
      const ruleId = ruleIds[index];
      const rule:Rule  = this.ruleMap[ruleId];
      if(!rule){
        console.error("No Rule Available For ID :"+ruleId);
        continue;
      }
      try{
        const ruleResult = rule.execute(context);
        ruleResult.ruleId = ruleId;
        results.push(ruleResult);
      }catch(e){
        console.error("Error while executing rule"+ ruleId, e);
      }
    }
    return results;
  }

}


export interface Rule {

  execute(context:RuleContext): RuleResult;

  ruleId(): string;

}


