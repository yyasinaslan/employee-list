import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";
import {sharedStyles} from "../styles/shared-styles.ts";

@localized()
@customElement('app-home')
export class HomeComponent extends LitElement {
    static styles = [
        ...sharedStyles,
        css`
            .shortcuts {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;

                a {
                    padding: 1rem 2rem;
                    border: 1px solid hsl(var(--border));
                    border-radius: var(--radius);
                    font-weight: bold;

                    &:hover {
                        background-color: hsl(var(--primary));
                        color: hsl(var(--primary-foreground));
                    }
                }
            }
        `
    ]


    protected render() {
        return html`
            <h1>${msg('Home')}</h1>
            <div class="shortcuts">
                <a href="/employees">${msg('Employee List')}</a>
                <a href="/employees/add">${msg('Add New Employee')}</a>
            </div>
        `
    }
}