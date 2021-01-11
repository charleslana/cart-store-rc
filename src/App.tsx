import React, {Component} from "react";
import './assets/layout/main.css'
import StoreProducts from "./views/store-products/StoreProducts";

class App extends Component {

    render() {
        return (
            <div>
                <StoreProducts/>
            </div>
        );
    }
}

export default App;