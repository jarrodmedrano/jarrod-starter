'use server'
import {
  ListCharactersForUserRow,
  ListLocationsForUserRow,
  ListStoriesForUserArgs,
  ListStoriesForUserRow,
  ListTimelinesForUserRow,
} from '@database'
import pool from '../../app/utils/open-pool'
import getCharacters from '../character/getCharacters'
import getTimelines from '../timeline/getTimelines'
import getLocations from '../location/getLocations'
import getStories from '../story/getStories'

interface ListEntitiesForUserRow {
  stories: ListStoriesForUserRow[] | null
  characters: ListCharactersForUserRow[] | null
  timelines: ListTimelinesForUserRow[] | null
  locations: ListLocationsForUserRow[] | null
}

export default async function listEntitiesForUser(
  args: ListStoriesForUserArgs,
): Promise<ListEntitiesForUserRow | null> {
  try {
    const client = await pool.connect()
    try {
      const stories = await getStories(args)
      const characters = await getCharacters(args)
      const timelines = await getTimelines(args)
      const locations = await getLocations(args)

      return {
        stories,
        characters,
        timelines,
        locations,
      }
    } finally {
      client.release()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user:', error)
    return null
  }
}
