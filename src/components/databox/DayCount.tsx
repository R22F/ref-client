export const DayCount = () => {
    let date = new Date();
    let day = String(date.getDate()).padStart(2,'0');
    let month = String(date.getMonth()+1).padStart(2,'0');
    let year = String(date.getFullYear());
    
    return (`${year}-${month}-${day}`)
}