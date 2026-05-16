import mongoose, { Schema } from "mongoose"

const calculadoraSchema = new Schema({
   competitor1Name: String,
   competitor1Time1: String,
   competitor1Time2: String,
   competitor1Time3: String,
   competitor1Time4: String,
   competitor1Time5: String,
   competitor1Bpa: String,
   competitor1Wpa: String,
   competitor1ToWin: String,
   competitor1Avg: String,
   
   competitor2Name: String,
   competitor2Time1: String,
   competitor2Time2: String,
   competitor2Time3: String,
   competitor2Time4: String,
   competitor2Time5: String,
   competitor2Bpa: String,
   competitor2Wpa: String,
   competitor2ToWin: String,
   competitor2Avg: String,

   createdAt: {
      type: Date,
      default: Date.now
   }
}, {
   versionKey: false 
})

const Calculadora = mongoose.model('Calculadora', calculadoraSchema)

export default Calculadora