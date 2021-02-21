<template>
  <div>
    <el-card v-if="isShow" class="moviecard">
      <img src="http://www.pqdong.com/wp-content/uploads/2020/03/tip-img.png">
      <p>你暂时未进行识别，请先回到首页上传待识别图片，提示成功后查看识别结果！</p>
    </el-card>
    <div v-if="!isShow">
      <el-card class="moviecard" style="height: 200px;">
        <img :src="person.faceBase" class="avatar">
        <div class="introduce">
          <p class="title">{{person.personName}}</p>
          <p>性别：{{person.gender}}</p>
          <p>personId：{{person.personId}}</p>
          <p>faceId：{{person.faceId}}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import fetch from '../api/fetch';

export default {
  data() {
    return {
      person: {},
      isShow: false,
    };
  },
  mounted() {
    this.getPersonDetail();
  },
  computed: {
    isLogin() {
      return !!localStorage.getItem('token');
    },
  },
  methods: {
    getPersonDetail() {
      const personId = localStorage.getItem('personId');
      fetch
        .getPersonInfo(personId)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.data === null) {
              this.isShow = true;
            }
            this.person = res.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>


<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  div .moviecard {
    width: 1000px;
    margin: 20px auto auto auto;
  }

  .avatar {
    float: left;
    width: 126px;
    height: 140px;
  }

  .title {
    font-size: 21px;
  }

  .introduce {
    margin-left: 140px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }


  .movieintroducet p {
    margin: 5px;
  }

  .introduce p {
    margin: 8px;
  }

  p span {
    margin: 14px;
  }


  .picContain:hover .flipper, .picContain.hover .flipper {
    transform: rotateY(180deg);
  }

</style>
