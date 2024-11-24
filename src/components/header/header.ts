import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";
import {sharedStyles} from "../../styles/shared-styles.ts";
import {environment} from "../../environment/environment.ts";


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
                gap: 0.75rem;
                flex-wrap: wrap;

                a {
                    padding: 0.5rem 1rem;
                    color: hsl(var(--foreground));

                    display: flex;
                    align-items: center;
                    gap: 0.25rem;

                    svg.icon {
                        font-size: 1.3em;
                    }

                    &:hover {
                        color: hsl(var(--primary));
                    }
                }
            }
        `
    ]

    protected render() {
        return html`
            <a href=${environment.baseUrl + '/'} class="brand">Employee List App</a>
            <div class="filler"></div>
            <nav>
                <a href=${environment.baseUrl + '/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                    </svg>
                    ${msg('Home')}</a>
                <a href=${environment.baseUrl + '/employees'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                    </svg>
                    ${msg('Employees')}</a>
                <a href=${environment.baseUrl + '/employees/add'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                    ${msg('Add Employee')}</a>
            </nav>
            <theme-selector></theme-selector>
            <lang-selector></lang-selector>
        `
    }
}