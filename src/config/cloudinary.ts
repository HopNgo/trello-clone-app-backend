import { v2 as cloudinary } from "cloudinary";
import env from "./enviroment";

cloudinary.config({
  cloud_name: env.CLOUNDINARY_CLOUD_NAME,
  api_key: env.CLOUNDINARY_API_KEY,
  api_secret: env.CLOUNDINARY_API_SECRET,
});

export default cloudinary;
