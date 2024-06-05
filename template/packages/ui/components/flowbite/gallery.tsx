import React from 'react'
import MasonryGrid from './masonry' // Adjust the import path as necessary

const images = [
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
  'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg',
  // Add all your image URLs here
]

const GalleryPage = () => {
  return <MasonryGrid images={images} />
}

export default GalleryPage
