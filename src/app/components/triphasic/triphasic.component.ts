import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../../services/registers.service';
import { Chart, series } from '../../models/chartModel';

import * as Highcharts from 'highcharts';

let inter: any;
let voltage: any;
let current: any;
let voltageLineToLine: any;
let activePower: any;
let reactivePower: any;
let aparentPower: any;
let thd: any;
let distortion: any;
let pf: any;

@Component({
  selector: 'app-triphasic',
  templateUrl: './triphasic.component.html',
  styleUrls: ['./triphasic.component.css']
})
export class TriphasicComponent implements OnInit {

  public charts: Chart[] = [new Chart(), new Chart(), new Chart(), new Chart(), new Chart(), new Chart(), new Chart(), new Chart()];

  constructor(private registers: RegistersService) {
    this.charts[0].title = 'Voltaje efectivo';
    this.charts[0].yAxis = 'Voltios';
    this.charts[0].series[0] = new series('VE rms');
    this.charts[0].series[1] = new series('VE1 rms');
    this.charts[0].series[2] = new series('VEH rms');
    this.charts[1].title = 'Corriente efectiva';
    this.charts[1].yAxis = 'Amperios';
    this.charts[1].series[0] = new series('IE rms');
    this.charts[1].series[1] = new series('IE1 rms');
    this.charts[1].series[2] = new series('IEH rms');
    this.charts[2].title = 'Voltaje efectivo entre lineas';
    this.charts[2].yAxis = 'Voltios';
    this.charts[2].series[0] = new series('VAB rms');
    this.charts[2].series[1] = new series('VAB1 rms');
    this.charts[2].series[2] = new series('VABH rms');
    this.charts[2].series[3] = new series('VBC rms');
    this.charts[2].series[4] = new series('VBC1 rms');
    this.charts[2].series[5] = new series('VBCH rms');
    this.charts[2].series[6] = new series('VCA rms');
    this.charts[2].series[7] = new series('VCA1 rms');
    this.charts[2].series[8] = new series('VCAH rms');
    this.charts[3].title = 'Potencia efectiva activa';
    this.charts[3].yAxis = 'Watts°';
    this.charts[3].series[0] = new series('WE rms');
    this.charts[3].series[1] = new series('WEH rms');
    this.charts[4].title = 'Potencia efectiva aparente';
    this.charts[4].yAxis = 'VA'
    this.charts[4].series[0] = new series('SE rms');
    this.charts[4].series[1] = new series('SE1 rms');
    this.charts[4].series[2] = new series('SEH rms');
    this.charts[4].series[3] = new series('SEN rms');
    this.charts[5].title = 'THDs efectivos';
    this.charts[5].yAxis = '%';
    this.charts[5].series[0] = new series('THDEI');
    this.charts[5].series[1] = new series('THDEV');
    this.charts[6].title = 'Distorciones efectivas';
    this.charts[6].series[0] = new series('DEH');
    this.charts[6].series[1] = new series('DEI');
    this.charts[6].series[2] = new series('DEV');
    this.charts[7].title = 'Factor de potencia';
    this.charts[7].series[0] = new series('PFE');

   }

  ngOnInit(): void {
    voltage = Highcharts.chart('voltage', this.options(this.charts[0]));
    current = Highcharts.chart('current', this.options(this.charts[1]));
    voltageLineToLine = Highcharts.chart('voltageLineToLine', this.options(this.charts[2]));
    activePower = Highcharts.chart('activePower', this.options(this.charts[3]));
    aparentPower = Highcharts.chart('aparentPower', this.options(this.charts[4]));
    thd = Highcharts.chart('thd', this.options(this.charts[5]));
    distortion = Highcharts.chart('distortion', this.options(this.charts[6]));
    pf = Highcharts.chart('pf', this.options(this.charts[7]));
    
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
    await this.registers.getRegistersPowerTripasic().subscribe(( data: any ) => {
      console.log(data);
      for ( let item in data ){
        date = new Date(data[item]['DATETIME']);
        const series = voltage.series[0],
            shift = series.data.length > 1;
        voltage.series[0].addPoint([date,parseFloat( data[item]['VE_CAL'])],false, shift);
        voltage.series[1].addPoint([date,parseFloat( data[item]['VE1_CAL'])],false, shift);
        current.series[0].addPoint([date,parseFloat( data[item]['IE_CAL'])],false, shift);
        current.series[1].addPoint([date,parseFloat( data[item]['IE1_CAL'])],false, shift);
        voltageLineToLine.series[0].addPoint([date,parseFloat( data[item]['VAB_CAL'])],false, shift);
        voltageLineToLine.series[1].addPoint([date,parseFloat( data[item]['VAB1_CAL'])],false, shift);
        voltageLineToLine.series[2].addPoint([date,parseFloat( data[item]['VABH_CAL'])],false, shift);
        voltageLineToLine.series[3].addPoint([date,parseFloat( data[item]['VBC_CAL'])],false, shift);
        voltageLineToLine.series[4].addPoint([date,parseFloat( data[item]['VBC1_CAL'])],false, shift);
        voltageLineToLine.series[5].addPoint([date,parseFloat( data[item]['VBCH_CAL'])],false, shift);
        voltageLineToLine.series[6].addPoint([date,parseFloat( data[item]['VCA_CAL'])],false, shift);
        voltageLineToLine.series[7].addPoint([date,parseFloat( data[item]['VCA1_CAL'])],false, shift);
        activePower.series[0].addPoint([date,parseFloat( data[item]['PE_CAL'])],false, shift);
        aparentPower.series[0].addPoint([date,parseFloat( data[item]['SE_CAL'])],false, shift);
        aparentPower.series[1].addPoint([date,parseFloat( data[item]['SE1_CAL'])],false, shift);
        aparentPower.series[2].addPoint([date,parseFloat( data[item]['SEH_CAL'])],false, shift);
        thd.series[0].addPoint([date,parseFloat( data[item]['THDEI_CAL'])*100],false, shift);
        distortion.series[0].addPoint([date,parseFloat( data[item]['DEH_CAL'])],false, shift);
        distortion.series[1].addPoint([date,parseFloat( data[item]['DEI_CAL'])],false, shift);
        
        
        if (item === '49') {
          voltage.series[2].addPoint([date,parseFloat( data[item]['VEH_CAL'])],true, shift);
          current.series[2].addPoint([date,parseFloat( data[item]['IEH_CAL'])],true, shift);
          voltageLineToLine.series[8].addPoint([date,parseFloat( data[item]['VCAH_CAL'])],true, shift);
          activePower.series[1].addPoint([date,parseFloat( data[item]['PEH_CAL'])],true, shift);
          aparentPower.series[3].addPoint([date,parseFloat( data[item]['SEN_CAL'])],true, shift);
          thd.series[1].addPoint([date,parseFloat( data[item]['THDEV_CAL'])*100],true, shift);
          distortion.series[2].addPoint([date,parseFloat( data[item]['DEV_CAL'])],true, shift);
          pf.series[0].addPoint([date,parseFloat( data[item]['PFE_CAL'])],true, shift);
          
        } else {
          voltage.series[2].addPoint([date,parseFloat( data[item]['VEH_CAL'])],false, shift);
          current.series[2].addPoint([date,parseFloat( data[item]['IEH_CAL'])],false, shift);
          voltageLineToLine.series[8].addPoint([date,parseFloat( data[item]['VCAH_CAL'])],false, shift);
          activePower.series[1].addPoint([date,parseFloat( data[item]['PEH_CAL'])],false, shift);
          aparentPower.series[3].addPoint([date,parseFloat( data[item]['SEN_CAL'])],false, shift);
          thd.series[1].addPoint([date,parseFloat( data[item]['THDEV_CAL'])*100],false, shift);
          distortion.series[2].addPoint([date,parseFloat( data[item]['DEV_CAL'])],false, shift);
          pf.series[0].addPoint([date,parseFloat( data[item]['PFE_CAL'])],false, shift);
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
