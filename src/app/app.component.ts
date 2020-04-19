import {Component, ViewChild} from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {seriesData, seriesDataLinear} from './ohl';
import {DataStockService} from './data-stock.service';
import {DataStockMapper} from './data-stock-mapper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ts-ignore
  @ViewChild('chart') chart: ChartComponent;

  public chartCandleOptions: Partial<any>;
  public chartBarOptions: Partial<any>;

  public dataMapper: DataStockMapper = new DataStockMapper();
  public seriesData = [];
  public seriesLinearData;
  public showChart = false;

  constructor(private stockService: DataStockService) {

    this.stockService.getStockPrice().subscribe(
      (data) => {
        this.showChart = true;
        this.seriesData = this.dataMapper.getDataSeries(data);
        this.seriesLinearData = this.dataMapper.getDataTimeline(data);

        this.seriesLinearData.xaxis.min = this.seriesData[0].x;
        this.seriesLinearData.xaxis.max = this.seriesData.pop().x;

        this.chartCandleOptions = {
          series: [
            {
              name: 'candle',
              data: this.seriesData
            }
          ],
          chart: {
            type: 'candlestick',
            height: 290,
            id: 'candles',
            toolbar: {
              autoSelected: 'pan',
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          plotOptions: {
            candlestick: {
              colors: {
                upward: '#009900',
                downward: '#FF3333'
              }
            }
          },
          xaxis: {
            type: 'datetime'
          }
        };

        this.chartBarOptions = {
          series: [
            {
              name: 'volume',
              data: this.seriesLinearData.dataSeries
            }
          ],
          chart: {
            height: 160,
            type: 'bar',
            brush: {
              enabled: true,
              target: 'candles'
            },
            selection: {
              enabled: true,
              xaxis: this.seriesLinearData.xaxis,
              fill: {
                color: '#ccc',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1'
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            bar: {
              columnWidth: '80%',
              colors: {
                ranges: [
                  {
                    from: -1000,
                    to: 0,
                    color: '#F15B46'
                  },
                  {
                    from: 1,
                    to: 10000,
                    color: '#FEB019'
                  }
                ]
              }
            }
          },
          stroke: {
            width: 0
          },
          xaxis: {
            type: 'datetime',
            axisBorder: {
              offsetX: 13
            }
          },
          yaxis: {
            labels: {
              show: false
            }
          }
      };

        console.log(this.seriesLinearData);
      },
      (err) => {

      }
    );
  }
}
