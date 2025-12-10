# MindSpace - Mental Health Counseling Platform

<div align="center">
  <h3>🧠 Secure, Anonymous, Privacy-Focused Mental Wellness Platform</h3>
  <p>A comprehensive React Native mobile application for campus mental health counseling</p>
</div>

---

## 📋 Overview

MindSpace is a complete mental health counseling ecosystem designed for educational institutions. The platform ensures complete anonymity for students while providing powerful tools for counsellors and actionable insights for management.

### Core Principles

✅ **Complete Anonymity** - Students assigned anonymous usernames (e.g., S-X8D92)  
✅ **Privacy-First** - No personal data exposed beyond authentication  
✅ **QR-Based Sessions** - Secure check-in/out system  
✅ **Offline Support** - Journaling works without internet  
✅ **Mobile-First** - Native iOS and Android with Expo  
✅ **Real-Time Updates** - Instant slot availability  

---

## 🚀 Key Features

### For Students
- Anonymous username generation
- Slot-based appointment booking
- Unique QR code for sessions
- Offline-first journaling
- Daily mood tracking
- Session history with severity
- Post-session feedback
- Email notifications

### For Counsellors
- Weekly availability slots
- QR code scanner
- Session notes
- Red/Yellow/Green severity tagging
- Anonymous student history
- Appointment rescheduling
- Auto-active status during sessions

### For Management
- Department analytics
- Year-wise statistics
- Severity distribution
- Session volume trends
- **Complete Privacy** - No usernames or personal data

---

## 🛠 Technology Stack

**Mobile (React Native + Expo)**
- React Native 0.73
- Expo 50
- React Navigation 6
- Redux Toolkit
- React Native Paper
- Expo Camera (QR)
- AsyncStorage

**Backend (Node.js)**
- Express.js
- MongoDB/Mongoose
- JWT Authentication
- Bcrypt
- Nodemailer
- QRCode generation

---

## 📁 Project Structure

```
mindspace/
├── mobile/                    # React Native app
│   ├── App.js
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── navigation/
│   │   ├── redux/
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   ├── student/
│   │   │   ├── counsellor/
│   │   │   └── management/
│   │   ├── services/
│   │   └── utils/
│   └── assets/
│
├── backend/                   # Node.js API
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.js
│   └── .env.example
│
└── README.md
```

---

## 💻 Installation & Setup

### Prerequisites
- Node.js 16+
- MongoDB 5+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator or Android Studio

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Mobile App Setup

```bash
cd mobile
npm install
cp .env.example .env
# Set EXPO_PUBLIC_API_URL to your backend URL
npm start
```

---

## 🏃 Running the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Mobile
cd mobile
npm start
# Scan QR with Expo Go app
```

---

## 👥 User Roles

### Student
1. Register → Onboarding (year/dept) → Anonymous username generated
2. Book appointments, write journals, log moods
3. View session history, provide feedback
4. Display QR code for check-in

### Counsellor  
1. Register with name + specialization
2. Set weekly availability
3. Scan student QR to start/end sessions
4. Add notes, tag severity (R/Y/G)
5. View student history (anonymous)

### Management
1. Admin-created accounts
2. View aggregated analytics only
3. No access to personal data

---

## 🔐 Security & Privacy

- **JWT Tokens** - Secure authentication
- **Bcrypt** - Password hashing
- **Anonymous Usernames** - Student privacy
- **QR Secrets** - Unique validation per student
- **Offline Journaling** - Local-first storage
- **Aggregated Data** - Management sees stats only
- **HTTPS** - Encrypted communication

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/onboarding` - Complete onboarding
- `GET /api/auth/qr-code` - Get QR code

### Appointments
- `GET /api/counsellors` - List counsellors
- `GET /api/appointments/slots/:id` - Get slots
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id/cancel` - Cancel

### Sessions
- `POST /api/sessions/start` - Start session (QR)
- `POST /api/sessions/:id/end` - End session
- `POST /api/sessions/:id/feedback` - Submit feedback

### Journals
- `GET /api/journals` - Get journals
- `POST /api/journals` - Create journal
- `PUT /api/journals/:id` - Update
- `DELETE /api/journals/:id` - Delete

### Moods
- `POST /api/moods` - Log mood
- `GET /api/moods` - Get moods
- `GET /api/moods/month` - Monthly trends

### Analytics (Management)
- `GET /api/analytics/department` - By department
- `GET /api/analytics/year` - By year
- `GET /api/analytics/severity` - Severity stats
- `GET /api/analytics/volume` - Session volume

---

## 🚀 Deployment

**Backend**
```bash
# Deploy to Heroku, AWS, DigitalOcean
# Set environment variables
# Use MongoDB Atlas for production
```

**Mobile App**
```bash
expo build:android
expo build:ios
```

---

## 📝 Environment Variables

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindspace
JWT_SECRET=your_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email
EMAIL_PASSWORD=your_password
```

**Mobile (.env)**
```
EXPO_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🔄 Development Workflow

1. **Backend** - Create models → routes → controllers
2. **Mobile** - Create services → Redux slices → screens
3. **Testing** - Test endpoints → UI flow
4. **Deploy** - Backend first → Mobile app

---

## 📱 Screens Implemented

**Auth:** Login, Register, Onboarding  
**Student:** Dashboard, QR Code, Appointments, Journals, Mood, History, Profile  
**Counsellor:** Dashboard, Scanner, Availability, Appointments, Sessions  
**Management:** Analytics, Department/Year/Severity views  

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📄 License

MIT License

---

<div align="center">
  <p>Built with ❤️ for mental wellness</p>
  <p>© 2025 MindSpace</p>
</div>
