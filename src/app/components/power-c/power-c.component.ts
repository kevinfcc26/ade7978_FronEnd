import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../../services/registers.service';
import { Chart, series } from '../../models/chartModel';

import * as Highcharts from 'highcharts';

let inter: any;
let p: any;
let q: any;
let s: any;
let angle: any;
let distortion: any;
let pf: any;
let n: any;

@Component({
  selector: 'app-power-c',
  templateUrl: './power-c.component.html',
  styleUrls: ['./power-c.component.css']
})
export class PowerCComponent implements OnInit {
  
  public charts: Chart[] = [new Chart(), new Chart(), new Chart(), new Chart(), new Chart(), new Chart(), new Chart()];

  constructor(private registers: RegistersService) {
    this.charts[0].title = 'Potencia Activa';
    this.charts[0].yAxis = 'Watts';
    this.charts[0].series[0] = new series('W rms');
    this.charts[0].series[1] = new series('W1 rms');
    this.charts[0].series[2] = new series('WH rms');
    this.charts[1].title = 'Potencia Reactiva';
    this.charts[1].yAxis = 'VAR';
    this.charts[1].series[0] = new series('Q rms');
    this.charts[2].title = 'Potencia Aparente';
    this.charts[2].yAxis = 'VA';
    this.charts[2].series[0] = new series('S rms');
    this.charts[2].series[1] = new series('S1 rms');
    this.charts[2].series[2] = new series('SH rms');
    this.charts[2].series[3] = new series('SN rms');
    this.charts[3].title = 'Angulo';
    this.charts[3].yAxis = 'Grados°';
    this.charts[3].series[0] = new series('Angle(°)');
    this.charts[4].title = 'Distorciones';
    this.charts[4].series[0] = new series('DH');
    this.charts[4].series[1] = new series('DI');
    this.charts[4].series[2] = new series('DV');
    this.charts[5].title = 'Factor de potencia';
    this.charts[5].series[0] = new series('PF');
    this.charts[5].series[1] = new series('PF1');
    this.charts[6].title = 'Nonfundamental';
    this.charts[6].series[0] = new series('N');

   }

  ngOnInit(): void {
    p = Highcharts.chart('p', this.options(this.charts[0]));
    q = Highcharts.chart('q', this.options(this.charts[1]));
    s = Highcharts.chart('s', this.options(this.charts[2]));
    angle = Highcharts.chart('angle', this.options(this.charts[3]));
    distortion = Highcharts.chart('distortion', this.options(this.charts[4]));
    pf = Highcharts.chart('pf', this.options(this.charts[5]));
    n = Highcharts.chart('n', this.options(this.charts[6]));
    
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
    await this.registers.getRegistersPowerC().subscribe(( data: any ) => {
      for ( let item in data ){
        date = new Date(data[item]['DATETIME']);
        const series = p.series[0],
            shift = series.data.length > 1;
        p.series[0].addPoint([date,parseFloat( data[item]['CWATT'])],false, shift);
        p.series[1].addPoint([date,parseFloat( data[item]['CP1_CAL'])],false, shift);
        s.series[0].addPoint([date,parseFloat( data[item]['CVA'])],false, shift);
        s.series[1].addPoint([date,parseFloat( data[item]['CS1_CAL'])],false, shift);
        s.series[2].addPoint([date,parseFloat( data[item]['CSH_CAL'])],false, shift);
        distortion.series[0].addPoint([date,parseFloat( data[item]['CDH_CAL'])],false, shift);
        distortion.series[1].addPoint([date,parseFloat( data[item]['CDI_CAL'])],false, shift);
        pf.series[0].addPoint([date,parseFloat( data[item]['CPF'])],false, shift);
        
        
        if (item === '49') {
          p.series[2].addPoint([date,parseFloat( data[item]['CPH_CAL'])],true, shift);
          q.series[0].addPoint([date,parseFloat( data[item]['CVAR'])],true, shift);
          s.series[3].addPoint([date,parseFloat( data[item]['CSN_CAL'])],true, shift);
          angle.series[0].addPoint([date,parseFloat( data[item]['ANGLE2'])],true, shift);
          distortion.series[2].addPoint([date,parseFloat( data[item]['CDV_CAL'])],true, shift);
          pf.series[1].addPoint([date,parseFloat( data[item]['CPF1_CAL'])],true, shift);
          n.series[0].addPoint([date,parseFloat( data[item]['CN_CAL'])],true, shift);
          
          
        } else {
          p.series[2].addPoint([date,parseFloat( data[item]['CPH_CAL'])],false, shift);
          q.series[0].addPoint([date,parseFloat( data[item]['CVAR'])],false, shift);
          s.series[3].addPoint([date,parseFloat( data[item]['CSN_CAL'])],false, shift);
          angle.series[0].addPoint([date,parseFloat( data[item]['ANGLE2'])],false, shift);
          distortion.series[2].addPoint([date,parseFloat( data[item]['CDV_CAL'])],false, shift);
          pf.series[1].addPoint([date,parseFloat( data[item]['CPF1_CAL'])],false, shift);
          n.series[0].addPoint([date,parseFloat( data[item]['CN_CAL'])],false, shift);
        }
      }
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
            text: chart.yAxis
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
      series: chart.series,
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
