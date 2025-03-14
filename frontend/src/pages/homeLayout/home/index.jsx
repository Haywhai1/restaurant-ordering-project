import { Link } from "react-router-dom";
import useHome from "./hook/usehome";


const Home = () => {
  const {isLoading, user, menus, handleOrder, selectedCategory, setSearchQuery, setSelectedCategory, searchQuery, animationKey} = useHome();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen font-bold text-xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Please login to access Home page
        </h1>
      </div>
    );
  }

 
  return (
    <div className="bg-gray-100 h-screen overflow-y-auto pb-4">
      {/* Scrolling Images Section */}
      <section className="scrolling-images">
      <div className="image-container">
        <img src="/images/image.png" alt="Image 1" />
        <img src="/images/img2.jpg" alt="Image 2" />
        <img src="/images/img3.jpg" alt="Image 3" />
        <img src="/images/img4.jpg" alt="Image 4" />
        <img src="/images/img1.jpg" alt="Image 5" />
        <img src="/images/img5.jpg" alt="Image 6" />
        <img src="/images/img6.jpg" alt="Image 7" />
        <img src="/images/img7.jpg" alt="Image 8" />
      </div>
    </section>

      {/* Welcome message with waving emoji */}
      {user && (
        <div className="absolute top-1 right-4 flex items-center space-x-2">
          <p className="text-xl text-blue-600">
            Welcome, 
            <span className="font-semibold">{user.username} <span className="animate-waving-text">👋</span></span>
          </p>
        </div>
      )}

      {/* Category Buttons */}
      <div className="flex justify-center mb-4 mt-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`mx-2 p-2 font-bold rounded-lg transition-all transform hover:scale-110 hover:shadow-2xl ${
            selectedCategory === "all" ? "bg-red-500 text-white" : "bg-white text-black"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory("Main Course")}
          className={`mx-2 p-2 font-bold rounded-lg transition-all transform hover:scale-110 hover:shadow-2xl ${
            selectedCategory === "Main Course" ? "bg-red-500 text-white" : "bg-white text-black"
          }`}
        >
          Main Courses
        </button>
        <button
          onClick={() => setSelectedCategory("Dessert")}
          className={`mx-2 p-2 font-bold rounded-lg transition-all transform hover:scale-110 hover:shadow-2xl ${
            selectedCategory === "Dessert" ? "bg-red-500 text-white" : "bg-white text-black"
          }`}
        >
          Desserts
        </button>
        <button
          onClick={() => setSelectedCategory("Beverage")}
          className={`mx-2 p-2 font-bold rounded-lg transition-all transform hover:scale-110 hover:shadow-2xl ${
            selectedCategory === "Beverage" ? "bg-red-500 text-white" : "bg-white text-black"
          }`}
        >
          Beverages
        </button>
        
      </div>

      {/* Search Bar */}
      <div className="flex justify-end mb-4 pr-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-2/4 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-500 ease-in-out transform hover:scale-105"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Menu Content */}
      <div className="flex flex-col items-center min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center text-grey-700 mb-6">
          Available Menu
        </h1>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto transition-all duration-500"
          key={animationKey}
        >
          {menus.length === 0 ? (
            <div className="col-span-full text-center text-xl text-gray-500">
              No items found for the selected category or search.
            </div>
          ) : (
            menus.map((menu, index) => (
              <div
                key={menu._id}
                className="p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <Link to={`/home/menu/${menu._id}`}>
                    <img
                      src={menu.image || "https://via.placeholder.com/150"}
                      alt={menu.name}
                      className="w-32 h-32 object-cover rounded-lg mb-4"
                    />
                  </Link>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {menu.name}
                  </h3>
                  <p className="text-gray-600">Price: #{menu.price}</p>
                  {user?.role === "user" && (
                    <button
                    onClick={() => handleOrder(menu._id)}
                      className="mt-4 px-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-500 transform hover:scale-110"
                    >
                      Order Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
