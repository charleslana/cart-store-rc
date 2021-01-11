import React, {Component} from 'react';
import {Products} from '../../api/Products';

let items: Products;
items = new Products();

interface InterfaceProps {
    cart: Object[];
    function: Function;
}

class StoreProducts extends Component {

    state = {
        cart: [
            {
                id: 0,
                name: 'Example',
                quantity: 0,
                price: 0
            }
        ]
    }

    addCart = (id: number) => {

        const findItem = items.items.find(item => item.id === id);

        const cartFilter = this.state.cart.filter((cart: any) => cart.id === findItem?.id);

        console.log(findItem);

        findItem!.quantity--;

        if (cartFilter.length) {
            const findIndex = this.state.cart.findIndex((cart: any) => cart.id === findItem?.id);

            console.log(findIndex);

            if (findIndex !== -1 && findItem!.quantity >= 0) {
                console.log('update');

                const {cart} = this.state;

                cart[findIndex].quantity++;

                cart[findIndex].price = findItem!.price * cart[findIndex].quantity;

                this.setState({
                    ...this.state,
                    cart
                });
            }
        } else {
            console.log('add');
            this.setState({
                cart: [
                    ...this.state.cart,
                    {
                        id: findItem?.id,
                        name: findItem?.name,
                        quantity: 1,
                        price: findItem?.price
                    }
                ]
            });
        }
    }

    delCart = (id: number) => {
        const findIndex = this.state.cart.findIndex((object: any) => object.id === id);
        if (findIndex !== -1) {

            const findItem = items.items.find(item => item.id === id);

            const {cart} = this.state;

            findItem!.quantity += cart[findIndex].quantity;

            this.state.cart.splice(findIndex, 1);

            this.setState({
                ...this.state.cart
            });
        }
    }

    render() {
        return (
            <div>
                <div className={'divisor'}>
                    <h1>Products</h1>
                    <table>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>Product</td>
                            <td>Quantity in stock</td>
                            <td>Price</td>
                            <td>Action</td>
                        </tr>
                        </thead>
                        <tbody>
                        {items.items.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.quantity ?
                                        <button onClick={() => this.addCart(item.id)}>Add 1</button>
                                        :
                                        <p>Sold off</p>
                                    }
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className={'divisor'}>
                    <CartStore cart={this.state.cart} function={this.delCart}/>
                </div>
            </div>
        );
    }
}

class CartStore extends Component<InterfaceProps> {

    render() {

        const total = this.props.cart.length - 1;

        return (
            <div>
                <h1>My cart</h1>
                {total ?
                    <table>
                        <thead>
                        <tr>
                            <td>Product</td>
                            <td>Quantity</td>
                            <td>Total price</td>
                            <td>Action</td>
                        </tr>
                        {this.props.cart.map((cart: any, index) => cart.id !== 0 &&
                            <tr key={index}>
                                <td>{cart.name}</td>
                                <td>{cart.quantity}</td>
                                <td>{cart.price}</td>
                                <td>
                                    <button onClick={() => this.props.function(cart.id)}>Del</button>
                                </td>
                            </tr>
                        )}
                        </thead>
                    </table>
                    :
                    <p>Empty</p>
                }
            </div>
        )
    }
}

export default StoreProducts;