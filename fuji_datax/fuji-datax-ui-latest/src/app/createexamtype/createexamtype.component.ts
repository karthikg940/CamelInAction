import { Component ,EventEmitter ,Output,ViewChild} from '@angular/core';
import {  AddItemsComponent } from './additems/addItems.component.ts';
import { UserGroupService } from '../createusergroup/createusergroup.service';
import { CptCode,ExamType } from '../createexamtype/createexamtype.interface';
import { CreateExamTypeService } from './createexamtype.service';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  templateUrl: './createexamtype.component.html'
})

export class CreateExamTypeComponent{

  public examAliasNames:object[] = [];
  public tags:object[] = [];
  private examTypeRequired:boolean = false;
  private examTypePresent:boolean = false;
  public cptManCode:object[]= [];
  public cptOptCode:object[]= [];
  public cptList:object[] = [];
  private cptAll : object;
  private errorMsg : string;
  private templateList:object[] = [];
  public templateitems:object[]= [];
  private examTypeId : string;
  public examtype: Examtype = {};
  private activeCptManCode:object[] = [];
  private formState: String;
  private savedWorksheet:object[]=[];
  private examTypeName:string;
  private examTypeError:boolean = false;

  @ViewChild('examTypeCreatedPopUp')
  examTypeCreatedPopUp: ModalComponent;

  @ViewChild('cancelExamPopUp')
  cancelExamPopUp: ModalComponent;

  @ViewChild('examTypeModifyPopup')
  examTypeModifyPopup: ModalComponent;

  @ViewChild('examTypeModifyToast')
  examTypeModifyToast: ModalComponent;

  @ViewChild('createExamType') public createExamType: NgForm;
  constructor(private createExamTypeService: CreateExamTypeService,private router: Router,private route: ActivatedRoute){}

  public selected(value:any):void {
    console.log('Selected value is: ', value);
    this.deleteCptCode(value.id);
  }

  public deleteCptCode(id){
    this.cptOptCode = this.cptManCode;
    this.cptManCode = [];
    this.cptOptCode.filter(element => {
    if(element.id == id){
      console.log("BOTH IDS ARE SAME");
    }else
      this.cptManCode.push(new CptCode(element.id,element.text));
    });
  }

  public removed(value:any):void {
    this.cptOptCode = this.cptManCode;
    this.cptManCode = [];
    this.cptOptCode.filter(element => {
      this.cptManCode.push(new CptCode(element.id,element.text));
    });
    this.cptManCode.push(new CptCode(value.id,value.text));
  }

  public refreshValue(value:any):void {
    this.examtype.worksheets = value;
  }

  public refreshCptManValue(value:any):void {
    this.examtype.manCptCode = value;
  }

  public refreshCptOptValue(value:any):void {
    this.examtype.optCptCode = value;
  }

  public itemsToString(value:Array<any> = []):string {
    return value
    .map((item:any) => {
      return item.text;
    }).join(',');
  }

  ngOnInit()
  {
    this.sub = this.route.params.subscribe(params => {
    this.formState = params['formState'];
    if(this.formState == "Modify"){
      this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.examTypeId = id;
        this.createExamTypeService.getExamTypeDetail(this.examTypeId).subscribe(
        res=> {
          if(res.manCptCode){
            this.generateArrayofActiveCptCode(res.manCptCode);
          }
          this.examtype.manCptCode = this.cptList;
          if(res.optCptCode){
            this.generateArrayofActiveCptCode(res.optCptCode);
          }
          this.examtype.optCptCode = this.cptList;
          this.examTypeName = res.examTypeName;
          this.examTypeDesc = res.examTypeDesc;
          if(res.worksheets){
            this.generateArrayOfSavedWorksheets(res.worksheets);
          }
          this.examtype.worksheets = this.savedWorksheet;
          for(let len = res.examTypeAlias.length-1; len>=0; len--){
            this.examAliasNames.push(res.examTypeAlias[len]);
          }
          for(let len = res.tagNames.length-1; len>=0; len--){
            this.tags.push(res.tagNames[len]);
          }
          if(res.cptCodes){
            this.generateArrayofActiveCptCode(res.cptCodes);
            this.cptManCode = this.cptList;
          }
        });
      });
    }
    else{
      this.createExamTypeService.getCptCodes().subscribe(
      res=> {
        this.cptAll = res;
        this.generateArrayofCptCode(this.cptAll);
        this.cptManCode = this.cptList;
        console.log("CPT List OnInit",this.cptList);
      });
    }
    });
    this.createExamTypeService.getWorksheetTemplate().subscribe(
    res=> {
      this.templateDetails = res;
      this.generateArrayofWorksheet(this.templateDetails);
      this.templateitems = this.templateList;
      console.log("Template List onInit:",this.templateList);
    });
  }

  generateArrayOfSavedWorksheets(worksheets){
    worksheets.filter(element => {
      this.savedWorksheet.push(new CptCode(element.id,element.name));
    });
  }

  generateArrayofActiveCptCode(cptObjects){
    this.cptList = [];
    cptObjects.filter(element => {
      this.cptList.push(new CptCode(element.id,element.code));
    });
  }

  navigateToExamTypeList() {
    this.router.navigate(['examtypelist']);
  }

  addType(){
    console.log("Exam Type Alias Name:",this.examTypeAlias,this.examAliasNames);
    if(this.examTypeAlias && this.examAliasNames.indexOf(this.examTypeAlias) < 0){
      this.examAliasNames.push(this.examTypeAlias);
      this.examTypeAlias='';
    }
  }

  deleteType(index:number){
    this.examAliasNames.splice(this.examAliasNames.indexOf(index), 1);
  }

  addTag(){
    if(this.tagNames && this.tags.indexOf(this.tagNames) < 0){
      this.tags.push(this.tagNames);
      this.tagNames='';
    }
  }

  deleteTag(index){
    this.tags.splice(this.tags.indexOf(index), 1);
  }

  generateArrayofCptCode(cptObjects){
    this.cptList = [];
    cptObjects.results.filter(element => {
      this.cptList.push(new CptCode(element.id,element.code));
    });
  }

  generateArrayofWorksheet(templateObjects){
    templateObjects.results.filter(element => {
      this.templateList.push(new CptCode(element.id,element.name));
    });
  }

  validateAlpha(e){
    if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode < 123))
      return true ;
    return false;
  }

  validateExamTypeName(examTypeName){
    if(!examTypeName){
      this.examTypeRequired = true;
      return true;
    }
    else{
      this.examTypeRequired = false;
      return false;
    }
  }

  getExamtypeName(){
    if(this.examTypeName){
      return this.createExamTypeService.getUniqueExamType(this.examTypeName).subscribe(
      examTypeNameData => {
        this.examTypePresent = examTypeNameData.isPresent;
      });
    }
  }

  removeExamtypeNameError(){
    this.examTypePresent = false;
    this.examTypeRequired = false;
    this.examTypeError = false;
  }

  cancelExamTypePopup(){
    if(this.formState ==='Add'){
      this.cancelExamPopUp.open();
    }
    else{
      this.examTypeModifyPopup.open();
    }
  }

  cancelExamType(){
    if(this.formState ==='Add'){
      this.cancelExamPopUp.close();
    }
    else{
      this.examTypeModifyPopup.close();
    }
  }

  confirmExamType(){
    this.navigateToExamTypeList();
  }

  doSave(createExamType){
    this.errorMsg = this.validateExamTypeName(createExamType.examTypeName);
    if(this.errorMsg || this.examTypePresent)
    return;
    createExamType.tagNames = this.tags;
    createExamType.examTypeAlias = this.examAliasNames;
    createExamType.manCptCode = this.examtype.manCptCode;
    createExamType.optCptCode = this.examtype.optCptCode;
    createExamType.worksheets = this.examtype.worksheets;
    console.log("TAG VALUE IN OBJECT;",createExamType.tagName);
    console.log("TAG VALUE",this.tags);
    if(this.formState == "Add"){
      return this.createExamTypeService.saveExamType(createExamType).subscribe(
      res=> {
        this.examTypeCreatedPopUp.open();
        var that=this;
        setTimeout(function(){that.examTypeCreatedPopUp.close(); that.navigateToExamTypeList();}, 2000);
      },
      error=> console.error(error)
      );
    }
    else{
      return this.createExamTypeService.updateExamType(this.examTypeId,createExamType).subscribe(
      res=> {
        this.examTypeModifyToast.open();
        var that=this;
        setTimeout(function(){that.examTypeModifyToast.close(); that.navigateToExamTypeList();}, 2000);
      },
      error=> console.error(error)
      );
    }
  }
}
