import react, { Component } from "react";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

class ListLead extends Component {
    
  render() {
      const {leads} = this.props;
    return (
      <Table className="table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Obs.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {
                leads.map(
                    (lead) => (
                        <tr key ={lead.email}>

                            <td>{lead.nome}</td>
                            <td>{lead.email}</td>
                            <td>{lead.observacoes}</td>
                            <td>
                                <Button color="info" size="sm">
                                    Editar
                                </Button>
                                <Button color="danger" size="sm">
                                    Deletar
                                </Button>
                            </td>

                        </tr>
                ))
            }
        </tbody>
      </Table>
    );
  }
}

class FormLead extends Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <div className="form-row">
            <Label for="nome"> Nome </Label>
            <Input id="nome" type="text" placeholder="Informe o nome do lead" />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <Label for="email"> Email </Label>
            <Input
              id="email"
              type="text"
              placeholder="Informe o email do lead"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <Label for="observations"> Observações </Label>
            <Input
              id="observations"
              type="text"
              placeholder="Observações do lead"
            />
          </div>
        </FormGroup>
        <Button color="primary" block>
          ATUALIZAR
        </Button>
      </Form>
    );
  }
}

class Dashboard extends Component {
  url = "http://localhost:8080/leads";
  state = {
    leads: [],
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    const requestInfo = {
        method: "GET",
        headers: new Headers({
            "Content-type":"application/json",
            Authorization: token, 

        })
    };
    fetch(this.url, requestInfo )
    .then((response) => response.json())
    .then((leads)=> this.setState({leads}))
    .catch((e)=>console.log(e));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center">ATUALIZAR LEAD</h2>
            <FormLead />
          </div>
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center">LISTA DE LEADS </h2>
            <ListLead leads = {this.state.leads}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
