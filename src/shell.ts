import {html} from "lit";
import {customElement, query, state} from "lit/decorators.js";
import {MobxLitElement} from "@adobe/lit-mobx";
import {appState} from "./state/app-state.ts";
import {localized, msg, str} from "@lit/localize";
import {routes} from "./routes.ts";
import {Router} from "@lit-labs/router";


@localized()
@customElement('app-shell')
export class AppShell extends MobxLitElement {

    private _router = new Router(this, routes);

    private readonly appState = appState;

    @query('#router-outlet')
    routerOutlet!: HTMLElement;

    @state()
    name = 'Yasin';

    constructor() {
        super();
    }

    changeName() {
        this.name = 'Yasin Aslan';
    }

    protected render() {
        const lang = this.appState.lang;
        return html`
            <button @click=${this.changeName}>Change Name</button>
            <div>${msg(str`Hello ${this.name}`)}</div>
            <div>Current Lang = ${this.appState.lang}</div>
            <div>Current Lang = ${lang}</div>
            <app-header></app-header>
            <main>
                ${this._router.outlet()}
            </main>
        `
    }
}