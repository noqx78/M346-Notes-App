### M346 Cloud Projekt
---


#### Tech Stack

|  |  |  |
|---|---|---|
| <img alt="Next.js Logo" src="https://cdn.brandfetch.io/id2alue-rx/w/394/h/80/theme/light/logo.png?c=1bxid64Mup7aczewSAYMX&t=1714556231978" width="64"> | **Next.js** | _Frontend & Backend_ |
| <img alt="Firebase Logo" src="https://brandlogos.net/wp-content/uploads/2025/03/firebase_icon-logo_brandlogos.net_tcvck-512x646.png" width="28"> | **Firebase** | Database
| <img alt="Firebase Logo" src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" width="28"> | **Tailwind CSS** |  Styling
| <img alt="Firebase Logo" src="https://ui.shadcn.com/apple-touch-icon.png" width="28"> | **Shadcn/UI** |  UI Libary

---

💾 Firestore FireStore Structur

##### /users/${userId} 
```
{
    email: "web@belastend.ch"
    password: "belastend"
}
```

##### /users/${userId}/tasks/${taskId}
```
{
    title: "title"
    desc: "description"
    done: "false"
}
```

---
.env.local

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```