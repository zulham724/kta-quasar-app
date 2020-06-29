<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn
          color="teal"
          flat
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <q-toolbar-title>
          <div class="text-body2 text-teal text-bold">Edit Profile</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container v-if="auth != null">
      <div class="q-pa-md">
        <div class="row q-pb-md">
          <div class="col-3">
              <q-avatar size="15vw">
                <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" no-default-spinner />
              </q-avatar>
          </div>
          <div class="col-9 self-center">
            <div class="text-body1">{{Auth.auth.name}}</div>
            <q-btn dense size="sm" color="teal" flat label="Ubah foto profil" @click="$refs.inputFile.pickFiles()"/>
            <q-file v-show="false" v-model="file" ref="inputFile" @input="file=>$router.push({
              name:'accountchangeavatar',
              params:{
                file:file
              }
            })"></q-file>
          </div>
        </div>
        <q-form class="q-gutter-sm" ref="form">
          <q-input
            color="teal"
            outlined
            rounded
            type="textarea"
            v-model="auth.profile.long_bio"
            label="Bio"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-select
              color="teal"
              :rules="[val => !!val || 'Harus diisi']"
              style="opacity:0.8"
              dense
              class="q-pa-none"
              rounded
              outlined
              bg-color="white"
              v-model="auth.role"
              :options="roles"
              option-label="name"
              option-value="id"
              @input="item => (auth.role_id = item.id)"
              label="Anda sebagai"
            />
          <q-input
            color="teal"
            outlined
            rounded
            dense
            v-model="auth.name"
            label="Nama"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <div v-if="auth.role_id != 7">
            <q-select
              color="teal"
              dense
              rounded
              outlined
              :options="educationallevels"
              :option-value="item=>item.id"
              :option-label="item=>item.name"
              label="Jenjang pendidikan yang diajar"
              v-model="auth.profile.educational_level"
              @input="item => auth.profile.educational_level_id = item.id"
            />
          </div>
          <q-input
            color="teal"
            outlined
            rounded
            dense
            v-model="auth.profile.nik"
            label="NIK"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-input color="teal" @click="$refs.datepicker.show()" readonly v-model="auth.profile.birthdate" rounded outlined dense label="Tanggal Lahir*"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="datepicker" transition-show="scale" transition-hide="scale">
                  <q-date v-model="auth.profile.birthdate" mask="YYYY-MM-DD" @input="$refs.datepicker.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            color="teal"
            outlined
            rounded
            dense
            v-model="auth.profile.home_address"
            label="Alamat"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-input
            color="teal"
            outlined
            rounded
            dense
            v-model="auth.profile.contact"
            label="Nomor HP"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-input
            color="teal"
            outlined
            rounded
            dense
            v-model="auth.profile.school_place"
            label="Asal Sekolah/ Instansi"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-select
            color="teal"
            :readonly="isDisabled"
            dense
            rounded
            outlined
            :options="provinces"
            :option-value="item=>item.id"
            :option-label="item=>item.name"
            label="Provinsi"
            v-model="auth.profile.province"
            @input="item => {
              auth.profile.province_id = item.id
              auth.profile.city = auth.profile.city_id = null
              auth.profile.district = auth.profile.district_id = null
              getCities()
            }"
          />
          <q-select
            color="teal"
            :readonly="isDisabled"
            dense
            rounded
            outlined
            :options="cities"
            :option-value="item=>item.id"
            :option-label="item=>item.name"
            label="Kab/ Kota"
            v-model="auth.profile.city"
            @input="item =>{
               auth.profile.city_id = item.id
               auth.profile.district = auth.profile.district_id = null
               getDistricts()
            }"
          />
          <q-select
            color="teal"
            dense
            rounded
            outlined
            :options="districts"
            :option-value="item=>item.id"
            :option-label="item=>item.name"
            label="Kecamatan/ Daerah"
            v-model="auth.profile.district"
            @input="item => {
              auth.profile.district_id ? $q.notify('Merubah kecamatan yang berbeda dari sebelumnya akan merubah nomor KTA anda, harap berhati-hati.') : null
              auth.profile.district_id = item.id
            }"
          />
          <div class="row justify-end">
            <q-btn label="Submit" @click="onSubmit()" color="teal" outline rounded :loading="loading" :disabled="loading" />
          </div>
        </q-form>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      educationallevels: [],
      auth: null,
      provinces:[],
      cities:[],
      districts:[],
      loading: false,
      file: null,
      isDisabled: true,
      roles: [
        {
          id: 2,
          name: "Guru PAI"
        },
        {
          id: 11,
          name: "Kepala Sekolah dan Guru PAI"
        },
        {
          id: 7,
          name: "Pengawas PAI"
        },
        {
          id: 9,
          name: "Pembina"
        },
      ]
    };
  },
  computed:{
    ...mapState(['Setting','Auth'])
  },
  created(){
    // console.log('umur ',moment(this.Auth.auth.created_at).diff(moment(), 'days'))
    // umur lebih sehari dan district sudah diisi
    if(moment(this.Auth.auth.created_at).diff(moment(), 'days') < -3 && this.Auth.auth.profile.city_id != null && this.Auth.auth.profile.province_id != null){
      this.isDisabled = true
    } else {
      this.isDisabled = false
    }
  },
  mounted(){
    this.init()
  },
  watch:{
    'Auth.auth.avatar': {
      handler: function(){
        this.init()
      },
      deep: true
    }
  },
  methods:{
    init(){
      this.auth = {
        ...this.Auth.auth,
        profile: {
          ...this.Auth.auth.profile
        }
      }
      this.getEducationalLevels()
      this.getProvinces()
      if(this.auth.profile.province_id){
        this.getCities().then(res=>{
          if(this.auth.profile.city_id){
            this.getDistricts()
          }
        })
      }
    },
    onSubmit(){
      this.$refs.form.validate().then(success=>{
        if(success){
          this.loading = true
          this.$store.dispatch('Auth/updateProfile',this.auth).then(res=>{
            this.$q.notify('Berhasil update profile')
            this.$router.back()
          }).finally(()=>{
            this.loading = false
          })
        }
      })
    },
    getEducationalLevels(){
      this.$store.dispatch('EducationalLevel/index').then(res=>{
        this.educationallevels = res.data
      });
    },
    getProvinces(){
      return new Promise((resolve,reject)=>{
        this.$store.dispatch('Province/index').then(res=>{
          this.provinces = res.data
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    getCities(){
      return new Promise((resolve,reject)=>{
        this.$store.dispatch('City/byProvinceId',this.auth.profile.province_id).then(res=>{
          this.cities = res.data.cities
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    getDistricts(){
      return new Promise((resolve,rejeve)=>{
        this.$store.dispatch('District/byCityId',this.auth.profile.city_id).then(res=>{
          this.districts = res.data.districts
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
  }
};
</script>

<style></style>
