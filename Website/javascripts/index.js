//const apiUrl = "https://covid.ourworldindata.org/data/owid-covid-data.csv"

var totalCases = [];
var dates = [];
async function getData(){
    const response = await fetch('world.csv');
    const data = await response.text();
    console.log(data);

   const table = data.split('\n').slice(1);
   table.forEach(row =>{
      const columns = row.split(',');
      const isoCode = columns[0];
      const location = columns[1];
      const date = columns[2];
      const total = columns[3];
      console.log(date, total);
      
      dates.push(date)
      totalCases.push(total);
   });
   console.log(totalCases);   
   console.log(dates);   
}
getData()




