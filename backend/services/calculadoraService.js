import Calculadora from '../schemas/Calculadora.js'

const calculadoraService = {
   async create(calculadoraData){
      try{
         const newCalculadora = new Calculadora(calculadoraData)
         const savedCalculadora = await newCalculadora.save()
         return savedCalculadora._id
      }catch(err){
         console.error(err)
         throw new Error('Erro ao criar Calculadora.')
      }
   },

   async getById(id){
      try{
         let calculadora = await Calculadora.findById(id).exec()
         return calculadora
      }catch(err){
         console.error(err)
         throw new Error('Erro ao buscar Calculadora por Id.')
      }
   },

   async update(id, calculadoraData){
      try{
         const existingCalculadora = await Calculadora.findById(id).exec()
         if(!existingCalculadora){
            return this.create(calculadoraData)
         }

         const updatedCalculadora = await Calculadora.findByIdAndUpdate(id, calculadoraData).exec()
         return updatedCalculadora._id
      }catch(err){
         console.error(err)
         throw new Error('Erro ao atualizar Calculadora.')
      }
   }
}

export default calculadoraService