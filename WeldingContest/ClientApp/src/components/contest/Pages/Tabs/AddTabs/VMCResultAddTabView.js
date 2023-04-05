import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

import '../../../stylesheets/Input.css';

export class VMCResultAddTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <Form.Group>
                        <Form.Label className={this.props.lackOfPenetrationUpTo10mmCount != 0 ? "check" : ''}>
                            Наличие непровара или несплавления длиной до 10 мм (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="lackOfPenetrationUpTo10mmCount" value={this.props.lackOfPenetrationUpTo10mmCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.lackOfPenetrationFrom10mmTo20mmCount != 0 ? "check" : ''}>
                            Наличие непровара или несплавления длиной свыше 10 до 20 мм (-10 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="lackOfPenetrationFrom10mmTo20mmCount" value={this.props.lackOfPenetrationFrom10mmTo20mmCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.lackOfPenetrationFrom20mmCount != 0 ? "check" : ''}>
                            Наличие непровара или несплавления длиной свыше 20 мм (-20 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="lackOfPenetrationFrom20mmCount" value={this.props.lackOfPenetrationFrom20mmCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.edgeOffsetCount != 0 ? "check" : ''}>
                            Смещение кромок (более 0,5 мм) (-3 балла)
                        </Form.Label>
                        <Form.Control type="number" name="edgeOffsetCount" value={this.props.edgeOffsetCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.undercutUpTo10mmCount != 0 ? "check" : ''}>
                            Подрез длиной до 10 мм (-3 балла)
                        </Form.Label>
                        <Form.Control type="number" name="undercutUpTo10mmCount" value={this.props.undercutUpTo10mmCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.undercutFrom20mmCount != 0 ? "check" : ''}>
                            Подрез длиной более 10 мм (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="undercutFrom20mmCount" value={this.props.undercutFrom20mmCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.undercutRemovalCount != 0 ? "check" : ''}>
                            Устранение подрезов шлифованием (утонение металла) (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="undercutRemovalCount" value={this.props.undercutRemovalCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.sinkingCount != 0 ? "check" : ''}>
                            Утяжина (-3 балла)
                        </Form.Label>
                        <Form.Control type="number" name="sinkingCount" value={this.props.sinkingCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.excessPenetrationCount != 0 ? "check" : ''}>
                            Превышение проплава (-3 балла)
                        </Form.Label>
                        <Form.Control type="number" name="excessPenetrationCount" value={this.props.excessPenetrationCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.excessSeamWidthCount != 0 ? "check" : ''}>
                            За каждый 1,0 мм превышения значения ширины шва (-3 балла)
                        </Form.Label>
                        <Form.Control type="number" name="excessSeamWidthCount" value={this.props.excessSeamWidthCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.excessSeamConvexityCount != 0 ? "check" : ''}>
                            За каждый 1,0 мм превышение выпуклости шва (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="excessSeamConvexityCount" value={this.props.excessSeamConvexityCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.excessSeamScalingCount != 0 ? "check" : ''}>
                            За превышение чешуйчатости шва более 1,0 мм (-3 балла)
                        </Form.Label>
                        <Form.Control type="number" name="excessSeamScalingCount" value={this.props.excessSeamScalingCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.roughTransitionCount != 0 ? "check" : ''}>
                            За неплавный переход от шва к основному металлу (-10 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="roughTransitionCount" value={this.props.roughTransitionCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.otherWarningsCount != 0 ? "check" : ''}>
                            За другие замечания (поры, шлаки, отсутствие зачистки ОШЗ, не удаление шлака с корня шва, случайная дуга и др.) (-3 балла за каждое замечание)
                        </Form.Label>
                        <Form.Control type="number" name="otherWarningsCount" value={this.props.otherWarningsCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.seamGeometryCount != 0 ? "check" : ''}>
                            Геометрия сварного шва (отсутствие прямолинейности шва) (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="seamGeometryCount" value={this.props.seamGeometryCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Смещение продольных швов труб на расстояние менее 15 мм (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="pipeSeamsDisplacement" value={this.props.pipeSeamsDisplacement} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Примечание</Form.Label>
                        <Form.Control name="notes" value={this.props.notes} onChange={this.props.handleChangeInput} />
                    </Form.Group>
                    <Stack direction="row" spacing={2}>
                        <Form.Group>
                            <Form.Label>Итоговое количество баллов (макс. 50 баллов)</Form.Label>
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