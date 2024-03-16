import { MagicLinkEmail } from '../../emails/MagicLinkEmail'
import sendgrid from '@sendgrid/mail'
import { render } from '@react-email/components'
import { generateVerificationToken } from '../user/generateVerificationToken'
export async function sendVerificationToken(params: {
  identifier: string
  url: string
}) {
  const { identifier, url } = params
  const { host } = new URL(url)
  // eslint-disable-next-line no-console
  console.log('host', host)
  const emailHtml = render(MagicLinkEmail({ url, host }))
  // eslint-disable-next-line no-console
  console.log('email', emailHtml)
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '')

  const token = await generateVerificationToken(identifier)

  try {
    const result = await sendgrid.send({
      from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`,
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({
        url: `${url}/verifytoken?token=${token}`,
        host,
      }),
      html: emailHtml,
    })
    // eslint-disable-next-line no-console
    console.log('result', result)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('url', url)
    throw new Error(`Failed to send the verification Email., ${error}`)
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}
