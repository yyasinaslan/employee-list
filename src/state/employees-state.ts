import {Employee, serializeEmployee} from "../models/employee.ts";
import {generateFakeEmployees} from "../fixture/fake-employees.ts";
import {computed, effect, signal} from "@lit-labs/preact-signals";
import {LocalStorageHelper} from "../helpers/local-storage-helper.ts";
import {appState} from "./app-state.ts";


export class EmployeesState {

    readonly pageLimits = [10, 25, 50, 100]

    // Timeout ref
    private searchDebounce?: any;

    data = signal<Employee[]>([])
    private searchTerm = signal('');

    /**
     * Regenerate index when data or lang changed
     * this is necessary for translated search
     * @private
     */
    private searchIndex = computed(() => {
        const lang = appState.lang.value;
        return this.data.value.map(e => ({id: e.id, serialized: serializeEmployee(e).toLowerCase()}))
    })

    page = signal(1);
    limit = signal(LocalStorageHelper.get('employeeListLimit', 10));

    selection = signal(new Set<number>())

    filteredData = computed(() => {
        const search = this.searchTerm.value;
        let filteredData = this.data.value;
        if (search.length > 0) {
            const ids = this.searchIndex.value
                .filter(s => s.serialized.includes(search.toLowerCase()))
                .map(s => s.id)
            filteredData = this.data.value.filter(e => ids.includes(e.id))
        }
        return [...filteredData];
    })

    total = computed(() => this.data.value.length)
    filteredTotal = computed(() => this.filteredData.value.length)
    pageCount = computed(() => Math.ceil(this.filteredTotal.value / this.limit.value))

    paginatedData = computed(() => {
        const page = this.page.value;
        const limit = this.limit.value;
        const filteredData = this.filteredData.value;

        return filteredData.slice((page - 1) * limit, page * limit);
    })

    selectionState = computed(() => {
        const paginatedData = this.paginatedData.value;
        const selection = Array.from(this.selection.value);
        if (selection.length == 0) return 'none';
        if (selection.length === paginatedData.length) return 'all';
        return 'indeterminate';
    })

    constructor(initialData: Employee[]) {
        this.data.value = initialData;

        effect(() => {
            const data = this.data.value;
            LocalStorageHelper.set('employees', data)
        })
    }

    search(str: string) {
        if (this.searchDebounce) {
            clearTimeout(this.searchDebounce);
        }
        this.searchDebounce = setTimeout(() => {
            this.searchTerm.value = str;
        }, 200)
    }

    clearSelection() {
        this.selection.value = new Set<number>();
    }

    changePage(page: number) {
        console.log('page =' + page, this.pageCount.value);
        if (page < 1 || page > this.pageCount.value) {
            return;
        }
        this.page.value = page;
        this.clearSelection();
    }

    setData(data: Employee[]) {
        this.data.value = data;
    }

    addEmployee(data: Omit<Employee, "id">) {
        const latestId = [...this.data.value].sort((a, b) => b.id - a.id).at(0)?.id;
        this.data.value = [{...data, id: latestId ? latestId + 1 : 1}, ...this.data.value];
    }

    updateEmployee(data: Employee) {
        const employee = this.data.value.find((e) => e.id === data.id);
        if (employee) {
            Object.assign(employee, data);
            this.data.value = [...this.data.value]; // Trigger changes
        }
    }

    removeEmployee(id: number) {
        this.data.value = this.data.value.filter(item => item.id !== id);
    }

    setSelected(id: number, checked: boolean) {
        const selection = this.selection.value;
        if (checked) {
            selection.add(id)
            this.selection.value = new Set(selection);
        } else {
            selection.delete(id);
            this.selection.value = new Set(selection);
        }
    }

    selectAll() {
        this.selection.value = new Set(this.paginatedData.value.map(e => e.id))
    }

    setLimit(limit: number) {
        this.limit.value = limit;
        LocalStorageHelper.set('employeeListLimit', limit)
    }

    getEmployee(id: number) {
        return this.data.value.find((e) => e.id === id);
    }
}

function getStoredData() {
    const data = LocalStorageHelper.get<Employee[] | null>('employees', null);
    if (!data) {
        const fakeData = generateFakeEmployees(50);
        LocalStorageHelper.set('employees', fakeData);
        return fakeData;
    }

    return data;
}

export const employeeState = new EmployeesState(getStoredData());