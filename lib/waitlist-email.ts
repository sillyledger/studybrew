export function confirmEmailHtml(confirmUrl: string): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Confirm your spot</title>
  </head>
  <body style="margin:0;padding:0;background-color:#10151b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#10151b;">
      <tr>
        <td align="center" style="padding:48px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;font-family:Arial,Helvetica,sans-serif;">
            <tr>
              <td style="padding:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#5DCAA5;">
                Study Brew waitlist
              </td>
            </tr>
            <tr>
              <td style="padding:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;color:#F2F0E9;">
                Confirm your spot
              </td>
            </tr>
            <tr>
              <td style="padding:0 0 28px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:rgba(242,240,233,0.7);">
                One click and you're on the list. We'll email you when the notes app opens. This link expires in 48 hours.
              </td>
            </tr>
            <tr>
              <td style="padding:0 0 32px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="background-color:#5DCAA5;border-radius:999px;">
                      <a href="${confirmUrl}" style="display:inline-block;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#06291d;text-decoration:none;border-radius:999px;">Confirm my spot</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(242,240,233,0.4);">
                If you didn't request this, you can ignore this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
