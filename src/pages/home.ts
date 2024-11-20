import {RouterLocation} from "@vaadin/router";
import {html, LitElement} from "lit";
import {customElement, state} from "lit/decorators.js";

const TAG = 'app-home' as const;

@customElement(TAG)
export class HomeComponent extends LitElement {
    static readonly TagName = TAG;

    @state()
    employeeId = '';

    @state()
    message = 'Hosgeldin';

    async onBeforeEnter(location: RouterLocation) {
        console.log(location);
        this.employeeId = location.params.employeeId as string;
    }

    protected render() {


        return html`
            <div>Home == ${this.message} == ${this.employeeId}</div>
            <button @click="${() => this.message = 'Merhaba'}">Tikla</button>
        `
    }
}


class OzelComponent extends HTMLElement {

}

customElements.define('benim-ozel-etiketim', OzelComponent)