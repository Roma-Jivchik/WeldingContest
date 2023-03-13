import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export class SearchBarView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Stack direction="row" spacing={2}>
                    <TextField label="Поиск" variant="outlined" value={this.props.barValue} onChange={this.props.handleChangeBarValue} />
                        <FormControl sx={{ minWidth: 200 }} fullwidth="true">
                            <InputLabel id="demo-simple-select-label">Критерий поиска</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.props.selectValue}
                                onChange={this.props.handleChangeSelectValue}
                                label="Критерий поиска"
                                sx={{
                                    marginRight: "20px"
                                }}
                            >
                                {this.props.menuItems.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>{item.label} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    <Button
                        variant="outlined"
                        onClick={this.props.handleClick}
                    >
                        Найти
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={ this.props.handleClear}
                    >
                        Очистить
                        </Button>
                </Stack>
                { this.props.message}
            </>
        );
    }
}