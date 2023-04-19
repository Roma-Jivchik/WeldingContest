import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import { AddFileComponent } from '../../../sub-components/AddFileComponent';

export class RGMResultAddTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <Stack direction="column">
                        <Stack direction="row" spacing={2}>
                            <Stack direction="column">
                                <Form.Group>
                                    <Form.Label className={this.props.defectsGroupCount != 0 ? "check" : ''}>
                                        Группа дефектов с наибольшим размером отдельного дефекта в ней &lt; 1мм (-3 балла)
                                    </Form.Label>
                                    <Form.Control type="number" name="defectsGroupCount" value={this.props.defectsGroupCount} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={this.props.defectsBetween1n4mmCount != 0 ? "check" : ''}>
                                        1мм &lt; ДЕФЕКТ &lt;= 4мм (-3 балла)
                                    </Form.Label>
                                    <Form.Control type="number" name="defectsBetween1n4mmCount" value={this.props.defectsBetween1n4mmCount} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={this.props.defectsBetween4n15mmCount != 0 ? "check" : ''}>
                                        4мм &lt; ДЕФЕКТ &lt;= 15мм (-5 баллов)
                                    </Form.Label>
                                    <Form.Control type="number" name="defectsBetween4n15mmCount" value={this.props.defectsBetween4n15mmCount} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={this.props.defectsBetween15n40mmCount != 0 ? "check" : ''}>
                                        15мм &lt; ДЕФЕКТ &lt;= 40мм (-8 баллов)
                                    </Form.Label>
                                    <Form.Control type="number" name="defectsBetween15n40mmCount" value={this.props.defectsBetween15n40mmCount} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={this.props.defectsOver40mmCount != 0 ? "check" : ''}>
                                        Дефект &gt; 40мм (-13 баллов)
                                    </Form.Label>
                                    <Form.Control type="number" name="defectsOver40mmCount" value={this.props.defectsOver40mmCount} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={this.props.nonFusionsCount != 0 ? "check" : ''}>
                                        Несплавления длиной &gt; 7мм (-15 баллов)
                                    </Form.Label>
                                    <Form.Control type="number" name="nonFusionsCount" value={this.props.nonFusionsCount} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={this.props.lackOfPenetrationOver25Count != 0 ? "check" : ''}>
                                        Непровары с глубиной &gt; 25% (-15 баллов)
                                    </Form.Label>
                                    <Form.Control type="number" name="lackOfPenetrationOver25Count" value={this.props.lackOfPenetrationOver25Count} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                            </Stack>
                            <Stack direction="column">
                                <Form.Group>
                                    <Form.Label className={this.props.poresAndSludgeCount != 0 ? "check" : ''}>
                                        Поры, шлаки
                                    </Form.Label>
                                    <Form.Control type="number" name="poresAndSludgeCount" value={this.props.poresAndSludgeCount} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={this.props.lackOfPenetrationCount != 0 ? "check" : ''}>
                                        Непровар в корне шва, между валиками, по боковой стороне
                                    </Form.Label>
                                    <Form.Control type="number" name="lackOfPenetrationCount" value={this.props.lackOfPenetrationCount} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className={this.props.rootConcavityCount != 0 ? "check" : ''}>
                                        Вогнутость корня шва
                                    </Form.Label>
                                    <Form.Control type="number" name="rootConcavityCount" value={this.props.rootConcavityCount} onChange={this.props.handleChangeInput} required />
                                </Form.Group>
                            </Stack>
                        </Stack>
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
                    </Stack>
                    <AddFileComponent handleFile={this.props.handleFileFirst} />
                    {this.props.contestWork.nomination.sampleType == "Пластина" ? null : <AddFileComponent handleFile={this.props.handleFileSecond} />}
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