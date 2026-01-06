# FarmMind Backend

This repository contains the backend implementation of **FarmMind – Farmer Mind to the Device**, an IoT-based smart farming system.

The backend is responsible for receiving live sensor data from ESP32 devices, storing it in a database, performing AI-based analysis, and serving data to the frontend dashboard.

---

## 🚀 Features

- REST APIs to receive sensor data from ESP32 over WiFi
- Storage of time-series sensor data in MongoDB Atlas
- AI-based soil analysis and crop recommendations
- APIs for latest and historical sensor readings
- Secure environment-based configuration

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- OpenAI API
- dotenv

---

## 📡 Data Flow

ESP32 → REST API → Backend → MongoDB → Frontend Dashboard

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=10000
MONGO_URI=your_mongodb_atlas_connection_string
OPENAI_API_KEY=your_openai_api_key
