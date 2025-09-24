# 📘 Project Documentation – PROJECT NEXUS

## 1. Title Page & Abstract
**Title:** Project Nexus  
**Abstract:**  
Project Nexus is an intelligent, modular platform for Google Developer Groups (GDG) designed to integrate event management, community engagement, and analytics into a unified, user-friendly system. The project aims to simplify workflows, improve efficiency, and provide a seamless interaction between users and a rich ecosystem of tech events. Its architecture emphasizes scalability, a modern user experience, and adaptability for future enhancements.

---

## 2. Introduction
### Problem Statement
GDG communities often rely on multiple disjointed platforms for event announcements, bookings, and member communication, leading to inefficiency, data silos, and a fragmented user experience.

### Objectives
- To provide a centralized hub for managing and discovering all GDG-related events, including workshops, hackathons, and contests.
- To ensure a secure, fast, and scalable platform built on modern web technologies.
- To foster community engagement through features like user profiles, session bookings, and AI-powered assistance.
- To deliver an intuitive and visually appealing user interface for all stakeholders.

### Scope
Project Nexus focuses on user authentication, event discovery and booking, user profile management, and an admin dashboard for analytics. It is tailored for the GDG community but can be adapted for other tech event platforms.

---

## 3. System Architecture
### Layers
1.  **Presentation Layer:** A responsive user interface built with Next.js (React) and styled with Tailwind CSS, featuring components from ShadCN UI.
2.  **Application Layer:** Handles business logic and user interactions within the Next.js framework. It uses Server Actions and client-side components for a dynamic experience. Genkit is used for AI-powered features.
3.  **Data Layer:** Mock data is provided via TypeScript files, simulating a database for sessions, speakers, and user profiles. Firebase is integrated for authentication.
4.  **AI Layer:** Genkit is used to power AI features, such as the Nexus AI Assistant, providing users with intelligent query responses and suggestions.

### Architecture Diagram (Textual Form)
+---------------------------------+
|        Presentation Layer       |
| (Next.js, React, ShadCN, ...)   |
+----------------+----------------+
                 |
                 v
+---------------------------------+
|        Application Layer        |
| (Next.js App Router, Server     |
|  Components, Client Components) |
+----------------+----------------+
                 |
                 v
+----------------+----------------+
|           Data Layer            |
|  (Mock Data, Firebase Auth)     |
+----------------+----------------+
                 |
                 v
+---------------------------------+
|            AI Layer             |
|   (Genkit, Google AI)           |
+---------------------------------+

---

## 4. Working Algorithm / Workflow
### Step-by-Step User Journey
1.  A user lands on the homepage, which features a prominent hero section and a search bar.
2.  The user can browse all upcoming events or use the search and filter controls to find sessions by topic (e.g., "Gen AI," "Web Dev").
3.  The user can also navigate to dedicated pages for "Hackathons," "Contests," or "Workshops" via the main header.
4.  Clicking on an event card takes the user to the session detail page, which provides a long description, speaker information, and event logistics.
5.  To book a session, the user must log in. The platform supports email/password and Google social login.
6.  Once logged in, the user can book a session with a single click. Booked sessions appear on their profile page.
7.  The user can visit their profile page to update personal information, view booked sessions, and manage notification preferences.
8.  At any point, the user can interact with the "Nexus AI Assistant" chatbot for help or to ask questions about GDG events.

### Pseudocode for Session Booking
START
  INPUT session_id, user_id
  VALIDATE user_is_logged_in
  IF valid THEN
      FETCH user_profile
      CHECK if session_id is in user_profile.bookedSessions
      IF already_booked THEN
          REMOVE session_id from user_profile.bookedSessions
          RETURN "Booking cancelled"
      ELSE
          ADD session_id to user_profile.bookedSessions
          RETURN "Booking confirmed"
      ENDIF
  ELSE
      RETURN "Login required"
  ENDIF
END

---

## 5. Module Descriptions
-   **Authentication Module:** Handles login, registration, and social sign-in (Google). Manages user sessions.
-   **Event Management Module:** Displays sessions, provides search and filtering, and includes dedicated pages for different event categories.
-   **User Profile Module:** Allows users to view and update their profile, see booked sessions, and manage notification preferences. Includes gamification elements like points and badges.
-   **Dashboard Module:** Provides users with an overview of platform activity, including total sessions, speaker counts, and a chart visualizing session distribution by category.
-   **AI Assistant Module:** A chatbot powered by Genkit that answers user queries about GDG and suggests follow-up questions.
-   **Admin Module:** A role-protected section with a dedicated dashboard and sidebar for platform management (currently in foundational stage).

---

## 6. Technology Stack & Tools
-   **Frontend:** Next.js (App Router), React, TypeScript
-   **Styling:** Tailwind CSS, ShadCN UI components
-   **Analytics/Charts:** Recharts
-   **Authentication:** Firebase Authentication (simulated via `useAuth` hook)
-   **AI/Generative:** Genkit, Google AI
-   **Icons:** Lucide React

---

## 7. Project Files (Deliverables)
The file structure has been organized to support a modern Next.js application.

1.  **/src/app/** – Core application routing, pages, and layouts using the Next.js App Router.
    -   `(auth)`: Route group for login and signup pages.
    -   `sessions/[id]`: Dynamic route for session detail pages.
    -   `dashboard`, `profile`, `about`, `contact`: Static routes for main application pages.
2.  **/src/components/** – Reusable React components.
    -   `/ui/`: Automatically generated components from ShadCN UI (Button, Card, etc.).
    -   `/auth/`: Components related to user authentication.
    -   `/chat/`: Components for the AI chatbot.
    -   `/layout/`: Site-wide layout components like the header and footer.
3.  **/src/lib/** – Core application logic, data, and type definitions.
    -   `auth.tsx`: Authentication context and hooks for managing user state.
    -   `data.ts`: Mock data for sessions, speakers, and users.
    -   `types.ts`: TypeScript type definitions for data structures.
    -   `placeholder-images.json`: A centralized file for managing all placeholder image data.
4.  **/src/ai/** – Genkit flows for AI-powered features.
    -   `/flows/`: Contains the logic for the AI assistant and other generative AI tasks.
5.  **/public/** - Static assets, including the `index.html` for redirection.

---

## 8. File Structure

```
.
├── .env
├── README.md
├── apphosting.yaml
├── components.json
├── next.config.ts
├── package.json
├── public
│   └── index.html
├── src
│   ├── ai
│   │   ├── dev.ts
│   │   ├── flows
│   │   │   ├── ai-session-assistant-flow.ts
│   │   │   └── general-gdg-query.ts
│   │   └── genkit.ts
│   ├── app
│   │   ├── (auth)
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── about/page.tsx
│   │   ├── admin
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── contact/page.tsx
│   │   ├── contests/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── hackathons/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── profile/page.tsx
│   │   ├── sessions/[id]/page.tsx
│   │   └── workshops/page.tsx
│   ├── components
│   │   ├── admin/admin-sidebar.tsx
│   │   ├── auth/user-auth-form.tsx
│   │   ├── chat/ai-chat.tsx
│   │   ├── layout
│   │   │   ├── header.tsx
│   │   │   └── site-footer.tsx
│   │   ├── logo.tsx
│   │   ├── session
│   │   │   ├── session-card.tsx
│   │   │   └── session-list.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── ui/*
│   │   └── user-avatar.tsx
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   └── lib
│       ├── auth.tsx
│       ├── data.ts
│       ├── placeholder-images.json
│       ├── placeholder-images.ts
│       ├── types.ts
│       └── utils.ts
└── tsconfig.json
```

---

# ✅ End of Documentation – PROJECT NEXUS
