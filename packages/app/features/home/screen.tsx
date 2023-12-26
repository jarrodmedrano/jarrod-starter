import { View } from '../../design/view'
import { Hero } from '@ui/components/tailwind/hero'
import { Footer } from '@ui/components/tailwind/footer'
import { Feature } from '@ui/components/tailwind/feature'
import { FeatureList } from '@ui/components/tailwind/featurelist'

export function HomeScreen() {
  return (
    <View>
      <Hero />
      <FeatureList />
      <Feature />
      <Footer />
    </View>
  )
}
