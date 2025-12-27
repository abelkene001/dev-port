# Backend TODO

This file outlines the next steps for completing the backend implementation.

- **1. Set up Supabase:**
  - [x] Create a new Supabase project.
  - [x] Create the `projects`, `tools`, and `messages` tables according to the schema in `backend.md`.
  - [x] Add the Supabase URL and anon key to the environment variables.

- **2. Implement Server Actions:**
  - [x] Implement the `handleLike` server action in `app/actions/projectActions.ts` to update the `likes_count` in the `projects` table.
  - [x] Implement the `submitInquiry` server action in `app/actions/inquiryActions.ts` to insert a new message into the `messages` table.
  - [x] Implement project management functions (create, update, delete) in `app/actions/projectActions.ts`.

- **3. Implement Authentication:**
  - [x] Implement user authentication using Supabase Auth.
  - [x] Update the `middleware.ts` file to check for a valid session cookie.
  - [ ] Create a `/login` page for Abel Kène to log in.

- **4. Build the Admin Portal:**
  - [ ] Create the `/admin` page.
  - [ ] Build the Project Manager with full CRUD functionality.
  - [ ] Build the Tool Manager with full CRUD functionality.
  - [ ] Build the Inquiry Inbox to read and manage messages.
  - [ ] Build the Stats Card to display aggregate 'Like' counts and unread message counts.