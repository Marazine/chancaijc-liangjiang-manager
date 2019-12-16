<template>
  <div class="bh-100 my-box-echart">
    <div class="title my-title">{{title}}</div>
    <div class="my-tip">
        <div class="my-tip-click" :class="isClass" @click="myEchartDataChange('one')">重点产业分布</div>
        <div class="my-tip-click" :class="isClass2" @click="myEchartDataChange('two')">行业分布</div>
    </div>
    <div class="s-content" ref="spreadMap" :style="{paddingTop:config.paddingTop?config.paddingTop:''}"></div>
    <map-dialog v-if="showDialog" :show='true' :configTip="configTip" :checkData='checkData' :children='children' :height='height' @close='closeDialog()'></map-dialog>
  </div>
</template>

<script>
    import mapDialog from "./mapDialog"
    export default {
        data() {
            return {
                myChart:null,
                checkData: null,
                height:0,
                children:null,
                showDialog:false,
                gsfbqk: [],
                configTip: {
                    title: '重点产业分布',
                    percentage: false,
                    yData: false,
                },
                isClass: 'my-color',
                isClass2: 'my-color2',
            }
        },
        computed: {

        },
        props: ['initmapData', 'mapData', 'mapData2', 'title', 'config'],
        mounted() {
            this.gsfbqk = this.mapData;
            // this.spreadMapChart("spreadMap",this.initmapData, this.gsfbqk);
            this.spreadMapChart("spreadMap",this.initmapData, this.mapData);
        },
        activated() {

        },
        beforeDestroy() {
            this.myChart.dispose();
        },
        components: {
            mapDialog
        },
        methods: {
            myEchartDataChange(type) {
                if(type == 'one') {
                    this.spreadMapChart("spreadMap",this.initmapData, this.mapData);
                    this.configTip.title = '重点产业分布';
                    this.isClass = 'my-color';
                    this.isClass2 = 'my-color2';
                } else if(type == 'two') {
                    this.spreadMapChart("spreadMap",this.initmapData, this.mapData2);
                    this.configTip.title = '行业分布';
                    this.isClass = 'my-color2';
                    this.isClass2 = 'my-color';
                }
            },
            closeDialog(){
                this.showDialog = false;
            },
            spreadMapChart(id, initData, data) {
                this.$echarts.registerMap("ns",initData)
                //初始化echarts实例
                this.myChart = this.$echarts.init(this.$refs.spreadMap);
                /*获取地图数据*/
                let geoCoordMap = {};
                this.myChart.showLoading();
                this.myChart.hideLoading();
                // 初始化option
                function getOptionMap(){
                    return {  
                        backgroundColor: 'transparent',  
                        title: {
                            x:'center'  
                        },  
                        tooltip : {  
                            trigger: 'item',
                            formatter: function(params){
                                return params.name + '<br/>' +
                                "企业数量：" + params.data.total;
                            },
                        },  
                        //左侧小导航图标
                        visualMap: {
                            show : false,  
                            color: ['#151d6e', '#151d6e', '#151d6e', '#151d6e', '#151d6e', '#151d6e', '#151d6e', '#151d6e', '#151d6e'],
                            borderColor: "#ffffff"
                        },  
                        //配置属性
                        series: [{
                            show: false,
                            type: 'map',  
                            mapType: 'ns',   
                            roam: false,  
                            itemStyle: {
                                normal: { 
                                    label: { show: true },
                                    borderWidth:2,
                                    borderColor:'#01eefa', 
                                },
                                emphasis: { label: { show: true } ,areaColor: '#2B91B7',color:'#ffffff'}
                            }, 
        　　　　　　　　　　　label: {
                                normal: {  
                                    textStyle: {
                                        // color: 'orange',
                                        color: '#ffffff'
                                    },
                                    fontSize: 14,
                                    formatter: function(params){
                                        return params.data.name;
                                    }
                                },
                                emphasis: { 
                                    textStyle: {color: '#fff'}
                                }
                        }, 
                            // data:convertData(data)  //数据
                            data: data //数据
                        }] 
                    };  
                }

                //使用制定的配置项和数据显示图表
                let optionMap = getOptionMap();
                this.myChart.setOption(optionMap);
                // $.ajax({
                //     type:"get",
                //     url:"http://img3.job1001.com/zhuanti/oAlcw/nsdboard/js/data.json",
                //     async:true,
                //     success:function(data){
                //         if(typeof data == "string"){
                //             data = JSON.parse(data);
                //         }
                //         console.log(data)
                //         mydatas = data;
                //         let optionMap = getOptionMap();
                //         myChart.setOption(optionMap);
                //     }
                // });
                let checkData ;
                let _this = this;
                this.myChart.on('click', (params)=>{
                    _this.checkData = params;
                    this.children = params.data.children;
                    this.height = this.children.name.length *35 +"px";
                    // let ele = $("<div>"+$("#model").html()+"</div>");
                    _this.showDialog = true;
                    // ele.find(".titleBox").text("南山区——"+params.data.fullname);
                    // ele.find('#content').css({"height":height,'width':"500px"});
                    // layui.use('layer', function(){
                    //     let layer = layui.layer;
                    //     let index = layer.open({
                    //         title:'',
                    //         content:ele.html(),
                    //         area:'auto',
                    //         btn:'',
                    //         closeBtn :0,
                    //         skin: 'model-class',
                    //         shadeClose :true,
                    //         success:function(){
                    //             $(".close").bind("click",function(){
                    //                 layer.close(index);
                    //             })
                    //             initEcharts('content',children);
                    //         }
                    //     });
                    // });     
                });
            }
        }
    }
</script>

<style scoped>
    .title{
        text-align: center;
        width: 100%;
        left: 0;
        top: 2%;
    }
    .my-title {
        font-size: 20px;
    }
    .my-box-echart {
        position: relative;
    }
    .my-tip {
        z-index: 1000;
        position: absolute;
        top: 40%;
        right: 5%;
        font-weight: 700;
        font-size: 16px;
    }
    .my-tip-click {
        cursor: pointer;
        position: relative;
    }
    .my-tip-click::after {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 50%;
        top: 4px;
        left: -20px;
    }
    .my-color {
        color: #00f2f1;
    }
    .my-color::after {
        background-color: #00f2f1;
    }
    .my-color2 {
        color: #069cff;
    }
    .my-color2::after {
        background-color: #069cff;
    }
    .map{
        /* margin-top: 16%; */
        /* height: 88%; */
        /* background: url(../../../assets/img/nsBg.png) no-repeat 10% center; */
        /* background-size: auto 75%; */
        /* width: 80% */
    }
</style>