import { getStory } from '@database'
import pool from '../../../utils/open-pool'
export async function GET(
  _request: Request,
  { params }: { params: { slug: number } },
) {
  const { slug } = params
  const client = await pool.connect()

  const userRequest = await getStory(client, {
    id: slug,
  })

  return new Response(JSON.stringify(userRequest), { status: 200 })
}
