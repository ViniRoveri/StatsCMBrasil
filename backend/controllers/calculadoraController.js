import calculadoraService from "../services/calculadoraService.js"

const calculadoraController = {
   async create(req, res){
      const calculadoraData = req.body
      const result = await calculadoraService.create(calculadoraData)
      res.send(result)
   },

   async getById(req, res){
      const id = req.params.id
      const result = await calculadoraService.getById(id)
      res.send(result)
   },

   async update(req, res){
      const id = req.params.id
      const calculadoraData = req.body
      const result = await calculadoraService.update(id, calculadoraData)
      res.send(result)
   }
}

export default calculadoraController