import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ContestAddPage } from './ContestAddPage';
import { ContestMainPage } from './ContestMainPage';
import { ContestPageWrapper } from './ContestPageWrapper';

export class ContestRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Routes>
                <Route path='/Contest/:id' element={<ContestPageWrapper changePageTitle={this.props.changePageTitle} />} />
                <Route path='/Add' element={<ContestAddPage changePageTitle={this.props.changePageTitle} />} />
                <Route path='/*' element={<ContestMainPage changePageTitle={this.props.changePageTitle} />} />
            </Routes>
            );
    }
}