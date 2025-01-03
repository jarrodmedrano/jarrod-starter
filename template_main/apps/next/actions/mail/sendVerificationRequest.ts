import { MagicLinkEmail } from '../../emails/MagicLinkEmail'
import sendgrid from '@sendgrid/mail'
import { render } from '@react-email/components'
import { SendVerificationRequestParams } from 'next-auth/providers'

export async function sendVerificationRequest(
  params: SendVerificationRequestParams,
) {
  const { identifier, url } = params
  const { host } = new URL(url)
  const emailHtml = render(MagicLinkEmail({ url, host }))
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '')

  try {
    await sendgrid.send({
      from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`,
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      html: emailHtml,
    })
  } catch (error) {
    throw new Error(`Failed to send the verification Email., ${error}`)
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}
