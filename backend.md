# BACKEND ARCHITECTURE: THE ENGINE & ADMIN SUITE

### 1. DATABASE SCHEMA (Supabase/Postgres)

- **table: `projects`**
  - fields: id, created_at, title, slug, description, image_url, likes_count, tags[], status (published/upcoming).
- **table: `tools`**
  - fields: id, name, description, subdomain_url, icon_id.
- **table: `messages`**
  - fields: id, sender_name, email, message_body, read_status, created_at.
- **table: `likes`**
  - fields: id, project_id, user_id, created_at.
- **table: `admin`**
  - fields: id, created_at.

### 2. THE ADMIN PORTAL (`/admin`)

- **Authentication:** Only Abel Kène can log in via Supabase Auth.
- **Dashboard Features:**
  - **Project Manager:** Full CRUD (Create, Read, Update, Delete) for portfolio items.
  - **Tool Manager:** Add/Remove tools and their subdomain links.
  - **Inquiry Inbox:** Read and manage "Work with me" messages.
  - **Stats Card:** Display aggregate 'Like' counts and unread message counts.

### 3. SERVER-SIDE LOGIC (Next.js 16)

- **Server Actions:**
  - `handleLike`: Allows a user to like or unlike a project.
  - `submitInquiry`: Submits an inquiry message to the database.
  - `createProject`: Creates a new project.
  - `updateProject`: Updates an existing project.
  - `deleteProject`: Deletes a project.
- **Middleware:** Protect the `/admin` route. Any unauthenticated access attempts must redirect to `/login`.
- **Optimization:** Use `revalidatePath` to ensure the portfolio updates immediately when Abel changes something in the dashboard.