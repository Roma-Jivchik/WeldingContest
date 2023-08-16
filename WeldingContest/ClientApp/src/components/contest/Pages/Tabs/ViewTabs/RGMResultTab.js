import React, { Component } from 'react';
import { RGMResultTabView } from './RGMResultTabView';

export class RGMResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poresAndSludgeCount: this.props.contestWork.rgmResults[0].poresAndSludgeCount,
            rootConcavityCount: this.props.contestWork.rgmResults[0].rootConcavityCount,
            lackOfPenetrationCount: this.props.contestWork.rgmResults[0].lackOfPenetrationCount,
            defectsGroupCount: this.props.contestWork.rgmResults[0].defectsGroupCount,
            defectsBetween1n4mmCount: this.props.contestWork.rgmResults[0].defectsBetween1n4mmCount,
            defectsBetween4n15mmCount: this.props.contestWork.rgmResults[0].defectsBetween4n15mmCount,
            defectsBetween15n40mmCount: this.props.contestWork.rgmResults[0].defectsBetween15n40mmCount,
            defectsOver40mmCount: this.props.contestWork.rgmResults[0].defectsOver40mmCount,
            nonFusionsCount: this.props.contestWork.rgmResults[0].nonFusionsCount,
            lackOfPenetrationOver25Count: this.props.contestWork.rgmResults[0].lackOfPenetrationOver25Count,
            notes: this.props.contestWork.rgmResults[0].notes,
            overallMark: this.props.contestWork.rgmResults[0].overallMark,
            penaltyMark: 30 - this.props.contestWork.rgmResults[0].overallMark,
            isHidden: false
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.hideImage = this.hideImage.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`rgmResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    async deleteFileFromController(filepath) {
        const response = await fetch('file/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filepath)
        });

        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <RGMResultTabView
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
                handleDelete={this.handleDelete}
                hideImage={ this.hideImage}
            />
            );
    }

    handleDelete() {
        if (window.confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.rgmResults[0].id);
            this.deleteFileFromController(`wwwroot\\Фото\\${this.props.contestWork.contest.name}\\${this.props.contestWork.nomination.title}\\${this.props.contestWork.contestant.rfid}\\Рентген_${this.props.contestWork.contestant.rfid}_1.jpg`);
            this.deleteFileFromController(`wwwroot\\Фото\\${this.props.contestWork.contest.name}\\${this.props.contestWork.nomination.title}\\${this.props.contestWork.contestant.rfid}\\Рентген_${this.props.contestWork.contestant.rfid}_2.jpg`);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }

    hideImage() {
        this.setState({ isHidden: true });
    }
}