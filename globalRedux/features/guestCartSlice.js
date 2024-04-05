// reducers/guestCartReducer.js

const initialState = [];

const guestCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_GUEST_CART':
      const existingItemIndex = state.findIndex(item => 
        item.product === action.payload.product &&
        item.size === action.payload.size &&
        item.color === action.payload.color
      );

      if (existingItemIndex !== -1) {
        // If item exists in the cart, update its quantity
        return state.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
      } else {
        // If item doesn't exist in the cart, add it
        return [...state, action.payload];
      }
    case 'REMOVE_FROM_GUEST_CART':
      return state.filter(item => item.product.id !== action.payload);
    case 'UPDATE_GUEST_CART_QUANTITY':
      return state.map(item => {
        if (item.product.id === action.payload.productId) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
    default:
      return state;
  }
};

export default guestCartReducer;
