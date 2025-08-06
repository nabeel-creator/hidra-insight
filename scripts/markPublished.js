import { ConnectDB } from "../lib/config/db.js";
import BlogModel from "../lib/models/blogModel.js";
async function markAllPublished() {
  await ConnectDB();

  const result = await BlogModel.updateMany({}, { $set: { isPublished: true } });
  console.log(`Updated ${result.modifiedCount} blogs.`);
  process.exit(); // Exit after script runs
}

markAllPublished().catch((err) => {
  console.error("Error updating blogs:", err);
  process.exit(1);
});
