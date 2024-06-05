'use client'
import React from 'react'
import { View } from '../../../design/view'
import { Footer } from '@ui/components/tailwind/footer'
import { Contact } from '@ui/components/tailwind/contact'
import { Header } from '../../../components/header'

export function ContactScreen() {
  return (
    <View>
      <Header />
      <Contact />
      <Footer />
    </View>
  )
}
