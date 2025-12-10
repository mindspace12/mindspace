# MindSpace - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd mindspace

# Install backend dependencies
cd backend
npm install

# Install mobile dependencies
cd ../mobile
npm install
```

### Step 2: Configure Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your settings:
# - MongoDB connection string
# - JWT secret
# - Email credentials (optional for testing)
```

### Step 3: Start MongoDB

```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud) - just update MONGODB_URI in .env
```

### Step 4: Start Backend

```bash
cd backend
npm run dev

# You should see:
# ✅ MongoDB connected successfully
# 🚀 Server running on port 5000
```

### Step 5: Configure Mobile App

```bash
cd mobile

# Copy environment file
cp .env.example .env

# Edit .env:
# For iOS Simulator: EXPO_PUBLIC_API_URL=http://localhost:5000/api
# For Android Emulator: EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api
# For Physical Device: EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_IP:5000/api

# Find your IP:
# macOS/Linux: ifconfig | grep "inet "
# Windows: ipconfig
```

### Step 6: Start Mobile App

```bash
cd mobile
npm start

# Options:
# - Press 'i' for iOS simulator
# - Press 'a' for Android emulator  
# - Scan QR code with Expo Go app on your phone
```

---

## 📱 Testing the App

### Create Test Users

**Student Account:**
```
1. Open app → Register
2. Email: student@test.com
3. Password: password123
4. Role: Student
5. Complete onboarding with year & department
6. Note your anonymous username (e.g., S-X8D92)
```

**Counsellor Account:**
```
1. Open app → Register
2. Email: counsellor@test.com
3. Password: password123
4. Role: Counsellor
5. Name: Dr. Smith
6. Specialization: General Counseling
```

**Management Account (Create via MongoDB):**
```javascript
// Use MongoDB Compass or mongo shell
db.users.insertOne({
  email: "admin@test.com",
  password: "$2a$10$...", // Hash "password123"
  role: "management",
  name: "Admin",
  isOnboarded: true
})
```

---

## ✅ Feature Checklist

Test these features in order:

### Student Flow
- [ ] Register & login
- [ ] Complete onboarding
- [ ] View QR code
- [ ] Browse counsellors
- [ ] Book appointment
- [ ] Write journal entry
- [ ] Log daily mood
- [ ] View appointments
- [ ] View session history

### Counsellor Flow
- [ ] Register & login
- [ ] Create time slots
- [ ] View appointments
- [ ] Scan student QR (start session)
- [ ] Add session notes
- [ ] Tag severity (R/Y/G)
- [ ] Scan QR (end session)
- [ ] View student history

### Management Flow
- [ ] Login
- [ ] View department analytics
- [ ] View year analytics
- [ ] View severity distribution
- [ ] View session volume

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed:**
```bash
# Check if MongoDB is running
# macOS: brew services list
# Windows: services.msc
# Linux: systemctl status mongod

# Or use MongoDB Atlas and update MONGODB_URI
```

**Port 5000 Already in Use:**
```bash
# Change PORT in .env to 5001 or any available port
# Update mobile .env accordingly
```

### Mobile Issues

**Cannot Connect to Backend:**
```bash
# Verify backend is running
curl http://localhost:5000/health

# Check API URL in mobile/.env
# For physical device, use computer's IP, not localhost
```

**Expo Go Not Working:**
```bash
# Clear cache
expo start -c

# Reset Metro bundler
expo r

# Reinstall dependencies
rm -rf node_modules
npm install
```

**QR Scanner Not Working:**
```bash
# Grant camera permissions in device settings
# iOS: Settings → Privacy → Camera → Expo Go
# Android: Settings → Apps → Expo Go → Permissions → Camera
```

---

## 📊 Database Structure

```
Collections:
├── users          (Students, Counsellors, Management)
├── timeslots      (Counsellor availability)
├── appointments   (Booking records)
├── sessions       (Completed sessions with notes)
├── journals       (Student journals)
├── moods          (Mood logs)
└── feedbacks      (Session feedback)
```

---

## 🔑 API Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","role":"student"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Get counsellors (no auth needed)
curl http://localhost:5000/api/counsellors

# Create journal (requires token)
curl -X POST http://localhost:5000/api/journals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My Journal","content":"Today was good"}'
```

---

## 🚀 Next Steps

1. **Customize Theme:** Edit `mobile/src/constants/theme.js`
2. **Add Email Notifications:** Configure nodemailer in backend
3. **Implement Remaining Screens:** Complete placeholder screens
4. **Add Push Notifications:** Set up FCM
5. **Deploy Backend:** Use Heroku, AWS, or DigitalOcean
6. **Build Mobile App:** `expo build:android` / `expo build:ios`

---

## 📞 Need Help?

- Check README.md for full documentation
- Review code comments
- Test API endpoints with Postman
- Check browser console / app logs for errors

---

## 🎉 Success Indicators

You're ready when:
- ✅ Backend running on http://localhost:5000
- ✅ Mobile app connects to backend
- ✅ Can register/login as student
- ✅ Can register/login as counsellor
- ✅ Database shows created users
- ✅ QR code displays for students
- ✅ No errors in terminal/console

Happy coding! 🚀
