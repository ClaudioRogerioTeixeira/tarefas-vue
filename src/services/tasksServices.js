import axios from 'axios';

export default {

  getTasks:() => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/tasks`);
  },

  getTask:(id) => {
    return axios.get(`${process.env.VUE_APP_BASE_URL}/tasks/${id}`)
  },

  postTasks:(task) => {
    return axios.post(`${process.env.VUE_APP_BASE_URL}/tasks`, task)
  },

  putTask:(task) => {
    return axios.put(`${process.env.VUE_APP_BASE_URL}/tasks/${task.id}`, task)
  },

  deleteTask:(id) => {
    return axios.delete(`${process.env.VUE_APP_BASE_URL}/tasks/${id}`)
  }

}