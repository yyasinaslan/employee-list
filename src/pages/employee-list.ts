import {css, html, LitElement} from "lit";
import {customElement, state} from "lit/decorators.js";
import {localized, msg} from "@lit/localize";
import {sharedStyles} from "../styles/shared-styles.ts";
import {Employee} from "../models/employee.ts";
import {departmentList} from "../models/department.ts";
import {positionList} from "../models/position.ts";
import {employeeState} from "../state/employees-state.ts";
import {formatDate} from "../helpers/date-helper.ts";
import {getLocale} from "../localization.ts";
import {SignalWatcher} from "@lit-labs/preact-signals";

type ViewMode = 'table' | 'list';

type Column<RowDataType = any> = {
    name: string;
    template: (rowData: RowDataType) => ReturnType<typeof html>;
    headerTemplate?: () => ReturnType<typeof html>;
}

@localized()
@customElement('app-employee-list')
export class EmployeeListComponent extends SignalWatcher(LitElement) {

    @state()
    viewMode: ViewMode = 'table';

    connectedCallback() {
        super.connectedCallback();

        console.log('Connected')
    }

    private employeeState = employeeState;

    private columns: Column[] = [
        {
            name: 'checkAll',
            headerTemplate: () => html`<input type="checkbox">`,
            template: () => html`<input type="checkbox">`
        },
        {
            name: 'firstName',
            headerTemplate: () => html`${msg('First Name')}`,
            template: (rowData: Employee) => html`${rowData.firstName}`
        },
        {
            name: 'lastName',
            headerTemplate: () => html`${msg('Last Name')}`,
            template: (rowData: Employee) => html`${rowData.lastName}`
        },
        {
            name: 'employmentDate',
            headerTemplate: () => html`${msg('Date of Employment')}`,
            template: (rowData: Employee) => html`${formatDate(rowData.employmentDate, getLocale())}`
        },
        {
            name: 'birthDate',
            headerTemplate: () => html`${msg('Date of Birth')}`,
            template: (rowData: Employee) => html`${formatDate(rowData.birthDate, getLocale())}`
        },
        {
            name: 'phone',
            headerTemplate: () => html`${msg('Phone')}`,
            template: (rowData: Employee) => html`${rowData.phone}`
        },
        {
            name: 'email',
            headerTemplate: () => html`${msg('Email')}`,
            template: (rowData: Employee) => html`${rowData.email}`
        },
        {
            name: 'department',
            headerTemplate: () => html`${msg('Department')}`,
            template: (rowData: Employee) => departmentList[rowData.department]()
        },
        {
            name: 'position',
            headerTemplate: () => html`${msg('Position')}`,
            template: (rowData: Employee) => positionList[rowData.position]()
        },
        {
            name: 'actions',
            headerTemplate: () => html`${msg('Actions')}`,
            template: (rowData: Employee) => html`
                <button type="button" class="secondary">Edit</button>
                <button type="button" class="secondary" @click=${() => this.employeeState.removeEmployee(rowData.id)}>
                    Delete
                </button>
            `
        },
    ]

    constructor() {
        super();
        console.log(this.employeeState)
    }

    private columnHeader(c: Column) {
        if (c.headerTemplate) {
            return c.headerTemplate();
        }
        return html``;
    }

    private columnData<T>(c: Column, rowData: T) {
        if (c.template) {
            return c.template(rowData)
        }
        return html``;
    }

    private listMode() {
        return html`
            
            List Mode
        `
    }

    private tableMode(data: Employee[]) {
        return html`
            <table>
                <thead>
                <tr>
                    ${this.columns.map(c => html`
                        <th>
                            ${this.columnHeader(c)}
                        </th>`
                    )}
                </tr>
                </thead>
                <tbody>
                ${data.map(rowData => html`
                    <tr>
                        ${this.columns.map(c => html`
                            <td>
                                ${this.columnData(c, rowData)}
                            </td>
                        `)}
                    </tr>
                `)}
                </tbody>
            </table>
        `
    }

    private pagination() {
        return html`
            <button type="button" class="secondary"
                    @click=${() => this.employeeState.changePage(this.employeeState.page.value - 1)}>Prev Page
            </button>
            <button type="button" class="secondary"
                    @click=${() => this.employeeState.changePage(this.employeeState.page.value + 1)}>Next Page
            </button>
        `
    }

    private setViewMode(mode: ViewMode) {
        this.viewMode = mode;
    }


    protected render() {
        console.count('Rendered')
        const paginatedData = this.employeeState.paginatedData.value;
        return html`
            <div class="toolbar">
                <h3>${msg('Employee List')}</h3>
                <input type="text" placeholder="Search">
                <button type="button" class="${this.viewMode == 'table' ? 'primary' : 'secondary'}"
                        @click=${() => this.setViewMode('table')}>Table
                </button>
                <button type="button" class="${this.viewMode == 'list' ? 'primary' : 'secondary'}"
                        @click=${() => this.setViewMode('list')}>List
                </button>
            </div>

            <div class="data-view">
                ${this.viewMode === 'list' ? this.listMode() : this.tableMode(paginatedData)}
            </div>

            ${this.pagination()}

        `
    }


    static styles = [
        ...sharedStyles,
        css`
            :host {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .toolbar {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                h3 {
                    flex: 1 1 auto;
                    padding: 0;
                    margin: 0;
                }
            }

            .data-view {
                flex: 1 1 auto;
                height: 100px;

                overflow: auto;
            }

            table {
                width: 100%;
                border-collapse: collapse;

                thead {
                    th {
                        font-weight: normal;
                        color: hsl(var(--primary));

                        text-align: start;

                        border-bottom: 1px solid hsl(var(--border));

                        padding: 1rem 0.5rem;
                    }
                }

                tbody {
                    tr:hover {
                        td {
                            background-color: color-mix(in hsl, hsl(var(--background)), black 5%);
                        }
                    }

                    td {
                        padding: 0.5rem;
                        border-bottom: 1px solid hsl(var(--border));
                        vertical-align: middle;
                    }
                }
            }

        `
    ]
}