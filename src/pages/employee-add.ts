import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";



const TAG = 'app-employee-add' as const;

@customElement(TAG)
export class EmployeeAddComponent extends LitElement {
    static readonly TagName = TAG;


    protected render() {
        return html`
        <h1>Element Add component</h1>
        `
    }
}