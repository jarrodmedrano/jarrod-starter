import { View } from '../../design/view'
import { Hero } from '@ui/components/tailwind/hero'
import { Header } from '../../components/header'
import { Footer } from '@ui/components/tailwind/footer'
import { Feature } from '@ui/components/tailwind/feature'
import { FeatureList } from '@ui/components/tailwind/featurelist'
import React from 'react'

import '@ui/styles/globals.css'
import { Logo } from '@ui/components/icons/logo'
import { navigation } from '../../utils/constants'

export function HomeScreen() {
  return (
    <View>
      <Header />
      <Hero
        title={`Your Personal Story Encyclopedia`}
        description="Craft and organize your narratives effortlessly with Story Bible, the ultimate storytelling companion."
        navigation={navigation}
        buttonLink={'/create'}
        buttonText={'Get started'}
        altButtonLink={'/features'}
        altButtonText={'Learn more'}
        heroButtonAltText={'Read more'}
        heroButtonText={'Get Started for Free'}
        heroButtonLink={'/create'}
        companyName="Story Bible"
        companyLogo={<Logo className="h-8 w-auto" />}
        companyLink={'/create'}
      />
      <FeatureList />
      <Feature />
      <Footer />
    </View>
  )
}
