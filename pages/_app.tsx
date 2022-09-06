import * as React from "react"
import { Provider } from "overmind-react"
import { overmind } from "data/overmind"
import Head from "next/head"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  // uri: "https://cors-anywhere.herokuapp.com/https://wpe-hiring.tokopedia.net/postgres/v1/graphql",
  // uri: "https://cors-anywhere.herokuapp.com/https://web-tools.tokopedia.com/postgres/v1/graphql",
  // uri: "https://api.spacex.land/graphql/",
  // uri: "https://web-tools.tokopedia.com/postgres/v1/graphql",
  uri: "https://wpe-hiring.tokopedia.net/postgres/v1/graphql",

  cache: new InMemoryCache(),
})

import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/globals.css"

type appProps = {
  Component: any
  pageProps: any
}

const App = ({ Component, pageProps }: appProps) => {
  return (
    <Provider value={overmind}>
      <ApolloProvider client={client}>
        <Head>
          <title>Phone Book Assignment</title>
        </Head>
        <Component {...pageProps}></Component>
      </ApolloProvider>
    </Provider>
  )
}

export default App
