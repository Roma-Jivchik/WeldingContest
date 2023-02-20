﻿import React, { Component } from 'react';
import { ContestWorkAddPageView } from './ContestWorkAddPageView';

export class ContestWorkAddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contests: [],
            contestants: [],
            nominations:[],
            contest: {name: ""},
            contestant: {rfid: ""},
            nomination: {title: ""},
            validated: false,
            contestAnchorOpen: false,
            contestantAnchorOpen: false,
            nominationAnchorOpen: false,
            contestAnchor: "",
            contestantAnchor: "",
            nominationAnchor: "",
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectContest = this.handleSelectContest.bind(this);
        this.handleSelectContestant = this.handleSelectContestant.bind(this);
        this.handleSelectNomination = this.handleSelectNomination.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Добавление номинации");
        this.getCollectionFromController("contest");
        this.getCollectionFromController("contestant");
        this.getCollectionFromController("nomination");
    }

    async postObjectToController(object) {
        const response = await fetch(`contestwork/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);

        window.location = ('/ContestWorks');
    }

    async getCollectionFromController(controller) {
        const response = await fetch(`${controller}`);
        const data = await response.json();
        this.setState({ [`${controller}s`]: data });
        console.log(data);
    }

    render() {
        return (
            <ContestWorkAddPageView
                contestAnchorOpen={this.state.contestAnchorOpen}
                contestantAnchorOpen={this.state.contestantAnchorOpen}
                nominationAnchorOpen={this.state.nominationAnchorOpen}
                contestAnchor={this.state.contestAnchor}
                contestantAnchor={this.state.contestantAnchor}
                nominationAnchor={this.state.nominationAnchor}
                contests={this.state.contests}
                contestants={this.state.contestants}
                nominations={this.state.nominations}
                contest={this.state.contest}
                contestant={this.state.contestant}
                nomination={this.state.nomination}
                handleSubmit={this.handleSubmit}
                handleSelectContest={this.handleSelectContest}
                handleSelectContestant={this.handleSelectContestant}
                handleSelectNomination={this.handleSelectNomination}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
            />
            );
    }

    handleSubmit() {
        event.preventDefault();
        let object = {
            ID: "_",
            ContestID: this.state.contest.id,
            ContestantID: this.state.contestant.id,
            NominationID: this.state.nomination.id,
        }
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.postObjectToController(object);
        }
    }

    handleSelectContest(contest) {
        this.setState({
            contest: contest.row,
            contestAnchorOpen: false,
            contestAnchor: null
        });
    }

    handleSelectContestant(contestant) {
        this.setState({
            contestant: contestant.row,
            contestantAnchorOpen: false,
            contestantAnchor: null
        });
    }

    handleSelectNomination(nomination) {
        this.setState({
            nomination: nomination.row,
            nominationAnchorOpen: false,
            nominationAnchor: null
        });
    }

    handleClose() {
        this.setState({
            [event.target.name]: null,
            [`${event.target.name}Open`]: false
        });
    }

    handleOpen(event) {
        this.setState({
            [event.target.name]: event.target,
            [`${event.target.name}Open`]: true
        });
    }
}