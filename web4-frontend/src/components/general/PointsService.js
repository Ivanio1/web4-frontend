import axios from 'axios'


const URL="http://localhost:8080/show"
class PointsService {
   getPoints(){
       return axios.get(URL)
   }
}

export default new PointsService();