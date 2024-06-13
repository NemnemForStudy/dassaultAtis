function executeWidgetCode(){
	require([
		"UWA/Drivers/jQuery",
        "BTWWHighcharts/BTWWHighcharts",
		],function($, Highcharts){
		var myWidget = {
			onLoadWidget : function(){

                var wdgUrl = widget.getUrl();
                wdgUrl = wdgUrl.substring(0, wdgUrl.lastIndexOf("/"));
                widget.setIcon(wdgUrl + "/assets/icons/Chart.png");
				
				// bar, column, pie
//				myWidget.onOptionSave("pie");
				
				this.chartContainer = widget.createElement('div',{id:'chart', styles:{'height':'90%','overflow':'auto'} });
				
				var chartContainer = this.chartContainer;
				
				widget.body.empty();
				chartContainer.inject(widget.body);
				
				myWidget.renderChart();
			},
			onChartGrid: function(outSeriesData){
				renderChart jsonValue = outSeriesData;
				// new Chart
				new Highcharts.chart('container', {
				    title: {
				        text: 'U.S Solar Employment Growth',
				        align: 'left'
				    },
				
				    subtitle: {
				        text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
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
				
				});

			}
			
		};
		widget.addEvent("onLoad", myWidget.onLoadWidget);
        widget.addEvent("onRefresh", myWidget.onLoadWidget);
	});
}