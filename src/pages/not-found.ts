import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";


const TAG = 'app-not-found' as const;

@customElement(TAG)
export class NotFoundComponent extends LitElement {
    static readonly TagName = TAG;


    protected render() {
        return html`Not found sorry`
    }
}