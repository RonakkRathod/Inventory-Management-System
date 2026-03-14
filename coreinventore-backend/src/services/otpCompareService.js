function compareOtp({ savedOtp, savedExpiry, incomingOtp }) {
  if (!savedOtp || !savedExpiry) {
    return { ok: false, reason: 'No active OTP request found.' }
  }

  if (savedExpiry.getTime() < Date.now()) {
    return { ok: false, reason: 'OTP has expired.' }
  }

  if (String(savedOtp) !== String(incomingOtp)) {
    return { ok: false, reason: 'Invalid OTP.' }
  }

  return { ok: true }
}

module.exports = {
  compareOtp,
}
