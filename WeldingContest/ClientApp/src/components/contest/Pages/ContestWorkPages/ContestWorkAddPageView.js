import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import CustomDataGrid from '../../sub-components/CustomDataGrid';

export class ContestWorkAddPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnsContest: [
                { field: 'name', headerName: 'Название конкурса'},
                { field: 'dateOfBegin', headerName: 'Дата начала конкурса'},
                { field: 'dateOfEnd', headerName: 'Дата окончания конкурса'},
            ],
            columnsContestant: [
                { field: 'fullName', headerName: 'ФИО'},
                { field: 'rfid', headerName: 'RFID' },
                { field: 'qr', headerName: 'QR' },
                { field: 'company', headerName: 'Компания'},
            ],
            columnsNomination: [
                { field: 'title', headerName: 'Название номинации'},
                { field: 'size', headerName: 'Размер образца'},
                { field: 'thickness', headerName: 'Толщина образца'},
                { field: 'material', headerName: 'Материал образца'},
                { field: 'weldingType', headerName: 'Тип сварки'},
            ],
        }
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Название конкурса</Form.Label>
                        <Stack direction="row" spacing={2}>
                            <Form.Control disabled value={this.props.contest.name} required/>
                            <Button onClick={this.props.handleOpen} name="contestAnchor">
                                Выбрать
                            </Button>
                            <Popover
                                open={this.props.contestAnchorOpen}
                                anchorEl={this.props.contestAnchor}
                                onClose={this.props.handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <CustomDataGrid
                                    columns={this.state.columnsContest}
                                    rows={this.props.contests}
                                    handleSelect={this.props.handleSelectContest}
                                />
                            </Popover>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Номер конкурсанта</Form.Label>
                        <Stack direction="row" spacing={2}>
                            <Form.Control disabled value={this.props.contestant.rfid} required/>
                            <Button onClick={this.props.handleOpen} name="contestantAnchor">
                                Выбрать
                            </Button>
                            <Popover
                                open={this.props.contestantAnchorOpen}
                                anchorEl={this.props.contestantAnchor}
                                onClose={this.props.handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <CustomDataGrid
                                    columns={this.state.columnsContestant}
                                    rows={this.props.contestants}
                                    handleSelect={this.props.handleSelectContestant}
                                />
                            </Popover>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Название номинации</Form.Label>
                        <Stack direction="row" spacing={2}>
                            <Form.Control disabled value={this.props.nomination.title} required/>
                            <Button onClick={this.props.handleOpen} name="nominationAnchor">
                                Выбрать
                            </Button>
                            <Popover
                                open={this.props.nominationAnchorOpen}
                                anchorEl={this.props.nominationAnchor}
                                onClose={this.props.handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <CustomDataGrid
                                    columns={this.state.columnsNomination}
                                    rows={this.props.nominations}
                                    handleSelect={this.props.handleSelectNomination}
                                />
                            </Popover>
                        </Stack>
                    </Form.Group>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button href="/ContestWorks">
                            Назад к списку конкурсных работ
                            </Button>
                    <Button type="submit">
                        Добавить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}