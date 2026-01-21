import { v2 as cloudinary } from "cloudinary";
console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dwcbvfptd",
  api_key: process.env.CLOUDINARY_API_KEY || "494153674418449",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "r1R--jPuWMBs8AYobc6PyJQbazQ",
});

export default cloudinary;
