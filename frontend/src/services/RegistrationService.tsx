import axios from "axios";

const REGISTRATION_API_BASE_URL="http://localhost:8080/api/v1/registration"

class RegistrationService{
    registration(login: any, password: any,role:any){
        return axios.post(REGISTRATION_API_BASE_URL,{'userName':login,'password':password,'roles':[role]},{
            method:'POST',
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
}

export default new RegistrationService()