import axiosApi from '../domain/axiosInstances/axiosApi.ts'

const apiService = {
   async getCampeoesByEvent(event){
      const request = await axiosApi.get(`campeoes/${event}.json`)
      return request.data
   },

   async getMaioresAnoWinners(){
      const request = await axiosApi.get('maioresAno/winners.json')
      return request.data
   },
   
   async getMaioresAnoByYearAndEvent(year, event){
      const request = await axiosApi.get(`maioresAno/${year}/${event}.json`)
      return request.data
   },

   async getMaioresCampeoesByEvent(event){
      const request = await axiosApi.get(`campeoes/maiores/${event}.json`)
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