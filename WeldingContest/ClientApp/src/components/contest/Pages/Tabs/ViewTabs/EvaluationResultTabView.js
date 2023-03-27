import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class EvaluationResultTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form>
                    <fieldset disabled>
                        <Form.Group>
                            <Form.Label>Результат оценки сборки и сварки (макс. 30 баллов)</Form.Label>
                            <Form.Control type="number" name="assemblyKSSMark" value={this.props.assemblyKSSMark} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Результат оценки соблюдения правил охраны труда (макс. 10 баллов)</Form.Label>
                            <Form.Control type="number" name="safetyMark" value={this.props.safetyMark} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Результат оценки времени сборки и сварки (макс. 10 баллов)</Form.Label>
                            <Form.Control type="number" name="weldingTimeMark" value={this.props.weldingTimeMark} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Результат оценки расхода сварочных материалов (макс. 10 баллов)</Form.Label>
                            <Form.Control type="number" name="consumptionWeldingMaterialsMark" value={this.props.consumptionWeldingMaterialsMark} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Результат оценки по визуальному и измерительному контролю (макс. 50 баллов)</Form.Label>
                            <Form.Control type="number" name="vmcMark" value={this.props.vmcMark} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Результат оценки по радиографическому контролю (макс. 30 баллов)</Form.Label>
                            <Form.Control type="number" name="rgmMark" value={this.props.rgmMark} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Результат оценки теоретических знаний (макс. 20 баллов)</Form.Label>
                            <Form.Control type="number" name="theoreticalMark" value={this.props.theoreticalMark} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Общий результат</Form.Label>
                            <Form.Control type="number" name="overallMark" value={this.props.overallMark} />
                        </Form.Group>
                    </fieldset>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="danger" style={{ margin: "10px 10px" }} onClick={this.props.handleDelete}>
                            Удалить
                        </Button>
                    </Stack>
                </Form>
            </>
        );
    }
}