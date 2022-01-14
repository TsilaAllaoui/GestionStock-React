import React from "react";
import axios from "axios";


class Edit extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {product: {}, productToSubmit: {name: "", price:0, quantity: 0, id: -1}};
        this.setPrice = this.setPrice.bind(this);
        this.setName = this.setName.bind(this);
        this.setQuantity = this.setQuantity.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    submit = async(e) =>
    {
        let p = this.state.productToSubmit;
        e.preventDefault();
        await axios.put("http://localhost:5000/products/" + p.id.toString(),
            {
                name: p.name,
                price: p.price,
                quantity: p.quantity,
            }
        );
        window.location.href = "/dashboard";
    }

    cancel()
    {
        window.location.href = "/dashboard";
    }

    setPrice(e)
    {
        let value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
        if (parseInt(e.target.value) <= 0)
            value = 0;
        let p = this.state.productToSubmit;
        e.target.value = value;
        this.setState({productToSubmit: {name: p.name, price: value, quantity: p.quantity, id: p.id}});
    }

    setQuantity(e)
    {
        let value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
        if (parseInt(e.target.value) < 0)
            value = 0;
        let p = this.state.productToSubmit;
        e.target.value = value;
        this.setState({productToSubmit: {name: p.name, price: p.price, quantity: value, id: p.id}});
    }

    setName(e)
    {
        let p = this.state.product;
        this.setState({productToSubmit: {name: e.target.value, price: p.rpice, quantity: p.quantity, id: p.id}});
    }

    componentDidMount()
    {
        this.setState({product: this.props.location.state.product, productToSubmit: this.props.location.state.product});
        console.log(this.state.productToSubmit);
    }

    render()
    {
        return (
            <div className="card container" >
               <div className="card-header row bg-dark">
                    <p className="text-center h1 text-light">Modifier Produit</p>
                </div>
                <div className="card-body">
                    <div className="card bg-white">
                        <div className="card-body row mx-4">
                            <label className="lead col-3 text-center">Nom: </label>
                            <input id="name" className="col-9" type="text" defaultValue={this.state.product.name} onChange={(e) => this.setName(e)}/>
                        </div>
                        <div className="card-body row mx-4">
                            <label className="lead col-3 text-center">Prix: </label>
                            <input id="price" className="col-9" type="text" defaultValue={this.state.product.price} onChange={(e) => this.setPrice(e)}/>
                        </div>
                        <div className="card-body row mx-4">
                            <label className="lead col-sm-4 col-md-3 text-center">Quantite: </label>
                            <input id="quantity" className="col-sm-8 col-md-9" type="text" defaultValue={this.state.product.quantity} onChange={(e) => this.setQuantity(e)}/>
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-dark row">
                    <button className="btn btn-success offset-2 col-2" onClick={(e) => this.submit(e)}>Modifier</button>     
                    <button className="btn btn-danger offset-4 col-2" onClick={(e) => this.cancel(e)}>Annuler</button>
                </div>
            </div>
        );
    }
}

export default Edit;