//const apiUrl = "https://covid.ourworldindata.org/data/owid-covid-data.csv"

//forskellige arrays til graferne
var totalCases = [];
var dates = [];
var newCases = [];
var countries = [[]];
//Den iso kode der bliver valgt
var searchIso = "OWID_WRL";


async function deleteData(){
   
}

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
               order: 2,
               backgroundColor:'rgba(244, 247, 118, .6)',
               borderColor: 'rgba(153, 153, 153, .6)',
               borderWidth: 1,
               fill: true
               }, 
               {
               label: 'New cases of Corona-Virus',
               data: newCases,
               order: 1,
               fill: false,
               borderColor: 'rgba(255, 0, 0, .6)',
               backgroundColor:'rgba(255, 0, 0, .6)',
               borderWidth: 1
               }],
               
            },
      options:{
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
    console.log('created');
}




   

