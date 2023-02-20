import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class RGMResultTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form style={{display: "grid",justifyContent:"center"}}>
                    <Form.Group>
                        <Form.Label>Итоговое количество баллов</Form.Label>
                        <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark}/>
                    </Form.Group>
                    <img
                        style={{marginTop:"10px",marginBottom:"10px",display:"grid"}}
                        alt="Темплейт"
                        src={`/Фото/${this.props.contestWork.contest.name}/${this.props.contestWork.nomination.title}/${this.props.contestWork.contestant.rfid}/Рентген_${this.props.contestWork.contestant.rfid}.jpg`}
                    />
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button onClick={ this.props.handleDelete}>
                        Удалить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}