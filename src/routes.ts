import {Route} from "@vaadin/router";
import {HomeComponent} from "./pages/home.ts";
import {EmployeeListComponent} from "./pages/employee-list.ts";
import {EmployeeAddComponent} from "./pages/employee-add.ts";
import {EmployeeDetailsComponent} from "./pages/employee-details.ts";
import {NotFoundComponent} from "./pages/not-found.ts";


export const routes: Route[] = [
    {path: '/', component: HomeComponent.TagName},
    {path: '/employee/:employeeId', component: HomeComponent.TagName},
    {
        path: '/employees',
        component: EmployeeListComponent.TagName,
        children: [
            {path: 'add', component: EmployeeAddComponent.TagName},
            {path: 'details', component: EmployeeDetailsComponent.TagName},
        ]

    },
    {path: '(.*)', component: NotFoundComponent.TagName}
]