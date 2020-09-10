<template>
<q-layout view="hHh Lpr fFf">
    <q-header elevated>
        <q-toolbar class="bg-white">
            <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
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
                    <q-btn dense size="sm" color="teal" flat label="Ubah foto profil" @click="$refs.inputFile.pickFiles()" />
                    <q-file v-show="false" v-model="file" ref="inputFile" @input="file=>$router.push({
              name:'accountchangeavatar',
              params:{
                file:file
              }
            })"></q-file>
                </div>
            </div>

            <q-form class="q-gutter-sm" ref="form">
                <q-input color="teal" outlined rounded type="textarea" v-model="auth.profile.long_bio" label="Bio" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />
                <q-select color="teal" :rules="[val => !!val || 'Harus diisi']" style="opacity:0.8" dense class="q-pa-none" rounded outlined bg-color="white" v-model="auth.role" :options="roles" option-label="name" option-value="id" @input="item => (auth.role_id = item.id)" label="Anda sebagai" />

                <q-select color="teal" :rules="[val => !!val || 'Harus diisi']" style="opacity:0.8" dense class="q-pa-none" rounded outlined bg-color="white" v-model="auth.pns.status" :options="teacher_status_options" option-label="name" option-value="value" label="Status guru" />

                <q-select v-if="is_pns==1" color="teal" :rules="[val => !!val || 'Harus diisi']" style="opacity:0.8" dense class="q-pa-none" rounded outlined bg-color="white" v-model="auth.pns.certification" :options="certification" option-label="name" option-value="value" label="Sudah bersertifikasi?" />

                <!--Tidak PNS-->

                <q-select v-if="is_pns===0" color="teal" :rules="[val => !!val || 'Harus diisi']" style="opacity:0.8" dense class="q-pa-none" rounded outlined bg-color="white" v-model="auth.pns.non_pns_inpassing" :options="inpassing" option-label="name" option-value="value" label="Sudah inpassing atau belum?" />

                <!--rekening-->
                <!--<q-input v-if="is_pns===0" color="teal" outlined rounded dense v-model="auth.bank_account.account_number" label="Nomor Rekening" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />

                <q-input v-if="is_pns===0" color="teal" outlined rounded dense v-model="auth.bank_account.name" label="Nama pada Rekening" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />

                <q-input v-if="is_pns===0" color="teal" outlined rounded dense v-model="auth.bank_account.bank_name" label="Nama Bank" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />-->

                <!---------->
                <q-input color="teal" outlined rounded dense v-model="auth.name" label="Nama" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />

                <q-select color="teal" :rules="[val => !!val || 'Harus diisi']" style="opacity:0.8" dense class="q-pa-none" rounded outlined bg-color="white" v-model="auth.profile.gender" :options="gender_options" option-label="name" option-value="value" label="Jenis kelamin" />

                <div v-if=" auth.role_id !=7">
                    <q-select color="teal" dense rounded outlined :options="educationallevels" :option-value="item=>item.id" :option-label="item=>item.name" label="Jenjang pendidikan yang diajar" v-model="auth.profile.educational_level" @input="item => auth.profile.educational_level_id = item.id" />
                </div>
                <q-input color="teal" outlined rounded dense v-model="auth.profile.nik" label="NIK" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />
                <q-input color="teal" @click="$refs.datepicker.show()" readonly v-model="auth.profile.birthdate" rounded outlined dense label="Tanggal Lahir*" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']">
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="datepicker" transition-show="scale" transition-hide="scale">
                                <q-date v-model="auth.profile.birthdate" mask="YYYY-MM-DD" @input="$refs.datepicker.hide()" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <q-input color="teal" outlined rounded dense v-model="auth.profile.home_address" label="Alamat" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />
                <q-input color="teal" outlined rounded dense v-model="auth.profile.contact" label="Nomor HP" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />
                <q-input color="teal" outlined rounded dense v-model="auth.profile.school_place" label="Asal Sekolah/ Instansi" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />
                <q-select color="teal" :readonly="isDisabled" dense rounded outlined :options="provinces" :option-value="item=>item.id" :option-label="item=>item.name" label="DPW Provinsi" v-model="auth.profile.province" @input="item => {
              auth.profile.province_id = item.id
              auth.profile.city = auth.profile.city_id = null
              auth.profile.district = auth.profile.district_id = null
              getCities()
            }" />
                <q-select color="teal" :readonly="isDisabled" dense rounded outlined :options="cities" :option-value="item=>item.id" :option-label="item=>item.name" label="DPD Kabupaten/ Kota" v-model="auth.profile.city" @input="item =>{
               auth.profile.city_id = item.id
               auth.profile.district = auth.profile.district_id = null
               getDistricts()
            }" />
                <q-select color="teal" dense rounded outlined :options="districts" :option-value="item=>item.id" :option-label="item=>item.name" label="DPC Kecamatan" v-model="auth.profile.district" @input="item => {
              auth.profile.district_id ? $q.notify('Merubah kecamatan yang berbeda dari sebelumnya akan merubah nomor KTA anda, harap berhati-hati.') : null
              auth.profile.district_id = item.id
            }" />
                <div class="row justify-end">
                    <q-btn label="Submit" @click="onSubmit()" color="teal" outline rounded :loading="loading" :disabled="loading" />
                </div>
            </q-form>
        </div>
    </q-page-container>
</q-layout>
</template>

<script>
import {
    mapState
} from 'vuex'
import moment from 'moment'
export default {
    data() {
        return {
            educationallevels: [],
            auth: null,
            provinces: [],
            cities: [],
            districts: [],
            loading: false,
            file: null,
            isDisabled: true,
            teacher_status_options: [{
                    value: 0,
                    name: "Non-PNS",
                },
                {
                    value: 1,
                    name: "PNS",
                }
            ],
            gender_options: [{
                    value: 'L',
                    name: 'Laki-laki'
                },
                {
                    value: 'P',
                    name: 'Perempuan'
                }
            ],
            certification: [{
                    value: 0,
                    name: "Belum sertifikasi",
                },
                {
                    value: 1,
                    name: "Sudah sertifikasi",
                }
            ],
            inpassing: [{
                    value: 0,
                    name: "Belum inpassing",
                },
                {
                    value: 1,
                    name: "Sudah inpassing",
                }

            ],
            roles: [{
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
    computed: {
        ...mapState(['Setting', 'Auth']),
        is_pns: function () {
            if (this.auth.pns.status != null) {
                return this.auth.pns.status.value;
            }
            return -1;
        }
    },
    created() {
        // console.log('umur ',moment(this.Auth.auth.created_at).diff(moment(), 'days'))
        // umur lebih sehari dan district sudah diisi
        if (moment(this.Auth.auth.created_at).diff(moment(), 'days') < -3 && this.Auth.auth.profile.city_id != null && this.Auth.auth.profile.province_id != null) {
            this.isDisabled = true
        } else {
            this.isDisabled = false
        }
    },
    mounted() {
        this.init()
    },
    watch: {
        'Auth.auth.avatar': {
            handler: function () {
                this.init()
            },
            deep: true
        }
    },
    methods: {
        init() {
            let certificate = null;
            let status = null;
            let non_pns_inpassing = null;
            //cek pns//
            if (this.Auth.auth.pns_status) {
                if (this.Auth.auth.pns_status.is_certification === 1) {
                    certificate = this.certification[1];
                } else if (this.Auth.auth.pns_status.is_certification === 0) {
                    certificate = this.certification[0];
                }

                if (this.Auth.auth.pns_status.is_pns === 1) {
                    status = this.teacher_status_options[1];
                } else if (this.Auth.auth.pns_status.is_pns === 0) {
                    status = this.teacher_status_options[0];
                }

                if (this.Auth.auth.pns_status.is_non_pns_inpassing === 1) {
                    non_pns_inpassing = this.inpassing[1];
                } else if (this.Auth.auth.pns_status.is_non_pns_inpassing === 0) {
                    non_pns_inpassing = this.inpassing[0];
                }
            }

            //gender
            let gender = null
            if (this.Auth.auth.profile.gender) {
                gender = this.Auth.auth.profile.gender == 'L' ? this.gender_options[0] : this.gender_options[1];
            }

            this.auth = {
                ...this.Auth.auth,
                pns: {
                    status: status,
                    certification: certificate,
                    non_pns_inpassing: non_pns_inpassing
                },
                bank_account: {
                    ...this.Auth.auth.bank_account
                },
                profile: {
                    ...this.Auth.auth.profile,
                    gender: gender
                },
            }
            this.getEducationalLevels()
            this.getProvinces()
            if (this.auth.profile.province_id) {
                this.getCities().then(res => {
                    if (this.auth.profile.city_id) {
                        this.getDistricts()
                    }
                })
            }
        },
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if (success) {
                    this.loading = true
                    this.auth.profile.gender = this.auth.profile.gender.value;
                    this.$store.dispatch('Auth/updateProfile', this.auth).then(res => {
                        this.$q.notify('Berhasil update profile')
                        this.$router.back()
                    }).finally(() => {
                        this.loading = false
                    })
                }
            })
        },
        getEducationalLevels() {
            this.$store.dispatch('EducationalLevel/index').then(res => {
                this.educationallevels = res.data
            });
        },
        getProvinces() {
            return new Promise((resolve, reject) => {
                this.$store.dispatch('Province/index').then(res => {
                    this.provinces = res.data
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getCities() {
            return new Promise((resolve, reject) => {
                this.$store.dispatch('City/byProvinceId', this.auth.profile.province_id).then(res => {
                    this.cities = res.data.cities
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getDistricts() {
            return new Promise((resolve, rejeve) => {
                this.$store.dispatch('District/byCityId', this.auth.profile.city_id).then(res => {
                    this.districts = res.data.districts
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
};
</script>

<style></style>
