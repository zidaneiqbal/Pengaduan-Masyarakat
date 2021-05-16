<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p style="font-family: sans-serif" class="card-title float-left"><b>Pengaduan :</b></p>
                  <b-button style="font-family: sans-serif" class="mdi mdi-plus card-outline float-right" size="m" v-b-modal.modalPengaduan>
                    Tambah Pengaduan
                  </b-button>
                  <div class="table-responsive">
                    <b-table striped hover :items="pengaduan" :fields="fields">
                      <template v-slot:cell(Aksi)="data">
                      </template>
                      <template v-slot:cell(tanggal_pengaduan)="data">
                        {{ data.item.tgl_pengaduan }}
                      </template>
                      <template v-slot:cell(tanggapan)="data">
                        {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan :null }}
                      </template>
                      <template v-slot:cell(kategori)="data">
                        {{ (data.item.kategori !== null) ? data.item.kategori.nama_kategori :null }}
                      </template>
                      <template v-slot:cell(foto)="data">
                        <img class="mt-2 mb-2" style="width:200px; height: 150px; border-radius:10%" :src="'http://localhost:8000/uploads/' + data.item.foto" />
                      </template>
                    </b-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Ganti Status Pengaduan -->
      <b-modal
      id="modalPengaduan"
      title="Laporkan Sesuatu"
      header-bg-variant="light"
      border-variant="light"
      hide-footer>
        <b-container fluid>
          <form v-on:submit.prevent="Save">
            Isi Laporan :
            <b-form-input v-model="isi_laporan" class="mt-2 mb-2 text" required></b-form-input>
            Kategori
            <b-form-select v-model="id_kategori" class="mb-1" required>
                <option v-for="item in kategori" :value="item.id_kategori" :key="item.id_kategori">
                    {{ item.nama_kategori }}
                </option>
            </b-form-select>
            Foto :
            <b-form-file id="foto" class="mb-1" :required="req_file"></b-form-file>
            <b-button variant="primary" class="pull-right btn-sm mt-4 mb-4" type="submit">
                Simpan
            </b-button>
          </form>
        </b-container>
        <template v-slot:modal-footer>

        </template>
      </b-modal>
      <!-- Ganti Status Pengaduan -->


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
        id_kategori: "",
        isi_laporan: "",
        name : "",
        password : "",
        tanggapan: "",
        file: "",
        foto: "",
        action : "",
        nama_kategori: "",
        req_file: "",
        tanggapan: [],
        kategori: [],
        pengaduan: [],
        token : "",
        fields: ["isi_laporan", "status", "tanggal_pengaduan", "kategori", "foto", "tanggapan"]
      }
    },
    methods: {
        getPengaduan : function(){
          let conf = { headers: { "Authorization" : 'Bearer ' + this.token } };
          this.$store.dispatch("getPengaduanMasyarakat")
          .then(response => {
              this.pengaduan = response.data.data.pengaduan;
          })
          .catch(err => console.log(err))
          this.$store.dispatch("getKategori")
          .then(response => {
            this.kategori = response.data.data.kategori;
          })
          .catch(err => console.log(err))
        },

        Add : function(){
          this.action = "insert";
          this.isi_laporan = item.isi_laporan;
          this.id_kategori = item.id_kategori;
          this.file = null;
          this.req_file = true;
        },

        Save : function(){
          let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
          this.$bvModal.hide("modalPengaduan");
          let form = new FormData();
          form.append("action", this.action);
          form.append("isi_laporan", this.isi_laporan);
          form.append("id_kategori", this.id_kategori);
          form.append("foto", document.getElementById("foto").files[0]);
          this.$store.dispatch("addPengaduan", form)
          .then(response => {
            this.getPengaduan();
          })
          .catch(error => {
            console.log(error);
          });
        },
    },
    mounted(){
      this.getPengaduan();
    }
}
</script>
