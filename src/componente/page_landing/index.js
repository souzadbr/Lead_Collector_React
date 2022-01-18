import react, {Component} from "react";
import {Form, FormGroup, Label, Input, Button}from 'reactstrap'
import Header from "../header_login";

export default class Casdastro extends Component{

    signIn = () => {
        const url = "http://localhost:8080/leads";
        const data = {
            email: this.email,
            senha: this.name,
            observation: this.observation,
        };
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };
        fetch(url, requestInfo)
        .then(response => {
            if(response.ok){
                return response;
            }
        }).catch( e => {
            this.setState({message: e.message})
            console.log(this.email, this.password)
        });
    }

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