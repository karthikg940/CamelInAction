"use strict";
/*
 * Angular 2 decorators and services
 */
var core_1 = require('@angular/core');
var app_service_1 = require('./app.service');
/*
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent(appState) {
        this.appState = appState;
        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
        this.name = 'Angular 2 Webpack Starter';
        this.url = 'https://twitter.com/AngularClass';
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('Initial App State', this.appState.state);
    };
    AppComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app',
                    encapsulation: core_1.ViewEncapsulation.None,
                    styleUrls: [
                        './app.component.css'
                    ],
                    template: "\n    <nav>\n      <span>\n        <a [routerLink]=\" ['./dashboard'] \">\n          Dashboard\n        </a>\n      </span>\n      |\n      <span>\n        <a [routerLink]=\" ['./studylist'] \">\n          StudyList\n        </a>\n      </span>\n      |\n      <span>\n        <a [routerLink]=\" ['./userlist'] \">\n          UserList\n        </a>\n      </span>\n      |\n    </nav>\n\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n\n    <footer>\n    </footer>\n  "
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = [
        { type: app_service_1.AppState, },
    ];
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
