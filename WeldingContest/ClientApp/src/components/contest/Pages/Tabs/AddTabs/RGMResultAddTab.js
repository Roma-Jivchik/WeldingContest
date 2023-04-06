import React, { Component } from 'react';
import { RGMResultAddTabView } from './RGMResultAddTabView';

export class RGMResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            overallMark: 30,
            penaltyMark: 0,
            fileFirst: null,
            fileSecond: null,
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.postFileToController = this.postFileToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileFirst = this.handleFileFirst.bind(this);
        this.handleFileSecond = this.handleFileSecond.bind(this);
        this.countOverallMark = this.countOverallMark.bind(this);
    }

    async postObjectToController(object) {
        const response = await fetch(`rgmResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    async postFileToController(file) {
        const response = await fetch('file/create/rgm', {
            method: 'POST',
            body: file
        });
    }

    render() {
        return (
            <RGMResultAddTabView
                contestWork={this.props.contestWork}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleSubmit={this.handleSubmit}
                handleChangeInput={this.handleChangeInput}
                handleFileFirst={this.handleFileFirst}
                handleFileSecond={ this.handleFileSecond}
            />
            );
    }

    handleSubmit() {
        event.preventDefault();

        let object = {
            ID: "_",
            ContestWorkID: this.state.contestWorkID,
            OverallMark: this.state.overallMark,
        }

        let fileFirst = new FormData();
        let fileSecond = new FormData();

        fileFirst.append("ContestName", this.props.contestWork.contest.name);
        fileFirst.append("NominationTitle", this.props.contestWork.nomination.title);
        fileFirst.append("ContestantRFID", this.props.contestWork.contestant.rfid);
        fileFirst.append("File", this.state.fileFirst);

        fileSecond.append("ContestName", this.props.contestWork.contest.name);
        fileSecond.append("NominationTitle", this.props.contestWork.nomination.title);
        fileSecond.append("ContestantRFID", this.props.contestWork.contestant.rfid);
        fileSecond.append("File", this.state.fileSecond);
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.postObjectToController(object);
            this.postFileToController(fileFirst);
            this.postFileToController(fileSecond);
        }

        setTimeout(() => { window.location.reload() }, 500);
    }

    handleChangeInput() {
        if (event.target.value >= 0) {
            this.setState({ [event.target.name]: event.target.value }, () => { this.countOverallMark() });
        }
    }

    countOverallMark() {
        let penaltyMark = 30 - this.state.overallMark;
        let overallMark = this.state.overallMark;

        if (this.state.overallMark > 30) {
            overallMark = 30;
            penaltyMark = 0;
        }

        if (this.state.overallMark < 0) {
            overallMark = 0;
            penaltyMark = 30;
        }

        this.setState({ overallMark: overallMark, penaltyMark: penaltyMark });
        console.log(overallMark);
    }

    handleFileFirst(file) {
        this.setState({ fileFirst: file });
    }

    handleFileSecond(file) {
        this.setState({ fileSecond: file });
    }
}