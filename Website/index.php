<!DOCTYPE html>
<html lang="en">
<head>
    <!--Required meta tags-->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    

    <!--Bootstrap css-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    

    <!--Bootstrap scripts-->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>

	
	<?php
		
		// Initialize a file URL to the variable 
		$url = 'https://covid.ourworldindata.org/data/owid-covid-data.csv'; 
		
		// Use basename() function to return the base name of file  
		$file_name = './data/corona-data.csv'; 

		$lastModifiedTimestamp = filemtime($file_name);
 
		//Convert the timestamp into a human-readable format
		//and print it out.
		$lastModifiedDatetime = date("Y/m/d", $lastModifiedTimestamp);
 
		if(date("Y/m/d") != $lastModifiedDatetime){
		// Use file_get_contents() function to get the file 
		// from url and use file_put_contents() function to 
			file_put_contents( $file_name, file_get_contents($url)); 
		}
	?>



	<title>Overview</title>
</head>
<body class="bg-secondary">
<!--Navigations bar-->
<nav class="navbar sticky-top navbar-light bg-dark ">
    <ul class="nav justify-content-center mx-auto">
        <li class="nav-item ">
          <a class="navbar-brand text-white" href="#">Covid-19 Data</a>
        </li>
      </ul>
</nav>

<!--Form til at vælge hvilket dataen skal komme fra-->
<div class="container container-fluid justify-content-center">
  
  <div class="row align-items-center container-fluid justify-content-center">
	<div class="group col-auto my-1">
    <p  class="label text-white text-center">Select the country you want data for </br>ps. double-click</p>
	</div>
	<div class="row align-items-center container-fluid justify-content-center" style="margin: 10px;">
	<button id="worldbtn" type="button" class="btn btn-dark" onClick="searchIso = 'OWID_WRL'; updateChart(chart, dates, totalCases, totalDe, loca, toCa, newCases, toDe);" style="margin-right: 10px;"> World</button>
	<button id="denbtn" type="button" class="btn btn-dark" onClick="searchIso = 'DNK'; updateChart(chart, dates, totalCases, totalDe, loca, toCa, newCases, toDe);"style="margin-right: 10px;">Denmark</button>
	<button id="gbbtn" type="button" class="btn btn-dark" onClick="searchIso = 'GBR'; updateChart(chart, dates, totalCases, totalDe, loca, toCa, newCases, toDe);"style="margin-right: 10px;">United Kingdom</button>
	<button id="chinabtn" type="button" class="btn btn-dark" onClick="searchIso = 'CHN'; updateChart(chart, dates, totalCases, totalDe, loca, toCa, newCases, toDe);"style="margin-right: 10px;">China</button>
	<button id="itabtn" type="button" class="btn btn-dark" onClick="searchIso = 'ITA'; updateChart(chart, dates, totalCases, totalDe, loca, toCa, newCases, toDe);"style="margin-right: 10px;">Italy</button>
	<button id="usabtn" type="button" class="btn btn-dark" onClick="searchIso = 'USA'; updateChart(chart, dates, totalCases, totalDe, loca, toCa, newCases, toDe);"style="margin-right: 10px;">U.S.A</button>
	</div>

	<div class="row align-items-center container-fluid justify-content-center col-8" style="margin-top: 10px;">
	<card class="card bg-dark col-10 text-center">
	<div class="card-body">
	<h2 id="selectedc" class="text-white"></h2>
	</div>
	</card>
	</div>

	</div>


<!--Scripts-->
<script src="javascripts/index.js"></script>
</div>
<div class="container container-fluid justify-content-center">

<div class="row">
<!--Card til at have graf i-->
<card class="card bg-light col-lg-12 col-md-12 col-xs-12 container-fluid justify-content-center " style="margin-top: 10px;">
  <div class="card-body ">
  <canvas id="totalCasesChart" width="600" height="600"></canvas>
  </div>
</card>
</div>
</div>

<div class="row row align-items-center container-fluid justify-content-center" style="margin-bottom: 20px;">
<card class="card text-center bg-warning container-fluid justify-content-center col-3" style="margin-top: 10px;">
<div class="card-body ">
	<p>Total Cases: <span id="totalCasesSpan">af</span></p>		
</div>
</card>
<card class="card text-center bg-warning container-fluid justify-content-center col-3" style="margin-top: 10px;">
<div class="card-body ">
	<p>New Cases: <span id="newCasesSpan">af</span></p>	
</div>
</card>
<card class="card text-center bg-warning container-fluid justify-content-center col-3" style="margin-top: 10px;">
<div class="card-body ">
	<p>Total Deaths: <span id="totalDeathsSpan">af</span></p>		
</div>
</card>
</div>

</body>
</html> 