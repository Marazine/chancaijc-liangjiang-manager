//金额范围
var op_money = [{
    value: "1",
    label: "0元及以下"
},
{
    value: "2",
    label: "1元~100万元"
},
{
    value: "3",
    label: "100万~500万元"
},
{
    value: "4",
    label: "500万~1000万元"
},
{
    value: "5",
    label: "1000万~2000万"
},
{
    value: "6",
    label: "2000万~5000万"
},
{
    value: "7",
    label: "5000万~1亿"
},
{
    value: "8",
    label: "1亿~10亿"
},
{
    value: "9",
    label: "10亿~100亿"
},
{
    value: "10",
    label: "100亿及以上"
}
];
//金额范围(c1-2)
var op_money1 = [
    {
        value: "1",
        label: "2k以下"
    },
    {
        value: "2",
        label: "2k-5k"
    },
    {
        value: "3",
        label: "5k-10k"
    },
    {
        value: "4",
        label: "10k-15k"
    },
    {
        value: "5",
        label: "15k-25k"
    },
    {
        value: "6",
        label: "25k-50k"
    },
    {
        value: "7",
        label: "50k以上"
    }
];
//金额范围(c2)
var op_money2 = [
    {
        value: "1",
        label: "10万以下"
    },
    {
        value: "2",
        label: "10万-30万"
    },
    {
        value: "3",
        label: "30万-50万"
    },
    {
        value: "4",
        label: "50万-70万"
    },
    {
        value: "5",
        label: "70万-100万"
    },
    {
        value: "6",
        label: "100万及以上"
    }
];
//人数范围
var op_member = [
    {
    value: "1",
    label: "1~49人"
}, {
    value: "2",
    label: "50~99人"
}, {
    value: "3",
    label: "100~499人"
}, {
    value: "4",
    label: "500~999人"
}, {
    value: "5",
    label: "1000~2000人"
}, {
    value: "6",
    label: "2000~5000人"
}, {
    value: "7",
    label: "5000~10000人"
}, {
    value: "8",
    label: "10000人以上"
}];
//年龄范围
var op_age = [
    {
    value: "1",
    label: "24岁及以下",
    children: op_member
}, {
    value: "2",
    label: "24岁~34岁",
    children: op_member
}, {
    value: "3",
    label: "35~44岁",
    children: op_member
}, {
    value: "4",
    label: "45岁及以上",
    children: op_member
}];
//性别分布
var op_sex = [
    {
    value: "1",
    label: "男"
}, {
    value: "2",
    label: "女"
}];
//学历分布
var op_edu = [
    {
    value: "1",
    label: "大专"
}, {
    value: "2",
    label: "本科"
}, {
    value: "3",
    label: "硕士"
}, {
    value: "4",
    label: "博士"
}, {
    value: "5",
    label: "在岗人才总数量"
}];
// 比例
var op_rate = [
    {
    value: "1",
    label: "小于等于2%"
}, {
    value: "2",
    label: "大于2%，小于等于5%"
}, {
    value: "3",
    label: "大于5%，小于等于10%"
}, {
    value: "4",
    label: "大于10%，小于等于15%"
}, {
    value: "5",
    label: "大于15%，小于等于20%"
}, {
    value: "6",
    label: "大于20%，小于等于30%"
}, {
    value: "7",
    label: "大于30%"
}];
var options = [
    {
        value: "A",
        label: "A、单位基本情况",
        children: [
            {
                value: "A1",
                label: "A1、单位注册信息",
                children: [{
                                value: "1",
                                label: "单位名称",
                                text: true
                            },
                            {
                                value: "2",
                                label: "法定代表人",
                                disabled: true
                            },
                            {
                                value: "3",
                                label: "联系电话",
                                disabled: true
                            },
                            {
                                value: "4",
                                label: "单位HR联系人",
                                disabled: true
                            },
                            {
                                value: "5",
                                label: "联系电话",
                                disabled: true
                            },
                            {
                                value: "6",
                                label: "Email	",
                                disabled: true
                            }
                        ]
            }, {
                value: "A2",
                label: "A2、单位总部所在地址",
                children: [{
                        value: "1",
                        label: "香洲区"
                    },
                    {
                        value: "2",
                        label: "金湾区"
                    },
                    {
                        value: "3",
                        label: "斗门区"
                    },
                    {
                        value: "4",
                        label: "横琴新区"
                    },
                    {
                        value: "5",
                        label: "高新区"
                    },
                    {
                        value: "6",
                        label: "高栏港区"
                    },
                    {
                        value: "7",
                        label: "保税区"
                    },
                    {
                        value: "8",
                        label: "万山区"
                    }
                ]
            },
            {
                value: "A3",
                label: "A3、单位性质",
                children: [{
                        value: "1",
                        label: "国有企业"
                    },
                    {
                        value: "2",
                        label: "集体企业"
                    },
                    {
                        value: "3",
                        label: "股份合作企业"
                    },
                    {
                        value: "4",
                        label: "联营企业"
                    },
                    {
                        value: "5",
                        label: "有限责任公司"
                    },
                    {
                        value: "6",
                        label: "股份有限公司"
                    },
                    {
                        value: "7",
                        label: "私营企业"
                    },
                    {
                        value: "8",
                        label: "港澳台投资企业"
                    },
                    {
                        value: "9",
                        label: "外商投资企业"
                    },
                    {
                        value: "10",
                        label: "个体经营"
                    },
                    {
                        value: "11",
                        label: "事业单位"
                    },
                    {
                        value: "12",
                        label: "机关单位"
                    },
                    {
                        value: "13",
                        label: "其它"
                    }
                ]
            },
            {
                value: "A4",
                label: "A4、单位所属行业类型",
                children: [
                    { value: "1", label: "农、林、牧、渔业" },
                    { value: "2", label: "采矿业" },
                    { value: "3", label: "制造业" },
                    { value: "4", label: "电力、热力、燃气及水的生产和供应业" },
                    { value: "5", label: "建筑业" },
                    { value: "6", label: "批发和零售业" },
                    { value: "7", label: "交通运输、仓储和邮政业" },
                    { value: "8", label: "住宿和餐饮业" },
                    { value: "9", label: "信息传输、软件和信息技术服务业" },
                    { value: "10", label: "金融业" },
                    { value: "11", label: "房地产业" },
                    { value: "12", label: "租赁和商务服务业" },
                    { value: "13", label: "科学研究和技术服务业" },
                    { value: "14", label: "水利、环境和公共设施管理业" },
                    { value: "15", label: "居民服务、修理和其他服务业" },
                    { value: "16", label: "教育/高校" },
                    { value: "17", label: "卫生、社会保障和社会福利业" },
                    { value: "18", label: "文化、体育和娱乐业" },
                    { value: "19", label: "公共管理和社会组织" },
                    { value: "20", label: "国际组织" }
                ]
            },
            {
                value: "A5",
                label: "A5、单位是否属于珠海市重点发展的产业",
                children: [
                    { value: "1", label: "电子信息产业" },
                    { value: "2", label: "家电电气产业" },
                    { value: "3", label: "电力能源产业" },
                    { value: "4", label: "生物制药产业" },
                    { value: "5", label: "石油化工产业" },
                    { value: "6", label: "精密机械产业" },
                    { value: "7", label: "新能源产业" },
                    { value: "8", label: "新一代信息技术产业" },
                    { value: "9", label: "新材料产业" },
                    { value: "10", label: "高端装备制造产业" },
                    { value: "11", label: "人工智能产业" },
                    { value: "12", label: "航空航天产业" },
                    { value: "13", label: "生物医药和大健康产业" },
                    { value: "14", label: "资源与环境产业" },
                    { value: "15", label: "高端旅游业" },
                    { value: "16", label: "海洋工程装备产业" },
                    { value: "17", label: "数字经济产业" },
                    { value: "18", label: "不属于珠海市重点发展的产业" }
                ]
            },
            {
                value: "A6",
                label: "A6、单位成立年限",
                children: [{
                        value: "1",
                        label: "1~3年"
                    },
                    {
                        value: "2",
                        label: "4~7年"
                    },
                    {
                        value: "3",
                        label: "8~10年"
                    },
                    {
                        value: "4",
                        label: "10年以上"
                    }
                ]
            },
            {
                value: "A7",
                label: "A7、单位上年度营业收入",
                children: op_money
            },
            {
                value: "A8",
                label: "A8、单位上年度纳税额",
                children: op_money
            },
            {
                value: "A9",
                label: "A9、单位上年度人工成本",
                children: op_money
            },
            {
                value: "A10_1",
                label: "A10_1、单位盈利情况(本年度)",
                children: [{
                        value: "1",
                        label: "持续盈利"
                    },
                    {
                        value: "2",
                        label: "扭亏为盈"
                    },
                    {
                        value: "3",
                        label: "亏损"
                    },
                    {
                        value: "4",
                        label: "持续亏损"
                    }
                ]
            },
            {
                value: "A10_2",
                label: "A10_2、单位盈利情况(预计下年度)",
                children: [{
                        value: "1",
                        label: "持续盈利"
                    },
                    {
                        value: "2",
                        label: "扭亏为盈"
                    },
                    {
                        value: "3",
                        label: "亏损"
                    },
                    {
                        value: "4",
                        label: "持续亏损"
                    }
                ]
            },
            {
                value: "A11",
                label: "A11、对单位生产经营影响最大的外部因素",
                children: [{
                        value: "1",
                        label: "国家的法律法规、国际公约等"
                    },
                    {
                        value: "2",
                        label: "国家与地方政府的政策、方针与导向等"
                    },
                    {
                        value: "3",
                        label: "国内外政治经济形势"
                    },
                    {
                        value: "4",
                        label: "行业规范、标准、准则"
                    },
                    {
                        value: "5",
                        label: ".社会环境与公众责任"
                    },
                    {
                        value: "6",
                        label: "市场环境与竞争，包括国际市场竞争"
                    },
                    {
                        value: "7",
                        label: "客户需求与反馈"
                    },
                    {
                        value: "8",
                        label: "其它"
                    },
                ]
            }

        ]

    },
    {
        value: "B",
        label: "B、单位人才现状",
        children: [
            {
                value: "B1_1",
                label: "B1_1、人员数量-在岗员工总数",
                children: op_member
            }, {
                value: "B1_2",
                label: "B1_2、人员数量-享受政府人才政策的人数",
                children: op_member
            }, {
                value: "B2_1",
                label: "B2_1、人才年龄、性别-年龄分布",
                children: op_age
            }, {
                value: "B2_2_1",
                label: "B2_2_1、人才年龄、性别-性别分布-男",
                children: op_member
            },{
                value: "B2_2_2",
                label: "B2_2_2、人才年龄、性别-性别分布-女",
                children: op_member
            },
            {
                value: "B3_1",
                label: "B3_1、人才户籍-珠海户籍人才",
                children: op_member
            },
            {
                value: "B3_2",
                label: "B3_2、人才户籍-省内市外户籍人才",
                children: op_member
            },
            {
                value: "B3_3",
                label: "B3_3、人才户籍-省外户籍人才",
                children: op_member
            },
            {
                value: "B3_4",
                label: "B3_4、人才户籍-港澳台地区人才",
                children: op_member
            },
            {
                value: "B3_5",
                label: "B3_5、人才户籍-外国国籍人才",
                children: op_member
            },
            {
                value: "B4",
                label: "B4、人才专业-单位核心部门或核心业务的人才专业",
                children: [
                    {
                        value: "1",
                        label: "哲学类 ",
                    },
                    {
                        value: "2",
                        label: "法学类",
                    },
                    {
                        value: "3",
                        label: "教育学类 ",
                    },
                    {
                        value: "4",
                        label: "经济学类",
                    },
                    {
                        value: "5",
                        label: "马克思主义理论类 ",
                    },
                    {
                        value: "6",
                        label: "社会学类",
                    },
                    {
                        value: "7",
                        label: "政治学类 ",
                    },
                    {
                        value: "8",
                        label: "新闻传播学类",
                    },
                    {
                        value: "9",
                        label: "历史学类 ",
                    },
                    {
                        value: "10",
                        label: "数学类",
                    },
                    {
                        value: "11",
                        label: "物理学类 ",
                    },
                    {
                        value: "12",
                        label: "化学类",
                    },
                    {
                        value: "13",
                        label: "生物科学类 ",
                    },
                    {
                        value: "14",
                        label: "天文学类",
                    },
                    {
                        value: "15",
                        label: "地质学类 ",
                    },
                    {
                        value: "16",
                        label: "地理科学类",
                    },
                    {
                        value: "17",
                        label: "大气科学类 ",
                    },
                    {
                        value: "18",
                        label: "海洋科学类",
                    },
                    {
                        value: "19",
                        label: "电子信息科学类 ",
                    },
                    {
                        value: "20",
                        label: "材料科学类",
                    },
                    {
                        value: "21",
                        label: "环境科学类 ",
                    },
                    {
                        value: "22",
                        label: "心理学类",
                    },
                    {
                        value: "23",
                        label: "统计学类 ",
                    },
                    {
                        value: "24",
                        label: "材料学类",
                    },
                    {
                        value: "25",
                        label: "机械类 ",
                    },
                    {
                        value: "26",
                        label: "电气信息类",
                    },
                    {
                        value: "27",
                        label: "土建类 ",
                    },
                    {
                        value: "28",
                        label: "水利类",
                    },
                    {
                        value: "29",
                        label: "交通运输类 ",
                    },
                    {
                        value: "30",
                        label: "航空航天类",
                    },
                    {
                        value: "31",
                        label: "医学类 ",
                    },
                    {
                        value: "32",
                        label: "管理科学与工程类",
                    },
                    {
                        value: "33",
                        label: "工商管理类",
                    },
                    {
                        value: "34",
                        label: "公共管理类",
                    },
                    {
                        value: "35",
                        label: "农学类 ",
                    },
                    {
                        value: "36",
                        label: "文学类",
                    },
                    {
                        value: "37",
                        label: "仪器仪表类 ",
                    },
                    {
                        value: "38",
                        label: "能源动力类",
                    },
                    {
                        value: "39",
                        label: "艺术类 ",
                    },
                    {
                        value: "40",
                        label: "体育类",
                    },
                    {
                        value: "41",
                        label: "其它",
                    }
                ]
            },
            {
                value: "B5_1",
                label: "B5_1、党建情况-是否有党支部/党委",
                children: [{
                        value: "1",
                        label: "是",
                    },
                    {
                        value: "2",
                        label: "否",
                    }
                ]
            },
            {
                value: "B5_2",
                label: "B5_2、党建情况-党员人数（包含预备党员）",
                children: op_member
            },
            {
                value: "B6_1",
                label: "B6_1、人才学历-在岗人才数量",
                children: [
                    {
                        value: "1",
                        label: "博士"
                    },
                    {
                        value: "2",
                        label: "硕士"
                    },
                    {
                        value: "3",
                        label: "本科"
                    },
                    {
                        value: "4",
                        label: "大专"
                    },
                    {
                        value: "5",
                        label: "高中/中专/中技及以下"
                    }
                ]
            },
            {
                value: "B6_2",
                label: "B6_2、人才学历-近一年人才需求数量",
                children: [
                    {
                        value: "1",
                        label: "博士"
                    },
                    {
                        value: "2",
                        label: "硕士"
                    },
                    {
                        value: "3",
                        label: "本科"
                    },
                    {
                        value: "4",
                        label: "大专"
                    },
                    {
                        value: "5",
                        label: "高中/中专/中技及以下"
                    }
                ]
            },
            {
                value: "B7_1",
                label: "B7_1、职称情况-在岗人才数量",
                children: [
                    {
                        value: "1",
                        label: "正高级"
                    },
                    {
                        value: "2",
                        label: "副高级"
                    },
                    {
                        value: "3",
                        label: "中级"
                    },
                    {
                        value: "4",
                        label: "初（助理）级"
                    },
                    {
                        value: "5",
                        label: "初（员级）级"
                    }
                ]
            },
            {
                value: "B7_2",
                label: "B7_2、职称情况-近一年人才需求数量",
                children: [
                    {
                        value: "1",
                        label: "正高级"
                    },
                    {
                        value: "2",
                        label: "副高级"
                    },
                    {
                        value: "3",
                        label: "中级"
                    },
                    {
                        value: "4",
                        label: "初（助理）级"
                    },
                    {
                        value: "5",
                        label: "初（员级）级"
                    }
                ]
            },
            {
                value: "B8_1",
                label: "B8_1、技能等级-在岗人才数量",
                children: [
                    {
                        value: "1",
                        label: "高级技师"
                    },
                    {
                        value: "2",
                        label: "技师"
                    },
                    {
                        value: "3",
                        label: "高级工"
                    },
                    {
                        value: "4",
                        label: "中级工"
                    },
                    {
                        value: "5",
                        label: "初级工"
                    },
                ]
            },
            {
                value: "B8_2",
                label: "B8_2、技能等级-近一年人才需求数量",
                children: [
                    {
                        value: "1",
                        label: "高级技师"
                    },
                    {
                        value: "2",
                        label: "技师"
                    },
                    {
                        value: "3",
                        label: "高级工"
                    },
                    {
                        value: "4",
                        label: "中级工"
                    },
                    {
                        value: "5",
                        label: "初级工"
                    },
                ]
            },
            {
                value: "B9_1",
                label: "B9_1、人才来源-在岗人才数量",
                children: [
                    {
                        value: "1",
                        label: "外籍人才"
                    },
                    {
                        value: "2",
                        label: "留学归国人才"
                    },
                    {
                        value: "3",
                        label: "国内应届毕业生"
                    },
                    {
                        value: "4",
                        label: "国内社会招聘人才"
                    }
                ]
            },
            {
                value: "B9_2",
                label: "B9_2、人才来源-近一年人才需求数量",
                children: [
                    {
                        value: "1",
                        label: "外籍人才"
                    },
                    {
                        value: "2",
                        label: "留学归国人才"
                    },
                    {
                        value: "3",
                        label: "国内应届毕业生"
                    },
                    {
                        value: "4",
                        label: "国内社会招聘人才"
                    }
                ]
            },
            {
                value: "B10_1",
                label: "B10_1、人才岗位类别-在岗人才数量",
                children: [
                    {
                        value: "1",
                        label: "管理岗"
                    },
                    {
                        value: "2",
                        label: "职能岗"
                    },
                    {
                        value: "3",
                        label: "营销岗"
                    },
                    {
                        value: "4",
                        label: "专业技术岗"
                    },
                    {
                        value: "5",
                        label: "生产岗"
                    },
                    {
                        value: "6",
                        label: "辅助岗"
                    },
                    {
                        value: "7",
                        label: "其它岗"
                    }
                ]
            },
            {
                value: "B10_2",
                label: "B10_2、人才岗位类别-近一年人才需求数量",
                children: [
                    {
                        value: "1",
                        label: "管理岗"
                    },
                    {
                        value: "2",
                        label: "职能岗"
                    },
                    {
                        value: "3",
                        label: "营销岗"
                    },
                    {
                        value: "4",
                        label: "专业技术岗"
                    },
                    {
                        value: "5",
                        label: "生产岗"
                    },
                    {
                        value: "6",
                        label: "辅助岗"
                    },
                    {
                        value: "7",
                        label: "其它岗"
                    }
                ]
            },
            {
                value: "B11_1_1",
                label: "B11_1_1、人才流动-人才流动情况-本年度新招人才数量",
                children: op_member
            },
            {
                value: "B11_1_2",
                label: "B11_1_2、人才流动-人才流动情况-本年度流失人才数量",
                children: op_member
            },
            {
                value: "B11_2",
                label: "B11_2、人才流动-近一年人才流动比例",
                children: [
                    {
                        value: "1",
                        label: "小于等于2%"
                    },
                    {
                        value: "2",
                        label: "大于2%，小于等于5%"
                    },
                    {
                        value: "3",
                        label: "大于5%，小于等于10%"
                    },
                    {
                        value: "4",
                        label: "大于10%，小于等于15%"
                    },
                    {
                        value: "5",
                        label: "大于15%，小于等于20%"
                    },
                    {
                        value: "6",
                        label: "大于20%，小于等于30%"
                    },
                    {
                        value: "7",
                        label: "大于30%"
                    }
                ]
            },
            
    {
        value: "B11_3_1",
        label: "B11_3_1、人才流动-近一年流失人才类型-高级管理人员",
        children: op_member
    },
    {
        value: "B11_3_2",
        label: "B11_3_2、人才流动-近一年流失人才类型-高级研发人员",
        children: op_member
    },
    {
        value: "B11_3_3",
        label: "B11_3_3、人才流动-近一年流失人才类型-高级技能人才",
        children: op_member
    },
    {
        value: "B11_3_4",
        label: "B11_3_4、人才流动-近一年流失人才类型-综合管理人员",
        children: op_member
    },
    {
        value: "B11_3_5",
        label: "B11_3_5、人才流动-近一年流失人才类型-普通工人",
        children: op_member
    },
            {
                value: "B11_5",
                label: "B11_5、人才流动-人才流失的主要原因",
                children: [
                    {
                        value: "1",
                        label: "工资待遇较低"
                    },
                    {
                        value: "2",
                        label: "生活成本高"
                    },
                    {
                        value: "3",
                        label: "内部上升空间有限"
                    },
                    {
                        value: "4",
                        label: "城市吸引力弱"
                    },
                    {
                        value: "5",
                        label: "行业吸引力下降"
                    },
                    {
                        value: "6",
                        label: "企业发展状况和前景"
                    },
                    {
                        value: "7",
                        label: "其它"
                    }
                ]
            },
            {
                value: "B12_1",
                label: "B12_1、人才缺口-未来一年最需要的人才类型",
                children: [
                    {
                        value: "1",
                        label: "企业经营管理人才"
                    },
                    {
                        value: "2",
                        label: "专业技术人才"
                    },
                    {
                        value: "3",
                        label: "高技能人才"
                    },
                    {
                        value: "4",
                        label: "金融人才"
                    },
                    {
                        value: "5",
                        label: "研发人才"
                    },
                    {
                        value: "6",
                        label: "创新创业人才"
                    },
                    {
                        value: "7",
                        label: "国际人才"
                    },
                    {
                        value: "8",
                        label: "营销人才"
                    },
                    {
                        value: "9",
                        label: "复合型人才"
                    },
                    {
                        value: "10",
                        label: "普通工人"
                    },
                    {
                        value: "11",
                        label: "不缺人才"
                    },
                    {
                        value: "12",
                        label: "其它"
                    }
                ]
            },

            {
                value: "B12_3",
                label: "B12_3、人才缺口-未来一年最需要的人才学历",
                children: [{
                        value: "1",
                        label: "没有学历限制"
                    },
                    {
                        value: "2",
                        label: "大专及以下"
                    },
                    {
                        value: "3",
                        label: "本科"
                    },
                    {
                        value: "4",
                        label: "硕士"
                    },
                    {
                        value: "5",
                        label: "博士"
                    },
                    {
                        value: "6",
                        label: "不缺人才"
                    }
                ]
            },
            {
                value: "B13_1",
                label: "B13_1、人才队伍建设-人才状况能否满足单位运作发展需要",
                children: [{
                        value: "1",
                        label: "人才过剩",
                    },
                    {
                        value: "2",
                        label: "刚好满足",
                    },
                    {
                        value: "3",
                        label: "勉强满足",
                    },
                    {
                        value: "4",
                        label: "不能满足",
                    },
                    {
                        value: "5",
                        label: "说不清",
                    }
                ]
            },
            {
                value: "B13_2",
                label: "B13_2、人才队伍建设-人才队伍建设存在的主要困难",
                children: [{
                        value: "1",
                        label: "暂时不存在困难",
                    },
                    {
                        value: "2",
                        label: "人才总量不足",
                    },
                    {
                        value: "3",
                        label: "人才结构不合理 ",
                    },
                    {
                        value: "4",
                        label: "缺乏高层次人才 ",
                    },
                    {
                        value: "5",
                        label: "缺乏高技能人才",
                    },
                    {
                        value: "6",
                        label: "缺乏复合型人才"
                    },
                    {
                        value: "7",
                        label: "人才流失严重"
                    },
                    {
                        value: "8",
                        label: "人才需求不清晰"
                    },
                    {
                        value: "9",
                        label: "缺乏有效的人才培养、激励手段"
                    },
                    {
                        value: "10",
                        label: "其它"
                    }
                ]
            }

        ]
        ,
    },
  {
        value: "C",
        label: "C、人才招聘与培养",
        children: [
            {
                value: "C1_1",
                label: "C1_1、单位人才引进计划（不含应届高校毕业生",
                children: [
                    {
                        value: '1',
                        label: "本年度新引进人才数量",
                        children: op_member
                    },
                    {
                        value: '2',
                        label: "下年度预计引进人才数量",
                        children: op_member
                    }
                ]
            },
             {
                value: "C1_2",
                label: "C1_2、单位高校应届毕业生引进计划",
                children: [
                    {
                        value: '1',
                        label: "本年度新引进应届高校毕业生数量",
                        children: op_member
                    },
                    {
                        value: '2',
                        label: "目前引进高校毕业生人均工资水平（元/月）",
                        children: op_money1
                    },
                    {
                        value: '3',
                        label: "下年度预计引进应届毕业生数量",
                        children: op_member
                    }
                ]
            }, {
            value: "C2_1",
            label: "C2_1、单位人才招聘费用预算-",
            children: [
              {
                value: "1",
                label: "本年度人才招聘费用预算（单位：元）",
                children: op_money2
              },
              {
                value: "2",
                label: "下年度人才招聘费用预算（单位：元）",
                children: op_money2
              }
            ]
          },
          {
            value: "C2_2",
            label: "C2_2、单位人才培养费用预算-",
            children: [
              {
                value: "1",
                label: "本年度人才培养费用预算（单位：元）",
                children: op_money2
              },
              {
                value: "2",
                label: "下年度人才培养费用预算（单位：元）",
                children: op_money2
              }
            ]
          },
         {
            value: 'C3',
            label: 'C3、单位引进人才的难易程度',
            children: [{
                    value: "1",
                    label: "很容易（80%-100%能够招到）"
                },
                {
                    value: "2",
                    label: "容易（能招到60%-80%）"
                },
                {
                    value: "3",
                    label: "比较困难（能招到40%-60%）"
                },
                {
                    value: "4",
                    label: "困难（只能招到20%-40%）"
                },
                {
                    value: "5",
                    label: "很困难（招到不足20%）"
                },
                {
                    value: "6",
                    label: "招收不到"
                }
            ]
        }, {
            value: 'C4',
            label: 'C4、单位人才引进的主要渠道',
            children: [{
                    value: "1",
                    label: "通过企业官方网站发布招聘信息"
                },
                {
                    value: "2",
                    label: "与专业招聘网站合作，发布招聘信息"
                },
                {
                    value: "3",
                    label: "参加招聘会"
                },
                {
                    value: "4",
                    label: "通过专业寻猎机构进行招聘"
                },
                {
                    value: "5",
                    label: "通过人才市场招聘"
                },
                {
                    value: "6",
                    label: "通过广告媒体分布招聘信息"
                },
                {
                    value: "7",
                    label: "通过第三方招聘渠道，如社交软件群"
                },
                {
                    value: "8",
                    label: "内部招聘"
                },
                {
                    value: "9",
                    label: "员工推荐"
                },
                {
                    value: "10",
                    label: "校园招聘"
                },
                {
                    value: "11",
                    label: "人力资源外包"
                },
                {
                    value: "12",
                    label: "校企定制"
                },
                {
                    value: "13",
                    label: "海外人才工作站或人才市场"
                },
                {
                    value: "14",
                    label: "通过大数据手段开展招聘"
                },
                {
                    value: "15",
                    label: "其它"
                }
            ]
        }, {
            value: 'C5',
            label: 'C5、单位对归国留学人员的需求程度',
            children: [{
                    value: "1",
                    label: "没有归国留学人员的招聘需求"
                },
                {
                    value: "2",
                    label: "需要归国留学人员加入，但是未有明确招聘计划"
                },
                {
                    value: "3",
                    label: "需要归国留学人员加入，已有明确招聘计划且正在开展招聘"
                },
                {
                    value: "4",
                    label: "需要大量归国留学人员加入，已招聘到部分归国留学人员"
                },
                {
                    value: "5",
                    label: "单位员工主要依赖归国留学人员招聘"
                }
            ]
        }, {
            value: 'C6',
            label: 'C6、单位引进人才难度大的主要原因',
            children: [{
                    value: "1",
                    label: "招聘信息发布渠道少，获得人才的信息有限"
                },
                {
                    value: "2",
                    label: "较为缺乏所需岗位人才"
                },
                {
                    value: "3",
                    label: "竞争对手对人才的抢夺非常激烈"
                },
                {
                    value: "4",
                    label: "单位缺乏人才发展（包括单位经营管理、产品研发和技术创新等）支撑平台"
                },
                {
                    value: "5",
                    label: "政府引才支持力度不强"
                },
                {
                    value: "6",
                    label: "生活成本过高（住房/租房、物价等）"
                },
                {
                    value: "7",
                    label: "公共设施不完善"
                },
                {
                    value: "8",
                    label: "单位地处偏远，交通不便"
                },
                {
                    value: "9",
                    label: "应聘者对薪水要求过高，单位难以满足应聘者的薪酬期望"
                },
                {
                    value: "10",
                    label: "国外人才出入境管理和人才签证不便利"
                },
                {
                    value: "11",
                    label: "其它"
                }
            ]
        }, {
            value: 'C7',
            label: 'C7、单位在人才引进方面，需要的政府支持主要有',
            children: [{
                    value: "1",
                    label: "举办大型人才交流会、招聘会、境外引智推介会等活动"
                },
                {
                    value: "2",
                    label: "政府组团外出招聘"
                },
                {
                    value: "3",
                    label: "建立海外引才平台，如引才工作站"
                },
                {
                    value: "4",
                    label: "加强创新创业扶持政策，吸引创新创业人才"
                },
                {
                    value: "5",
                    label: "完善市级、区级人才引进与激励政策，提高人才服务质量"
                },
                {
                    value: "6",
                    label: "提高人才租房和生活补贴额度"
                },
                {
                    value: "7",
                    label: "减少人才引进阻碍，提高人才引进效率"
                },
                {
                    value: "8",
                    label: "加强人才优惠政策与城市影响力的宣传工作，优化人才引进的软环境"
                },
                {
                    value: "9",
                    label: "推动人才服务大数据体系建设，精准推送引才政策动态信息"
                },

                {
                    value: "10",
                    label: "加强用人单位引才需求的调研，精准定位用人单位的引才目标与需求"
                },

                {
                    value: "11",
                    label: "加强人才公共服务产品的开发与创新，满足高端人才多元化需求"
                },
                {
                    value: "12",
                    label: "其它"
                }
            ]
        }, {
            value: 'C8',
            label: 'C8、单位的人才主要培养方式',
            children: [{
                    value: "1",
                    label: "定期组织内部人才培训"
                },
                {
                    value: "2",
                    label: "人才轮岗制度"
                },
                {
                    value: "3",
                    label: "人才外派培训"
                },
                {
                    value: "4",
                    label: "导师辅导"
                },
                {
                    value: "5",
                    label: "人才储备建立"
                },
                {
                    value: "6",
                    label: "人才梯队建设"
                },
                {
                    value: "7",
                    label: "开展继续教育"
                },
                {
                    value: "8",
                    label: "其它"
                }
            ]
        },
          {
            value: 'C9',
            label: 'C9、单位激励人才的方式',
            children: [{
                    value: "1",
                    label: "提高工资待遇标准"
                },
                {
                    value: "2",
                    label: "提高员工福利"
                },
                {
                    value: "3",
                    label: "股权期权激励"
                },
                {
                    value: "4",
                    label: "解决户籍"
                },
                {
                    value: "5",
                    label: "解决子女入学"
                },
                {
                    value: "6",
                    label: "晋升职务"
                },
                {
                    value: "7",
                    label: "培训学习"
                },

                {
                    value: "8",
                    label: "精神荣誉奖励"
                },
                {
                    value: "9",
                    label: "提供住房"
                },
                {
                    value: "10",
                    label: "担任重大项目负责人"
                },
                {
                    value: "11",
                    label: "帮助组建团队"
                },
                {
                    value: "12",
                    label: "解决家属就业"
                },
                {
                    value: "13",
                    label: "其它"
                }
            ]
        },
          {
            value: 'C10',
            label: 'C10、单位人才培养难度大的主要原因',
            children: [{
              value: "1",
              label: "人才培养经费不足"
            },
              {
                value: "2",
                label: "缺乏有效的培训机构"
              },
              {
                value: "3",
                label: "人才培养速度不能满足企业发展"
              },
              {
                value: "4",
                label: "人才培养与使用目标结合不紧密，无法满足人才多元化需求，培养效率低"
              },
              {
                value: "5",
                label: "人才培养之后跳槽，给企业带来损失"
              },
              {
                value: "6",
                label: "其它"
              }
            ]
          },
          {
            value: 'C11',
            label: 'C11、单位在人才培养方面，需要的政府支持',
            children: [{
              value: "1",
              label: "开展人才继续教育培训活动"
            },
              {
                value: "2",
                label: "促进校企合作，引入高校资源为企业员工提供培训机会"
              },
              {
                value: "3",
                label: "推进人才培养国际合作"
              },
              {
                value: "4",
                label: "强化博士后“人才战略储备库”功能"
              },
              {
                value: "5",
                label: "支持企业参与院校的人才培养，建设校外实训基地"
              },
              {
                value: "6",
                label: "其它"
              }
            ]
          }
        ]
    },
  {
        value: 'D',
        label: 'D、人力资源服务',
        children: [
          {
            value: 'D1',
            label: 'D1、单位采购过哪些人力资源服务',
            children: [{
              value: "1",
              label: "没采购过"
            },
              {
                value: "2",
                label: "猎头/RPO"
              },
              {
                value: "3",
                label: "招聘网站"
              },
              {
                value: "4",
                label: "人力资源外包"
              },
              {
                value: "5",
                label: "人才测评"
              },
              {
                value: "6",
                label: "人力资源培训"
              },
              {
                value: "7",
                label: "薪酬数据调查"
              },
              {
                value: "8",
                label: "转职服务"
              },
              {
                value: "9",
                label: "人力资源管理咨询"
              },
              {
                value: "10",
                label: "人力资源战略咨询"
              },
              {
                value: "11",
                label: "人力资源派遣"
              },
              {
                value: "12",
                label: "其它"
              }
            ]
          }, {
            value: 'D2',
            label: 'D2、单位近3年，急需的人力资源服务',
            children: [
                {
                    value: "1",
                    label: "猎头/RPO"
                },
                {
                    value: "2",
                    label: "招聘网站"
                },
                {
                    value: "3",
                    label: "人力资源外包"
                },
                {
                    value: "4",
                    label: "人力资源派遣"
                },
                {
                    value: "5",
                    label: "人才测评"
                },
                {
                    value: "6",
                    label: "人力资源培训"
                },
                {
                    value: "7",
                    label: "薪酬数据调查"
                },
                {
                    value: "8",
                    label: "转职服务"
                },
                {
                    value: "9",
                    label: "人力资源管理咨询"
                },
                {
                    value: "10",
                    label: "人力资源战略咨询"
                },
                {
                    value: "11",
                    label: "其它"
                }
            ]
          }]
    }, {
        value: 'E',
        label: 'E、人才公共服务评价',
        children: [
            {
                value: 'E1',
                label: 'E1、单位对珠海市政府部门的公共行政服务便利性和效率性的总体评价',
                children: [{
                        value: "1",
                        label: "很不好"
                    },
                    {
                        value: "2",
                        label: "不太好"
                    },
                    {
                        value: "3",
                        label: "一般"
                    },
                    {
                        value: "4",
                        label: "比较好"
                    },
                    {
                        value: "5",
                        label: "很好"
                    }
                ]
            }, {
                value: "E2",
                label: "E2、单位对珠海市产业发展与人才发展匹配度的总体评价是",
                children: [{
                        value: "1",
                        label: "不匹配"
                    },
                    {
                        value: "2",
                        label: "不太匹配"
                    }, {
                        value: "3",
                        label: "一般"
                    },
                    {
                        value: "4",
                        label: "比较匹配"
                    },
                    {
                        value: "5",
                        label: "完全匹配"
                    }
                ]
            },
            {
                value: "E3",
                label: "E3、单位对“珠海英才计划”和各区党政部门出台的人才政策的熟悉程度",
                children: [{
                        value: "1",
                        label: "不知道"
                    },
                    {
                        value: "2",
                        label: "不太了解"
                    }, {
                        value: "3",
                        label: "一般"
                    },
                    {
                        value: "4",
                        label: "比较熟悉"
                    },
                    {
                        value: "5",
                        label: "很熟悉"
                    }
                ]
            }, {
                value: "E4",
                label: "E4、单位认为“珠海英才计划”和各区党政部门出台的人才政策内容的合理性",
                children: [{
                        value: "1",
                        label: "无法判断"
                    },
                    {
                        value: "2",
                        label: "很不合理"
                    }, {
                        value: "3",
                        label: "不太合理"
                    },
                    {
                        value: "4",
                        label: "一般"
                    },
                    {
                        value: "5",
                        label: "比较合理"
                    },
                    {
                        value: "6",
                        label: "很合理"
                    }
                ]
            },
            {
                value: "E5",
                label: "E5、单位对“珠海英才计划”和各区党政部门出台的人才政策的总体满意度",
                children: [{
                        value: "1",
                        label: "非常不满意"
                    },
                    {
                        value: "2",
                        label: "很不满意"
                    }, {
                        value: "3",
                        label: "一般"
                    },
                    {
                        value: "4",
                        label: "比较满意"
                    },
                    {
                        value: "5",
                        label: "非常满意"
                    }
                ]
            },
            {
                value: 'E6',
                label: 'E6、单位了解珠海市人才政策的途径',
                children: [{
                        value: "1",
                        label: "政府信息网站发布的人才政策"
                    },
                    {
                        value: "2",
                        label: "主动联系政府相关部门"
                    }, {
                        value: "3",
                        label: "政府部门开展的人才政策宣导活动"
                    },
                    {
                        value: "4",
                        label: "政府部门微信公众号推送的人才政策信息"
                    },
                    {
                        value: "5",
                        label: "电视广播等传统媒体宣传"
                    },
                    {
                        value: "6",
                        label: "不知道通过何种渠道获取政策信息"
                    },
                    {
                        value: "7",
                        label: "其它"
                    }
                ]
            },
            {
                value: 'E7',
                label: 'E7、单位认为珠海市人才政策需要进一步完善的地方',
                children: [{
                        value: "1",
                        label: "政策制定的科学性"
                    },
                    {
                        value: "2",
                        label: "政策的全面性"
                    }, {
                        value: "3",
                        label: "政策的时效性"
                    },
                    {
                        value: "4",
                        label: "政策的可操作性"
                    },
                    {
                        value: "5",
                        label: "政策的执行落实"
                    },
                    {
                        value: "6",
                        label: "政策的宣传"
                    },
                    {
                        value: "7",
                        label: "其它"
                    }
                ]
            },
            {
                value: 'E8',
                label: 'E8、单位认为珠海市政府部门在人才发展方面最应提供哪些支持',
                children: [{
                        value: "1",
                        label: "为单位牵线搭桥，帮助单位开拓高层次人才引才渠道"
                    },
                    {
                        value: "2",
                        label: "对单位招聘高层次人才提供奖励补助或配套资助"
                    }, {
                        value: "3",
                        label: "建立完善人才学习交流机制和平台"
                    },
                    {
                        value: "4",
                        label: "建立人才、项目信息供需平台"
                    },
                    {
                        value: "5",
                        label: "让单位在员工职称评审过程中拥有更多自主权"
                    },
                    {
                        value: "6",
                        label: "加大科技成果转化的资金投入，打造更好的人才创新创业环境"
                    },
                    {
                        value: "7",
                        label: "优化人才生活服务保障，妥善解决人才落户、住房、子女教育及医疗保障等生活问题"
                    },
                    {
                        value: "8",
                        label: "放宽人才优惠政策申请的资格条件，让更多人才受惠"
                    },
                    {
                        value: "9",
                        label: "加强人才政策的宣传力度"
                    },
                    {
                        value: "10",
                        label: "其它"
                    }
                ]
            }
        ]
    }

];

/**
 * @param filters： 元素
 * @param only：方向（true只需要false过滤掉）
 */
function optionsFinter(filters, only) {
    var tempObj = objDeepCopy(options);
    var result = tempObj.map(item => {
        var _item = {
            label: item.label,
            value: item.value
        };
        _item.label = item.label;
        _item.value = item.value;
        var _children = item.children.filter(item1 => {
            if (only) {
                var flag = false;
                filters.forEach(item2 => {
                    if (item2 == item1.value) {
                        flag = true;
                    }
                })
            } else {
                var flag = true;
                filters.forEach(item2 => {
                    if (item2 == item1.value) {
                        flag = false;
                    }
                })
            }
            return flag;
        })
        if (_children.length > 0) {
            _item.children = _children;
        }
        return _item;
    })
    return result;
}
//深拷贝
var objDeepCopy = function(source) {
        var sourceCopy = source instanceof Array ? [] : {};
        for (var item in source) {
            sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
        }
        return sourceCopy;
    }
    //单独删除元素
    /**
     * @param {*} arr 二维数组，二维中只允许三个元素
     */
function delChild(obj, arr) {
    arr.forEach(params => {
        if (params.length != 3) {
            if (params.length == 1) {
                obj.forEach(item1 => {
                    if (params[0] == item1.value) {
                        item1.disabled = true;
                    }
                })
            }
            return;
        }
        obj.forEach(item1 => {
            if (params[0] == item1.value) {
                item1.children.forEach(item2 => {
                    if (params[1] == item2.value) {
                        item2.children.forEach((item3, index) => {
                            if (params[2] == item3.value) {
                                item3.disabled = true;
                                // delete(item2.children[index])
                            }
                        })
                    }
                })
            }
        })
    })
}


var filterEle1 = ['A6', 'B1', 'B2', 'B3', 'B5', 'B6', 'B4', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'C1', 'C2']; //显示的元素
var filterEle2 = ['A1','A2','A3','A4','A5','A6','A10_1','A10_2','A11','B4','B5_1','B11_2','B11_5','B12_1','B13_1','B13_2','B13_3','C3','C4','C5','C6','C7','C8','C9','C10','C11','D1','D2','E1','E2','E3','E4','E5','E6','E7','E8']; //不显示的元素
var counts = optionsFinter(filterEle1, true); //统计项

var condition = optionsFinter(filterEle2, true); //条件项
//单独处理三级菜单，二级统一都显示(删除项)
delChild(counts, [
    ['A', 'A6', '1'],
    ['B', 'B4', '1'],
    ['B', 'B7', '2'],
    ['B', 'B4', '2'],
    ['B', 'B4', '3'],
    ['D'],
    ['E']
]);
delChild(condition, [
    ['A', 'A6', '2'],
    ['A', 'A1', '3'],
    ['A', 'A1', '4'],
    ['A', 'A1', '5'],
    ['B', 'B4', '2'],
    ['B', 'B4', '1'],
    ['B', 'B4', '3'],
    ['B', 'B7', '1'],
    ['B', 'B7', '3'],
]);
// console.group('options')
// console.dir(counts)
// console.dir(condition)
// console.dir(options)
// console.groupEnd('options')

export {
    options,
    counts,
    condition,
}
