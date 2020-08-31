<template>
<q-layout view="hHh Lpr fFf">
    <q-header elevated>
        <q-toolbar class="bg-white">
            <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
            <q-toolbar-title>
                <div class="text-body2 text-teal text-bold">Daftar Anggota</div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>

    <q-page-container>
        <q-list bordered padding class="rounded-borders" v-if="city != null">

            <q-item-label header>User dari {{cityName}} dengan iuran periode {{$moment(new Date(year,month-1)).format('MMMM YYYY')}}</q-item-label>

            <q-item clickable v-ripple v-for="user in city.users" :key="user.id" @click="$router.push(`/user/profile/${user.id}`)">
                <q-item-section avatar>
                    <q-avatar>
                        <q-img :src="`${Setting.storageUrl}/${user.avatar}`" no-default-spinner />
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{user.name}}</q-item-label>
                    <q-item-label caption>
                        <div class="row q-gutter-md">
                            <div class="text-caption">{{user.posts_count}} Media</div>
                            <div class="text-caption">{{user.guest_events_count}} Acara</div>
                            <div class="text-caption">{{user.books_count}} Buku</div>
                            <div class="text-caption">{{user.lesson_plans_count}} RPP</div>
                            <div class="text-caption">{{user.question_lists_count}} Soal</div>
                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
        <!-- <v-container style="text-align:left" v-if="district != null">
        <v-row>
          <v-list subheader>
            <v-subheader>{{ district.name }}</v-subheader>
            <v-list-item
              v-for="user in district.users"
              :key="user.id"
              @click="$router.push(`/user/${user.id}`)"
            >
              <v-list-item-avatar>
                <v-img :src="`${Setting.storageUrl}/${user.avatar}`"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="user.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>
      </v-container> -->
    </q-page-container>
</q-layout>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    props: {
        cityId: null,
        month: null,
        year: null,
        cityName: null
    },
    computed: {
        ...mapState(["Setting", "Auth"])
    },
    data() {
        return {
            city: null,
            loading: false
        };
    },
    mounted() {
        this.getPaymentCityUsers();
    },
    methods: {
        getPaymentCityUsers() {
            return new Promise((resolve, reject) => {
                this.loading = true;
                this.$store
                    .dispatch("Payment/getPaymentCityUsers", {
                        city_id: this.cityId,
                        month: this.month,
                        year: this.year
                    })
                    .then(res => {
                        this.city = res.data;
                        this.loading = false;
                    })
                    .catch(err => {
                        this.loading = false;
                    });
            });
        }
    }
};
</script>

<style></style>
