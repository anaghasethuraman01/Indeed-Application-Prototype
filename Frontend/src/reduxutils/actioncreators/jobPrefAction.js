//Actions will be written in beelow format

export const setTitle = (title) => {
    return (dispatch) => {
        dispatch({
            type:"setTitle",
            payload:title
        });
    } 
}

export const setType = (type) => {
    return (dispatch) => {
        dispatch({
            type:"setType",
            payload:type
        });
    } 
}

export const setPay = (pay) => {
    return (dispatch) => {
        dispatch({
            type:"setPay",
            payload:pay
        });
    } 
}

export const setSchedule = (sch) => {
    return (dispatch) => {
        dispatch({
            type:"setSchedule",
            payload:sch
        });
    } 
}

export const setRelocation = (rel) => {
    return (dispatch) => {
        dispatch({
            type:"setRelocation",
            payload:rel
        });
    } 
}

export const setRemote = (rem) => {
    return (dispatch) => {
        dispatch({
            type:"setRemote",
            payload:rem
        });
    } 
}