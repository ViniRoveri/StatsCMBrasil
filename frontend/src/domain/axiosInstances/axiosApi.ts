import axios from "axios"

const axiosApi = axios.create({
   baseURL: 'https://viniroveri.github.io/StatsCMBrasil/'
})

export default axiosApi