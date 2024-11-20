import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement('app-not-found')
export class NotFoundComponent extends LitElement {

    protected render() {
        return html`Not found sorry`
    }
}