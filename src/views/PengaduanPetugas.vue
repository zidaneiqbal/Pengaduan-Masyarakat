<template>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p style="font-family: sans-serif" class="card-title float-left"><b>Pengaduan Masyarakat</b></p>
                  <div class="table-responsive">
                    <b-table striped hover :items="pengaduan" :fields="fields">
                      <template v-slot:cell(Aksi)="data">
                        <b-button  class="mr-2" style="font-family: sans-serif" variant="dark" size="sm" v-on:click="editStatus(data.item)" v-b-modal.modalStatus>
                            Ubah Status
                        </b-button>
                        <b-button style="font-family: sans-serif" variant="dark" size="sm" v-on:click="tambahTanggapan(data.item)" v-b-modal.modalTanggapan>
                            Beri Tanggapan
                        </b-button>
                        <br>
                        <b-button class="mt-2" style="font-family: sans-serif" variant="danger" size="sm" v-on:click="generateReport(data.item.id_pengaduan)">
                            Lapor
                        </b-button>
                      </template>
                      <template v-slot:cell(tanggal_pengaduan)="data">
                        {{ data.item.tgl_pengaduan }}
                      </template>
                      <template v-slot:cell(foto)="data">
                        <img class="mt-2 mb-2" style="width:200px; height: 150px; border-radius:10%" :src="'http://localhost:8000/uploads/' + data.item.foto" />
                      </template>
                      <!-- <template v-slot:cell(tanggapan)="data">
                        {{ data.item.tanggapan.tanggapan }}
                      </template> -->
                    </b-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- main-panel ends -->

      <!-- Ganti Status Pengaduan -->
      <b-modal
      id="modalStatus"
      title="Ganti Status Pengaduan"
      header-bg-variant="light"
      border-variant="light"
      hide-footer>
        <b-container fluid>
          <form v-on:submit.prevent="Save">
            Status :
            <select class="form-control mt-2 pb-2 pt-2" v-model="status">
              <option value="terkirim">Terkirim</option>
              <option value="proses">Proses</option>
              <option value="selesai">Selesai</option>
              <option value="tolak">Tolak</option>
            </select>
            <b-button variant="primary" class="pull-right btn-sm mt-4" type="submit">
                Simpan
            </b-button>
          </form>
        </b-container>
        <template v-slot:modal-footer>

        </template>

      </b-modal>
      <!-- Ganti Status Pengaduan -->

      <div>
                            <vue-html2pdf
                              :show-layout="false"
                              :float-layout="true"
                              :enable-download="false"
                              :preview-modal="true"
                              :paginate-elements-by-height="1000"
                                filename="Invoice"
                              :pdf-quality="2"
                              :manual-pagination="true"
                                pdf-format="a4"
                                pdf-orientation="portrait"
                                pdf-content-width="800px"

                    @hasStartedGeneration="hasStartedGeneration()"
                    @hasGenerated="hasGenerated($event)"
                    ref="html2Pdf" >
                    <section slot="pdf-content">
                        <div class="invoice-box">
                    <table>
                      <tr class="top">
                        <td colspan="2">
                          <table>
                            <tr>
                            <td class="title">
                              <img src="../assets/zdn.png" alt="Company logo" style="max-width: 50px" />
                            </td>
                            <td>
                              Dengan: {{ this.nama_petugas }} <br />
                              Tanggal: {{reportt.tgl_tanggapan}}<br />
                              Kategori: {{reportk.nama_kategori}} <br />
                              Status: {{reportp.status}}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr class="heading">
                      <td>Data User</td>
                      <td> #</td>
                    </tr>

                     <tr class="details" :items="user">
                      <td>NIK</td>
                      <td> {{reports.nik}} </td>
                    </tr>

                    <tr class="details" :items="user">
                      <td>Nama Lengkap</td>
                      <td> {{reports.nama}} </td>
                    </tr>

                    <tr class="details" :items="user">
                      <td>Username</td>
                      <td> {{reports.username}} </td>
                    </tr>

                     <tr class="details" :items="user">
                      <td>Telepon</td>
                      <td> {{reports.telp}} </td>
                    </tr>

                    <tr class="heading">
                      <td>Data Pengaduan</td>

                      <td> #</td>
                    </tr>

                    <tr class="item">
                      <td>Tanggal Pengaduan</td>
                      <td> {{reportp.tgl_pengaduan}} </td>
                    </tr>

                    <tr class="item">
                      <td>Laporan</td>
                      <td> {{reportp.isi_laporan}} </td>
                    </tr>

                    <tr class="item">
                      <td>Status</td>
                      <td> <span v-if="reportp.status"> {{reportp.status}} </span> <span v-else>-</span></td>
                    </tr>
                     <tr class="item last">
                      <td>Bukti</td>
                      <td> <img v-if="reportp.foto"
                            style="width: 50px;"
                            :src="'http://localhost:8000/uploads/' + reportp.foto">
                      </td>
                    </tr>

                  </table>
                </div>
                    </section>
                </vue-html2pdf>
              </div>


      <!-- Tambah Tanggapan -->
      <b-modal
      id="modalTanggapan"
      title="Tambah Tanggapan"
      header-bg-variant="light"
      border-variant="light"
      hide-footer>
        <b-container fluid>
          <form v-on:submit.prevent="Save">
            Tanggapan Tentang Pengaduan :
            <b-form-input v-model="tanggapan" class="mt-2 mb-2 text" required></b-form-input>
            <b-button variant="primary" class="pull-right btn-sm mt-4" type="submit">
                Simpan
            </b-button>
          </form>
        </b-container>
      </b-modal>
      <!-- Tambah Tanggapan -->

      <!-- Toast -->
      <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
        <b-spinner label="Spinning" variant="success"></b-spinner>
        <strong class="text-success"> Loading...</strong>
      </b-toast>

      <b-toast id="message" title="Message">
        <strong class="text-success">{{ message }}</strong>
      </b-toast>
      <!-- Toast -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
    data() {
      return {
        id_pengaduan : "",
        status: "",
        tgl_pengaduan: "",
        tanggapan: "",
        action: "",
        nama_petugas: "",
        message: "",
        reportp: "",
        reports: "",
        reportt: "",
        reportk: "",
        token : "",
        pengaduan : [],
        user: [],
        fields: ["isi_laporan", "status", "tanggal_pengaduan", "foto", "Aksi"]
      }
    },

    methods: {
        getData : function(){
          let conf = { headers: { "Authorization" : 'Bearer ' + this.token } };
          this.$store.dispatch("getPengaduan")
          .then(response => {
              this.pengaduan = response.data.data.pengaduan;
              this.nama_petugas = localStorage.getItem("userNama");
          })
          .catch(err => console.log(err))
        },

        tambahTanggapan : function(item){
          this.action = "tambahTanggapan";
          this.id_pengaduan = item.id_pengaduan;
        },

        editStatus : function(item){
          this.action = "editStatus";
          this.id_pengaduan = item.id_pengaduan;
          this.status = item.status;
        },

        generateReport (id){
          let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
          this.$bvToast.show("loadingToast");
          this.$store.dispatch("getPengaduanId", id)
          .then(response => {
              this.$bvToast.hide("loadingToast");
              this.reportp = response.data.data.pengaduan[0];
              this.reports = response.data.data.pengaduan[0].user;
              this.reportt = response.data.data.pengaduan[0].tanggapan;
              this.reportk = response.data.data.pengaduan[0].kategori;
              this.$refs.html2Pdf.generatePdf()
          })
        },

        Save : function(){
          this.$bvToast.show("loadingToast");
          let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
          let form = new FormData();
          form.append("action", this.action);
          form.append("id_pengaduan", this.id_pengaduan);
          form.append("status", this.status);
          form.append("tanggapan", this.tanggapan);

          if(this.action === "tambahTanggapan"){
            this.$store.dispatch("addTanggapan", form)
            .then(response => {
              this.$bvModal.hide("modalTanggapan");
              this.$bvToast.hide("loadingToast");
              this.message = response.data.message;
              this.$bvToast.show("message");
              console.log(this.message);
              this.getData();
            })
            .catch(error => {
              console.log(error);
            });
          } else {
            this.$store.dispatch("editStatus", form)
            .then(response => {
              this.$bvModal.hide("modalStatus");
              this.$bvToast.hide("loadingToast");
              this.message = response.data.message;
              this.$bvToast.show("message");
              console.log(this.message);
              this.getData();
            })
            .catch(error => {
              console.log(error);
            });
          }
        },
    },
    components: {
        VueHtml2pdf
    },
    mounted(){
      this.getData();
    }
}
</script>

<style scoped>
body {
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				text-align: center;
				color: #777;
			}

			body h1 {
				font-weight: 300;
				margin-bottom: 0px;
				padding-bottom: 0px;
				color: #000;
			}

			body h3 {
				font-weight: 300;
				margin-top: 10px;
				margin-bottom: 20px;
				font-style: italic;
				color: #555;
			}

			body a {
				color: #06f;
			}

			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
				border-collapse: collapse;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}
</style>
