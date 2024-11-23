import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";
import {sharedStyles} from "../../styles/shared-styles.ts";


@localized()
@customElement('app-header')
export class HeaderComponent extends LitElement {

    static styles = [
        ...sharedStyles,
        css`
            :host {
                display: flex;
                padding-inline: 1rem;
                gap: 1rem;
                flex-wrap: wrap;

                align-items: center;
            }

            .brand {
                font-size: 1.6em;
                text-decoration: none;
                color: hsl(var(--foreground));
            }

            .filler {
                flex: 1 1 auto;
            }

            nav {
                display: flex;
                gap: 1em;
                flex-wrap: wrap;

                a {
                    padding: 0.5rem 1rem;
                    color: hsl(var(--foreground));

                    &:hover {
                        color: hsl(var(--primary));
                    }
                }
            }
        `
    ]

    protected render() {
        return html`
            <a href="/" class="brand">Employee List App</a>
            <div class="filler"></div>
            <nav>
                <a href="/">${msg('Home')}</a>
                <a href="/employees">${msg('Employees')}</a>
                <a href="/employees/add">${msg('Add Employee')}</a>
            </nav>
            <theme-selector></theme-selector>
            <lang-selector></lang-selector>
        `
    }
}