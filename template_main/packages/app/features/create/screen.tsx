'use client'

import { useAuthType } from '@ui/components/ui/hooks/useAuthType'
import { ScreenProps } from '../../common/interfaces'
import DashboardLayout from '../../components/dashboard-layout'
import React, { useEffect } from 'react'

interface CreateScreenProps extends ScreenProps {
  listEntitiesForUser: any
}

const CreateScreen = function (props: CreateScreenProps) {
  const { listEntitiesForUser } = props
  const { user } = useAuthType(process.env.AUTH_TYPE || 'clerk')
  const [userData, setUserData] = React.useState(null)

  useEffect(() => {
    if (user) {
      setUserData(
        listEntitiesForUser({
          userid: user?.id,
          limit: '10',
          offset: '0',
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const newProps = {
    ...props,
    data: userData,
  }

  return (
    <DashboardLayout {...newProps}>
      <main className="py-10">
        <div className="px-4 sm:px-6 lg:px-8">Test</div>
      </main>
    </DashboardLayout>
  )
}

export default CreateScreen
