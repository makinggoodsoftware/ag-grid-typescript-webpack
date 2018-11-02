import {IServerSideGetRowsRequest} from "ag-grid-community";


export class FakeServer {
    constructor(
        private _data: any[]
    ) {}

    getResponse (request: IServerSideGetRowsRequest): any {
        console.log('asking for rows: ' + request.startRow + ' to ' + request.endRow);

        // take a slice of the total rows
        let rowsThisPage = this._data.slice(request.startRow, request.endRow);

        // if on or after the last page, work out the last row.
        let lastRow = this._data.length <= request.endRow ? this._data.length : -1;

        return {
            success: true,
            rows: rowsThisPage,
            lastRow: lastRow
        };
    }
}