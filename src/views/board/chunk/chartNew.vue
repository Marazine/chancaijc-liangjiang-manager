<template>
    <div class="back-img bh-100">
        
        <div class="title-new">
            <!-- <img src="~@/assets/img/arrow.png" alt=""> -->
            {{config&&config.title?config.title:'标题'}}
        </div>
        <div class="s-content">
            <PieC v-if="PieC" :initData="initData" :config="config"></PieC>
            <moreLine v-if="moreLine" :initData="initData" :config="config"></moreLine>
            <barOverlap v-if="barOverlap" :initData="initData" :config="config"></barOverlap>
            <barMore v-if="barMore" :initData="initData" :config="config"></barMore>
            <LineCh v-if="Line" :initData="initData" :config="config"></LineCh>
            <barNew v-if="barNew" :initData="initData" :config="config"></barNew>
            <chartTable v-if="chartTable" :initData="initData" :config="config"></chartTable>
            <PieNew v-if="PieNew" :initData="initData" :config="config"></PieNew>
            <manyPie v-if="manyPie" :initData="initData" :config="config"></manyPie>
            <barFillNew v-if="barFillNew" :initData="initData" :config="config"></barFillNew>
        </div>
    </div>
    </template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: ["initData", "config"],
        mounted() {},
        computed: {
            PieC() {
                return this.config.type == 'personEdu' || this.config.type == 'qyxz'
            },
            moreLine() {
                return this.config.type == 'jinyibuwanshan'
            },
            barOverlap() {
                return this.config.type == 'rencaishebao'
            },
            barMore() {
                return this.config.type == 'tigongzhichi'
            },
            Line() {
                return this.config.type == 'rcqk2'
            },
            barNew() {
                return this.config.type == 'bussinessFlow'
            },
            chartTable() {
                return this.config.type == 'rcxlxqfb'
            },
            PieNew() {
                return this.config.type == 'rencaixuqiu'
            },
            manyPie() {
                return this.config.type == 'rcldqk'
            },
            barFillNew() {
                return this.config.type == 'liangjiangtop10'
            },
        },
        beforeDestroy() {

        },
        components: {},
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .my-title-click {
        cursor: pointer;
    }
    
    .my-title,
    .my-title-click {
        left: 7% !important;
    }
</style>