<template>
<div class="home">
  <div class="header">
    <div class="box">
      <div class="name">电商比价系统</div>
      <div class="login_box">
        <div class="search_input">
          <input ref="searchInput" class="input" :placeholder="placeholder" v-model="searchData" @keyup.enter="searchGoods">
          <div class="img" @click="searchGoods"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="content">
    <div class="sift">
      <div class="title"><span>筛选商品</span></div>
      <div class="sift_box">
        <div class="p1">商城报价</div>
        <el-radio-group v-model="siftData" @input="siftEvents">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">天猫</el-radio>
          <el-radio :label="3">京东</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="list">
      <template v-if="!datas.length">
        <div class="empty_box">
          <span>抱歉暂无数据，请输入商品名称查询！</span>
        </div>
      </template>
      <template v-else>
        <div class="goods_box" v-for="(item,index) in currentDatas" :key="index">
          <img :src="item.imgUrl" alt="">
          <div class="des">
            <div class="des_text">{{item.des}}</div>
            <div class="suggest">推荐理由：{{item.suggest}}</div>
          </div>
          <div class="prices">￥{{item.prices}}</div>
          <div class="comments">有{{item.comments}}</div>
          <div class="source">{{item.source}}</div>
        </div>
        <div class="pagination">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="paginationData.pageSize"
              layout="sizes, prev, pager, next"
              :total="paginationData.total">
          </el-pagination>
        </div>
      </template>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "home",
  data(){
    return{
      searchData:"",
      placeholder:"请输入商品查询",
      siftData:1,
      datas:[
        {
          imgUrl:'/images'+'/1.jpg',
          des:"飞利浦（PHILIPS）电动牙刷成人情侣款 礼物 送礼 5种模式 全新软毛柔和亮白刷头 5效宝藏刷 深藏BLUE HX2471/01",
          suggest:"【众多牙医推荐品牌，飞利浦30年专业声波震动科技】【全国质保2年，质量问题30天可退货，180天可换货，安心购！】",
          prices:"310",
          comments:"100万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/2.jpg',
          des:"飞利浦（PHILIPS）电动牙刷 SPA级 成人声波震动 清洁亮白护龈 生日礼物情侣款 5种模式 白色HX2491/01",
          suggest:"由京东发货,飞利浦京东自营官方旗舰店提供售后服务. 现在至明天23:00前下单，预计04月15日(周六)送达",
          prices:"399",
          comments:"200万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/3.jpg',
          des:"飞利浦（PHILIPS）电动牙刷成人/学生 情侣款 礼物 送礼 可充电式 3种洁齿模式 6倍清除牙菌斑 白色HX6730【镇店款】",
          suggest:"【众多牙医推荐品牌，飞利浦30年专业声波震动科技】 【全国质保2年，质量问题30天可退货，180天可换货，安心购！】",
          prices:"279",
          comments:"200万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/4.jpg',
          des:"米家 小米声波电动牙刷T200 声波洁牙 柔感护龈 声波振动 高效清洁 超长续航 情侣双色 蓝色",
          suggest:"【自营小家电】声波洁牙，柔感护龈；磁悬浮声波马达，动能微泡净齿，有效减少牙菌斑；0.15mm磨圆刷丝，小圆刷头，深入口腔清洁智齿；体积小巧，握持方便，易于携带",
          prices:"69",
          comments:"100万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/5.jpg',
          des:"米家 小米电动牙刷T302成人/学生 4种净齿模式 150天续航 4支刷头送礼物男/女 银灰色",
          suggest:"【自营小家电】4种净齿模式，受压动力增强，低噪轻柔震感；杜邦自净软毛，IPX8*全身防水，4支装刷头礼盒，续航可达150天，动人个性3色可选",
          prices:"169",
          comments:"50万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/6.jpg',
          des:"usmile笑容加电动牙刷 成人情侣版 软毛声波自动牙刷 1号刷 月牙白",
          suggest:"由 京东 发货, usmile京东自营旗舰店提供售后服务. 09:00前下单，预计今天(04月14日)送达",
          prices:"199",
          comments:"20万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/7.jpg',
          des:"欧乐B电动牙刷成人 圆头牙刷3D声波旋转摆动Pro Ultra(武士黑) Pro4",
          suggest:"由 京东 发货, 欧乐B口腔护理京东自营旗舰店提供售后服务. 09:00前下单，预计今天(04月14日)送达",
          prices:"389",
          comments:"20万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/8.jpg',
          des:"usmile 笑容加电动牙刷 成人声波震动 情侣电动牙刷 送男友/送女友 Y1Pro浅云",
          suggest:"由 京东 发货, usmile京东自营旗舰店提供售后服务. 09:00前下单，预计今天(04月14日)送达",
          prices:"349",
          comments:"100万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/9.jpg',
          des:"米家 小米电动牙刷T302成人/学生 4种净齿模式 150天续航 4支刷头送礼物男/女 蓝黑色",
          suggest:"【自营小家电】4种净齿模式，受压动力增强，低噪轻柔震感；杜邦自净软毛，IPX8*全身防水，4支装刷头礼盒，续航可达150天，动人个性3色可选",
          prices:"169",
          comments:"50万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/10.jpg',
          des:"美的（Midea）电动牙刷成人 声波震动 300天长续航 智能换区提醒 软毛刷头*2 情侣款S1P 小米白",
          suggest:"【专业口腔清洁，天天低价，买贵必赔】【365天以换代修，价保30天】一年只充一次电！5种洁齿模式，专业杜邦刷毛！",
          prices:"99",
          comments:"5万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/11.jpg',
          des:"米家 小米电动牙刷 小米电动牙刷男/女T100蓝色超值套装（共4支刷头）情侣电动牙刷 声波震动 进口软毛",
          suggest:"【T100蓝超值套装|送适配T100通用刷头*3+原装刷头*1|到手共4支刷头】到手价仅49元，充电4小时续航30天，IPX7级防水；轻巧便携，三色可选。",
          prices:"47",
          comments:"5万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/12.jpg',
          des:"飞利浦（PHILIPS）电动牙刷成人情侣款 礼物 送礼 5种模式 全新软毛柔和亮白刷头 5效宝藏刷 绝绝紫 HX2471/02",
          suggest:"【众多牙医推荐品牌，飞利浦30年专业声波震动科技】 【全国质保2年，质量问题30天可退货，180天可换货，安心购！】",
          prices:"279",
          comments:"100万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/13.jpg',
          des:"斯程 适用华为智选电动牙刷替换头HUAWEIHilink智选优漾星钻力博得 通用华为智选Lebooo力博得清洁型白（到手8支）",
          suggest:"【自营部分地区次日达】【晒单赠牙刷置物架】适配Hilink电动牙刷，采用美国杜邦刷毛，顶端磨圆呵护牙龈，需搭配牙刷手柄一同使用，建议3个月更换同款升级款4支",
          prices:"59",
          comments:"2万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/14.jpg',
          des:"飞科（FLYCO）电动牙刷成人送男女朋友情侣款生日礼物软毛声波震动感应充电FT7105深海蓝【标配2支刷头】+旅行盒",
          suggest:"春季家装节【4月8日-4.16日，2支立减20元！活动价不高于159元/支】无线感应充电，一年仅需充电4次！【标配2只刷头加限量另赠2只刷头！赠品赠完即止】",
          prices:"169",
          comments:"5万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/15.jpg',
          des:"舒客电动牙刷成人/学生 情侣礼物送男士/女友 可充电 声波 软毛 5档清洁模式 分段式植毛T3 冰岛白",
          suggest:"B32S,到手价149,限时赠120g牙膏,配2支刷头+1张萌宠贴纸,儿童刷牙神器,专业防蛀护龈,赠品有限,以实际订单为准戳查看>",
          prices:"99",
          comments:"50万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/16.jpg',
          des:"usmile 笑容加电动牙刷 成人声波震动情侣电动牙刷 送女友 Y1s蜜粉",
          suggest:"50万+热评推荐！一年只充2次电，立即抢购！",
          prices:"319",
          comments:"100万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/17.jpg',
          des:"飞科（FLYCO） 电动牙刷成人软毛情侣款生日礼物送男女朋友 深海蓝标配【共4个刷头（含赠送）+旅行盒】",
          suggest:"【限定礼盒，限时发售】【品牌直营，正品保障】无线感应充电丨黄金声波频率丨精细磨圆刷毛丨智能计时提醒丨看遍每天幻彩日出~~点击购买店内爆款智能感应剃须刀",
          prices:"169",
          comments:"10万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/18.jpg',
          des:"米家 小米电动牙刷T302成人/学生 4种净齿模式 150天续航 4支刷头送礼物男/女 霜紫色",
          suggest:"【自营小家电】4种净齿模式，受压动力增强，低噪轻柔震感；杜邦自净软毛，IPX8*全身防水，4支装刷头礼盒，续航可达150天，动人个性3色可选",
          prices:"169",
          comments:"50万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/19.jpg',
          des:"华为智选力博得电动牙刷 智能声波牙刷 90天长续航 成人情侣款 星夜黑（支持鸿蒙智联）情侣牙刷礼物",
          suggest:"由 京东 发货, 并提供售后服务. 09:00前下单，预计今天(04月14日)送达",
          prices:"159",
          comments:"100万+评论",
          source:"京东商城"
        },
        {
          imgUrl:'/images'+'/20.jpg',
          des:"飞利浦（PHILIPS）电动牙刷HX2461/06鸢尾蓝成人情侣款 礼物 3种模式 带紫外线杀菌盒+亮白刷头 HX6730升级款",
          suggest:"【众多牙医推荐品牌，飞利浦30年专业声波震动科技】 【全国质保2年，质量问题30天可退货，180天可换货，安心购！】",
          prices:"359",
          comments:"200万+评论",
          source:"京东商城"
        }
      ],
      currentDatas:[],
      paginationData:{
        pageSize:5,
        total:0
      },
      currentPageIndex:1
    }
  },
  created() {
    this.paginationData.total = this.datas.length
    this.currentDatas = this.datas.slice(0,5)
  },
  methods:{
    //筛选框选择，选择值e
    siftEvents(e){
      console.log(e)
      //此处添加筛选条件重新请求商品，总数与第一页都要请求到
    },
    //顶部查询商品，查询值this.searchData
    searchGoods(){
      //此处请求接口查询该商品的数据
      console.log(this.searchData)
      this.placeholder = this.searchData
      this.searchData = ""
      this.$refs.searchInput.blur()
    },
    //分页每页显示条数变化，选择值val
    handleSizeChange(val){
      this.paginationData.pageSize = val
      //此处拼参数重新请求当前页的数据
      this.currentDatas = this.datas.slice(0,this.paginationData.pageSize)
    },
    //分页选择页码，选择值val
    handleCurrentChange(val){
      //此处拼参数请求当前页的数据
      console.log(val)
      this.currentDatas = this.datas.slice((val-1)*this.paginationData.pageSize,(val-1)*this.paginationData.pageSize + this.paginationData.pageSize)
    }
  }
}
</script>

<style lang="scss">
.el-radio-group{
  .el-radio{
    .el-radio__input{
      .el-radio__inner{
        //border-radius: 2px;
        border: 1px solid black;
      }
    }
  }
}
</style>

<style scoped lang="scss">
.home{
  width: 100%;
  min-height: 100vh;
  background-color: rgb(239,239,239);
  
  .header{
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 1px 16px rgba(0, 0, 0, 0.15);
    transform: translate3d(0, 0, 0);

    .box{
      margin: auto;
      width: 70%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name{
        font-family: 'PingFang SC',serif;
        font-weight: 600;
        font-size: 22px;
        line-height: 22px;
        color: #000000;
      }

      .login_box{
        font-size: 14px;

        .search_input{
          width: 220px;
          height: 32px;
          border-radius: 24px;
          background: #F2F3F5;
          display: flex;
          align-items: center;

          input{
            margin-left: 7%;
            width: 75%;
            height: 28px;
            background: #F2F3F5;
            border:none;
            outline:none;
            &:focus{
              border: none;
              outline:none;
            }
          }

          .img{
            margin-left: 3%;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: url('@img/header_search.png') no-repeat;
            background-size: 100% 100%;
            &:hover{
              cursor: pointer;
              background-color: #dad5d5;
            }
          }
        }
      }
    }
  }
  
  .content{
    margin: auto;
    width: 70%;
    
    .sift{
      margin-top: 20px;
      background-color: #fff;
      border-radius: 5px;

      .title{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 40px;
        border-bottom: 2px solid rgb(239,239,239);
        box-sizing: border-box;
        span{
          margin-left: 10px;
        }
      }

      .sift_box{
        height: 40px;
        display: flex;
        align-items: center;

        .p1{
          margin: 0 50px 0 10px;
        }
      }
    }

    .list{
      margin-top: 10px;
      background-color: #fff;

      .goods_box{
        padding: 10px;
        width: 100%;
        display: flex;
        border-bottom: 2px solid rgb(239,239,239);

        img{
          width: 180px;
          height: 180px;
        }

        .des{
          margin: 20px 30px 0;
          width: 40%;
          flex-shrink: 0;
          flex-grow: 0;

          .des_text{
            color: #5353dc;
            height: 90px;
            overflow: hidden;
          }

          .suggest{
            margin-top: 15px;
            height: 55px;
            overflow: hidden;
            color: #333333;
            font-size: 14px;
          }
        }

        .prices{
          margin-top: 20px;
          width: 10%;
          color: #5353dc;
          text-align: center;
          flex-shrink: 0;
          flex-grow: 0;
        }

        .comments{
          margin-top: 20px;
          width: 15%;
          text-align: center;
          flex-shrink: 0;
          flex-grow: 0;
        }

        .source{
          margin-top: 20px;
          width: 10%;
          text-align: center;
          flex-shrink: 0;
          flex-grow: 0;
        }
      }

      .empty_box{
        width: 100%;
        height: 200px;
        font-size: 24px;
        color: #c9c9c9;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
      }

      .pagination{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>