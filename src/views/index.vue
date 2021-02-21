<template>
  <div>
    <div class="indexContain">
      <div class="cardBox">
        <el-carousel trigger="click" height="400px" style="position: sticky;">
          <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
            <img :src="item.img" class="boxImg">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="division"><h3>进行识别</h3>
      <h3 style="color: #888;font-weight: 400">--- RECOGNITION ---</h3></div>
    <div class="cardContain">
      <div class="wrapper-card2">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="string"
          accept="image/jpeg,image/png,image/jpg"
          list-type="picture-card"
          :before-upload="onBeforeUploadImage"
          :http-request="UploadImage"
          :on-change="fileChange"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过5M</div>
        </el-upload>
      </div>

      <div>
        <el-button  type="primary" class='editor' @click="getPersonDetail2()">查看结果</el-button>
      </div>

    </div>

    <!--人员管理-->
    <div class="division">
      <h3>人员管理</h3>
      <h3 style="color: #888;font-weight: 400">--- PERSONS ---</h3>
    </div>
    <div class="newsContain">
      <div class="temp">
        <!--        @click="personDetail(item.id)-->
        <div class="newsItem" v-for="(item, key) in personList" :key="key" @click="getPersonDetail(item.personId, item.personName)">
          <div class="picContain" ontouchstart="this.classList.toggle('hover');">
            <meta name="referrer" content="no-referrer"/>
            <img :src=item.faceBase height="75" width="75">
          </div>
          <div>
            <p style="white-space: pre-wrap;">姓名：{{item.personName}}   性别：{{item.gender}}   id：{{item.personId}}   人脸id：{{item.faceId}}</p>
            <p style="margin-top:25px">描述： {{item.personExDescription}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="division"><h3>关于我们</h3>
      <h3 style="color: #888;font-weight: 400">--- ABOUT ---</h3></div>
    <div class="aboutus">
      <div id="aboutusInfo">
        <p style="font-size: 200%">无人机人脸识别系统</p>
        <p style="font-size: 200%">采用无人机捕捉信息，进行人脸识别，维稳治安！</p>
      </div>
    </div>
    <div class="division"><h3>联系我们</h3>
      <h3 style="color: #888;font-weight: 400">--- CONTACT ---</h3></div>
    <div class="footer">
      <a href="https://github.com/pq-dong"><img src="../assets/github.png"><span>山东警察学院</span></a>
      <a href="https://github.com/erxuesun"><img src="../assets/github.png"><span>司马忠源</span></a>
    </div>
  </div>
</template>

<script>
    import {Message} from "element-ui";
    import fetch from '../api/fetch';

    export default {
        data() {
            return {
                crouselImg: [
                    {img: 'http://5b0988e595225.cdn.sohucs.com/images/20190423/71dd2c40bea64a8b8dd2e20add3a069d.jpeg'},
                    {img: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fcms-bucket.ws.126.net%2F2020%2F0129%2Fc85413bdj00q4ucr9000lc000j600brc.jpg&thumbnail=660x2147483647&quality=80&type=jpg'},
                    {img: 'https://ydschool-video.nosdn.127.net/1613659868286fdf9516415e923a989c41ed3fdf8eae0+%281%29.jpg'},

                ],
                activeIndex2: '1',
                faceResult: {},
                personList: [],
                isShow: false,
            };
        },

        mounted() {
            window.addEventListener('scroll', this.handler);
            this.getPerson();
        },

        methods: {
            onBeforeUploadImage(file) {
                const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
                const isLt1M = file.size / 1024 / 1024 < 5
                if (!isIMAGE) {
                    Message.error('上传文件只能是图片格式!')
                }
                if (!isLt1M) {
                    Message.error('上传文件大小不能超过 5MB!')
                }
                return isIMAGE && isLt1M
            },
            UploadImage(param) {
                var reader = new FileReader();
                let result = '';
                reader.readAsDataURL(param.file);
                reader.onload = function () {
                    result = reader.result
                }
                reader.onerror = function (error) {
                    console.log(error)
                }
                reader.onloadend = function () {
                    console.log(result)
                    fetch.distinguish({
                        image: result,
                    }).then((res) => {
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                console.log(res)
                                localStorage.setItem('personId', res.data.data.personId);
                                localStorage.setItem('personName', res.data.data.personName);
                                Message({
                                    type: 'success',
                                    message: "搜索成功，请点击查看按钮，查看结果",
                                });
                                this.isShow = true
                            } else {
                                Message({
                                    type: 'error',
                                    message: res.data.description,
                                });
                            }
                        }
                    });
                }
            },
            fileChange(file) {
                this.$refs.upload.clearFiles() //清除文件对象
            },

            handler() {
                const info = document.getElementById('aboutusInfo') || null;
                const card = document.getElementsByClassName('temp')[0] || null;
                if (info === null || card === null) {

                } else if (document.documentElement.scrollTop > 1000) {
                    card.classList.add('animated');
                    card.classList.add('bounceInLeft');
                    info.classList.add('animated');
                    info.classList.add('bounceInLeft');
                } else {
                    info.classList.remove('animated');
                    info.classList.remove('bounceInLeft');
                    card.classList.remove('animated');
                    card.classList.remove('bounceInLeft');
                }
            },

            getPersonDetail(id, name) {
                localStorage.setItem('personId', id);
                localStorage.setItem('personName', name);
                this.$router.push({name: 'personInfo'});
            },

            getPersonDetail2() {
                this.$router.push({name: 'personInfo'});
            },

            getPerson() {
                fetch.getPerson(0,1000)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log(res)
                            if (res.data.code === 0) {
                                this.personList = res.data.data.persons;
                            }
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
  @import "../assets/Animate/animate.min.css";

  * {
    box-sizing: border-box;
  }

  body {
    background: #ededed;
    padding: 0;
    margin: 0;
  }


  .indexContain {
    width: 100%;
    height: 100%;
    border: 1px solid #ededed;
    background: #fff;
  }

  .cardContain {
    width: 100%;
    height: 100%;
    background: #fff;
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


  .footer {
    width: 100%;
    height: 100px;
    background: black;
    padding-top: 20px
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

  #aboutusInfo {
    margin-top: 80px;
    animation-delay: 1s
  }

  .cardBox {
    position: relative;
    width: 1200px;
    margin: 20px auto 30px auto;
    box-shadow: 0 10px 15px #888;
    border-radius: 6px;
  }

  .wrapper-card2 {
    width: 1200px;
    height: 230px;
    margin: 30px auto auto auto;
    padding-top: 30px;
  }

  .wrapper-cardx .card {
    color: #07111B;
    font-size: 16px;
    width: 230px;
    height: 243px;
    float: left;
    margin: 30px;
    border-radius: 6px;
  }

  .wrapper-cardx .card:hover {
    transform: translateY(-5px);
    transition: 3ms;
    box-shadow: 5px 5px 10px #888;
  }

  .wrapper-cardx .image {
    border-radius: 6px 6px 0 0;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border-radius: 6px;
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

  .boxImg {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .division {
    width: 100%;
    margin: 30px auto;
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


</style>
