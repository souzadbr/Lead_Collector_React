import react, {Component} from "react";
import {Form, FormGroup, Label, Input, Button}from 'reactstrap'
import Header from "../header_login";

export default class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            message : this.props.state?this.props.state.message: '',
        };
    }   

    signIn = () => {
        const url = "http://localhost:8080/login";
        const data = {
            email: this.email,
            senha: this.password,
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
                console.log("O login foi realizado com sucesso.")
                return response.headers.get("Authorization")
            }
            throw new Error("Login inválido")
        }).then(token => {
            localStorage.setItem('token', token);
            this.props.history.push("/dashboard");
        }).catch( e => {
            this.setState({message: e.message})
            console.log(this.email, this.password)
        });
    }

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