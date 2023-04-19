import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AssemblyKSSResultAddTab } from '../Tabs/AddTabs/AssemblyKSSResultAddTab';
import { ArmatureAssemblyKSSResultAddTab } from '../Tabs/AddTabs/ArmatureAssemblyKSSResultAddTab';
import { RGMResultAddTab } from '../Tabs/AddTabs/RGMResultAddTab';
import { ConsumptionWeldingMaterialsResultAddTab } from '../Tabs/AddTabs/ConsumptionWeldingMaterialsResultAddTab';
import { SafetyResultAddTab } from '../Tabs/AddTabs/SafetyResultAddTab';
import { ArmatureSafetyResultAddTab } from '../Tabs/AddTabs/ArmatureSafetyResultAddTab';
import { TheoreticalResultAddTab } from '../Tabs/AddTabs/TheoreticalResultAddTab';
import { VMCResultAddTab } from '../Tabs/AddTabs/VMCResultAddTab';
import { ArmatureVMCResultAddTab } from '../Tabs/AddTabs/ArmatureVMCResultAddTab';
import { MechanicalTestResultAddTab } from '../Tabs/AddTabs/MechanicalTestResultAddTab';
import { WeldingTimeResultAddTab } from '../Tabs/AddTabs/WeldingTimeResultAddTab';

import { RGMResultTab } from '../Tabs/ViewTabs/RGMResultTab';
import { AssemblyKSSResultTab } from '../Tabs/ViewTabs/AssemblyKSSResultTab';
import { ArmatureAssemblyKSSResultTab } from '../Tabs/ViewTabs/ArmatureAssemblyKSSResultTab';
import { ConsumptionWeldingMaterialsResultTab } from '../Tabs/ViewTabs/ConsumptionWeldingMaterialsResultTab';
import { SafetyResultTab } from '../Tabs/ViewTabs/SafetyResultTab';
import { ArmatureSafetyResultTab } from '../Tabs/ViewTabs/ArmatureSafetyResultTab';
import { TheoreticalResultTab } from '../Tabs/ViewTabs/TheoreticalResultTab';
import { VMCResultTab } from '../Tabs/ViewTabs/VMCResultTab';
import { ArmatureVMCResultTab } from '../Tabs/ViewTabs/ArmatureVMCResultTab';
import { MechanicalTestResultTab } from '../Tabs/ViewTabs/MechanicalTestResultTab';
import { WeldingTimeResultTab } from '../Tabs/ViewTabs/WeldingTimeResultTab';

import { EvaluationResultTab } from '../Tabs/ViewTabs/EvaluationResultTab';
import { ProtocolAddTab } from '../Tabs/AddTabs/ProtocolAddTab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            { children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export class ContestWorkPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnsContest: [
                { field: 'name', headerName: 'Название конкурса' },
                { field: 'dateOfBegin', headerName: 'Дата начала конкурса' },
                { field: 'dateOfEnd', headerName: 'Дата окончания конкурса' },
            ],
            columnsContestant: [
                { field: 'fullName', headerName: 'ФИО' },
                { field: 'rfid', headerName: 'RFID' },
                { field: 'qr', headerName: 'QR' },
                { field: 'company', headerName: 'Компания' },
            ],
            columnsNomination: [
                { field: 'title', headerName: 'Название номинации' },
                { field: 'size', headerName: 'Размер образца' },
                { field: 'thickness', headerName: 'Толщина образца' },
                { field: 'material', headerName: 'Материал образца' },
                { field: 'weldingType', headerName: 'Тип сварки' },
            ],

            currentResultToView: "",
            currentResultToAdd: ""
        }

        this.handleChooseResultToAdd = this.handleChooseResultToAdd.bind(this);
        this.handleChooseResultToView = this.handleChooseResultToView.bind(this);
    }

    render() {
        if (this.props.contestWork != {} && this.props.contestWork.assemblyKSSResults != undefined) {

            let contentToView = null;
            let contentToAdd = null;
            switch (this.state.currentResultToView) {
                case "rgm":
                    contentToView = <RGMResultTab contestWork={this.props.contestWork} />
                    break;
                case "mechanicalTest":
                    contentToView = <MechanicalTestResultTab contestWork={this.props.contestWork} />
                    break;
                case "assemblyKSS":
                    contentToView = <AssemblyKSSResultTab contestWork={this.props.contestWork} />
                    break;
                case "armatureAssemblyKSS":
                    contentToView = <ArmatureAssemblyKSSResultTab contestWork={this.props.contestWork} />
                    break;
                case "consumptionWeldingMaterials":
                    contentToView = <ConsumptionWeldingMaterialsResultTab contestWork={this.props.contestWork} />
                    break;
                case "safety":
                    contentToView = <SafetyResultTab contestWork={this.props.contestWork} />
                    break;
                case "armatureSafety":
                    contentToView = <ArmatureSafetyResultTab contestWork={this.props.contestWork} />
                    break;
                case "theoretical":
                    contentToView = <TheoreticalResultTab contestWork={this.props.contestWork} />
                    break;
                case "vmc":
                    contentToView = <VMCResultTab contestWork={this.props.contestWork} />
                    break;
                case "armatureVMC":
                    contentToView = <ArmatureVMCResultTab contestWork={this.props.contestWork} />
                    break;
                case "weldingTime":
                    contentToView = <WeldingTimeResultTab contestWork={this.props.contestWork} />
                    break;
            }

            switch (this.state.currentResultToAdd) {
                case "rgm":
                    contentToAdd = <RGMResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "mechanicalTest":
                    contentToAdd = <MechanicalTestResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "assemblyKSS":
                    contentToAdd = <AssemblyKSSResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "armatureAssemblyKSS":
                    contentToAdd = <ArmatureAssemblyKSSResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "consumptionWeldingMaterials":
                    contentToAdd = <ConsumptionWeldingMaterialsResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "safety":
                    contentToAdd = <SafetyResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "armatureSafety":
                    contentToAdd = <ArmatureSafetyResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "theoretical":
                    contentToAdd = <TheoreticalResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "vmc":
                    contentToAdd = <VMCResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "armatureVMC":
                    contentToAdd = <ArmatureVMCResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "weldingTime":
                    contentToAdd = <WeldingTimeResultAddTab contestWork={this.props.contestWork} />
                    break;
            }
            return (
                <div style={{ justifyContent: "center" }}>
                    <Tabs value={this.props.currentTab} onChange={this.props.handleChangeTab} centered>
                        <Tab label="Конкурсная работа" />
                        <Tab label="Оценки" />
                        <Tab label="Добавление оценок" />
                        <Tab label="Итоговый результат" />
                        <Tab label="Фотография протокола" />
                    </Tabs>
                    <TabPanel value={this.props.currentTab} index={0}>
                        <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                            <fieldset disabled={!this.props.isUpdating}>
                                <Form.Group>
                                    <Form.Label>Название конкурса</Form.Label>
                                        <Form.Control disabled value={this.props.contest.name} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Номер конкурсанта</Form.Label>
                                        <Form.Control disabled value={this.props.contestant.rfid} required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Название номинации</Form.Label>
                                        <Form.Control disabled value={this.props.nomination.title} required />
                                </Form.Group>
                            </fieldset>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Button variant="danger" style={{ margin: "10px 10px" }} hidden={this.props.isUpdating} onClick={this.props.handleDelete}>
                                    Удалить
                                </Button>
                                <Button style={{ margin: "10px 10px" }} hidden={!this.props.isUpdating} onClick={this.props.handleCancel}>
                                    Отмена
                                </Button>
                                <Button style={{ margin: "10px 10px" }} type="submit" hidden={!this.props.isUpdating}>
                                    Подтвердить
                                </Button>
                            </Stack>
                        </Form>
                    </TabPanel>
                    <TabPanel value={this.props.currentTab} index={1}>
                        <Stack direction="row" spacing={2} justify="center" sx={{ marginTop: "20px" }}>
                            {
                                this.props.contestWork.nomination.sampleType != "Арматура"
                                    ? this.props.contestWork.assemblyKSSResults[0] != undefined ?
                                        <Button name="assemblyKSS" onClick={this.handleChooseResultToView}>
                                            Оценка сборки и сварки
                                        </Button>
                                        : null
                                    : this.props.contestWork.armatureAssemblyKSSResults[0] != undefined ?
                                        <Button name="armatureAssemblyKSS" onClick={this.handleChooseResultToView}>
                                            Оценка сборки и сварки
                                        </Button>
                                        : null
                            }
                            {
                                this.props.contestWork.nomination.sampleType != "Арматура"
                                    ? this.props.contestWork.safetyResults[0] != undefined ?
                                        <Button name="safety" onClick={this.handleChooseResultToView}>
                                            Оценка соблюдения правил охраны труда
                                        </Button>
                                        : null
                                    : this.props.contestWork.armatureSafetyResults[0] != undefined ?
                                        <Button name="armatureSafety" onClick={this.handleChooseResultToView}>
                                            Оценка соблюдения правил охраны труда
                                        </Button>
                                        : null
                            }
                            {this.props.contestWork.weldingTimeResults[0] != undefined ?
                                <Button name="weldingTime" onClick={this.handleChooseResultToView}>
                                    Оценка времени сборки и сварки
                                </Button>
                                : null}
                            {this.props.contestWork.consumptionWeldingMaterialsResults[0] != undefined ?
                                <Button name="consumptionWeldingMaterials" onClick={this.handleChooseResultToView}>
                                    Оценка расхода сварочных материалов
                                </Button>
                                : null}
                            {
                                this.props.contestWork.nomination.sampleType != "Арматура"
                                    ? this.props.contestWork.vmcResults[0] != undefined ?
                                        <Button name="vmc" onClick={this.handleChooseResultToView}>
                                            Оценка по визуальному и измерительному контролю
                                        </Button>
                                        : null
                                    : this.props.contestWork.armatureVMCResults[0] != undefined ?
                                        <Button name="armatureVMC" onClick={this.handleChooseResultToView}>
                                            Оценка по визуальному и измерительному контролю
                                        </Button>
                                        : null
                            }
                            {
                                this.props.contestWork.nomination.sampleType != "Арматура" 
                                    ? this.props.contestWork.rgmResults[0] != undefined ?
                                        <Button name="rgm" onClick={this.handleChooseResultToView}>
                                            Оценка по радиографическому контролю
                                        </Button>
                                        : null
                                    : this.props.contestWork.mechanicalTestResults[0] != undefined ?
                                        <Button name="mechanicalTest" onClick={this.handleChooseResultToView}>
                                            Оценка по механическим испытаниям
                                        </Button>
                                        : null
                            }
                            {this.props.contestWork.theoreticalResults[0] != undefined ?
                                <Button name="theoretical" onClick={this.handleChooseResultToView}>
                                    Оценка теоретических знаний
                                </Button>
                                : null}
                        </Stack>
                        {contentToView}
                    </TabPanel>
                    <TabPanel value={this.props.currentTab} index={2}>
                        <Stack direction="row" spacing={2} justify="cecnter" sx={{ marginTop: "20px" }}>
                            {
                                this.props.contestWork.nomination.sampleType != "Арматура"
                                    ? this.props.contestWork.assemblyKSSResults[0] === undefined ?
                                        <Button name="assemblyKSS" onClick={this.handleChooseResultToAdd}>
                                            Оценка сборки и сварки
                                        </Button>
                                        : null
                                    : this.props.contestWork.armatureAssemblyKSSResults[0] === undefined ?
                                        <Button name="armatureAssemblyKSS" onClick={this.handleChooseResultToAdd}>
                                            Оценка сборки и сварки
                                        </Button>
                                        : null
                            }
                            {
                                this.props.contestWork.nomination.sampleType != "Арматура"
                                    ? this.props.contestWork.safetyResults[0] === undefined ?
                                        <Button name="safety" onClick={this.handleChooseResultToAdd}>
                                            Оценка соблюдения правил охраны труда
                                        </Button>
                                        : null
                                    : this.props.contestWork.armatureSafetyResults[0] === undefined ?
                                        <Button name="armatureSafety" onClick={this.handleChooseResultToAdd}>
                                            Оценка соблюдения правил охраны труда
                                        </Button>
                                        : null
                            }
                            {this.props.contestWork.weldingTimeResults[0] === undefined ?
                                <Button name="weldingTime" onClick={this.handleChooseResultToAdd}>
                                    Оценка времени сборки и сварки
                                </Button>
                                : null}
                            {this.props.contestWork.consumptionWeldingMaterialsResults[0] === undefined ?
                                <Button name="consumptionWeldingMaterials" onClick={this.handleChooseResultToAdd}>
                                    Оценка расхода сварочных материалов
                                </Button>
                                : null}
                            {
                                this.props.contestWork.nomination.sampleType != "Арматура"
                                    ? this.props.contestWork.vmcResults[0] === undefined ?
                                        <Button name="vmc" onClick={this.handleChooseResultToAdd}>
                                            Оценка по визуальному и измерительному контролю
                                        </Button>
                                        : null
                                    : this.props.contestWork.armatureVMCResults[0] === undefined ?
                                        <Button name="armatureVMC" onClick={this.handleChooseResultToAdd}>
                                            Оценка по визуальному и измерительному контролю
                                        </Button>
                                        : null
                            }
                            {
                                this.props.contestWork.nomination.sampleType != "Арматура"
                                    ? this.props.contestWork.rgmResults[0] === undefined ?
                                        <Button name="rgm" onClick={this.handleChooseResultToAdd}>
                                            Оценка по радиографическому контролю
                                        </Button>
                                        : null
                                    : this.props.contestWork.mechanicalTestResults[0] === undefined ?
                                        <Button name="mechanicalTest" onClick={this.handleChooseResultToAdd}>
                                            Оценка по механическим испытаниям
                                        </Button>
                                        : null
                            }
                            {this.props.contestWork.theoreticalResults[0] === undefined ?
                                <Button name="theoretical" onClick={this.handleChooseResultToAdd}>
                                    Оценка теоретических знаний
                                </Button>
                                : null}
                        </Stack>
                        {contentToAdd}
                    </TabPanel>
                    <TabPanel value={this.props.currentTab} index={3}>
                        {this.props.contestWork.evaluationResults[0] != undefined ?
                            <EvaluationResultTab contestWork={this.props.contestWork} />
                            : <p>Оценка не была сформирована!</p>
                            }
                    </TabPanel>
                    <TabPanel value={this.props.currentTab} index={4}>
                        {this.props.isAddingProtocol ? <ProtocolAddTab contestWork={this.props.contestWork} /> :
                        <img
                            style={{
                                width: "711px",
                                height: "1000px",
                                marginTop: "10px",
                                marginBottom: "10px",
                                marginLeft: "auto",
                                marginRight: "auto",
                                display: "grid"
                            }}
                            alt="Здесь будет фотография протокола"
                            src={`/Фото/${this.props.contestWork.contest.name}/${this.props.contestWork.nomination.title}/${this.props.contestWork.contestant.rfid}/Протокол_${this.props.contestWork.contestant.rfid}.jpg`}
                            onError={this.props.changeFlag}
                        />}
                    </TabPanel>
                    <Button variant="outline-secondary" href="/ContestWorks" style={{ marginTop: "20px", display: "grid" }}>
                        Назад к конкурсным работам
                    </Button>
                </div>
            );
        }
    }

    handleChooseResultToView() {
        this.setState({ currentResultToView: event.target.name });
    }

    handleChooseResultToAdd() {
        this.setState({ currentResultToAdd: event.target.name });
    }
}