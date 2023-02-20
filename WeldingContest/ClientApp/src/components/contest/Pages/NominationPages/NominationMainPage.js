﻿import React, { Component } from 'react';
import { NominationMainPageView } from './NominationMainPageView';

export class NominationMainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nominations: [],
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Номинации");
        this.getCollectionFromController();
    }

    async getCollectionFromController() {
        const response = await fetch(`nomination`);
        const data = await response.json();
        this.setState({ nominations: data});
        console.log(data);
    }

    render() {
        return (
            <>
                <NominationMainPageView
                    nominations={this.state.nominations}
                    handleSelect={this.handleSelect}
                />
                </>
            );
    }

    handleSelect(nomination) {
        window.location = (`/Nominations/Nomination/${nomination.id}`);
    }
}