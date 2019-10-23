import Axios from 'axios'

const axios = Axios.create({
    baseURL : 'mongodb://localhost:27017/ticket-master'
})

export default axios