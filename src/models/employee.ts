import {Department, departmentList} from "./department.ts";
import {Position, positionList} from "./position.ts";
import {date, number, object, ObjectSchema, string} from "yup";
import {msg} from "@lit/localize";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    employmentDate: Date;
    birthDate: Date;
    phone: string;
    email: string;
    department: Department;
    position: Position
}

export const createEmployeeSchema: ObjectSchema<Omit<Employee, "id">> = object({
    firstName: string().required(() => msg("First name is required")).default(''),
    lastName: string().required(() => msg("Last name is required")).default(''),
    employmentDate: date().required(() => msg("Employment date is required")).default(() => new Date()),
    birthDate: date().required(() => msg("Birth date is required")).default(() => new Date()),
    phone: string().required(() => msg("Phone number is required")).default(''),
    email: string().email().required(() => msg("Email is required")).default(''),
    department: number().oneOf(Object.keys(departmentList).map(d => Number(d)))
        .required(() => msg("Department is required")).default(Department.Analytics),
    position: number().oneOf(Object.keys(positionList).map(p => Number(p)))
        .required(() => msg("Position is required")).default(Position.Junior),
})

export function serializeEmployee(employee: Employee) {
    return [
        employee.firstName,
        employee.lastName,
        employee.employmentDate.toString(),
        employee.birthDate.toString(),
        employee.phone,
        employee.email,
        departmentList[employee.department]().values.join(),
        positionList[employee.position]().values.join(),
        employee.id
    ].join(', ')
}