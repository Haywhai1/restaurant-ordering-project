import React, { useState, useEffect } from 'react';
import { apiClient } from '../../../../shared/hooks/client';
const useOrder = () => {
      const [orders, setOrders] = useState([]);
      const [total, setTotal] = useState(0);
      const [isLoading, setIsLoading] = useState();
      
    
      useEffect(() => {
        const fetchOrders = async () => {
          try {
            setIsLoading(true);
            const response = await apiClient.get("/users/currentUser");
            const data = response.data;

            if (data.orders) {
              setOrders(data.orders);
              calculateTotal(data.orders);
            }

          } catch (error) {
            console.error('Error fetching orders:', error);
          }finally{
            setIsLoading(false);
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
          const response = await apiClient.delete(`/orders/${orderId}`);
         
          if (response.status >= 200 && response.status < 300) {
            const updatedOrders = orders.filter(order => order._id !== orderId);
            setOrders(updatedOrders);
            calculateTotal(updatedOrders);
          } else {
            console.error('Failed to delete the order, response status:', response.status);
          }
        } catch (error) {
          console.error('Error deleting the order:', error);
        }
      };
      
    
      const handleCheckout = () => {
        alert('Proceeding to checkout!');
      };
  return {orders, total, isLoading, calculateTotal, handleIncreaseQuantity, handleDecreaseQuantity, handleDeleteOrder,handleCheckout}
}

export default useOrder