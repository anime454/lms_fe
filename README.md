
## Prerequisites

- **Docker**
- **Docker Compose**

## How to Run

### Step 1: Start the Services

Run the following command to start the required services:

```bash
docker-compose up -d
```

### Step 2: Configure Kong Gateway

Once the services are running, set up the Kong Gateway by creating services and routes.

#### Create Services

**Frontend Service (`fe`):**
```bash
curl -i -X POST http://localhost:8001/services/   --data name=fe   --data protocol=http   --data host=frontend   --data port=3000
```

**Backend Service (`be`):**
```bash
curl -i -X POST http://localhost:8001/services/   --data name=be   --data protocol=http   --data host=backend   --data path=/api/v1   --data port=1323
```

#### Create Routes

**Frontend Route (`fe-route`):**
```bash
curl -i -X POST http://localhost:8001/routes/   --data name=fe-route   --data service.name=fe   --data paths[]=/
```

**Backend Route (`be-route`):**
```bash
curl -i -X POST http://localhost:8001/routes/   --data name=be-route   --data service.name=be   --data paths[]=/api/v1
```

### Step 3: Access the Application

Once all configurations are complete, access the services via Kong:

- **Frontend**: [http://localhost:8000](http://localhost:8000)
- **Backend**: [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)
