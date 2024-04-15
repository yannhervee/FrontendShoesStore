import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
export default function AdminEditProductPage() {
    // States for product details
    const [productName, setProductName] = useState('Pearl Pumps');
    const [productPrice, setProductPrice] = useState(89);
    const [productCategory, setProductCategory] = useState('Heels');
    const [productDescription, setProductDescription] = useState('Elegant and comfortable pumps perfect for any occasion.');
    // const availableSizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
    // const availableColors = ['Red', 'Blue', 'Yellow', 'Green'];
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);
    const [product, setProduct] = useState({});
    const id = 102;


    // State for size and color management
    // const [sizeColorCombos, setSizeColorCombos] = useState([
    //     { size: 6, colors: [{ id: 1, color: 'Red', quantity: 5 }, { id: 2, color: 'Blue', quantity: 3 }] },
    //     { size: 7, colors: [{ id: 3, color: 'Yellow', quantity: 4 }] },
    //     // ... more size/color combinations
    // ]);
    const [sizeColorCombos, setSizeColorCombos] = useState([]);
    // State for new size/color
    const [newSize, setNewSize] = useState('');
    const [newColor, setNewColor] = useState('');
    const [newQuantity, setNewQuantity] = useState(0);
    const [loading, setLoading] = useState(true);

    // State for images
    const [productImages, setProductImages] = useState([
        { id: 152, url: 'path_to_image_1.png' },
        { id: 153, url: 'path_to_image_2.png' },
        // ... more images
    ]);

    // Handlers to update state...

    useEffect(() => {
        // Fetch sizes
        fetch('http://localhost:8080/sizes')
            .then(response => response.json())
            .then(data => {
                console.log("data for sizes", data);
                setAvailableSizes(data)
            })
            .catch(error => console.error('Failed to load sizes:', error));

        // Fetch colors
        fetch('http://localhost:8080/colors')
            .then(response => response.json())
            .then(data => {
                console.log("data for colors", data);
                setAvailableColors(data)
            })
            .catch(error => console.error('Failed to load colors:', error));

        // Fetch product details
        fetch(`http://localhost:8080/product/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("data for product", data)
                setProduct(data.product);
                setSizeColorCombos(data.sizeColorDTO); // Assuming this format based on your initial data structure
            })
            .catch(error => console.error('Failed to load product details:', error));
            setLoading(false);
    }, [id]);

    // Function to add a new size/color combination
    const handleAddSizeColorCombo = () => {
        // Convert newColor to a standardized format for comparison
        const standardizedNewColor = newColor.trim().toLowerCase();
    
        // Validation to ensure newSize, standardizedNewColor, and positive quantity are set
        if (!newSize || !standardizedNewColor || newQuantity <= 0) {
            console.error('Invalid input: Ensure size and color are selected, and quantity is a positive number.');
            return; // Early return to prevent adding/updating with invalid data
        }
    
        let isNewSizeColorComboAdded = false;
    
        // Try to find and update an existing combination
        const updatedSizeColorCombos = sizeColorCombos.map((combo) => {
            if (combo.size.size.toString() === newSize.toString()) { // Make sure to compare sizes correctly, considering they are objects and might be strings or numbers
                const colorIndex = combo.color.findIndex(c => c.color.color.trim().toLowerCase() === standardizedNewColor);
                if (colorIndex !== -1) {
                    // Update quantity if the exact size and color combination is found
                    combo.color[colorIndex].quantity = newQuantity;
                    isNewSizeColorComboAdded = true;
                } else {
                    // Add new color to the existing size
                    const newColorId = Math.max(...combo.color.map(c => c.color.id), 0) + 1;
                    combo.color.push({
                        color: { id: newColorId, color: standardizedNewColor },
                        quantity: newQuantity
                    });
                    isNewSizeColorComboAdded = true;
                }
            }
            return combo;
        });
    
        // If the size-color combination is new, add it
        if (!isNewSizeColorComboAdded) {
            const newComboId = sizeColorCombos.length > 0 ? Math.max(...sizeColorCombos.flatMap(c => c.color.map(col => col.color.id))) + 1 : 1;
            updatedSizeColorCombos.push({
                size: { size: parseFloat(newSize), id: newComboId }, // Assuming you might need to generate an ID for the new size
                color: [{ color: { id: newComboId, color: standardizedNewColor }, quantity: newQuantity }]
            });
        }
    
        setSizeColorCombos(updatedSizeColorCombos);
        // Reset the input fields
        setNewSize('');
        setNewColor('');
        setNewQuantity(0);
    };
    

    const handleSaveChanges = () => {
        // Logic to save changes to the backend
    };

    const handleRemoveSizeColorCombo = (sizeIndex, colorIndex) => {
        const updatedSizeColorCombos = [...sizeColorCombos];
        // Correctly access the 'color' array to perform the splice operation
        updatedSizeColorCombos[sizeIndex].color.splice(colorIndex, 1);
    
        // Check if there are no more colors left for this size
        if (updatedSizeColorCombos[sizeIndex].color.length === 0) {
            // Remove the entire size entry if no colors are left
            updatedSizeColorCombos.splice(sizeIndex, 1);
        }
    
        // Update the state with the new array
        setSizeColorCombos(updatedSizeColorCombos);
    };

    


    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>

            {/* Product Information Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Product Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="productName"
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                        Price ($)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="productPrice"
                        type="number"
                        placeholder="Price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCategory">
                        Category
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="productCategory"
                        type="text"
                        placeholder="Category"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="productDescription"
                        placeholder="Description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </div>
            </div>

            {/* Size and Color Management Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Size & Color Stock</h2>
                {sizeColorCombos.map((sizeCombo, sizeIndex) => (
                    <div key={sizeIndex} className="mb-4">
                        <h3 className="font-semibold">Size: {sizeCombo.size.size}</h3>
                        {sizeCombo.color.map((colorCombo, colorIndex) => (
                            <div key={colorIndex} className="flex items-center mb-2">
                                <p className="w-20 mr-4">{colorCombo.color.color}</p>
                                <input
                                    type="number"
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mr-4"
                                    value={colorCombo.quantity}
                                    onChange={(e) => handleStockChange(sizeIndex, colorIndex, parseInt(e.target.value))}
                                />
                                <button
                                    onClick={() => handleRemoveSizeColorCombo(sizeIndex, colorIndex)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                ))}

            </div>

            {/* Add New Size/Color Combination Section */}
            {/* Add New Size/Color Combination Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Add New Size/Color</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <div>
                        <label htmlFor="newSize" className="block text-sm font-medium text-gray-700">Size</label>
                        <select
                            id="newSize"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={newSize}
                            onChange={(e) => setNewSize(e.target.value)}
                        >
                            <option value="">Select size</option>
                            {availableSizes.map((size) => (
                                <option key={size.id} value={size.size}>{size.size}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="newColor" className="block text-sm font-medium text-gray-700">Color</label>
                        <select
                            id="newColor"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                        >
                            <option value="">Select color</option>
                            {availableColors.map((color) => (
                                <option key={color.id} value={color.color}>{color.color}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="newQuantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input
                            type="number"
                            id="newQuantity"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                            min="0"
                        />
                    </div>
                    <button
                        onClick={handleAddSizeColorCombo}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Save/Submit Button */}
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveChanges}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
