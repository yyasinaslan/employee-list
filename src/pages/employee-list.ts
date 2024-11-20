import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";



const TAG = 'app-employee-list' as const;

@customElement(TAG)
export class EmployeeListComponent extends LitElement {
    static readonly TagName = TAG;

    protected render() {
        return html`
        <h1>Element List component</h1>
        <slot></slot>
        `
    }
}