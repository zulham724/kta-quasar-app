import QuestionnaryComponent from "components/QuestionnaryComponent";
import { Dialog } from "quasar";
import store from "./../store";

store()
    .dispatch("Questionnary/getActive")
    .then(res => {
        res.data.forEach(item => {
            Dialog.create({
                    component: QuestionnaryComponent,

                    // optional if you want to have access to
                    // Router, Vuex store, and so on, in your
                    // custom component:
                    parent: this, // becomes child of this Vue node
                    // ("this" points to your Vue component)
                    // (prop was called "root" in < 1.1.0 and
                    // still works, but recommending to switch
                    // to the more appropriate "parent" name)
                    item: item,
                    store:store
                })
                .onOk(() => {
                    console.log("OK");
                })
                .onCancel(() => {
                    console.log("Cancel");
                })
                .onDismiss(() => {
                    console.log("Called on OK or Cancel");
                });
        });
    });
