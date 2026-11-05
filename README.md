# StudioSpace — Creative Workspace Marketplace

**Discover. Book. Create.**

StudioSpace is a peer-to-peer marketplace where creators, photographers, filmmakers, podcasters, and musicians can discover and book professional creative workspaces. It also allows studio owners to list and manage their spaces through a seamless booking platform.

🌐 **Live Website:** https://studiospace-web.onrender.com

## ✨ Key Features

- **Explore Studios:** Discover creative spaces with category-based filtering, search, and detailed workspace information.
- **Secure Authentication:** Register and log in using email/password or Google authentication.
- **Studio Management:** Add, update, and delete studio listings with image uploads and detailed information.
- **Smart Booking System:** Reserve studio spaces and manage bookings with real-time booking status.
- **Personal Dashboard:** Manage your studio listings, reservations, and account information.
- **Responsive Design:** Fully optimized interface for mobile, tablet, and desktop devices.
- **Theme Customization:** Switch between light and dark themes for a personalized experience.

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** JavaScript 
- **Styling:** Tailwind CSS, Shadcn UI 
- **Authentication:** Better Auth, Google OAuth
- **Database Integration:** MongoDB
- **Notifications:** Sonner 
- **Deployment:** Render

## 🚀 Local Setup

**1. Clone the repository**

```bash
git clone https://github.com/MdSagarAhammed/studiospace-web.git
cd studiospace-web
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

Create a `.env.local` file in the project root:

```env
# Server-side Express backend origin for the Next.js API proxy
BACKEND_ORIGIN=http://localhost:5000

# imgbb key for the image upload system
NEXT_PUBLIC_IMGBB_API_KEY=get an api key


**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit: http://localhost:3000

## 🔐 Examiner Test Credentials

**Test Account**

- Email: `dev.test@gmail.com`
- Password: `Dev000`



## 📌 Project Purpose

StudioSpace simplifies the process of finding, sharing, and booking creative production spaces while providing studio owners with an efficient platform to manage their listings and reservations.