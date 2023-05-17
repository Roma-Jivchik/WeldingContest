import React, { Component } from 'react';
import { MainPageView } from './MainPageView';

export class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pagesNumber: 1,
            pageNumber: 0,
            evaluationResults: [],
            dataUrl: '?nominationTitle=А (135)',
        };

        this.getPagesNumber = this.getPagesNumber.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.handleChangeSelectValue = this.handleChangeSelectValue.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Главная");

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
        this.setState({ evaluationResults: data });
        console.log(data);
    }

    render() {
        return (
            <MainPageView
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