
import React from 'react';
import { formatNumber } from '../utils/formatNumber';

const ProductTable = ({ products }) => {
    const totalRevenue = products.reduce((acc, product) => acc + product.totalRevenue, 0);

    return (
        <div className="product-table">
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.name}>
                            <td>{product.name}</td>
                            <td>{formatNumber(product.totalRevenue)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total-revenue">
                Total Revenue: {formatNumber(totalRevenue)}
            </div>
        </div>
    );
};

export default ProductTable;
