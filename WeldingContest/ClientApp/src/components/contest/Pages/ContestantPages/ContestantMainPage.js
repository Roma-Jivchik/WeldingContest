import React, { Component } from 'react';
import { ContestantMainPageView } from './ContestantMainPageView';

export class ContestantMainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contestants: [],
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Конкурсанты");
        this.getCollectionFromController();
    }

    async getCollectionFromController() {
        const response = await fetch(`contestant`);
        const data = await response.json();
        this.setState({ contestants: data});
        console.log(data);
    }

    render() {
        return (
            <>
                <ContestantMainPageView
                    contestants={this.state.contestants}
                    handleSelect={this.handleSelect}
                />
                </>
            );
    }

    handleSelect(contestant) {
        window.location = (`/Contestants/Contestant/${contestant.id}`);
    }
}