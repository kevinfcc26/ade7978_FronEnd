import { Component, OnInit } from '@angular/core';

import { RegistersService } from '../../services/registers.service';
import { Chart } from '../../models/chartModel';

import * as Highcharts from 'highcharts';
let inter: any;
let faseA: any;
let faseB: any;
let faseC: any;
let thdA: any;
let thdB: any;
let thdC: any;

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
    thdA = Highcharts.chart('THD A', this.options2({name:'hola'}));
    thdB = Highcharts.chart('THD B', this.options2({name:'hola'}));
    thdC = Highcharts.chart('THD C', this.options2({name:'hola'}));
    
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
      for ( let item in data ){
        date = new Date(data[item]['DATETIME']);
        const series = faseA.series[0],
            shift = series.data.length > 1;
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
          thdA.series[0].addPoint([date,parseFloat( data[item]['AVTHD'])*100],true, shift);
          thdB.series[0].addPoint([date,parseFloat( data[item]['BVTHD'])*100],true, shift);
          thdC.series[0].addPoint([date,parseFloat( data[item]['CVTHD'])*100],true, shift);
        } else {
          faseA.series[2].addPoint([date,parseFloat( data[item]['AVHRMS_CAL'])],false, shift);
          faseB.series[2].addPoint([date,parseFloat( data[item]['BVHRMS_CAL'])],false, shift);
          faseC.series[2].addPoint([date,parseFloat( data[item]['CVHRMS_CAL'])],false, shift);
          thdA.series[0].addPoint([date,parseFloat( data[item]['AVTHD'])*100],false, shift);
          thdB.series[0].addPoint([date,parseFloat( data[item]['BVTHD'])*100],false, shift);
          thdC.series[0].addPoint([date,parseFloat( data[item]['CVTHD'])*100],false, shift);
        }
      }
        faseA.series[0].length = 0;
        faseA.series[1].length = 0;
        faseA.series[2].length = 0;
        faseB.series[0].length = 0;
        faseB.series[1].length = 0;
        faseB.series[2].length = 0;
        faseC.series[0].length = 0;
        faseC.series[1].length = 0;
        faseC.series[2].length = 0;
        thdA.series[0].length = 0;
        thdB.series[0].length = 0;
        thdC.series[0].length = 0;
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
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      yAxis: {
        title: {
            text: '%'
        }
      },
      xAxis: {
        title: {
          text: 'Tiempo'
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
          name : 'THD'
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


}
