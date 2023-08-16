import React, { Component } from 'react';
import { SearchBarView } from './SearchBarView';

export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            barValue: "",
            selectValue: "",
            url: "",
        };

        this.handleChangeBarValue = this.handleChangeBarValue.bind(this);
        this.handleChangeSelectValue = this.handleChangeSelectValue.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    resetState() {
        this.setState({
            barValue: "",
            selectValue: "",
            url: "",
        });

        this.props.reset();
    }

    render() {
        return (
            <>
                <SearchBarView
                    barValue={this.state.barValue}
                    selectValue={this.state.selectValue}
                    menuItems={this.props.menuItems}
                    handleChangeBarValue={this.handleChangeBarValue}
                    handleChangeSelectValue={this.handleChangeSelectValue}
                    handleClick={this.handleClick}
                    handleClear={ this.resetState}
                />
                </>
            );
    }

    handleChangeBarValue(event) {
        this.setState({ barValue: event.target.value});
    }

    handleChangeSelectValue(event, value) {
        this.setState({ selectValue: value.props.value});
    }

    handleClick() {
        let parts = this.state.selectValue.split('-');
        let dataUrl = `${this.state.selectValue}/?${parts[1]}=${this.state.barValue}`;
        let pagesUrl = `${dataUrl.substring(9)}`;

        this.props.setUrl(dataUrl, pagesUrl);
    }
}