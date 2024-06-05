import { getUser } from '@database/dist'
import pool from '../../../utils/open-pool'
export async function GET(
  _request: Request,
  { params }: { params: { slug: number } },
) {
  const { slug } = params
  const client = await pool.connect()

  const userRequest = await getUser(client, {
    id: slug,
  })

  return new Response(JSON.stringify(userRequest), { status: 200 })
}
