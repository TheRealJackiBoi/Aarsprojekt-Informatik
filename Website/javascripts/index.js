//const apiUrl = "https://covid.ourworldindata.org/data/owid-covid-data.csv"

var chart = null;
//var searchIso = this.document.getElementById("searchIso").value;

//forskellige arrays til graferne
var totalCases = [];
var dates = [];
var newCases = null;
var toCa = null;
var toDe = null;
var totalDe = [];
var countries = [[]];
var searchIso = "OWID_WRL";
var loca = null;


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
      const location = columns[2];
      const date = columns[3];
      const total = columns[4];
      const newInfect = columns[5];
      const totalDeaths = columns[6];
      
      
      countries.forEach(country => {
         if (searchIso === isoCode){
           country.push(row);
           dates.push(date);
           totalCases.push(total);
           totalDe.push(totalDeaths);
           newCases = newInfect;
           toCa = total;
           toDe = totalDeaths;
           loca = location;
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
               backgroundColor:'rgba(244, 247, 118, .6)',
               borderColor: 'rgba(153, 153, 153, .6)',
               borderWidth: 1,
               fill: true
            }, 
               {
               label: 'Total Deaths',
               data: totalDe,
               order: 1,
               backgroundColor:'rgba(255, 0, 0, .6)',
               borderColor: 'rgba(153, 153, 153, .6)',
               borderWidth: 1,
               fill: true
               }]
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

async function updateChart(chart, theDates, theData, name, infe, ne, de){
   removeData(chart);
   await getData();
   chart.data.labels = theDates;
   chart.data.datasets[0].data = theData;
   await chart.update();
   var span = document.getElementById('selectedc');

   var inf = document.getElementById('totalCasesSpan');
   var newca = document.getElementById('newCasesSpan');
   var dead = document.getElementById('totalDeathsSpan');

   span.textContent = name;

   inf.textContent = infe;
   newca.textContent = ne;
   dead.textContent = de;
}



   

