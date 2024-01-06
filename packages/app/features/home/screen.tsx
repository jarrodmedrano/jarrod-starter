import { View } from '../../design/view'
import { Hero } from '@ui/components/tailwind/hero'
import { Footer } from '@ui/components/tailwind/footer'
import { Feature } from '@ui/components/tailwind/feature'
import { FeatureList } from '@ui/components/tailwind/featurelist'

import '@ui/styles/globals.css'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export function HomeScreen() {
  return (
    <View>
      <Hero
        title="Data to enrich your online business"
        description="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
        lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
        fugiat aliqua."
        navigation={navigation}
        buttonLink={'#'}
        buttonText={'Get started'}
        altButtonLink={'#'}
        altButtonText={'Learn more'}
        heroButtonAltText={'Read more'}
        heroButtonText={'Announcing our next round of funding. '}
        heroButtonLink={'#'}
        companyName="Tailwind"
        companyLogo={
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=500"
            alt=""
          />
        }
        companyLink={'#'}
      />
      <FeatureList />
      <Feature />
      <Footer />
    </View>
  )
}
