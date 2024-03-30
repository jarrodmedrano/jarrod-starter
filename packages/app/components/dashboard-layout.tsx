import withDashboard from '../../ui/components/wrappers/with-dashboard'
import React from 'react'
import { View } from '../design/view'
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>
}

export default withDashboard(Layout)
