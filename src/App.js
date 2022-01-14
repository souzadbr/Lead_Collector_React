import react, {Component} from "react";
//import Login from "./componente/pages_login";
import "./App.css"
import Casdastro from "./componente/page_landing";


export default class App extends Component{
render(){
      return(
        <div className="App"> 
           <Casdastro/>
        </div>
      );
    }
}
