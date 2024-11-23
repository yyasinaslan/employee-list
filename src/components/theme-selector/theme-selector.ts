import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";
import {appState} from "../../state/app-state.ts";
import {sharedStyles} from "../../styles/shared-styles.ts";
import {SignalWatcher} from "@lit-labs/preact-signals";

@localized()
@customElement('theme-selector')
export class ThemeSelectorComponent extends SignalWatcher(LitElement) {

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
                ${this.appState.theme.value === 'light' ? msg('Dark Theme') : msg('Light Theme')}
            </button>
        `
    }

    private toggleTheme() {
        this.appState.setTheme(this.appState.theme.value === 'dark' ? 'light' : 'dark');
    }
}