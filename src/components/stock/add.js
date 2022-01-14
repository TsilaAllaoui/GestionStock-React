import React from "react";
import axios from "axios";

class Add extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {product: {name: "", price:0, quantity: 0, id: -1}};
        this.setPrice = this.setPrice.bind(this);
        this.setName = this.setName.bind(this);
        this.setQuantity = this.setQuantity.bind(this);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
    }

    cancel(e)
    {
        e.preventDefault();
        window.location.href = "/dashboard";
    }

    submit = async(e) =>
    {
        e.preventDefault();
        let p = this.state.product;
        console.log(p);
        await axios.post("http://localhost:5000/products/",
            {
                name: p.name,
                price: p.price,
                quantity: p.quantity,
            }
        );
        window.location.href = "/dashboard";
    }

    setPrice(e)
    {
        let value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
        if (parseInt(e.target.value) <= 0)
            value = 0;
        let p = this.state.product;
        e.target.value = value;
        this.setState({product: {name: p.name, price: value, quantity: p.quantity, id: p.id}});
    }

    setQuantity(e)
    {
        let value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
        if (parseInt(e.target.value) < 0)
            value = 0;
        let p = this.state.product;
        e.target.value = value;
        this.setState({product: {name: p.name, price: p.price, quantity: value, id: p.id}});
    }

    setName(e)
    {
        let p = this.state.product;
        this.setState({product: {name: e.target.value, price: p.price, quantity: p.quantity, id: p.id}});
    }

    render()
    {
        return <div className="container card">
                    <div className="card-header row bg-dark">
                        <p className="card-text text-center text-light lead">Ajouter un produit</p>
                    </div>
                    <div className="card-body">
                        <div className="card bg-white">
                            <div className="card-body row mx-4">
                                <label className="lead col-3 text-center">Nom: </label>
                                <input id="name" className="col-9" type="text" onChange={(e) => this.setName(e)} />
                            </div>
                            <div className="card-body row mx-4">
                                <label className="lead col-3 text-center">Prix: </label>
                                <input id="price" className="col-9" type="text" onChange={(e) => this.setPrice(e)} />
                            </div>
                            <div className="card-body row mx-4">
                                <label className="lead col-sm-4 col-md-3 text-center">Quantite: </label>
                                <input id="qunatity" className="col-sm-8 col-md-9" type="text" onChange={(e) => this.setQuantity(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer row"> 
                        <button className="btn btn-success offset-2 col-2" onClick={(e) => this.submit(e)}>Ajouter</button>
                        <button className="btn btn-danger offset-4 col-2" onClick={(e) => this.cancel(e)}>Annuler</button>
                    </div>
                </div>
    }
}

export default Add;