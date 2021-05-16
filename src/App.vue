<template>
  <div id="app">
    <router-view name="header" />
    <router-view/>
    <router-view name="footer" />
  </div>
</template>

<script>
import Footer from './views/layouts/Footer'
import NavbarPetugas from './views/layouts/NavbarPetugas'
import NavbarMasyarakat from './views/layouts/NavbarMasyarakat'

export default {
  name: 'App',
  components: {
    NavbarPetugas,
    NavbarMasyarakat,
    Footer
  },
  data : function(){
    return {
      status_login: ''
    }
  }
}
</script>

<style>
#app {
  font-family: Fantasy;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
