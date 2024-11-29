
# Puppeteer Express API Inside of Docker

This project is an Express.js application bundled with Puppeteer for web automation. It runs inside a Docker container and exposes an API with two endpoints for web scraping tasks: taking screenshots and extracting webpage titles.

## Features

- **Screenshot Endpoint**: Takes a screenshot of a given webpage URL and returns it as a PNG.
- **Title Scraper Endpoint**: Scrapes and returns the title of a given webpage.
- Built using Puppeteer, which automates Chromium for headless browser tasks.
- Packaged in a Docker container for easy deployment.

## Prerequisites

- **Docker**: Ensure Docker is installed on your system.
- **Node.js**: Optional, if running outside Docker.

## Endpoints

### 1. `/screenshot`

**Method**: `POST`  
**Description**: Takes a screenshot of a webpage.  
**Request Body**:
```json
{
    "url": "https://example.com"
}
```
**Response**: PNG image of the webpage.

### 2. `/scrapeTitle`

**Method**: `POST`  
**Description**: Extracts the title of a webpage.  
**Request Body**:
```json
{
    "url": "https://example.com"
}
```
**Response**: The title of the webpage as plain text.

## How to Use

### 1. Clone the Repository

```bash
git clone <repository-url>
cd puppeteer-express-api
```

### 2. Run with Docker

1. **Build the Docker Image**:

   ```bash
   docker build -t puppeteer-express-api .
   ```

2. **Run the Container**:

   ```bash
   docker run -p 3000:3000 puppeteer-express-api
   ```

3. Access the API at `http://localhost:3000`.

### 3. Run Locally (Without Docker)

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start the Application**:

   ```bash
   node app.js
   ```

3. Access the API at `http://localhost:3000`.


## Example Requests

### Screenshot Request
Use `curl` to send a POST request:
```bash
curl -X POST -H "Content-Type: application/json"     -d '{"url": "https://example.com"}'     http://localhost:3000/screenshot > screenshot.png
```

### Title Scrape Request
Use `curl` to send a POST request:
```bash
curl -X POST -H "Content-Type: application/json"     -d '{"url": "https://example.com"}'     http://localhost:3000/scrapeTitle
```

## Notes

- **Security**: Ensure the API is secured before exposing it publicly to prevent misuse.
- **Resource Limits**: Puppeteer can be resource-intensive. Allocate sufficient memory when deploying.

## License

This project is licensed under the MIT License.
