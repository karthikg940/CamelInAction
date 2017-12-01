import {Rule,RuleContext,RuleResult} from '../app.rule';
import {StudyStatus} from "../app.enum";
export class TestRule1 implements Rule {

  public execute(context:RuleContext): RuleResult {
    var result:RuleResult = <RuleResult>{};
    console.log("TestRule1", context);
    if (context.loggedInUser !== context.currentUser) {
      result.disable = true;
    } else {
      result.disable = false;
    }
    return result;
  }

  public ruleId(): string {
    return "WORKSHEET_SUBMIT_BUTTON_DISABLE";
  }

}

export class TestRule2 implements Rule {

  public execute(context:RuleContext): RuleResult {
    var result:RuleResult = <RuleResult>{};
    if(context.studyStatusNum < StudyStatus.QAUnassigned && context.qaEnabled){
      result.innerHTML = "Submit For QA";
    } else if(context.studyStatusNum < StudyStatus.SubmittedForAttestation && context.attestationEnabled){
      result.innerHTML = "Submit For Attestation";
    } else {
      result.innerHTML = "Submit To EMR";
    }
    return result;
  }

  public ruleId(): string {
    return "WORKSHEET_SUBMIT_BUTTON_INNERHTML";
  }

}
