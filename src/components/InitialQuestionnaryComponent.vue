<template>
<q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" v-if="item">
        <!--
        ...content
        ... use q-card-section for it?
      -->
        <q-card-section>
            <div class="text-body1">{{item.name}}</div>
            <div class="text-caption text-grey" style="overflow-wrap:break-word; white-space:pre-line">{{item.description}}</div>
        </q-card-section>

        <!-- buttons example -->
        <q-card-actions align="right" class="row justify-between">
            <q-btn flat label="Tidak tertarik" @click="onCancelClick" />
            <q-btn flat label="Isi Kuesioner" @click="onOKClick" />
        </q-card-actions>
    </q-card>
</q-dialog>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";

export default {
    props: {
        // ...your custom props
        item: null,
        store: null,
    },
    created() {

    },
    computed: {
        ...mapState(["Setting", "Auth", 'Questionnary'])
    },
    data() {
        return {
            loading: false,
            slide: 0,
            answer_ids: [],
            group: null,
            options: []
        }
    },

    methods: {
        // following method is REQUIRED
        // (don't change its name --> "show")
        show() {
            this.$refs.dialog.show()
        },

        // following method is REQUIRED
        // (don't change its name --> "hide")
        hide() {
            this.$refs.dialog.hide()
        },

        onDialogHide() {
            // required to be emitted
            // when QDialog emits "hide" event
            this.$emit('hide')
        },

        onOKClick() {
            // on OK, it is REQUIRED to
            // emit "ok" event (with optional payload)
            // before hiding the QDialog
            this.$emit('ok')
            // or with payload: this.$emit('ok', { ... })

            // then hiding dialog
            this.hide()

        },

        onCancelClick() {
            // we just need to hide dialog
            this.hide()
        },
        // cek: function (question_list_id, answer_id) {
        //     //console.log(a)
        //     this.$parent.store().dispatch('Questionnary/update', {
        //         question_list_id: question_list_id,
        //         answer_id: answer_id
        //     });
        //     // this.update({
        //     //     question_list_id: question_list_id,
        //     //     answer_id: answer_id
        //     // })
        // },
    }
}
</script>
