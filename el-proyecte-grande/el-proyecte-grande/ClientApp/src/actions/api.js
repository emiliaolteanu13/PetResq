import axios from "axios";//npm i axios

const baseUrl = "https://localhost:44351/api/";



export default {

    posts(url = baseUrl + 'posts') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + '/' + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + '/' + id, updateRecord),
            delete: id => axios.delete(url + '/' + id)
        }
    }
}