import withDashboard from '../../ui/components/dashboard/with-dashboard'
import { View } from '../design/view'

import React, { ReactNode } from 'react'
const Layout = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line no-console
  // console.log('layout props', props)
  return <View>{children}</View>
}

export default withDashboard(Layout)
