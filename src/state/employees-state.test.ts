import {beforeEach, describe, expect, it} from "vitest";
import {EmployeesState} from "./employees-state";
import {generateFakeEmployees} from "../fixture/fake-employees";


describe('Employees State', () => {
    let store!: EmployeesState;
    beforeEach(() => {
        store = new EmployeesState([]);
    })

    it('should be created', () => {
        expect(store).toBeDefined();
    })

    it('should have initial state', () => {
        expect(store.data.value).toEqual([]);
    })

    it('should add employees', () => {
        const fakeEmployees = generateFakeEmployees(1);
        store.addEmployee(fakeEmployees[0]);
        expect(store.data.value.length).toEqual(1);
    })

    it('should remove employee', () => {
        const fakeEmployees = generateFakeEmployees(1);
        store.addEmployee(fakeEmployees[0]);
        store.removeEmployee(fakeEmployees[0].id);
        expect(store.data.value.length).toEqual(0);
    })

    it('should update employee', () => {
        const fakeEmployees = generateFakeEmployees(1);
        store.addEmployee(fakeEmployees[0]);
        store.updateEmployee({...fakeEmployees[0], firstName: 'John'});
        expect(store.data.value[0].firstName).toEqual('John');
    })

    it('should paginate correctly', () => {
        const fakeEmployees = generateFakeEmployees(50);
        store.setData(fakeEmployees);

        // page 1
        store.changePage(1);
        expect(store.paginatedData.value.length).toEqual(10);

        // limit 20
        store.limit.value = 20;
        expect(store.paginatedData.value.length).toEqual(20);

        // page 3 should have 10 items
        store.changePage(3);
        expect(store.paginatedData.value.length).toEqual(10);
    })
})
