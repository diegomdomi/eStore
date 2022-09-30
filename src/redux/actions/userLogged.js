export const ACTIONS_MENSAJES = {

    LOGGED: "LOGGED"
}
export const userLogged = (user)=>{
    return{
        type: ACTIONS_MENSAJES.LOGGED,
        payload:user
    }
}
