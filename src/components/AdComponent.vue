<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="background-color:transparent;box-shadow:none">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section v-if="item">
        <q-carousel
          v-model="slide"
          transition-prev="slide-down"
          transition-next="slide-up"
          swipeable
          animated
          control-color="white"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          arrows
          height="300px"
        >
          <q-carousel-slide v-for="(file,f) in item.files" :key="file.id" :name="f" class="column no-wrap flex-center">
            <q-img
              v-if="file.type.includes('image')"
              :src="`${storageUrl}/${file.src}`"
              ratio="1"
              @click="zoom(file)"
            >
              <template v-slot:loading>
                <div class="bg-grey-2" style="height:100%;width:100%"></div>
              </template>
            </q-img>
            <vue-plyr v-if="file.type.includes('video')" style="width:100vw">
              <video
                preload="none"
                :poster="`${storageUrl}/${file.value}`"
                :src="`${storageUrl}/${file.src}`"
              ></video>
            </vue-plyr>
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn flat color="white" icon="close" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import store from "./../store";
export default {
  props: {
    // ...your custom props
    item: null,
  },
  data(){
    return {
      slide: 0,
      url:store().getters['Setting/url'],
      storageUrl: store().getters['Setting/storageUrl']
    }
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
