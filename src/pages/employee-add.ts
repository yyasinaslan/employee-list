import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";
import {sharedStyles} from "../styles/shared-styles.ts";
import {InferType} from "yup";
import {createEmployeeSchema} from "../models/employee.ts";
import {employeeState} from "../state/employees-state.ts";
import {RouterHelper} from "../helpers/router-helper.ts";


@localized()
@customElement('app-employee-add')
export class EmployeeAddComponent extends LitElement {

    static styles = [
        ...sharedStyles,
        css`
            employee-form {
                display: block;
                padding: 1rem;
                border: 1px solid hsl(var(--border));
                border-radius: var(--radius);
                background: hsl(var(--card));
                color: hsl(var(--card-foreground));

                max-width: 50rem;
            }
        `
    ]

    addEmployee(data: InferType<typeof createEmployeeSchema>) {
        employeeState.addEmployee(data);
        RouterHelper.navigate('/employees')
    }

    protected render() {
        return html`
            <h1>${msg('Add new employee')}</h1>
            <employee-form @submit=${(event: any) => this.addEmployee(event.detail)}></employee-form>
        `
    }
}