<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p style="font-family: sans-serif" class="card-title float-left"><b>Kategori :</b></p>
                  <b-button style="font-family: sans-serif" class="mdi mdi-plus card-outline float-right" size="m" v-on:click="addKategori" v-b-modal.modalKategori>
                    Tambah Kategori
                  </b-button>
                  <div class="table-responsive">
                    <b-table striped hover :items="kategori" :fields="fields">
                      <template v-slot:cell(Aksi)="data">
                        <b-button class="mr-2" style="font-family: sans-serif" variant="danger" size="sm" v-on:click="hapusKategori(data.item.id_kategori)">
                            Hapus
                        </b-button>
                      </template>
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
      id="modalKategori"
      title="Tambah Kategori"
      header-bg-variant="light"
      border-variant="light"
      hide-footer>
        <b-container fluid>
          <form v-on:submit.prevent="Save">
            Nama Kategori :
            <b-form-input v-model="nama_kategori" class="mt-2 mb-2 text" required></b-form-input>
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
        id_kategori: "",
        nama_kategori: "",
        action : "",
        message: "",
        kategori: [],
        token : "",
        fields: ["id_kategori", "nama_kategori", "Aksi"]
      }
    },
    methods: {
        getKategori : function(){
          let conf = { headers: { "Authorization" : 'Bearer ' + this.token } };
          this.$store.dispatch("getKategoriPetugas")
          .then(response => {
            this.kategori = response.data.data.kategori;
          })
          .catch(err => console.log(err))
        },

        addKategori : function(){
          this.action = "insert";
          this.nama_kategori = "";
        },

        Save : function(){
          let conf = { headers: { "Authorization" : 'Bearer ' + this.token } };
          this.$bvToast.show("loadingToast");
          this.$bvModal.hide("modalKategori");
          let form = new FormData();
          form.append("action", this.action);
          form.append("nama_kategori", this.nama_kategori);

          this.$store.dispatch("addKategori", form)
          .then(response => {
            this.$bvToast.hide("loadingToast");
            this.getKategori();
          })
          .catch(error => {
            console.log(error);
          });
        },
        hapusKategori : function(id){
            let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
            if(confirm('Apakah anda yakin ingin menghapus data ini?')){
                this.message = "Mohon tunggu...";
                this.$store.dispatch("hapusKategori", id)
                .then(response => {
                    this.getKategori();
                    console.log(id);
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
      this.getKategori();
    }
}
</script>
