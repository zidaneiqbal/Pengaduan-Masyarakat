import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		token: localStorage.getItem('Authorization') || '',
  		user : {},
			status : {},
			tanggapan: {},
			userLevel: '',

	},
	mutations: {
			auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token, logged){
		    state.status = 'success'
		    state.token = token
		    state.logged = logged
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
	  	},
			add_success(state){
				state.status = 'success'
			},
			// userLevel(state, level){
			// 	state.userLevel = level
			// }
	},
	actions: {
	  	login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: '/login', data: user, method: 'POST' })
	            .then(response => {
	                const token = response.data.token
	                const logged = response.data.logged
									const userLevel = response.data.user.level
									const userNama = response.data.user.nama
									localStorage.setItem('UserLevel', userLevel)
									localStorage.setItem('userNama', userNama)
	                localStorage.setItem('Authorization', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, logged)
									// commit('userLevel', userLevel)
	                resolve(response)
	            })
	            .catch(err => {
	                commit('auth_error')
	                localStorage.removeItem('Authorization')
	                reject(err)
	            })
	        })
	    },
	    register({commit}, user){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:8000/api/register', data: user, method: 'POST' })
	            .then(response => {
	                const token = response.data.token
	                const logged = response.data.logged
	                localStorage.setItem('Authorization', token)
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, logged)
	                resolve(response)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('Authorization')
	                reject(err)
	            })
	        })
	    },
	  	logout({commit}){
		    return new Promise((resolve) => {
		      	commit('logout')
		      	localStorage.removeItem('Authorization')
						localStorage.removeItem('User')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	},
			//Petugas
			getPetugasId({commit}, id){
				return new Promise((resolve, reject) => {
					commit('auth_request')
					axios({url: '/petugas/' + id, method: 'GET' })
					.then(response => {
						resolve(response)
					})
					.catch(err => {
						commit('auth_error')
						reject(err)
					})
				})
			},
			getPetugas({commit}){
				return new Promise((resolve, reject) => {
					commit('auth_request')
					axios({url: '/petugas', method: 'GET' })
					.then(response => {
						resolve(response)
					})
					.catch(err => {
						commit('auth_error')
						reject(err)
					})
				})
			},
			addPetugas({commit}, petugas){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: '/petugas', data: petugas, method: 'POST' })
	            .then(response => {
									commit('add_success')
	                resolve(response)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                reject(err)
	            })
	        })
	    },
			editPetugas({commit}, petugas, id){
				return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/petugas/' + id, data: petugas, method: 'PUT' })
							.then(response => {
									commit('add_success')
									resolve(response)
							})
							.catch(err => {
									commit('auth_error', err)
									reject(err)
							})
					})
			},
			hapusPetugas({commit}, id){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: '/petugas/' + id, method: 'DELETE' })
	            .then(response => {
									commit('add_success')
	                resolve(response)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                reject(err)
	            })
	        })
	    },
			//Petugas
			//Masyarakat
			getMasyarakatId({commit}, id){
				return new Promise((resolve, reject) => {
					commit('auth_request')
					axios({url: '/masyarakatid/' + id, method: 'GET' })
					.then(response => {
						resolve(response)
					})
					.catch(err => {
						commit('auth_error')
						reject(err)
					})
				})
			},
			getMasyarakat({commit}){
				return new Promise((resolve, reject) => {
					commit('auth_request')
					axios({url: '/masyarakat', method: 'GET' })
					.then(response => {
						resolve(response)
					})
					.catch(err => {
						commit('auth_error')
						reject(err)
					})
				})
			},
			addMasyarakat({commit}, masyarakat){
				return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/masyarakat', data: masyarakat, method: 'POST' })
							.then(response => {
									commit('add_success')
									resolve(response)
							})
							.catch(err => {
									commit('auth_error', err)
									reject(err)
							})
					})
			},
			editMasyarakat({commit}, masyarakat, id){
				return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/masyarakat/' + id, data: masyarakat, method: 'PUT' })
							.then(response => {
									commit('add_success')
									resolve(response)
							})
							.catch(err => {
									commit('auth_error', err)
									reject(err)
							})
					})
			},
			hapusMasyarakat({commit}, id){
				return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/masyarakat/' + id, method: 'DELETE' })
							.then(response => {
									commit('add_success')
									resolve(response)
							})
							.catch(err => {
									commit('auth_error', err)
									reject(err)
							})
					})
			},
			getKategori({commit}){
					return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/masyarakat/kategorii', method: 'GET' })
							.then(response => {
								resolve(response)
							})
							.catch(err => {
									commit('auth_error')
									reject(err)
							})
					})
			},
			//Masyarakat
			//Kategori
			getKategoriPetugas({commit}){
				return new Promise((resolve, reject) => {
					commit('auth_request')
					axios({url: '/kategori', method: 'GET' })
					.then(response => {
						resolve(response)
					})
					.catch(err => {
						commit('auth_error')
						reject(err)
					})
				})
			},
			addKategori({commit}, kategori){
				return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/kategori', data: kategori, method: 'POST' })
							.then(response => {
									commit('add_success')
									resolve(response)
							})
							.catch(err => {
									commit('auth_error', err)
									reject(err)
							})
					})
			},
			hapusKategori({commit}, id){
				return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/kategori/' + id, method: 'DELETE' })
							.then(response => {
									commit('add_success')
									resolve(response)
							})
							.catch(err => {
									commit('auth_error', err)
									reject(err)
							})
					})
				},
			//Kategori
			//Pengaduan
			addPengaduan({commit}, pengaduan){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: '/masyarakat/pengaduan', data: pengaduan, method: 'POST' })
	            .then(response => {
									commit('add_success')
	                resolve(response)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                reject(err)
	            })
	        })
	    },
			addTanggapan({commit}, tanggapan){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: '/pengaduan/tanggapan', data: tanggapan, method: 'POST' })
	            .then(response => {
									commit('add_success')
	                resolve(response)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                reject(err)
	            })
	        })
	    },
			getPengaduan({commit}){
					return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/pengaduan', method: 'GET' })
							.then(response => {
								resolve(response)
							})
							.catch(err => {
									commit('auth_error')
									reject(err)
							})
					})
			},
			getPengaduanId({commit}, id){
					return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/pengaduan/'+ id, method: 'GET' })
							.then(response => {
								resolve(response)
							})
							.catch(err => {
									commit('auth_error')
									reject(err)
							})
					})
			},
			getPengaduanMasyarakat({commit}){
					return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/masyarakat/pengaduan', method: 'GET' })
							.then(response => {
								resolve(response)
							})
							.catch(err => {
									commit('auth_error')
									reject(err)
							})
					})
			},
			//Pengaduan
			editStatus({commit}, status){
				return new Promise((resolve, reject) => {
							commit('auth_request')
							axios({url: '/pengaduan/status', data: status, method: 'POST' })
							.then(response => {
									commit('add_success')
									resolve(response)
							})
							.catch(err => {
									commit('auth_error', err)
									reject(err)
							})
					})
			},
	},
	getters : {
	  isLoggedIn: state => !!state.token,
		level: state => state.userLevel,
	  authStatus: state => state.status,
	}
})
