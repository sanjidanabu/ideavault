#  IdeaVault

IdeaVault is a web-based platform where users can share innovative startup ideas,
explore ideas posted by others, and engage through comments, and discussions. The
system encourages creativity, collaboration, and validation of ideas through
community interaction.
Instead of booking or scheduling, the platform focuses on idea validation and
engagement, allowing users to discover trending ideas, provide feedback, and refine
concepts collectively.

## 🚀 Live Demo
[https://ideavault-mu.vercel.app/]

## 🛠 Features

### 🔐 Authentication
- User Registration & Login (Email/Password & Google Login).
- JWT-based secure authentication.
- Protected routes for private pages.

### 💡 Idea Management
- **Add Idea:** Users can submit new startup ideas with details (Title, Description, Category, Budget, etc.).
- **View Ideas:** Browse all ideas in a responsive 3-column grid.
- **Search & Filter:** Search by title (case-insensitive) and filter by category or date range.
- **My Ideas:** Update or delete your own submitted ideas.

### 💬 Interaction System
- Commenting system on idea details page.
- Add, edit, and delete your own comments.

### 🎨 UI/UX Features
- Fully responsive design (Mobile, Tablet, Desktop).
- Dark/Light theme toggle.
- Modern UI components using [ShadCN / Flowbite / Chakra UI].
- Dynamic page titles and loading spinners.

## 🛠 Tech Stack

- **Frontend:** [React.js / Next.js, Tailwind CSS, etc.]
- **Backend:** [Node.js, Express.js]
- **Database:** [MongoDB]
- **Authentication:** JWT, Firebase/NextAuth
- **Deployment:** Vercel / Render

## 💻 Installation

1. **Clone the client repository:**
   ```bash
   git clone [Client-repo-link]
   cd client-folder
   npm install
   npm run dev
