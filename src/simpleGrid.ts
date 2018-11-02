import {Grid, GridOptions, ColDef, simpleHttpRequest} from "ag-grid-community";

import './styles.scss';
import {FakeServer} from "./fakeServer";
import {MockServerSideDatasource} from "./mockServerSideDatasource";


export class SimpleGrid {
    private readonly gridOptions: GridOptions = {};
    private readonly columnDefs: ColDef[] = [
        {field: 'id'},
        {field: 'athlete', width: 150},
        {field: 'age'},
        {field: 'country'},
        {field: 'year'},
        {field: 'sport'},
        {field: 'gold'},
        {field: 'silver'},
        {field: 'bronze'}
    ];

    constructor(selector: string) {
        this.gridOptions = {
            defaultColDef: {
                width: 120,
                suppressFilter: true
            },

            columnDefs: this.columnDefs,
            // use the server-side row model
            rowModelType: 'serverSide',
            onGridReady: this.onGridReady.bind(this)
        };

        let eGridDiv: HTMLElement = <HTMLElement>document.querySelector(selector);
        new Grid(eGridDiv, this.gridOptions);
    }

    onGridReady (): void {
        console.log('on first data rendered')
        simpleHttpRequest({url: 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json'}).then((data) => {
            // add id to data
            var idSequence = 0;
            data.forEach( function(item) {
                item.id = idSequence++;
            });

            let server: FakeServer = new FakeServer(data);
            let datasource = new MockServerSideDatasource(server);
            this.gridOptions.api.setServerSideDatasource(datasource);
        })
    }


}

