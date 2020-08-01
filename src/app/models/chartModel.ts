export class Chart {
    title: string;
    subtitle: string;
    datetime: Date[];
    series: series[];
    yAxis: string;
    constructor() {
        this.title = '';
        this.subtitle = '';
        this.datetime = [];
        this.series = [];
    }
}

export class series {
    name: string;
    data: Number[];
    constructor(name: string) {
        this.name = name;
        this.data = [];
    };
}

 // this.charts[0]['AVRMS'].push(  ));
        // this.charts[0]['AFRMS'].push( parseFloat( data['AFRMS'] ));
        // this.charts[0]['AFRMS'].push( parseFloat( data['AFRMS'] ));
         
         
      //     const series = chart1.series[0],
      //       shift = series.data.length > 20;
      //     chart1.series[0].addPoint(parseFloat( data[item]['AVRMS']),false, shift);
      //     chart1.series[1].addPoint(parseFloat( data[item]['AFVRMS']),false, shift);

      //     if (item === '49') {
      //       chart1.series[2].addPoint(parseFloat( data[item]['AVHRMS_CAL']),true, shift);
      //     } else {
      //       chart1.series[2].addPoint(parseFloat( data[item]['AVHRMS_CAL']),false, shift);
      //     }