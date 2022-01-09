const initState = {
  compid: '',
  jobid: 0,
  compName: '',
  ceo: '',
  founded: '',
  industry: '',
  revenue: '',
  about: '',
  description: '',
  mission: '',
  culture: '',
  featuredReviews: [],
  values: '',
  noOfReviews: 0,
  size: 0,
  whScore: 0,
  lScore: 0,
  apScore: 0,
}

export const companyReducer = (state = initState, action) => {
  let type = action.type
  console.log(action.type)
  console.log(action.payload)
  switch (type) {
    case 'setCompId':
      let IdState = {
        ...state,
        compid: action.payload,
      }
      return IdState
    case 'setJobId':
      let jobIdState = {
        ...state,
        jobid: action.payload,
      }
      return jobIdState
    case 'setCompName':
      let NameState = {
        ...state,
        compName: action.payload,
      }
      return NameState
    case 'setCeo':
      let ceoState = {
        ...state,
        ceo: action.payload,
      }
      return ceoState
    case 'setFounded':
      let foundedState = {
        ...state,
        founded: action.payload,
      }
      return foundedState
    case 'setRevenue':
      let revState = {
        ...state,
        revenue: action.payload,
      }
      return revState
    case 'setAbout':
      let aboutState = {
        ...state,
        about: action.payload,
      }
      return aboutState
    case 'setDescription':
      let descriptionState = {
        ...state,
        description: action.payload,
      }
      return descriptionState
    case 'setMission':
      let missionState = {
        ...state,
        mission: action.payload,
      }
      return missionState
    case 'setCulture':
      let cultState = {
        ...state,
        culture: action.payload,
      }
      return cultState
    case 'setValues':
      let valState = {
        ...state,
        values: action.payload,
      }
      return valState

    case 'setWHScore':
      let wstate = {
        ...state,
        whScore: action.payload,
      }
      return wstate
    case 'setLScore':
      let lstate = {
        ...state,
        lScore: action.payload,
      }
      return lstate
    case 'setApScore':
      let apState = {
        ...state,
        apScore: action.payload,
      }
      return apState
    case 'setSize':
      let sizeState = {
        ...state,
        size: action.payload,
      }
      return sizeState
    case 'setFeaturedReviews':
      let frState = {
        ...state,
        featuredReviews: action.payload,
      }
      return frState
    case 'setNoOfReviews':
      let norState = {
        ...state,
        noOfReviews: action.payload,
      }
      return norState
    case 'setIndustry':
      let indState = {
        ...state,
        industry: action.payload,
      }
      return indState
  }
  return state
}
