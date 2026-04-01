# Lead Validation System

LeadValidator is a comprehensive full-stack application designed for managing and validating leads. It features a secure authentication system, a dashboard to manage lead sources, and a public API for validating leads from external sources.

## 🚀 Technology Stack

### Backend

-   **Framework:** Node.js with Express.js
-   **Database:** MongoDB with Mongoose
-   **Language:** TypeScript
-   **Authentication:** JSON Web Tokens (JWT)
-   **Logging:** Winston
-   **Security:** Helmet, CORS

### Frontend

-   **Framework:** React with Vite
-   **Styling:** Tailwind CSS
-   **Language:** TypeScript
-   **State/Routing:** React Router DOM
-   **HTTP Client:** Axios
-   **Notifications:** React Toastify
-   **Icons:** Lucide React

## 📂 Project Structure

```
Velloko/
├── backend/            # Express.js Backend
│   ├── src/
│   │   ├── config/     # Environment & DB config
│   │   ├── controllers/# Route controllers
│   │   ├── middlewares/# Auth & request logging
│   │   ├── models/     # Mongoose models (User, Source, Lead)
│   │   ├── routes/     # API routes (Auth, Source, Lead)
│   │   ├── services/   # Business logic
│   │   └── app.ts      # App entry point
├── frontend/           # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global state (Auth)
│   │   ├── pages/      # Application pages
│   │   ├── services/   # API integration
│   │   └── App.tsx     # Main component & Routing
└── README.md           # This file
```

## �️ Getting Started

### Prerequisites

-   Node.js (v16+)
-   MongoDB (Local or Atlas URI)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd Velloko
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    npm install
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```

### Environment Variables

**Backend (`backend/.env`):**
Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/velloko_db # Or your Atlas URI
JWT_SECRET=your_super_secret_key
NODE_ENV=development
EMAIL_USER=your_email@gmail.com           # For sending verification emails
EMAIL_PASS=your_email_app_password
CLIENT_URL=http://localhost:5173          # Frontend URL
```

**Frontend (`frontend/.env`):**
(Optional) If you have specific frontend environment variables (e.g., API base URL).

### Running the Application

1.  **Start the Backend:**

    ```bash
    cd backend
    npm run dev
    ```

    The server will start on `http://localhost:5000`.

2.  **Start the Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    The application will run on `http://localhost:5173`.

## API Documentation

### Authentication (`/api/auth`)

| Method | Endpoint                  | Description                                       | Protected |
| :----- | :------------------------ | :------------------------------------------------ | :-------- |
| `POST` | `/signup`                 | Register a new user (`name`, `email`, `password`) | No        |
| `POST` | `/login`                  | Login user (`email`, `password`)                  | No        |
| `GET`  | `/verify-email?token=...` | Verify user email address                         | No        |
| `POST` | `/resend-verify`          | Resend verification email                         | No        |

### Sources (`/api/sources`)

| Method | Endpoint | Description                             | Protected |
| :----- | :------- | :-------------------------------------- | :-------- |
| `POST` | `/`      | Create a new source (`sourceName`)      | **Yes**   |
| `GET`  | `/`      | List all sources for the logged-in user | **Yes**   |

### Leads (`/api/leads`)

| Method | Endpoint                | Description                                | Protected |
| :----- | :---------------------- | :----------------------------------------- | :-------- |
| `POST` | `/public/validate-lead` | Validate & save a lead (requires `apiKey`) | No        |
| `GET`  | `/`                     | Get all leads for the logged-in user       | **Yes**   |
| `POST` | `/manual`               | Manually validate a lead from dashboard    | **Yes**   |
| `GET`  | `/source/:sourceId`     | Get leads filtered by specific Source ID   | **Yes**   |

### 🔍 How to Use the Public Validation API

To use the public validation endpoint from an external application, send a **POST** request to:
`http://localhost:5000/api/leads/public/validate-lead`

**Headers:**

-   `Content-Type: application/json`
-   `x-api-key`: `YOUR_SOURCE_API_KEY` (Obtained from the Dashboard)

**Body:**

```json
{
    "email": "user@example.com",
    "phone": "1234567890",
    "sourceId": "YOUR_SOURCE_ID"
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "validationStatus": "valid",
        "message": "Lead processed successfully"
    }
}
```

## Frontend Usage

1.  **Login/Signup:** Create an account and log in.
2.  **Dashboard Overview:** View aggregate stats of your leads.
3.  **Source Management:** Create "Sources" (e.g., "Facebook Ads", "Landing Page"). Each source generates a unique **Source ID** and **API Key**.
4.  **Leads:** View the table of leads collected. Use the filters to view leads by source.
5.  **Integration:** Use the API Key and Source ID to send leads from your external sites to Velloko.
