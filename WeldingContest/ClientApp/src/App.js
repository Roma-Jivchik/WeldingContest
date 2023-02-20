import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './components/contest/Layout';
import { TestingPage } from './components/contest/sub-components/TestingPage';
import { ContestantRouter } from './components/contest/Pages/ContestantPages/ContestantRouter';
import { ContestRouter } from './components/contest/Pages/ContestPages/ContestRouter';
import { NominationRouter } from './components/contest/Pages/NominationPages/NominationRouter';
import { ContestWorkRouter } from './components/contest/Pages/ContestWorkPages/ContestWorkRouter';

import './custom.css';
import './components/contest/stylesheets/Layout.css';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        this.state = {
            pageTitle:"Главная"
        }

        this.changePageTitle = this.changePageTitle.bind(this);
    }

    render() {
        return (
            <Layout pageTitle={this.state.pageTitle}>
                <Router>
                    <Routes>
                        <Route path='/Contestants/*' element={<ContestantRouter changePageTitle={this.changePageTitle} />} />
                        <Route path='/Contests/*' element={<ContestRouter changePageTitle={this.changePageTitle} />} />
                        <Route path='/Nominations/*' element={<NominationRouter changePageTitle={this.changePageTitle} />} />
                        <Route path='/ContestWorks/*' element={<ContestWorkRouter changePageTitle={this.changePageTitle} />} />
                        <Route path='/Test/*' element={<TestingPage changePageTitle={this.changePageTitle} />} />
                    </Routes>
                </Router>
            </Layout>
        );
    }

    changePageTitle(title) {
        this.setState({ pageTitle: title });
    }
}
