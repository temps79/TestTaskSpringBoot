import Chart from 'react-apexcharts'
import React, {Component} from "react";
import EmployeeService from "../services/EmployeeService";
import {Button,Modal} from "react-bootstrap";
import {Redirect, RouteComponentProps} from "react-router-dom";
import { History, LocationState } from "history";

interface IProps extends RouteComponentProps{
}

interface IState {
    open?: boolean;
    options:object;
    series:Array<object>;
}

class ApexChart extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            open:false,
            options: {  },
            series: []
        }
    }
    componentDidMount() {
        {EmployeeService.getStat().then((res)=>this.setState(
            {
                open:true,
                series:[{
                    name: 'Количество',
                    data:Object.values(res.data)
                }],
                options: {
                    chart: {
                        id: 'apexchart'
                    },
                    xaxis: {
                        categories: Object.keys(res.data),
                        position: 'top',
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        crosshairs: {
                            fill: {
                                type: 'gradient',
                                gradient: {
                                    colorFrom: '#D8E3F0',
                                    colorTo: '#BED1E6',
                                    stops: [0, 100],
                                    opacityFrom: 0.4,
                                    opacityTo: 0.5,
                                }
                            }
                        },
                        tooltip: {
                            enabled: true,
                        }
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 5,
                            dataLabels: {
                                position: 'top',
                            },
                        }
                    },
                    title: {
                        text: 'График распределения сотрудников по возрастам',
                        floating: true,
                        offsetY: 370,
                        align: 'center',
                        style: {
                            color: '#444'
                        }
                    }


                }
            }))
        }
    }

    componentDidUpdate() {
        if(this.state.open==false)
            this.props.history.push('/')
    }
    render() {
        return (
            <div >
                <Modal
                    size="lg"
                    show={this.state.open} onHide={()=>this.setState({open:false})}
                    centered>
                    <Modal.Header >
                        <Modal.Title>График распределения</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div  onClick={(e)=>e.stopPropagation()}>
                            <Chart options={this.state.options} series={this.state.series} type="bar" width={'100%'} height={400}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>this.setState({open:false})}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ApexChart;