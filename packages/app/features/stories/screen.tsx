'use client'

import { View } from '../../design/view'
import React from 'react'

import '@ui/styles/globals.css'
import { Footer } from '@ui/components/tailwind/footer'
import GalleryPage from '@ui/components/pages/stories'
import { Header } from '../../components/header'

export function StoriesScreen() {
  return (
    <View>
      <Header />
      <GalleryPage />
      <Footer />
    </View>
  )
}
