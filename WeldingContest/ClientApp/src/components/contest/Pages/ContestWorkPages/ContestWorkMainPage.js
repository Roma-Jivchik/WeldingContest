import React, { Component } from 'react';
import { ContestWorkMainPageView } from './ContestWorkMainPageView';

export class ContestWorkMainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contestWorks: [],
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Конкурсные работы");
        this.getCollectionFromController();
    }

    async getCollectionFromController() {
        const response = await fetch(`contestwork`);
        const data = await response.json();
        this.setState({ contestWorks: data});
        console.log(data);
    }

    render() {
        return (
            <>
                <ContestWorkMainPageView
                    contestWorks={this.state.contestWorks}
                    handleSelect={this.handleSelect}
                />
                </>
            );
    }

    handleSelect(contestWork) {
        window.location = (`/ContestWorks/ContestWork/${contestWork.id}`);
    }
}