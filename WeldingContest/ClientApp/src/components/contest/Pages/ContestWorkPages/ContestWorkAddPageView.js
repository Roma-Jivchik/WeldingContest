import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import { ContestMainPage } from '../ContestPages/ContestMainPage';
import { ContestantMainPage } from '../ContestantPages/ContestantMainPage';
import { NominationMainPage } from '../NominationPages/NominationMainPage';

export class ContestWorkAddPageView extends Component {
    constructor(props) {
        super(props);
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
                                onClose={this.props.handleCloseContest}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal:'right'
                                }}
                                PaperProps={{
                                    style: {
                                        width: 500,
                                    },
                                }}
                            >
                                <ContestMainPage
                                    isAdding={false}
                                    changePageTitle={() => { console.log("1") }}
                                    handleSelect={ this.props.handleSelectContest}
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
                                onClose={this.props.handleCloseContestant}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal:'right'
                                }}
                            >
                                <ContestantMainPage
                                    isAdding={false}
                                    changePageTitle={() => { console.log("1") }}
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
                                onClose={this.props.handleCloseNomination}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal:'right'
                                }}
                                PaperProps={{
                                    style: {
                                        width: 500,
                                    },
                                }}
                            >
                                <NominationMainPage
                                    isAdding={false}
                                    changePageTitle={() => { console.log("1")}}
                                    handleSelect={this.props.handleSelectNomination}
                                />
                            </Popover>
                        </Stack>
                    </Form.Group>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="outline-secondary" style={{ margin: "10px 10px" }} href="/ContestWorks">
                            Назад к списку конкурсных работ
                            </Button>
                        <Button style={{ margin: "10px 10px" }} type="submit">
                        Добавить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}