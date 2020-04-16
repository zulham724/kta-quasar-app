<template>
  <div>
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-icon name="event" color="teal" size="sm" />
        <q-toolbar-title>
          <div class="text-body1 text-teal text-bold">Acara</div>
        </q-toolbar-title>
        <q-space />
          <q-btn flat color="teal" icon="playlist_add_check" @click="$router.push('/event/participation')"/>
         <q-btn flat color="teal" icon="playlist_add" @click="$router.push('/event/contribution')"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
    <q-pull-to-refresh @refresh="refresh" color="teal">
      <q-infinite-scroll @load="onLoad" :offset="250">
        <div class="q-pa-md">
          <q-timeline color="teal">

            <div v-for="(event,e) in events" :key="e">
              <h4 style="color:teal">{{event.monthyear}}</h4>

              <q-timeline-entry
                v-for="item in event.data"
                @click="$router.push(`/event/${item.id}/guest`)"
                :key="item.id"
                :title="item.name"
                :subtitle="moment(item.start_at).format('LLLL')"
              >
                <template v-slot:default>
                  <div>
                    <div class="text-body2">{{item.description}}</div>
                    <div class="text-caption text-teal q-pt-md">{{item.users.length}} orang peserta</div>
                  </div>
                </template>
              </q-timeline-entry>
            </div>

          </q-timeline>
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="teal" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
    </q-page-container>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      loading: false,
      events: []
    };
  },
  computed:{
    ...mapState(['Setting','Event'])
  },
  mounted(){
    if(!this.Event.events.data){
      this.refresh().then(res=>{
        this.group()
      })
    }
  },
  methods: {
    moment,
    refresh(done) {
      return new Promise((resolve,reject)=>{
        this.$store.dispatch('Event/index').then(res=>{
          resolve(res)
          this.group()
          done()
        }).catch(err=>{
          reject(err)
        })
      })
    },
    onLoad(index, done) {
      this.Event.events.next_page_url
        ? this.$store.dispatch("Event/next").then(res =>{
          this.group()
          done()
        })
        : done();
    },
    group(){
      this.events = this.Event.events.data.reduce((r, event) => {
        let dateObj = moment(event.start_at);
        let monthyear = dateObj.format('MMMM YYYY')
        if(!r[monthyear]) r[monthyear] = {monthyear, data: [event]}
        else r[monthyear].data.push(event);
        return r;
      }, {})
    }
  }
};
</script>

<style></style>
