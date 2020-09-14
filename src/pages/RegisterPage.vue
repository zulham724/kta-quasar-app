<template>
<div style="height:100vh;background-image:linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('statics/images/bg-register.jpg');background-size:cover">
    <div class="q-pa-md full-height">
        <div class="row justify-center align-center content-center full-height full-width">
            <div class="col-12" style="margin-top:-20vh">
                <div class="row justify-center">
                    <img src="statics/images/agpaii-logo-transparent.png" style="height:15vh" />
                </div>
            </div>
            <div class="col-12">
                <q-form @submit="onSubmit" ref="form" class="q-gutter-md">
                    <q-input color="teal" dense class="q-pa-none" style="opacity:0.8" bg-color="white" rounded outlined label="Nama anda" v-model="credential.name" lazy-rules :rules="[val => (val && val.length > 0) || 'Harus diisi']" />
                    <q-input color="teal" dense class="q-pa-none" style="opacity:0.8" bg-color="white" rounded outlined label="Email anda" type="email" v-model="credential.email" lazy-rules :rules="[val => (val && val.length > 0) || 'Harus diisi']" />
                    <q-input color="teal" dense class="q-pa-none" style="opacity:0.8" bg-color="white" rounded outlined label="Password" v-model="credential.password" type="password" lazy-rules :rules="[val => !!val || 'Harus diisi']" />
                    <q-input color="teal" dense class="q-pa-none" style="opacity:0.8" bg-color="white" rounded outlined label="Ulangi Password" v-model="credential.password_confirmation" type="password" lazy-rules :rules="[
                val => !!val || 'Harus diisi',
                val => val == credential.password || 'Password tidak sama'
              ]" />
                    <q-select color="teal" :rules="[val => !!val || 'Harus diisi']" style="opacity:0.8" dense class="q-pa-none" rounded outlined bg-color="white" v-model="credential.role" :options="roles" option-label="name" option-value="id" @input="item => (credential.role_id = item.id)" label="Daftar sebagai" />
                </q-form>
            </div>
            <div class="col-12 q-pt-md">
                <div class="row justify-between">
                    <q-btn label="Kembali" @click="$router.push('login')" rounded outline type="submit" color="white" icon="arrow_back" />

                    <q-btn label="Daftarkan" @click="onSubmit()" rounded type="submit" color="teal" icon="input" :loading="loading" :disable="loading" />
                </div>
            </div>
            <div class="col-12" style="position:absolute;bottom:5vh">
                <div class="row justify-center q-pt-sm">
                    <!--<q-btn class="text-white" type="a" href="https://wa.me/+6285641161238" label="Butuh bantuan?" />-->
                    <q-btn class="text-white" @click="show()" label="Butuh bantuan?" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    data() {
        return {
            credential: {},
            loading: false,
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
        ...mapState(["Auth"])
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if (success) {
                    this.loading = true;
                    this.$store
                        .dispatch("Auth/register", this.credential)
                        .then(res => {
                            this.$router.push("/");
                            window.history.pushState(null, null, window.location.href);
                        })
                        .catch(err => {
                            this.$q.notify(
                                "Maaf email sudah digunakan, silahkan gunakan email lain"
                            );
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
        },
        forgotPassword() {
            cordova.InAppBrowser.open(
                "https://agpaiidigital.org/password/reset",
                "_blank",
                "location=no"
            );
        },
        show(grid) {
            this.$q.bottomSheet({
                message: 'Pilih Bantuan',
                grid,
                actions: [{
                        label: 'Video tutorial',
                        icon: 'ondemand_video',
                        id: 'video'
                    },
                    {
                        label: 'Hubungi kontak',
                        icon: 'person',
                        id: 'contact'
                    },
                ]
            }).onOk(action => {
                if (action.id == 'video') {
                    window.location = 'https://www.youtube.com/watch?v=b4TklCyil0s&feature=youtu.be'
                } else {
                    this.$store.dispatch("Setting/getContactNumber").then(res => {
                        window.location = 'https://wa.me/+' + res
                    }).catch(err => {
                        this.$q.notify('Gagal mendapatkan nomor kontak');
                    })
                }
            }).onCancel(() => {
                // console.log('Dismissed')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })

        }
    }
};
</script>

<style></style>
