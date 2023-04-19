import React, { Component } from 'react';
import { RGMResultAddTabView } from './RGMResultAddTabView';

export class RGMResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            poresAndSludgeCount: 0,
            rootConcavityCount: 0,
            lackOfPenetrationCount: 0,
            defectsGroupCount: 0,
            defectsBetween1n4mmCount: 0,
            defectsBetween4n15mmCount: 0,
            defectsBetween15n40mmCount: 0,
            defectsOver40mmCount: 0,
            nonFusionsCount: 0,
            lackOfPenetrationOver25Count: 0,
            notes: "",
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
        const response = await fetch('file/create', {
            method: 'POST',
            body: file
        });
    }

    render() {
        return (
            <RGMResultAddTabView
                contestWork={this.props.contestWork}
                poresAndSludgeCount={this.state.poresAndSludgeCount}
                rootConcavityCount={this.state.rootConcavityCount}
                lackOfPenetrationCount={this.state.lackOfPenetrationCount}
                defectsGroupCount={this.state.defectsGroupCount}
                defectsBetween1n4mmCount={this.state.defectsBetween1n4mmCount}
                defectsBetween4n15mmCount={this.state.defectsBetween4n15mmCount}
                defectsBetween15n40mmCount={this.state.defectsBetween15n40mmCount}
                defectsOver40mmCount={this.state.defectsOver40mmCount}
                nonFusionsCount={this.state.nonFusionsCount}
                lackOfPenetrationOver25Count={this.state.lackOfPenetrationOver25Count}
                notes={this.state.notes}
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
            PoresAndSludgeCount: this.state.poresAndSludgeCount,
            RootConcavityCount: this.state.rootConcavityCount,
            LackOfPenetrationCount: this.state.lackOfPenetrationCount,
            DefectsGroupCount: this.state.defectsGroupCount,
            DefectsBetween1n4mmCount: this.state.defectsBetween1n4mmCount,
            DefectsBetween4n15mmCount: this.state.defectsBetween4n15mmCount,
            DefectsBetween15n40mmCount: this.state.defectsBetween15n40mmCount,
            DefectsOver40mmCount: this.state.defectsOver40mmCount,
            NonFusionsCount: this.state.nonFusionsCount,
            LackOfPenetrationOver25Count: this.state.lackOfPenetrationOver25Count,
            Notes: this.state.notes,
            OverallMark: this.state.overallMark,
        }

        let fileFirst = new FormData();
        let fileSecond = new FormData();

        fileFirst.append("FilePath", `${this.props.contestWork.contest.name}/${this.props.contestWork.nomination.title}/${this.props.contestWork.contestant.rfid}/`);
        fileFirst.append("Filename", `Рентген_${this.props.contestWork.contestant.rfid}_1.jpg`);
        fileFirst.append("File", this.state.fileFirst);

        fileSecond.append("FilePath", `${this.props.contestWork.contest.name}/${this.props.contestWork.nomination.title}/${this.props.contestWork.contestant.rfid}/`);
        fileSecond.append("Filename", `Рентген_${this.props.contestWork.contestant.rfid}_2.jpg`);
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
        let penaltyMark =
            (this.state.defectsGroupCount * 3
                + this.state.defectsBetween1n4mmCount * 3
                + this.state.defectsBetween4n15mmCount * 5
                + this.state.defectsBetween15n40mmCount * 8
                + this.state.defectsOver40mmCount * 13
                + this.state.nonFusionsCount * 15
                + this.state.lackOfPenetrationOver25Count * 15
            );
        let overallMark = 30 - penaltyMark;

        if (overallMark < 0) {
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