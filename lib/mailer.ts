import nodemailer from "nodemailer";

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

export async function sendVerificationEmail(to: string, name: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify/${token}`;

  if (!process.env.SMTP_HOST) {
    console.log(`[mailer] SMTP_HOST är inte satt — bekräftelselänk för ${to}: ${verifyUrl}`);
    return;
  }

  await getTransport().sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Bekräfta din underskrift för hundgården",
    text: `Hej ${name}!\n\nTack för att du vill skriva under för en hundgård.\n\nBekräfta din underskrift genom att klicka på länken nedan:\n${verifyUrl}\n\nLänken är giltig i 72 timmar.\n\nOm du inte skrivit under kan du ignorera det här mejlet.`,
    html: `
      <p>Hej ${name}!</p>
      <p>Tack för att du vill skriva under för en hundgård.</p>
      <p><a href="${verifyUrl}">Klicka här för att bekräfta din underskrift</a></p>
      <p>Länken är giltig i 72 timmar.</p>
      <p>Om du inte skrivit under kan du ignorera det här mejlet.</p>
    `,
  });
}
