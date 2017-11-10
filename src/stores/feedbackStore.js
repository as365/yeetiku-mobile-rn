/* @flow */
import { observable,action  } from 'mobx'
import { httpInstance,config } from '../utils'
import { create } from '../services/feedback'

export default class BanksStore {
  @observable loading = false
  @observable done = false
  @observable progress = 0
  @action save = async (data) => {
    let http = await httpInstance()
    const httpconfig = {
      headers: { 'Content-Type': 'multipart/form-data' } ,
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
        this.progress = percentCompleted

        if ( percentCompleted === 100 ) {
          this.done = true
        }
      }
    }
    this.loading = true
    http.post(config.api.feedback, data,httpconfig).then((response) => {
      this.loading = false
    }).catch((error) => {
      this.loading = false
    })
  }

}
