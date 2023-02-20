import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid';
import CustomDataGrid from './CustomDataGrid';

export class TableView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { field: 'id', headerName: 'ID'},
                { field: 'rfid', headerName: 'RFID' },
            ],
            rows: [
                { id: 1, rfid: 1 },
                { id: 2, rfid: 2 },
                { id: 3, rfid: 3 },
                { id: 4, rfid: 4 },
            ]
        }
    }

    render() {
        return (
            <>
                </>
        );
    }
}