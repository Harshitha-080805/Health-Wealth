# Digital Health Wallet - Project Walkthrough

## **Project Overview**
Your project is a **Digital Health Wallet** – a web application that lets users store health vitals (blood pressure, glucose levels, heart rate), upload medical reports, and share their health data with doctors or family members.

---

## **Architecture**

### **Frontend (React + Vite)**
- **Location**: `/client`
- **Technology**: React with Vite, Recharts for charts, React Router for navigation
- **Main Components**:
  - **Login/Register Pages**: User authentication
  - **Dashboard**: Main hub after login with vitals charts and report gallery
  - **VitalsChart**: Visual representation of health data over time
  - **AuthContext**: Manages user authentication state across the app

### **Backend (Node.js + Express)**
- **Location**: `/server`
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT tokens

---

## **Data Models**

1. **Users**: Stores username, email, password (hashed), and role
2. **Vitals**: Health records with type (BP/Sugar/HeartRate), value, unit, and timestamp
3. **Reports**: Metadata for uploaded medical files (PDFs/Images)
4. **Shares**: Controls who can access what resources

---

## **API Routes**

| Endpoint | Purpose |
|----------|---------|
| `POST /api/auth/register` | Create new account |
| `POST /api/auth/login` | Authenticate user |
| `GET/POST /api/vitals` | Manage health records |
| `GET/POST /api/reports` | Upload & retrieve medical files |
| `POST/GET/DELETE /api/share` | Share resources with others |

---

## **User Flow**

1. **Register/Login** → Authenticate and receive JWT token
2. **Dashboard** → View health vitals as charts and manage reports
3. **Add Vitals** → Record new health measurements
4. **Upload Reports** → Add medical documents (PDFs/Images)
5. **Share** → Grant access to family/doctors via email

---

## **File Storage**
Medical reports are stored in `/server/uploads` and served as static files via the `/uploads` endpoint.

---

## **Tech Stack Summary**

| Component | Technology |
|-----------|-----------|
| Frontend | ReactJS (Vite), Recharts, CSS Modules |
| Backend | Node.js, Express.js |
| Database | SQLite (Sequelize ORM) |
| Authentication | JWT |
| File Storage | Local Filesystem (Multer) |

---

## **Setup Instructions**

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in `server/` (optional):
   ```
   PORT=5000
   JWT_SECRET=your_secret_key
   ```
   Start the server:
   ```bash
   npm run dev
   # Server runs at http://localhost:5000
   ```

2. **Setup Frontend**
   ```bash
   cd client
   npm install
   ```
   Start the client:
   ```bash
   npm run dev
   # Client runs at http://localhost:5173
   ```

3. **Access the App**
   Open your browser and navigate to `http://localhost:5173`
