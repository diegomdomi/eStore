import { ACTIONS_MENSAJES } from "../actions/logginAction";

const initialState = {
    logged : false,
}
const isLoggin = (state = initialState.logged, action) =>{ 
    switch(action.type){
        case ACTIONS_MENSAJES.LOGGIN:
              return !state;
            default:
                 return state
    }

}

export default isLoggin 