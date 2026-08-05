import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Testing with cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Testing with api_key:", process.env.CLOUDINARY_API_KEY);

cloudinary.uploader.upload(
  "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  (err, result) => {
    if (err) {
      console.log("CLOUDINARY ERROR:", err);
    } else {
      console.log("SUCCESS! Uploaded URL:", result.secure_url);
    }
  }
);