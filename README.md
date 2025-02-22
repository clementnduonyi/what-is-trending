# wit-what-is-trending?

### **README for Telex Social Media Trend Tracker Integration**  

---

## **Telex Social Media Trend Tracker Integration**  

This integration fetches trending topics from social media platforms like Reddit and sends them to a designated Telex channel. Users can configure their preferred categories, and the integration dynamically pushes updates at scheduled intervals.  

---

## **Features**  

✅ Fetches trending topics from Reddit (more platforms soon to be added).  
✅ Allows users to set preferences for categories (e.g., politics, crypto, tech, gossip).  
✅ Automatically pushes trending topics to a Telex channel.  
✅ Configurable webhook for dynamic `channel_id`.  
✅ Intelligent error handling and status reporting.  

---

## **Setup Instructions**  

### **1. Prerequisites**  

Ensure you have the following installed:  

- **Node.js (v16 or later)**  
- **TypeScript** (`npm install -g typescript`)  
- **Express.js** (`npm install express`)  
- **Axios** (`npm install axios`)  
- **A Telex channel webhook URL**  

### **2. Clone the Repository**  

```sh
git clone https://github.com/telexintegrations/wit-what-is-trending-.git
cd wit-what-is-trending-
```

### **3. Install Dependencies**  

```sh
npm install
```

### **4. Configure Environment Variables**  

Create a `.env` file in the root directory and add your configurations:  

```ini
PORT=3000
TELEX_WEBHOOK_URL=https://telex.im/api/v1/return
```

### **5. Start the Server**  

Run the application:  

```sh
npm run dev
```

Or compile and run:  

```sh
npm run build
npm start
```

---

## **Endpoints**  

### **1. Get Social Media Trends**  

- **URL:** `/trends`  
- **Method:** `GET`  
- **Description:** Fetches trending topics based on user preferences. If no preferences are set, returns general trends.  

#### **Example Response**  

```json
{
  "trends": {
    "politics": [
      {
        "title": "Election Updates",
        "url": "https://www.reddit.com/r/politics/comments/12345"
      }
    ],
    "crypto": [],
    "tech": []
  }
}
```

---

### **2. Set User Preferences**  

- **URL:** `/preferences`  
- **Method:** `POST`  
- **Description:** Stores user-selected categories for fetching trends.  

#### **Request Body**  

```json
{
  "categories": ["politics", "crypto", "tech"]
}
```

#### **Example Response**  

```json
{
  "message": "Preferences saved successfully"
}
```

---

### **3. Retrieve Telex Integration Configuration**  

- **URL:** `/integration`  
- **Method:** `GET`  
- **Description:** Returns the configuration settings for Telex integration.  

#### **Example Response**  

```json
{
  "interval": "every 10 minutes",
  "webhook_base_url": "https://telex.im/api/v1"
}
```

---

## **How It Works**  

1. **Fetching Trends:**  
   - The app calls the Reddit API to get trending topics in various categories.  
   - If a user has preferences, only those categories are included.  
   - If no preferences are set, all available trends are sent.  

2. **Sending Data to Telex:**  
   - Every time the `/trends` endpoint is hit, the latest trends are sent to Telex.  
   - The integration reads the `channel_id` dynamically from the webhook URL.  

3. **Scheduled Updates:**  
   - The timing for sending trends is managed in `integration.json`.  
   - Telex triggers the webhook at defined intervals.  

---

## **Screenshots**  

### **1. Telex Channel Showing Trends Update**  
![Telex Trend Update](https://your-image-url.com/trend-update.png)  

### **2. Integration Configuration in Telex**  
![Telex Integration](https://your-image-url.com/integration-config.png)  

---

## **Testing the Integration**  

Run unit tests using Jest:  

```sh
npm run test
```

Check API responses with:  

```sh
curl -X GET http://localhost:3000/trends
```

---

## **Deployment**  

### **1. Deploying on a Server**  

1. Build the app:  

   ```sh
   npm run build
   ```

2. Start the production server:  

   ```sh
   npm start
   ```

### **2. Deploying on Docker**  

```sh
docker build -t telex-trend-tracker .
docker run -d -p 3000:3000 telex-trend-tracker
```

---

## **Troubleshooting**  

| Issue | Solution |
|--------|----------|
| Trends return empty arrays | Check if categories have active trends. If not, the response will be empty. |
| Webhook is not triggering | Ensure `integration.json` has the correct timing configuration. |
| Axios fetch errors | Make sure API endpoints are accessible. |

---

## **Contributing**  

Feel free to submit pull requests or open issues. Ensure you test all changes before submitting.  

---

## **License**  

MIT License.  

