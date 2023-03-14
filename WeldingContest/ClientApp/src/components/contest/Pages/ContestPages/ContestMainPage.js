﻿import React, { Component } from 'react';
import { ContestMainPageView } from './ContestMainPageView';

export class ContestMainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contests: [],
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Конкурсы");
        this.getCollectionFromController();
    }

    async getCollectionFromController() {
        const response = await fetch(`contest`);
        const data = await response.json();
        this.setState({ contests: data});
        console.log(data);
    }

    render() {
        return (
            <>
                <ContestMainPageView
                    isAdding={ this.props.isAdding}
                    contests={this.state.contests}
                    handleSelect={this.handleSelect}
                />
                </>
            );
    }

    handleSelect(contest) {
        if (this.props.handleSelect == undefined) {
            window.location = (`/Contests/Contest/${contest.id}`);
        } else {
            this.props.handleSelect(contest);
        }
    }
}