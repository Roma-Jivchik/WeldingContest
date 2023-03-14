import React, { Component } from 'react';
import { ContestantMainPageView } from './ContestantMainPageView';

export class ContestantMainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contestants: [],
            pagesNumber: 0,
            pageNumber: 1,
            pagesUrl: "contestant/get-pages-number/?",
            dataUrl: "contestant/?"
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
        this.getPagesNumber = this.getPagesNumber.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.setSearchingUrl = this.setSearchingUrl.bind(this);
        this.setSortingUrl = this.setSortingUrl.bind(this);
        this.getDataFromController = this.getDataFromController.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Конкурсанты");
        this.getPagesNumber();
        this.getCollectionFromController(1, 10);
    }

    async getPagesNumber() {
        const response = await fetch(`${this.state.pagesUrl}&rowsNumber=10`);
        const data = await response.json();
        this.setState({ pagesNumber: data });
    }

    async getCollectionFromController(pageNumber, rowsNumber) {
        const response = await fetch(`${this.state.dataUrl}&pageNumber=${pageNumber}&rowsNumber=${rowsNumber}`);
        const data = await response.json();
        this.setState({ contestants: data});
        console.log(data);
    }

    getDataFromController() {
        this.getPagesNumber();
        this.getCollectionFromController(this.state.pageNumber, 10);
    }

    render() {
        return (
            <>
                <ContestantMainPageView
                    isAdding={ this.props.isAdding}
                    contestants={this.state.contestants}
                    pageNumber={this.state.pageNumber}
                    pagesNumber={this.state.pagesNumber}
                    handleSelect={this.handleSelect}
                    handleChangePage={this.handleChangePage}
                    setSearchingUrl={this.setSearchingUrl}
                    setSortingUrl={this.setSortingUrl}
                    reset={ this.reset}
                />
                </>
            );
    }

    handleSelect(contestant) {
        console.log(this.props.handleSelect);
        if (this.props.handleSelect == undefined) {
            window.location = (`/Contestants/Contestant/${contestant.id}`);
        } else {
            this.props.handleSelect(contestant);
        }
    }

    handleChangePage(event, value) {
        console.log(value);
        this.setState({ pageNumber: value }, () => { this.getCollectionFromController(this.state.pageNumber, 10) });
    }

    setSearchingUrl(dataUrl, pagesUrl) {
        this.setState({
            dataUrl: 'contestant/' + dataUrl,
            pagesUrl: 'contestant/get-pages-number/' + pagesUrl,
        }, () => { this.getDataFromController() });
    }

    setSortingUrl(dataUrl) {
        this.setState({
            dataUrl: 'contestant/' + dataUrl,
            pagesUrl: 'contestant/get-pages-number/?',
        }, () => { this.getDataFromController() });
    }

    reset() {
        this.setState({
            dataUrl: 'contestant/?',
            pagesUrl: 'contestant/get-pages-number/?',
        }, () => { this.getDataFromController() });
    }
}