<template>
  <div id="q-app">
    <platform-mobile-component v-if="$q.platform.is.mobile"></platform-mobile-component>
    <platform-desktop-component v-else></platform-desktop-component>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    PlatformMobileComponent: () => import("components/PlatformMobileComponent.vue"),
    PlatformDesktopComponent: () => import("components/PlatformDesktopComponent.vue"),
  },
  created() {},
  sockets: {
    connect() {
      console.log("connected");

      const auth = this.$store.getters["Auth/auth"];
      if (auth) {
        const conversation_room_name = "conversation_list_" + auth.id;
        console.log("joining individual room:", conversation_room_name);
        this.$socket.emit("join_individual_room", conversation_room_name);

        // this.sockets.unsubscribe(conversation_event_name);
        // console.log("subscribing to:", conversation_event_name);
        // this.sockets.subscribe(conversation_event_name, ({ conversation, data }) => {
        //   // alert('kontol');
        //   console.log("conversation:", conversation);
        //   console.log("message:", data);
        //   // jika conversation list sudah ada, maka tambah di urutan paling atas
        //   if (this.$store.getters["Conversation/items"].data) {
        //     this.$store.commit("Conversation/add", { item: conversation });
        //   }
        //   // jika conversation list belum ada, maka fetch dlu bru tambah
        //   else {
        //     this.$store.dispatch("Conversation/index").then((res) => {
        //       this.$store.commit("Conversation/add", { item: conversation });
        //     });
        //   }
        // });
      }
      // console.log(this.sockets);
    },
    message(payload) { // ke sender
      this.$store.commit("Chat/removeTypingUser", {
        conversation_id: payload.conversation_id,
        user: payload.item.user, // sender
      });
      this.$store.commit("Chat/add", payload);
    },
    typing({ conversation, sender }) {
      console.log('user:',sender,"typing in:", conversation);
      const conversation_id = conversation.id;
      this.$store.commit("Chat/addTypingUser", {
        conversation_id: conversation_id,
        sender: sender,
      });
    },
    stopped_typing({ conversation, sender }) {
      console.log("stopped_typing on conversation_id:", conversation.id, "user:",sender);
      const conversation_id = conversation.id;
      this.$store.commit("Chat/removeTypingUser", {
        conversation_id: conversation_id,
        sender: sender,
      });
    },
    // ke penerima
    conversation({ conversation, payload }) {
      console.log("new conversation:", conversation);
      console.log("message:", payload);
      /////
      this.$store.commit("Chat/removeTypingUser", {
        conversation_id: conversation.id,
        sender: payload.item.user, // sender
      });
      this.$store.commit("Chat/add", {conversation_id:conversation.id,item:payload.item});

      // jika conversation list sudah ada, maka tambah di urutan paling atas
      if (this.$store.getters["Conversation/items"].data) {
        this.$store.commit("Conversation/addTop", { item: conversation });
      }
      // jika conversation list belum ada, maka fetch data terbaru
      else {
        this.$store.dispatch("Conversation/index").then((res) => {
          // this.$store.commit("Conversation/add", { item: conversation });
        });
      }

    },
    disconnect() {
      // alert("socket.io disconnected");
      console.log("socket.io disconnected");
    },
    error(err) {
      console.log("error socket.io", err);
    },
  },
};
</script>
