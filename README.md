This project is a full-stack authentication system built using Next.js and MongoDB.
It provides a secure user management flow with JWT-based authentication, protected API routes, and email verification features using Nodemailer + Mailtrap for development testing.

The app demonstrates how to build a production-ready authentication system in Next.js with secure backend integration and seamless frontend routing.

🛠️ Tech Stack
- Frontend: Next.js (App Router)
- Backend: Next.js API routes (Node.js)
- Database: MongoDB (Mongoose)
- Authentication: JSON Web Tokens (JWT)
- Mail Service: Nodemailer + Mailtrap (for test emails)
- Password Hashing: bcrypt.js

🔐 Core Features
🧍 User Authentication

Register / Sign Up:
Users can register with name, email, and password.
Upon registration, an email verification link is sent using Mailtrap.

Login:
Secure login using JWT tokens.
Tokens are stored safely in HTTP-only cookies for enhanced security.

Logout:
Tokens are cleared from cookies to end sessions securely.

📧 Email Verification (via Nodemailer + Mailtrap)
When a new user registers, a verification email is automatically sent. The email contains a verification link with a token parameter. Clicking the link verifies the user in MongoDB by updating the isVerified field.

🔑 Forgot / Reset Password
Users can request a password reset email.The app generates a temporary JWT token and sends it via Mailtrap. Clicking the reset link allows the user to enter a new password securely.

🛡️ Protected Routes (JWT Middleware)
Certain API routes and pages are accessible only to authenticated users.Middleware validates JWT tokens before allowing access. If unauthorized, users are redirected to the login page.