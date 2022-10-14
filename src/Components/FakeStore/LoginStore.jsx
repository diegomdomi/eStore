import React, { useContext,useState,useEffect } from 'react'
import Context from '../../Context/index'
import "./loginStore.css"
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import * as M from 'materialize-css';
import {  useHistory } from 'react-router-dom'

const LoginStore = () => {
    useEffect(() => {
        M.AutoInit();
      }, [])
    
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
    const [validacionEmail, setValidacionEmail] = useState(true)
    const [checkEmail, setCheckEmail] = useState(false)
    const [typePass, setTypePass] = useState(false)

    const handleInputChange = (e) => {
        if(e.target.name === "email"){
            const email = e.target.value
            validateEmail(email)
            setEmail(email.trim().toLowerCase())
        }
        if(e.target.name === "password"){
            const pass = e.target.value
            setPassword(pass.trim())
            // comprobarPass(pass)
        }
        if(e.target.name === "nuevoEmail"){
            const nuevoEmail = e.target.value
            validateEmail(nuevoEmail)
            setregistroEmail(nuevoEmail.trim().toLowerCase())
            const store = JSON.parse(localStorage.getItem('storage'))
            const findStore = store.find(user => user.email === nuevoEmail)
            findStore ? setValidacionEmail(false) : setValidacionEmail(true)
            
        }
   
        if(e.target.name === "nuevoPassword"){
            const nuevoPassword = e.target.value
            setregistroPassword(nuevoPassword.trim())
            comprobarPass(nuevoPassword)
            
        }
    }

    const userRegister = ()=>{

        let userLogin = {
            "email":registroEmail,
            "password": registroPassword
        }
        if(localStorage){
            let storage;
            if (!localStorage['storage']) storage = [];
            else storage = JSON.parse(localStorage['storage']);
            if (!(storage instanceof Array)) storage = [];
            if((storage.find(user=>user.email === registroEmail))){
                alert("Unavailable user")
            } 
      
            else if((!checkEmail)||(!userLogin.email)||(userLogin.password.length<5) ){
                setCliente(false)
                alert("Error to create a valid Account")}    
            else{
                setCliente(true)
                storage.push(userLogin);
            }
            localStorage.setItem('storage', JSON.stringify(storage));
            M.updateTextFields();
        }
    }



    
    const user =()=>{

        const getUsers= JSON.parse(localStorage.getItem('storage'))
        const mapeoEmail = getUsers && getUsers.find(user => user.email === email) 

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
                } else {
                    alert("user or password incorrect");
                }
                
                
        }else{
            alert("user does not exist, please create an Account")
        }
      
        M.updateTextFields();
    }

     
    const  filter = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validateEmail = (value) => {
        if(filter.test(value)){
            setCheckEmail(true)
        }else{
            setCheckEmail(false)
        }
    }

    const comprobarPass = (value) => {
        if(value.length >= 5 && value.length !== null ){
            setValidacionPass(true)
        }else{
            setValidacionPass(false)
        }
    }    

    const showPass = () => {
      setTypePass(!typePass)
    }

    const enviarForm = (e) => {
        e.preventDefault();
        e.target.reset();
        M.updateTextFields();
        setEmail("");    
        setPassword(""); 
        setregistroEmail("");
        setregistroPassword("");
        setCliente(true)
    }

   console.log(validacionEmail);

return(
   
    <>
    <div className="body-login">
        <h4 className="title-login">
            User Login
        </h4>
        <div className="loggin_page">
            <form className="col s12" onSubmit={enviarForm} >
                <div className="row">
                    <div className="input-field col s4">
                        <input  id="email" name="email" type="email" className="validate" placeholder="your email..." autoComplete="off"
                            onChange={handleInputChange} 
                        />
                        <label className="active" htmlFor="email_inline">Email</label>
                        { email.length >= 1 && !checkEmail &&<span style={{color:"#360f0fb3", fontSize:"16px",fontWeight:"bold"}}>expected an email user!</span>}
                    </div>

                    <div className="input-field col s4" style={{position:"relative"}}>
                        <input  name="password" type={typePass ? "text" : "password" } className="validate" placeholder="your password..." autoComplete="off"
                        onChange={handleInputChange}
                        />
                        <label className="active" htmlFor="first_name2">Password</label>
                    </div>
                    <ul className="col" >
                        {
                            password.length > 0 
                            && 
                            <li style={{position: 'absolute',marginLeft:'-55px',marginTop:'17px' }}>
                                <button onClick={showPass} style={{cursor:'pointer'}} type="button" disabled={!password}>
                                    {typePass?<FontAwesomeIcon icon={faEyeSlash}/>:<FontAwesomeIcon icon={faEye}/>}
                                </button>
                            </li>
                        }
                            <li><button onClick={user} className="btn waves-effect waves-light btn-small buttons" type="submit" name="action">Log in</button></li>
                    </ul>
                </div>
            </form>
        </div> 



        <h4 className="title-login">
            New Account
        </h4>
        <div className="loggin_page">
            <form className="col s12" onSubmit={enviarForm}>
                <div className="row">
                    <div className="input-field col s4">
                        <input id="email"  name="nuevoEmail" type="email" className="validate" placeholder="your email..." autoComplete="off"
                            onChange={handleInputChange}
                        />
                        <label className="active" htmlFor="email_inline">Email</label>
                        {(!validacionEmail)  &&<h5 style={{color:"#360f0fb3", fontSize:"16px",fontWeight:"bold"}}>this email already exists!</h5> }
                        {(!checkEmail && registroPassword.length>=5) &&<h5 style={{color:"#360f0fb3", fontSize:"16px",fontWeight:"bold"}}>expected an email user! example@example.com</h5> } 
                    </div>
           
                    <div className="input-field col s4">
                        <input  name="nuevoPassword"type={typePass ? "text" : "password" } className="validate" placeholder="your password..." autoComplete="off"
                            onChange={handleInputChange}
                        />
                        <label className="active" htmlFor="first_name2">Password</label>
                        {!validacionPass && registroPassword.length >= 1 && <h5 style={{color:"#360f0fb3", fontSize:"16px",fontWeight:"bold"}}>Password must have more than 5 characters</h5>}
                        {(checkEmail && !registroPassword.length && !cliente) && <h5 style={{color:"#360f0fb3", fontSize:"16px",fontWeight:"bold"}}>Expected Password</h5>}
                    </div>
                    <ul className="col" >
                        {
                            registroPassword.length > 0 && 
                            <li style={{position: 'absolute',marginLeft:'-55px',marginTop:'17px' }}>
                                <button onClick={showPass} style={{cursor:'pointer'}} type="button" disabled={!registroPassword} >
                                    {typePass?<FontAwesomeIcon icon={faEyeSlash}/>:<FontAwesomeIcon icon={faEye}/>}
                                </button>
                            </li>
                        }
                            <li>
                                <button onClick={userRegister} className="btn waves-effect waves-light btn-small buttons" type="submit" name="action">Sign in</button>
                            </li>
                    </ul>
                </div>
            </form>
        </div> 
    </div>
    </>
    )
}

export default LoginStore