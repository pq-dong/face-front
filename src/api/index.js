const host = 'http://face.pqdong.com:10011';
// const host = 'http://localhost:10011';

export default {
  // 提交用户信息
  addPersonInfo() {
    return `${host}/api/person/add`;
  },
  distinguish() {
    return `${host}/api/recognition/distinguish`;
  },
  getPerson() {
    return `${host}/api/person/list`;
  },
  getPersonInfo() {
    return `${host}/api/person/info`;
  },
  deletePerson() {
    return `${host}/api/person/delete`;
  }
};
