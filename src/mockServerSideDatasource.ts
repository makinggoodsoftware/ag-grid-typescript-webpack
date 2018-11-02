import {IServerSideDatasource, IServerSideGetRowsParams} from "ag-grid-community";
import {FakeServer} from "./fakeServer";

export class MockServerSideDatasource implements IServerSideDatasource {
    constructor (
        private _server: FakeServer
    ) {}

    destroy(): void {
    }

    getRows(params: IServerSideGetRowsParams): void {
        // adding delay to simulate real sever call
        setTimeout(() => {
            let response = this._server.getResponse(params.request);

            if (response.success) {
                // call the success callback
                params.successCallback(response.rows, response.lastRow);
            } else {
                // inform the grid request failed
                params.failCallback();
            }

        }, 500);
    }
}