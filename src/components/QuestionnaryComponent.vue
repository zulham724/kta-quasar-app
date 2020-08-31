<template>
<q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" v-if="item">
        <!--
        ...content
        ... use q-card-section for it?
      -->
        <q-card-section>
            <div class="text-body1">{{item.name}}</div>
            <div class="text-caption text-grey">{{item.description}}</div>
            <q-carousel style="" v-model="slide" transition-prev="jump-right" transition-next="jump-left" swipeable animated control-color="blue" navigation-icon="radio_button_unchecked" padding arrows height="100%">
                <q-carousel-slide v-for="(question_list, n) in item.question_lists" :key="n" :name="n" class="column no-wrap">
                    <div class="row">{{question_list.name}}</div>
                    <div class="row">
                        <q-option-group v-model="question_list.answer_id" :options="options[n]" />
                    </div>
                </q-carousel-slide>
            </q-carousel>
        </q-card-section>

        <!-- buttons example -->
        <q-card-actions align="right" class="row justify-between">
            <q-btn flat label="Tidak tertarik" @click="onCancelClick" />
            <q-btn flat label="Submit Kuesioner" @click="onOKClick" />
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
        this.options = [];
        this.item.question_lists.forEach((v, k) => {
            let option = []
            v.answer_lists.forEach(v2 => {
                option.push({
                    label: v2.name,
                    value: v2.id
                })
            })
            this.options.push(option)
            if (v.answer_id) this.answer_ids[k] = v.answer_id
        })
        console.log(this.item.question_lists)
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
            this.submitQuestionnaries().then(res => {
                this.$q.notify('Terima kasih telah mengisi kuesioner')
                this.$emit('ok')
                // or with payload: this.$emit('ok', { ... })

                // then hiding dialog
                this.hide()
            });

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
        submitQuestionnaries() {
            return new Promise((resolve, reject) => {
                var BreakException = {};
                let index = 0;
                try {
                    this.item.question_lists.forEach((v, k) => {
                        if (v.answer_id == null) {
                            this.slide = k
                            throw BreakException;
                        }
                    })
                    this.$store.dispatch('Questionnary/submit', this.item).then(() => {
                        resolve();
                    });
                } catch (e) {
                    this.$q.notify('Masih ada kuesioner yang belum diisi')
                    reject()
                }
            });

        }
    }
}
</script>
