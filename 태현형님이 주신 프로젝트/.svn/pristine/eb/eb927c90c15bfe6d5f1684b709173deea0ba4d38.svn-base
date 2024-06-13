<%@include file = "../common/emxNavigatorInclude.inc"%>

<%
try {
%>

<script src="../webapps/SMAVenHighcharts/9.0.1/highcharts.js"></script>
<script src="../webapps/SMAVenHighcharts/9.0.1/modules/series-label.js"></script>
<script src="../webapps/SMAVenHighcharts/9.0.1/modules/exporting.js"></script>
<script src="../webapps/SMAVenHighcharts/9.0.1/modules/export-data.js"></script>
<script src="../webapps/SMAVenHighcharts/9.0.1/modules/accessibility.js"></script>


<style type="text/css">
div {
	width: 50%;
}
.highcharts-figure,
.highcharts-data-table table {
/*     min-width: 360px; */
/*     max-width: 800px; */
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

/* @media print { */
/* 	.page-break { page-break-inside:avoid; page-break-after:auto } */
/* } */

</style>

<body>

<input type="button" value="printPage" onclick="printPage()"/>

<figure class="highcharts-figure">
<!--     <div id="container1" class="page-break"></div> -->
<!--     <div id="container2" class="page-break"></div> -->
<!--     <div id="container3" class="page-break"></div> -->
<!--     <div id="container4" class="page-break"></div> -->
<!--     <div id="container5" class="page-break"></div> -->
<!--     <div id="container6" class="page-break"></div> -->
<!--     <div id="container7" class="page-break"></div> -->
<!--     <div id="container8" class="page-break"></div> -->
<!--     <div id="container9" class="page-break"></div> -->
<!--     <div id="container10" class="page-break"></div> -->
    <div id="container1"></div>
    <div id="container2"></div>
    <div id="container3"></div>
    <div id="container4"></div>
    <div id="container5"></div>
    <div id="container6"></div>
    <div id="container7"></div>
    <div id="container8"></div>
    <div id="container9"></div>
    <div id="container10"></div>
</figure>

</body>

<script type="text/javascript">
function printPage(){
	var initBody;
	window.onbeforeprint = function(){
		initBody = document.body.innerHTML;
		document.body.innerHTML =  document.getElementById('container1').innerHTML;
	};
	window.onafterprint = function(){
		document.body.innerHTML = initBody;
	};
	window.print();
	return false;
}
let chartDataJson1 = {
		chart: {
	        height: 800,
	    },
	    title: {
	        text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
	        align: 'left'
	    },

	    subtitle: {
	        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
	        align: 'left'
	    },

	    yAxis: {
	        title: {
	            text: 'Number of Employees'
	        }
	    },

	    xAxis: {
	        accessibility: {
	            rangeDescription: 'Range: 2010 to 2020'
	        }
	    },

	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },

	    plotOptions: {
	        series: {
	            label: {
	                connectorAllowed: false
	            },
	            pointStart: 2010
	        }
	    },

	    series: [{
	        name: 'Installation & Developers',
	        data: [43934, 48656, 65165, 81827, 112143, 142383,
	            171533, 165174, 155157, 161454, 154610]
	    }, {
	        name: 'Manufacturing',
	        data: [24916, 37941, 29742, 29851, 32490, 30282,
	            38121, 36885, 33726, 34243, 31050]
	    }, {
	        name: 'Sales & Distribution',
	        data: [11744, 30000, 16005, 19771, 20185, 24377,
	            32147, 30912, 29243, 29213, 25663]
	    }, {
	        name: 'Operations & Maintenance',
	        data: [null, null, null, null, null, null, null,
	            null, 11164, 11218, 10077]
	    }, {
	        name: 'Other',
	        data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
	            17300, 13053, 11906, 10073]
	    }],

	    responsive: {
	        rules: [{
	            condition: {
	                maxWidth: 500
	            },
	            chartOptions: {
	                legend: {
	                    layout: 'horizontal',
	                    align: 'center',
	                    verticalAlign: 'bottom'
	                }
	            }
	        }]
	    }

	};
let chartDataJson2 = {
		chart: {
	        height: 400,
	    },
	    title: {
	        text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
	        align: 'left'
	    },

	    subtitle: {
	        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
	        align: 'left'
	    },

	    yAxis: {
	        title: {
	            text: 'Number of Employees'
	        }
	    },

	    xAxis: {
	        accessibility: {
	            rangeDescription: 'Range: 2010 to 2020'
	        }
	    },

	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },

	    plotOptions: {
	        series: {
	            label: {
	                connectorAllowed: false
	            },
	            pointStart: 2010
	        }
	    },

	    series: [{
	        name: 'Installation & Developers',
	        data: [43934, 48656, 65165, 81827, 112143, 142383,
	            171533, 165174, 155157, 161454, 154610]
	    }, {
	        name: 'Manufacturing',
	        data: [24916, 37941, 29742, 29851, 32490, 30282,
	            38121, 36885, 33726, 34243, 31050]
	    }, {
	        name: 'Sales & Distribution',
	        data: [11744, 30000, 16005, 19771, 20185, 24377,
	            32147, 30912, 29243, 29213, 25663]
	    }, {
	        name: 'Operations & Maintenance',
	        data: [null, null, null, null, null, null, null,
	            null, 11164, 11218, 10077]
	    }, {
	        name: 'Other',
	        data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
	            17300, 13053, 11906, 10073]
	    }],

	    responsive: {
	        rules: [{
	            condition: {
	                maxWidth: 500
	            },
	            chartOptions: {
	                legend: {
	                    layout: 'horizontal',
	                    align: 'center',
	                    verticalAlign: 'bottom'
	                }
	            }
	        }]
	    }

	};
let chartDataJson3 = {
		chart: {
	        height: 600,
	    },
	    title: {
	        text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
	        align: 'left'
	    },

	    subtitle: {
	        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
	        align: 'left'
	    },

	    yAxis: {
	        title: {
	            text: 'Number of Employees'
	        }
	    },

	    xAxis: {
	        accessibility: {
	            rangeDescription: 'Range: 2010 to 2020'
	        }
	    },

	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle'
	    },

	    plotOptions: {
	        series: {
	            label: {
	                connectorAllowed: false
	            },
	            pointStart: 2010
	        }
	    },

	    series: [{
	        name: 'Installation & Developers',
	        data: [43934, 48656, 65165, 81827, 112143, 142383,
	            171533, 165174, 155157, 161454, 154610]
	    }, {
	        name: 'Manufacturing',
	        data: [24916, 37941, 29742, 29851, 32490, 30282,
	            38121, 36885, 33726, 34243, 31050]
	    }, {
	        name: 'Sales & Distribution',
	        data: [11744, 30000, 16005, 19771, 20185, 24377,
	            32147, 30912, 29243, 29213, 25663]
	    }, {
	        name: 'Operations & Maintenance',
	        data: [null, null, null, null, null, null, null,
	            null, 11164, 11218, 10077]
	    }, {
	        name: 'Other',
	        data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
	            17300, 13053, 11906, 10073]
	    }],

	    responsive: {
	        rules: [{
	            condition: {
	                maxWidth: 500
	            },
	            chartOptions: {
	                legend: {
	                    layout: 'horizontal',
	                    align: 'center',
	                    verticalAlign: 'bottom'
	                }
	            }
	        }]
	    }

	};
Highcharts.chart('container1', chartDataJson3);
Highcharts.chart('container2', chartDataJson1);
Highcharts.chart('container3', chartDataJson1);
Highcharts.chart('container4', chartDataJson2);
Highcharts.chart('container5', chartDataJson3);
Highcharts.chart('container6', chartDataJson1);
Highcharts.chart('container7', chartDataJson2);
Highcharts.chart('container8', chartDataJson3);
Highcharts.chart('container9', chartDataJson2);
Highcharts.chart('container10', chartDataJson1);

</script>

<%
} catch(Exception e) {
	e.printStackTrace();
	throw e;
}
%>