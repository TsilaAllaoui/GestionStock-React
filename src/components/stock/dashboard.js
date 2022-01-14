import axios from "axios";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {datas: [], show: false, currProduct: null};
        this.deleteProduct = this.deleteProduct.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.updateRows = this.updateRows.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.modifyProduct = this.modifyProduct.bind(this);
        this.getProduct = this.getProduct.bind(this);
    }

    getProduct(product)
    {
        this.setState({currProduct: product});
        console.log(this.state.currProduct);
    }

    updateRows = async () =>
    {
        let products = [];
        await axios.get("http://localhost:5000/products")
        .then(function(resp){
            (resp.data).forEach(product => {
               products.push(product);
            });
        });
        this.setState({datas: products});
    }

    componentDidMount ()
    {
        this.updateRows();
        this.setState({show: false})
    }

    showModal()
    {
        this.setState({show: true});
    }

    hideModal()
    {
        this.setState({show: false});
    }

    deleteProduct = async (event, id) =>
    {
        console.log("id: " + id);
        for (let i=0; i<(this.state.datas).length; i++)
        {
            if ((this.state.datas)[i].id === id) {
                await axios.delete("http://localhost:5000/products/" + id);
            }
        }
        let products = [];
        await axios.get("http://localhost:5000/products")
        .then(function(resp){
            (resp.data).forEach(product => {
               products.push(product);
            });
        });
        this.setState({datas: products});
    }

    modifyProduct = async(p) =>
    {
        for (let i=0; i<(this.state.datas).length; i++)
        {
            if ((this.state.datas)[i].id === p.id) {
                await axios.put("http://localhost:5000/products/" + p.id.toString(),
                    {
                        name: p.name,
                        price: p.price,
                        quantity: p.quantity,
                    }
                );
            }
        }
        await this.updateRows();
    }

    renderRows ()
    {
        var context = this; 
        return (context.state.datas).map(function (product, index) {
            return (
                <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                        <Link to={{
                                    pathname: "/edit", 
                                    state: {product: product}} 
                                } className="btn btn-primary">
                            Modifier
                        </Link>
                    </td>
                    <td><button className="btn btn-danger">Supprimer</button></td> 
                </tr>
            );
        })
    }

    render()
    {
        return <div className="card mx-auto my-4" style={{width: "90%", borderRadius: "10px"}}>
                    <h2 className="text-center card-title">Stock</h2>
                    <table className="table table-striped">
                        <thead style={{backgroundColor: "black"}}>
                            <tr className="text-light">
                                <th>Nom</th>
                                <th>Prix(Ar)</th>
                                <th>Quantites</th>
                                <th colSpan="2"></th>
                            </tr>
                        </thead>
                        <tbody> 
                        {this.renderRows()}     
                        </tbody>
                    </table>
                </div>
    }
}

export default Dashboard;