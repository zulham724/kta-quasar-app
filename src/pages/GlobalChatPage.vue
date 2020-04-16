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
          <div class="text-body1 text-teal text-bold">Chat</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px" v-chat-scroll>
          <q-chat-message label="Sunday, 19th" />

          <q-chat-message
            name="me"
            :avatar="`${Setting.storageUrl}/${Auth.auth.avatar}`"
            :text="['Hai']"
            sent
            stamp="7 minutes ago"
          />
          <q-chat-message
            name="Jane"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="['Hi','Hello']"
            stamp="4 minutes ago"
          />
          <div id="bottom"></div>
        </div>
      </div>
    </q-page-container>

    <q-footer style="padding:5px;background-color:white">
      <q-input dense label="Tulis sesuatu" flat bg-color="white">
        <template v-slot:after>
          <div>
            <q-btn
              flat
              round
              icon="send"
              :loading="loading"
              :disable="loading"
            />
          </div>
        </template>
      </q-input>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  computed: {
    ...mapState(["Setting", "Auth"])
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.handleScroll('bottom')
  },
  methods: {
    handleScroll (el) {
      const ele = document.getElementById(el) // You need to get your element here
      const target = getScrollTarget(ele)
      const offset = ele.offsetTop - ele.scrollHeight
      const duration = 10
      setScrollPosition(target, offset, duration)
    }
  }
};
</script>

<style></style>
