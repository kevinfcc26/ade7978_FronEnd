import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../../services/registers.service';

import * as Highcharts from 'highcharts';

declare var require: any;
// let Boost = require('highcharts/modules/boost');
// let noData = require('highcharts/modules/no-data-to-display');
// let More = require('highcharts/highcharts-more');
let chart1: any;
let inter: any;

// Boost(Highcharts);
// noData(Highcharts);
// More(Highcharts);
// noData(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor(private registers: RegistersService) {}

  public options: any = {
    title: {
      text: 'Fase A'
    },
    // loading: {
    //   hideDuration: 0,
    //   showDuration: 0
    // },
    subtitle: {
      text: 'Linea A'
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
      type: 'datetime'
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
    series: [{
      name: 'AVRMS'
    },
    {
      name: 'AFVRMS'
    },
    {
      name: 'AVHRMS'
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
  }
  ngOnInit(): void {
    chart1 = Highcharts.chart('fase A', this.options);
    this.getRegister();
   inter = setInterval(() => {
      this.getRegister();
    }, 10000);
  }
  ngOnDestroy(): void {
    clearInterval(inter);
  }


  async getRegister(){
    await this.registers.getRegistersVol().subscribe( ( data: any ) => {
      console.log(data);
      for ( let item in data ){
          const series = chart1.series[0],
            shift = series.data.length > 20;
          chart1.series[0].addPoint(parseFloat( data[item]['AVRMS']),false, shift);
          chart1.series[1].addPoint(parseFloat( data[item]['AFVRMS']),false, shift);

          if (item === '49') {
            chart1.series[2].addPoint(parseFloat( data[item]['AVHRMS_CAL']),true, shift);
          } else {
            chart1.series[2].addPoint(parseFloat( data[item]['AVHRMS_CAL']),false, shift);
          }
      }
      console.log(chart1);
      
    });
  }
}
