﻿import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

import '../../../stylesheets/Input.css';

export class ConsumptionWeldingMaterialsResultTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form>
                    <fieldset disabled>
                    <Form.Group>
                            <Form.Label className={this.props.consumbleMaterialAmount != 0 ? "check" : ''}>
                                Количество дополнительных сварочных материалов (норма: 111(труба) - 5 электродов, 141 - 3 прутка, B-2 (111) - 12 электродов) (-1 балл за каждый доп. материал)
                            </Form.Label>
                        <Form.Control type="number" name="consumbleMaterialAmount" value={this.props.consumbleMaterialAmount}/>
                    </Form.Group>
                        <Stack direction="row" spacing={2}>
                            <Form.Group>
                                <Form.Label>Итоговое количество баллов (макс. 10 баллов)</Form.Label>
                                <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Количество штрафных баллов</Form.Label>
                                <Form.Control disabled type="number" name="penaltyMark" value={this.props.penaltyMark}/>
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