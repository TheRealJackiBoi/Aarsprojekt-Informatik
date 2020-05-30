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



chartIt();
async function chartIt(){
   await getData();
   const ctx = document.getElementById('totalCasesChart').getContext('2d');
   const totalCasesChart = new Chart(ctx, {
      type: 'line',
      data: {
            labels: dates,
            datasets: [{
               label: 'Total Cases of Corona-Virus',
               data: totalCases,
               backgroundColor:'rgba(244, 247, 118, .6)',
               borderColor: 'rgba(153, 153, 153, .6)',
               borderWidth: 1,
               fill: true
            }]
      },
      options: {
            scales: {
               yAxes: [{
                  ticks: {
                        beginAtZero: true,
                        stepSize: 100000,
                        max: 6000000
                  }
               }]
            },
            hover:{
                
            },
            maintainAspectRatio: false,
            responsive: true,
            backgroundColor: 'rgba(244, 247, 118, 1)'
      }
   });
}




   

