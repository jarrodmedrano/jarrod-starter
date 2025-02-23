'use client'

import { View } from '../../design/view'
import React from 'react'

import '@repo/ui/styles/globals.css'
import { Footer } from '@repo/ui/components/tailwind/footer'
import GalleryPage from '@repo/ui/components/pages/stories'
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
