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
      <q-page v-if="Chat.items['personal_conversation_' + conversationId]">
        <q-infinite-scroll @load="onLoad" reverse>
          <template slot="loading">
            <div class="row justify-center q-my-md">
              <q-spinner color="teal" name="dots" size="40px" />
            </div>
          </template>

          <transition
            v-for="(item, i) in Chat.items['personal_conversation_' + conversationId]
              .data"
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
            v-for="(item, i) in Chat.items['personal_conversation_' + conversationId]
              .typing_users"
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
        </q-infinite-scroll>
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
      if (newValue && !this.isTypingSent && this.conversation) {
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
    this.$devLogger("chats gan", this.Chat);
  },

  created() {
    this.stopTyping = debounce(this.stopTyping, 2000);

    //mendapatkan user_id pengirim dan penerima di store Conversation
    this.$store
      .dispatch("Conversation/get", this.conversationId)
      .then((data) => {
        this.conversation = data;

        // mengirim event read_conversation ke nodejs 
        this.$socket.emit("read_conversation", { conversation_id: data.id });

        const conversation_ids = [data.id];
        // get latest messages from conversation_ids
        this.$store
          .dispatch("Chat/setLatestChatByIds", conversation_ids)
        .then((data2) => {
            this.$devLogger("latest message from chatpage", data2);
          });
      })
      .catch((err) => {
        this.$devLogger(err);
      });
  },
  methods: {
    onLoad(index, done) {
      const key = "personal_conversation_" + this.conversationId;
      if (this.Chat.items[key].next_page_url) {
        this.$store
          .dispatch("Chat/nextPage", { conversation_id: this.conversationId })
          .then((res) => {
            this.$devLogger("next gan");
            done();
          })
          .catch((err) => {
            alert("error get next chat", err);
            console.log(err);
            done();
          });
      } else {
        done();
      }
      // this.Conversation.items.next_page_url
      //   ? this.$store.dispatch("Conversation/next").then((data) => {
      //       const conversation_ids = data.data.map((e) => e.id);
      //       // get latest messages from conversation_ids
      //       this.$store
      //         .dispatch("Chat/setLatestChatByIds", conversation_ids)
      //         .then((data2) => {
      //           done();
      //           this.$devLogger("latest message...", data2);
      //         });

      //     })
      //   : done();
    },
    stopTyping() {
      this.$devLogger('stopped_typing');
      const sender = {
        id: this.Auth.auth.id,
        name: this.Auth.auth.name,
        avatar: this.Auth.auth.avatar,
      };
      // const room = `personal_conversation_${this.conversationId}`;
      this.$socket.emit("stopped_typing", {
        conversation: this.conversation,
        sender: sender,
      });
      this.isTypingSent = false;
    },
    sendMessage() {
      // console.log(Vue.prototype);
      if (!this.message) return;

      const item = {
        message: {
          value: this.message,
          id:null,
        },
        user: {
          id: this.Auth.auth.id,
          name: this.Auth.auth.name,
          avatar: this.Auth.auth.avatar,
        },
        read_at:null
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

      // kirim FCM ke semua penerima kecuali pengirim
      this.conversation.users.forEach((participant) => {
        const topic = `message_${participant.id}`;
        this.sendNotif(topic);
      });

      this.message = "";
    },
    sendNotif(topic) {
      const payload = {
        title: `Chat AGPAII DIGITAL`,
        body: `Pesan baru dari ${this.Auth.auth.name} - ${this.message}`,
        params: {
          sender_id: this.Auth.auth.id,
          target_id: this.conversation.id,
          target_type: `Post`,
          text: `Pesan baru dari ${this.Auth.auth.name} - ${this.message}`,
        },
        to: `/topics/${topic}`,
      };
      this.$store.dispatch("Notif/send", payload).then((res) => {
        console.log("FCM response", res);
      });
    },
  },
};
</script>

<style></style>
