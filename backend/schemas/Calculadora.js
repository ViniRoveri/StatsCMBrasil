import mongoose, { Schema } from "mongoose"

const competitorSchema = new Schema({
   name: String,
   time1: String,
   time2: String,
   time3: String,
   time4: String,
   time5: String,
   bpa: String,
   wpa: String,
   toWin: String,
   avg: String
})

const calculadoraSchema = new Schema({
   competitor1: competitorSchema,
   competitor2: competitorSchema,

   createdAt: {
      type: Date,
      default: Date.now
   }
}, {
   versionKey: false 
})

const Calculadora = mongoose.model('Calculadora', calculadoraSchema)

export default Calculadora