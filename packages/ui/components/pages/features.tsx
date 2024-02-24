import ContentCardImagesSection from '../flowbite/card-images'

export const Features = ({ ...props }) => {
  // eslint-disable-next-line no-console
  console.log('props', props)
  return (
    <div className="bg-gray-900">
      <main>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-32 lg:px-8">
          <ContentCardImagesSection />
        </div>
      </main>
    </div>
  )
}
