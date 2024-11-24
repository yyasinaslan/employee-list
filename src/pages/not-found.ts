import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";

@localized()
@customElement('app-not-found')
export class NotFoundComponent extends LitElement {

    static styles = [
        css`
            h1 {
                color: hsl(var(--destructive, 0 100% 50%));
            }
        `
    ]

    protected render() {
        return html`
            <h1>${msg('Page Not Found!')}</h1>
        `
    }
}