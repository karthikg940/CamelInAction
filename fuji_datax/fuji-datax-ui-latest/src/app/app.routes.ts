import { Routes, RouterModule, CanDeactivate} from '@angular/router';
import { DashboardComponent } from './dashboard';
import { StudyListComponent } from './studylist';
import { ImageViewerComponent } from './imageviewer';
import { UserListComponent } from './userlist';
import { CreateUserComponent } from './createuser';
import { ConfirmDeactivateGuard } from './app.guard.ts';
import { CreateuserDeactivateGuard } from './app.createuserguard.ts';
import { PreferenceResolver } from './app.resolver';
import { UserGroupListComponent } from './usergrouplist';
import { CreateUserGroupComponent } from './createusergroup';
import { ExamTypeListComponent } from './examtypelist';
import { CreateExamTypeComponent } from './createexamtype';
import { LdapConfigurationComponent } from './ldapconfiguration';
import { PasswordConfigurationComponent } from './passwordconfiguration';
import { SmtpConfigurationComponent } from './smtpconfiguration';
import { RoleListComponent } from './rolelist/rolelist.component';
import { CreateRoleComponent } from './createrole/createrole.component';
import { UserpreferenceComponent } from './userpreference/userpreference.component';
import { WorksheetconfigComponent } from './worksheetconfig/worksheetconfig.component';

export const ROUTES: Routes = [
  { path: '',  redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent , resolve: {preference: PreferenceResolver}},
  { path: 'studylist', component: StudyListComponent , resolve: {preference: PreferenceResolver}},
  {
	  path: 'imageviewer/:id',
	  component: ImageViewerComponent ,
	  canDeactivate: [ConfirmDeactivateGuard],
	  resolve: {preference: PreferenceResolver}
  },
  { path: 'userlist', component: UserListComponent , resolve: {preference: PreferenceResolver}},
  { path: 'createuser/:formState', component: CreateUserComponent , resolve: {preference: PreferenceResolver}},

  {
	  path: 'createuser/:formState/:id',
	  component: CreateUserComponent ,
	  canDeactivate: [ConfirmDeactivateGuard],
	  resolve: {preference: PreferenceResolver}
  },
  { path: 'usergrouplist', component: UserGroupListComponent , resolve: {preference: PreferenceResolver}}, 
  { path: 'createusergroup/:formState', component: CreateUserGroupComponent , resolve: {preference: PreferenceResolver}},
  {
	  path: 'createusergroup/:formState/:id',
	  component: CreateUserGroupComponent ,
	  canDeactivate: [ConfirmDeactivateGuard],
	  resolve: {preference: PreferenceResolver}},
  { path: 'examtypelist', component: ExamTypeListComponent , resolve: {preference: PreferenceResolver}},
  { path: 'createexamtype/:formState', component: CreateExamTypeComponent , resolve: {preference: PreferenceResolver}},
  {
	  path: 'createexamtype/:formState/:id',
	  component: CreateExamTypeComponent ,
	  resolve: {preference: PreferenceResolver}},
  { path: 'ldapconfig', component: LdapConfigurationComponent , resolve: {preference: PreferenceResolver}},
  { path: 'passwordconfig', component: PasswordConfigurationComponent , resolve: {preference: PreferenceResolver}},
  { path: 'userpreference', component: UserpreferenceComponent, resolve: {preference: PreferenceResolver}},
  { path: 'worksheetconfig', component: WorksheetconfigComponent, resolve: {preference: PreferenceResolver}},
  { path: 'smtpconfig', component: SmtpConfigurationComponent , resolve: {preference: PreferenceResolver}},
  { path: 'rolelist', component: RoleListComponent , resolve: {preference: PreferenceResolver}},
  { path: 'createrole/:formState', component: CreateRoleComponent , resolve: {preference: PreferenceResolver}},
  { path: 'createrole/:formState/:id', component: CreateRoleComponent , resolve: {preference: PreferenceResolver}}

];
