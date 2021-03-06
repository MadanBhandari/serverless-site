import React from 'react'

import Prefooter from 'src/components/Prefooter'

const sentences = [
  'Dig deeper into Event Gateway use cases, or check out the examples in our open source repo.',
]

const actions = [
  {
    name: 'getting started',
    navProps: {
      to: '/framework/docs/getting-started/',
      completed: true,
    },
  },
  {
    name: 'learn more',
    navProps: {
      to: '/learn/overview',
      completed: true,
    },
  },
  {
    name: 'examples',
    navProps: {
      to: '/framework/docs/providers/aws/examples/',
      completed: true,
    },
  },
]

const EventGatewayPrefooter = () => (
  <Prefooter
    heading='Ready to get started?'
    sentences={sentences}
    actions={actions}
  />
)

export default EventGatewayPrefooter