import React, { Component } from 'react';
import TextField from "@mui/material/TextField";

export class SearchBarView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <TextField
                    variant="outlined"
                    label="Поиск"
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </>
        );
    }
}