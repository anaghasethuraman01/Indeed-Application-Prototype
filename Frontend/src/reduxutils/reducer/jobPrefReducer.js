const initState = {
    title:"",
    type:null,
    pay:{
        category:'',
        amount:null
    },
    schedule:{},
    remote: [],
    relocation:false
}

export const jobPrefReducer = (state=initState,action) => {
    let type = action.type;
    switch(type) {
        case "setTitle":
            let titlestate = {
                ...state,'title':action.payload
            }
            return titlestate
        case "setType":
            let typeState = {
                ...state,'type':action.payload
            }
            return typeState;
        case "setPay":
            let paystate = {
                ...state,'pay':action.payload
            }
            return paystate;
        case "setSchedule":
            let schState = {
                ...state,'schedule':action.payload
            }
            return schState;     
        case "setRelocation":
            let relState = {
                ...state,'relocation':action.payload
            }
            return relState;   
        case "setRemote"  :   
            let remState = {
                ...state,'remote':action.payload
            }
            return remState;
        
    }
    return state;
}


