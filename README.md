# 🚌 BUS MITTRA  
### Smart Bus Tracking & Complaint Management System

![Bus Mittra Banner](assets/logo.png)

BUS MITTRA is a smart web-based platform designed to improve public transport experience by providing **real-time bus tracking**, **route visualization**, and **complaint management** using modern web technologies and Firebase.

---

## 🚀 Live Demo

🔗 **Hosted on Firebase & GitHub Pages**

- 🌐 **Firebase Hosting**  
  https://bus-mittra.web.app

- 💻 **GitHub Pages**  
  https://code-from-space.github.io/bus-mittra/

---

## ✨ Features

### 👤 User Features
- 🔐 Secure Login & Registration (Firebase Auth)
- 🚌 Select Active Buses from Firestore
- 🗺️ View Live Bus Location on Google Maps
- 📍 Real-time route & marker updates
- 📝 Submit complaints directly from dashboard
- 🎨 Modern UI with gradients & animations
- 🌙 Dark / Light UI-ready structure

### 🧑‍✈️ Driver Features
- 📍 Share live bus location
- 🛣️ Assigned route view
- 🔄 Continuous location updates (Firestore)

### 🛠️ Admin Features
- 👥 Manage users (User / Driver / Admin)
- 🚌 Manage buses & routes
- 📊 Monitor complaints
- 🚨 Send alerts (future scope)

---

## 🧱 Tech Stack

| Technology | Usage |
|---------|------|
| HTML5 | Structure |
| CSS3 | UI, Animations, Gradients |
| JavaScript | Logic & Interactivity |
| Firebase Auth | Authentication |
| Firestore | Database (Users, Buses, Complaints) |
| Firebase Hosting | Deployment |
| Google Maps API | Live Maps & Location |
| Git & GitHub | Version Control |

---
## 📁 Project Structure

```text
Bus-Mittra/
├── index.html                 # Landing page
├── firebase.json              # Firebase hosting config
├── README.md                  # Project documentation
│
├── auth/
│   ├── login.html             # Login page
│   └── register.html          # Registration page
│
├── user/
│   ├── dashboard.html         # User dashboard
│   └── complaint.html         # Complaint submission
│
├── driver/
│   └── dashboard.html         # Driver dashboard
│
├── admin/
│   └── dashboard.html         # Admin dashboard
│
├── js/
│   ├── firebase.js            # Firebase configuration
│   ├── auth.js                # Authentication & role logic
│   └── app.js                 # App logic (maps, buses)
│
├── css/
│   └── style.css              # Styling & animations
│
└── assets/
    └── logo.png               # Project assets

```


---
## 🔥 Firestore Database Structure

This project uses **Firebase Firestore** as the real-time database to manage users, buses, live locations, and complaints.  
Below is the complete and structured overview of all collections used in **BUS MITTRA**.

---

### 👤 users (Role-based Access Control)
```

users (collection)
 └── {userId} (document)
     ├── email: "user@gmail.com"
     └── role: "user" | "driver" | "admin"
     
     
buses (collection)
 └── {busId} (document)
     ├── number: "101"
     ├── route: "Station → College"
     ├── lat: 26.9124
     ├── lng: 75.7873
     └── active: true


complaints (collection)
 └── {complaintId} (document)
     ├── busNumber: "101"
     ├── message: "Bus is late today"
     ├── userId: "USER_UID"
     └── timestamp: serverTimestamp()

     
alerts (collection)
 └── {alertId} (document)
     ├── title: "Bus Delay Alert"
     ├── message: "Bus 101 delayed by 10 minutes"
     └── createdAt: serverTimestamp()
```

## 🧭 How BUS MITTRA Works

1️⃣ User registers or logs in using Firebase Authentication  
2️⃣ Role is fetched from Firestore (`users` collection)  
3️⃣ User is redirected based on role:
   - 🧑‍🎓 User → User Dashboard
   - 🧑‍✈️ Driver → Driver Dashboard
   - 🧑‍💼 Admin → Admin Panel

4️⃣ User selects a bus  
5️⃣ Live bus location is fetched from Firestore  
6️⃣ Google Maps displays real-time marker updates  
7️⃣ Users can submit complaints linked to buses  

## 🗺️ Google Maps Integration

- Integrated using **Google Maps JavaScript API**
- Live bus markers update using Firestore `lat` & `lng`
- Real-time tracking without page refresh
- Future scope: route polylines & ETA calculation


## 🌱 Future Enhancements

- 📍 Accurate GPS-based driver tracking
- 🔔 Push notifications for delays
- 📊 Admin analytics dashboard
- 🧭 Route polyline visualization
- 📱 Mobile app (React Native / Flutter)


## 👨‍💻 Author **Antariksh** 

 
🎓 Student | 💻 Full Stack Developer  
🌐 GitHub: https://github.com/code-from-space  

---

⭐ If you like this project, don’t forget to star the repository!

