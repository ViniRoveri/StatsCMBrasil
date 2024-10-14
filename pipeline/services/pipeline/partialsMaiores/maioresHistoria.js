import eventsIds from '../../../domain/constants/eventsIds.js'
import maioresService from '../../maioresService.js'
import fs from 'fs'

export default function pipelineMaioresHistoria(championships, people, ranksAverage, ranksSingle, results, peopleResults){
   console.log('Initializing MaioresHistoria update...')

   const allMaioresHistoriaData = maioresService.getAllMaiores(championships, ranksAverage, ranksSingle, results, peopleResults, people)


   if(!fs.existsSync('./docs/maioresHistoria')) fs.mkdirSync('./docs/maioresHistoria')

   for(let event of eventsIds){
      fs.writeFileSync(`./docs/maioresHistoria/${event}.json`, JSON.stringify(allMaioresHistoriaData[event]))
   }
}