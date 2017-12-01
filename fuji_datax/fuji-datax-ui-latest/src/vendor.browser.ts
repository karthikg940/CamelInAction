// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/platform-browser';

import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// AngularClass
import '@angularclass/hmr';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

//Ng2 Translate
import 'ng2-translate/ng2-translate';
import 'datatables.net/js/jquery.dataTables.js';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs/js/dataTables.bootstrap.js';
import 'moment';
import 'bootstrap-daterangepicker';
import 'ng2-bs3-modal/ng2-bs3-modal';
import 'chart.js';
import 'ng2-select/ng2-select';


if ('production' === ENV) {
  // Production


} else {
  // Development

}
