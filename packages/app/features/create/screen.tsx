'use client'

import { ScreenProps } from '../../common/interfaces'
import DashboardLayout from '../../components/dashboard-layout'
import React from 'react'

const CreateScreen = function (props: ScreenProps) {
  // eslint-disable-next-line no-console
  console.log('create screen the props', props)
  return (
    <DashboardLayout {...props}>
      <div>here boy</div>
    </DashboardLayout>
  )
}

export default CreateScreen
