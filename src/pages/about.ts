import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";



@customElement('app-about')
export class AboutComponent extends LitElement {
    
    
    protected render() {
        return html`About page :=`
    }
}