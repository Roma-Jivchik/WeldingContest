import React, { Component } from 'react';
import { ContestPageView } from './ContestPageView';

export class ContestPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contest: {},
            name: "",
            dateOfBegin: "",
            dateOfEnd: "",
            isUpdating: false,
            validated: false,
            pagesNumber: 1,
            pageNumber: 0,
            evaluationResults: [],
            dataUrl: '?nominationTitle=А (135)',
        };

        this.clearState = this.clearState.bind(this);
        this.getObjectFromController = this.getObjectFromController.bind(this);
        this.putObjectToController = this.putObjectToController.bind(this);
        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.formProtocol = this.formProtocol.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormProtocol = this.handleFormProtocol.bind(this);
        this.handleFormEvaluationResults = this.handleFormEvaluationResults.bind(this);
        this.formEvaluationResults = this.formEvaluationResults.bind(this);

        this.getPagesNumber = this.getPagesNumber.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.handleChangeSelectValue = this.handleChangeSelectValue.bind(this);
    }

    clearState() {
        this.setState({
            name: this.state.contest.name,
            dateOfBegin: this.state.contest.dateOfBegin,
            dateOfEnd: this.state.contest.dateOfEnd,
            pagesUrl: "",
            dataUrl: "",
            isUpdating: false,
            validated: false,
        });
    }

    componentDidMount() {
        this.props.changePageTitle("Конкурс");
        this.getObjectFromController(this.props.id);

        this.getPagesNumber();
        this.getCollectionFromController(1);
    }

    async getPagesNumber() {
        const response = await fetch(`evaluationResult/get-pages-number/by-nominationTitle/${this.state.dataUrl}&rowsNumber=10`);
        const data = await response.json();
        this.setState({ pagesNumber: data });
    }

    async getCollectionFromController(pageNumber) {
        const response = await fetch(`evaluationResult/searched/by-nominationTitle/${this.state.dataUrl}&pageNumber=${pageNumber}&rowsNumber=10`);
        const data = await response.json();
        let index = 1 + (pageNumber - 1) * 10;
        data.map(item => {
            item.index = index;
            index++;
        });

        this.setState({ evaluationResults: data });
        console.log(data);
    }

    async getObjectFromController(id) {
        const response = await fetch(`contest/get-by-id?id=${id}`);
        const data = await response.json();
        this.setState({
            contest: data,
            name: data.name,
            dateOfBegin: data.dateOfBegin,
            dateOfEnd: data.dateOfEnd,
        });
        console.log(data);
    }

    async putObjectToController(object) {
        const response = await fetch(`contest/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);

        this.setState({ isUpdating: false });
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`contest/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    async formProtocol(contest) {
        const response = await fetch('protocol/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contest)
        });

        const data = await response.blob();

        const url = URL.createObjectURL(data);
        const downloadLink = document.createElement('a');

        downloadLink.href = url;
        downloadLink.download = "OverallProtocol.xlsx";

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);

        console.log(data);
    }

    async formEvaluationResults() {
        const response = await fetch('evaluationResult/temp/create-all');

        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <ContestPageView
                contest={this.state.contest}
                name={this.state.name}
                dateOfBegin={this.state.dateOfBegin}
                dateOfEnd={this.state.dateOfEnd}
                isUpdating={this.state.isUpdating}
                validated={this.state.validated}
                handleChangeInput={this.handleChangeInput}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                handleCancel={this.handleCancel}
                handleSubmit={this.handleSubmit}
                handleFormProtocol={this.handleFormProtocol}
                handleFormEvaluationResults={this.handleFormEvaluationResults}
                handleChangePage={this.handleChangePage}
                pagesNumber={this.state.pagesNumber}
                pageNumber={this.state.pageNumber}
                handleSelect={this.handleSelect}
                evaluationResults={this.state.evaluationResults}
                selectValue={this.state.dataUrl}
                handleChangeSelectValue={this.handleChangeSelectValue}
            />
            );
    }

    handleSubmit(event) {
        event.preventDefault();

        let object = {
            ID: this.state.contest.id,
            Name: this.state.name,
            DateOfBegin: this.state.dateOfBegin,
            DateOfEnd: this.state.dateOfEnd,
        };

        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.putObjectToController(object);
        }
    }

    handleFormProtocol() {
        this.formProtocol(this.state.contest);
    }

    handleFormEvaluationResults() {
        this.formEvaluationResults();
    }

    handleUpdate() {
        this.setState({ isUpdating: true });
    }

    handleDelete() {
        if (window.confirm("Вы действительно хотите удалить данный конкурс?")) {
            this.deleteObjectFromController(this.state.contest.id);
            setTimeout(() => { window.location = ('/Contests') }, 1000);
        }
    }

    handleCancel() {
        this.setState({ isUpdating: false });
        this.clearState();
    }

    handleChangeInput(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChangePage(event, value) {
        console.log(value);
        this.setState({ pageNumber: value }, () => { this.getCollectionFromController(this.state.pageNumber) });
    }

    handleSelect(evaluationResult) {
       window.location = (`/ContestWorks/ContestWork/${evaluationResult.row.contestWorkID}`);
    }

    handleChangeSelectValue(event, value) {
        this.setState({
            dataUrl: value.props.value,
            pageNumber: 1,
        }, () => {
            this.getPagesNumber();
            this.getCollectionFromController(this.state.pageNumber)
        });
    }
}