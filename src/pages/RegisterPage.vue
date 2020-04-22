<template>
  <div
    style="height:100vh;background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('statics/images/bg-register.jpg');background-size:cover"
  >
    <div class="q-pa-md full-height">
      <div
        class="row justify-center align-center content-center full-height full-width"
      >
        <div class="col-12" style="margin-top:-20vh">
          <div class="row justify-center">
            <img src="statics/images/agpaii-logo-transparent.png" style="height:15vh" />
          </div>
        </div>
        <div class="col-12">
          <q-form @submit="onSubmit" ref="form" class="q-gutter-md">
            <q-input
              dense
              class="q-pa-none"
              style="opacity:0.8"
              bg-color="white"
              rounded
              outlined
              label="Nama anda"
              v-model="credential.name"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Harus diisi'
              ]"
            />
            <q-input
              dense
              class="q-pa-none"
              style="opacity:0.8"
              bg-color="white"
              rounded
              outlined
              label="Email anda"
              type="email"
              v-model="credential.email"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Harus diisi'
              ]"
            />
            <q-input
              dense
              class="q-pa-none"
              style="opacity:0.8"
              bg-color="white"
              rounded
              outlined
              label="Password"
              v-model="credential.password"
              type="password"
              lazy-rules
              :rules="[
                val => !!val || 'Harus diisi'
              ]"
            />
            <q-input
              dense
              class="q-pa-none"
              style="opacity:0.8"
              bg-color="white"
              rounded
              outlined
              label="Ulangi Password"
              v-model="credential.password_confirmation"
              type="password"
              lazy-rules
              :rules="[
                val => !!val || 'Harus diisi',
                val => val == credential.password || 'Password tidak sama'
              ]"
            />
            <q-select
              :rules="[
                val => !!val || 'Harus diisi'
              ]"
              style="opacity:0.8"
              dense
              class="q-pa-none"
              rounded
              outlined
              bg-color="white"
              v-model="credential.role"
              :options="roles"
              option-label="name"
              option-value="id"
              @input="(item)=>credential.role_id = item.id"
              label="Daftar sebagai"
            />
          </q-form>
        </div>
        <div class="col-12">
          <div class="row justify-center q-pt-sm">
             <q-btn class="text-white" type="a" href="https://wasap.at/qGxvLs" label="Bantuan Pendaftaran Manual" />
          </div>
          <div class="row justify-center q-pt-sm">
            <q-btn class="text-white" type="a" href="https://agpaiidigital.org/password/reset" label="Lupa Password" />
          </div>
        </div>
      </div>

      <q-btn
        style="position:absolute;bottom:10vh;left:5vw"
        label="Masuk ke akun"
        @click="$router.push('login')"
        rounded
        type="submit"
        color="teal"
        icon="person_add"
      />

      <q-btn
        style="position:absolute;bottom:10vh;right:5vw"
        label="Daftar"
        @click="onSubmit()"
        rounded
        type="submit"
        color="teal"
        icon="input"
        :loading="loading"
        :disable="loading"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      credential:{},
      loading: false,
      roles:[
        {
          id:2,
          name:'Guru PAI'
        },{
          id:7,
          name:'Pengawas PAI'
        }
      ],
    }
  },
  computed:{
    ...mapState(['Auth'])
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then(success=>{
        if(success){
          this.loading = true
          this.$store.dispatch('Auth/register',this.credential).then(res=>{
              this.$router.push('/')
              window.history.pushState(null, null ,window.location.href)
          }).catch(err=>{
            this.$q.notify('Maaf email sudah digunakan, silahkan gunakan email lain')
          }).finally(()=>{
              this.loading = false
          })
        }
      })
    },
    forgotPassword(){
      cordova.InAppBrowser.open(
        "https://agpaiidigital.org/password/reset",
        "_blank",
        "location=no"
      )
    }
  }
};
</script>

<style></style>
