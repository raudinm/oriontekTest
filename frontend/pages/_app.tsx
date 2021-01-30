import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{fetcher: (url: RequestInfo) => fetch(url).then(data => data.json())}}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
