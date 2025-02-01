# Next.js Project Setup

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies
Using npm:
```bash
npm install
```
Using Yarn:
```bash
yarn install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add necessary environment variables:
```bash
DATABASE_URL=<your-database-url>
```

### 4. Run the Development Server
Using npm:
```bash
npm run dev
```
Using Yarn:
```bash
yarn dev
```

Your project should now be running on [http://localhost:3000](http://localhost:3000).

### 5. Build for Production
```bash
npm run build
npm run start
```


---

### Troubleshooting
- If you encounter permission issues, try running:
  ```bash
  sudo chown -R $USER:$GROUP .
  ```
- Ensure all required environment variables are correctly set in `.env.local`.

For more details, refer to the [Next.js documentation](https://nextjs.org/docs).
