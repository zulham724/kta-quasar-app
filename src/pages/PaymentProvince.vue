<template>
<q-layout view="hHh Lpr fFf">
    <q-header elevated>
        <q-toolbar class="bg-white">
            <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
            <q-toolbar-title>
                <div class="text-body2 text-teal text-bold">
                    {{ name }}
                </div>
            </q-toolbar-title>
            <q-select label="Urutkan" @input="item=>item.handler()" style="width:40%" color="teal" filled :options="sorts" v-model="selected" option-label="name" dense />
        </q-toolbar>
    </q-header>
    <q-page-container>
        <q-list bordered padding class="rounded-borders">
            <q-item-label header>Iuran provinsi periode {{$moment(new Date(year,month-1)).format('MMMM YYYY')}}</q-item-label>

            <q-item style="max-width: 300px;" v-for="n in 5" :key="`loading-${n}`" v-show="loading">

                <q-item-section>
                    <q-item-label caption>
                        <q-skeleton type="text" width="65%" />
                    </q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple v-for="paymentprovince in paymentprovinces" :key="paymentprovince.id" @click="$router.push(`/paymentcity/${paymentprovince.id}/${paymentprovince.name}/${month}/${year}`)">
                <q-item-section>
                    <q-item-label lines="1">{{ paymentprovince.name }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-item-label lines="2">{{ paymentprovince.users_count }} anggota</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-page-container>
</q-layout>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    props: {
        name: null,
        id: null,
        month: null,
        year: null,
    },
    data() {
        return {
            loading: false,
            paymentprovinces: [],
            sorts: [{
                name: 'Jumlah terbanyak',
                handler: () => this.sortCountDesc()
            }, {
                name: 'Jumlah terkecil',
                handler: () => this.sortCountAsc()
            }],
            selected: null
        };
    },
    mounted() {
        if (this.paymentprovinces.length == 0) {
            this.loading = true;
            this.getPaymentProvinces().then(() => {
                this.loading = false;
            });
        }
    },
    computed: {
        ...mapState(["Setting", "Auth"])
    },
    methods: {
        getPaymentProvinces(payload) {
            return new Promise((resolve, reject) => {
                this.$store
                    .dispatch("Payment/getPaymentProvinces", {
                        month: this.month,
                        year: this.year
                    })
                    .then(res => {
                        this.paymentprovinces = res.data;
                        this.$forceUpdate();
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        sortCountDesc() {
            this.paymentprovinces = this.paymentprovinces.sort((a, b) => (a.users_count < b.users_count) ? 1 : -1)
        },
        sortCountAsc() {
            this.paymentprovinces = this.paymentprovinces.sort((a, b) => (a.users_count > b.users_count) ? 1 : -1)
        },
    }
};
</script>

<style></style>
