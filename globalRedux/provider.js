'use client';
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { CartProvider } from "@/components/cartContext";

export function Providers({ children }){
    return(
        <Provider store={store}>
            <CartProvider>
                {children}
            </CartProvider>
        </Provider>
    )
}