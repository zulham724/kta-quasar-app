<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn
          color="teal"
          flat
          dense
          icon="arrow_back"
          @click="$router.push('/conversations')"
        />
        <q-toolbar-title>
          <div class="text-body2 text-teal text-bold">Chat</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page v-if="Chat.items['personal_conversation_'+conversationId]">
        <transition
          v-for="(item, i) in Chat.items['personal_conversation_'+conversationId].data"
          :key="i"
          appear
          :enter-active-class="`animated ${
            item.user.id == Auth.auth.id ? 'bounceInRight' : 'bounceInLeft'
          }`"
        >
          <q-chat-message
            :name="item.user.name"
            :avatar="`${Setting.storageUrl}/${item.user.avatar}`"
            :text="[item.message.value]"
            :sent="item.user.id == Auth.auth.id ? true : false"
          >
            <template v-slot:avatar>
              <q-avatar :class="item.user.id == Auth.auth.id ? 'q-ml-sm' : 'q-mr-sm'">
                <q-img :src="`${Setting.storageUrl}/${item.user.avatar}`">
                  <template v-slot:loading>
                    <div class="bg-grey-2" style="height: 100%; width: 100%"></div>
                  </template>
                </q-img>
              </q-avatar>
            </template>
          </q-chat-message>
        </transition>
        <transition
          v-for="(item, i) in Chat.items['personal_conversation_'+conversationId].typing_users"
          :key="`typing-${i}`"
          appear
          enter-active-class="animated bounceInLeft"
        >
          <q-chat-message
            :name="item.name"
            :avatar="`${Setting.storageUrl}/${item.avatar}`"
            bg-color="amber"
          >
            <q-spinner-dots size="2rem" />
          </q-chat-message>
        </transition>
        <!-- <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
          :text="['doing fine, how r you?']"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          bg-color="amber"
        >
          <q-spinner-dots size="2rem" />
        </q-chat-message> -->
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-page>
    </q-page-container>

    <q-footer style="padding: 5px; background-color: white">
      <q-input
        dense
        label="Tulis sesuatu"
        v-model="message"
        flat
        @keypress="stopTyping"
        borderless
        color="teal"
        bg-color="white"
        ref="keyboard"
      >
        <template v-slot:after>
          <div>
            <q-btn
              flat
              round
              icon="send"
              :loading="loading || conversation == null"
              :disable="loading || conversation == null"
              @click="sendMessage()"
            />
          </div>
        </template>
      </q-input>
    </q-footer>
  </q-layout>
</template>

<script>
import { debounce } from "quasar";
import { mapState } from "vuex";
import Vue from "vue";

export default {
  props: ["conversationId"],
  components: {
    ItemComponent: () => import("components/post/comment/ItemComponent"),
  },
  computed: {
    ...mapState(["Setting", "Auth", "Conversation", "Chat"]),
  },
  watch: {
    message(newValue) {
      if (newValue && !this.isTypingSent) {
        const sender = {
          id: this.Auth.auth.id,
          name: this.Auth.auth.name,
          avatar: this.Auth.auth.avatar,
        };
        // const room = `personal_conversation_${this.conversationId}`;
        this.$socket.emit("typing", { conversation: this.conversation, sender: sender });
        this.isTypingSent = true;
      }
    },
  },
  data() {
    return {
      isTypingSent: false,
      room: null,
      // receivers:[], //user_id yg menerima pesan
      conversation: null,
      post: null,
      message: null,
      loading: false,
    };
  },
  mounted() {
    // this.post == null ? this.getPost() : null;
    // this.$refs.keyboard.focus()
  },

  created() {
    this.stopTyping = debounce(this.stopTyping, 2000);

    //mendapatkan user_id pengirim dan penerima di store Conversation
    this.$store
      .dispatch("Conversation/get", this.conversationId)
      .then((res) => {
        this.conversation = res;
        // this.room = `personal_conversation_${res.id}`;
        // console.log("joining room:", this.room, "dgn user_id:", this.Auth.auth.id);
        // this.$socket.emit("join", this.room);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onLoad(index, done) {
      setTimeout(() => {
        if (this.items) {
          this.items.push({}, {}, {}, {}, {}, {}, {});
          done();
        }
      }, 2000);
    },
    stopTyping() {
      const sender = {
        id: this.Auth.auth.id,
        name: this.Auth.auth.name,
        avatar: this.Auth.auth.avatar,
      };
      // const room = `personal_conversation_${this.conversationId}`;
      this.$socket.emit("stopped_typing", { conversation: this.conversation, sender: sender });
      this.isTypingSent = false;
    },
    sendMessage() {
      // console.log(Vue.prototype);
      if (!this.message) return;

      const item = {
        message: {
          value: this.message,
        },
        user: {
          id: this.Auth.auth.id,
          name: this.Auth.auth.name,
          avatar: this.Auth.auth.avatar,
        },
      };
      this.conversation.latest_message_at = new Date().getTime(); //milisecond
      // emit ke nodejs server
      this.$socket.emit("message", {
        conversation: this.conversation,
        data: item,
      });
      // update conversation update_at lewat API laravel
      this.$store.dispatch("Conversation/setUpdatedAt", this.conversation).then((res) => {
        this.$store.commit("Conversation/moveTop", this.conversationId);
      });

      this.message = "";
    },
  },
};
</script>

<style></style>
