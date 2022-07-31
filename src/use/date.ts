export default function dateFormatter(date: string): string {
   const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

   let [_, month, day] = date.split('-')

   console.log(day)
   if (date.indexOf('0') !== -1) {
      day = day.slice(1)
   }

   console.log(day, month)
   return day + ' ' + months[Number(month) - 1]
}