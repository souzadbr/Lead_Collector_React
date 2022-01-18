import react, {Component} from "react";
import "./App.css"
import Routes from "./route";


export default class App extends Component{
render(){
      return(
        <div className="App"> 
           <Routes/>
        </div>
      );
    }
}
