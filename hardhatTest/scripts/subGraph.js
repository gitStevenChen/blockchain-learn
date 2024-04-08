const { createClient, cacheExchange, fetchExchange } = require('urql');
const fetch = require("node-fetch");
// import { createClient, cacheExchange, fetchExchange } from 'urql'
// import fetch from "node-fetch"

const APIURL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
// const APIURL = 'https://gateway.thegraph.com/api/000f3c8ca9fc0469c9dcba43ae94ae97/subgraphs/id/2szAn45skWZFLPUbxFEtjiEzT1FMW8Ff5ReUPbZbQxtt'

const tokensQuery = `
  query {
    tokens(first: 1) {
      id
      symbol
      name
      decimals
    }
  }
`

const client = createClient({
  url: APIURL,
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch,
  fetchOptions: () => ({
    headers: {
      'Content-Type': 'application/json',
    },
  }),
})

const data = await client.query(tokensQuery).toPromise()
console.log(data.data)
// client.query(tokensQuery).toPromise().then(result => {
//     console.log(result); // OperationResult
// });