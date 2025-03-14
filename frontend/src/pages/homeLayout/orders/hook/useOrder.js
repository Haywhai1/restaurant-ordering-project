import React, { useState, useEffect } from 'react';
const useOrder = () => {
     const [orders, setOrders] = useState([]);
      const [total, setTotal] = useState(0);
    
      useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await fetch('http://localhost:4000/api/v1/users/currentUser', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
              }
            });
            const data = await response.json();
            if (data.orders) {
              console.log(data.orders, "order");
              setOrders(data.orders);
              calculateTotal(data.orders);
            }
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
    
        fetchOrders();
      }, []);
    
      const calculateTotal = (orders) => {
        let subtotal = 0;
        orders.forEach(order => {
          subtotal += order.price * order.quantity;
        });
        setTotal(subtotal);
      };
    
      const handleIncreaseQuantity = (index) => {
        const updatedOrders = [...orders];
        const existingOrder = updatedOrders.find(order => order._id === updatedOrders[index]._id);
        
        if (existingOrder) {
          existingOrder.quantity += 1;
          setOrders(updatedOrders);
          calculateTotal(updatedOrders);
        }
      };
    
      const handleDecreaseQuantity = (index) => {
        const updatedOrders = [...orders];
        const existingOrder = updatedOrders.find(order => order._id === updatedOrders[index]._id);
        
        if (existingOrder && existingOrder.quantity > 1) {
          existingOrder.quantity -= 1;
          setOrders(updatedOrders);
          calculateTotal(updatedOrders);
        }
      };
    
      const handleDeleteOrder = async (orderId) => {
        try {
          const response = await fetch(`http://localhost:4000/api/v1/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
      
          if (response.ok) {
            setOrders(orders.filter(order => order._id !== orderId));
            calculateTotal(orders.filter(order => order._id !== orderId));
          } else {
            console.error('Failed to delete the order');
          }
        } catch (error) {
          console.error('Error deleting the order:', error);
        }
      };
      
    
      const handleCheckout = () => {
        alert('Proceeding to checkout!');
      };
  return {orders, total, calculateTotal, handleIncreaseQuantity, handleDecreaseQuantity, handleDeleteOrder,handleCheckout}
}

export default useOrder