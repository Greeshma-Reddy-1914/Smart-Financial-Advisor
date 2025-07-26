# Smart Financial Advisor
A full-stack web application that provides personalized investment recommendations and answers financial queries using Agentic AI. Built using React (frontend), Node.js + Express (backend), and MongoDB.

## 1. Features
- User Registration & Login (with JWT auth)
- User Profile view with investment info
- AI Advisor Chat that answers “what if” investment-related questions
- Protected routes using context + JWT
- Connected to a local MongoDB database

## 2. Project Structure
```bash
Copy
Edit
Smart-Financial-Advisor/
│
├── client/              # React frontend
├── server/              # Express backend
├── .env                 # Environment variables (you'll create this)
└── README.md
```
## 3. Prerequisites
- Node.js and npm
- MongoDB installed and running locally
- mongosh CLI (to test MongoDB)
- Git (to clone the repo)

## 4. Setup & Running Steps (After Cloning)
### 4.1 Install Dependencies
**Backend Setup (server/ folder)**
```
cd server
npm install
```
**Frontend Setup (client/ folder)**
```
cd client
npm install
```
### 4.3 Create .env File in server/
Inside the server/ folder, there exists .env file with this content:
```
MONGO_URI = mongodb://127.0.0.1:27017/smart-financial-advisor
JWT_SECRET = my$uper$ecretKey123!
```
This connects the app to your local MongoDB instance.
Make sure MongoDB is installed and running on your system.

### 4.4 Run the App in Two Terminals
**Terminal 1 — Start Backend Server**
```
cd server
node index.js
```
Runs the Express API at: http://localhost:3000

**Terminal 2 — Start Frontend React App**
```
cd client
npm start
```
Runs the React app at: http://localhost:5000

### 4.5 Try It Out
Visit: http://localhost:3000

Click "Get Started" and register a few users:

**Examples:**

User 1: John

Name: John</br>
Email: john@gmail.com</br>
Password: 1234</br>
Income: ₹50,000/month</br>
Expenses: ₹15,000/month</br>
Risk Appetite: Medium</br>
Financial Goal: Buy a house</br>
Investment Horizon: 10 years</br>

User 2: Kevin

Name: Kevin</br>
Email: kevin@gmail.com</br>
Password: 4321</br>
Income: ₹1,00,000/month</br>
Expenses: ₹25,000/month</br>
Risk Appetite: High</br>
Financial Goal: Retirement</br>
Investment Horizon: 13 years</br>

You can also register your own account, then fill out your profile to start receiving recommendations.

Log in and visit the Profile or Analysis pages.

### 4.6 Sample Questions You Can Ask:

Use these on the Analysis page:
- What if risk is low?
- What if my salary increases but expenses go down?
- What if I want to retire early?
- What if my expenses increase and salary drops?
- What if investment horizon is 15 years?
- What if my goal changes from retirement to buying a house?
