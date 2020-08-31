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
            <q-item-label header>Iuran provinsi {{province_name}} periode {{$moment(new Date(year,month-1)).format('MMMM YYYY')}}</q-item-label>

            <q-item style="max-width: 300px;" v-for="n in 5" :key="`loading-${n}`" v-show="loading">

                <q-item-section>
                    <q-item-label caption>
                        <q-skeleton type="text" width="65%" />
                    </q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple v-for="paymentcity in paymentcities" :key="paymentcity.id" @click="$router.push(`/paymentcityuserlist/${paymentcity.name}/${paymentcity.id}/${month}/${year}`)">
                <q-item-section>
                    <q-item-label lines="1">{{ paymentcity.name }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-item-label lines="2">{{ paymentcity.users_count }} anggota</q-item-label>
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
        province_name: null,
        province_id: null
    },
    data() {
        return {
            loading: false,
            paymentcities: [],
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
        if (this.paymentcities.length == 0) {
            this.loading = true;
            this.getPaymentCities().then(() => {
                this.loading = false;
            });
        }
    },
    computed: {
        ...mapState(["Setting", "Auth"])
    },
    methods: {
        getPaymentCities(payload) {
            return new Promise((resolve, reject) => {
                this.$store
                    .dispatch("Payment/getPaymentCities", {
                        month: this.month,
                        year: this.year,
                        province_id: this.province_id
                    })
                    .then(res => {
                        this.paymentcities = res.data;
                        this.$forceUpdate();
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        sortCountDesc() {
            this.paymentcities = this.paymentcities.sort((a, b) => (a.users_count < b.users_count) ? 1 : -1)
        },
        sortCountAsc() {
            this.paymentcities = this.paymentcities.sort((a, b) => (a.users_count > b.users_count) ? 1 : -1)
        },
    }
};
</script>

<style></style>
