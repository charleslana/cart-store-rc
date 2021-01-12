interface InterfaceProducts {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export class Products {
    items: InterfaceProducts[] = [
        {
            id: 1,
            name: 'Product 1',
            quantity: 20,
            price: 10.00
        },
        {
            id: 2,
            name: 'Product 2',
            quantity: 10,
            price: 20.00
        },
        {
            id: 3,
            name: 'Product 3',
            quantity: 10,
            price: 30.00
        },
        {
            id: 4,
            name: 'Product 4',
            quantity: 10,
            price: 40.00
        },
        {
            id: 5,
            name: 'Product 5',
            quantity: 10,
            price: 50.00
        },
        {
            id: 6,
            name: 'Product 6',
            quantity: 10,
            price: 60.00
        },
        {
            id: 7,
            name: 'Product 7',
            quantity: 10,
            price: 70.00
        },
        {
            id: 8,
            name: 'Product 8',
            quantity: 10,
            price: 80.00
        },
        {
            id: 9,
            name: 'Product 9',
            quantity: 5,
            price: 90.00
        },
        {
            id: 10,
            name: 'Product 10',
            quantity: 10,
            price: 100.00
        }
    ]
}