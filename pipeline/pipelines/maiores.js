import pipelineMaioresHistoria from './partialsMaiores/maioresHistoria.js'
import pipelineMaioresAno from './partialsMaiores/maioresAno.js'
import fs from 'fs'

export default function pipelineMaiores(){
   console.log('Starting Maiores pipepline...')

   const wcaExport = JSON.parse(
      fs.readFileSync("./wcaExport.json")
   )

   const championships = wcaExport.championships
   const championshipsIds = championships.map(c => c.competition_id)

   const competitions = wcaExport.competitions
   const championshipsComps = competitions.filter(c => championshipsIds.includes(c.id))

   const people = wcaExport.people
   const peopleIds = people.map(p => p.id)

   const ranksAverage = wcaExport.ranksAverage
   const ranksSingle = wcaExport.ranksSingle

   const championshipsResults = wcaExport.results.filter(r => championshipsIds.includes(r.competitionId) && (r.roundTypeId == 'f' || r.roundTypeId == 'c'))
   const peopleResults = wcaExport.results.filter(r => peopleIds.includes(r.personId))

   pipelineMaioresHistoria(championships, people, ranksAverage, ranksSingle, championshipsResults, peopleResults)
   pipelineMaioresAno(championships, championshipsComps, people, ranksAverage, ranksSingle, peopleResults, competitions, championshipsResults)
   
   console.log('Maiores pipeline finished sucessfully!')
}