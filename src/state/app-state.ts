import {action, makeObservable, observable} from "mobx";
import {LocalStorageHelper} from "../helpers/local-storage-helper.ts";
import {setLocale} from "../localization.ts";

type Theme = 'dark' | 'light';

class AppState {

    lang: string = '';

    theme: Theme = 'dark';

    constructor(initialState: { lang: string, theme: Theme }) {
        makeObservable(this, {
            lang: observable,
            theme: observable,
            setLang: action,
            setTheme: action,
        });

        this.lang = initialState.lang;
        this.theme = initialState.theme;

        setLocale(initialState.lang);
        this.applyTheme(this.theme)
    }

    public setLang(lang: string) {
        this.lang = lang;
        setLocale(lang);
        this.saveState();
    }

    public setTheme(theme: Theme) {
        this.theme = theme;
        this.applyTheme(this.theme)
        this.saveState();
    }

    private applyTheme(theme: Theme) {
        if (theme === 'dark') {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    }

    private saveState() {
        LocalStorageHelper.set('appState', this)
    }
}

export const appState: AppState = new AppState(LocalStorageHelper.get('appState', {lang: 'en', theme: 'light'}));