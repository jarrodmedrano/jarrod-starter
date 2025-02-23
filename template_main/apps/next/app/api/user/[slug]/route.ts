import { getUser } from '@repo/database'
import pool from '../../../utils/open-pool'
export async function GET(_request: Request, props: { params: Promise<{ slug: number }> }) {
  const params = await props.params;
  const { slug } = params
  const client = await pool.connect()

  const userRequest = await getUser(client, {
    id: slug,
  })

  return new Response(JSON.stringify(userRequest), { status: 200 })
}
