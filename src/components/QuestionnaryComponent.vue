<template>
<q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" v-if="questionnary">
        <!--
        ...content
        ... use q-card-section for it?
      -->
        <q-card-section>
            <div class="text-body1">{{questionnary.name}}</div>
            <!--<div class="text-caption text-grey">{{item.description}}</div>-->
            <q-carousel :next-icon="slide+1<questionnary.question_lists.length?'chevron_right':'done'" style="" v-model="slide" transition-prev="jump-right" transition-next="jump-left" swipeable animated control-color="blue" navigation-icon="radio_button_unchecked" padding arrows height="100%">
                <q-carousel-slide v-for="(question_list, n_question) in questionnary.question_lists" :key="`question${n_question}`" :name="n_question" class="column no-wrap">
                    <div class="row">{{question_list.name}}</div>
                    <div class="column q-pb-xs" v-for="answer_list in question_list.answer_lists" :key="`answer-${question_list.id}-${answer_list.id}`">
                        <!--<q-option-group v-model="question_list.answer_id" :options="options[n]" />-->
                        <q-btn v-if="question_list.answer_id==answer_list.id" no-caps color="primary" @click="setAnswer(n_question, answer_list.id)">
                            <div class="text-body2 text-white">{{answer_list.name}}</div>
                        </q-btn>
                        <q-btn v-else no-caps outline @click="setAnswer(n_question, answer_list.id)">
                            <div class="text-body2 text-black"> {{answer_list.name}}</div>
                        </q-btn>
                    </div>
                </q-carousel-slide>
            </q-carousel>
        </q-card-section>

        <!-- buttons example -->
        <q-card-actions align="right" class="row justify-end">
            <!--<q-btn flat label="Tidak tertarik" @click="onCancelClick" />-->
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
        //console.log(this.item);
        let question_lists = [];
        this.item.question_lists.forEach(v => {
            question_lists.push({
                ...v,
                answer_id: null
            })
        })
        this.questionnary = {
            ...this.item,
            question_lists: question_lists
        }

        console.log(this.questionnary);
        // this.options = [];
        // this.item.question_lists.forEach((v, k) => {
        //     let option = []
        //     v.answer_lists.forEach(v2 => {
        //         option.push({
        //             label: v2.name,
        //             value: v2.id
        //         })
        //     })
        //     this.options.push(option)
        //     if (v.answer_id) this.answer_ids[k] = v.answer_id
        // })
        // console.log(this.item.question_lists)
    },
    computed: {
        ...mapState(["Setting", "Auth", 'Questionnary'])
    },
    data() {
        return {
            questionnary: null,
            loading: false,
            slide: 0,
            question_lists: [],
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
        setAnswer(question_list_index, answer_id) {
            //alert(question_list_index + ' ' + answer_id)
            this.questionnary.question_lists[question_list_index].answer_id = answer_id;
            // this.$forceUpdate();
            //console.log(this.question_lists[question_list_index].answer_id)
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
                    this.questionnary.question_lists.forEach((v, k) => {
                        if (v.answer_id == null) {
                            this.slide = k
                            throw BreakException;
                        }
                    })
                    this.$store.dispatch('Questionnary/submit', this.questionnary).then(() => {
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
