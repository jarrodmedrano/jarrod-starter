import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Button } from '../ui/button'

const SearchBarDatepickerHeroSection = function () {
  return (
    <section>
      <div className="z-1 relative mx-auto max-w-screen-xl px-4 py-8 text-white lg:py-16 xl:px-0">
        <div className="mb-6 max-w-screen-md lg:mb-0">
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Find your inspiration
          </h1>
          <p className="mb-6 text-gray-300 md:text-lg lg:mb-8 lg:text-xl">
            Peruse through our collection of public Story Bibles. Each guest
            account is allowed one public story. Subscribe to unlock private
            stories and other features.
          </p>
          <a
            href="/signin"
            className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-900 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-5 py-3 text-center font-medium text-white focus:outline-none focus:ring-4"
          >
            Sign In / Register
          </a>
        </div>
        <form
          action="#"
          className="mt-8 grid w-full gap-y-4 rounded bg-white p-4 dark:bg-gray-800 lg:mt-12 lg:grid-cols-9 lg:gap-x-4"
        >
          <div className="lg:col-span-3">
            <Label htmlFor="location-form" className="sr-only">
              Location
            </Label>
            <Input id="location-form" placeholder="Search stories" />
          </div>
          <div className="lg:col-span-1">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter</SelectLabel>
                  <SelectItem value="science-fiction">SciFi</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="lg:col-span-2">
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </Button>
        </form>
      </div>
    </section>
  )
}

export default SearchBarDatepickerHeroSection
