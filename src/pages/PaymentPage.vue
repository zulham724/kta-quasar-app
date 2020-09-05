<template>
<div style="background-image:url('statics/images/payment.jpg');background-size:cover;height:100vh">
    <div class="fixed-center text-center">
        <q-card style="width:90vw">
            <q-card-section>
                <p>
                    <!-- <img src="~assets/sad.svg" style="width:30vw;max-width:150px;" /> -->
                    <img src="statics/images/agpaii-logo-teal.png" style="width:30vw;max-width:150px;">
                </p>
                <q-btn flat color="teal" style="width:200px;" label="Lakukan pembayaran" @click="createTransaction" />
                <q-btn color="teal" flat label="Konfirmasi" @click="check" />

                <div class="text-caption">
                    Silahkan lakukan pembayaran. Jika sudah membayar klik tombol
                    "Konfirmasi" untuk melakukan Verifikasi Pembayaran
                </div>
            </q-card-section>
            <q-card-actions class="row justify-end">
                <q-btn color="teal" flat label="Keluar" @click="logout" />
            </q-card-actions>
        </q-card>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        check() {
            this.$store.dispatch("Auth/getPaymentStatus").then(res => {
                //alert('test')

                if (res.data.user_activated_at == null) {
                    this.$q.notify("Terimakasih silahkan tunggu 1x24 jam");
                } else {
                    this.$store.dispatch("Auth/getAuth").then(res => {
                        this.$q.notify("Pembayaran anda sudah kami terima");
                        this.$router.push("/");
                    });

                }
            });
        },
        logout() {
            this.$store.dispatch("Auth/logout").then(() => {
                this.$router.push("/login");
            });
        },
        createTransaction() {
            return new Promise((resolve, reject) => {
                this.loading = true;
                this.$store.dispatch("Payment/getPaymentUrl").then(res => {
                    this.loading = false;
                    if (this.$q.platform.is.mobile) {
                        cordova.InAppBrowser.open(
                            `${res.data.payment_url}`,
                            "_system",
                            "location=no"
                        );
                    } else {
                        window.location.href = `${res.data.payment_url}`
                    }
                });
            });
        }
    }
};
</script>
