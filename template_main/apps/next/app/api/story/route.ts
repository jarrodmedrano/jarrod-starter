import { createStory } from '@repo/database'
import pool from '../../utils/open-pool'

export async function POST(request: Request) {
  const body = await request.json()
  const client = await pool.connect()

  const storyRequest = await createStory(client, {
    ...body,
  })

  return new Response(JSON.stringify(storyRequest), { status: 200 })
}
