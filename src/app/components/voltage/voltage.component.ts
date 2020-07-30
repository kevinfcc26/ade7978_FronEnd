import { Component, OnInit } from '@angular/core';

import { RegistersService } from '../../services/registers.service';
import { Chart } from '../../models/chartModel';

import * as Highcharts from 'highcharts';
let inter: any;
let faseA: any;
let faseB: any;
let faseC: any;

@Component({
  selector: 'app-voltage',
  templateUrl: './voltage.component.html',
  styleUrls: ['./voltage.component.css']
})
export class VoltageComponent implements OnInit {
  
  public charts: Chart[] = [new Chart(), new Chart(), new Chart()];

  constructor(private registers: RegistersService) {
    this.charts[0].title = 'Fase A';
    this.charts[1].title = 'Fase B';
    this.charts[2].title = 'Fase C';

   }

  ngOnInit(): void {
    faseA = Highcharts.chart('fase A', this.options(this.charts[0]));
    faseB = Highcharts.chart('fase B', this.options(this.charts[1]));
    faseC = Highcharts.chart('fase C', this.options(this.charts[2]));
    Highcharts.chart('donutA', this.options2({name:'hola'}));
    Highcharts.chart('donutB', this.options2({name:'hola'}));
    Highcharts.chart('donutC', this.options2({name:'hola'}));
    
    this.getRegister();
    inter = setInterval(() => {
      this.getRegister();
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(inter);
  }
  async getRegister(){
    let date;
    await this.registers.getRegistersVol().subscribe(( data: any ) => {
      // console.log(data);
      for ( let item in data ){
        date = new Date(data[item]['DATETIME']);
        const series = faseA.series[0],
            shift = series.data.length > 20;
        faseA.series[0].addPoint([date,parseFloat( data[item]['AVRMS'])],false, shift);
        faseA.series[1].addPoint([date,parseFloat( data[item]['AFVRMS'])],false, shift);
        faseB.series[0].addPoint([date,parseFloat( data[item]['BVRMS'])],false, shift);
        faseB.series[1].addPoint([date,parseFloat( data[item]['BFVRMS'])],false, shift);
        faseC.series[0].addPoint([date,parseFloat( data[item]['CVRMS'])],false, shift);
        faseC.series[1].addPoint([date,parseFloat( data[item]['CFVRMS'])],false, shift);
        if (item === '49') {
                faseA.series[2].addPoint([date,parseFloat( data[item]['AVHRMS_CAL'])],true, shift);
                faseB.series[2].addPoint([date,parseFloat( data[item]['BVHRMS_CAL'])],true, shift);
                faseC.series[2].addPoint([date,parseFloat( data[item]['CVHRMS_CAL'])],true, shift);
              } else {
                faseA.series[2].addPoint([date,parseFloat( data[item]['AVHRMS_CAL'])],false, shift);
                faseB.series[2].addPoint([date,parseFloat( data[item]['BVHRMS_CAL'])],false, shift);
                faseC.series[2].addPoint([date,parseFloat( data[item]['CVHRMS_CAL'])],false, shift);
              }
       
      }
      console.log(faseA);
      
    });
  }

  options(chart: Chart): any{
    return  {
      title: {
        text: chart.title
      },
      subtitle: {
        text: 'Linea'
      },
      yAxis: {
        title: {
            text: 'Voltaje'
        }
      },
      xAxis: {
        title: {
          text: 'tiempo'
        },
        type: 'datetime',
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        series: {
            label: {
                connectorAllowed: true
            }
        }
      },
      series: [
        {
          name : 'V rms'
        },
        {
          name: 'V1 rms'
        },{
          name: 'VH rms'
        }
    ],
  
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
  }
  options2(chart:any): any{
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'hola',
        align: 'center',
        verticalAlign: 'middle',
        y: 60
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'black'
                }
            },
            startAngle: 0,
            endAngle: 0,
            // center: ['50%', '75%'],
            // size: '110%'
        }
    },
    series: [{
        type: 'pie',
        name: 'hola',
        innerSize: '50%',
        data: [
            ['Chrome', 20],
            // {
            //     name: 'Other',
            //     y: 7.61,
            //     dataLabels: {
            //         enabled: false
            //     }
            // }
        ]
    }]
    }
  }


}
