# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/20c05e9c-3515-4bc6-a60d-978961ef97dc

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/20c05e9c-3515-4bc6-a60d-978961ef97dc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/20c05e9c-3515-4bc6-a60d-978961ef97dc) and click on Share -> Publish.

## Email Configuration (Vercel Deployment)

This project uses a serverless function to send emails via Gmail SMTP. To enable email functionality on Vercel:

1. **Generate a Gmail App Password:**
   - Go to your Google Account settings
   - Enable 2-Step Verification if not already enabled
   - Navigate to Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

2. **Set Environment Variables in Vercel:**
   - Go to your Vercel project settings
   - Navigate to Settings > Environment Variables
   - Add the following variables:
     - `GMAIL_USER`: `lvnhomecareservices@gmail.com`
     - `GMAIL_APP_PASSWORD`: Your 16-character Gmail App Password
     - `NEXT_PUBLIC_SITE_URL`: Your deployed website URL (e.g., `https://your-site.vercel.app`) - Optional, will auto-detect from Vercel if not set

3. **Redeploy:**
   - After adding the environment variables, redeploy your project for the changes to take effect

The contact form will send:
- An inquiry email to `lvnhomecareservices@gmail.com` with the form submission details
- A confirmation email to the client confirming that LVN Home Care Services will contact them shortly

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
