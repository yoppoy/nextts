import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { graphqlClient } from '../../lib/graphqlClient'
import { LaunchQuery } from '../../types/codegenTypes'
import { CACHE_REVALIDATE_INTERVAL } from '../../constants'

type LaunchPageProps = {
  data: LaunchQuery['launch']
}

const LaunchPage: NextPage<LaunchPageProps> = () => <main></main>

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.id) {
    const { launch } = await graphqlClient().Launch({ id: params.id as string })

    if (launch) {
      return {
        props: {
          data: launch,
        },
        revalidate: CACHE_REVALIDATE_INTERVAL,
      }
    }
  }
  return { props: {}, notFound: true }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { launchesPast } = await graphqlClient().Launches({ limit: 3 })

  const paths =
    launchesPast
      ?.filter((launch) => launch?.id)
      .map((launch) => ({
        params: { id: launch?.id as string },
      })) || []

  return { paths, fallback: 'blocking' }
}

export default LaunchPage
