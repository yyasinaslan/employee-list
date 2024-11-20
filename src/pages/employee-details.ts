import {html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";


@customElement('app-employee-details')
export class EmployeeDetailsComponent extends LitElement {

    @property({type: String})
    id!: string;

    protected render() {
        return html`
            <h1>Element Detail component ${this.id}</h1>
        `
    }
}