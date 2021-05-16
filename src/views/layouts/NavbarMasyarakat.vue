<template>
  <div class="horizontal-menu">
      <nav class="navbar top-navbar col-8">
        <div class="nav-top flex-grow-1">
          <div class="container align-items-center">
            <div class="text-center navbar-brand-wrapper justify-content-center">
              <a class="navbar-brand float-left brand-logo"><img src="../../assets/zdn.png"></a>
              <a class="navbar-brand float-left brand-logo-mini"><img src="../../assets/zdn.png"></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-1">
            <ul class="navbar-nav navbar-nav-right">
              <li class="nav-item nav-profile dropdown">
                <b-nav-item v-if="isLoggedIn" @click="logout">Logout</b-nav-item>
                <b-nav-item href="/login" v-else>Login</b-nav-item>
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
      <nav class="bottom-navbar">
        <div class="container">
          <ul class="nav page-navigation">
            <li class="nav-item">
              <a class="nav-link" href="petugas.html">
                <i class="mdi mdi-account-settings menu-icon"></i>
                <span style="font-family: popins; font-size: 15px;" class="menu-title">Pengaduan</span>
              </a>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="/tambahPengaduanMasyarakat">
                <i class="mdi mdi-file-document-box-outline menu-icon"></i>
                <span style="font-family: popins"  class="menu-title">Tambah Pengaduan</span>
              </a>
            </li> -->
          </ul>
        </div>
      </nav>
      <!-- <li class="nav-item" v-if="level == 'petugas'">
      <a class="nav-link" href="petugas.html">
      <i class="mdi mdi-account-settings menu-icon"></i>
      <span class="menu-title">Pengaduan</span>
    </a>
  </li> -->
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
      return {
        level: "",
        user: [],
        logged_user: {},
      }
    },
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods:{
      getData : function(){
        let conf = { headers: { "Authorization" : 'Bearer ' + this.token } };
        // this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
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
