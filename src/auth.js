/* globals localStorage */

import axios from 'axios'

export default {
    login (username, pass, cb) {
      cb = arguments[arguments.length - 1]
      if (localStorage.token) {
        if (cb) cb(true)
        this.onChange(true)
        return
      }
      request(username, pass, (res) => {
        if (res.authenticated) {
          localStorage.token = res.token
          if (cb) cb(true)
          this.onChange(true)
        } else {
          if (cb) cb(false)
          this.onChange(false)
        }
      })
    },
  
    getToken () {
      return localStorage.token
    },
  
    logout (cb) {
      delete localStorage.token
      if (cb) cb()
      this.onChange(false)
    },
  
    loggedIn () {
      return !!localStorage.token
    },
  
    onChange () {}
  }
  
  function request (username, pass, cb) {
    require('axios-debug')(axios);
    let params = new URLSearchParams();
    params.append('login_id', username);
    params.append('password', pass);
    axios.post('http://localhost:9999/https://ad.ec-concier.com/adlogue/user.json/login/auth',
    params,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(response){
        console.log(response);
        cb({
            authenticated: true,
            token: response.data.session
        });
    });
}