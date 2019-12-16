<template>
  <div class="bh-100">
    <div class="chart-wrap" ref="estate"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myChart: null,
      mTime:null,
      b_age_aboard: {
        name: ['工商管理', '金融学', '英语'],
        value: [1419, 1326, 1412]
      },
      totalValue:0
    }
  },
  props: ["config", "initData"],
  mounted () {
    this.init();
  },
  beforeDestroy () {
    this.myChart.dispose();
    clearInterval(this.mTime)
  },
  components: {},
  methods: {
    init () {
        // console.log(this.initData);
      if (this.initData) {
        // debugger
        if(this.config.ispercent){
            this.sum(this.initData.value);
            this.percent(this.initData.value);
        }

        this.estateChart("estate", this.initData);
      } else {
        this.estateChart("estate", this.b_age_aboard);
      }

    },
    sum(arr) {
        arr.forEach((val, idx, arr)=> {
            this.totalValue += parseInt(val);
        }, 0);
        return this.totalValue;
    },
    percent(){
            this.initData.value=this.initData.value.map((val, idx)=>{
                return ((parseInt(val)/this.totalValue)*100).toFixed(2);
            })
    },
    estateChart (id, data) {
      // debugger
      this.myChart = this.$echarts.init(this.$refs.estate);

      let option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
            left: this.config.left,
            right: this.config.right,
            top: this.config.top,
            bottom: this.config.bottom,
        },
        xAxis: [{
          type: 'category',
          data: data.name ? data.name : ['工作票', '操作票', '抢修', '用电调查', '设备巡视', '现场勘查', '到岗到位'],
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          },
          axisLabel: {
            margin: 10,
            color: '#e2e9ff',
            textStyle: {
              fontSize: 12,
              
            },
            rotate:35,
            // padding:[10,0,0,0],
            formatter: (value) => {
              // if (this.config.Xlabel_v) {
              //     return value;
              // }
              //   if (value.length > 5) {
              //       return value.substring(0, 5).split("").join("\n") + "\n.";
              //   } else {
              //       return value.split("").join("\n");
              //   }
                return value
            }
          },
          // label:{
          //   normal:{
          //     rotate:45,
          //   }
          // }
          
        }],
        yAxis: [{
          axisLabel: {
            formatter: '{value}',
            color: '#e2e9ff',
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.12)'
            }
          }
        }],
        series: [{
          type: 'bar',
          data: data.value ? data.value : [300, 450, 770, 203, 255, 188, 156],
          barWidth: this.config.barWidth,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.config.bar_color_l ? this.config.bar_color_l : 'rgba(0,244,255,1)' // 0% 处的颜色
              }, {
                offset: 1,
                color: this.config.bar_color_r ? this.config.bar_color_r : 'rgba(0,77,167,1)' // 100% 处的颜色
              }], false),
              barBorderRadius: [30, 30, 30, 30],
              shadowColor: 'rgba(0,160,221,1)',
              shadowBlur: 4,
            }
          },
          label: {
            normal: {
              show: true,
              lineHeight: 30,
              width: 80,
              height: 30,
              // backgroundColor: 'rgba(0,160,221,0.1)',
              borderRadius: 200,
              position: 'top',
              distance: 1,
              
              formatter: this.config.ispercent?'{c}%':"{c}",
              color:"#fff"
            }
          }
        }]
      };
      this.myChart.setOption(option);
      // var index = 0; //播放所在下标
			// 	this.mTime = setInterval(()=> {
			// 		this.myChart.dispatchAction({
			// 			type: 'showTip',
			// 			seriesIndex: 0,
			// 			dataIndex: index
			// 		});
			// 		index++;
			// 		if(index >= data.name.length) {
			// 			index = 0;
			// 		}
			// 	}, 4500);

      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
  }
}
</script>

<style scoped>
</style>