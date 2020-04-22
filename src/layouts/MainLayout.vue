<template>
  <q-layout view="hHr lpR fFr">
    <q-page-container>
      <!-- <keep-alive> -->
        <router-view />
      <!-- </keep-alive> -->
    </q-page-container>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        v-model="tab"
        no-caps
        stretch
        class="text-grey"
        active-color="teal"
        indicator-color="transparent"
        align="justify"
      >
        <q-tab
          name="home"
          icon="home"
          @click="$route.name == 'home' ? null : $router.push('/')"
        />
        <q-tab
          name="event"
          icon="event"
          @click="$route.name == 'event' ? null : $router.push('/event')"
        />
        <q-tab
          name="feature"
          icon="apps"
          @click="$route.name == 'feature' ? null : $router.push('/feature')"
        />
        <q-tab
          name="account"
          @click="$route.name == 'account' ? null : $router.push('/account')"
        >
          <template v-slot:default>
            <div>
              <q-avatar size="sm">
                <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`"/>
              </q-avatar>
            </div>
          </template>
        </q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {
      tab: this.$route.name
    };
  },
  computed: {
    ...mapState(["Setting",'Auth'])
  },
  mounted() {}
};
</script>
