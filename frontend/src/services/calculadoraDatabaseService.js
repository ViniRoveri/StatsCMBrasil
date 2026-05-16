import axiosBackend from '@/domain/axiosInstances/axiosBackend'

const calculadoraDatabaseService = {
   async create(calculadoraData){
      try{
         const response = await axiosBackend.post('calculadora', calculadoraData)
         return response.data
      }catch(err){
         console.error(err)
         return null
      }
   },

   async getById(id){
      try{
         const response = await axiosBackend.get(`calculadora/${id}`)
         return response.data
      }catch(err){
         console.error(err)
         return null
      }
   },

   async update(id, calculadoraData){
      try{
         const response = await axiosBackend.put(`calculadora/${id}`, calculadoraData)
         return response.data
      }catch(err){
         console.error(err)
         return null
      }
   }
}

export default calculadoraDatabaseService