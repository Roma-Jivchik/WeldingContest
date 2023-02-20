import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { AddFileMultipleComponent } from '../sub-components/AddFileMultipleComponent';
import { ContestSampleFormView } from './ContestSampleFormView';

export class ContestSampleFormLogic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContestSample: "",
            files: [],
            loading: true,
            isAdding: false,
            isDisabled: false,
            isChoosed: false,
            isActive: false,
            isUpdating: false,
            message: "",
        };

        this.postDataToController = this.postDataToController.bind(this);
        this.putDataToController = this.putDataToController.bind(this);
        this.deleteDataFromController = this.deleteDataFromController.bind(this);
        this.getFilesFromController = this.getFilesFromController.bind(this);

        this.handleUploadForm = this.handleUploadForm.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    clearState() {
        this.setState({
            currentContestSample: "",
            files: [],
            loading: true,
            isAdding: false,
            isDisabled: true,
            isChoosed: false,
            isActive: false,
            isUpdating: false,
        });
    }

    handleUpdate(contestSample) {
        this.setState(
            {
                isChoosed: false,
                isActive: true,
                currentContestSample: contestSample,
                isDisabled: false,
                isUpdating: true,
                message: "",
            }
        );
    }

    handleAdd() {
        this.clearState();
        this.setState({
            isAdding: true,
            isDisabled: false,
            isChoosed: true,
            isUpdating: false,
            message: "",
            validated: false,
            isActive: true,
        });
    }

    handleDelete(contestSample) {
        this.setState({ isActive: false, isChoosed: true });
        this.clearState();
        this.deleteDataFromController(contestSample)
    }

    render() {
        return (
            <ContestSampleFormView isChoosed={this.state.isChoosed} isActive={this.state.isActive} isAdding={this.state.isAdding}
                isDisabled={this.state.isDisabled} isUpdating={this.state.isUpdating} currentContestSample={this.state.currentContestSample}
                validated={this.state.validated} handleDelete={(contestSample) => { this.handleDelete(contestSample) }}
                handleUpdate={(contestSample) => { this.handleUpdate(contestSample) }} handleChangeFiles={() => { this.handleChangeFiles() }}
                handleUploadForm={(event, formData) => { this.handleUploadForm(event, formData) }} />
            );
    }

    async getFilesFromController(folderPath) {
        const response = await fetch('contestSample/getFiles', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(folderPath)
        })

        const responseData = await response.json();
        this.setState({ files: responseData });
    }

    async postDataToController(formData) {
        console.log("Sending");

        const response = await fetch('contestSampleAndResults/postSample', {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();
        this.setState({ message: responseData, validated: false });
        this.clearState();
        this.getDataFromController();
    }

    async putDataToController(formData) {
        console.log("Updating");

        const response = await fetch('contestSample', {
            method: 'PUT',
            body: formData
        });

        const responseData = await response.json();
        this.setState({ message: responseData, validated: false });
        this.getDataFromController();
    }

    async deleteDataFromController(contestSample) {
        console.log("Deleting");
        const data = contestSample.id;
        const response = await fetch('contestSampleAndResults/deleteSample', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        this.setState({ message: responseData });
        this.getDataFromController();
    }

    handleUploadForm(event, formData) {
        const form = event.currentTarget;

        console.log(this.state.files);

        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        else {
            if (this.state.isAdding) {
                this.postDataToController(formData);
            }
            if (this.state.isUpdating) {
                this.putDataToController(formData);
            }
        }

        this.setState({ validated: true });
        event.preventDefault();
    }

    handleChangeFiles(uploaded) {
        this.setState({ files: uploaded });
    }
}