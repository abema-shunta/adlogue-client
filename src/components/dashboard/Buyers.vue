<template>
  <v-list>
    <v-list-tile
      v-for="buyer in buyers"
      :key="buyer.id"
      avatar
      @click=""
    >
      <v-list-tile-action>
        <v-icon v-if="buyer.state" color="pink">star</v-icon>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title v-text="buyer.name"></v-list-tile-title>
      </v-list-tile-content>

      <v-list-tile-avatar>
      </v-list-tile-avatar>
    </v-list-tile>
  </v-list>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Buyers',
  data () {
    return {
      buyers: []
    }
  }, 
  created () {
    const self = this
    let params = new URLSearchParams();
    params.append('session', localStorage.token);
    axios
      .post('https://ad.ec-concier.com/adlogue/user.json/buyer/select',params)
      .then((res) => {
        self.buyers = res.data.list.data
      });
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
</style>
