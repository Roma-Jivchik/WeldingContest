import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

import '../../../stylesheets/Input.css';

export class ArmatureVMCResultTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form>
                    <fieldset disabled>
                        <Form.Group>
                            <Form.Label className={this.props.craterPresenceCount != 0 ? "check" : ''}>
                                Наличие кратера в конце сварного шва (-5 баллов за каждый)
                            </Form.Label>
                            <Form.Control type="number" name="craterPresenceCount" value={this.props.craterPresenceCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.insufficientSeamLengthCount != 0 ? "check" : ''}>
                                Недостаточная протяженность сварного шва (-5 баллов за каждый)
                            </Form.Label>
                            <Form.Control type="number" name="insufficientSeamLengthCount" value={this.props.insufficientSeamLengthCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.undercutUpTo5mmCount != 0 ? "check" : ''}>
                                Подрез длиной до 5 мм (основного сечения арматуры) (-3 балла за каждый)
                            </Form.Label>
                            <Form.Control type="number" name="undercutUpTo5mmCount" value={this.props.undercutUpTo5mmCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.undercutFrom5mmCount != 0 ? "check" : ''}>
                                Подрез длиной 5 мм и более (основного сечения арматуры) (-5 баллов за каждый)
                            </Form.Label>
                            <Form.Control type="number" name="undercutFrom5mmCount" value={this.props.undercutFrom5mmCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.contiuousUndercutCount != 0 ? "check" : ''}>
                                Непрерывистый подрез (основного сечения арматуры) (-10 баллов за каждый)
                            </Form.Label>
                            <Form.Control type="number" name="contiuousUndercutCount" value={this.props.contiuousUndercutCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.excessSeamWidthCount != 0 ? "check" : ''}>
                                За каждый 1,0 мм недостаточного значения ширины сварного шва (-3 балла)
                            </Form.Label>
                            <Form.Control type="number" name="excessSeamWidthCount" value={this.props.excessSeamWidthCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.leakCount != 0 ? "check" : ''}>
                                Натёк, наплыв (-5 баллов за каждый)
                            </Form.Label>
                            <Form.Control type="number" name="leakCount" value={this.props.leakCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.roughTransitionCount != 0 ? "check" : ''}>
                                За неплавный переход от шва к основному металлу (-10 баллов)
                            </Form.Label>
                            <Form.Control type="number" name="roughTransitionCount" value={this.props.roughTransitionCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.poresAndSludgeCount != 0 ? "check" : ''}>
                                Поры, шлаки (-3 балла)
                            </Form.Label>
                            <Form.Control type="number" name="poresAndSludgeCount" value={this.props.poresAndSludgeCount} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.otherWarningsCount != 0 ? "check" : ''}>
                                За другие замечания (отсутствие зачистки ОШЗ, не удаление шлака с корня шва, случайная дуга и др.) (-3 балла за каждое замечание)
                            </Form.Label>
                            <Form.Control type="number" name="otherWarningsCount" value={this.props.otherWarningsCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className={this.props.seamGeometryCount != 0 ? "check" : ''}>
                                Геометрия сварного шва (отсутствие прямолинейности шва) (-5 баллов)
                            </Form.Label>
                            <Form.Control type="number" name="seamGeometryCount" value={this.props.seamGeometryCount}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Примечание</Form.Label>
                            <Form.Control name="notes" value={this.props.notes} onChange={this.props.handleChangeInput} />
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