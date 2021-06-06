import axios from 'axios'

const OEMBED_YOUTUBE_API = 'https://www.youtube.com/oembed'
const EMBED_URL_REGEX = /src="(.*?)"/g

export type YoutubeOEmbed = {
  html: string
}

export const getYoutubeEmbedUrl = async (url: string): Promise<string | undefined> => {
  const youtubeInfo = await axios.get<YoutubeOEmbed>(`${OEMBED_YOUTUBE_API}?url=${url}`)

  const regexResult = EMBED_URL_REGEX.exec(youtubeInfo.data.html)

  if (regexResult && regexResult[1]) {
    return regexResult[1]
  }
  return undefined
}
