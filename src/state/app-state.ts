import {LocalStorageHelper} from "../helpers/local-storage-helper.ts";
import {setLocale} from "../localization.ts";
import {signal} from "@lit-labs/preact-signals";
import {Theme} from "../models/ui/theme-types.ts";


class AppState {

    lang = signal('en');

    theme = signal<Theme>('light');

    constructor(initialState: { lang: string, theme: Theme }) {
        this.lang.value = initialState.lang;
        this.theme.value = initialState.theme;

        setLocale(initialState.lang);
        this.applyTheme(this.theme.value)
        this.applyLang(this.lang.value)
    }

    public setLang(lang: string) {
        this.lang.value = lang;
        setLocale(lang);
        this.saveState();
        this.applyLang(lang);
    }

    public setTheme(theme: Theme) {
        this.theme.value = theme;
        this.applyTheme(this.theme.value)
        this.saveState();
    }

    private applyTheme(theme: Theme) {
        if (theme === 'dark') {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    }

    private applyLang(lang: string) {
        document.documentElement.lang = lang;
    }

    private saveState() {
        LocalStorageHelper.set('appState', {
            theme: this.theme.value,
            lang: this.lang.value,
        })
    }
}

export const appState: AppState = new AppState(LocalStorageHelper.get('appState', {lang: 'en', theme: 'light'}));