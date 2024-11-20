import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";


@customElement('app-employee-list')
export class EmployeeListComponent extends LitElement {

    protected render() {
        return html`
        <h1>Element List component</h1>
        <slot></slot>
        `
    }
}