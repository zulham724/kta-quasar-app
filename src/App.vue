<template>
  <div id="q-app">
    <platform-mobile-component
      v-if="$q.platform.is.mobile"
    ></platform-mobile-component>
    <platform-desktop-component v-else></platform-desktop-component>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    PlatformMobileComponent: () =>
      import("components/PlatformMobileComponent.vue"),
    PlatformDesktopComponent: () =>
      import("components/PlatformDesktopComponent.vue")
  },
  sockets: {
    connect() {
      console.log("connected");
      // console.log(this.sockets);
      // console.log(this.$socket);
      // this.sockets.subscribe("test", payload => {
      //   console.log("payload:", payload);
      // });
      // this.sockets.subscribe("conversation.1", () => {});
      // this.sockets.subscribe("message", payload => {
      //   // console.log(payload);
      //   this.$store.commit("Chat/removeTypingUser", {
      //     conversation_id: payload.conversation_id,
      //     user: payload.item.user
      //   });
      //   this.$store.commit("Chat/add", payload);
      // });
      // this.sockets.subscribe("typing", ({ room, user }) => {
      //   console.log("typing", room, user);
      //   const conversation_id = parseInt(room.split("_").pop());
      //   this.$store.commit("Chat/addTypingUser", {
      //     conversation_id: conversation_id,
      //     user: user
      //   });
      // });
      // this.sockets.subscribe("stopped_typing", ({ room, user }) => {
      //   console.log("stopped_typing", room, user);
      //   const conversation_id = parseInt(room.split("_").pop());
      //   this.$store.commit("Chat/removeTypingUser", {
      //     conversation_id: conversation_id,
      //     user: user
      //   });
      // });
      // this.sockets.subscribe("invite", ({ room, user }) => {
      //   //ketika diinvite, maka akan otomatis akan dijoin ke room
      //   console.log("invite", room, user);
      //   this.$socket.emit("join", room);
      // });
    },
    message(payload) {
      this.$store.commit("Chat/removeTypingUser", {
        conversation_id: payload.conversation_id,
        user: payload.item.user
      });
      this.$store.commit("Chat/add", payload);
    },
    typing({ room, user }) {
      console.log("typing", room, user);
      const conversation_id = parseInt(room.split("_").pop());
      this.$store.commit("Chat/addTypingUser", {
        conversation_id: conversation_id,
        user: user
      });
    },
    stopped_typing({ room, user }) {
      console.log("stopped_typing", room, user);
      const conversation_id = parseInt(room.split("_").pop());
      this.$store.commit("Chat/removeTypingUser", {
        conversation_id: conversation_id,
        user: user
      });
    },
    disconnect() {
      // alert("socket.io disconnected");
      console.log("socket.io disconnected");
    },
    error(err){
      console.log('error socket.io',err)
    }
  }
};
</script>
