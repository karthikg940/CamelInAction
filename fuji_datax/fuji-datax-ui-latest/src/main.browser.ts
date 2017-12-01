/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';
import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

/*

 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';


/*
 * Translation Template
 */
import { getTranslationProviders } from './i18n';

import './assets/css/style.css';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {

  return getTranslationProviders().then(providers => {
    const options = {providers};
    return platformBrowserDynamic()
        .bootstrapModule(AppModule, options)
        .then(decorateModuleRef);
       // .catch(err => console.error(err));
  });

}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
