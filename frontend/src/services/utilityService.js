const utilityService = {
   formatNumber(number){
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
   },

   formatTime(time){
      time = String(time)
      if(Number(time) >= 6000){
         const ms = time.slice(-2)
         const totalSeconds = Number(time.slice(0, -2))
         const minutes = Math.floor(totalSeconds / 60)
         const seconds = totalSeconds - (minutes * 60)

         return `${minutes}:${String(seconds).padStart(2, '0')}.${ms}`
      }else{
         return (Number(time) / 100).toFixed(2)
      }
   }
}

export default utilityService