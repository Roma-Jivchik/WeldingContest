import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomDataGrid from '../../sub-components/CustomDataGrid';
import { AssemblyKSSResultAddTab } from '../ResultsPages/AddPages/AssemblyKSSResultAddTab';
import { RGMResultAddTab } from '../ResultsPages/AddPages/RGMResultAddTab';
import { ConsumptionWeldingMaterialsResultAddTab } from '../ResultsPages/AddPages/ConsumptionWeldingMaterialsResultAddTab';
import { SafetyResultAddTab } from '../ResultsPages/AddPages/SafetyResultAddTab';
import { TheoreticalResultAddTab } from '../ResultsPages/AddPages/TheoreticalResultAddTab';
import { VMCResultAddTab } from '../ResultsPages/AddPages/VMCResultAddTab';
import { WeldingTimeResultAddTab } from '../ResultsPages/AddPages/WeldingTimeResultAddTab';
import { RGMResultTab } from '../ResultsPages/ViewPages/RGMResultTab';
import { AssemblyKSSResultTab } from '../ResultsPages/ViewPages/AssemblyKSSResultTab';
import { ConsumptionWeldingMaterialsResultTab } from '../ResultsPages/ViewPages/ConsumptionWeldingMaterialsResultTab';
import { SafetyResultTab } from '../ResultsPages/ViewPages/SafetyResultTab';
import { TheoreticalResultTab } from '../ResultsPages/ViewPages/TheoreticalResultTab';
import { VMCResultTab } from '../ResultsPages/ViewPages/VMCResultTab';
import { WeldingTimeResultTab } from '../ResultsPages/ViewPages/WeldingTimeResultTab';

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
                case "assemblyKSS":
                    contentToView = <AssemblyKSSResultTab contestWork={this.props.contestWork} />
                    break;
                case "consumptionWeldingMaterials":
                    contentToView = <ConsumptionWeldingMaterialsResultTab contestWork={this.props.contestWork} />
                    break;
                case "safety":
                    contentToView = <SafetyResultTab contestWork={this.props.contestWork} />
                    break;
                case "theoretical":
                    contentToView = <TheoreticalResultTab contestWork={this.props.contestWork} />
                    break;
                case "vmc":
                    contentToView = <VMCResultTab contestWork={this.props.contestWork} />
                    break;
                case "weldingTime":
                    contentToView = <WeldingTimeResultTab contestWork={this.props.contestWork} />
                    break;
            }

            switch (this.state.currentResultToAdd) {
                case "rgm":
                    contentToAdd = <RGMResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "assemblyKSS":
                    contentToAdd = <AssemblyKSSResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "consumptionWeldingMaterials":
                    contentToAdd = <ConsumptionWeldingMaterialsResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "safety":
                    contentToAdd = <SafetyResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "theoretical":
                    contentToAdd = <TheoreticalResultAddTab contestWork={this.props.contestWork} />
                    break;
                case "vmc":
                    contentToAdd = <VMCResultAddTab contestWork={this.props.contestWork} />
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
                    </Tabs>
                    <TabPanel value={this.props.currentTab} index={0}>
                        <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                            <fieldset disabled={!this.props.isUpdating}>
                                <Form.Group>
                                    <Form.Label>Название конкурса</Form.Label>
                                    <Stack direction="row" spacing={2}>
                                        <Form.Control disabled value={this.props.contest.name} required />
                                        <Button hidden={!this.props.isUpdating} onClick={this.props.handleOpen} name="contestAnchor">
                                            Выбрать
                                        </Button>
                                        <Popover
                                            open={this.props.contestAnchorOpen}
                                            anchorEl={this.props.contestAnchor}
                                            onClose={this.props.handleClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <CustomDataGrid
                                                columns={this.state.columnsContest}
                                                rows={this.props.contests}
                                                handleSelect={this.props.handleSelectContest}
                                            />
                                        </Popover>
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Номер конкурсанта</Form.Label>
                                    <Stack direction="row" spacing={2}>
                                        <Form.Control disabled value={this.props.contestant.rfid} required />
                                        <Button hidden={!this.props.isUpdating} onClick={this.props.handleOpen} name="contestantAnchor">
                                            Выбрать
                                        </Button>
                                        <Popover
                                            open={this.props.contestantAnchorOpen}
                                            anchorEl={this.props.contestantAnchor}
                                            onClose={this.props.handleClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <CustomDataGrid
                                                columns={this.state.columnsContestant}
                                                rows={this.props.contestants}
                                                handleSelect={this.props.handleSelectContestant}
                                            />
                                        </Popover>
                                    </Stack>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Название номинации</Form.Label>
                                    <Stack direction="row" spacing={2}>
                                        <Form.Control disabled value={this.props.nomination.title} required />
                                        <Button hidden={!this.props.isUpdating} onClick={this.props.handleOpen} name="nominationAnchor">
                                            Выбрать
                                        </Button>
                                        <Popover
                                            open={this.props.nominationAnchorOpen}
                                            anchorEl={this.props.nominationAnchor}
                                            onClose={this.props.handleClose}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <CustomDataGrid
                                                columns={this.state.columnsNomination}
                                                rows={this.props.nominations}
                                                handleSelect={this.props.handleSelectNomination}
                                            />
                                        </Popover>
                                    </Stack>
                                </Form.Group>
                            </fieldset>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Button variant="danger" style={{ margin: "10px 10px" }} hidden={this.props.isUpdating} onClick={this.props.handleDelete}>
                                    Удалить
                                </Button>
                                <Button style={{ margin: "10px 10px" }} hidden={this.props.isUpdating} onClick={this.props.handleUpdate}>
                                    Обновить
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
                            {this.props.contestWork.assemblyKSSResults[0] != undefined ?
                                <Button name="assemblyKSS" onClick={this.handleChooseResultToView}>
                                    Оценка сборки и сварки
                                </Button>
                                : null}
                            {this.props.contestWork.safetyResults[0] != undefined ?
                                <Button name="safety" onClick={this.handleChooseResultToView}>
                                    Оценка соблюдения правил охраны труда
                                </Button>
                                : null}
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
                            {this.props.contestWork.vmcResults[0] != undefined ?
                                <Button name="vmc" onClick={this.handleChooseResultToView}>
                                    Оценка по визуальному и измерительному контролю
                                </Button>
                                : null}
                            {this.props.contestWork.rgmResults[0] != undefined ?
                                <Button name="rgm" onClick={this.handleChooseResultToView}>
                                    Оценка по радиографическому контролю
                                </Button>
                                : null}
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
                            {this.props.contestWork.assemblyKSSResults[0] == undefined ?
                                <Button name="assemblyKSS" onClick={this.handleChooseResultToAdd}>
                                    Оценка сборки и сварки
                                </Button>
                                : null}
                            {this.props.contestWork.safetyResults[0] === undefined ?
                                <Button name="safety" onClick={this.handleChooseResultToAdd}>
                                    Оценка соблюдения правил охраны труда
                                </Button>
                                : null}
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
                            {this.props.contestWork.vmcResults[0] === undefined ?
                                <Button name="vmc" onClick={this.handleChooseResultToAdd}>
                                    Оценка по визуальному и измерительному контролю
                                </Button>
                                : null}
                            {this.props.contestWork.rgmResults[0] === undefined ?
                                <Button name="rgm" onClick={this.handleChooseResultToAdd}>
                                    Оценка по радиографическому контролю
                                </Button>
                                : null}
                            {this.props.contestWork.theoreticalResults[0] === undefined ?
                                <Button name="theoretical" onClick={this.handleChooseResultToAdd}>
                                    Оценка теоретических знаний
                                </Button>
                                : null}
                        </Stack>
                        {contentToAdd}
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