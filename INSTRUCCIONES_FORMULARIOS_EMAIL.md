# Streamer Empire - Email Form Patch

This patch connects the website forms to streamerempire.go@gmail.com using FormSubmit.

IMPORTANT FIRST TEST:
1. Upload/replace index.html in the GitHub repository root.
2. Open https://www.streamerempire.com/#streamers
3. Submit one test form.
4. Check streamerempire.go@gmail.com and confirm the activation email from FormSubmit.
5. After confirmation, later form submissions will be emailed.

Changes included:
- Removed fakeSubmit placeholder.
- Added form action to https://formsubmit.co/streamerempire.go@gmail.com
- Added name attributes so fields are included in email.
- Added required fields.
- Added recent photos/profile links field for streamer applicants.
- Added thank-you redirect anchor.
