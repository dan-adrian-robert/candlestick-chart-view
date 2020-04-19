export class DataStockMapper {

  constructor() {

  }

  getDataSeries(data) {
    const stockData = data['Time Series (5min)'];
    const res = [];
    for (const key in stockData) {
      if (key) {
        const value = stockData[key];
        const ySeries = [
          value['1. open'],
          value['2. high'],
          value['3. low'],
          value['4. close'],
        ];

        const point = {
          x:  new Date(key),
          y: ySeries
        };

        res.push(point);
      }
    }

    return res;
  }

  getDataTimeline(data) {
    const stockData = data['Time Series (5min)'];
    const res = {
      xaxis: {
        min: 0,
        max: 0
      },
      dataSeries: []
    };



    for (const key in stockData) {
      if (key) {
        const value = stockData[key];
        const point = {
          x:  new Date(key),
          y: value['5. volume']
        };

        res.dataSeries.push(point);
      }
    }

    return res;
  }
}
