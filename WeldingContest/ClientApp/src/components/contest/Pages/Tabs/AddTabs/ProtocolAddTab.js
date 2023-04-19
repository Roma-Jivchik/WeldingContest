import React, { Component } from 'react';
import { ProtocolAddTabView } from './ProtocolAddTabView';

export class ProtocolAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            file: null,
            validated: false,
        }

        this.postFileToController = this.postFileToController.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    async postFileToController(file) {
        const response = await fetch('file/create', {
            method: 'POST',
            body: file
        });
    }

    render() {
        return (
            <ProtocolAddTabView
                handleSubmit={this.handleSubmit}
                handleFile={this.handleFile}
            />
            );
    }

    handleSubmit() {
        event.preventDefault();

        let file = new FormData();

        file.append("FilePath", `${this.props.contestWork.contest.name}/${this.props.contestWork.nomination.title}/${this.props.contestWork.contestant.rfid}/`);
        file.append("Filename", `Протокол_${this.props.contestWork.contestant.rfid}.jpg`);
        file.append("File", this.state.file);

        this.postFileToController(file);

        setTimeout(() => { window.location.reload() }, 500);
    }

    handleFile(file) {
        this.setState({ file: file });
    }
}