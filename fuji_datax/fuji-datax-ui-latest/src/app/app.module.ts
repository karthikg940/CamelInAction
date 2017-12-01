import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SelectModule } from 'ng2-select/ng2-select';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { EndPoint } from './app.endpoints'
import { AbstractService } from './app.abstract.service';
import { ConfirmDeactivateGuard } from './app.guard';
import { DashboardComponent } from './dashboard';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { StudyListComponent } from './studylist';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/header.service';
import {GraphicalDetailComponent} from './dashboard/graphical-detail/graphical-detail.component';
import {GraphicalSummaryComponent} from './dashboard/graphical-summary/graphical-summary.component';
import {DashboardService} from './dashboard/dashboard.service';
import {StudylistService} from './studylist/studylist.service';
import { LeftNavComponent } from './leftnav';

import { ImageViewerComponent } from './imageviewer/imageviewer.component';
import { ViewerDetailsComponent } from './imageviewer/imageviewer-details/viewer-details.component';
import { ViewerHeaderComponent } from './imageviewer/viewerheader/viewerheader.component';
import { PatientImageComponent } from './imageviewer/patient-image/patient-image.component'
import { ImageViewerThumbnailComponent } from './imageviewer/imageViewer-thumbnail/imageViewer-thumbnail.component';
import { PatientDetailsComponent } from './imageviewer/imageviewer-details/patient-details/patient-details.component';
import { StudyDetailsComponent } from './imageviewer/imageviewer-details/study-details/study-details.component';
import { TabComponent } from './imageviewer/imageviewer-details/tab.component';
import { TabsComponent } from './imageviewer/imageviewer-details/tabs.component';
import { Observations } from './imageviewer/observations/observations.component';
import { ObservationsTabComponent } from './imageviewer/observations/observations-tab.component';
import { ObservationsTabsComponent } from './imageviewer/observations/observations-tabs.component';
import { ObservationsService } from './imageviewer/observations/observations.service';
import { Worksheet } from './imageviewer/observations/worksheet/worksheet.component';
import { WorksheetSection } from './imageviewer/observations/worksheet/section/worksheet.section.component';
import { ExamOverviewSection } from './imageviewer/observations/worksheet/section-examoverview/worksheet.section.examoverview.component';
import { ExamApprovalSection } from './imageviewer/observations/worksheet/section-examapproval/worksheet.section.examapproval.component';
import { SaveResetSection } from './imageviewer/observations/worksheet/section-savereset/worksheet.section.savereset.component';
import { QualityAssuranceSection } from './imageviewer/observations/worksheet/section-quality-assurance/worksheet.section.quality-assurance.component';
import { QaWorksheetTopic } from './imageviewer/observations/worksheet/section-quality-assurance/qa-topic/worksheet.qa-topic.component';
import { OptionDropDown } from './imageviewer/observations/worksheet/section-quality-assurance/qa-topic/option-dropdown/worksheet.option.dropdown.component';
import { OptionDropDownAccordion } from './imageviewer/observations/worksheet/section-quality-assurance/qa-topic/option-dropdown-accordion/worksheet.option.dropdown-accordion.component';
import { OptionQaText } from './imageviewer/observations/worksheet/section-quality-assurance/qa-topic/option-qa-text/worksheet.option.qa-text.component';


import { WorksheetTopic } from './imageviewer/observations/worksheet/section/topic/worksheet.topic.component';
import { OptionText } from './imageviewer/observations/worksheet/section/topic/option-text/worksheet.option.text.component';
import { OptionTextNumber } from './imageviewer/observations/worksheet/section/topic/option-text-number/worksheet.option.textnumber.component';
import { OptionSingleSelect } from './imageviewer/observations/worksheet/section/topic/option-single-select/worksheet.option.singleselect.component';
import { OptionMultiSelect } from './imageviewer/observations/worksheet/section/topic/option-multi-select/worksheet.option.multiselect.component';

import { UserListComponent } from './userlist/userlist.component';
import { CreateUserComponent } from './createuser/createuser.component';
import { UserService } from './createuser/user.service';
import { UserlistService } from './userlist/userlist.service';

import { UserGroupListComponent } from './usergrouplist/usergrouplist.component';
import { CreateUserGroupComponent } from './createusergroup/createusergroup.component';
import { UserGrouplistService } from './usergrouplist/usergrouplist.service';
import { UserGroupService } from './createusergroup/createusergroup.service';

import { ExamTypeListComponent } from './examtypelist/examtypelist.component';
import { ExamtypelistService } from './examtypelist/examtypelist.service';
import { CreateExamTypeComponent } from './createexamtype/createexamtype.component';
import { CreateExamTypeService } from './createexamtype/createexamtype.service';

import { PasswordConfigurationComponent } from './passwordconfiguration/passwordconfiguration.component';
import { PasswordConfigurationService } from './passwordconfiguration/passwordconfiguration.service';

import { LdapConfigurationComponent } from './ldapconfiguration/ldapconfiguration.component';
import { LdapConfigurationService } from './ldapconfiguration/ldapconfiguration.service';

import { SmtpConfigurationComponent } from './smtpconfiguration/smtpconfiguration.component';
import { SmtpConfigurationService } from './smtpconfiguration/smtpconfiguration.service';

import {HideOnDirective,DisableOnDirective,EnableOnDirective,InnerHtmlOnDirective} from './app.directive';
import {RuleService} from './app.rule';
import {UIRuleDirective} from './app.directive';
import '../styles/style.scss';


import { RoleListComponent } from './rolelist/rolelist.component';
import { RoleListService } from './rolelist/rolelist.service';
import { CreateRoleComponent } from './createrole/createrole.component';
import { RoleService } from './createrole/createrole.service';
import { TagsSection } from './imageviewer/observations/worksheet/section-tags/worksheet.section.tags.component';
import { UserpreferenceComponent } from './userpreference/userpreference.component';
import { WorksheetconfigComponent } from './worksheetconfig/worksheetconfig.component';

import {BreadCrumService} from './breadcrum/breadcrum.service'


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  EndPoint
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    BreadcrumComponent,
	HeaderComponent,
	LeftNavComponent,
    DashboardComponent,
      GraphicalDetailComponent,
      GraphicalSummaryComponent,
    StudyListComponent,
	ViewerDetailsComponent,
	ViewerHeaderComponent,
    PatientImageComponent,
    ImageViewerThumbnailComponent,
    ImageViewerComponent,
    PatientDetailsComponent,
    StudyDetailsComponent,
    TabComponent,
    TabsComponent ,
    Observations,
    ObservationsTabComponent,
    ObservationsTabsComponent,
      Worksheet,
      WorksheetSection,
      ExamOverviewSection,
      ExamApprovalSection,
      SaveResetSection,
      QualityAssuranceSection,
      QaWorksheetTopic,
      OptionDropDown,
      OptionDropDownAccordion,
      OptionQaText,
      WorksheetTopic,
      OptionSingleSelect,
      OptionMultiSelect,
      OptionText,
      OptionTextNumber,
  UserListComponent,
  CreateUserComponent,
  UserGroupListComponent,
  CreateUserGroupComponent,
  ExamTypeListComponent,
  CreateExamTypeComponent,
  HideOnDirective,
  DisableOnDirective,
  EnableOnDirective,
  InnerHtmlOnDirective,
  UIRuleDirective,
  UserpreferenceComponent,
  WorksheetconfigComponent,
  LdapConfigurationComponent,
  PasswordConfigurationComponent,
  SmtpConfigurationComponent,
  RoleListComponent,
  CreateRoleComponent,
  TagsSection
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
      TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (http: Http) => new TranslateStaticLoader(http, '/locale', '.json'),
          deps: [Http]
      }),
      ChartsModule,
    Ng2Bs3ModalModule,
    SelectModule
],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    HeaderService,
    DashboardService,
    StudylistService,
    ObservationsService,
    UserlistService,
    ConfirmDeactivateGuard,
      UserService,
      UserGrouplistService,
      UserGroupService,
      CreateExamTypeService,
      ExamtypelistService,
      LdapConfigurationService,
      RuleService,
      RoleListService,
      RoleService,
      PasswordConfigurationService,
      SmtpConfigurationService,
      BreadCrumService,
      { provide: 'bearer', useValue: window['bearer'] }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {

  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
