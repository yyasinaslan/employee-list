import {css, html, LitElement} from "lit";
import {customElement, query, state} from "lit/decorators.js";
import {localized, msg, str} from "@lit/localize";
import {sharedStyles} from "../styles/shared-styles.ts";
import {Employee} from "../models/employee.ts";
import {departmentList} from "../models/department.ts";
import {positionList} from "../models/position.ts";
import {employeeState} from "../state/employees-state.ts";
import {formatDate} from "../helpers/date-helper.ts";
import {getLocale} from "../localization.ts";
import {SignalWatcher} from "@lit-labs/preact-signals";
import {LocalStorageHelper} from "../helpers/local-storage-helper.ts";
import {Column, ViewMode} from "../models/ui/table-types.ts";
import {environment} from "../environment/environment.ts";

@localized()
@customElement('app-employee-list')
export class EmployeeListComponent extends SignalWatcher(LitElement) {

    @query('dialog#deleteDialog')
    deleteDialogRef?: HTMLDialogElement;

    @state()
    viewMode: ViewMode = LocalStorageHelper.get<ViewMode>('employeeViewMode', 'table');

    @state()
    showDeleteDialog = false;

    @state()
    deleteDialogData: null | Employee = null;

    private columns = [
        {
            name: 'selection',
            headerTemplate: () => html`<input type="checkbox" title=${msg('Select/Deselect All')}
                                              @change=${(event: any) => event.target.checked ? employeeState.selectAll() : employeeState.clearSelection()}
                                              .checked=${employeeState.selectionState.value == 'all'}
                                              .indeterminate=${employeeState.selectionState.value === 'indeterminate'}>`,
            template: (rowData: Employee) => html`<input type="checkbox"
                                                         title=${msg(str`Select/Deselect ${rowData.firstName} ${rowData.lastName}`)}
                                                         @change=${(event: any) => employeeState.setSelected(rowData.id, event.target.checked)}
                                                         .checked=${employeeState.selection.value.has(rowData.id)}>`
        },
        {
            name: 'id',
            headerTemplate: () => html`${msg('ID')}`,
            template: (rowData: Employee) => html`${rowData.id}`
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
            template: (rowData: Employee) => html`<a href="tel:${rowData.phone}">${rowData.phone}</a>`
        },
        {
            name: 'email',
            headerTemplate: () => html`${msg('Email')}`,
            template: (rowData: Employee) => html`<a href="mailto:${rowData.email}">${rowData.email}</a>`
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
                <a href=${environment.baseUrl + `/employees/${rowData.id}`} class="button ghost icon"
                   title=${msg('Edit')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </a>
                <button type="button" class="ghost icon text-destructive" @click=${() => this.deleteEmployee(rowData)}
                        title=${msg('Delete')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            `
        },
    ] satisfies Column[];

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

    getCol(name: string): Column<Employee> {
        return this.columns.find(c => c.name === name)!;
    }

    /**
     * Responsible to render data in list mode
     * @private
     */
    private listMode(data: Employee[]) {
        const selectionCol = this.getCol('selection');
        const idCol = this.getCol('id');
        const firstName = this.getCol('firstName');
        const lastName = this.getCol('lastName');
        const phone = this.getCol('phone');
        const email = this.getCol('email');
        const department = this.getCol('department');
        const position = this.getCol('position');
        const actions = this.getCol('actions');

        return html`
            <div class="selection-header">${selectionCol.headerTemplate()} <small>${msg('Select/Deselect All')}</small>
            </div>
            <div class="list-view">
                ${data.map((employee: Employee) => html`
                    <div class="list-item">
                        <div>${selectionCol.template(employee)}</div>
                        <div class="flex-auto">
                            <div class="bold">#${idCol.template(employee)}, ${firstName.template(employee)}
                                ${lastName.template(employee)}
                            </div>
                            <div class="small">${phone.template(employee)}</div>
                            <div class="small">${email.template(employee)}</div>
                            <div class="flex gap-1">
                                <div class="badge bold">${department.template(employee)}</div>
                                <div class="badge bold">${position.template(employee)}</div>
                            </div>
                        </div>
                        <div>
                            ${actions.template(employee)}
                        </div>
                    </div>
                `)}
            </div>
        `
    }

    /**
     * Responsible to render data in table mode
     * @private
     */
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
                ${data.map(employee => html`
                    <tr>
                        ${this.columns.map(c => html`
                            <td>
                                ${this.columnData(c, employee)}
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
            <div class="pagination">
                <button type="button" class="secondary"
                        @click=${() => employeeState.changePage(employeeState.page.value - 1)}>
                    ${msg('Prev Page')}
                </button>
                <div class="page-state">
                    <span>${employeeState.page.value}</span>
                    <span>/</span>
                    <span>${employeeState.pageCount.value}</span>
                </div>
                <button type="button" class="secondary"
                        @click=${() => employeeState.changePage(employeeState.page.value + 1)}>
                    ${msg('Next Page')}
                </button>
                <div>
                    ${msg(html`
                        Show <select @change=${this.setLimit}>
                            ${employeeState.pageLimits.map(limit => html`
                                <option value=${limit} .selected=${employeeState.limit.value == limit}>${limit}
                                </option>
                            `)}
                        </select> per page.
                    `)}
                </div>
            </div>
        `
    }

    private setLimit(event: any) {
        employeeState.setLimit(Number(event.target.value));
    }

    private setViewMode(mode: ViewMode) {
        this.viewMode = mode;
        LocalStorageHelper.set('employeeViewMode', mode);
    }


    protected render() {
        const paginatedData = employeeState.paginatedData.value;
        return html`
            <div class="toolbar">
                <h3>${msg('Employee List')}</h3>
                <small>
                    ${employeeState.filteredTotal.value === employeeState.total.value ? '' : msg(str`Found ${employeeState.filteredTotal.value} records.`)}
                    ${msg(str`Total ${employeeState.total}`)}
                </small>
                <input type="text" placeholder=${msg('Search')}
                       @keyup=${(event: any) => employeeState.search(event.target.value)}>
                <button type="button" class="${this.viewMode == 'table' ? 'primary' : 'secondary'}"
                        @click=${() => this.setViewMode('table')} title=${msg('Table Mode')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"/>
                    </svg>
                </button>
                <button type="button" class="${this.viewMode == 'list' ? 'primary' : 'secondary'}"
                        @click=${() => this.setViewMode('list')} title=${msg('List Mode')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                        <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                    </svg>
                </button>
            </div>

            <div class="data-view">
                ${this.viewMode === 'list' ? this.listMode(paginatedData) : this.tableMode(paginatedData)}
            </div>

            ${this.pagination()}

            <dialog id="deleteDialog">
                <div class="flex gap-1">
                    <h3 class="flex-auto">${msg('Are you sure?')}</h3>
                    <button type="button" class="ghost icon" @click=${() => this.deleteDialogRef?.close()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="icon" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                </div>
                <div>
                    ${msg(html`Selected employee record of <b
                            class="text-destructive">${this.deleteDialogData?.firstName}
                        ${this.deleteDialogData?.lastName}</b> will be deleted!`, {id: 'deleteConfirm'})}
                </div>
                <div class="flex gap-1" style="justify-content: flex-end">
                    <button type="button" class="destructive" @click=${() => this.confirmDelete()}>${msg('Delete')}
                    </button>
                    <button type="button" class="secondary" @click=${() => this.deleteDialogRef?.close()}>
                        ${msg('Cancel')}
                    </button>
                </div>
            </dialog>

        `
    }


    static styles = [
        ...sharedStyles,
        css`
            :host {
            }


            .toolbar {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 0.5rem;

                h3 {
                    flex: 1 1 auto;
                    padding: 0;
                    margin: 0;
                }
            }

            .data-view {
                //height: 200px;

                overflow-x: auto;
                //overflow-y: visible;
            }

            input[type=checkbox] {
                width: 1.2em;
                height: 1.2em;
                accent-color: hsl(var(--primary));
            }

            table {
                width: 100%;
                border-collapse: collapse;

                thead {
                    th {
                        font-weight: bold;
                        text-align: start;
                        border-bottom: 1px solid hsl(var(--border));
                        background: hsl(var(--background));
                        padding: 1rem 0.5rem;
                        vertical-align: middle;
                        //position: sticky;
                        //top: 60px;

                        white-space: nowrap;
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
                        white-space: nowrap;

                    }
                }
            }

            .pagination {
                position: sticky;
                bottom: 0;
                background: hsl(var(--background));
                
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1.5rem;
                flex-wrap: wrap;

                padding: 0.5rem 1rem;

                border-top: 1px solid hsl(var(--border));


                .page-state {
                    font-weight: bold;
                }
            }

            .selection-header {
                display: flex;
                align-items: center;
                gap: 0.2rem;
            }

            .list-view {
                display: flex;
                flex-direction: column;

                .list-item {
                    border-bottom: 1px solid hsl(var(--border));
                    padding: 0.5rem 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
            }
        `
    ]

    private deleteEmployee(rowData: Employee) {
        this.deleteDialogData = rowData;
        this.deleteDialogRef?.showModal();
    }

    private confirmDelete() {
        if (!this.deleteDialogData) return;

        employeeState.removeEmployee(this.deleteDialogData.id);

        this.deleteDialogRef?.close();
    }
}