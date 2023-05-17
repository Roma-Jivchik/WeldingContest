import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

import '../../../stylesheets/Input.css';

export class MechanicalTestResultAddTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <Form.Group>
                        <Form.Label className={this.props.destructionWeldLessStrength != 0 ? "check" : ''}>
                            Разрушение по сварному шву с разрушающей нагрузкой меньшей предела прочности арматуры (-30 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="destructionWeldLessStrength" value={this.props.destructionWeldLessStrength} onChange={ this.props.handleChangeInput} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.destructionWeldEqualsStrength != 0 ? "check" : ''}>
                            Разрушение по сварному шву с разрушающей нагрузкой равной пределу прочности арматуры (-20 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="destructionWeldEqualsStrength" value={this.props.destructionWeldEqualsStrength} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.destructionHeatAffectedLessStrength != 0 ? "check" : ''}>
                            Разрушение в зоне термического влияния с разрушающей нагрузкой меньшей предела прочности арматуры (-30 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="destructionHeatAffectedLessStrength" value={this.props.destructionHeatAffectedLessStrength} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.destructionHeatAffectedEqualsStrength != 0 ? "check" : ''}>
                            Разрушение в зоне термического влияния с разрушающей нагрузкой равной пределу прочности арматуры (-10 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="destructionHeatAffectedEqualsStrength" value={this.props.destructionHeatAffectedEqualsStrength} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.destructionBaseMetalCount != 0 ? "check" : ''}>
                            Разрушение по основному металлу с разрушающей нагрузкой равной или выше предела прочности арматуры
                        </Form.Label>
                        <Form.Control type="number" name="destructionBaseMetalCount" value={this.props.destructionBaseMetalCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Примечание</Form.Label>
                        <Form.Control name="notes" value={this.props.notes} onChange={this.props.handleChangeInput} />
                    </Form.Group>
                    <Stack direction="row" spacing={2}>
                        <Form.Group>
                            <Form.Label>Итоговое количество баллов (макс. 30 баллов)</Form.Label>
                            <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Количество штрафных баллов</Form.Label>
                            <Form.Control disabled type="number" name="penaltyMark" value={this.props.penaltyMark} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button style={{ margin: "10px 10px" }} type="submit">
                        Добавить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}