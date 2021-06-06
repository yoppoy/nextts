import { getSdk } from '../types/codegenTypes'
import { GraphQLClient } from 'graphql-request'
import { DEFAULT_ENV_VALUES } from '../constants'

const { SPACE_API_URL = DEFAULT_ENV_VALUES.SPACE_API_URL } = process.env

let client: GraphQLClient

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const graphqlClient = () => {
  client =
    client ??
    new GraphQLClient(SPACE_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

  return getSdk(client)
}
