'use client'

import { ScreenProps } from '../../common/interfaces'
import DashboardLayout from '../../components/dashboard-layout'
import React from 'react'

const CreateScreen = function (props: ScreenProps) {
  // eslint-disable-next-line no-console
  console.log('create screen the props', props)
  return (
    <DashboardLayout {...props}>
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">Test</div>
      </main>
    </DashboardLayout>
  )
}

export default CreateScreen
