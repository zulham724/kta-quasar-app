<template>
<div>
    <q-stepper flat header-nav v-model="step" vertical color="primary" animated style="min-width:80vw">

        <q-step v-for="(item, n) in data.question_lists" :key="n" :name="n+1" :title="`Kuesioner ${n+1} `" icon="settings" :done="step > n+1" :error="item.answer_id==null && n+1<step">
            <div class="row" style="min-width:100%;">
                {{item.name}}
            </div>
            <div class='row'>
                <q-option-group v-model="answer_ids[n]" :options="options[n]" @input="cek(item.id,answer_ids[n])" />
            </div>
            <!--<div class="column">
                <q-radio v-for="(answer_list, n2) in item.answer_lists" :key="n2" :val="answer_list.id" :label="answer_list.name" v-model="answers[n]" @input="answers[n]" />
            </div>-->
            <q-stepper-navigation v-if="step<data.question_lists.length">
                <q-btn @click="step++" color="primary" label="Selanjutnya" />
            </q-stepper-navigation>
        </q-step>

        <!-- <q-step :name="4" title="Create an ad" icon="add_comment">
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with
            your ads, find out how to tell if they're running and how to resolve approval issues.

            <q-stepper-navigation>
                <q-btn color="primary" label="Finish" />
                <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
        </q-step>-->
    </q-stepper>
</div>
</template>

<script>
import {
    mapState,
} from "vuex";
export default {
    props: {
        user: null,
        data: null
    },
    computed: {
        ...mapState(["Setting", "Auth", 'Questionnary'])
    },
    created() {
        this.options = [];
        this.data.question_lists.forEach((v, k) => {
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
        console.log(this.data.question_lists)
    },
    data() {
        return {
            step: 1,
            answer_ids: [],
            group: null,
            options: [{
                    label: 'Battery too low',
                    value: 'bat'
                },
                {
                    label: 'Friend request',
                    value: 'friend',
                },
                {
                    label: 'Picture uploaded',
                    value: 'upload',
                }
            ]
        };
    },
    mounted() {},
    methods: {
        cek: function (question_list_id, answer_id) {
            //console.log(a)
            this.$store.dispatch('Questionnary/update', {
                question_list_id: question_list_id,
                answer_id: answer_id
            });
            // this.update({
            //     question_list_id: question_list_id,
            //     answer_id: answer_id
            // })
        }
    }
};
</script>

<style></style>
