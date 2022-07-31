export function dateFormatter(date: string): string {
   const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

   let [_, month, day] = date.split('-')

   if (date.indexOf('0') !== -1) {
      day = day.slice(1)
   }

   return day + ' ' + months[Number(month) - 1]
}
