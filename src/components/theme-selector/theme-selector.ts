import {css, html} from "lit";
import {customElement} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";
import {MobxLitElement} from "@adobe/lit-mobx";
import {appState} from "../../state/app-state.ts";
import {sharedStyles} from "../../styles/shared-styles.ts";

@localized()
@customElement('theme-selector')
export class ThemeSelectorComponent extends MobxLitElement {

    private readonly appState = appState;

    static styles = [
        ...sharedStyles,
        css`
            :host {
                display: block;
            }
        `
    ]

    protected render() {
        return html`
            <button type="button" class="secondary"
                    @click=${() => this.toggleTheme()}>
                ${this.appState.theme === 'light' ? msg('Dark Theme') : msg('Light Theme')}
            </button>
        `
    }

    private toggleTheme() {
        this.appState.setTheme(this.appState.theme === 'dark' ? 'light' : 'dark');
    }
}