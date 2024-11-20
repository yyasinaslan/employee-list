import {action, makeObservable, observable} from "mobx";
import {LocalStorageHelper} from "../helpers/local-storage-helper.ts";
import {setLocale} from "../localization.ts";


class AppState {

    lang: string = '';

    constructor(initialState: { lang: string }) {
        makeObservable(this, {
            lang: observable,
            setLang: action
        });

        this.lang = initialState.lang;
    }

    public setLang(lang: string) {
        this.lang = lang;
        LocalStorageHelper.set('appState', {
            lang: lang
        })
        setLocale(lang)
    }
}

export const appState: AppState = new AppState(LocalStorageHelper.get('appState', {lang: 'en'}));
console.log('app state created', appState)
