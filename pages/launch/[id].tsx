import React from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { graphqlClient } from '../../lib/graphqlClient'
import { LaunchQuery } from '../../types/codegenTypes'
import { CACHE_REVALIDATE_INTERVAL } from '../../constants'
import { getYoutubeEmbedUrl } from '../../lib/youtube'

type LaunchPageProps = {
  data: LaunchQuery['launch'] & {
    embedUrl: string
  }
}

const LaunchPage: NextPage<LaunchPageProps> = ({ data }) => (
  <main>
    <h1>{data?.mission_name}</h1>
    <p>{data?.launch_date_local}</p>
    <p>{data?.rocket?.rocket_name}</p>
    <iframe title={data?.mission_name || ''} src={data.embedUrl} />
  </main>
)

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (params?.id) {
      const { launch } = await graphqlClient().Launch({ id: params.id as string })
      const embedUrl = await getYoutubeEmbedUrl(launch?.links?.video_link || '')

      if (launch) {
        return {
          props: {
            data: {
              embedUrl: embedUrl ?? '',
              ...launch,
            },
          },
          revalidate: CACHE_REVALIDATE_INTERVAL,
        }
      }
    }
  } catch (error) {
    console.error(error)
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
