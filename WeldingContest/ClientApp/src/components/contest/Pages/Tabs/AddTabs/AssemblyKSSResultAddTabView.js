import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

import '../../../stylesheets/Input.css';

export class AssemblyKSSResultAddTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Фактическая величина зазора
                        </Form.Label>
                        <Form.Control type="number" name="gapSize" value={this.props.gapSize} onChange={ this.props.handleChangeInput} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.unfinishedEdgesCount != 0 ? "check" : ''}>
                            Незачищенные кромки перед сваркой (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="unfinishedEdgesCount" value={this.props.unfinishedEdgesCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.wpsNumberTacksChanges != 0 ? "check" : ''}>
                            За изменение количества прихваток, указанных в WPS (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="wpsNumberTacksChanges" value={this.props.wpsNumberTacksChanges} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.seamsUncleaningCount != 0 ? "check" : ''}>
                            Невыполнение послойной зачистки швов (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="seamsUncleaningCount" value={this.props.seamsUncleaningCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.heatAffectedSeamZonesUncleaningCount != 0 ? "check" : ''}>
                            За незачищенную околошовную зону сварного шва (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="heatAffectedSeamZonesUncleaningCount" value={this.props.heatAffectedSeamZonesUncleaningCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.grinderCleaningCount != 0 ? "check" : ''}>
                            Зачистка выпуклости шва (облицовочного) шлифмашинокй запрещается (-10 баллов за каждое место зачистки)
                        </Form.Label>
                        <Form.Control type="number" name="grinderCleaningCount" value={this.props.grinderCleaningCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.deviationFromWeldingModesCount != 0 ? "check" : ''}>
                            Отступление от режимов сварки более чем на 10% от нормативных значений (-5 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="deviationFromWeldingModesCount" value={this.props.deviationFromWeldingModesCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.sampleRepositioningCount != 0 ? "check" : ''}>
                            За изменение положение образца при сварке, количества слоёв (-20 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="sampleRepositioningCount" value={this.props.sampleRepositioningCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={this.props.personalWeldingToolsUsed != 0 ? "check" : ''}>
                            За использование личных (не предоставленных организатором) приспособлений и оснастки для сборки и сварки (-20 баллов)
                        </Form.Label>
                        <Form.Control type="number" name="personalWeldingToolsUsed" value={this.props.personalWeldingToolsUsed} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Примечание</Form.Label>
                        <Form.Control name="notes" value={this.props.notes} onChange={this.props.handleChangeInput}/>
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