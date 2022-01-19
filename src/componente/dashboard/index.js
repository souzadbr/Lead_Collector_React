/* eslint-disable no-undef */
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
import PubSub from "pubsub-js";

class ListLead extends Component {
  onEdit = (lead) => {
    PubSub.publish("edit-lead", lead);
  };
  delete = (email) => {
    this.props.deleteLead(email);
  };
  render() {
    const { leads } = this.props;
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
          {leads.map((lead) => (
            <tr key={lead.email}>
              <td>{lead.nome}</td>
              <td>{lead.email}</td>
              <td>{lead.observacoes}</td>
              <td>
                <Button
                  color="info"
                  size="sm"
                  onClick={(e) => this.onEdit(lead)}
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={(e) => this.deleteLead(email)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

class FormLead extends Component {
  state = {
    model: {
      nome: "",
      email: "",
      observacoes: "",
    },
  };
  componentWillMont() {
    // eslint-disable-next-line no-undef
    PubSub.subscribe("edit-lead", (topic, lead) => {
      this.setState({ model: lead });
    });
  }
  setValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
  };

  create = () => {
    this.setState({ model: { nome: "", email: "", observacoes: "" } });
    this.props.leadCreate(this.state.model);
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <div className="form-row">
            <Label for="nome"> Nome </Label>
            <Input
              id="nome"
              type="text"
              value={this.state.model.nome}
              placeholder="Informe o nome do lead"
              onChange={(e) => this.setValues(e, "nome")}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <Label for="email"> Email </Label>
            <Input
              id="email"
              type="text"
              value={this.state.model.email}
              placeholder="Informe o email do lead"
              onChange={(e) => this.setValues(e, "email")}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="form-row">
            <Label for="observations"> Observações </Label>
            <Input
              id="observations"
              type="text"
              value={this.state.model.observacoes}
              placeholder="Observações do lead"
              onChange={(e) => this.setValues(e, "observacoes")}
            />
          </div>
        </FormGroup>
        <Button color="primary" block onClick={this.create}>
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
    message: {
      text: "",
      alert: "",
    },
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    const requestInfo = {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: token,
      }),
    };
    fetch(this.url, requestInfo)
      .then((response) => response.json())
      .then((leads) => this.setState({ leads }))
      .catch((e) => console.log(e));
  }

  save = (lead) => {
    let data = {
      nome: lead.nome,
      email: lead.email,
      observacoes: lead.observacoes,
    };
    //pegar token para atualizar valor
    // const token = localStorage.getItem("token");
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-type": "applicatio/json",
        //enviar token no cabeçalho da requisção
        //    Authorization:token,
      }),
    };
    fetch(this.url, requestInfo)
      .then((response) => response.json())
      .then((newLead) => {
        let { leads } = this.state;
        leads.push(newLead);
        this.setState({
          leads,
          message: {
            text: "Lead atualizado com sucesso",
            alert: "success",
          },
        });
        this.timeMessage(3000);
      })
      .catch((e) => console.log(e));
  };

  timeMessage = (duration) => {
    setTimeout(() => {
      this.setState({ message: { texte: ", alert: " } });
    }, duration);
  };

  delete = (email) => {
    const token = localStorage.getItem("token");
    const requestInfo = {
      method: "DELETE",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: token,
      }),
    };
    fetch(`${this.url}/${email}`, requestInfo)
      .then((rows) => {
        const leads = this.state.leads.filter((lead) => lead.email !== email);
        this.setState({
          leads,
          message: { text: "Lead deletado com sucesso", alert: "danger" },
        });
        this.timeMessage(3000);
      })
      .catch((e) => console.log(e));
  };
  render() {
    return (
      <div>
        {this.state.message.text !== "" ? (
          <Alert color={this.state.message.text.alert} className="text-center">
            {this.state.message.text}
          </Alert>
        ) : (
          ""
        )}
        <div className="row">
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center">ATUALIZAR LEAD</h2>
            <FormLead leadCreate={this.save} />
          </div>
          <div className="col-md-6 my-3">
            <h2 className="font-weight-bold text-center">LISTA DE LEADS </h2>
            <ListLead leads={this.state.leads} deleteLead={this.delete} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
