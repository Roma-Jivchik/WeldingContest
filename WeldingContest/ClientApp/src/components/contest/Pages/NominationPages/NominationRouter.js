import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NominationAddPage } from './NominationAddPage';
import { NominationMainPage } from './NominationMainPage';
import { NominationPageWrapper } from './NominationPageWrapper';

export class NominationRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Routes>
                <Route path='/Nomination/:id' element={<NominationPageWrapper changePageTitle={this.props.changePageTitle} />} />
                <Route path='/Add' element={<NominationAddPage changePageTitle={this.props.changePageTitle} />} />
                <Route path='/*' element={<NominationMainPage isAdding={ true} changePageTitle={this.props.changePageTitle} />} />
            </Routes>
            );
    }
}