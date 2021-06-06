/**
 * @jest-environment jsdom
 */

import { getPage } from 'next-page-tester'
import { screen } from '@testing-library/react'

const TEST_LAUNCH_ID = '109'

describe('/pages/launch/[id]', () => {
  it('renders the page with the launch data', async () => {
    const { render } = await getPage({
      route: `/launch/${TEST_LAUNCH_ID}`,
    })

    render()

    expect(screen.getByText('Starlink-15 (v1.0)')).toBeInTheDocument()
    expect(screen.getByText('2020-10-24T11:31:00-04:00')).toBeInTheDocument()
    expect(screen.getByText('Falcon 9')).toBeInTheDocument()
  })
})
