import React, { Component } from 'react';
import { FormComponent } from './FormComponent';
import { Route, Routes } from 'react-router-dom';
import { TableComponent } from './TableComponent';


export class TestingPage extends Component {
    static displayName = TestingPage.name;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.changePageTitle("Тестирование");
    }

    render() {
        return (
            <>
                <Routes>
                    <Route path='/Form' element={<FormComponent />} />
                    <Route path='/Table' element={<TableComponent />} />
                    </Routes>
                </>
        );
    }
}