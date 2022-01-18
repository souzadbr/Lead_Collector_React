import react, { Component } from "react";
import { Form, FormGroup, Label, Input, Button,Alert } from "reactstrap";
import Header from "../header";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.state ? this.props.state.message : "",
    };
  }

  cadastrarLead = () => {
    const url = "http://localhost:8080/leads";
    const data = {
      email: this.email,
      nome: this.nome,
      observacoes: this.observacoes,
    };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };
    fetch(url, requestInfo)
      .then((response) => {
        if (response.ok) {
          return response;
        }
      })
      .catch( e => {
        console.log("Lead inválido")
    });
  };

  render() {
    return (
      <div>
        <Header title="Cadastro de Lead" />
        <hr></hr>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="Informe seu email:"
              onChange={(e) => (this.email = e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Nome">Nome</Label>
            <Input
              type="text"
              id="nome"
              placeholder="Informe a seu nome:"
              onChange={(e) => (this.nome = e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Observacoes">Observações</Label>
            <Input type="text" id="Observacoes" placeholder="Observações:" onChange={(e) => (this.observacoes = e.target.value)} />
          </FormGroup>
          <Button color="primary" block onClick={this.cadastrarLead}>
            Cadastrar
          </Button>
        </Form>
      </div>
    );
  }
}
