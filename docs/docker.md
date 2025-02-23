# Docker Folder Overview

The `docker` directory contains all the necessary configurations and scripts for setting up and deploying the application using Docker. It includes separate configurations for development and production environments, along with Dockerfiles for building backend and frontend containers.

## Folder Structure

```
docker/
├── compose.dev.yml        # Docker Compose configuration for the development environment
├── compose.prod.yml       # Docker Compose configuration for the production environment
├── compose.yml            # Base Docker Compose configuration (includes Databases, Networks, and Volumes)
├── dev.sh                 # Shell script to set up the development environment
├── Dockerfile.backend     # Dockerfile for building the backend container
├── Dockerfile.frontend    # Dockerfile for building the frontend container
├── infra.sh               # Script for setting up the infrastructure
└── prod.sh                # Shell script to set up the production environment
```

## File Descriptions

1. **`compose.dev.yml`**  
   Configures the Docker Compose setup for the development environment, including services, volumes, and networks necessary for local development.

2. **`compose.prod.yml`**  
   Configures the Docker Compose setup for production, optimizing the application for deployment with production-ready images and environment-specific configurations.

3. **`compose.yml`**  
   A base Docker Compose configuration that includes shared services (e.g., databases), as well as network and volume settings used across both development and production environments.

4. **`dev.sh`**  
   A shell script to automate the setup of the development environment, including container, volume, and network creation for local development.

5. **`Dockerfile.backend`**  
   Specifies how to build the backend service Docker image, including the installation of dependencies and backend container configuration.

6. **`Dockerfile.frontend`**  
   Specifies how to build the frontend service Docker image, outlining the setup and serving of the frontend application.

7. **`infra.sh`**  
   A shell script for setting up infrastructure-related tasks, such as creating necessary networks and volumes for the application.

8. **`prod.sh`**  
   A shell script to automate the deployment of the application in the production environment. It includes container orchestration and ensures that production-specific settings are applied.

## How to Use

1. **Development Setup:**  
   To start the application in the development environment, run:
   ```bash
   ./dev.sh
   ```

2. **Production Setup:**  
   For deploying the application in a production environment, use the `compose.prod.yml` configuration with Docker Compose:
   ```bash
   ./prod.sh
   ```

3. **Building Backend and Frontend Containers:**  
   To build the containers separately:
   - Build the backend container:
     ```bash
     docker build -f docker/Dockerfile.backend -t my-backend .
     ```
   - Build the frontend container:
     ```bash
     docker build -f docker/Dockerfile.frontend -t my-frontend .
     ```

## Additional Notes

- Ensure to review the environment variables and configuration settings in the `compose.yml` files for each environment.
- Docker configurations can be customized based on specific deployment requirements.

---
