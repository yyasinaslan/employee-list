import {css, html} from "lit";
import {customElement} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";
import {getLocale} from "../../localization.ts";
import {allLocales} from "../../i18n-generated/locale-codes.ts";
import {MobxLitElement} from "@adobe/lit-mobx";
import {appState} from "../../state/app-state.ts";


const locales: {
    [key in typeof allLocales[number]]: string
} = {
    "en": `English - ${msg('English')}`,
    "tr": `Türkçe - ${msg('Turkish')}`
}

@localized()
@customElement('lang-selector')
export class LangSelectorComponent extends MobxLitElement {

    private readonly appState = appState;

    static styles = css`
        :host {
            display: block;
        }
    `

    localeChanged(event: Event) {
        const newLocale = (event.target as HTMLSelectElement).value;
        if (newLocale !== getLocale()) {
            this.appState.setLang(newLocale);
        }
    }

    private getLocaleOptions() {
        return allLocales.map(localeName => html`
            <option value=${localeName}>${locales[localeName]}</option>`)
    }


    protected render() {
        const lang = this.appState.lang;
        return html`
            <label>${this.appState.lang}</label>
            <select .value=${lang} @change=${this.localeChanged}>
                ${this.getLocaleOptions()}
            </select>
        `
    }
}