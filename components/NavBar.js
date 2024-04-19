import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useCart } from "./cartContext"; // Adjust the path as necessary

const NavBar = () => {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;

  return (
    <header className="bg-white text-black">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold">
            <Link href="/">
              <span className="text-green-800">Eco Friendly Shoes</span>
            </Link>
          </div>
          <div className="ml-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 rounded-md border border-green-800 focus:outline-none text-black"
              style={{ width: '316px' }}
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-4">
            <Link href="/login" className="hover:underline">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
                <span>
                Sign In
              </span>
            </Link>
          </div>

          <div>
            <Link href="/notificationview">
              <span className="flex items-center hover:underline">
                <FontAwesomeIcon icon={faShoppingCart} className="text-2xl mr-2" />
                <span>Bag ({cartItemCount})</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
