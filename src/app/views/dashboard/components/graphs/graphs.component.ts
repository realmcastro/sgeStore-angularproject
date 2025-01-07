import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import * as echarts from 'echarts';
import { response } from 'express';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  constructor(private service: ApiService, private elementRef: ElementRef) {}

  body = {};
  chart: any;
  info: String = '';

  ngOnInit(): void {
    this.service.post('data/dataSale/', this.body).subscribe({
      next: (response: any) => {
        console.log('Dados recebidos:', response);
        this.initChart(response);
      },
      error: (error: any) => {
        console.error('Erro ao carregar os dados:', error);
      }
    });
  
  
  }

  initChart(data: any): void {
    const chartElement = this.elementRef.nativeElement.querySelector('#chart');
  
    const tryInitChart = (retryCount: number = 0) => {
      if (chartElement && chartElement.clientWidth > 0 && chartElement.clientHeight > 0) {
        this.chart = echarts.init(chartElement);
  
        const isMobile = window.innerWidth < 600;
  
        const option = {
          title: {
            text: data.title.text,
            show: false,
          },
          tooltip: {
            ...data.tooltip,
            formatter: (params: any) => {
              if (params.value) {
                return `${params.marker} ${params.seriesName}: R$${params.value.toFixed(2)}`;
              }
              return params.name;
            },
          },
          legend: {
            data: ['Total'].concat(data.legend.data),
            textStyle: {
              color: '#FFFFFF',
              fontSize: isMobile ? 13 : 16, // Aumenta o tamanho da fonte para telas maiores
            },
            itemWidth: isMobile ? 12 : 15, // Tamanho dos itens no legend
          },
          xAxis: {
            type: 'category',
            data: data.xAxis.data,
            axisLabel: {
              color: '#FFFFFF',
              interval: 0,
              rotate: isMobile ? 100 : 0, // Aumenta a legibilidade em telas pequenas
              fontSize: isMobile ? 11 : 14, // Aumenta o tamanho da fonte para telas maiores
            },
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#FFFFFF',
              },
            },
            ...(isMobile && {
              scrollbar: {
                show: true,
                type: 'slider',
                axis: 'x',
                itemWidth: 12,
              },
            }),
          },
          yAxis: {
            type: 'value',
            min: 0,
            axisLabel: {
              formatter: (value: number) => `R$${value.toFixed(2)}`,
              color: '#FFFFFF',
              fontSize: isMobile ? 13 : 15, // Aumenta o tamanho da fonte para telas maiores
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF',
              },
            },
            axisTick: {
              show: false,
            },
          },
          grid: {
            top: '15%',
            bottom: isMobile ? '20%' : '10%',
            left: isMobile ? '25%' : '7%', 
            right: isMobile ? '12%' : '4%',
          },
          series: [
            {
              name: 'Total',
              type: 'line',
              data: data.series[0].data,
              symbolSize: isMobile ? 7 : 10, // Aumenta o tamanho dos símbolos para telas grandes
              lineStyle: {
                color: '#FF5733',
                width: 2,
              },
              itemStyle: {
                color: '#FF5733',
              },
            },
            ...data.series.slice(1).map((seller: any) => ({
              name: seller.name,
              type: 'line',
              data: seller.data,
              symbolSize: isMobile ? 7 : 10, // Aumenta o tamanho dos símbolos para telas grandes
              lineStyle: {
                color: '#33C3FF',
                width: 2,
              },
              itemStyle: {
                color: '#33C3FF',
              },
            })),
          ],
        };
  
        this.chart.setOption(option);
  
        window.addEventListener('resize', () => {
          this.chart.resize();
        });
      } else if (retryCount < 10) {
        setTimeout(() => {
          tryInitChart(retryCount + 1);
        }, 100);
      } else {
        console.error('Chart container not available after retries.');
      }
    };
  
    tryInitChart();
  }
}  