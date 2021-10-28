import axios from "axios";


const HOME_ADDRESSES_API_BASE_URL="http://localhost:8080/api/v1/homeAddresses"
// const HOME_ADDRESSES_API_BASE_URL="http://192.168.1.121:8080/api/v1/homeAddresses"

class HomeAddressesService{
    getAllDistricts(){
        return axios.get(HOME_ADDRESSES_API_BASE_URL+'/districts',{
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
    getAllRegion(){
        return axios.get(HOME_ADDRESSES_API_BASE_URL+'/regions',{
            headers:{
                "Authorization": sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        });
    }
}
export default new HomeAddressesService();