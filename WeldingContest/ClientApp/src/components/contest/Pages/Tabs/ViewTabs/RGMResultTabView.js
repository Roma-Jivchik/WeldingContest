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
                <Form style={{ display: "grid", justifyContent: "center" }}>
                    <Stack direction="column">
                        <fieldset disabled>
                            <Stack direction="row" spacing={2}>
                                <Stack direction="column">
                                    <Form.Group>
                                        <Form.Label className={this.props.defectsGroupCount != 0 ? "check" : ''}>
                                            Группа дефектов с наибольшим размером отдельного дефекта в ней &lt; 1мм (-3 балла)
                                        </Form.Label>
                                        <Form.Control type="number" name="defectsGroupCount" value={this.props.defectsGroupCount} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={this.props.defectsBetween1n4mmCount != 0 ? "check" : ''}>
                                            1мм &lt; ДЕФЕКТ &lt;= 4мм (-3 балла)
                                        </Form.Label>
                                        <Form.Control type="number" name="defectsBetween1n4mmCount" value={this.props.defectsBetween1n4mmCount} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={this.props.defectsBetween4n15mmCount != 0 ? "check" : ''}>
                                            4мм &lt; ДЕФЕКТ &lt;= 15мм (-5 баллов)
                                        </Form.Label>
                                        <Form.Control type="number" name="defectsBetween4n15mmCount" value={this.props.defectsBetween4n15mmCount} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={this.props.defectsBetween15n40mmCount != 0 ? "check" : ''}>
                                            15мм &lt; ДЕФЕКТ &lt;= 40мм (-8 баллов)
                                        </Form.Label>
                                        <Form.Control type="number" name="defectsBetween15n40mmCount" value={this.props.defectsBetween15n40mmCount} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={this.props.defectsOver40mmCount != 0 ? "check" : ''}>
                                            Дефект &gt; 40мм (-13 баллов)
                                        </Form.Label>
                                        <Form.Control type="number" name="defectsOver40mmCount" value={this.props.defectsOver40mmCount} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={this.props.nonFusionsCount != 0 ? "check" : ''}>
                                            Несплавления длиной &gt; 7мм (-15 баллов)
                                        </Form.Label>
                                        <Form.Control type="number" name="nonFusionsCount" value={this.props.nonFusionsCount} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={this.props.lackOfPenetrationOver25Count != 0 ? "check" : ''}>
                                            Непровары с глубиной &gt; 25% (-15 баллов)
                                        </Form.Label>
                                        <Form.Control type="number" name="lackOfPenetrationOver25Count" value={this.props.lackOfPenetrationOver25Count} />
                                    </Form.Group>
                                </Stack>
                                <Stack direction="column">
                                    <Form.Group>
                                        <Form.Label className={this.props.poresAndSludgeCount != 0 ? "check" : ''}>
                                            Поры, шлаки
                                        </Form.Label>
                                        <Form.Control type="number" name="poresAndSludgeCount" value={this.props.poresAndSludgeCount} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={this.props.lackOfPenetrationCount != 0 ? "check" : ''}>
                                            Непровар в корне шва, между валиками, по боковой стороне
                                        </Form.Label>
                                        <Form.Control type="number" name="lackOfPenetrationCount" value={this.props.lackOfPenetrationCount} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className={this.props.rootConcavityCount != 0 ? "check" : ''}>
                                            Вогнутость корня шва
                                        </Form.Label>
                                        <Form.Control type="number" name="rootConcavityCount" value={this.props.rootConcavityCount} />
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
                                    <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Количество штрафных баллов</Form.Label>
                                    <Form.Control disabled type="number" name="penaltyMark" value={this.props.penaltyMark} />
                                </Form.Group>

                            </Stack>
                        </fieldset>
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
                    {this.props.contestWork.nomination.sampleType == "Пластина" ? null :
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
                            src={`/Фото/${this.props.contestWork.contest.name}/${this.props.contestWork.nomination.title}/${this.props.contestWork.contestant.rfid}/Рентген_${this.props.contestWork.contestant.rfid}_2.jpg`}
                        />}
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