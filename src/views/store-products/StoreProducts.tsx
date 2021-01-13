import React, {ChangeEvent, Component} from 'react';
import {Products} from '../../api/Products';

let items: Products;
items = new Products();

interface InterfaceProps {
    cart: Object[];
    function: Function;
    totalPayable: number;
}

interface InterfaceCart {
    id: number;
    name: string;
    quantity: number;
    price: number;
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
        ],
        totalPayable: 0,
        selectedQuantity: 1,
        notify: null
    }

    addQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(event.target.value);
        if(isNaN(value) || value < 1) {
            value = 1;
        }
        this.setState({selectedQuantity: value});
    }

    openNotify = (value: string | null = null) => {
        this.setState({notify: value});
    }

    addCart = (id: number) => {

        this.openNotify();

        const findItem = items.items.find(item => item.id === id);

        const cartFilter = this.state.cart.filter((cart: any) => cart.id === findItem?.id);

        const verifyQuantity = findItem!.quantity - this.state.selectedQuantity;

        if (verifyQuantity < 0) {
            console.log('Insufficient');
            return this.openNotify('Insufficient quantity in stock.');
        }

        findItem!.quantity = verifyQuantity;

        if (cartFilter.length) {
            const findIndex = this.state.cart.findIndex((cart: InterfaceCart) => cart.id === findItem?.id);

            console.log(findIndex);

            if (findIndex !== -1) {
                console.log('update');

                const {cart} = this.state;

                cart[findIndex].quantity += this.state.selectedQuantity;

                cart[findIndex].price = findItem!.price * cart[findIndex].quantity;

                this.setState({
                    ...this.state,
                    cart,
                    totalPayable: this.state.totalPayable + (findItem!.price * this.state.selectedQuantity)
                });
            }
        } else {
            console.log('add');
            this.setState({
                totalPayable: this.state.totalPayable + (findItem!.price * this.state.selectedQuantity),
                cart: [
                    ...this.state.cart,
                    {
                        id: findItem?.id,
                        name: findItem?.name,
                        quantity: this.state.selectedQuantity,
                        price: findItem!.price * this.state.selectedQuantity
                    }
                ]
            });
        }
    }

    delCart = (id: number) => {
        const findIndex = this.state.cart.findIndex((object: InterfaceCart) => object.id === id);
        if (findIndex !== -1) {

            const findItem = items.items.find(item => item.id === id);

            const {cart} = this.state;

            findItem!.quantity += cart[findIndex].quantity;

            const discountPrice = cart[findIndex]?.price;

            this.state.cart.splice(findIndex, 1);

            this.setState({
                ...this.state.cart,
                totalPayable: this.state.totalPayable - discountPrice
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
                            <th>ID</th>
                            <th>Product</th>
                            <th>Quantity in stock</th>
                            <th>Price</th>
                            <th>Action</th>
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
                                    <input type="number" onChange={this.addQuantity} value={this.state.selectedQuantity}/>
                                    {item.quantity ?
                                        <button onClick={() => this.addCart(item.id)}>Add</button>
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
                    <CartStore cart={this.state.cart} function={this.delCart} totalPayable={this.state.totalPayable}/>
                </div>
                {this.state.notify &&
                    <div className={'backDrop'}>
                        <div className={'message'}>{this.state.notify}
                            <button className={'close'} onClick={() => this.openNotify()}>x</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

class CartStore extends Component<InterfaceProps> {

    render() {

        const total = this.props.cart.length - 1;

        return (
            <div>
                <h1>My cart, total payable: {this.props.totalPayable}</h1>
                {total ?
                    <table>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total price</th>
                            <th>Action</th>
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