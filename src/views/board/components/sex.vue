<template>
  <div class="bh-100 chart_content">
    <div class="role elastic">
      <div class="man elastic">
        <div class="man_wrap">
          <p>男: {{initData.man.number}} 人</p>
          <p class="man_value">占比: {{initData.man.percentage}}</p>
        </div>
        <div>
          <img src="../../..//assets/img/man.png" alt="">
        </div>
      </div>
      <div class="women elastic">
        <div>
          <img src="../../..//assets/img/women.png" alt="">
        </div>
        <div class="women_wrap">
          <p>女: {{initData.woman.number}} 人</p>
          <p class="women_value">占比: {{initData.woman.percentage}}</p>
        </div>
      </div>
    </div>
    <div class="bill"><span class="man_bar" :style="{width:initData.man.percentage}"></span><span class="women_bar"
        :style="{width:initData.woman.percentage}"></span>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: ["config", 'initData'],
        mounted() {},
        beforeDestroy() {},
        components: {},
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .chart_content {
        padding: 20% 13% 0 13%;
    }
    
    .elastic {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
    }
    
    .role {
        color: #fff;
        .man {
            .man_value {
                font-size: 18px;
                margin-top: 10px;
                background-image: linear-gradient(to right, #1759ff, #52bded);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .man_wrap {
                height: 100%;
                margin-right: 10px;
            }
        }
        .women {
            .women_value {
                font-size: 18px;
                margin-top: 10px;
                background-image: linear-gradient(to right, #f7418c, #fbbb66);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .women_wrap {
                height: 100%;
                margin-left: 10px;
            }
        }
    }
    
    .bill {
        width: 100%;
        span {
            display: inline-block;
            height: 12px;
            vertical-align: middle;
        }
        .man_bar {
            background: linear-gradient(to right, #1759ff, #52bded);
        }
        .women_bar {
            background: linear-gradient(to right, #f7418c, #fbbb66);
        }
    }
</style>