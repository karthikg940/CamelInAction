"use strict";
var dashboard_1 = require('./dashboard');
var studylist_1 = require('./studylist');
var userlist_1 = require('./userlist');
var createuser_1 = require('./createuser');
exports.ROUTES = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_1.DashboardComponent },
    { path: 'studylist', component: studylist_1.StudyListComponent },
    { path: 'userlist', component: userlist_1.UserListComponent },
    { path: 'createuser', component: createuser_1.CreateUserComponent }
];
//# sourceMappingURL=app.routes.js.map
