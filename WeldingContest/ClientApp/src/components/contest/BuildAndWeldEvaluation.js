import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AddFileComponent } from './sub-components/AddFileComponent';

export class BuildAndWeldEvaluation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContest: "",
            currentContestWork: "",
            currentContestSample: "",
            currentEvaluationResult: "",
            currentContestant: "",
            imagePreviewUrl: "",
            currentSampleID: "",
            currentResultID: "",
            currentAssemblyKSSResult: "",
            currentOccupationalSafetyResult: "",
            currentWeldTimeResult: "",
            currentConsumptionResult: "",
            currentVMCResult: "",
            currentRCResult: "",
            currentTheoreticalResult: "",
            isActiveContestWorkForm: false,
            isActiveContestWorkTable: false,
            isActiveContestTable: true,
            input1: 0,
            input2: 0,
            input3: 0,
            input4: 0,
            input5: 0,
            input6: 0,
            input7: 0,
            input8: 0,
            input9: 0,
            input10: 0,
            input11: 0,
            input12: 0,
            input13: 0,
            input14: 0,
            input15: 0,
            input16: 0,
            beginTime: "",
            endTime: "",
            overallMark: 0,
            contestWorks: [],
            contests: [],
        };

        this.renderContestTable = this.renderContestTable.bind(this);
        this.renderContestWorkForm = this.renderContestWorkForm.bind(this);
        this.renderContestWorkTable = this.renderContestWorkTable.bind(this);
        this.renderContestSampleForm = this.renderContestSampleForm.bind(this);
        this.renderContestantForm = this.renderContestantForm.bind(this);
        this.renderEvaluationResultForm = this.renderEvaluationResultForm.bind(this);
        this.renderEvaluationResultPage = this.renderEvaluationResultPage.bind(this);
        this.renderOverallEvaluationForm = this.renderOverallEvaluationForm.bind(this);
        this.renderAssemblyKSSForm = this.renderAssemblyKSSForm.bind(this);
        this.renderConsumptionForm = this.renderConsumptionForm.bind(this);
        this.renderOccupationalSafetyForm = this.renderOccupationalSafetyForm.bind(this);
        this.renderRCForm = this.renderRCForm.bind(this);
        this.renderVMCForm = this.renderVMCForm.bind(this);
        this.renderTheoreticalForm = this.renderTheoreticalForm.bind(this);
        this.renderWeldTimeForm = this.renderWeldTimeForm.bind(this);

        this.getContestsDataFromController = this.getContestsDataFromController.bind(this);
        this.getContestWorksDataFromController = this.getContestWorksDataFromController.bind(this);
        this.getContestantFromController = this.getContestantFromController.bind(this);
        this.getPhotoFromController = this.getPhotoFromController.bind(this);
        this.getContestSampleFromController = this.getContestSampleFromController.bind(this);
        this.getResultsFromControllers = this.getResultsFromControllers.bind(this);
        this.postResultToController = this.postResultToController.bind(this);
        this.postEvaluationResultToController = this.postEvaluationResultToController.bind(this);
        this.getEvaluationResultFromController = this.getEvaluationResultFromController.bind(this);
        this.createProtocol = this.createProtocol.bind(this);
        this.createOverallProtocol = this.createOverallProtocol.bind(this);

        this.sortByFieldUp = this.sortByFieldUp.bind(this);
        this.sortByFieldDown = this.sortByFieldDown.bind(this);
        this.sortContestWorksDown = this.sortContestWorksDown.bind(this);
        this.sortContestWorksUp = this.sortContestWorksUp.bind(this);

        this.handleChangeInput1 = this.handleChangeInput1.bind(this);
        this.handleChangeInput2 = this.handleChangeInput2.bind(this);
        this.handleChangeInput3 = this.handleChangeInput3.bind(this);
        this.handleChangeInput4 = this.handleChangeInput4.bind(this);
        this.handleChangeInput5 = this.handleChangeInput5.bind(this);
        this.handleChangeInput6 = this.handleChangeInput6.bind(this);
        this.handleChangeInput7 = this.handleChangeInput7.bind(this);
        this.handleChangeInput8 = this.handleChangeInput8.bind(this);
        this.handleChangeInput9 = this.handleChangeInput9.bind(this);
        this.handleChangeInput10 = this.handleChangeInput10.bind(this);
        this.handleChangeInput11 = this.handleChangeInput11.bind(this);
        this.handleChangeInput12 = this.handleChangeInput12.bind(this);
        this.handleChangeInput13 = this.handleChangeInput12.bind(this);
        this.handleChangeInput14 = this.handleChangeInput12.bind(this);
        this.handleChangeInput15 = this.handleChangeInput12.bind(this);
        this.handleChangeInput16 = this.handleChangeInput12.bind(this);
        this.handleChangeBeginTime = this.handleChangeBeginTime.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);

        this.handleCalculate = this.handleCalculate.bind(this);
        this.calculateOverallMark = this.calculateOverallMark.bind(this);
        this.handleSaveResult = this.handleSaveResult.bind(this);
        this.handleFormProtocol = this.handleFormProtocol.bind(this);
    }

    componentDidMount() {
        this.getContestsDataFromController();
    }

    render() {
        return (
            <>
                {this.renderEvaluationResultPage()}
            </>
        );
    }

    renderEvaluationResultPage() {
        return (
            <>
                {this.renderContestTable()}
                {this.renderContestWorkTable()}
                {this.renderContestWorkForm()}
            </>
        );
    }

    renderEvaluationResultForm() {
        return(
            <Tabs defaultActiveKey="overallResult">
                <Tab size="sm" eventKey="overallResult" title="Общая оценка">
                    {this.renderOverallEvaluationForm()}
                </Tab>
                <Tab size="sm" eventKey="AssemblyKSSResult" title="Оценка технологии сборки и сварки" onEnter={() => { this.handleEnterAssemblyKSSResult() }}>
                    {this.renderAssemblyKSSForm()}
                </Tab>
                <Tab size="sm" eventKey="OccupationalSafetyResult" title="Оценка соблюдения правил охраны труда" onEnter={() => { this.handleEnterOccupationalSafetyResult() }}>
                    {this.renderOccupationalSafetyForm()}
                </Tab>
                <Tab size="sm" eventKey="WeldTimeResult" title="Оценка времени сборки и сварки" onEnter={() => { this.handleEnterWeldTimeResult() }}>
                    {this.renderWeldTimeForm()}
                </Tab>
                <Tab size="sm" eventKey="ConsumptionResult" title="Оценка расхода сварочных материалов" onEnter={() => { this.handleEnterConsumptionResult() }}>
                    {this.renderConsumptionForm()}
                </Tab>
                <Tab size="sm" eventKey="VMCResult" title="Оценка по визуальному и измерительному контролю" onEnter={() => { this.handleEnterVMCResult() }}>
                    {this.renderVMCForm()}
                </Tab>
                <Tab size="sm" eventKey="RCResult" title="Оценка по рентгенографированию" onEnter={() => {this.handleEnterRCResult()}}>
                    {this.renderRCForm()}
                </Tab>
                <Tab size="sm" eventKey="TheoreticalResult" title="Оценка теоретических знаний" onEnter={() => { this.handleEnterTheoreticalResult() }}>
                    {this.renderTheoreticalForm()}
                </Tab>
            </Tabs>
        );
    }

    renderContestTable() {
        return (
            <Table striped bordered hover hidden={!this.state.isActiveContestTable}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Название конкурса</th>
                        <th>Дата начала</th>
                        <th>Дата окончания</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.contests.map((contest, index) =>
                        <tr key={contest.id} onClick={() => { this.handleChooseContest(contest) }}>
                            <td>{ index + 1}</td>
                            <td>{contest.name}</td>
                            <td>{contest.dateOfBegin}</td>
                            <td>{contest.dateOfEnd}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    renderContestWorkTable() {
        return (
            <div hidden={!this.state.isActiveContestWorkTable}>
                <Row>
                    <Col>
                        <Button onClick={(e) => { this.handleBackContest(e) }}>
                            Назад к списку конкурсов
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={(e) => { this.handleFormOverallProtocol(e) }}>
                            Сформировать общий протокол
                            </Button>
                        </Col>
                    <Col>
                        <DropdownButton title="Сортировка">
                            <Dropdown.Item onClick={() => { this.sortContestWorksUp("evaluationResultMark") }}>По релевантности(возрастание)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.sortContestWorksDown("evaluationResultMark") }}>По релевантности(убывание)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.sortContestWorksUp("sampleRFID") }}>По RFID образца(возрастание)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.sortContestWorksDown("sampleRFID") }}>По RFID образца(убывание)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.sortContestWorksUp("sampleQR") }}>По QR образца(возрастание)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.sortContestWorksDown("sampleQR") }}>По QR образца(убывание)</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название конкурса</th>
                            <th>RFID образца</th>
                            <th>QR образца</th>
                            <th>Общая оценка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contestWorks.map((contestWork, index) =>
                            <tr key={contestWork.id} onClick={() => { this.handleChooseContestWork(contestWork) }}>
                                <td>{ index + 1}</td>
                                <td>{contestWork.contestName}</td>
                                <td>{contestWork.sampleRFID}</td>
                                <td>{contestWork.sampleQR}</td>
                                <td>{contestWork.evaluationResultMark}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }

    renderContestWorkForm() {
        return (
            <Tabs hidden={!this.state.isActiveContestWorkForm}>
                <Tab size="sm" eventKey="contestWork" title="Конкурсная работа" onEnter={() => { this.getContestWorkFromController() }}>
                    <Form hidden={!this.state.isActiveContestWorkForm}>
                        <fieldset disabled={true}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">Название конкурса</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.contestName} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">Ссылка на файл с результатами тестирования</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.exerciseLink} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">Результат оценки конкурсной работы</Form.Label>
                                        <Form.Control size="sm" type="number" placeholder={this.state.currentContestWork.evaluationResultMark} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">RFID образца</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.sampleRFID} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">QR образца</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.sampleQR} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </fieldset>
                            <Row>
                                <Col>
                                    <Button size="sm" variant="primary" type="submit" onClick={(e) => { this.handleBackContestWorks(e) }}>
                                        Назад к списку
                                    </Button>
                                </Col>
                            </Row>
                    </Form>
                </Tab>
                <Tab size="sm" eventKey="contestSample" title="Образец" disabled={!this.state.isActiveContestWorkForm}>
                    {this.renderContestSampleForm()}
                </Tab>
                <Tab size="sm" eventKey="contestant" title="Конкурсант" disabled={!this.state.isActiveContestWorkForm}>
                    { this.renderContestantForm()}
                    </Tab>
                <Tab size="sm" eventKey="evaluationResult" title="Оценка выполнения" disabled={!this.state.isActiveContestWorkForm}>
                    {this.renderEvaluationResultForm()}
                </Tab>
            </Tabs>
        );
    }

    renderContestantForm() {
        return (
            <div>
                <Form>
                    <fieldset disabled>
                        <Row>
                            <Col>
                                <fieldset>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">ФИО</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestant.fullName} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">RFID</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestant.rfid} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">QR</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestant.qr} />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                            <Col>
                                <fieldset>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">Компания</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestant.company} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">Должность</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestant.position} />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                            <Col>
                                <fieldset>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">Вид сварки</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestant.weldingType} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">Разряд</Form.Label>
                                        <Form.Control size="sm" type="number" placeholder={this.state.currentContestant.weldingDischarge} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label size="sm">Клеймо</Form.Label>
                                        <Form.Control size="sm" type="text" placeholder={this.state.currentContestant.mark} />
                                    </Form.Group>
                                </fieldset>
                            </Col>
                            <Col>
                                <fieldset>
                                    <AddFileComponent imagePreviewUrl={this.state.imagePreviewUrl} />
                                </fieldset>
                            </Col>
                        </Row>
                    </fieldset>
                </Form>
            </div>
        );
    }

    renderContestSampleForm() {
        return (
            <Form>
                <fieldset disabled={true}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">Форма</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={this.state.currentContestSample.shape} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">Толщина</Form.Label>
                                <Form.Control size="sm" type="number" placeholder={this.state.currentContestSample.thickness} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">Материал</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={this.state.currentContestSample.material} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">Диаметр</Form.Label>
                                <Form.Control size="sm" type="number" placeholder={this.state.currentContestSample.diameter} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">RFID</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={this.state.currentContestSample.rfid} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">QR</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={this.state.currentContestSample.qr} />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
            </Form>
        );
    }

    renderOverallEvaluationForm() {
        return (
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>
                                Оценка технологии сборки и сварки. (30 баллов)
                            </Form.Label>
                            <Form.Control disabled type="number" placeholder={this.state.currentEvaluationResult.assemblyKSSMark}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Оценка соблюдения правил охраны труда. (10 баллов)
                            </Form.Label>
                            <Form.Control disabled type="number" placeholder={this.state.currentEvaluationResult.occupationalSafetyMark}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Оценка времени сборки и сварки. (10 баллов)
                            </Form.Label>
                            <Form.Control disabled type="number" placeholder={this.state.currentEvaluationResult.weldTimeMark}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Оценка расхода сварочных материалов. (10 баллов)
                            </Form.Label>
                            <Form.Control disabled type="number" placeholder={this.state.currentEvaluationResult.consumptionMark}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Form.Label>
                                Оценка по визуальному и измерительному контролю. (50 баллов)
                            </Form.Label>
                            <Form.Control disabled type="number" placeholder={this.state.currentEvaluationResult.vmcMark}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>
                                Оценка по рентгенографированию. (30 баллов)
                            </Form.Label>
                            <Form.Control disabled type="number" placeholder={this.state.currentEvaluationResult.rcMark}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>
                                Оценка теоретических знаний. (20 баллов)
                            </Form.Label>
                            <Form.Control disabled type="number" placeholder={this.state.currentEvaluationResult.theoreticalMark}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>
                                Общее количество баллов
                            </Form.Label>
                            <Form.Control disabled type="number" placeholder={this.state.currentEvaluationResult.overallMark} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderAssemblyKSSForm() {
        return (
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>
                                Незачищенные кромки перед сваркой. (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input1} placeholder={this.state.currentAssemblyKSSResult.edgeClearence} onChange={this.handleChangeInput1} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Изменение количества прихваток, указанных в WPS. (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input2} placeholder={this.state.currentAssemblyKSSResult.tacksNumberViolation} onChange={this.handleChangeInput2} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Невыполнение послойной зачистки швов. (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input3} placeholder={this.state.currentAssemblyKSSResult.cleaningFailure} onChange={this.handleChangeInput3} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Незачищенная околошная зона сварного шва. (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input4} placeholder={this.state.currentAssemblyKSSResult.uncleanedZone} onChange={this.handleChangeInput4} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>
                                Зачисткка выпуклости шва (олицовочного) шлифмашинкой запрещается. (10 баллов за каждое место зачистки)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input5} placeholder={this.state.currentAssemblyKSSResult.grinderCleaning} onChange={this.handleChangeInput5} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Отступление от режимов сварки более чем на 10% от нормативных значений. (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input6} placeholder={this.state.currentAssemblyKSSResult.weldingModeDeviation} onChange={this.handleChangeInput6} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Изменение положения образца при сварке, количества слоёв. (20 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input7} placeholder={this.state.currentAssemblyKSSResult.changingLayersPosition} onChange={this.handleChangeInput7} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                За использование личных (не предоставленных организатором) приспособлений и оснастки для сборки и сварки. (20 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input8} placeholder={this.state.currentAssemblyKSSResult.personalDevicesUse} onChange={this.handleChangeInput8} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group >
                        <Form.Label>
                            Итоговое количество баллов
                        </Form.Label>
                        <Form.Control disabled type="number" value={this.state.overallMark} placeholder={this.state.overallMark} />
                    </Form.Group>
                    </Row>
                <Row>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName) => { this.handleCalculate(event, "AssemblyKSSResult") }}>
                        Выполнить расчёт баллов
                    </Button>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, resultID) => { this.handleSaveResult(event, "AssemblyKSSResult", this.state.currentAssemblyKSSResult.id) }}>
                        Сохранить оценку
                    </Button>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, sampleID) => { this.handleFormProtocol(event, "AssemblyKSSResult", this.state.currentContestSample.id) }}>
                        Сформировать протокол
                    </Button>
                </Row>
            </Form>
        );
    }

    renderOccupationalSafetyForm() {
        return (
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>
                                Отсутствие, неполное наличие защитной одежды (спецодежда, спецобувь, краги). (3 балла)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input1} placeholder={this.state.currentOccupationalSafetyResult.protectiveClothingViolation} onChange={this.handleChangeInput1} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Неправильное применение или неприменение средств защиты (сварочных пасок, защитных очков, щитков и т. д.). (5 баллов за каждое нарушение)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input2} placeholder={this.state.currentOccupationalSafetyResult.equipmentWrongUsage} onChange={this.handleChangeInput2} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Несвоевременное обесточивание электрошлифмашинок. (5 баллов за каждое нарушение)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input3} placeholder={this.state.currentOccupationalSafetyResult.untimelyPowerOff} onChange={this.handleChangeInput3} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Другие замечания. (5 баллов за каждое нарушение)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input4} placeholder={this.state.currentOccupationalSafetyResult.otherViolations} onChange={this.handleChangeInput4} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Итоговое количество баллов
                            </Form.Label>
                            <Form.Control disabled type="number" value={this.state.overallMark} placeholder={this.state.overallMark}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName) => { this.handleCalculate(event, "OccupationalSafetyResult") }}>
                        Выполнить расчёт баллов
                    </Button>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, resultID) => { this.handleSaveResult(event, "OccupationalSafetyResult", this.state.currentOccupationalSafetyResult.id) }}>
                        Сохранить оценку
                    </Button>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, sampleID) => { this.handleFormProtocol(event, "OccupationalSafetyResult", this.state.currentContestSample.id) }}>
                        Сформировать протокол
                    </Button>
                </Row>
            </Form>
        );
    }

    renderWeldTimeForm() {
        return (
            <Form>
                <Row>
                    <Form.Group>
                        <Form.Label>
                            Время начала
                        </Form.Label>
                        <Form.Control type="time" value={this.state.beginTime} placeholder={this.state.beginTime} onChange={this.handleChangeBeginTime} />
                    </Form.Group>
                    <Form.Group>
                            <Form.Label>
                                Время окончания
                        </Form.Label>
                            <Form.Control type="time" value={this.state.endTime} placeholder={this.state.endTime} onChange={this.handleChangeEndTime} />
                        </Form.Group>
                <Form.Group>
                    <Form.Label>
                            Итоговое количество баллов
                    </Form.Label>
                        <Form.Control disabled type="number" value={this.state.overallMark} placeholder={this.state.overallMark} />
                    </Form.Group>
                </Row>
                <Row>
                    <Button size="sm" variant="primary" type="submit" onClick={(event) => { this.handleCalculateWeldTimeOverallMark(event) }}>
                        Выполнить расчёт баллов
                    </Button>
                    <Button size="sm" variant="primary" type="submit" onClick={(event) => { this.handleSaveWeldTimeResult(event) }}>
                        Сохранить оценку
                    </Button>
                </Row>
                </Form>
            );
    }

    renderConsumptionForm() {
        return (
            <Form>
                <Row>
                <Form.Group >
                    <Form.Label>
                            Итоговое количество баллов
                    </Form.Label>
                        <Form.Control type="number" value={ this.state.overallMark} placeholder={this.state.overallMark}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, resultID) => { this.handleSaveResult(event, "ConsumptionResult", this.state.currentConsumptionResult.id) }}>
                        Сохранить оценку
                    </Button>
                </Row>
            </Form>
        );
    }

    renderVMCForm() {
        return (
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>
                                Наличие непровара или несплавления длиной до 10 мм. (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={ this.state.input1} placeholder={this.state.currentVMCResult.lackOfFusionUnder10mm} onChange={this.handleChangeInput1} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Наличие непровара или несплавления длиной свыше 10мм до 20мм. (10 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input2} placeholder={this.state.currentVMCResult.lackOfFusionBetween10mmN20mm} onChange={this.handleChangeInput2} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Наличие непровара или несплавления длиной свыше 20мм. (20 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input3} placeholder={this.state.currentVMCResult.lackOfFusionOver20mm} onChange={this.handleChangeInput3} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Смещение кромок (более 0,5 мм). (3 балла)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input4} placeholder={this.state.currentVMCResult.edgeOffset}  onChange={this.handleChangeInput4} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Подрез длиной до 10 мм. (3 балла)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input5} placeholder={this.state.currentVMCResult.undercutUnder10mm} onChange={this.handleChangeInput5} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Подрез длиной более 10 мм. (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input6} placeholder={this.state.currentVMCResult.undercutOver10mm} onChange={this.handleChangeInput6} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Устранение подрезов шлифованием (утонение металла). (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input7} placeholder={this.state.currentVMCResult.undercutRemoval} onChange={this.handleChangeInput7} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Утяжина. (3 балла)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input8} placeholder={this.state.currentVMCResult.sinking} onChange={this.handleChangeInput8} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>
                                Превышение проплава. (3 балла)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input9} placeholder={this.state.currentVMCResult.excessPenetration}  onChange={this.handleChangeInput9} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                За каждый 1,0 мм превышения значения ширины области шва. (3 балла)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input10} placeholder={this.state.currentVMCResult.widthExcess} onChange={this.handleChangeInput10} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                За каждый 1,0 мм превышения выпуклости области шва. (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input11} placeholder={this.state.currentVMCResult.convexityExcess} onChange={this.handleChangeInput11} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                За превышение чешуйчатости шва {'>'} 1,0 мм. (3 балла)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input12} placeholder={this.state.currentVMCResult.scalingExcess} onChange={this.handleChangeInput12} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>
                                За неплавный переход от шва к основному металлу. (10 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input13} placeholder={this.state.currentVMCResult.smoothTransition} onChange={this.handleChangeInput13} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                За другие замечания (поры, шлаки, отсутствие зачистики ОШЗ, не удаление шлака с корня шва, случайная дуга и др). (3 балла за каждое замечание)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input14} placeholder={this.state.currentVMCResult.otherViolations} onChange={this.handleChangeInput14} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Геометрия сварного шва (отсутствие прямолинейности шва). (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input15} placeholder={this.state.currentVMCResult.seamGeometry} onChange={this.handleChangeInput15} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Смещение продольных швов труб на расстояние менее 15мм. (5 баллов)
                            </Form.Label>
                            <Form.Control type="number" value={this.state.input16} placeholder={this.state.currentVMCResult.seamDisplacement} onChange={this.handleChangeInput16} />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>
                                Итоговое количество баллов
                            </Form.Label>
                            <Form.Control disabled type="number" value={this.state.overallMark} placeholder={this.state.overallMark}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName) => { this.handleCalculate(event, "VMCResult")}}>
                        Выполнить расчёт баллов
                    </Button>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, resultID) => { this.handleSaveResult(event, "VMCResult", this.state.currentVMCResult.id) }}>
                        Сохранить оценку
                    </Button>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, sampleID) => { this.handleFormProtocol(event, "VMCResult", this.state.currentContestSample.id) }}>
                        Сформировать протокол
                    </Button>
                    </Row>
            </Form>
        );
    }

    renderRCForm() {
        return (
            <Form>
                <Row>
                <Form.Group >
                    <Form.Label>
                            Итоговое количество баллов
                    </Form.Label>
                        <Form.Control type="number" value={this.state.overallMark} placeholder={this.state.overallMark}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, resultID) => { this.handleSaveResult(event, "RCResult", this.state.currentRCResult.id)}}>
                        Сохранить оценку
                    </Button>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, sampleID) => { this.handleFormProtocol(event, "RCResult", this.state.currentContestSample.id) }}>
                        Сформировать протокол
                    </Button>
                </Row>
            </Form>
        );
    }

    renderTheoreticalForm() {
        return (
            <Form>
                <Row>
                <Form.Group>
                    <Form.Label>
                            Итоговое количество баллов
                    </Form.Label>
                        <Form.Control type="number" value={ this.state.overallMark} placeholder={this.state.overallMark}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Button size="sm" variant="primary" type="submit" onClick={(event, controllerName, resultID) => { this.handleSaveResult(event, "TheoreticalResult", this.state.currentTheoreticalResult.id) }}>
                        Сохранить оценку
                    </Button>
                </Row>
            </Form>
        );
    }

    async getContestsDataFromController() {
        const response = await fetch('contest');
        const data = await response.json();
        this.setState({ contests: data });
    }

    async getContestWorksDataFromController(contest) {
        const id = contest.id;

        const response = await fetch('contestWork/GetWorksByContestID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );

        const data = await response.json();
        this.setState({ contestWorks: data });
    }

    async getContestantFromController(contestWork) {
        const id = contestWork.contestantID;
        const response = await fetch('contestant/getByID?id='+id);
        const data = await response.json();
        this.setState(
            { currentContestant: data }
        );
    }

    async getPhotoFromController(photoPath) {
        const response = await fetch('contestant/getPhoto', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photoPath)
        });

        const data = await response.blob();
        const url = URL.createObjectURL(data);
        this.setState({ imagePreviewUrl: url });
    }

    async getContestSampleFromController(contestWork) {
        const id = contestWork.sampleID;

        const response = await fetch('contestSample/getSample', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );

        const data = await response.json();
        this.setState({ currentContestSample: data });
    }

    async getResultsFromControllers(contestWork) {
        const id = contestWork.sampleID;

        const response = await fetch('evaluationResult/getBySampleID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data = await response.json();
        this.setState({ currentEvaluationResult: data });

        const response1 = await fetch('assemblyKSSResult/getBySampleID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data1 = await response1.json();
        this.setState({ currentAssemblyKSSResult: data1 });

        const response2 = await fetch('consumptionResult/getBySampleID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data2 = await response2.json();
        this.setState({ currentConsumptionResult: data2 });

        const response3 = await fetch('occupationalSafetyResult/getBySampleID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data3 = await response3.json();
        this.setState({ currentOccupationalSafetyResult: data3 });

        const response4 = await fetch('theoreticalResult/getBySampleID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data4 = await response4.json();
        this.setState({ currentTheoreticalResult: data4 });

        const response5 = await fetch('weldTimeResult/getBySampleID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data5 = await response5.json();
        this.setState({ currentWeldTimeResult: data5 });

        const response6 = await fetch('rcResult/getBySampleID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data6 = await response6.json();
        this.setState({ currentRCResult: data6 });

        const response7 = await fetch('vmcResult/getBySampleID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data7 = await response7.json();
        this.setState({ currentVMCResult: data7 });
    }

    async getEvaluationResultFromController() {
        const id = this.state.currentContestWork.sampleID;

        const response = await fetch('evaluationResult/getBySampleID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data = await response.json();
        this.setState({ currentEvaluationResult: data });
    }

    async postResultToController(controllerName, data) {
        const response = await fetch(`${controllerName}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );

        const responseData = await response.json();
    }

    async postEvaluationResultToController() {
        const data = this.state.currentEvaluationResult;
        const response = await fetch("contestSampleAndResults/saveEvaluationResult",
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );

        const responseData = await response.json();
        console.log(responseData);
    }

    async createProtocol(controllerName, sampleID) {
        const response = await fetch(`protocol/Create${controllerName}Protocol`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sampleID)
            }
        );

        const responseData = await response.json();
        console.log(responseData);
    }

    async createOverallProtocol() {
        const id = this.state.currentContest.id;

        const response = await fetch(`protocol/CreateOverallEvaluationResultProtocol`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            }
        );

        const responseData = await response.json();
        console.log(responseData);
    }

    async getContestWorkFromController() {
        const id = this.state.currentContestWork.id;

        const response = await fetch('contestWork/getByID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );

        const data = await response.json();
        this.setState({ currentContestWork: data });
    }

    sortContestWorksUp(field) {
        let sortingArray = this.state.contestWorks.sort(this.sortByFieldUp(field));
        this.setState({ contestWorks: sortingArray });
        console.log(this.state.contestWorks);
    }

    sortContestWorksDown(field) {
        let sortingArray = this.state.contestWorks.sort(this.sortByFieldDown(field));
        this.setState({ contestWorks: sortingArray });
        console.log(this.state.contestWorks);
    }

    sortByFieldUp(field) {
        return((a, b) => a[field] > b[field] ? 1 : -1);
    }

    sortByFieldDown(field) {
        return ((a, b) => a[field] < b[field] ? 1 : -1);
    }

    handleChooseContestWork(contestWork) {
        this.setState(
            {
                currentContestWork: contestWork,
                isActiveContestWorkForm: true,
                isActiveContestWorkTable: false,
                currentSampleID: contestWork.sampleID,
            }
        );

        this.getContestSampleFromController(contestWork);
        this.getResultsFromControllers(contestWork);
        this.getContestantFromController(contestWork);
    }

    handleChooseContest(contest) {
        this.setState(
            {
                currentContest: contest,
                isActiveContestWorkTable: true,
                isActiveContestTable: false
            }
        );

        this.getContestWorksDataFromController(contest);
    }

    handleEnterAssemblyKSSResult() {
        this.setState(
            {
                input1: this.state.currentAssemblyKSSResult.edgeClearence,
                input2: this.state.currentAssemblyKSSResult.tacksNumberViolation,
                input3: this.state.currentAssemblyKSSResult.cleaningFailure,
                input4: this.state.currentAssemblyKSSResult.uncleanedZone,
                input5: this.state.currentAssemblyKSSResult.grinderCleaning,
                input6: this.state.currentAssemblyKSSResult.weldingModeDeviation,
                input7: this.state.currentAssemblyKSSResult.changingLayersPosition,
                input8: this.state.currentAssemblyKSSResult.personalDevicesUse,
                overallMark: this.state.currentAssemblyKSSResult.overallMark
            }
        );
    }

    handleEnterOccupationalSafetyResult() {
        this.setState(
            {
                input1: this.state.currentOccupationalSafetyResult.protectiveClothingViolation,
                input2: this.state.currentOccupationalSafetyResult.equipmentWrongUsage,
                input3: this.state.currentOccupationalSafetyResult.untimelyPowerOff,
                input4: this.state.currentOccupationalSafetyResult.otherViolations,
                overallMark: this.state.currentOccupationalSafetyResult.overallMark
            }
        );
    }

    handleEnterWeldTimeResult() {
        this.setState(
            {
                overallMark: this.state.currentWeldTimeResult.overallMark
            }
        );
    }

    handleEnterConsumptionResult() {
        this.setState(
            {
                overallMark: this.state.currentConsumptionResult.overallMark
            }
        );
    }

    handleEnterVMCResult() {
        this.setState(
            {
                input1: this.state.currentVMCResult.lackOfFusionUnder10mm,
                input2: this.state.currentVMCResult.lackOfFusionBetween10mmN20mm,
                input3: this.state.currentVMCResult.lackOfFusionOver20mm,
                input4: this.state.currentVMCResult.edgeOffset,
                input5: this.state.currentVMCResult.undercutUnder10mm,
                input6: this.state.currentVMCResult.undercutOver10mm,
                input7: this.state.currentVMCResult.undercutRemoval,
                input8: this.state.currentVMCResult.sinking,
                input9: this.state.currentVMCResult.excessPenetration,
                input10: this.state.currentVMCResult.widthExcess,
                input11: this.state.currentVMCResult.convexityExcess,
                input12: this.state.currentVMCResult.scalingExcess,
                input13: this.state.currentVMCResult.smoothTransition,
                input14: this.state.currentVMCResult.otherViolations,
                input15: this.state.currentVMCResult.seamGeometry,
                input16: this.state.currentVMCResult.seamDisplacement,
                overallMark: this.state.currentVMCResult.overallMark,
            }
        );
    }

    handleEnterRCResult() {
        this.setState(
            {
                overallMark: this.state.currentRCResult.overallMark
            }
        );
    }

    handleEnterTheoreticalResult() {
        this.setState(
            {
                overallMark: this.state.currentTheoreticalResult.overallMark
            }
        );
    }

    handleBackContestWorks(e) {
        this.setState(
            {
                currentContestWork: "",
                isActiveContestWorkForm: false,
                isActiveContestWorkTable: true,
            }
        );

        e.preventDefault();

        this.getContestWorksDataFromController(this.state.currentContest);
    }

    handleBackContest(e) {
        this.setState(
            {
                currentContest: "",
                isActiveContestTable: true,
                isActiveContestWorkTable: false,
            }
        );

        e.preventDefault();

        this.getContestsDataFromController();
    }

    handleSaveResult(event, controllerName, resultID) {
        event.preventDefault();
        const data =
        {
            "marks":
                [
                    this.state.input1,
                    this.state.input2,
                    this.state.input3,
                    this.state.input4,
                    this.state.input5,
                    this.state.input6,
                    this.state.input7,
                    this.state.input8,
                    this.state.input9,
                    this.state.input10,
                    this.state.input11,
                    this.state.input12,
                    this.state.input13,
                    this.state.input14,
                    this.state.input15,
                    this.state.input16,
                ],
            "sampleID": this.state.currentSampleID,
            "ID": resultID,
        }

        this.postResultToController(controllerName, data);

        setTimeout(this.postEvaluationResultToController, 200);
        setTimeout(this.getEvaluationResultFromController, 300);
        setTimeout(this.getResultsFromControllers, 300, this.state.currentContestWork);
    }

    handleSaveWeldTimeResult(event) {
        event.preventDefault();

        const data = {
            "marks":
                [
                    this.state.beginTime,
                    this.state.endTime,
                ],
            "sampleID": this.state.currentSampleID,
            "ID": this.state.currentWeldTimeResult.id,
        }

        this.postResultToController("weldTimeResult", data);

        setTimeout(this.postEvaluationResultToController, 200);
        setTimeout(this.getEvaluationResultFromController, 300);
        setTimeout(this.getResultsFromControllers, 300, this.state.currentContestWork);
    }

    handleFormProtocol(event, controllerName, sampleID) {
        event.preventDefault();

        this.createProtocol(controllerName, sampleID);
    }

    handleFormOverallProtocol(event) {
        event.preventDefault();

        this.createOverallProtocol();
    }

    handleChangeInput1(event) {
        this.setState({ input1: event.target.value });
    }

    handleChangeInput2(event) {
        this.setState({ input2: event.target.value });
    }

    handleChangeInput3(event) {
        this.setState({ input3: event.target.value });
    }

    handleChangeInput4(event) {
        this.setState({ input4: event.target.value });
    }

    handleChangeInput5(event) {
        this.setState({ input5: event.target.value });
    }

    handleChangeInput6(event) {
        this.setState({ input6: event.target.value });
    }

    handleChangeInput7(event) {
        this.setState({ input7: event.target.value });
    }

    handleChangeInput8(event) {
        this.setState({ input8: event.target.value });
    }

    handleChangeInput9(event) {
        this.setState({ input9: event.target.value });
    }

    handleChangeInput10(event) {
        this.setState({ input10: event.target.value });
    }

    handleChangeInput11(event) {
        this.setState({ input11: event.target.value });
    }

    handleChangeInput12(event) {
        this.setState({ input12: event.target.value });
    }

    handleChangeInput13(event) {
        this.setState({ input13: event.target.value });
    }

    handleChangeInput14(event) {
        this.setState({ input14: event.target.value });
    }

    handleChangeInput15(event) {
        this.setState({ input15: event.target.value });
    }

    handleChangeInput16(event) {
        this.setState({ input16: event.target.value });
    }

    handleChangeBeginTime(event) {
        this.setState({ beginTime: event.target.value });
    }

    handleChangeEndTime(event) {
        this.setState({ endTime: event.target.value });
    }

    handleCalculate(event, controllerName) {
        event.preventDefault();
        this.calculateOverallMark(controllerName);
    }

    handleCalculateWeldTimeOverallMark(event) {
        event.preventDefault();
        this.calculateWeldTimeOverallMark();
    }

    async calculateOverallMark(controllerName) {
        const data = [
            this.state.input1,
            this.state.input2,
            this.state.input3,
            this.state.input4,
            this.state.input5,
            this.state.input6,
            this.state.input7,
            this.state.input8,
            this.state.input9,
            this.state.input10,
            this.state.input11,
            this.state.input12,
            this.state.input13,
            this.state.input14,
            this.state.input15,
            this.state.input16,
        ];

        const response = await fetch(`${controllerName}/calculate`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );

        const responseData = await response.json();
        this.setState({overallMark: responseData});
    }

    async calculateWeldTimeOverallMark() {
        const data = [
            this.state.beginTime,
            this.state.endTime,
        ];

        const response = await fetch(`weldTimeResult/calculate`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );

        const responseData = await response.json();
        this.setState({ overallMark: responseData });
    }
}