import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ContestantAddPage } from './ContestantAddPage';
import { ContestantMainPage } from './ContestantMainPage';
import { ContestantPageWrapper } from './ContestantPageWrapper';

export class ContestantRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Routes>
                <Route path='/Contestant/:id' element={<ContestantPageWrapper changePageTitle={this.props.changePageTitle} />} />
                <Route path='/Add' element={<ContestantAddPage changePageTitle={this.props.changePageTitle} />} />
                <Route path='/*' element={<ContestantMainPage changePageTitle={this.props.changePageTitle} />} />
            </Routes>
            );
    }
}