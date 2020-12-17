const mutation = {
    set(state, payload){
        //state.items = [...payload]
        payload.forEach(v=>{
            v.question_lists.forEach(v2=>{
                v2.answer_id = null
            })
            //state.items.push({...v})
        })
        state.items = [...payload]
        console.log(state.items)
    },
    update(state, payload){
        let index=state.items[0].question_lists.findIndex(e=>e.id==payload.question_list_id);
        if(index>-1)state.items[0].question_lists[index].answer_id=payload.answer_id;
    }
}

export default mutation
