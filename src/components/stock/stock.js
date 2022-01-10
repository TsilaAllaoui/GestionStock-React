import React from "react";

class Stock extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {products: this.props.products, filteredText: this.props.filteredText};
    }

    render()
    {
        let rows = [];
        this.state.products.forEach(product => {
            const inner =   <>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                            </>
            let currTr = <tr>{inner}</tr>
            if (product.quantity == 0)
                currTr = <tr style={{ color: "red" }}>{inner}</tr>
            if (this.state.filteredText == "")
                rows.push(currTr);
            else if (product.name.toUpperCase().includes(this.state.filteredText.toUpperCase()) && this.state.filteredText != "")
                rows.push(currTr);
        });
        return (
            <table className="table table-striped">
                <thead className="thead-dark">
                    <th>Nom</th>
                    <th>Prix</th>
                    <th>Quantite</th>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default Stock;