import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";



const TAG = 'app-employee-details' as const;

@customElement(TAG)
export class EmployeeDetailsComponent extends LitElement {
    static readonly TagName = TAG;


    protected render() {
        return html`
        <h1>Element Detail component</h1>
        `
    }
}