import { useCreateMenu } from "./Hook/useCreateMenu";

const MenuForm = ({title, menu}) => {
  const { formData, categories, handleChange, handleSubmit, isLoading, error } =
    useCreateMenu({menu});

  return (
    <div className="flex justify-center items-center bg-gray-100 p-8 min-h-screen">
      {/* Form Wrapper with responsive max-width */}
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {title ?? 'Create Menu Item'}
        </h2>

        {/* Error Message Display */}
        {error && (
          <div className="text-red-500 text-sm mb-4 p-2 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Dish Name */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Dish Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL */}
          <div className="mb-4 flex flex-col">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Availability */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="mr-2"
            />
            <label
              htmlFor="isAvailable"
              className="text-sm text-gray-700"
            >
              Available
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
            >
              {isLoading 
                ? (menu ? "Updating..." : "Creating...") 
                : (menu ? "Update Menu Item" : "Create Menu Item")}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
