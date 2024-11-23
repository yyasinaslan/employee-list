import {Employee} from "../models/employee.ts";
import {generateFakeEmployees} from "../fixture/fake-employees.ts";
import {computed, signal} from "@lit-labs/preact-signals";


class EmployeesState {

    data = signal<Employee[]>([])

    page = signal(1);
    limit = signal(10);

    paginatedData = computed(() => {
        const page = this.page.value;
        const limit = this.limit.value;
        const data = this.data.value.slice((page - 1) * limit, page * limit);
        console.log('paginatedData', data);
        return data;
    })

    constructor(initialData: Employee[]) {

        this.data.value = initialData;
    }

    changePage(page: number) {
        console.log('page =' + page);
        if (page < 1 || page >= this.data.value.length / this.limit.value) {
            return;
        }
        this.page.value = page;
    }

    changeLimit(limit: number) {
        this.limit.value = limit;
    }

    setData(data: Employee[]) {
        this.data.value = data;
    }

    addEmployee(data: Omit<Employee, "id">) {
        const latestId = this.data.value.sort((a, b) => b.id - a.id).at(0)?.id;
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
        console.log(this.data.value.length)
    }
}

export const employeeState = new EmployeesState(generateFakeEmployees(50));