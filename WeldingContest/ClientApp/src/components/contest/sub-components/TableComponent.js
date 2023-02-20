import React, { Component } from 'react';
import { TableView } from './TableView'
import {GridColDef} from '@mui/x-data-grid';

export class TableComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collection: this.props.collection,
            keys: ["№", "RFID", "QR", "Фамилия", "Имя", "Отчество"],
            propsKeys: ["rfid", "qr", "surname", "name", "patronymic"],
            columns: [
                { field: 'id'},
                { field: 'rfid'},
            ],
            rows: [
                { id: 1, rfid: 1 },
                { id: 2, rfid: 2 },
                { id: 3, rfid: 3 },
                { id: 4, rfid: 4 },
            ]
        };

        this.handleChooseTableItem = this.handleChooseTableItem.bind(this);
    }

    render() {
        return (
            <TableView
                keys={this.state.keys}
                propsKeys={this.state.propsKeys}
                collection={this.state.collection}
                handleChooseTableItem={this.handleChooseTableItem}
                rows={this.state.rows}
                columns={ this.state.columns}
            />
        );
    }

    handleChooseTableItem(item) {
        console.log(item);
    }
}