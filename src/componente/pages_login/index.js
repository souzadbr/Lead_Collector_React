import react, {Component} from "react";
import {Form, FormGroup, Label, Input, Button}from 'reactstrap'
import Header from "../header_login";

export default class Login extends Component{
    render (){
        return(
            <div>
            <Header title="Pagina de login"/>
            <hr></hr>
               <Form>
               <FormGroup>
                   <Label for="email">Email</Label>
                    <Input type ="text" id ="email" placeholder="Informe seu email:"/>
               </FormGroup>
               <FormGroup>
                   <Label for="password">Senha</Label>
                    <Input type ="password" id ="password" placeholder="Informe a sua senha:"/>
               </FormGroup>
               <Button color ="primary" block>Entrar</Button>
           </Form>
           </div> 
        );
    }
}