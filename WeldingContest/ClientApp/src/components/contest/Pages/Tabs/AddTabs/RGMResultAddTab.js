import React, { Component } from 'react';
import { RGMResultAddTabView } from './RGMResultAddTabView';

export class RGMResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            overallMark: 30,
            penaltyMark: 0,
            file: null,
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.postFileToController = this.postFileToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
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
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleSubmit={this.handleSubmit}
                handleChangeInput={this.handleChangeInput}
                handleFile={this.handleFile}
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

        let file = new FormData();

        file.append("ContestName", this.props.contestWork.contest.name);
        file.append("NominationTitle", this.props.contestWork.nomination.title);
        file.append("ContestantRFID", this.props.contestWork.contestant.rfid);
        file.append("File", this.state.file);
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.postObjectToController(object);
            this.postFileToController(file);
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

    handleFile(file) {
        this.setState({ file: file });
    }
}