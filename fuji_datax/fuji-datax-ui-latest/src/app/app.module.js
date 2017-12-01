"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var hmr_1 = require('@angularclass/hmr');
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = require('./environment');
var app_routes_1 = require('./app.routes');
// App is our top level component
var app_component_1 = require('./app.component');
var app_resolver_1 = require('./app.resolver');
var app_service_1 = require('./app.service');
var dashboard_1 = require('./dashboard');
var studylist_1 = require('./studylist');
// Application wide providers
var APP_PROVIDERS = app_resolver_1.APP_RESOLVER_PROVIDERS.concat([
    app_service_1.AppState
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
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = hmr_1.createInputTransfer();
        // remove styles
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    bootstrap: [app_component_1.AppComponent],
                    declarations: [
                        app_component_1.AppComponent,
                        dashboard_1.DashboardComponent,
                        studylist_1.StudyListComponent,
                    ],
                    imports: [
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        http_1.HttpModule,
                        router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: true })
                    ],
                    providers: [
                        environment_1.ENV_PROVIDERS,
                        APP_PROVIDERS
                    ]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [
        { type: core_1.ApplicationRef, },
        { type: app_service_1.AppState, },
    ];
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map