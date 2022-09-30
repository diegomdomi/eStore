import React, { useContext,useState } from 'react'
import Context from '../../Context/index'
import "./loginStore.css"
import {  useHistory } from 'react-router-dom'

const LoginStore = () => {
    
    const context = useContext(Context)
    const history = useHistory()
    const navigateTo = (path) => {
        history.push(path);
    }
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cliente, setCliente] = useState(true)
    const [registroEmail, setregistroEmail] = useState("")
    const [registroPassword, setregistroPassword] = useState("")
    const [validacionPass, setValidacionPass] = useState(false)
    const [validacionEmail, setValidacionEmail] = useState(false)


    const handleInputChange = (e) => {
        if(e.target.name === "email"){
            const email = e.target.value
            setEmail(email)
        }
        if(e.target.name === "password"){
            const pass = e.target.value
            setPassword(pass)
            // comprobarPass(pass)
        }
        if(e.target.name === "nuevoEmail"){
            const nuevoEmail = e.target.value
            setregistroEmail(nuevoEmail)

        }
        if(e.target.name === "nuevoPassword"){
            const nuevoPassword = e.target.value
            setregistroPassword(nuevoPassword)
            comprobarPass(nuevoPassword)

        }
    }

    const userRegister = (e)=>{
        e.preventDefault()

        let userLogin = {
            "email":registroEmail,
            "password": registroPassword
        }

        if(localStorage){
            let storage;
            if (!localStorage['storage']) storage = [];
            else storage = JSON.parse(localStorage['storage']);
            if (!(storage instanceof Array)) storage = [];
            if((storage.find(user=>user.email === registroEmail))||(userLogin.password.length<5)){
                setCliente(false)
                alert("unavailable user")
            } else if(!userLogin.email){
                setValidacionEmail(false)
            }else{
                setCliente(true)
                storage.push(userLogin);
            }
            
            localStorage.setItem('storage', JSON.stringify(storage));
            
        }
    }

    
    const user =(e)=>{
        e.preventDefault()

        const getUsers= JSON.parse(localStorage.getItem('storage'))
        const mapeoEmail = getUsers.find(user => user.email === email)
        let usuarioLoged =
        {
            "email":email,
            "password":password,
        }
        if( mapeoEmail ){

            if(usuarioLoged.email === mapeoEmail.email && usuarioLoged.password === mapeoEmail.password 
                && usuarioLoged.email !=="" && usuarioLoged.password !== ""){
                    context.addUsers({email:usuarioLoged.email, password:usuarioLoged.password})
                    navigateTo( "/store" )
                }else{
                alert("user or password incorrect")
            }
        }else{
            alert("user does not exist, please create an Account")
        }
     
    }

        const comprobarPass = (value) => {
            if(value.length >= 5 && value.length !== null ){
                setValidacionPass(true)
            }else{
                setValidacionPass(false)
            }
        }    
    
 
return(
   
    <>
        <div className="body-login">
        <h4 className="title-login">User Login</h4>
        <div className="loggin_page">
            <form className="col s12">
            <div className="row">
            <div className="input-field col s4">
                <input   name="email" type="email" className="validate" placeholder="your email..."
                    onChange={handleInputChange}
                />
                <label className="active" for="email_inline">Email</label>
                </div>
                <div className="input-field col s4">
                    <input  name="password" type="password" className="validate" placeholder="your password..."
                    onChange={handleInputChange}
                />
                <label className="active" for="first_name2">Password</label>
                </div>
                <button  onClick={user} className="btn waves-effect waves-light" type="submit" name="action">Loggin</button>
                </div>
            </form>
        </div> 



    <h4 className="title-login">New Account</h4>
    <div className="loggin_page">
            <form className="col s12">
            <div className="row">
            <div class="input-field col s4">
                <input   name="nuevoEmail" type="email" class="validate" placeholder="your email..."
                    onChange={handleInputChange}
                />
                <label class="active" for="email_inline">Email</label>

                </div>
            {(!cliente && registroEmail!=="")  &&<h5 style={{color:"red", fontSize:"16px"}}>the email is exists!</h5> } 
            {((!validacionEmail || registroPassword==="") && !cliente) &&<h5 style={{color:"red", fontSize:"16px"}}>expected an email user!</h5> } 
                <div class="input-field col s4">
                <input  name="nuevoPassword" type="Password" class="validate" placeholder="your password..."
                    onChange={handleInputChange}
                />
                <label class="active" for="first_name2">Password</label>
                </div>
                {!validacionPass && registroPassword.length >= 1 && <h5 style={{color:"red", fontSize:"16px"}}>Password must have more than 5 words</h5>}
                <button  onClick={userRegister} class="btn waves-effect waves-light" type="submit" name="action">Loggin</button>
                </div>
            </form>
        </div> 

    </div>
    </>
    
    )
}

export default LoginStore