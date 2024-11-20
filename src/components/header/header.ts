import {css, html} from "lit";
import {customElement} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";
import {MobxLitElement} from "@adobe/lit-mobx";
import {appState} from "../../state/app-state.ts";


@localized()
@customElement('app-header')
export class HeaderComponent extends MobxLitElement {

    private readonly appState = appState;

    static styles = css`
        :host {
            display: block;
            padding: 1rem;
        }
    `

    protected render() {
        return html`
            <lang-selector></lang-selector>
            <div>Current Lang = ${this.appState.lang}</div>
            <ul>
                <li>
                    <a href="/">${msg('Home')}</a>
                </li>
                <li>
                    <a href="/employees">${msg('Employee List')}</a>
                </li>
                <li>
                    <a href="/employees/add">Add new employee</a>
                </li>
            </ul>
        `
    }
}