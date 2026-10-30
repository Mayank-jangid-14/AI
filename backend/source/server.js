
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config({ path: path.join(__dirname, ".env") });

const { app, db } = require("../other/app.cjs");
// 1. Parse the environment port
const PORT = parseInt(process.env.PORT, 10) || 3000;

// 2. Validate using uppercase PORT
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
}

// 3. Make sure your app.listen uses uppercase PORT as well (Line 18)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});


const server = app.listen(port, "127.0.0.1", () => {
  console.log(JSON.stringify({
    level: "info",
    message: "Snabbler AI backend listening",
    host: "127.0.0.1",
    port,
  }));
});

server.on("error", error => {
  console.error(JSON.stringify({ level: "error", message: "Backend could not start", error: error.message }));
  process.exitCode = 1;
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => {
      db.close();
      process.exit(0);
    });
  });
}
