import { GetStaticProps, NextPage } from 'next'
import { graphqlClient } from '../lib/graphqlClient'
import { LaunchesQuery } from '../types/codegenTypes'
import { CACHE_REVALIDATE_INTERVAL } from '../constants'

const IndexPage: NextPage<LaunchesQuery['launchesPast']> = () => (
  <main>
    <h1>Last 3 SpaceX launches:</h1>
    <p>here the list of the last 3 launches with link to a detail page please :)</p>
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
