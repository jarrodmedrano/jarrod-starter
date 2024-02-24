import Image from 'next/image'

const MasonryGrid = ({ images }: { images: string[] }) => {
  return (
    <div className="parallax grid grid-cols-4 gap-4 md:grid-cols-8">
      {images.map((src, index) => (
        <div className="parallax-container" key={src + index}>
          <Image
            className="parallax-img h-auto max-w-full origin-bottom rounded-lg object-cover"
            src={src}
            alt=""
            width="400"
            height="600"
            layout="responsive" // Ensure the image scales correctly
          />
        </div>
      ))}
    </div>
  )
}

export default MasonryGrid
