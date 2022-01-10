import React from "react";
import Stock from "./stock";
import Searchbar from "./searchbar";

class FilterableProductTable extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {searchText: "Huile 2T", products: this.props.products};
        this.updateSearchText = this.updateSearchText.bind(this);
    }

    updateSearchText(searchText)
    {
        this.setState({searchText})
    }

    render() {
        return <div className="mx-2" >
            <Searchbar searchText={this.state.searchText} updateSearchText={this.updateSearchText}/>
            <Stock products={this.state.products} filteredText={this.state.searchText} />
        </div>
    }
}

export default FilterableProductTable;