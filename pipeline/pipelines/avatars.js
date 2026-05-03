import fs from 'fs'
import avatarsService from '../services/avatarsService.js'

export default async function pipelineAvatars(wcaExport){
   console.log('Starting Avatars pipepline...')

   let avatarsData = {}

   if(!fs.existsSync('./frontend/src/database/avatars')) fs.mkdirSync('./frontend/src/database/avatars')

   const peopleIdsWithAvatar = avatarsService.getPeopleIdsWithAvatar()
   for(let id of peopleIdsWithAvatar){
      avatarsData[id] = await avatarsService.getPersonImageUrlById(id)
   }

   fs.writeFileSync(`./frontend/src/database/avatars/avatars.json`, JSON.stringify(avatarsData))

   console.log('Avatars pipeline finished sucessfully!')
}