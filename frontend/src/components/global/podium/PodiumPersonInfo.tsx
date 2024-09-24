type Props = {
   borderColor: string
   personData: any
   personImageUrl: string
}

const personInfo = `flex flex-col gap-2 items-center text-center`
const personImage = `bg-center bg-cover bg-no-repeat border-2 h-[120px] rounded-full w-[120px]`

export default function PodiumPersonInfo(props: Props){
   return (
      <div className={personInfo}>
         <div className={personImage} style={{backgroundImage: `url(${props.personImageUrl})`, borderColor: props.borderColor}}/>
         <p className="font-bold">{props.personData.personName}</p>
         <p>{props.personData.personId}</p>
         <p>{props.personData.totalPoints} Pontos</p>
      </div>
   )
}