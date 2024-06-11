'use client'
import { View } from '../../../design/view'
import { Footer } from '@ui/components/tailwind/footer'
import { Pricing } from '@ui/components/tailwind/pricing'
import { Header } from '../../../components/header'

export function PricingScreen() {
  return (
    <View>
      <Header />
      <Pricing />
      <Footer />
    </View>
  )
}
