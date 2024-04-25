import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useCart } from "./cartContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NavBar = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');





  useEffect(() => {
    axios.get("http://localhost:8080/category")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      }
      )


      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });

    // Check if the user is logged in
    const token = sessionStorage.getItem("token");
    if (token) {
      // Ideally, decode token or fetch user details securely to display
      const name = sessionStorage.getItem("firstName");
      setUser(name);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    router.push('/login'); // Redirect to login after logout
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term as the user types
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement your search logic here, possibly setting up a route to display search results

    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }

  };



  return (
    <header className="bg-white text-black">
      <div className="container ml-8 mr-16 flex justify-between items-center p-4">
        <div className="flex items-center">

          {/* Image and Title within the same flex container */}
          <div className="flex items-center mr-4">
            <img src="/ecoTrans.png" alt="Eco Friendly Shoes" className="w-10 h-10"></img> {/* Ensure you add alt text for accessibility */}
            <div className="text-2xl font-bold">
              <Link href="/productListing">
                <span className="text-green-800">Eco Friendly Shoes</span>
              </Link>
            </div>
          </div>

          <div className="ml-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                className="px-2 py-1 rounded-md border border-green-800 focus:outline-none text-black"
                style={{ width: '316px' }}
              />
              <button type="submit" className="p-2 bg-white hover:bg-gray-200 text-black rounded">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>

          </div>
        </div>

        <div className="flex items-center">
          {/* <div className="mr-4">
            <Link href="/login" className="hover:underline">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>Sign In</span>
            </Link>
          </div> */}
          {/* Conditional rendering based on login status */}
          {user ? (
            <div className="relative mr-4">
              <button className="flex items-center hover:underline" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <span>{user} <FontAwesomeIcon icon={faCaretDown} /></span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 bg-white shadow-md mt-2 py-2 w-48" onMouseLeave={closeDropdown}>
                  <Link href="/userProfile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manage Profile</Link>
                  <Link href="/orderHistory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Order History</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="mr-4">
              <Link href="/login" className="hover:underline">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <span>Sign In</span>
              </Link>
            </div>
          )}




          <div>
            <Link href="/cart">
              <span className="flex items-center hover:underline">
                <FontAwesomeIcon icon={faShoppingCart} className="text-2xl mr-2" />
                <span>Bag ({cartItemCount})</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Second Navigation Bar */}
      <nav className="bg-green-600 text-white">
        <div className="container mx-auto flex justify-center p-2">
          {loading ? (
            <div>Loading...</div>
          ) : (
            categories.map((category) => (
              <div key={category.categoryID} className="mx-4">
                <Link href={`/category/${category.categoryID}`} passHref>
                  <span className={router.pathname.includes('category') && router.query.id == category.categoryID ? 'text-green-600 bg-white px-4 py-2' : 'hover:underline'}>
                    {category.category}
                  </span>
                </Link>
              </div>
            ))
          )}
        </div>
      </nav>
    </header>
  );

};

export default NavBar;
