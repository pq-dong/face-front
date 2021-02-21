<template>
  <div>
    <div class="wrapper-card2">
      <el-upload
        class="formWrap2"
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
    <el-form :model="list" status-icon :rules="rules2" ref="list" label-width="100px" class="formWrap"
             v-if="isEdit">
      <el-form-item label="personId" prop="personId" style="text-align: center">
        <el-input v-model="list.personId" auto-complete="off"></el-input>
      </el-form-item>
      <span>
        <el-form-item label="用户名称" prop="personName" style="text-align: center">
        <el-input v-model="list.personName" auto-complete="off"></el-input>
      </el-form-item>
      </span>
      <span>
        <el-form-item label="性别" prop="gender" style="text-align: center">
        <el-select v-model="list.gender" placeholder="请选择性别" style="width: 100%">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      </span>
      <el-form-item>
        <el-button @click="submitInfo('list')">提交</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button v-if="!isEdit" class="edit" @click="toIndex">返回</el-button>
    </div>
  </div>
</template>


<script>/* eslint-disable indent */

import fetch from '../api/fetch';
import {Message} from "element-ui";

export default {
    data() {
        const checknickname = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('personId不能为空，必须为英文'));
            }
            callback();
        };
        const checknickname2 = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('personName不能为空'));
            }
            callback();
        };
        const checksex = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('性别不能为空'));
            }
            callback();
        };
        return {
            refresh: 0,
            isEdit: true,
            list: {},
            rules2: {
                personId: [{validator: checknickname, trigger: 'blur'}],
                personName: [{validator: checknickname2, trigger: 'blur'}],
                gender: [{validator: checksex, trigger: 'blur'}],
            },
        };
    },
    mounted() {
    },
    watch: {
        refresh() {
            location.reload();
        },
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
                localStorage.setItem('faceBase', result);
                Message({
                    type: 'success',
                    message: "上传成功",
                });
            };
        },

        fileChange(file) {
            this.$refs.upload.clearFiles() //清除文件对象
        },
        toIndex() {
            this.$router.push({name: 'index'});
        },
        // 提交订单信息
        submitInfo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.list.faceBase = localStorage.getItem("faceBase");
                    console.log(this.list);
                    fetch
                        .addPersonInfo(this.list)
                        .then((res) => {
                            console.log('list', this.list);
                            if (res.data.code === 0) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success',
                                });
                                this.$router.push({name: 'personList'});
                            } else {
                                this.$message({
                                    message: res.data.description,
                                    type: 'error',
                                });
                            }
                        })
                        .catch((e) => {
                            this.$message({
                                message: e,
                                type: 'error',
                            });
                        });
                } else {
                    console.log('error submit!!');
                }
            });
        },
    }
    ,
}
;
</script>


<style>
  table {
    width: 600px;
    font-size: 16px
  }

  table tr td {
    padding: 11.2px;
    text-align: left;
  }

  .formWrap {
    width: 500px;
    margin-left: 1000px;
    margin-top: 100px;
    font-size: 18px;
  }

  .formWrap2 {
    width: 500px;
    margin-left: 1000px;
    margin-top: 100px;
    font-size: 18px;
  }

  .edit {
    /*position: inherit;*/
    /*left: 300px;*/
    /*margin: 10px auto auto 10px;*/
  }


  .mutli dd, .singleli dd {
    float: left;
    margin-right: 6px;
    vertical-align: middle;
    padding: 3px 15px 1px 20px;
    cursor: pointer;
    color: #006fbc;
    display: inline-block;
  }

  .mutli input[type="checkbox"], .singleli input[type="checkbox"] {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 3px 15px;
    cursor: pointer;
    color: #006fbc;
    margin-left: -18px;
  }


</style>
