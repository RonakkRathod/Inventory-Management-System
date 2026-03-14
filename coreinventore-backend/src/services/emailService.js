const { Resend } = require('resend')

const RESEND_TEST_MODE_ERROR_TEXT = 'You can only send testing emails to your own email address'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }

  return new Resend(apiKey)
}

async function sendEmailWithResend({ resend, from, to, subject, html }) {
  const result = await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  })

  if (result?.error) {
    const message = result.error.message || 'Resend API rejected the email request.'
    const code = result.error.name || result.error.code
    throw new Error(code ? `${code}: ${message}` : message)
  }

  if (!result?.data?.id) {
    throw new Error('Resend did not return an email id for this request.')
  }

  return result.data.id
}

async function sendPasswordResetOtpEmail({ to, otp, expiresInMinutes = 15 }) {
  const resend = getResendClient()
  const from = process.env.RESEND_FROM_EMAIL
  const testRecipient = process.env.RESEND_TEST_TO

  if (!resend || !from) {
    return {
      sent: false,
      reason: 'Resend configuration missing',
    }
  }

  const subject = 'CoreInventory OTP for Password Reset'
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #0f172a;">
      <h2 style="margin: 0 0 12px;">Password Reset Verification</h2>
      <p style="margin: 0 0 12px;">Use this one-time code to continue resetting your CoreInventory password:</p>
      <p style="font-size: 28px; letter-spacing: 6px; font-weight: 700; margin: 0 0 12px;">${otp}</p>
      <p style="margin: 0 0 8px;">This code expires in ${expiresInMinutes} minutes.</p>
      <p style="margin: 0; color: #475569;">If you did not request this, you can ignore this email.</p>
    </div>
  `

  try {
    const emailId = await sendEmailWithResend({
      resend,
      from,
      to,
      subject,
      html,
    })

    return {
      sent: true,
      emailId,
      deliveredTo: Array.isArray(to) ? to : [to],
    }
  } catch (error) {
    const isTestModeRecipientRestriction =
      typeof error.message === 'string' && error.message.includes(RESEND_TEST_MODE_ERROR_TEXT)

    if (process.env.NODE_ENV !== 'production' && testRecipient && isTestModeRecipientRestriction) {
      const emailId = await sendEmailWithResend({
        resend,
        from,
        to: testRecipient,
        subject: `[DEV REDIRECT] ${subject}`,
        html,
      })

      return {
        sent: true,
        emailId,
        deliveredTo: [testRecipient],
        redirectedFrom: Array.isArray(to) ? to : [to],
        reason: 'Recipient redirected to RESEND_TEST_TO due to Resend testing mode.',
      }
    }

    throw error
  }
}

module.exports = {
  sendPasswordResetOtpEmail,
}
