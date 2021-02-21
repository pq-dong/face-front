import api from './index';
import axios from '../http';

const headers = {
  'Content-Type': 'application/json',
  // 这里有一个很玄学的问题
  token: localStorage.getItem('token'),
};
export default {
  getPerson(num, size) {
    return axios.get(api.getPerson(), {params: {page: num, size: size}}, {headers});
  },
  getPersonInfo(id) {
    return axios.get(api.getPersonInfo(), {params: {personId: id}}, {headers});
  },
  deletePerson(id) {
    return axios.get(api.deletePerson(), {params: {personId: id}}, {headers});
  },
  distinguish(info) {
    return axios.post(api.distinguish(), JSON.stringify(info), {headers});
  },
  addPersonInfo(personInfo) {
    return axios.post(api.addPersonInfo(), JSON.stringify(personInfo), {headers});
  },
};
