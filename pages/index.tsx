import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { graphqlClient } from '../lib/graphqlClient'
import { LaunchesQuery } from '../types/codegenTypes'
import { CACHE_REVALIDATE_INTERVAL } from '../constants'

type IndexPageProps = {
  data: LaunchesQuery['launchesPast']
}

const IndexPage: NextPage<IndexPageProps> = ({ data }) => (
  <main>
    <h1>Last 3 SpaceX launches:</h1>
    <p>here the list of the last 3 launches with link to a detail page please :)</p>
    <ul data-testid="launch-list">
      {data?.map((launch) => (
        <li key={launch?.id}>
          <a key={launch?.id} href={`/launch/${launch?.id}`}>
            {launch?.mission_name}
          </a>
        </li>
      ))}
    </ul>
  </main>
)

export const getStaticProps: GetStaticProps = async () => {
  const { launchesPast } = await graphqlClient().Launches({ limit: 3 })

  return {
    props: {
      data: launchesPast,
    },
    revalidate: CACHE_REVALIDATE_INTERVAL,
  }
}

export default IndexPage
