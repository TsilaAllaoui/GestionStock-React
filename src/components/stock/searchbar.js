import React from "react";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

class Searchbar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {searchText: this.props.searchText}
        this.onSearchTextChange = this.onSearchTextChange.bind(this);
    }

    onSearchTextChange(e)
    {
        this.setState({searchText: e.target.value})
        this.props.updateSearchText(e.target.value);
    }

    render()
    {
        const searchText = this.props.searchText;
        return <div className="form-group mx-2 my-2 row">
                <input value={this.state.searchText} className="form-contorl col-8" placeholder="Rechercher un produit..." onChange={this.onSearchTextChange}></input>
                <button className="btn btn-primary offset-1 col-3">Rechercher</button>
            </div>
    }
}

export default Searchbar;