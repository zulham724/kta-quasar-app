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
          <div class="text-body2 text-teal text-bold">Peserta</div>
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>
    <q-page-container v-if="event != null">
      <q-pull-to-refresh @refresh="getEvent" color="teal">
        <q-list bordered separator>
          <q-item
            clickable
            v-for="user in event.users"
            :key="user.id"
            @click="$router.push(`/user/profile/${user.id}`)"
          >
            <q-item-section avatar>
              <q-avatar>
                <q-img :src="`${Setting.storageUrl}/${user.avatar}`" no-default-spinner/>
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ user.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-pull-to-refresh>
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    eventId: null
  },
  data(){
    return {
      event: null
    }
  },
  computed:{
    ...mapState(['Setting','Auth'])
  },
  mounted(){
    this.getEvent()
  },
  methods:{
    getEvent(done){
      this.$store.dispatch('Event/show',this.eventId).then(res=>{
        this.event = res.data
        if(done) done();
      })
    }
  }
}
</script>

<style>

</style>
