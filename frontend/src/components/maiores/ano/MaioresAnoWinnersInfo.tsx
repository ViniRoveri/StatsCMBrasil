import YearWinnerCard from "./YearWinnerCard"

type Props = {
   eventId: string
   maioresAnoWinners: any
}

const container = `flex flex-col gap-6 items-center justify-center`
const cardContainer = `max-w-[525px] w-full`

export default function MaioresAnoWinnersInfo(props: Props){
   const years = Object.keys(props.maioresAnoWinners).reverse()

   return (
      <section className={container}>
         {years.map(year => {
            const winner = props.maioresAnoWinners[year][props.eventId]

            return (
               <div className={cardContainer} key={year}>
               {winner ?
                  <YearWinnerCard event={props.eventId} key={year} winner={winner} year={year}/>
               :
                  <></>
               }
               </div>
            )
         })}
      </section>
   )
}