<template>
    <div class="h-100 chartnew-wrap">
        <div class="h-100 table">
            <div class="titleTable clearfix">
                <div class="name">公司名称</div>
                <div class="gang">岗位名称</div>
            </div>
            <ul>
                <li class="clearfix" v-for="item in dataList" :key="item.id"  @mouseenter="mouseenter" @mouseout="run">
                    <div class="name">{{item.company}}</div class="name">
                    <div class="gang">{{item.position}}</div class="gang">
                </li>
            </ul>
        </div>
    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                interval: null,
                dataList: [{
                    company: '娃娃大无多哇多',
                    position: '你占我不占',
                    id: 1
                }, {
                    company: '娃娃大无多哇多',
                    position: '你占我不占',
                    id: 2
                }],
            }
        },
        props: ["initData", "config"],
        mounted() {
            if (this.initData) {
                this.dataList = this.initData
            }
            this.run();
            // this.init();
        },
        beforeDestroy() {},
        components: {},
        methods: {
            init() {

            },
            mouseenter() {
                if (this.interval) {
                    clearInterval(this.interval);
                    this.interval = null;
                }

            },
            run() {
                if (this.interval) {
                    clearInterval(this.interval);
                    this.interval = null;
                }
                this.interval = setInterval(() => {
                    let first = JSON.parse(JSON.stringify(this.dataList[0]));
                    let spliceArr = this.dataList.splice(1, this.dataList.length - 1);

                    this.dataList = spliceArr;
                    this.dataList.push(first);
                }, 3000);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .table {
        width: 80%;
        margin: 0 auto;
        padding-top: 5px;
        overflow: hidden;
        .titleTable {
            width: 100%;
            margin: 0 auto;
            background: #0c4685;
            height: 20px;
            line-height: 20px;
            div {
                float: left;
                color: #fff;
                font-size: 14px;
                padding: 0 15px;
            }
        }
        li {
            margin-top: 10px;
            height: 20px;
            line-height: 20px;
            cursor: pointer;
            transition: all 0.1s ease-in;
            div {
                float: left;
                color: #00ffff;
                font-size: 14px;
                padding: 0 15px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
            }
        }
        li:hover {
            background: #142667;
            div {
                color: #ffed88;
            }
        }
        .name {
            width: 65%;
        }
        .gang {
            width: 35%;
        }
    }
</style>