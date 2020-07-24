import { Component, OnInit } from '@angular/core';
import { RegistersService } from '../../services/registers.service';


import * as Highcharts from 'highcharts';
import { ParsedVariable } from '@angular/compiler';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  title = 'my new chart';
  valuesx = [];
  valuesy = [];
  name: string = 'AIRSM';

  constructor(private registers: RegistersService) {}

  public options: any = {
    title: {
      text: 'Voltaje'
    },

    subtitle: {
      text: 'ADE7978'
    },

    yAxis: {
      title: {
          text: 'Voltaje'
      }
    },

    xAxis: {
      type: 'datetime',
      categories: this.valuesx
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
          }
      }
    },

    series: [{
      name: this.name,
      data: this.valuesy
    },
    {
      name: this.name,
      data: this.valuesy
    },
    {
      name: this.name,
      data: this.valuesy
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
  }

  ngOnInit(): void {
    this.getRegister();
    setInterval(() => {
      this.getRegister();
    }, 5000);
  }


  getRegister(){
    this.registers.getRegisters().subscribe( ( data: any ) => {
      for ( let item in data ){
        this.valuesy.push(parseFloat(data[item]['AIRMS']));
        this.valuesx.push(new Date(data[item]['DATETIME']));
      }
      Highcharts.chart('VA', this.options);
      Highcharts.chart('VB', this.options);
      Highcharts.chart('VC', this.options);
      this.valuesy.length = 0;
      this.valuesx.length = 0;
      console.log('done!');
    });
  }

}
