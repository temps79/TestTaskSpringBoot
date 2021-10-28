import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import ExcelService from "../services/ExcelService";
import FileSaver from 'file-saver'
import {Redirect} from "react-router-dom";

class ExportExcelComponent extends Component {
    exportExcel(){
        ExcelService.getExcel().then((response)=>{
            FileSaver.saveAs(response.data, "emploees_info.xlsx")
        })
    }
    render() {
        return (
            <div>
                {this.exportExcel()}
                <Redirect to="/" />
            </div>
        );
    }
}

export default ExportExcelComponent;