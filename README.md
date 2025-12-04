# MyGoals API - Installation & Setup Guide

## 📦 Installation & Setup

Follow these steps to get the project up and running:

```bash
# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env file with your database credentials, JWT secret, and any other required variables

# 4. Setup database
npx sequelize db:create
npx sequelize db:migrate

# 5. Start the application (development mode)
npm run dev
