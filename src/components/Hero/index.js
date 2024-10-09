"use client"
import React, { useState } from 'react';
import axios from 'axios';

const OrderFetcher = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const fetchOrderDetails = async () => {
    setLoading(true); // Start loading state
    setError('');
    setOrderDetails(null);
    
    try {
      const response = await axios.get(
        `https://www.onatiglobal.com/wp-json/wc/v3/orders/${orderId}`,
        {
          auth: {
            username: 'ck_0b29b322e7fa541eb0c12cd1199abae3e217ba8f',
            password: 'cs_b4721dacdd33c73c891400c029ba226f584f65de',
          },
        }
      );
      setOrderDetails(response.data);
    } catch (err) {
      setError('Error fetching order details. Please check the order ID.');
      console.error(err);
    } finally {
      setLoading(false); // End loading state
    }
  };
  

  return  (
    <div className="max-w-md mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Fetch Order Details</h1>
    <input
      type="text"
      placeholder="Enter Order ID"
      value={orderId}
      onChange={(e) => setOrderId(e.target.value)}
      className="border border-gray-300 rounded p-2 w-full mb-4"
    />
    <button
      onClick={fetchOrderDetails}
      className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={loading}
    >
      {loading ? 'Fetching...' : 'Fetch Order'}
    </button>

    {error && <p className="text-red-500 mt-4">{error}</p>}

    {orderDetails && (
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Order Details</h2>
        <p><strong>Order ID:</strong> {orderDetails.id}</p>
        <p><strong>Status:</strong> {orderDetails.status}</p>
        <p><strong>Total:</strong> {orderDetails.currency_symbol} {orderDetails.total}</p>

        <h3 className="font-semibold mt-4">Billing Address</h3>
        <p><strong>Name:</strong> {orderDetails.billing.first_name} {orderDetails.billing.last_name}</p>
        <p><strong>company:</strong> {orderDetails.billing.company} </p>
        <p><strong>Address:</strong> {orderDetails.billing.address_1},{orderDetails.billing.address_2} ,{orderDetails.billing.city}, {orderDetails.billing.state}</p>
        <p><strong>Pin Code:</strong> {orderDetails.billing.postcode}</p>
        <p><strong>Country:</strong> {orderDetails.billing.country}</p>
        <p><strong>Email:</strong> {orderDetails.billing.email}</p>
        <p><strong>Phone:</strong> {orderDetails.billing.phone}</p>

        <h3 className="font-semibold mt-4">Shipping Address</h3>
        <p><strong>Name:</strong> {orderDetails.billing.first_name} {orderDetails.billing.last_name}</p>
        <p><strong>company:</strong> {orderDetails.billing.company} </p>
        <p><strong>Address:</strong> {orderDetails.billing.address_1},{orderDetails.billing.address_2} ,{orderDetails.billing.city}, {orderDetails.billing.state}</p>
        <p><strong>Pin Code:</strong> {orderDetails.billing.postcode}</p>
        <p><strong>Country:</strong> {orderDetails.billing.country}</p>
        <p><strong>Email:</strong> {orderDetails.billing.email}</p>
        <p><strong>Phone:</strong> {orderDetails.billing.phone}</p>

        <h3 className="font-semibold mt-4">Payment method</h3>
        <p><strong>payment_method:</strong> {orderDetails.payment_method}</p>
        <h3 className="font-semibold mt-4">Line Items</h3>
        <ul>
          {orderDetails.line_items.map(item => (
            <li key={item.id}>
              {item.name} - <strong>Quantity:</strong> {item.quantity} - <strong>Total:</strong> {item.total} (incl. tax)
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
};

export default OrderFetcher;