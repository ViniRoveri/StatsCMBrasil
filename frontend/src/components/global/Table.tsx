type Props = {
   headers: string[]
   rows: string[][]
}

const container = `overflow-x-scroll`
const table = `border-separate mx-auto whitespace-nowrap`
const th = `bg-vr-black font-normal font-title px-4 py-2 text-center
[&:not(:last-child)]:border-r`
const td = `bg-vr-black border-t px-4 text-center
[&:not(:last-child)]:border-r`

export default function Table(props: Props){
   return (
      <section className={container}>
         <table className={table}>
            <thead>
               <tr>
                  {props.headers.map((header, headerI) =>
                     <th className={`${th} ${headerI == 0 ? 'left-0 sticky' : ''}`} key={header}>{header}</th>
                  )}
               </tr>
            </thead>

            <tbody>
               {props.rows.map((row, rowI) =>
                  <tr key={`${row[0]} ${rowI}`}>
                     {row.map((info, infoI) => {
                        let padding = 'py-2'
                        switch(rowI){
                           case 0: padding = 'py-6'; break;
                           case 1: padding = 'py-4'; break;
                           case 2: padding = 'py-3'; break;
                        }
                        
                        return(
                           <td className={`${td} ${padding} ${infoI == 0 ? 'left-0 sticky' : ''}`} key={`${info} ${infoI}`}>
                              {info}
                           </td>
                        )
                     })}
                  </tr>
               )}
            </tbody>
         </table>
      </section>
   )
}