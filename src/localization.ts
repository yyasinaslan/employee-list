import {configureLocalization} from '@lit/localize';
import {sourceLocale, targetLocales} from './i18n-generated/locale-codes.ts';
import {appState} from "./state/app-state.ts";

export const {getLocale, setLocale} = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: (locale: string) => import(`./i18n-generated/locales/${locale}.ts`),
});

/**
 * todo: Implement this
 */
export const setLocaleFromHtmlLang = async () => {
    const locale = document.documentElement.lang;
    appState.setLang(locale);
    await setLocale(locale);
}