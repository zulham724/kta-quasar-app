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
          <div class="text-body2 text-teal text-bold">
            {{ name }}
          </div>
        </q-toolbar-title>
        <q-select label="Urutkan" @input="item=>item.handler()" style="width:40%" color="teal" filled :options="sorts" v-model="selected" option-label="name" dense/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-list bordered padding class="rounded-borders">
        <q-item
          clickable
          v-ripple
          v-for="district in districts"
          :key="district.id"
          @click="$router.push(`/districtuserlist/${district.id}`)"
        >
          <q-item-section>
            <q-item-label lines="1">{{ district.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label lines="2"
              >{{ district.users_count }} anggota</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    name: null,
    id: null
  },
  data() {
    return {
      districts: [],
      sorts:[
        {
          name: 'Jumlah terbanyak',
          handler: ()=> this.sortCountDesc()
        },{
          name: 'Jumlah terkecil',
          handler: ()=> this.sortCountAsc()
        }
      ],
      selected: null
    };
  },
  mounted() {
    if (this.districts.length == 0) this.getProvinces();
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  methods: {
    getProvinces() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("District/byCityId", this.id)
          .then(res => {
            this.districts = res.data.districts;
            this.$forceUpdate();
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    sortCountDesc(){
      this.districts = this.districts.sort((a,b)=>(a.users_count < b.users_count) ? 1 : -1)
    },
    sortCountAsc(){
      this.districts = this.districts.sort((a,b)=>(a.users_count > b.users_count) ? 1 : -1)
    },
  }
};
</script>

<style></style>
