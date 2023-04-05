import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

import '../../../stylesheets/Input.css';

export class ArmatureAssemblyKSSResultTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form>
                    <fieldset disabled>
                    <Form.Group>
                        <Form.Label className={this.props.sampleRepositioningCount != 0 ? "check" : ''}>
                            За изменение положение образца при сварке, количества слоёв (-10 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="sampleRepositioningCount" value={this.props.sampleRepositioningCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.seamsUncleaningCount != 0 ? "check" : ''}>
                            Невыполнение послойной зачистки швов (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="seamsUncleaningCount" value={this.props.seamsUncleaningCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.tackDefectsCount != 0 ? "check" : ''}>
                            Дефекты прихваток, место установки прихватки (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="tackDefectsCount" value={this.props.tackDefectsCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.numberTacksChanges != 0 ? "check" : ''}>
                            Нарушение количества прихваток (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="numberTacksChanges" value={this.props.numberTacksChanges}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.unfinishedEdgesCount != 0 ? "check" : ''}>
                            Незачищенные кромки перед сваркой (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="unfinishedEdgesCount" value={this.props.unfinishedEdgesCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.heatAffectedSeamZonesUncleaningCount != 0 ? "check" : ''}>
                            За незачищенную околошовную зону сварного шва (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="heatAffectedSeamZonesUncleaningCount" value={this.props.heatAffectedSeamZonesUncleaningCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.grinderCleaningCount != 0 ? "check" : ''}>
                            Зачистка выпуклости шва (облицовочного) шлифмашинокй запрещается (-10 баллов за каждое место зачистки)
                        </Form.Label>
                        <Form.Control type="number" name="grinderCleaningCount" value={this.props.grinderCleaningCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.deviationFromWeldingModesCount != 0 ? "check" : ''}>
                            Отступление от режимов сварки более чем на 10% от нормативных значений (-3 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="deviationFromWeldingModesCount" value={this.props.deviationFromWeldingModesCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.otherWarningsCount != 0 ? "check" : ''}>
                            Другие нарушения (за каждое -3 балла)
                        </Form.Label>
                        <Form.Control type="number" name="otherWarningsCount" value={this.props.otherWarningsCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.weldingTechnologyGeneralViolationsCount != 0 ? "check" : ''}>
                            Общие нарушения технологии сварки (-20 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="weldingTechnologyGeneralViolationsCount" value={this.props.weldingTechnologyGeneralViolationsCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Примечание</Form.Label>
                        <Form.Control name="notes" value={this.props.notes}/>
                    </Form.Group>
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