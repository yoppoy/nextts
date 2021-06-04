import { getSdk } from '../types/codegenTypes'
import { GraphQLClient } from 'graphql-request'

const spaceXApiUrl = (process.env.SPACE_API_URL as unknown) as string

let client: GraphQLClient

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const graphqlClient = () => {
  client =
    client ??
    new GraphQLClient(spaceXApiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${spaceXApiUrl}`,
      },
    })

  return getSdk(client)
}
