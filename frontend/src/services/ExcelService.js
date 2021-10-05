import axios from "axios";

const EXCEL_API_BASE_URL="http://localhost:8080/export/download"

class ExcelService  {
    getExcel(){
        return axios.get(EXCEL_API_BASE_URL,{
            responseType: 'blob',
            method:'GET',
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
}
export default new ExcelService();