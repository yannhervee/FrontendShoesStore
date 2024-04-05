// actions/guestCartActions.js

export const addToGuestCart = (product, size, color, quantity) => ({
    type: 'ADD_TO_GUEST_CART',
    payload: { product, size, color, quantity },
  });
  
  export const removeFromGuestCart = (productId) => ({
    type: 'REMOVE_FROM_GUEST_CART',
    payload: productId,
  });
  
  export const updateGuestCartQuantity = (productId, quantity) => ({
    type: 'UPDATE_GUEST_CART_QUANTITY',
    payload: { productId, quantity },
  });
  