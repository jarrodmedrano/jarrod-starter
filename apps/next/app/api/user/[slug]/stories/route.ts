import { listStoriesForUser } from 'database'
import pool from '../../../../utils/pools-open'
export async function GET(
  _request: Request,
  { params }: { params: { slug: number } },
) {
  const { slug } = params
  const client = await pool.connect()

  const userRequest = await listStoriesForUser(client, {
    userid: slug,
    limit: '10',
    offset: '0',
  })

  return new Response(JSON.stringify(userRequest), { status: 200 })
}
