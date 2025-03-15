import useOrder from './hook/useOrder';

const Orders = () => {
  const {orders, total, isLoading, handleIncreaseQuantity, handleDecreaseQuantity, handleDeleteOrder,handleCheckout} = useOrder();

  if (isLoading) {
    return (
      <div className="flex items-center text-black justify-center min-h-screen font-bold text-xl">
        Loading...
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto mt-4 p-6 bg-white rounded-lg shadow-lg space-y-8">
      <h1 className="text-3xl font-semibold text-center text-blue-800">Your Orders</h1>

      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div className="flex justify-between items-center p-4 border-t border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" key={order._id}>
              {/* Left Side: Order Details */}
              <div className="flex flex-col space-y-2 w-2/3">
                <h3 className="text-xl font-medium text-gray-800">{order.name}</h3>
                <p className="text-gray-600">Price: <span className="font-semibold">#{order.price}</span></p>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDecreaseQuantity(index)}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{order.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(index)}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full"
                  >
                    +
                  </button>
                </div>
                <p className="text-gray-600">Subtotal: <span className="font-semibold">#{(order.price * order.quantity).toFixed(2)}</span></p>
              </div>

              {/* Right Side: Menu Image */}
              <div className="w-1/3">
                <img 
                  src={order.image} 
                  alt={order.name} 
                  className="object-cover w-full h-32 rounded-lg" 
                />
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteOrder(order._id)}
                className="text-red-500 ml-8 hover:text-red-600"
                >
                <i className="fas fa-trash-alt text-2xl"></i>
              </button>

            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800">Total: <span className="font-bold">#{total.toFixed(2)}</span></h3>
        <button
          onClick={handleCheckout}
          className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Orders;
