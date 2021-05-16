<template>
  <div class="app flex-row align-items-center">
    <div class="container mt-3">
      <b-row class="justify-content-center pt-3">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body class="mt-3">
                <b-form class="mt-5" v-on:submit.prevent="Register">
                  <h1>Register</h1>
                  <p class="text-muted">Register Account Disini</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fas fa-address-card mr-1"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-model="nik" class="form-control" placeholder="Masukkan NIK" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fas fa-address-card mr-1"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-model="nama" class="form-control" placeholder="Masukkan Nama" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fas fa-user mr-2"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-model="username" class="form-control" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="fas fa-user-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" v-model="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-input-group class="mb-5">
                    <b-input-group-prepend><b-input-group-text><i class="fas fa-address-book mr-2"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="text" v-model="telp" class="form-control" placeholder="No. Telepon" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12">
                      <b-button type="submit" variant="primary" class="px-4">Register</b-button>
                    </b-col>
                  </b-row>
                </b-form>
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
        nik: '',
        nama: '',
        username: '',
        password: '',
        telp: '',
        message: '',
        success: 'false',
        user:[],
      }
    },
    methods: {
      Register : function(){
        let form = new FormData();
        this.$bvToast.show("loadingToast");

        form.append("nik", this.nik);
        form.append("nama", this.nama);
        form.append("username", this.username);
        form.append("password", this.password);
        form.append("telp", this.telp);

        this.$store.dispatch("register", form)
        .then(response => {
          let username = this.username
          let password = this.password
          this.message = response.data.message;
          this.$bvToast.hide("loadingToast");
          this.$bvToast.show("message");
          this.$router.push('/login');
        });
      },
    }
}
</script>
