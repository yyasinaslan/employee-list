import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {localized} from "@lit/localize";

@localized()
@customElement('app-home')
export class HomeComponent extends LitElement {


    protected render() {
        return html`
            <h1>Home Page</h1>
            <lang-selector/>
            <a href="/employees">Employee List</a>
            <a href="/employees/add">Add New Employee</a>
        `
    }
}