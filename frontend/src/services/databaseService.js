import fs from 'fs'

const databaseService = {
   getCampeoesByEvent(event){
      const filePath = process.cwd() + `/src/database/campeoes/${event}.json`

      if(!fs.existsSync(filePath)) return []
   
      return JSON.parse(
         fs.readFileSync(filePath)
      )
   },

   getMaioresAnoWinners(){
      return JSON.parse(
         fs.readFileSync(process.cwd() + '/src/database/maioresAno/winners.json')
      )
   },
   
   getMaioresAnoByYearAndEvent(year, event){
      const filePath = process.cwd() + `/src/database/maioresAno/${year}/${event}.json`

      if(!fs.existsSync(filePath)) return []
   
      return JSON.parse(
         fs.readFileSync(filePath)
      )
   },

   getMaioresCampeoesByEvent(event){
      const filePath = process.cwd() + `/src/database/campeoes/maiores/${event}.json`

      if(!fs.existsSync(filePath)) return []
   
      return JSON.parse(
         fs.readFileSync(filePath)
      )
   },

   getMaioresHistoriaByEvent(event){
      const filePath = process.cwd() + `/src/database/maioresHistoria/${event}.json`

      if(!fs.existsSync(filePath)) return []
   
      return JSON.parse(
         fs.readFileSync(filePath)
      )
   },

   getRankingRegionalByRegionTypeAndEvent(region, type, event){
      const filePath = process.cwd() + `/src/database/regionais/${region}/${type}/${event}.json`

      if(!fs.existsSync(filePath)) return []

      return JSON.parse(
         fs.readFileSync(filePath)
      )
   },
   
   getRecordesByTypeAndEvent(type, event){
      const filePath = process.cwd() + `/src/database/recordes/${type}/${event}.json`

      if(!fs.existsSync(filePath)) return []

      return JSON.parse(
         fs.readFileSync(filePath)
      )
   }
}

export default databaseService