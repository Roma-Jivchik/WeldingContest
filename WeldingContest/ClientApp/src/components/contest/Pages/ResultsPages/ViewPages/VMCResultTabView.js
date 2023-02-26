import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class VMCResultTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form>
                    <fieldset disabled>
                        <Form.Group>
                            <Form.Label>Наличие непровара или несплавления длиной до 10 мм (5 баллов)</Form.Label>
                            <Form.Control type="number" name="lackOfPenetrationUpTo10mmCount" value={this.props.lackOfPenetrationUpTo10mmCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Наличие непровара или несплавления длиной свыше 10 до 20 мм (10 баллов)</Form.Label>
                            <Form.Control type="number" name="lackOfPenetrationFrom10mmTo20mmCount" value={this.props.lackOfPenetrationFrom10mmTo20mmCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Наличие непровара или несплавления длиной свыше 20 мм (20 баллов)</Form.Label>
                            <Form.Control type="number" name="lackOfPenetrationFrom20mmCount" value={this.props.lackOfPenetrationFrom20mmCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Смещение кромок</Form.Label>
                            <Form.Control type="number" name="edgeOffsetCount" value={this.props.edgeOffsetCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Подрез длиной до 10 мм (3 балла)</Form.Label>
                            <Form.Control type="number" name="undercutUpTo10mmCount" value={this.props.undercutUpTo10mmCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Подрез длиной более 10 мм (5 баллов)</Form.Label>
                            <Form.Control type="number" name="undercutFrom20mmCount" value={this.props.undercutFrom20mmCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Устранение подрезов шлифованием (утонение металла) (5 баллов)</Form.Label>
                            <Form.Control type="number" name="undercutRemovalCount" value={this.props.undercutRemovalCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Утяжина (3 балла)</Form.Label>
                            <Form.Control type="number" name="sinkingCount" value={this.props.sinkingCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Превышение проплава (3 балла)</Form.Label>
                            <Form.Control type="number" name="excessPenetrationCount" value={this.props.excessPenetrationCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>За каждый 1,0 мм превышения значения ширины шва (3 балла)</Form.Label>
                            <Form.Control type="number" name="excessSeamWidthCount" value={this.props.excessSeamWidthCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>За каждый 1,0 мм превышение выпуклости шва (5 баллов)</Form.Label>
                            <Form.Control type="number" name="excessSeamConvexityCount" value={this.props.excessSeamConvexityCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>За превышение чешуйчатости шва более 1,0 мм (3 балла)</Form.Label>
                            <Form.Control type="number" name="excessSeamScalingCount" value={this.props.excessSeamScalingCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>За неплавный переход от шва к основному металлу (10 баллов)</Form.Label>
                            <Form.Control type="number" name="roughTransitionCount" value={this.props.roughTransitionCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>За другие замечания (поры, шлаки, отсутствие зачистки ОШЗ, не удаление шлака с корня шва, случайная дуга и др.) (3 балла за каждое замечание)</Form.Label>
                            <Form.Control type="number" name="otherWarningsCount" value={this.props.otherWarningsCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Геометрия сварного шва (отсутствие прямолинейности шва) (5 баллов)</Form.Label>
                            <Form.Control type="number" name="seamGeometryCount" value={this.props.seamGeometryCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ЗСмещение продольных швов труб на расстояние менее 15 мм (5 баллов)</Form.Label>
                            <Form.Control type="number" name="pipeSeamsDisplacement" value={this.props.pipeSeamsDisplacement} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Примечание</Form.Label>
                            <Form.Control name="notes" value={this.props.notes} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Итоговое количество баллов</Form.Label>
                            <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark} />
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