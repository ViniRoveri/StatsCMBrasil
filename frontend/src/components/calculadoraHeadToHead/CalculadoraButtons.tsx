import $ from 'jquery'

type Props = {
   updateAverages: Function
}

const container = `flex gap-4 items-center justify-center w-full`
const limparButton = `bg-transparent border fw-bold px-4 py-2 rounded-lg
hover:scale-[102%]`

export default function CalculadoraButtons(props: Props){
   function handleLimpar() {
      $('#0_1').val('')
      $('#0_2').val('')
      $('#0_3').val('')
      $('#0_4').val('')
      $('#0_5').val('')

      $('#1_1').val('')
      $('#1_2').val('')
      $('#1_3').val('')
      $('#1_4').val('')
      $('#1_5').val('')

      props.updateAverages()
   }

   return (
      <section className={container}>
         <button className={limparButton} onClick={handleLimpar} type="button">Limpar Tempos</button>
      </section>
   )
}