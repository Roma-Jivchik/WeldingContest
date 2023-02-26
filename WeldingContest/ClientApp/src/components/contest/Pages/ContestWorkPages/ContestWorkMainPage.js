import React, { Component } from 'react';
import { ContestWorkMainPageView } from './ContestWorkMainPageView';

export class ContestWorkMainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contestWorks: [],
            pagesNumber: 0,
            pageNumber: 1,
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
        this.getCollectionFromControllerByContestID = this.getCollectionFromControllerByContestID.bind(this);
        this.getPagesNumber = this.getPagesNumber.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        console.log(this.props.contestID);
        this.props.changePageTitle("Конкурсные работы");
        this.getPagesNumber();
        this.props.contestID != undefined
            ? this.getCollectionFromControllerByContestID(this.props.contestID, 1, 10)
            : this.getCollectionFromController(1, 10);
    }

    async getPagesNumber() {
        const response = await fetch('contestwork/get-pages-number?rowsNumber=10');
        const data = await response.json();
        this.setState({ pagesNumber: data });
    }

    async getCollectionFromController(pageNumber, rowsNumber) {
        const response = await fetch(`contestwork/get-range?pageNumber=${pageNumber}&rowsNumber=${rowsNumber}`);
        const data = await response.json();
        this.setState({ contestWorks: data});
        console.log(data);
    }

    async getCollectionFromControllerByContestID(contestID, pageNumber, rowsNumber) {
        const response = await fetch(`contestwork/get-range-by-contest-id?contestID=${contestID}&pagenumber=${pageNumber}&rowsNumber=${rowsNumber}`);
        const data = await response.json();
        this.setState({ contestWorks: data });
        console.log(data);
    }

    render() {
        return (
            <>
                <ContestWorkMainPageView
                    contestWorks={this.state.contestWorks}
                    pageNumber={this.state.pageNumber}
                    pagesNumber={this.state.pagesNumber}
                    handleSelect={this.handleSelect}
                    handleChangePage={this.handleChangePage}
                />
                </>
            );
    }

    handleSelect(contestWork) {
        window.location = (`/ContestWorks/ContestWork/${contestWork.id}`);
    }

    handleChangePage(event, value) {
        console.log(value);
        this.setState({ pageNumber: value }, () => {
            this.props.contestID != undefined
                ? this.getCollectionFromControllerByContestID(this.props.contestID, this.state.pageNumber, 10)
                : this.getCollectionFromController(this.state.pageNumber, 10);
        });
    }
}