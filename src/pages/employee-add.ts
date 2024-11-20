import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement('app-employee-add')
export class EmployeeAddComponent extends LitElement {

    protected render() {
        return html`
            <h1>Element Add component</h1>
        `
    }
}