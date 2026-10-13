# CampusSwap Deployment Guide

This guide outlines how to deploy the **CampusSwap** application:
- **Frontend**: [Vercel](https://vercel.com) (React + Vite + TailwindCSS)
- **Backend**: [Render](https://render.com) (Spring Boot 4.x + Java 17/25 Docker runtime)
- **Database**: Cloud MySQL (e.g., [TiDB Serverless](https://tidbcloud.com), [Aiven](https://aiven.io), [Clever Cloud](https://clever-cloud.com), or [Railway](https://railway.app))

---

## 1. Push Code to GitHub

From the project root (`D:\SAI\pro\campus`):

```bash
git add .
git commit -m "Prepare CampusSwap for Render and Vercel deployment"
git branch -M main
git push -u origin main
```

*(If your remote branch already has files, run `git pull origin main --rebase` before pushing).*

---

## 2. Cloud MySQL Database Setup

Render's free tier provides PostgreSQL, so for MySQL you can use a free cloud MySQL instance:

1. Create a free MySQL database on **TiDB Cloud Serverless**, **Aiven for MySQL**, or **Clever Cloud**.
2. Note your database credentials:
   - **Host** (e.g. `gateway01.us-east-1.prod.aws.tidbcloud.com`)
   - **Port** (usually `4000` for TiDB or `3306` for standard MySQL)
   - **Database Name** (e.g. `campusswap`)
   - **Username**
   - **Password**
3. Your JDBC connection URL will look like:
   ```
   jdbc:mysql://<host>:<port>/<database_name>?sslMode=VERIFY_IDENTITY
   ```

---

## 3. Deploy Backend on Render

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Connect your repository: `https://github.com/24eg107b51-cmyk/Barter-System`.
4. Configure the service:
   - **Name**: `campusswap-backend` (or your choice)
   - **Language / Runtime**: **Docker**
   - **Root Directory**: `backend` (or leave blank if using root `Dockerfile`)
   - **Dockerfile Path**: `./backend/Dockerfile`
   - **Docker Context**: `./backend`
   - **Instance Type**: **Free**
5. Add the **Environment Variables** under the Environment tab:

   | Variable Name | Example Value | Description |
   | :--- | :--- | :--- |
   | `PORT` | `8080` | Render port (assigned automatically, defaults to 8080) |
   | `SPRING_DATASOURCE_URL` | `jdbc:mysql://<host>:<port>/campusswap` | JDBC Connection URL to your Cloud MySQL |
   | `SPRING_DATASOURCE_USERNAME` | `root` or cloud user | Cloud database username |
   | `SPRING_DATASOURCE_PASSWORD` | `<your-cloud-db-password>` | Cloud database password |
   | `JWT_SECRET` | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` | 256-bit secret key for HMAC-SHA256 tokens |
   | `CORS_ALLOWED_ORIGINS` | `http://localhost:3000,http://localhost:5173,https://*.vercel.app` | Allowed frontend origins |

6. Click **Deploy Web Service**.
7. Once deployed, test the health check endpoint:
   ```
   https://<your-backend-app>.onrender.com/api/health
   ```
   It should return: `CampusSwap backend is running!`.

---

## 4. Deploy Frontend on Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Import your GitHub repository: `24eg107b51-cmyk/Barter-System`.
4. In the **Configure Project** screen:
   - **Framework Preset**: **Vite**
   - **Root Directory**: Click edit and select `frontend`
   - **Build Command**: `npm run build` (automatic)
   - **Output Directory**: `dist` (automatic)
5. Under **Environment Variables**, add:

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `VITE_API_BASE_URL` | `https://<your-backend-app>.onrender.com/api` | Point to your deployed Render backend |
   | `VITE_USE_MOCK` | `false` | Ensures frontend talks to live backend |

6. Click **Deploy**.
7. Once finished, Vercel will give you a public URL (e.g. `https://barter-system-xyz.vercel.app`).
8. Open your Vercel app in the browser:
   - Register a student account
   - Log in with the registered credentials
   - Confirm your JWT token and student details load successfully!
