import React, { Component } from 'react';
import { SortBarView } from './SortBarView';

export class SortBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectValue: "",
            url: "",
        };

        this.handleChangeSelectValue = this.handleChangeSelectValue.bind(this);
    }

    render() {
        return (
            <>
                <SortBarView
                    selectValue={this.state.selectValue}
                    menuItems={this.props.menuItems}
                    handleChangeSelectValue={this.handleChangeSelectValue}
                />
                </>
            );
    }

    handleChangeSelectValue(event, value) {
        this.setState({ selectValue: value.props.value });

        this.props.setUrl(value.props.value);
    }
}