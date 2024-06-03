import withDashboard from '../../ui/components/dashboard/with-dashboard'
import { ScreenProps } from '../common/interfaces'
import { View } from '../design/view'

import React, { ReactNode } from 'react'
const DashboardLayout = ({
  children,
  ...props
}: {
  children: ReactNode
  props: ScreenProps
}) => {
  // eslint-disable-next-line no-console
  // console.log('layout props', props)
  return <View {...props}>{children}</View>
}

export default withDashboard(DashboardLayout)
