import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {localized} from "@lit/localize";
import {getLocale} from "../../localization.ts";
import {allLocales} from "../../i18n-generated/locale-codes.ts";
import {appState} from "../../state/app-state.ts";
import {sharedStyles} from "../../styles/shared-styles.ts";
import {SignalWatcher} from "@lit-labs/preact-signals";


const locales: { [key in typeof allLocales[number]]: string } = {
    "en": `English`,
    "tr": `Türkçe`
}

@localized()
@customElement('lang-selector')
export class LangSelectorComponent extends SignalWatcher(LitElement) {

    private readonly appState = appState;

    static styles = [
        ...sharedStyles,
        css`
            :host {
                display: block;
            }

            button.active {
                background-color: hsl(var(--primary));
            }
        `
    ]

    protected render() {
        return html`
            ${allLocales.map(localeName => html`
                <button type="button" class="${localeName == this.appState.lang.value ? 'primary' : 'secondary'}"
                        @click=${() => this.changeLocale(localeName)}>${locales[localeName]}
                </button>
            `)}
        `
    }

    private changeLocale(localeName: string) {
        if (localeName !== getLocale()) {
            this.appState.setLang(localeName);
        }
    }
}