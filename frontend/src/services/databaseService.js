import fs from 'fs'

const databaseService = {
   getCampeoesByEvent(event){
      return JSON.parse(
         fs.readFileSync(`./src/database/campeoes/${event}.json`)
      )
   },

   getMaioresAnoWinners(){
      return JSON.parse(
         fs.readFileSync('./src/database/maioresAno/winners.json')
      )
   },
   
   getMaioresAnoByYearAndEvent(year, event){
      return JSON.parse(
         fs.readFileSync(`./src/database/maioresAno/${year}/${event}.json`)
      )
   },

   getMaioresCampeoesByEvent(event){
      return JSON.parse(
         fs.readFileSync(`./src/database/campeoes/maiores/${event}.json`)
      )
   },

   getMaioresHistoriaByEvent(event){
      return JSON.parse(
         fs.readFileSync(`./src/database/maioresHistoria/${event}.json`)
      )
   },
   
   getRecordesByTypeAndEvent(type, event){
      return JSON.parse(
         fs.readFileSync(`./src/database/recordes/${type}/${event}.json`)
      )
   },
}

export default databaseService