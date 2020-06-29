<template>
  <q-layout view="hHh Lpr fFf" class="bg-black">
    <q-page-container>
      <div id="crop" ref="crop" style="height:100vh"></div>
    </q-page-container>
    <q-footer class="bg-black">
      <div class="row justify-between">
          <q-btn color="white" text-color="black" label="Batal" @click="$router.back()"/>
          <q-btn color="white" text-color="black" label="Upload" @click="upload" :loading="loading" :disable="loading" />
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from "vuex"
import axios from 'axios'
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import Compressor from "compressorjs";

export default {
  props:{
    file: null
  },
  data() {
    return {
      cropper: "",
      loading: false
    };
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  mounted() {
    this.crop()
  },
  methods: {
    onSubmit() {

    },
    crop: function() {
      const file = this.file;
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

      if (
        validImageTypes.includes(fileType)
      ) {
        const reader = new FileReader();
        reader.readAsDataURL(this.file)
        reader.onload = () => {
          if (reader.result) {
            let img = document.createElement("img");
            img.id = "image";
            img.src = reader.result;
            // clean result before
            this.$refs.crop.innerHTML = "";
            // append new image
            this.$refs.crop.appendChild(img);
            // init cropper
            this.cropper = new Cropper(img, {
              aspectRatio: 1 / 1
            });
          }
        };
      }
    },
    upload: function(event) {
      event.preventDefault();
      this.loading = true
      this.$q.notify('Dalam proses')
      this.$router.back()
      let imgSrc = this.cropper.getCroppedCanvas().toBlob(blob => {
        new Compressor(blob, {
          quality: 0.6,
          success: result => {
            let access = new FormData();
            access.append("avatar", result);
            access.set("_method", "put");
            const config = {
              headers: {
                "content-type": "multipart/form-data"
              }
            };
            axios
              .post(`${this.Setting.url}/api/v1/user/${this.Auth.auth.id}`, access, config)
              .then(res => {
                this.$store.dispatch('Auth/getAuth').then(res=>{

                })
                this.$q.notify('Foto Terupload')
              }).finally(()=>{
                this.loading = false
              });
          }
        });
      });
    }
  }
};
</script>

<style></style>
