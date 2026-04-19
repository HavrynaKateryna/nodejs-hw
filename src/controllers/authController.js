export const requestResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      message: 'Password reset email sent successfully',
    });
  }

  const token = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const template = await fs.readFile(
    'src/templates/reset-password-email.html',
    'utf-8'
  );

  const html = handlebars.compile(template)({
    name: user.username || user.email,
    link: `${process.env.FRONTEND_DOMAIN}/reset-password?token=${token}`,
  });

  await sendEmail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    html,
  });

  res.status(200).json({
    message: 'Password reset email sent successfully',
  });
};
