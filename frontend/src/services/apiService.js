import axiosApi from '../domain/axiosInstances/axiosApi.ts'

const apiService = {
   async getMaioresAnoWinners(){
      const request = await axiosApi.get('maioresAno/winners.json')
      return request.data
   },
   
   async getMaioresAnoByYearAndEvent(year, event){
      const request = await axiosApi.get(`maioresAno/${year}/${event}.json`)
      return request.data
   },

   async getMaioresHistoriaByEvent(event){
      const request = await axiosApi.get(`maioresHistoria/${event}.json`)
      return request.data
   },
   
   async getRecordesByTypeAndEvent(type, event){
      const request = await axiosApi.get(`recordes/${type}/${event}.json`)
      return request.data
   },
}

export default apiService