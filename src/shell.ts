import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

const TAG = 'app-shell' as const;

@customElement(TAG)
export class AppShell extends LitElement {
    static readonly TagName = TAG;

    protected render() {
        return html`
            <app-header style="--header-bg-color: red"></app-header>
            <slot></slot>
        `
    }
}