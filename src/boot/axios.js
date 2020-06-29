import Vue from "vue";
import axios from "axios";
import store from "./../store";
import moment from "moment";
import { Notify } from "quasar";

Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;
const token = store().getters["Auth/token"];
if (token.access_token) {
    Vue.prototype.$http.defaults.headers.common.Accept = "application/json";
    Vue.prototype.$http.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
    // init
    store()
        .dispatch("Auth/getAuth")
        .then(res => {
            if (
                res.data.user_activated_at != null &&
                moment(new Date()).diff(
                    new Date(res.data.user_activated_at),
                    "months",
                    true
                ) > 6
            ) {
                Notify.create({
                    position: "center",
                    message: "Masa Penggunaan RPP DIGITAL anda sudah habis. Silahkan lakukan iuran untuk menambah masa pemakaian. atau melalui halaman riwayat pembayaran.",
                    textColor: "white",
                    actions: [{
                        label: "Perpanjang",
                        color: "white",
                        handler: () => {
                            store()
                                .dispatch("Payment/getPaymentUrl")
                                .then(res => {
                                    cordova.InAppBrowser.open(
                                        `${res.data.payment_url}`,
                                        "_system",
                                        "location=no"
                                    );
                                });
                        }
                    }]
                });
            }
        });
}
