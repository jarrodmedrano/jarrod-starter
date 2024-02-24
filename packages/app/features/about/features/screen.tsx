'use client'
import React from 'react'
import { View } from '../../../design/view'
import { Footer } from '@ui/components/tailwind/footer'
import { Features } from '@ui/components/pages/features'
import { Header } from '../../../components/header'

export function FeaturesScreen() {
  return (
    <View>
      <Header />
      <Features />
      <Footer />
    </View>
  )
}
