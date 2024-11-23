import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {localized} from "@lit/localize";
import {getLocale} from "../../localization.ts";
import {allLocales} from "../../i18n-generated/locale-codes.ts";
import {appState} from "../../state/app-state.ts";
import {sharedStyles} from "../../styles/shared-styles.ts";
import {SignalWatcher} from "@lit-labs/preact-signals";
import {getFlagUrl} from "../../helpers/flags.ts";


const locales: { [key in typeof allLocales[number]]: string } = {
    "en": `English`,
    "tr": `Türkçe`
}

const flags: { [key in typeof allLocales[number]]: string } = {
    "en": 'gb',
    "tr": 'tr'
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

            img.flag-image {
                height: 1em;
            }
        `
    ]

    protected render() {
        return html`
            ${allLocales.map(localeName => html`
                <button type="button" class="${localeName == this.appState.lang.value ? 'primary' : 'secondary'}"
                        @click=${() => this.changeLocale(localeName)} title=${locales[localeName]}>
                    <img src=${getFlagUrl(flags[localeName])} alt=${locales[localeName]} class="flag-image">
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