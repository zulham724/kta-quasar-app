<template>
  <q-dialog ref="dialog" @hide="onDialogHide" maximized>
    <div v-if="src" @click="hide()">
      <v-zoomer style="width: 100%; height: 100%;">
        <div
          class="align-center fit row wrap justify-center items-center content-center"
        >
          <q-img :src="`${Setting.storageUrl}/${src}`">
            <template v-slot:loading>
              <div class="bg-grey-2" style="height:100%;width:100%"></div>
            </template>
          </q-img>
        </div>
      </v-zoomer>
    </div>
  </q-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    // ...your custom props
    src: null
  },
  computed: {
    ...mapState(["Setting"])
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  }
};
</script>

<style></style>
