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
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

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
    await this.registers.getRegistersCur().subscribe(( data: any ) => {
      console.log(data);
      for ( let item in data ){
        date = new Date(data[item]['DATETIME']);
        const series = faseA.series[0],
            shift = series.data.length > 0;
        faseA.series[0].addPoint([date,parseFloat( data[item]['AIRMS'])],false, shift);
        faseA.series[1].addPoint([date,parseFloat( data[item]['AFIRMS'])],false, shift);
        faseB.series[0].addPoint([date,parseFloat( data[item]['BIRMS'])],false, shift);
        faseB.series[1].addPoint([date,parseFloat( data[item]['BFIRMS'])],false, shift);
        faseC.series[0].addPoint([date,parseFloat( data[item]['CIRMS'])],false, shift);
        faseC.series[1].addPoint([date,parseFloat( data[item]['CFIRMS'])],false, shift);
        
        if (item === '49') {
          faseA.series[2].addPoint([date,parseFloat( data[item]['AIHRMS_CAL'])],true, shift);
          faseB.series[2].addPoint([date,parseFloat( data[item]['BIHRMS_CAL'])],true, shift);
          faseC.series[2].addPoint([date,parseFloat( data[item]['CIHRMS_CAL'])],true, shift);
          thdA.series[0].addPoint([date,parseFloat( data[item]['AITHD'])*100],true, shift);
          thdB.series[0].addPoint([date,parseFloat( data[item]['BITHD'])*100],true, shift);
          thdC.series[0].addPoint([date,parseFloat( data[item]['CITHD'])*100],true, shift);
        } else {
          faseA.series[2].addPoint([date,parseFloat( data[item]['AIHRMS_CAL'])],false, shift);
          faseB.series[2].addPoint([date,parseFloat( data[item]['BIHRMS_CAL'])],false, shift);
          faseC.series[2].addPoint([date,parseFloat( data[item]['CIHRMS_CAL'])],false, shift);
          thdA.series[0].addPoint([date,parseFloat( data[item]['AITHD'])*100],false, shift);
          thdB.series[0].addPoint([date,parseFloat( data[item]['BITHD'])*100],false, shift);
          thdC.series[0].addPoint([date,parseFloat( data[item]['CITHD'])*100],false, shift);
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
            text: 'Corriente'
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
          name : 'I rms'
        },
        {
          name: 'I1 rms'
        },{
          name: 'IH rms'
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
