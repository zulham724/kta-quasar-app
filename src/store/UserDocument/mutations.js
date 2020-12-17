const mutation = {
    set(state, payload){
        const index = state.items.findIndex(e => e.user.id ==payload.user.id);
        if(index>-1)state.items[index].documents=payload.documents;
        else state.items.push(payload)
        //console.log(state.items)
    },
    addDocuments(state, payload){
        const index=state.items.findIndex(e=>e.user.id==payload.user.id);
        if(index>-1){
            const previousDocuments=state.items[index].documents.data;
            state.items[index].documents = payload.documents;
            state.items[index].documents.data=[...previousDocuments,...payload.documents.data];
            // payload.documents.data.forEach(document=>{
            //     const document_index=state.items[index].documents.data.findIndex(e=>e.id==document.id);
            //     if(document_index==-1){
            //        state.items[index].documents.data.push(document);
            //     }
            // });
           
            
        }
    },
}

export default mutation
