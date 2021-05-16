<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p style="font-family: sans-serif" class="card-title float-left"><b>Data Petugas :</b></p>
                  <b-button style="font-family: sans-serif" class="mdi mdi-plus card-outline float-right" size="m" v-on:click="addPetugas" v-b-modal.modalPetugas>
                    Tambah Petugas
                  </b-button>
                  <div class="table-responsive">
                    <b-table striped hover :items="petugas" :fields="fields">
                      <template v-slot:cell(Aksi)="data">
                        <b-button  class="mr-2" style="font-family: sans-serif" variant="secondary" size="sm" v-on:click="editPetugas(data.item.id)" v-b-modal.modalPetugas>
                            Edit
                        </b-button>
                        <b-button  class="mr-2" style="font-family: sans-serif" variant="danger" size="sm" v-on:click="hapuPetugas(data.item.id)">
                            Hapus
                        </b-button>
                      </template>
                      <!-- <template v-slot:cell(tanggal_pengaduan)="data">
                        {{ data.item.tgl_pengaduan }}
                      </template>
                      <template v-slot:cell(tanggapan)="data">
                        {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan :null }}
                      </template> -->
                    </b-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Ganti Masyarakat -->
      <b-modal
      id="modalPetugas"
      title="Ubah Data"
      header-bg-variant="light"
      border-variant="light"
      hide-footer>
        <b-container fluid>
          <form v-on:submit.prevent="Save">
            NIK :
            <b-form-input v-model="nik" class="form-control mt-2 mb-2 text" required></b-form-input>
            Nama :
            <b-form-input v-model="nama" class="mt-2 mb-2 text" required></b-form-input>
            Username :
            <b-form-input v-model="username" class="mt-2 mb-2 text" required></b-form-input>
            Password :
            <b-form-input type="password" v-model="password" class="mt-2 mb-2 text"></b-form-input>
            Telepon :
            <b-form-input v-model="telp" class="mt-2 mb-2 text" required></b-form-input>
            Level :
            <select class="form-control mt-2 mb-2 text" name="level" id="level" v-model="level">
                <option value="admin" checked>Admin</option>
                <option value="petugas">Petugas</option>
                <option value="masyarakat">Masyarakat</option>
            </select>
            <b-button variant="primary" class="pull-right btn-sm mt-4 mb-4" type="submit">
                Simpan
            </b-button>
          </form>
        </b-container>
        <template v-slot:modal-footer>

        </template>
      </b-modal>
      <!-- Ganti Masyarakat -->

      <b-toast id="message" title="Message">
        <strong class="text-success">{{ message }}</strong>
      </b-toast>

      <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
        <b-spinner label="Spinning" variant="success"></b-spinner>
        <strong class="text-success">Loading...</strong>
      </b-toast>

      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
</template>

<script>
export default {
    data() {
      return {
        id : "",
        nama : "",
        nik: "",
        telp: "",
        password: "",
        username: "",
        level: "",
        action : "",
        message: "",
        petugas: [],
        token : "",
        fields: ["nik", "username", "nama", "telp", "level", "Aksi"]
      }
    },
    methods: {
        getPetugas : function(){
          let conf = { headers: { "Authorization" : 'Bearer ' + this.token } };
          this.$store.dispatch("getPetugas")
          .then(response => {
            this.petugas = response.data.data.user;
          })
          .catch(err => console.log(err))
        },

        addPetugas : function(){
          this.action = "insert";
          this.nik = "",
          this.nama = "";
          this.username = "";
          this.password = "";
          this.level = "";
          this.telp = "";
        },

        editPetugas: function(id){
          this.action = "edit";
          this.$store.dispatch("getPetugasId", id)
          .then(response => {
              if(response.data.success == true){
                  this.action = "update";
                  this.id = response.data.data.user[0].id;
                  this.nik = response.data.data.user[0].nik;
                  this.username = response.data.data.user[0].username;
                  this.nama = response.data.data.user[0].nama;
                  this.password = "";
                  this.level = response.data.data.user[0].level;
                  this.telp = response.data.data.user[0].telp;
              } else {
                  this.message = "Gagal menampilkan data petugas."
              }
          })
          .catch(error => {
              console.log(error);
          });
        },

        Save : function(){
          let conf = { headers: { "Authorization" : 'Bearer ' + this.token } };
          this.$bvToast.show("loadingToast");
          this.$bvModal.hide("modalPetugas");
          let form = new FormData();
          form.append("action", this.action);
          form.append("nik", this.nik);
          form.append("nama", this.nama);
          form.append("username", this.username);
          form.append("password", this.password);
          form.append("telp", this.telp);
          form.append("level", this.level);
          if (this.action == "insert") {
            this.$store.dispatch("addPetugas", form)
            .then(response => {
              this.$bvToast.hide("loadingToast");
              this.getPetugas();
            })
            .catch(error => {
              console.log(error);
            });
          } else {
            let form = {
                nama: this.nama,
                password: this.password,
                level: this.level,
                telp: this.telp
            }
            this.axios.put("/petugas/" + this.id, form, conf)
            .then(response => {
                this.message = "Mohon tunggu...";
                this.getPetugas();
                this.message = "";
                this.$bvToast.hide("loadingToast");
            })
            .catch(error => {
                console.log(error);
            });
          }
        },
        hapuPetugas : function(id){
            let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
            if(confirm('Apakah anda yakin ingin menghapus data ini?')){
                this.message = "Mohon tunggu...";
                this.$store.dispatch("hapusPetugas", id)
                .then(response => {
                    this.getPetugas();
                    this.message = "";
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
    },
    mounted(){
      this.token = localStorage.getItem("Authorization");
      this.getPetugas();
    }
}
</script>
