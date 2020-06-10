//const apiUrl = "https://covid.ourworldindata.org/data/owid-covid-data.csv"

var chart = null;
//var searchIso = this.document.getElementById("searchIso").value;

//forskellige arrays til graferne
var totalCases = [];
var dates = [];
var newCases = [];
var countries = [[]];
var searchIso = "OWID_WRL";


async function getData(){
    const response = await fetch('./data/corona-data.csv');
    const data = await response.text();
    totalCases = [];
    newCases = [];
    dates = []

   const table = data.split('\n').slice(1);
   table.forEach(row =>{
      const columns = row.split(',');
      const isoCode = columns[0];
      const location = columns[1];
      const date = columns[3];
      const total = columns[4];
      const newInfect = columns[5];
      
      
      countries.forEach(country => {
         if (searchIso === isoCode){
           country.push(row);
           dates.push(date);
           totalCases.push(total);
           newCases.push(newInfect);
         }
     });
   }); 
   console.log(dates, totalCases, newCases)
}


chartIt();
async function chartIt(){
   await getData();
   var ctx = document.getElementById('totalCasesChart').getContext('2d');
   chart = new Chart(ctx, {
      type: 'line',
      data: {
            labels: dates,
            datasets: [{
               label: 'Total Cases of Corona-Virus',
               data: totalCases,
               order: 2,
               backgroundColor:'rgba(200, 0, 0, .2)',
               borderColor: 'rgba(255, 0, 0, .6)',
               borderWidth: 1,
               fill: true}]
   },
      options:{
            scales: {
               yAxes: [{
                  ticks: {
                        beginAtZero: true,
                        stepSize: 0
                        
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
    console.log('created');
}

function removeData(chart) {
   chart.data.labels.pop();
   chart.data.datasets.forEach((dataset) => {
       dataset.data.pop();
   });
}

async function updateChart(chart, theDates, theData){
   removeData(chart);
   await getData();
   chart.data.labels = theDates;
   chart.data.datasets[0].data = theData;
   await chart.update();
}




   

