import $ from 'jquery'
import calculadoraDatabaseService from '@/services/calculadoraDatabaseService'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
   competitor1Calcs: any
   competitor2Calcs: any
   getCalculadoraData: Function
   setApiId: Dispatch<SetStateAction<string>>
   setModalData: Dispatch<SetStateAction<any>>
   updateAverages: Function
}

const container = `flex gap-16 items-center justify-center w-full`
const limparButton = `bg-transparent border px-4 py-2 rounded-lg
hover:scale-[102%]`
const apiButton = `bg-vr-yellow border px-4 py-2 rounded-lg text-vr-black
hover:scale-[102%]
disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-[98%]`

export default function CalculadoraButtons(props: Props){
   const [apiUrl, setApiUrl] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [copiedUrl, setCopiedUrl] = useState(false)

   function handleCopyApiUrl(url?: string){
      navigator.clipboard.writeText(url || apiUrl)
      setCopiedUrl(true)
      setTimeout(() => {
         setCopiedUrl(false)
      }, 4000)
   }

   async function handleCreateApi(){
      setIsLoading(true)

      const calculadoraData = props.getCalculadoraData()

      const createdCalculadoraId = await calculadoraDatabaseService.create(calculadoraData)
      if(createdCalculadoraId){
         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}calculadora/${createdCalculadoraId}`
         setApiUrl(url)
         setIsLoading(false)
         handleCopyApiUrl(url)
         openApiModal(true)
         localStorage.setItem('calculadoraApiUrl', JSON.stringify({ createdAt: new Date(), id: createdCalculadoraId, url }))
         props.setApiId(createdCalculadoraId)
      }else{
         setIsLoading(false)
         openApiModal(false)
      }
   }

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

   function openApiModal(success: boolean){
      if(success) {
         props.setModalData({
            title: 'API criada com sucesso!',
            body: 'O link da API já foi copiado para sua área de transferência.'
         })
      }else{
         props.setModalData({
            title: 'Erro ao criar API.',
            body: 'Ocorreu um erro ao tentar criar a API. Tente novamente mais tarde.'
         })
      }
   }

   useEffect(() => {
      const storedApiUrl = JSON.parse(
         localStorage.getItem('calculadoraApiUrl') || 'null'
      )

      if (storedApiUrl) {
         const msIn12Hrs = 1000 * 60 * 60 * 12
         const msSinceApiCreation = new Date().getTime() - new Date(storedApiUrl.createdAt).getTime()
         if (msSinceApiCreation < msIn12Hrs) {
            setApiUrl(storedApiUrl.url)
            props.setApiId(storedApiUrl.id)
         }
      }
   }, [])

   return (
      <section className={container}>
         <button className={limparButton} onClick={handleLimpar} type="button">Limpar Tempos</button>

         <button className={apiButton} disabled={isLoading || copiedUrl} onClick={() => apiUrl ? handleCopyApiUrl() : handleCreateApi()} type="button">
            {isLoading ? 'Criando...' : 
            copiedUrl ? 'URL copiada!' :
            apiUrl ? 'Copiar URL da API' : 
            'Criar API'}
         </button>
      </section>
   )
}