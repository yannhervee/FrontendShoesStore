import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { Providers } from "@/globalRedux/provider";

export default function App({ Component, pageProps }) {
  return (
  <div>
    <Providers>

    
    <NavBar/>
  
  <Component {...pageProps} />
  </Providers>
  </div>
  )
}
