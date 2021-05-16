<template>
  <div class="app flex-row align-items-center">
    <div class="container mt-3">
      <b-row class="justify-content-center pt-3">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body class="mt-3">
                <b-form class="mt-5" v-on:submit.prevent="Login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend><b-input-group-text><i class="fas fa-user mr-2"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-model="username" class="form-control" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="fas fa-user-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" v-model="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="5">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="7" class="text-right">
                      <b-button variant="link" v-on:click="pindahRegister" class="px-0">Register</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-secondary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Login To Access More</h2>
                  <div class="navbar-brand brand-logo mt-5 pt-3">
                    <img src="../assets/logozdn.png">

                  </div>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>

      <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
        <b-spinner label="Spinning" variant="success"></b-spinner>
        <strong class="text-success"> Loading...</strong>
      </b-toast>

      <b-toast id="message" title="Message">
        <strong class="text-success">{{ message }}</strong>
      </b-toast>

    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        username: '',
        password: '',
        message: '',
        level: '',
        user:[],
      }
    },
    methods: {
        Login: function(){
            let username = this.username
            let password = this.password
            this.$bvToast.show("loadingToast");
            this.$store.dispatch('login', { username, password })
            // .then(() => this.$router.push('/'))
            .then(response => {
              this.message = response.data.message;
              this.$bvToast.hide("loadingToast");
              this.$bvToast.show("message");
              console.log(this.message);
              this.user = response.data.user;
              if (this.user.level == "petugas" || "admin") {
                this.$bvToast.hide("loadingToast");
                this.$router.push('/homePetugas');
                // this.$router.push('/homePetugas')
              } if (this.user.level == "masyarakat") {
                this.$bvToast.hide("loadingToast");
                this.$router.push('/pengaduanMasyarakat');
                // this.$router.push('/HomeMasyarakat')
              }
            })
            .catch(error =>{
              console.log(error);
            });
        },
        pindahRegister: function(){
          this.$router.push('/register');
        }
    }
}
</script>
