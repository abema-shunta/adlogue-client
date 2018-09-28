<template>
  <div class="hello">
    <div v-if="$route.query.redirect"> 
    <v-alert
      :value="true"
      color="red"
      icon="warning"
      outline
    >
      You need to login first.
    </v-alert>
    </div>
    <v-layout fill-height justify-center align-center >
      <div>
      <v-layout justify-center row > 
      <h1>{{ msg }}</h1>
      </v-layout> 

      <v-layout justify-center row> 
      <v-card>
      <v-container
          fluid
          grid-list-md
        >
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
            v-model="pass"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="show = !show"
          ></v-text-field>
        <v-btn
          :disabled="!valid"
          @click="login"
        >
        submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
      </v-container>
      </v-card>
      </v-layout> 
      </div>
    </v-layout>
  </div>
</template>

<script>

import auth from '@/auth'

export default {
  data () {
    return {
      username: '',
      pass: '',
      error: false,
      msg: 'ec-concier CDAP',
      show: false,
      valid: false
    }
  },
  methods: {
    login () {
      auth.login(this.username, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {display: block; height: 100%}
</style>
