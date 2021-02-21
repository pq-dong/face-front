<template>
  <!--人员资源-->
  <div>
    <div class="division">
      <h3>人员资源</h3>
      <h3 style="color: #888;font-weight: 400">--- PERSONS ---</h3>
    </div>
    <div class="newsContain">
      <div class="temp">
        <!--        @click="personDetail(item.id)-->
        <div class="newsItem" v-for="(item, key) in personList" :key="key"
             @click="getPersonDetail(item.personId, item.personName)">
          <div class="picContain" ontouchstart="this.classList.toggle('hover');">
            <meta name="referrer" content="no-referrer"/>
            <img :src=item.faceBase height="75" width="75">
          </div>
          <div>
            <p style="white-space: pre-wrap;">姓名：{{item.personName}}     性别：{{item.gender}}     id：{{item.personId}}     faceId：{{item.faceId}}</p>
            <p style="margin-top:25px">
              <el-button class="editt" @click="getPersonDetail(item.personId, item.personName)">查看人员</el-button>
              <el-button class="editt" @click="deletePerson(item.personId)">删除人员</el-button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button class="editt" @click="prePage()">上一页</el-button>
      <el-button type="primary" class="editt">{{this.count}}</el-button>
      <el-button class="editt">{{this.count+1}}</el-button>
      <el-button class="editt">{{this.count+2}}</el-button>
      <el-button class="editt" @click="nextPage()">下一页</el-button>
    </div>
  </div>
</template>

<script>
    import fetch from '../api/fetch';

    export default {
        data() {
            return {
                personList: [],
                count: 0,
                isShow: false,
            };
        },
        mounted() {
            this.getPerson();
        },
        computed: {
            isLogin() {
                return !!localStorage.getItem('token');
            },
        },
        methods: {
            prePage() {
                if (this.count > 1) {
                    this.count = this.count - 1;
                }
                this.getPerson();
            },
            nextPage() {
                this.count = this.count + 1;
                this.getPerson();
            },
            getPerson() {
                fetch.getPerson(this.count, 10)
                    .then((res) => {
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                this.personList = res.data.data.persons;
                            }
                        }
                    });
            },
            deletePerson(id) {
                fetch.deletePerson(id)
                    .then((res) => {
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                this.getPerson();
                                this.$router.push({name: 'personList'});
                            }
                        }
                    });
            },
            getPersonDetail(id, name) {
                localStorage.setItem('personId', id);
                localStorage.setItem('personName', name);
                this.$router.push({name: 'personInfo'});
            },
        },
    };
</script>


<style>
  @import "../assets/Animate/animate.min.css";

  * {
    box-sizing: border-box;
  }

  body {
    background: #ededed;
    padding: 0;
    margin: 0;
  }

  .newsContain {
    padding-top: 1px;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .picContain {
    margin-right: 10px;
    perspective: 1000px;
  }

  .picContain:hover .flipper, .picContain.hover .flipper {
    transform: rotateY(180deg);
  }

  .picContain, .itemPic, .back {
    width: 80px;
    height: 80px;
  }


  .newsItem {
    display: flex;
    justify-content: flex-start;
    width: 1200px;
    margin: auto;
    height: 114px;
    text-align: left;
    color: #5a5a5a;
    font-weight: 500;
    padding-top: 15px;
    border-bottom: 1px solid #ededed;
  }


  .footer a {
    color: white;
    text-decoration: none;
  }

  .aboutus {
    width: 100%;
    height: 500px;
    background: url("https://s.secrss.com/anquanneican/1ba6aba96bf32be0631b17d7a73ef013.jpg") no-repeat;
    background-size: 100% 100%;
    filter: grayscale(70%);
    opacity: 0.7;
    color: white;
    font-weight: 600;
    padding-top: 60px;
  }

  .aboutus p {
    margin-top: 30px;
    font-size: 18px;
  }


  .wrapper-card .card {
    color: #07111B;
    font-size: 16px;
    width: 230px;
    height: 243px;
    float: left;
    margin: 30px;
    border-radius: 6px;
  }

  .wrapper-card .card:hover {
    transform: translateY(-5px);
    transition: 3ms;
    box-shadow: 5px 5px 10px #888;
  }

  .wrapper-card .image {
    border-radius: 6px 6px 0 0;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border-radius: 6px;
  }


  .division {
    width: 100%;
    margin: 10px auto;
    text-align: center;
    padding-left: 10px;
    color: #5a5a5a;
  }

  .footer img {
    width: 25px;
    height: 25px;
    margin-right: 10px
  }

  .footer span {
    margin-right: 20px;
  }

  .recommandInfo p {
    margin-bottom: 6px;
  }

  .editt {
    margin: 0px auto auto 0px;
  }

</style>
