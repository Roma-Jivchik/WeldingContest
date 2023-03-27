import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

import '../../../stylesheets/Input.css';

export class SafetyResultTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form>
                    <fieldset disabled>
                    <Form.Group>
                            <Form.Label className={this.props.lackOfProtectiveClothesCount != 0 ? "check" : ''}>
                                Отсутствие, неполное наличие защитной одежды (спецодежда, спецобувь, краги) (-3 балла)
                            </Form.Label>
                        <Form.Control type="number" name="lackOfProtectiveClothesCount" value={this.props.lackOfProtectiveClothesCount}/>
                    </Form.Group>
                    <Form.Group>
                            <Form.Label className={this.props.wrongEquipmentUsageCount != 0 ? "check" : ''}>
                                Неправильное применение или неприменение средств защиты (сварочных масок, защитных очков, щитков и т. д.) (-5 баллов за каждое нарушение)
                            </Form.Label>
                        <Form.Control type="number" name="wrongEquipmentUsageCount" value={this.props.wrongEquipmentUsageCount}/>
                    </Form.Group>
                    <Form.Group>
                            <Form.Label className={this.props.machinesUntimelyDeenergizationCount != 0 ? "check" : ''}>
                                Несвоевременное обесточивание электрошлифмашинок (-5 баллов за каждое нарушение)
                            </Form.Label>
                        <Form.Control type="number" name="machinesUntimelyDeenergizationCount" value={this.props.machinesUntimelyDeenergizationCount}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Примечание</Form.Label>
                        <Form.Control name="notes" value={this.props.notes}/>
                    </Form.Group>
                        <Stack direction="row" spacing={2}>
                            <Form.Group>
                                <Form.Label>Итоговое количество баллов (макс. 10 баллов)</Form.Label>
                                <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Количество штрафных баллов</Form.Label>
                                <Form.Control disabled type="number" name="penaltyMark" value={this.props.penaltyMark} />
                            </Form.Group>
                        </Stack>
                        </fieldset>
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