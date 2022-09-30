import { BrowserRouter,Redirect,Route,Switch} from 'react-router-dom';
import ProductDetail from "./Components/FakeStore/ProductDetail";
import AxiosProducts from "./Components/FakeStore/AxiosProducts";
import NavBarStore from './Components/FakeStore/NavBarStore';
import { myReducer,LOGEDIN_STORE } from './Context/reducers';
import LoginStore from './Components/FakeStore/LoginStore';
import 'materialize-css/dist/css/materialize.min.css';
import './Components/FakeStore/store.css';
import Context from './Context/index';
import React from 'react';
import {useReducer} from 'react';

function AppAxios (){
    const [users, dispatch] = useReducer(myReducer, [
        {
            email:"",
            password:"",
            isLogged:false        
        }
      ]);

    let addUsers = (users) => {
        dispatch({type: LOGEDIN_STORE, payload: users});
      }
    return(
        <>
        <Context.Provider value={{users:users,addUsers:addUsers}}>
        <BrowserRouter>
                <NavBarStore/>
            <Switch>
                <Route exact path="/" component={LoginStore} />   
                <Route exact path ="/store">
                    {
                            users.isLogged ? 
                            <AxiosProducts/>
                        :
                        ()=>{
                            alert("must be logged in")
                            return(<Redirect to="/"/>)   
                        }

                    }
                </Route>
                <Route exact path="/product/:id" component={ProductDetail}/>
            </Switch>
        </BrowserRouter>
        </Context.Provider>
        </>
    )
}

export default AppAxios