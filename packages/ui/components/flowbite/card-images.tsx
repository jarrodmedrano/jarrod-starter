const ContentCardImagesSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="text-center text-gray-900">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-5xl">
            Turn collaboration into innovation
          </h2>
          <a
            href="#"
            className="text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700 inline-flex items-center text-lg font-medium"
          >
            Learn more about inner source
            <svg
              className="ml-1 h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14 lg:gap-12">
          <div className="mb-2 flex md:mb-0 md:flex-col">
            <img
              alt=""
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-1.png"
              className="mr-4 h-36 w-auto rounded-lg md:h-auto md:w-full"
            />
            <div>
              <h3 className="mb-2.5 text-xl font-bold text-gray-900 dark:text-white md:mt-4">
                Build as one team
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Work seamlessly across your organization on a platform designed
                for collaboration.
              </p>
            </div>
          </div>
          <div className="mb-2 flex md:mb-0 md:flex-col">
            <img
              alt=""
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-2.png"
              className="mr-4 h-36 w-auto rounded-lg md:h-auto md:w-full"
            />
            <div>
              <h3 className="mb-2.5 text-xl font-bold text-gray-900 dark:text-white md:mt-4">
                Transform your culture
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Embrace innersource, iterate faster, and ship more frequently
                using best tools from open source teams.
              </p>
            </div>
          </div>
          <div className="flex md:flex-col">
            <img
              alt=""
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-content-3.png"
              className="mr-4 h-36 w-auto rounded-lg md:h-auto md:w-full"
            />
            <div>
              <h3 className="mb-2.5 text-xl font-bold text-gray-900 dark:text-white md:mt-4">
                Learn as you build
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get insight into how your team builds today with
                community-backed KPIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContentCardImagesSection
