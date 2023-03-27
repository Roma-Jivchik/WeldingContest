import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomDataGrid from '../../sub-components/CustomDataGrid';
import { ContestantPageView } from './ContestantPageView';

export class ContestantPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contestant: {},
            contestWorks: [],
            fullName: "",
            rfid: "",
            qr: "",
            company: "",
            isUpdating: false,
            validated: false,
            loading: true,
        };

        this.clearState = this.clearState.bind(this);
        this.getObjectFromController = this.getObjectFromController.bind(this);
        this.putObjectToController = this.putObjectToController.bind(this);
        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectContestWork = this.handleSelectContestWork.bind(this);
    }

    clearState() {
        this.setState({
            fullName: this.state.contestant.fullName,
            rfid: this.state.contestant.rfid,
            qr: this.state.contestant.qr,
            company: this.state.contestant.company,
            isUpdating: false,
            validated: false,
        });
    }

    componentDidMount() {
        this.props.changePageTitle("Конкурсант");
        this.getObjectFromController(this.props.id);
    }

    async getObjectFromController(id) {
        const response = await fetch(`contestant/get-by-id?id=${id}`);
        const data = await response.json();

        let contestWorks = data.contestWorks;

        contestWorks.forEach(contestWork => {
            fetch(`contestWork/get-position?id=${contestWork.id}`)
                .then(response => response.json())
                .then(data => contestWork.position = data);
        })

        this.setState({
            contestant: data,
            contestWorks: contestWorks,
            fullName: data.fullName,
            rfid: data.rfid,
            qr: data.qr,
            company: data.company,
        },
            () => {
                setTimeout(
                    () => {
                        this.setState({ loading: false })
                    }, 1000)
            });
    }

    async putObjectToController(object) {
        const response = await fetch(`contestant/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);

        this.setState({ isUpdating: false });
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`contestant/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        if (!this.state.loading) {
            return (
                <ContestantPageView
                    contestant={this.state.contestant}
                    contestWorks={this.state.contestWorks}
                    fullName={this.state.fullName}
                    rfid={this.state.rfid}
                    qr={this.state.qr}
                    company={this.state.company}
                    isUpdating={this.state.isUpdating}
                    validated={this.state.validated}
                    handleChangeInput={this.handleChangeInput}
                    handleUpdate={this.handleUpdate}
                    handleDelete={this.handleDelete}
                    handleCancel={this.handleCancel}
                    handleSubmit={this.handleSubmit}
                    handleSelectContestWork={this.handleSelectContestWork}
                />
            );
        }
    }

    handleSubmit() {
        event.preventDefault();
        let object = {
            ID: this.state.contestant.id,
            FullName: this.state.fullName,
            RFID: this.state.rfid,
            QR: this.state.qr,
            Company: this.state.company
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
        if (confirm("Вы действительно хотите удалить данного конкурсанта?")) {
            this.deleteObjectFromController(this.state.contestant.id);
            setTimeout(() => { window.location = ('/Contestants') }, 1000);
        }
    }

    handleCancel() {
        this.setState({ isUpdating: false });
        this.clearState();
    }

    handleChangeInput() {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSelectContestWork(contestWork) {
        window.location = (`/ContestWorks/ContestWork/${contestWork.id}`);
    }
}