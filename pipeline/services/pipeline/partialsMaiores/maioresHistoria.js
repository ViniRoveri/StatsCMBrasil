import eventsIds from '../../../domain/constants/eventsIds.js'
import maioresService from '../../maioresService.js'
import fs from 'fs'

export default function pipelineMaioresHistoria(championships, people, ranksAverage, ranksSingle, results, peopleResults){
   console.log('Initializing MaioresHistoria update...')

   const allMaioresHistoriaData = maioresService.getAllMaiores(championships, ranksAverage, ranksSingle, results, peopleResults, people)

   if(!fs.existsSync('./frontend/src/database/maioresHistoria')) fs.mkdirSync('./frontend/src/database/maioresHistoria')

   for(let event of eventsIds){
      fs.writeFileSync(`./frontend/src/database/maioresHistoria/${event}.json`, JSON.stringify(allMaioresHistoriaData[event]))
   }

   const maioresHistoriaGeralData = maioresService.getMaioresHistoriaGeralData(allMaioresHistoriaData)
   fs.writeFileSync(`./frontend/src/database/maioresHistoria/geral.json`, JSON.stringify(maioresHistoriaGeralData))
}