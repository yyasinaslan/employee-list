import {Department} from "./department.ts";
import {Position} from "./position.ts";

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