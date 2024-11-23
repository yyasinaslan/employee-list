import {Employee} from "../models/employee";
import {faker} from '@faker-js/faker';
import {Department} from "../models/department.ts";
import {Position} from "../models/position.ts";


export function generateFakeEmployees(count: number): Employee[] {
    const employees: Employee[] = [];

    for (let i = 1; i <= count; i++) {
        const birthYear = faker.number.int({min: 1965, max: 2002});
        const employmentYear = faker.number.int({min: birthYear + 18, max: 2024});

        employees.push({
            id: i,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            employmentDate: faker.date.between({
                from: `${employmentYear}-01-01`,
                to: `${employmentYear}-12-31`
            }),
            birthDate: faker.date.between({
                from: `${birthYear}-01-01`,
                to: `${birthYear}-12-31`
            }),
            phone: faker.phone.number(),
            email: faker.internet.email(),
            department: faker.number.int({min: 0, max: Object.keys(Department).length / 2 - 1}) as Department,
            position: faker.number.int({min: 0, max: Object.keys(Position).length / 2 - 1}) as Position,
        });
    }

    return employees;
}