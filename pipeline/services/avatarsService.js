import fs from 'fs'
import eventsIds from "../domain/constants/eventsIds.js"
import statesInfo from '../domain/constants/statesInfo.js'
import axios from 'axios'

const avatarsService = {
   async getPersonImageUrlById(personId){
      const wcaPage = (await axios.get(`https://www.worldcubeassociation.org/persons/${personId}`)).data

      const urlWithEndOfPage = wcaPage.split(`class="avatar" src="`)[1]
      if(urlWithEndOfPage){
         const url = urlWithEndOfPage.split('"')[0]         
         return url
      }else{
         return ''
      }
   },

   getPeopleIdsWithAvatar(){
      let peopleIdsWithAvatar = []

      const statesAbbreviations = statesInfo.map(s => s.abbreviation)
      const resultTypes = ['average', 'single']

      for(let event of eventsIds){
         const maioresHistoria = JSON.parse(
            fs.readFileSync(`./frontend/src/database/maioresHistoria/${event}.json`)
         )
         const maioresHistoriaTop3Ids = maioresHistoria.slice(0, 3).map(m => m.personId)
         peopleIdsWithAvatar = peopleIdsWithAvatar.concat(maioresHistoriaTop3Ids)

         const campeoes = JSON.parse(
            fs.readFileSync(`./frontend/src/database/campeoes/${event}.json`)
         )
         const campeoesIds = campeoes.map(c => c.personId)
         peopleIdsWithAvatar = peopleIdsWithAvatar.concat(campeoesIds)

         for(let state of statesAbbreviations){
            for(let type of resultTypes){
               if(!fs.existsSync(`./frontend/src/database/regionais/${state}/${type}/${event}.json`)) continue

               const regionais = JSON.parse(
                  fs.readFileSync(`./frontend/src/database/regionais/${state}/${type}/${event}.json`)
               )
               const regionaisTop3Ids = regionais.slice(0, 3).map(m => m.personId)
               peopleIdsWithAvatar = peopleIdsWithAvatar.concat(regionaisTop3Ids)
            }
         }
      }

      return [...new Set(peopleIdsWithAvatar)]
   }
}

export default avatarsService