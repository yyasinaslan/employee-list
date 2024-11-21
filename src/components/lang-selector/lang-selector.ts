import {css, html} from "lit";
import {customElement} from "lit/decorators.js";
import {localized} from "@lit/localize";
import {getLocale} from "../../localization.ts";
import {allLocales} from "../../i18n-generated/locale-codes.ts";
import {MobxLitElement} from "@adobe/lit-mobx";
import {appState} from "../../state/app-state.ts";
import {sharedStyles} from "../../styles/shared-styles.ts";


const locales: { [key in typeof allLocales[number]]: string } = {
    "en": `English`,
    "tr": `Türkçe`
}

@localized()
@customElement('lang-selector')
export class LangSelectorComponent extends MobxLitElement {

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
                <button type="button" class="${localeName == this.appState.lang ? 'primary' : 'secondary'}"
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