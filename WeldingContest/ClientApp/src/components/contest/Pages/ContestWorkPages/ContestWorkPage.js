import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomDataGrid from '../../sub-components/CustomDataGrid';
import { ContestWorkPageView } from './ContestWorkPageView';

export class ContestWorkPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
            contestWork: {},
            contest: {},
            contestant: {},
            nomination: {},
            contests: [],
            contestants: [],
            nominations: [],
            isUpdating: false,
            validated: false,
            contestAnchorOpen: false,
            contestantAnchorOpen: false,
            nominationAnchorOpen: false,
            contestAnchor: "",
            contestantAnchor: "",
            nominationAnchor: "",
            isAddingProtocol: false,
        };

        this.clearState = this.clearState.bind(this);
        this.getObjectFromController = this.getObjectFromController.bind(this);
        this.getCollectionFromController = this.getCollectionFromController.bind(this);
        this.putObjectToController = this.putObjectToController.bind(this);
        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectContest = this.handleSelectContest.bind(this);
        this.handleSelectContestant = this.handleSelectContestant.bind(this);
        this.handleSelectNomination = this.handleSelectNomination.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.changeFlag = this.changeFlag.bind(this);
        this.checkFolderForPhotos = this.checkFolderForPhotos.bind(this);
        this.deleteFileFromController = this.deleteFileFromController.bind(this);
    }

    async checkFolderForPhotos() {
        const response = await fetch(`/Фото/${this.state.contestWork.contest.name}/${this.state.contestWork.nomination.title}/${this.state.contestWork.contestant.rfid}/Рентген_${this.state.contestWork.contestant.rfid}_1.jpg`);

        if (response.status == 200) {
            console.log("good");
        } else {
            console.log("not good");
        }
    }

    clearState() {
        this.setState({
            contest: this.state.contestWork.contest,
            contestant: this.state.contestWork.contestant,
            nomination: this.state.contestWork.nomination,
            isUpdating: false,
            validated: false,
        });
    }

    componentDidMount() {
        this.props.changePageTitle("Конкурсная работа");
        this.getObjectFromController(this.props.id);
    }

    async getObjectFromController(id) {
        const response = await fetch(`contestwork/get-by-id?id=${id}`);
        const data = await response.json();
        this.setState({
            contestWork: data,
            contest: data.contest,
            contestant: data.contestant,
            nomination: data.nomination,
        }, () => { this.checkFolderForPhotos()});
        console.log(data);
    }

    async getCollectionFromController(controller) {
        const response = await fetch(`${controller}`);
        const data = await response.json();
        this.setState({ [`${controller}s`]: data });
        console.log(data);
    }

    async putObjectToController(object) {
        const response = await fetch(`contestwork/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);

        this.setState({ isUpdating: false });
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`contestwork/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    async deleteFileFromController(filepath) {
        const response = await fetch('file/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filepath)
        });

        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <ContestWorkPageView
                currentTab={this.state.currentTab}
                contestWork={this.state.contestWork}
                contestAnchorOpen={this.state.contestAnchorOpen}
                contestantAnchorOpen={this.state.contestantAnchorOpen}
                nominationAnchorOpen={this.state.nominationAnchorOpen}
                contestAnchor={this.state.contestAnchor}
                contestantAnchor={this.state.contestantAnchor}
                nominationAnchor={this.state.nominationAnchor}
                contests={this.state.contests}
                contestants={this.state.contestants}
                nominations={this.state.nominations}
                contest={this.state.contest}
                contestant={this.state.contestant}
                nomination={this.state.nomination}
                isUpdating={this.state.isUpdating}
                validated={this.state.validated}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                handleCancel={this.handleCancel}
                handleSubmit={this.handleSubmit}
                handleSelectContest={this.handleSelectContest}
                handleSelectContestant={this.handleSelectContestant}
                handleSelectNomination={this.handleSelectNomination}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
                handleChangeTab={this.handleChangeTab}
                isAddingProtocol={this.state.isAddingProtocol}
                changeFlag={ this.changeFlag}
            />
            );
    }

    handleSubmit(event) {
        event.preventDefault();
        let object = {
            ID: this.state.contestWork.id,
            ContestID: this.state.contest.id,
            ContestantID: this.state.contestant.id,
            NominationID: this.state.nomination.id,
        };
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.putObjectToController(object);
        }
    }

    handleUpdate() {
        this.setState({ isUpdating: true });
    }

    handleDelete() {
        if (window.confirm("Вы действительно хотите удалить данную конкурсную работу?")) {
            this.deleteObjectFromController(this.state.contestWork.id);
            this.deleteFileFromController(`wwwroot\\Фото\\${this.state.contestWork.contest.name}\\${this.state.contestWork.nomination.title}\\${this.state.contestWork.contestant.rfid}\\Протокол_${this.state.contestWork.contestant.rfid}.jpg`);

            setTimeout(() => { window.location = ('/ContestWorks') }, 1000);
        }
    }

    handleCancel() {
        this.setState({ isUpdating: false });
        this.clearState();
    }

    handleSelectContest(contest) {
        this.setState({
            contest: contest.row,
            contestAnchorOpen: false,
            contestAnchor: null
        });
    }

    handleSelectContestant(contestant) {
        this.setState({
            contestant: contestant.row,
            contestantAnchorOpen: false,
            contestantAnchor: null
        });
    }

    handleSelectNomination(nomination) {
        this.setState({
            nomination: nomination.row,
            nominationAnchorOpen: false,
            nominationAnchor: null
        });
    }

    handleClose(event) {
        this.setState({
            [event.target.name]: null,
            [`${event.target.name}Open`]: false
        });
    }

    handleOpen(event) {
        this.setState({
            [event.target.name]: event.target,
            [`${event.target.name}Open`]: true
        });
    }

    handleChangeTab(event, newTab) {
        this.setState({ currentTab: newTab });
    }

    changeFlag() {
        this.setState({ isAddingProtocol: true });
    }
}