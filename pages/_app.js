import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { Providers } from "@/globalRedux/provider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
