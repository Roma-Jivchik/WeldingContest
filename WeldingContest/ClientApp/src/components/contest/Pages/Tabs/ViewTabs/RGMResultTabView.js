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
                    <Stack direction="row" spacing={2}>
                        <Form.Group>
                            <Form.Label>Итоговое количество баллов (макс. 30 баллов)</Form.Label>
                            <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Количество штрафных баллов</Form.Label>
                            <Form.Control disabled type="number" name="penaltyMark" value={this.props.penaltyMark}/>
                        </Form.Group>
                    </Stack>
                    <img
                        style={{
                            width: "1000px",
                            height: "700px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "grid"
                        }}
                        alt="Темплейт"
                        src={`/Фото/${this.props.contestWork.contest.name}/${this.props.contestWork.nomination.title}/${this.props.contestWork.contestant.rfid}/Рентген_${this.props.contestWork.contestant.rfid}_1.jpg`}
                    />
                    <img
                        hidden={this.props.isHidden}
                        style={{
                            width: "1000px",
                            height: "700px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "grid"
                        }}
                        src={`/Фото/${this.props.contestWork.contest.name}/${this.props.contestWork.nomination.title}/${this.props.contestWork.contestant.rfid}/Рентген_${this.props.contestWork.contestant.rfid}_2.jpg`}
                        onError={ this.props.hideImage}
                    />
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="danger" style={{ margin: "10px 10px" }} onClick={ this.props.handleDelete}>
                        Удалить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}