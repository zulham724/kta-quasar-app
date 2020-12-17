import axios from 'axios'

const actions = {
  show({commit},commentId){
		return new Promise((resolve,reject)=>{
			axios.get(`${this.state.Setting.url}/api/v1/comment/${commentId}`).then(res=>{
				resolve(res)
			}).catch(err=>{
				reject(err)
			})
		})
	}
}

export default actions
