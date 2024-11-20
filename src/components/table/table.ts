import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";



@customElement('app-table')
export class TableComponent extends LitElement {


    protected render(): unknown {
        return html`
        <div>Table component works</div>
        <slot></slot>
        `
    }
}