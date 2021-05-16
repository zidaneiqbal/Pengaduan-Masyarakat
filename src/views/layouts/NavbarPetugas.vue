<template>
  <div class="horizontal-menu">
      <nav class="navbar top-navbar col-8">
        <div class="nav-top flex-grow-1">
          <div class="container align-items-center">
            <div class="text-center navbar-brand-wrapper justify-content-center">
              <a class="navbar-brand brand-logo" href="/"><img src="../../assets/zdn.png"></a>
              <a class="navbar-brand brand-logo-mini" href="/"><img src="../../assets/zdn.png"></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-1">
            <ul class="navbar-nav navbar-nav-right">
              <li class="nav-item nav-profile">
                <b-nav-item v-if="isLoggedIn" @click="logout">
                  <span class="mdi mdi-logout menu-icon"></span>
                  Logout
                </b-nav-item>
              </li>
            </ul>
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
              data-toggle="horizontal-menu-toggle">
              <span class="mdi mdi-menu"></span>
            </button>
          </div>
          </div>
        </div>
      </nav>
      <nav class="bottom-navbar align-center">
        <div class="container">
          <ul class="nav page-navigation">
            <li class="nav-item">
              <router-link to="/homePetugas" class="nav-link">
                <i class="mdi mdi-near-me menu-icon"></i>
                <span class="menu-title">Pengaduan</span>
              </router-link>
            </li>
            <li class="nav-item" v-if="this.level == 'admin'">
              <a class="nav-link" href="/dataPetugas">
                <i class="mdi mdi-account-settings menu-icon"></i>
                <span class="menu-title">Petugas</span>
              </a>
            </li>
            <li class="nav-item" v-if="this.level == 'admin'">
              <a class="nav-link" href="/dataMasyarakat">
                <i class="mdi mdi-account menu-icon"></i>
                <span class="menu-title">Masyarakat</span>
              </a>
            </li>
            <li class="nav-item" v-if="this.level == 'admin'">
              <a class="nav-link" href="/DataKategori">
                <i class="mdi mdi-kodi menu-icon"></i>
                <span class="menu-title">Kategori</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
      return {
        level: "",
        // nama: "",
        user: [],
        logged_user: {},
      }
    },
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn },
        // nama : function(){ return this.$store.getters.user.name },
        // level : function(){ return this.$store.getters.level }
    },
    methods:{
      getData : function(){
        let conf = { headers: { "Authorization" : 'Bearer ' + this.token } };
        this.level = localStorage.getItem("UserLevel");
        console.log(this.level);
      },
      logout:function(){
          this.$store.dispatch('logout')
          .then(response => {
            this.$store.commit('logout')
            localStorage.removeItem("Authorization")
            this.$router.push('/login')
          })
          .catch(error => {

        });
      },
  },
  mounted(){
    this.getData();
  }
}
</script>
