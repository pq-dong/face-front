<template>
  <header>
    <div class="contain">
      <div>
        <span @click="redirect(1)" class="tab">人脸识别系统，识别</span>
      </div>
      <div>
        <span @click="redirect(2)" class="tab">
          <i style="margin-left:0.3rem" @click="redirect(2)">
            </i>人员列表
          </span>
        <span @click="redirect(3)" class="tab">
          <i style="margin-left:0.3rem" @click="redirect(3)">
            </i>增加人员
          </span>
      </div>
    </div>
  </header>
</template>

<script>/* eslint-disable standard/object-curly-even-spacing */

export default {
    data() {
        return {
            index: 0,
            count: 0,
            amount: 0,
            content: '',
            companyList: [],
            msg: '',
            isShow: true,
        };
    },
    created() {
    },
    watch: {
        amount() {
            location.reload();
        },
    },
    mounted() {
        if (localStorage.getItem('token') !== null) {
            this.isShow = false;
        }
    },
    methods: {
        redirect(num) {
            if (num === 1) {
                this.$router.push({name: 'index'});
            } else if (num === 2) {
                this.$router.push({name: 'personList'});
            } else if (num === 3) {
                this.$router.push({name: 'userInfo'});
            }
        },
    },
};
</script>


<style>
  html * {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  header {
    width: 100%;
    height: 60px;
    background: rgba(0, 0, 0, 0.8);
  }

  .contain {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: auto;
    line-height: 60px;
    font-weight: 500;
  }

  .contain .tab {
    color: white;
    font-size: 16px;
    margin: 10px;
    padding: 6px;
    border-radius: 4px;
  }


</style>
