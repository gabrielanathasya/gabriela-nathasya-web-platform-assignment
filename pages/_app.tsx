import * as React from "react"
import { Provider } from "overmind-react"
import { overmind } from "data/overmind"
import Head from "next/head"

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const uri = "https://wpe-hiring.tokopedia.net/graphql"

const client = new ApolloClient({
  uri,
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
