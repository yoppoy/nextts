import axios, { AxiosResponse } from 'axios'
import { getYoutubeEmbedUrl, YoutubeOEmbed } from '../youtube'

const MOCKED_YOUTUBE_RESPONSE = {
  html:
    '<iframe width="200" height="113" src="https://www.youtube.com/embed/ersITE-HiLI?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
}

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('/lib/youtube', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should extract the embed url from the api', async () => {
    const mockedResponse: Partial<AxiosResponse<YoutubeOEmbed>> = {
      data: MOCKED_YOUTUBE_RESPONSE,
    }
    mockedAxios.get.mockResolvedValue(mockedResponse)

    const result = await getYoutubeEmbedUrl('mocked-url')
    expect(result).toBe('https://www.youtube.com/embed/ersITE-HiLI?feature=oembed')
  })

  it("should return undefined if the regex doesn't find a result", async () => {
    const mockedResponse: Partial<AxiosResponse> = {
      data: { html: '' },
    }
    mockedAxios.get.mockResolvedValue(mockedResponse)

    const result = await getYoutubeEmbedUrl('mocked-url')
    expect(result).toBe(undefined)
  })
})
