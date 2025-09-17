// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 4000;

// Connecting to database
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Allowed origins for CORS
// const allowedOrigins = [
//       "http://localhost:3000",
//       "https://study-notion-web-app-frontend.vercel.app", // replace with your actual frontend URL
      
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );


const allowedOrigins = [
  "http://localhost:3000",
  "https://study-notion-web-app-frontend.vercel.app", // your actual frontend URL
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connecting to cloudinary
cloudinaryConnect();

// API routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Remove frontend serving for pure backend deployment
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
//   });
// }

// Testing route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "🚀 Backend server is up and running on Render",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ success: false, message: err.message });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("⚠️ Shutting down gracefully...");
  if (database.disconnect) await database.disconnect();
  process.exit(0);
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT}`);
});

module.exports = app;
