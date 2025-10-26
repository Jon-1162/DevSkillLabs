import axios from "axios";

const BASE_URL = "https://d-ss-fast-api-server.vercel.app/api";

export async function getJobData(filename: string) {
  try {
    // console.log("DEBUG | trying getJobData filename: " + filename)
    const response = await axios.get(`${BASE_URL}/getJobData/${filename}`);
    // console.log("DEBUG | getJobData")
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
}