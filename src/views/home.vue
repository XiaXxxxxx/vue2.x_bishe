<template>
<div class="home">
  <div class="header">
    <div class="name">电商比价系统</div>
    <div class="search">
      <div class="slot">商品搜索</div>
      <input v-model="searchData">
    </div>
    <button>搜索</button>
  </div>
  <div class="content">
    <div class="sift">
      <div class="title">筛选商品</div>
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
      <div class="store" v-for="(item,index) in datas" :key="index">
        <div class="img">
          <img :src="item.imgUrl" alt="">
        </div>
        <div class="des">{{item.des}}</div>
        <div class="prices">{{item.prices}}</div>
        <div class="comments">{{item.comments}}</div>
        <div class="source">{{item.source}}</div>
      </div>
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
      siftData:'all',
      datas:[
        {
          imgUrl:require('../assets/images/test.jpg'),
          des:"aaaa",
          prices:"bbbbb",
          comments:"ccccc",
          source:"111111"
        },
        {
          imgUrl:require('../assets/images/test.jpg'),
          des:"aaaa",
          prices:"bbbbb",
          comments:"ccccc",
          source:"111111"
        },
        {
          imgUrl:require('../assets/images/test.jpg'),
          des:"aaaa",
          prices:"bbbbb",
          comments:"ccccc",
          source:"111111"
        },
        {
          imgUrl:require('../assets/images/test.jpg'),
          des:"aaaa",
          prices:"bbbbb",
          comments:"ccccc",
          source:"111111"
        }
      ]
    }
  },
  methods:{
    siftEvents(e){
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  width: 100%;
  min-height: 100vh;
  background-color: rgb(239,239,239);
  
  .header{
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .search{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  
  .content{
    margin: auto;
    width: 70%;
    //min-height: calc(100vh - 60px);
    //background-color: #fff;
    
    .sift{
      margin-top: 20px;
      padding: 5px 10px;
      background-color: #fff;

      .title{
      }

      .sift_box{
        display: flex;
        align-items: center;

        .p1{
          margin-right: 20px;
        }
      }
    }

    .list{
      margin-top: 10px;
      background-color: #fff;

      .store{
        width: 100%;
        height: 200px;
        display: flex;
        border-bottom: 2px solid rgb(239,239,239);

        .img{
          width: 200px;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>