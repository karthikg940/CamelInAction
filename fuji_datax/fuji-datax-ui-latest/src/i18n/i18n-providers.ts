import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
//import {translation} from '../../locale/messages.fr'
export function getTranslationProviders(): Promise<Object[]> {
    // Get the locale id from the global
    const locale = document['locale'] as string;
    // return no providers if fail to get translation file for locale
    const noProviders: Object[] = [];
    // No locale or U.S. English: no translation providers
    if (!locale || locale === 'en-US') {
        return Promise.resolve(noProviders);
    }

    const translation = './locale/messages.${locale}.xlf';

    return Promise.resolve( [
            { provide: TRANSLATIONS, useValue: translation },
            { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
            { provide: LOCALE_ID, useValue: locale } ]
    );
}
