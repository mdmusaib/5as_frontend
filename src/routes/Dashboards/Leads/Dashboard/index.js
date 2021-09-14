import React from 'react';
import "./style.css"
import PieCharts from "./chart";
import { ButtonGroup, Button, Chip, Box, Grid, Typography, Avatar } from '@material-ui/core';
import axios, { urls, baseURL } from '../../../../services/auth/jwt/config';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import GridContainer from './../../../../@jumbo/components/GridContainer';
import CmtCard from './../../../../@coremat/CmtCard';
import CmtCardHeader from './../../../../@coremat/CmtCard/CmtCardHeader';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

const dataselect = [
    { title: 'Source', value: "source" }, { title: 'Event', value: "event" }, { title: 'Sales Person', value: "sales_man" },
    { title: 'City', value: "city" }];

class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            choosefunnel: "YEAR",
            Revenue: "YEAR",
            source: true,
            event: true,
            sales_man: true,
            city: true,
            selectendDate: null,
            selectstartDate: null,
            Revenue_selectendDate: null,
            Revenue_selectstartDate: null,
            leadchart: null,
            projectChart: null,
            SourceData: null,
            eventData: null,
            sales_manData: null,
            city_data: null,
            leadCount: 0,
            qualifiedLeadCount: 0,
            projectCount: 0,
            types: new Date(),
            types1: new Date(),
            value: [{ title: 'Source', value: "source" }, { title: 'Event', value: "event" }, { title: 'Sales Person', value: "sales_man" },
            { title: 'City', value: "city" }],
        }
    }

    componentDidMount() {
        this.RevenueFetchApi();
        this.FetchApi();
    }

    Handlechoosefunnel = async (val, date) => {
        const { state } = this.state;
        if (val === "CUSTOM") {
            this.setState({ ...state, choosefunnel: val })
        } else {
            this.setState({ ...state, choosefunnel: val, types: date, selectendDate: null, selectstartDate: null }, () => {
                this.FetchApi()
            })

        }
    }
    HandleRevenue = (val, date) => {
        const { state } = this.state;
        if (val === "CUSTOM") {
            this.setState({ ...state, Revenue: val })
        } else {
            this.setState({ ...state, Revenue: val, Revenue_selectendDate: null, types1: date, Revenue_selectstartDate: null }, () => { this.RevenueFetchApi() })

        }
    }
    HandleRadio = (name, val) => {
        this.setState({ [name]: val }, () => {
            this.RevenueFetchApi()
        })

    }
    handleDateChange = async (name, date) => {
        const { selectstartDate, selectendDate } = this.state;
        this.setState({
            ...this.state, [name]: date,
        }, () => {
            if (this.state.selectstartDate !== null && this.state.selectendDate !== null) {
                this.setState({ types: selectstartDate + "/" + selectendDate })
                this.FetchApi();
            }

        })

    };
    handleDateChange1 = async (name, date) => {
        const { Revenue_selectstartDate, Revenue_Revenue_selectendDate } = this.state;
        this.setState({
            ...this.state, [name]: date
        }, () => {
            if (this.state.Revenue_Revenue_selectendDate !== null && this.state.Revenue_selectstartDate !== null) {
                this.setState({ types1: Revenue_selectstartDate + "/" + Revenue_Revenue_selectendDate })
                this.RevenueFetchApi();
            }
        })

    };

    changedselect = (newValue) => {
        debugger
        var b = [{ title: 'Source', value: "source" }, { title: 'Event', value: "event" }, { title: 'Sales Person', value: "sales_man" },
        { title: 'City', value: "city" }];
        const state = this.state;
        const a = newValue.filter((option) => this.state.value.indexOf(option.title) === -1);

        b.map(item => {
            if (newValue.some(data => data.title === item.title)) {
                state[item.value] = true
            } else {
                state[item.value] = false
            }
            return item
        })
        this.setState({
            ...state,
            value: a,
        }, () => {
            this.RevenueFetchApi();
        });

    }
    FetchApi = () => {

        // Leads Funnel fetch api
        const { state, choosefunnel, selectstartDate, selectendDate, } = this.state;
        var month = moment().get('month'),
            year = moment().get('year');
        if (month >= 3) {
            var yearstart = year + '-04-01';
            var yearend = (year + 1) + '-03-31';
        } else {
            var yearstart = (year - 1) + '-04-01';
            var yearend = year + '-03-31';
        }
        let today = moment().format('YYYY-MM-DD');
        let current_month = moment().startOf('month').format('YYYY-MM');
        var Weekstart = moment().startOf('week').format('YYYY-MM-DD');
        axios.post(`${baseURL}/${urls.getLeadDashboard}`, {
            "category": choosefunnel.toUpperCase(),
            "today": today,
            "month": current_month,
            "week_start_date": Weekstart,
            "year_start_date": yearstart,
            "year_end_date": yearend,
            "custom_start_date": selectstartDate,
            "custom_end_date": selectendDate
        })
            .then(res => {
                console.log(res);
                if (res.status===200) {
                    this.setState({
                        ...state,
                        leadchart: res.data.leadchart,
                        projectChart: res.data.projectChart,
                        leadCount: res.data.leadcount,
                        qualifiedLeadCount: res.data.leadquoteconfirm,
                        projectCount: res.data.projectcount
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    RevenueFetchApi = () => {

        // Revenue fetch api

        const { state, city, Revenue, source, sales_man, event, Revenue_selectendDate, Revenue_selectstartDate } = this.state;
        var month = moment().get('month'),
            year = moment().get('year');
        var yearstart = '';
        var yearend = '';
        if (month >= 3) {
            yearstart = year + '-04-01';
            yearend = (year + 1) + '-03-31';
        } else {
            yearstart = (year - 1) + '-04-01';
            yearend = year + '-03-31';
        }
        let today = moment().format('YYYY-MM-DD');
        let current_month = moment().startOf('month').format('YYYY-MM');
        var Weekstart = moment().startOf('week').format('YYYY-MM-DD');
        axios.post(`${baseURL}/api/v1/dashboard/revenue_dashboard`, {
            "source": source,
            "event": event,
            "city": city,
            "sales_man": sales_man,
            "category": Revenue.toUpperCase(),
            "today": today,
            "month": current_month,
            "week_start_date": Weekstart,
            "year_start_date": yearstart,
            "year_end_date": yearend,
            "custom_start_date": Revenue_selectstartDate,
            "custom_end_date": Revenue_selectendDate
        })
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        ...state,
                        SourceData: res.data.info.source,
                        eventData: res.data.info.event,
                        sales_manData: res.data.info.sales_man,
                        city_data: res.data.info.city,
                    })
                } else {
                    this.setState({
                        ...state,
                        SourceData: [],
                        eventData: [],
                        city_data: []
                    })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        const { types, types1, SourceData, eventData, sales_manData, city_data, leadchart, projectChart, choosefunnel, source, event, selectstartDate, selectendDate, Revenue_selectstartDate, Revenue_selectendDate, sales_man, city, Revenue } = this.state;

        // no data identify fun in charts
        const datafilter = (data_filter) => {
            var nodata = [];
            if (data_filter) {
                data_filter.map((val, index) => {
                    if (val.value === 0) {
                        nodata.push(index)
                    }
                })
            }
            return { data_filter, nodata }
        }
        const convertKeyValue=(data)=>{
            
            let obj=[];
            if(leadchart){
                leadchart.map(data1=>{
               Object.keys(data1).map((lead,i)=>{
                obj.push({"name":lead,"value":data1[lead]})
               });     
                });
                console.log(obj);
               
            }
            return obj;
            
        }
        return (
            <div className="main-container">
                <div className="backg-list">
                    <div className="row">
                        <h4 className="">Leads Funnel</h4>
                        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">

                            {/* Leads Funnel list of buttons */}
                            <div className="sub-header">
                                <ButtonGroup>
                                    <Button className={choosefunnel === "DAY" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("DAY", new Date())}>Today</Button>
                                    <Button className={choosefunnel === "WEEK" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("WEEK", new Date())}>Week</Button>
                                    <Button className={choosefunnel === "MONTH" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("MONTH", new Date())}>Month</Button>
                                    <Button className={choosefunnel === "YEAR" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("YEAR", new Date())}>Year&nbsp;To&nbsp;Date</Button>
                                    <Button className={choosefunnel === "CUSTOM" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.Handlechoosefunnel("CUSTOM", null)}>Custom</Button>
                                </ButtonGroup>
                            </div>
                            {/* end */}

                            {/* Leads Funnel start to end date pickers */}



                            {choosefunnel === "CUSTOM" && 
                            <GridContainer>
                                <Grid item xs={12} md={6} xl={6}>
                                    <GridContainer>
                                        <Grid item xs={12} md={6} xl={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    size="small"
                                                    margin="dense"
                                                    format="dd/MM/yyyy" inputVariant={"outlined"}
                                                    style={{ width: '100%' }}
                                                    label={"Start Date"}
                                                    value={selectstartDate}
                                                    onChange={(date) => this.handleDateChange("selectstartDate", date)}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item xs={12} md={6} xl={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    size="small"
                                                    margin="dense"
                                                    format="dd/MM/yyyy" inputVariant={"outlined"}
                                                    style={{ width: '100%' }}
                                                    label={"End Date"}
                                                    value={selectendDate}
                                                    onChange={(date) => this.handleDateChange("selectendDate", date)}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </GridContainer>
                                </Grid>
                            </GridContainer>
                            }
                            {/* end */}

                        </div>
                        {(selectstartDate && selectendDate) ?
                            <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12"><div className="year">{moment(selectstartDate).format('ll')} / {moment(selectendDate).format('ll')}</div></div> :
                            <>{types && <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12"><div className="year">{moment(types).format('ll')}</div></div>}</>}

                    </div>
                </div>

                <GridContainer>
                    <Grid item xs={12} md={6} xl={6}>
                        <CmtCard style={{padding: "20px"}}>
                            <GridContainer>
                                <Grid item xs={12} md={4} xl={4}>
                                    <CmtCard backgroundColor={'#3f51b5'}>
                                        <CmtCardHeader style={{justifyContent: 'center'}}>
                                            <PermContactCalendarIcon style={{alignSelf: 'center', color: 'white'}} fontSize="large"></PermContactCalendarIcon>
                                        </CmtCardHeader>

                                        <Typography style={{color: 'white'}} color={'white'} align="center" variant="h1" gutterBottom>{this.state.leadCount}</Typography>
                                        <Typography style={{color: 'white'}} className="colorTextSecondary" align="center" variant="h5" gutterBottom>Leads</Typography>
                                    </CmtCard>
                                </Grid>
                                <Grid item xs={12} md={4} xl={4}>
                                    <CmtCard backgroundColor={'#ff4081'}>
                                        <CmtCardHeader style={{justifyContent: 'center'}}>
                                            <VerifiedUserIcon style={{alignSelf: 'center', color: 'white'}} fontSize="large"></VerifiedUserIcon>
                                        </CmtCardHeader>

                                        <Typography style={{color: 'white'}} align="center" variant="h1" gutterBottom>{this.state.qualifiedLeadCount}</Typography>
                                        <Typography style={{color: 'white'}} className="colorTextSecondary" align="center" variant="h5" gutterBottom>Qualified Leads</Typography>
                                    </CmtCard>
                                </Grid>
                                <Grid item xs={12} md={4} xl={4}>
                                    <CmtCard>
                                        <CmtCardHeader style={{justifyContent: 'center'}}>
                                            <DeveloperBoardIcon style={{alignSelf: 'center'}} fontSize="large"></DeveloperBoardIcon>
                                        </CmtCardHeader>
                                        
                                        <Typography align="center" variant="h1" gutterBottom>{this.state.projectCount}</Typography>
                                        <Typography className="colorTextSecondary" align="center" variant="h5" gutterBottom>Projects</Typography>
                                    </CmtCard>
                                </Grid>
                            </GridContainer>
                        </CmtCard>
                    </Grid>
                    <Grid item xs={12} md={6} xl={6}>
                        <CmtCard>
                            {/* Leads Funnel charts */}

                            <GridContainer>
                                <Grid item xs={12} md={6} xl={6}>
                                    <div className="backg s">
                                        <span className="chart-titles">Leads By Source</span>

                                        {leadchart?.length>0? <PieCharts title={'Leads'}
                                            data={convertKeyValue(leadchart).length!==0 ? convertKeyValue(leadchart) : []}
                                        /> : <span className="nodata">
                                                <i class="fa fa-exclamation-circle"></i> No data</span>}
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} xl={6}>
                                    <div className="backg s">
                                        <span className="chart-titles">Conversion Rate By Source</span>
                                        {projectChart?.length!==0? <PieCharts title={'Projects'}
                                            data={convertKeyValue(projectChart).length!==0 ? convertKeyValue(projectChart) : []}
                                        /> : <span className="nodata"> <i class="fa fa-exclamation-circle"></i>No data</span>}
                                    </div>
                                </Grid>
                            </GridContainer>
                            {/* end */}
                        </CmtCard>
                    </Grid>
                </GridContainer>

                
                <br />

                <div className="backg-list">
                    <div className="row">
                        <h4 className="text-muteds">Revenue</h4>
                        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">

                            {/* Revenue list of buttons */}
                            <div className="sub-header">
                                <ButtonGroup>
                                    <Button className={Revenue === "DAY" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("DAY", new Date())}>Today</Button>
                                    <Button className={Revenue === "WEEK" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("WEEK", new Date())}>Week</Button>
                                    <Button className={Revenue === "MONTH" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("MONTH", new Date())}>Month</Button>
                                    <Button className={Revenue === "YEAR" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("YEAR", new Date())}>Year&nbsp;To&nbsp;Date</Button>
                                    <Button className={Revenue === "CUSTOM" ? "sub-header-list sub-header-list-active" : "sub-header-list"} onClick={() => this.HandleRevenue("CUSTOM", null)}>Custom</Button>
                                </ButtonGroup>
                            </div>
                            {/* end */}

                            {/* Revenue start to end date pickers */}
                            {Revenue === "CUSTOM" && <>   <div className="row">

                                <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            size="small"
                                            margin="dense"
                                            format="dd/MM/yyyy" inputVariant={"outlined"}
                                            style={{ width: '100%' }}
                                            label={"Start Date"}
                                            value={Revenue_selectstartDate}
                                            onChange={(date) => this.handleDateChange1("Revenue_selectstartDate", date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            size="small"
                                            margin="dense"
                                            format="dd/MM/yyyy" inputVariant={"outlined"}
                                            style={{ width: '100%' }}
                                            label={"Start Date"}
                                            value={Revenue_selectendDate}
                                            onChange={(date) => this.handleDateChange1("Revenue_selectendDate", date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                            </div></>}
                            {/* end */}

                        </div>
                        {(Revenue_selectstartDate && Revenue_selectendDate) ?
                            <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12"><div className="year">{moment(Revenue_selectstartDate).format('ll')} / {moment(Revenue_selectendDate).format('ll')}</div></div> :
                            <>{types1 && <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12"><div className="year">{moment(types1).format('ll')}</div></div>}</>}
                    </div>
                </div>

                {/* Revenue Radio buttons */}

                <div>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12">
                            <Autocomplete
                                multiple
                                value={this.state.value}
                                size="small"
                                onChange={(event, value) => this.changedselect(value)}
                                options={dataselect}
                                getOptionLabel={(option) => option.title}
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (<Chip label={option.title} {...getTagProps({ index })} />))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} label="Revenue" variant="outlined" placeholder="Revenue" />
                                )}
                            />
                        </div> </div>

                </div> <br />
                {/* end */}

                {/* Revenue charts */}

                <div className="row">
                    {
                        source ? <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12 col-12" style={{ marginBottom: 22 }}>
                            <div className="backg s">
                                <span className="chart-titles">By Source</span>
                                {datafilter(SourceData).nodata?.length !== SourceData?.length ? <PieCharts title={'Source'}
                                    data={SourceData ? SourceData : []}
                                /> : <span className="nodata"><i class="fa fa-exclamation-circle"></i> No data</span>}
                            </div></div> : ""
                    }
                    {
                        event ? <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12 col-12" style={{ marginBottom: 22 }}>
                            <div className="backg s">
                                <span className="chart-titles">By Event</span>
                                {datafilter(eventData).nodata?.length !== eventData?.length ? <PieCharts title={'Event'}
                                    data={eventData ? eventData : []}
                                /> : <span className="nodata"><i class="fa fa-exclamation-circle"></i> No data</span>}
                            </div></div> : ""
                    }
                    {
                        sales_man ? <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12 col-12" style={{ marginBottom: 22 }}>
                            <div className="backg s">
                                <span className="chart-titles">By Sales Person</span>
                                {datafilter(sales_manData).nodata?.length !== sales_manData?.length ? <PieCharts title={'Sales Man'}
                                    data={sales_manData ? sales_manData : []}
                                /> : <span className="nodata"><i class="fa fa-exclamation-circle"></i> No data</span>}
                            </div></div> : ""
                    }
                    {
                        city ? <div className="col-sm-6 col-md-6 col-lg-6 col-xs-12 col-12" style={{ marginBottom: 22 }}>
                            <div className="backg s">
                                <span className="chart-titles">By City</span>
                                {datafilter(city_data).nodata?.length !== city_data?.length ? <PieCharts title={'City'}
                                    data={city_data ? city_data : []}
                                /> : <span className="nodata"><i class="fa fa-exclamation-circle"></i> No data</span>}
                            </div></div> : ""
                    }

                </div>
                {/* end */}

            </div>
        );
    }
}
export default DashBoard;