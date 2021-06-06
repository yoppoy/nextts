/**
 * @jest-environment jsdom
 */

import { getPage } from 'next-page-tester'
import { screen } from '@testing-library/react'

describe('/pages/index', () => {
  it('renders the initial page with the last 3 launches', async () => {
    const { render } = await getPage({
      route: '/',
    })

    render()

    const launchListDiv = await screen.getByTestId('launch-list')

    expect(launchListDiv.querySelectorAll(':scope > li').length).toBe(3)
  })
})
