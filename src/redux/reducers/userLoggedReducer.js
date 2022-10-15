import { ACTIONS_MENSAJES } from "../actions/userLogged";

const initialState ={
  userLogged : [],
};

const userLogged = (state=initialState.userLogged, action) => {
    switch(action.type){
        case ACTIONS_MENSAJES.LOGGED:
              state.push(action.payload);
              return[...state];
        default:
                return [...state];
    }

}
export default userLogged
