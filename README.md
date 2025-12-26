# Velloko - Lead Validation System

A production-ready MERN application for managing lead sources and validating leads via API.

## 🧱 Tech Stack

-   **Frontend**: React, TypeScript, Vanilla CSS (Premium Design), Context API, Axios
-   **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), Winston Logger, Nodemailer

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14+)
-   MongoDB (running locally or cloud URI)

### Setup Backend

1. Navigate to `backend` folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure Environment:
    - Rename `.env.example` to `.env` (or use provided `.env`)
    - Update `MONGO_URI` if needed.
    - Update `EMAIL_USER` and `EMAIL_PASS` for email functionality.
4. Run server:
    ```bash
    npm run dev
    ```
    Server starts on port 5000.

### Setup Frontend

1. Navigate to `frontend` folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run development server:
    ```bash
    npm run dev
    ```
    App opens on http://localhost:5173.

## 📖 API Documentation

### Public API (Lead Validation)

**Endpoint**: `POST http://localhost:5000/api/leads/validate`

**Headers**: `Content-Type: application/json`

**Body**:

```json
{
    "sourceId": "generated_source_uuid",
    "apiKey": "vk_generated_api_key",
    "email": "test@example.com",
    "phone": "+1234567890"
}
```

**Response**:

```json
{
  "status": "success",
  "data": {
    "lead": { ... },
    "validationStatus": "valid" // or "invalid"
  }
}
```

### Authentication Endpoints (Internal)

-   `POST /api/auth/signup` - Register
-   `POST /api/auth/login` - Login
-   `GET /api/auth/verify-email` - Verify Email

### Sources Endpoints (Internal, Protected)

-   `POST /api/sources` - Create Source
-   `GET /api/sources` - List Sources

## 🏗 Architecture

### Backend

-   **Layered Structure**: Routes -> Controllers -> Services -> Models
-   **Middleware**: RequestID injection, Winston Request Logging, JWT Auth protection.
-   **Error Handling**: Global error handler with operational vs programming error distinction.

### Frontend

-   **State**: Global AuthContext.
-   **Services**: Abstracted API calls in `src/services`.
-   **UI**: Custom Vanilla CSS design with responsive dashboard and dark mode aesthetic.
