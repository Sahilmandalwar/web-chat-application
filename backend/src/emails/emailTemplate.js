export const createEmailTemplate = (username, app_url) => 
  `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Web Chat</title>
    </head>

    <body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, Helvetica, sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6fb; padding:20px 0;">
        <tr>
          <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#6366f1); color:#ffffff; text-align:center; padding:30px 20px;">
              <h1 style="margin:0; font-size:28px;">Welcome to Web Chat 🚀</h1>
              <p style="margin:10px 0 0; font-size:16px;">Your conversations just got smarter.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333;">

              <h2 style="margin-top:0;">Hello ${username} 👋</h2>

              <p style="font-size:15px; line-height:1.6;">
                We're thrilled to have you join <strong>Web Chat Application</strong>! Your account has been successfully created.
              </p>

              <p style="font-size:15px; line-height:1.6;">
                Now you can start chatting in real-time, connect with others, and explore seamless communication.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="${app_url}" 
                  style="background:#4f46e5; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; font-weight:bold; display:inline-block;">
                  Start Chatting 💬
                </a>
              </div>

              <p style="font-size:14px; line-height:1.6;">
                If you didn’t create this account, you can safely ignore this email.
              </p>

              <p style="font-size:15px; margin-top:25px;">
                Cheers 🥂,<br>
                <strong>Team Web Chat</strong>
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 30px;">
              <hr style="border:none; border-top:1px solid #eee;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 30px; text-align:center; font-size:12px; color:#888888;">
              <p style="margin:0;">
                © 2026 Web Chat Application. All rights reserved.
              </p>
              <p style="margin:5px 0 0;">
                Made with ❤️ for seamless communication
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>


      </table>

    </body>
    </html>
  `
