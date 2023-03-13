import React, { Component } from 'react';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export class SortBarView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                        <FormControl sx={{ minWidth: 200 }} fullwidth="true">
                            <InputLabel id="demo-simple-select-label">Критерий сортировки</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.props.selectValue}
                                onChange={this.props.handleChangeSelectValue}
                                label="Критерий сортировки"
                                sx={{
                                    marginRight: "20px"
                                }}
                            >
                                {this.props.menuItems.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>{item.label} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
            </>
        );
    }
}