import axios from 'axios'

const utilityService = {
   async getPersonWcaImageUrlById(peopleIds){
      let urls = []

      for(let id of peopleIds){
         await axios.get(`https://www.worldcubeassociation.org/persons/${id}`)
         .then(res => {
            const linkWithStart = res.data.split(`class="avatar" src="`)[1]
            const linkWithEnd = linkWithStart.split('"')[0]
            
            return urls.push(linkWithEnd)
         })
      }
      
      return urls
   }
}

export default utilityService