# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

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

This project is already set up for GitHub Pages (project pages). Below are two recommended ways to publish.

1) Quick deploy with npm (uses `gh-pages`):

- Ensure `homepage` in `package.json` points to `https://<your-user>.github.io/<your-repo>/` (already set to `https://solefreshofficial.github.io/Solefreshshoe-Deodorizer/`).
- Build and deploy:

```sh
npm run deploy
```

This runs `predeploy` (build) then uses `gh-pages` to publish `dist` to the `gh-pages` branch.

2) Auto-deploy on push (GitHub Actions):

A ready-to-use workflow (`.github/workflows/deploy.yml`) is included which builds the site and publishes the `dist` folder to GitHub Pages on pushes to `main`.

Notes & tips:

- Router: this project now uses `HashRouter` so navigation works reliably on GitHub Pages without extra server configuration.
- If you prefer pretty URLs instead of hashes, enable a 404 redirect but keep in mind extra configuration is required on GitHub Pages.
- For any custom domain, set it via the repository Settings > Pages and add a `CNAME` or configure DNS as needed.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

> CI: trigger workflow re-run (no content change; used to re-run deploy job).

> CI: redeploy trigger - minor commit to re-run Pages deployment.
