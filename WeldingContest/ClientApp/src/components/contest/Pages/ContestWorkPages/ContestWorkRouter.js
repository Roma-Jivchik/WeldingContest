import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ContestWorkAddPage } from './ContestWorkAddPage';
import { ContestWorkMainPage } from './ContestWorkMainPage';
import { ContestWorkPageWrapper } from './ContestWorkPageWrapper';

export class ContestWorkRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Routes>
                <Route path='/ContestWork/:id' element={<ContestWorkPageWrapper changePageTitle={this.props.changePageTitle} />} />
                <Route path='/Add' element={<ContestWorkAddPage changePageTitle={this.props.changePageTitle} />} />
                <Route path='/*' element={<ContestWorkMainPage changePageTitle={this.props.changePageTitle} />} />
            </Routes>
            );
    }
}