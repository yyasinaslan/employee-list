import {customElement, property, query, state} from "lit/decorators.js";
import {html, LitElement} from "lit";
import {createEmployeeSchema, Employee} from "../../models/employee.ts";
import {localized, msg} from "@lit/localize";
import {sharedStyles} from "../../styles/shared-styles.ts";
import {Department, departmentList} from "../../models/department.ts";
import {Position, positionList} from "../../models/position.ts";
import {formStyles} from "../../styles/form-styles.ts";
import {format} from "date-fns";


/**
 * @event formSubmit
 */
@localized()
@customElement('employee-form')
export class EmployeeForm extends LitElement {

    static styles = [
        ...sharedStyles,
        formStyles
    ]

    @query('form')
    formRef?: HTMLFormElement;

    @property()
    employee: Employee | null = null;

    handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const data = this.getFormData();
        if (!createEmployeeSchema.isValid(data)) {
            return;
        }

        this.dispatchEvent(new CustomEvent('submit', {
            detail: createEmployeeSchema.cast(data)
        }))
    }

    private getFormData() {
        if (!this.formRef) return null;
        const formData = new FormData(this.formRef);
        let data: Record<string, any> = {};
        for (const d of formData.entries()) {
            data[d[0]] = d[1];
        }

        return data;
    }

    render() {
        return html`
            <form @submit=${this.handleSubmit}>
                <div class="form-field">
                    <label for="firstName">${msg('First Name')}</label>
                    <input type="text" name="firstName" id="firstName" .value=${this.employee?.firstName ?? ''}
                           required>
                </div>
                <div class="form-field">
                    <label for="lastName">${msg('Last Name')}</label>
                    <input type="text" name="lastName" id="lastName" .value=${this.employee?.lastName ?? ''} required>
                </div>
                <div class="form-field">
                    <label for="employmentDate">${msg('Date of Employment')}</label>
                    <input type="date" name="employmentDate" id="employmentDate"
                           .value=${this.employee?.employmentDate ? format(this.employee.employmentDate, 'yyyy-MM-dd') : ''}
                           required>
                </div>
                <div class="form-field">
                    <label for="birthDate">${msg('Date of Birth')}</label>
                    <input type="date" name="birthDate" id="birthDate"
                           .value=${this.employee?.birthDate ? format(this.employee.birthDate, 'yyyy-MM-dd') : ''}
                           required>
                </div>
                <div class="form-field">
                    <label for="phone">${msg('Phone')}</label>
                    <input type="tel" name="phone" id="phone" .value=${this.employee?.phone ?? ''} required>
                </div>
                <div class="form-field">
                    <label for="email">${msg('Email')}</label>
                    <input type="email" name="email" id="email" .value=${this.employee?.email ?? ''} required>
                </div>
                <div class="form-field">
                    <label for="department">${msg('Department')}</label>
                    <select name="department" id="department" required>
                        ${Object.keys(departmentList).map((key: any) => html`
                            <option value=${key} ?selected=${this.employee?.department === Number(key)}> ${departmentList[key as Department]()}</option>
                        `)}
                    </select>
                </div>
                <div class="form-field">
                    <label for="position">${msg('Position')}</label>
                    <select name="position" id="position" required>
                        ${Object.keys(positionList).map((key: any) => html`
                            <option value=${key} ?selected=${this.employee?.position === Number(key)}>${positionList[key as Position]()}</option>
                        `)}
                    </select>
                </div>
                <button type="submit" class="primary">${msg('Save')}</button>
            </form>
        `
    }

}