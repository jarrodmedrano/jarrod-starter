import React from 'react'
import MasonryGrid from '../flowbite/masonry' // Adjust the import path as necessary
import SearchBarDatepickerHeroSection from '../flowbite/search-hero'

const generateRandomImageUrls = (count = 0, width = 400, height = 600) => {
  const urls = []
  for (let i = 0; i < count; i++) {
    // Generate a random image URL
    const url = `https://picsum.photos/seed/${Math.random()}/${width}/${height}`
    urls.push(url)
  }
  return urls
}

// Example: Generate 10 random image URLs

const GalleryPage = () => {
  const randomImageUrls = generateRandomImageUrls(100)

  return (
    <div className="bg-gray-900">
      <main>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-32 lg:px-8">
          <SearchBarDatepickerHeroSection />
          <MasonryGrid images={randomImageUrls} />
        </div>
      </main>
    </div>
  )
}

export default GalleryPage
