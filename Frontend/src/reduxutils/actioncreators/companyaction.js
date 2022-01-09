//Actions will be written in below format

export const setCompId = (compid) => {
  // console.log("id")
  // console.log(compid)
  return (dispatch) => {
    dispatch({
      type: 'setCompId',
      payload: compid,
    })
  }
}

export const setJobId = (jobid) => {
  // console.log("id")
  // console.log(compid)
  return (dispatch) => {
    dispatch({
      type: 'setJobId',
      payload: jobid,
    })
  }
}

export const setCompName = (compName) => {
  // console.log("id")
  // console.log(compid)
  return (dispatch) => {
    dispatch({
      type: 'setCompName',
      payload: compName,
    })
  }
}

export const setCeo = (ceo) => {
  return (dispatch) => {
    dispatch({
      type: 'setCeo',
      payload: ceo,
    })
  }
}

export const setFounded = (founded) => {
  return (dispatch) => {
    dispatch({
      type: 'setFounded',
      payload: founded,
    })
  }
}

export const setRevenue = (revenue) => {
  return (dispatch) => {
    dispatch({
      type: 'setRevenue',
      payload: revenue,
    })
  }
}

export const setAbout = (about) => {
  return (dispatch) => {
    dispatch({
      type: 'setAbout',
      payload: about,
    })
  }
}

export const setDescription = (description) => {
  return (dispatch) => {
    dispatch({
      type: 'setDescription',
      payload: description,
    })
  }
}

export const setMission = (mission) => {
  return (dispatch) => {
    dispatch({
      type: 'setMission',
      payload: mission,
    })
  }
}

export const setValues = (values) => {
  return (dispatch) => {
    dispatch({
      type: 'setValues',
      payload: values,
    })
  }
}

export const setCulture = (val) => {
  return (dispatch) => {
    dispatch({
      type: 'setCulture',
      payload: val,
    })
  }
}

export const setSize = (size) => {
  return (dispatch) => {
    dispatch({
      type: 'setSize',
      payload: size,
    })
  }
}

export const setWHScore = (score) => {
  return (dispatch) => {
    dispatch({
      type: 'setWHScore',
      payload: score,
    })
  }
}

export const setApScore = (score) => {
  return (dispatch) => {
    dispatch({
      type: 'setApScore',
      payload: score,
    })
  }
}
export const setLScore = (score) => {
  return (dispatch) => {
    dispatch({
      type: 'setLScore',
      payload: score,
    })
  }
}

export const setNoOfReviews = (no) => {
  return (dispatch) => {
    dispatch({
      type: 'setNoOfReviews',
      payload: no,
    })
  }
}

export const setFeaturedReviews = (reviews) => {
  return (dispatch) => {
    dispatch({
      type: 'setFeaturedReviews',
      payload: reviews,
    })
  }
}

export const setIndustry = (ind) => {
  return (dispatch) => {
    dispatch({
      type: 'setIndustry',
      payload: ind,
    })
  }
}
