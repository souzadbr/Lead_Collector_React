import react, {Component} from "react";
import {Form, FormGroup, Label, Input, Button}from 'reactstrap'
import Header from "../header_login";

export default class Casdastro extends Component{
    render (){
        return(
            <div>
            <Header title="Cadastro de Lead"/>
            <hr></hr>
               <Form>
               <FormGroup>
                   <Label for="email">Email</Label>
                    <Input type ="text" id ="email" placeholder="Informe seu email:"/>
               </FormGroup>
               <FormGroup>
                   <Label for="Nome">Nome</Label>
                    <Input type ="text" id ="text" placeholder="Informe a seu nome:"/>
               </FormGroup>
               <FormGroup>
                   <Label for="Observações">Observações</Label>
                    <Input type ="text" id ="text" placeholder="Observações:"/>
               </FormGroup>
               <Button color ="primary" block>Cadastrar</Button>
           </Form>
           </div> 
        );
    }
}