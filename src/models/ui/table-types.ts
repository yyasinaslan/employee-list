import {html} from "lit";

export type ViewMode = 'table' | 'list';

export type Column<RowDataType = any> = {
    /**
     * Unique name for column
     */
    name: string;

    /**
     * Template to show cell data
     * @param rowData
     */
    template: (rowData: RowDataType) => ReturnType<typeof html>;

    /**
     * Template to show label in table head
     */
    headerTemplate: () => ReturnType<typeof html>;
}
