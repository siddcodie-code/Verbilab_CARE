# CARE Backend API

Python Flask backend for the CARE (Call Audit & Conduct Risk Engine) platform.

## Features

✅ RESTful API endpoints for frontend integration
✅ File upload handling (audio files)
✅ Dashboard statistics
✅ Call management (CRUD operations)
✅ Agent management
✅ Search functionality
✅ CORS enabled for React frontend
✅ Sample data for testing

## Installation

```bash
# Install dependencies
pip install -r requirements.txt --break-system-packages

# Run the server
python app.py
```

Server will start on: **http://localhost:5000**

## API Endpoints

### Health & Stats
- `GET /api/health` - Health check
- `GET /api/dashboard/stats` - Dashboard statistics

### Calls
- `GET /api/calls` - Get all calls (supports ?status=&limit= filters)
- `GET /api/calls/<call_id>` - Get call details
- `PUT /api/calls/<call_id>/score` - Update call score

### Agents
- `GET /api/agents` - Get all agents
- `GET /api/agents/<agent_id>` - Get agent details

### File Upload
- `POST /api/upload` - Upload single audio file
- `POST /api/upload/batch` - Upload multiple files

### Analytics & Search
- `GET /api/analytics/trends` - Get trend data
- `GET /api/search?q=<query>` - Search calls, agents, customers

## Upload API Usage

### Single File Upload

```bash
curl -X POST http://localhost:5000/api/upload \
  -F "file=@path/to/audio.mp3" \
  -F "customer_id=CUST1001" \
  -F "loan_id=LOAN5001" \
  -F "agent_id=1"
```

### Response
```json
{
  "message": "File uploaded successfully",
  "call": {
    "id": "CALL-9841",
    "status": "Queued",
    "audio_file": "audio.mp3",
    ...
  }
}
```

## Connecting with React Frontend

### Update Frontend API Calls

In your React app, create an API service file:

```javascript
// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const getDashboardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
  return response.json();
};

export const getCalls = async (limit = 20) => {
  const response = await fetch(`${API_BASE_URL}/calls?limit=${limit}`);
  return response.json();
};

export const uploadFile = async (file, metadata) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('customer_id', metadata.customer_id);
  formData.append('loan_id', metadata.loan_id);
  formData.append('agent_id', metadata.agent_id);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  
  return response.json();
};
```

## Sample Data

The backend starts with:
- **20 sample call records**
- **5 sample agents**
- Random scores, statuses, and metadata

## File Upload Specs

- **Allowed formats**: mp3, wav, m4a, ogg
- **Max file size**: 500MB
- **Upload folder**: `./uploads/`
- **Batch upload**: Supported

## Development

```bash
# Start backend
python app.py

# Start frontend (in separate terminal)
cd ../care-platform
npm start
```

Both servers will run concurrently:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Project Structure

```
care-backend/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── .env               # Environment variables
├── uploads/           # Audio files storage
└── README.md          # This file
```

## Next Steps

1. ✅ Basic API endpoints created
2. 🚧 Integrate with React frontend
3. 🚧 Add database (SQLite/PostgreSQL)
4. 🚧 Implement audio transcription
5. 🚧 Add AI scoring engine
6. 🚧 Authentication & authorization

---

**Created**: April 8, 2026  
**Developer**: Verbilab Engineering Team
