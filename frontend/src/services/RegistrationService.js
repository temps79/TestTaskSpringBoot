import axios from "axios";

const REGISTRATION_API_BASE_URL="http://localhost:8080/api/v1/registration"

class RegistrationService{
    registration(login,password){
        return axios.post(REGISTRATION_API_BASE_URL,{'userName':login,'password':password},{
            method:'POST',
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
}

export default new RegistrationService()