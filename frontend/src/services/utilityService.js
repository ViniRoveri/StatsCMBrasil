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
   },

   formatNumber(number){
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
   },

   formatTime(tempo){
      let tempoFormatado = (Number(tempo) / 100).toFixed(2)

      if(tempoFormatado.length > 5){
         const ms = tempo.slice(-2)
         const totalSeconds = Number(tempo.slice(0, -2))
         const minutes = Math.floor(totalSeconds / 60)
         const seconds = totalSeconds - (minutes * 60)

         tempoFormatado = `${minutes}:${String(seconds).padStart(2, '0')}.${ms}`
      }

      return tempoFormatado
   }
}

export default utilityService