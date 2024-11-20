import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";


const TAG = 'app-header' as const;

@customElement(TAG)
export class HeaderComponent extends LitElement {
    static readonly TagName = TAG;

    static styles = css`
        :host {
            display: block;
            padding: 1rem;
        }
    `

    protected render() {
        return html`
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
            </ul>
        `
    }
}