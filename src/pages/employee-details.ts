import {css, html, LitElement} from "lit";
import {customElement, property, query, state} from "lit/decorators.js";
import {sharedStyles} from "../styles/shared-styles.ts";
import {InferType} from "yup";
import {createEmployeeSchema, Employee} from "../models/employee.ts";
import {employeeState} from "../state/employees-state.ts";
import {RouterHelper} from "../helpers/router-helper.ts";
import {localized, msg} from "@lit/localize";
import {SignalWatcher} from "@lit-labs/preact-signals";
import {formatDate} from "../helpers/date-helper.ts";
import {getLocale} from "../localization.ts";
import {departmentList} from "../models/department.ts";
import {positionList} from "../models/position.ts";

const formFields = {
    firstName: () => msg("First name"),
    lastName: () => msg("Last name"),
    employmentDate: {
        label: () => msg("Date of Employment"),
        formatter: (val: any) => formatDate(val, getLocale()),
    },
    birthDate: {
        label: () => msg("Birth date"),
        formatter: (val: any) => formatDate(val, getLocale()),
    },
    phone: {
        label: () => msg("Phone"),
    },
    email: () => msg("Email"),
    department: {
        label: () => msg("Department"),
        formatter: (val: string) => (departmentList as any)[val]()
    },
    position: {
        label: () => msg("Position"),
        formatter: (val: string) => (positionList as any)[val]()
    },
}

@localized()
@customElement('app-employee-details')
export class EmployeeDetailsComponent extends SignalWatcher(LitElement) {

    @query('dialog#editConfirm')
    dialogRef?: HTMLDialogElement;

    @property({type: String})
    id!: string;

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

            dl {
                border-radius: var(--radius);
                padding: 1rem;
                border: 1px solid hsl(var(--border));
            }
        `
    ]

    @state()
    notFound: boolean = false;

    @state()
    employee!: Employee;

    connectedCallback() {
        super.connectedCallback();

        const employee = employeeState.getEmployee(Number(this.id));
        if (!employee) {
            this.notFound = true;
            return;
        }
        this.employee = employee;
    }

    @state()
    formData?: InferType<typeof createEmployeeSchema>;

    updateEmployee(data: InferType<typeof createEmployeeSchema>) {
        this.dialogRef?.showModal();
        this.formData = data;
    }

    confirmUpdate() {
        const data = this.formData!;
        employeeState.updateEmployee({id: this.employee.id, ...data});
        RouterHelper.navigate('/employees')
    }

    private getDetail(key: string, data: any) {
        const field = (formFields as any)[key];
        const val = data[key];
        return html`
            <dt>${field.label ? field.label() : field()}</dt>
            <dd>${field.formatter ? field.formatter(val) : val}</dd>
        `
    }

    protected render() {
        if (this.notFound) {
            return html`<h1 class="text-destructive">Employee not found!</h1>`
        }
        return html`
            <h1>${msg('Edit employee')}</h1>
            <employee-form .employee=${this.employee}
                           @submit=${(event: any) => this.updateEmployee(event.detail)}></employee-form>
            <dialog id="editConfirm">
                <div class="flex gap-1">
                    <h3 class="flex-auto">${msg('Check difference before proceeding!')}</h3>
                    <button type="button" class="ghost icon" @click=${() => this.dialogRef?.close()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
                <div class="flex gap-2">
                    <dl>
                        ${this.employee ? Object.keys(formFields).map(key => this.getDetail(key, this.employee)) : ''}
                    </dl>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" style="font-size: 1.5em" fill="currentColor"
                             class="icon" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                        </svg>
                    </div>
                    <dl>
                        ${this.formData ? Object.keys(formFields).map(key => this.getDetail(key, this.formData)) : ''}
                    </dl>
                </div>
                <div class="flex gap-1" style="justify-content: flex-end">
                    <button type="button" class="primary" @click=${() => this.confirmUpdate()}>${msg('Update')}
                    </button>
                    <button type="button" class="secondary" @click=${() => this.dialogRef?.close()}>
                        ${msg('Cancel')}
                    </button>
                </div>
            </dialog>
        `
    }
}