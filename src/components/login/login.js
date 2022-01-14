import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "react-bootstrap";

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {datas: [], loggedId: -1, error: ""}
        this.setNames = this.setNames.bind(this);
    }

    getNames = async () => 
    {
        const axios = require("axios");
        let logins = [];
        await axios.get("http://localhost:5000/logins")
        .then(function(resp){
            (resp.data).forEach(login => {
               logins.push(login);
            });
        });
        this.setState({datas: logins});
    }

    setNames = (name) =>
    {
        document.getElementById("username").value = name;
        document.getElementById("password").value = name;
        document.querySelector("#error").classList.add("invisible");
    }

    handleForm = async () =>
    {
        const givenUsername = document.getElementById("username");
        const givenPassword = document.getElementById("password");
        let usernameFound = false;
        let passswordFound = false;
        await this.getNames();
        const d = this.state.datas;
        for (let i=0; i<d.length; i++)
        {
            if (d[i].password === givenPassword.value)
            {
                passswordFound = true;
                if (d[i].username === givenUsername.value)
                {
                    usernameFound = true;
                    this.setState({datas: this.state.datas ,loggedId: d[i].id});
                    window.location.href = "/dashboard";
                    break;
                }
            }
        }
        if (!usernameFound || !passswordFound)
        {
            this.setState({datas: this.state.datas, loggedId: this.state.loggedId ,error: "Identifiant ou mot de passe incorrect..."});
            document.querySelector("#error").classList.remove("invisible");
        }
    }
    
    render()
    {
        return  <div id="container" className="container text-center mt-4" style={{width: "90%"}}>
                    <div className="card" style={{backgroundColor: "rgb(153, 217, 234)"}}>
                        <div className="card-title display-4">Se connecter</div>
                        <form onSubmit={this.props.handleSubmit} className="card-body">
                            <div className="form-group row">
                                <label className="lead">Identifiant</label>
                                <input id="username" className="form-control text-center offset-3 col-4" type="text" placeholder="Entrer identifiant..." style={{width: "50%"}} autoFocus required/>
                            </div>
                            <div className="form-group row">
                                <label className="lead">Mot de passe</label>
                                <input id="password" className="form-control text-center offset-3 col-4" type="password" placeholder="Entrer mot de passe..." style={{width: "50%"}} autoFocus required/>
                            </div>
                            <div className="row">
                                <button className="btn btn-success mt-1 offset-3 col-4 text-center" onClick={(e) => {e.preventDefault(); this.handleForm()} } style={{width: "50%"}} >Submit</button>
                                <button className="btn btn-danger mt-1 offset-5 col-4" onClick={ (e) => { e.preventDefault(); this.setNames("")} } style={{width: "20%"}}>Cancel</button>
                            </div>
                        </form>
                        <div className="row">
                            <p className="alert alert-danger invisible offset-4 col-4" id="error" style={{color: "red"}}>{this.state.error}</p>
                        </div>
                    </div>
                </div>
    }
};

export default Login;