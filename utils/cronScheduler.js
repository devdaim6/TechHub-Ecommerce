import cron from "node-cron";
import Product from "@/models/product";
export const cronScheduler = async () => {
  cron.schedule("* * * * *", async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const productsToUpdate = await Product.find({
        createdAt: { $lte: thirtyDaysAgo },
        newest: true,
      });

      for (const product of productsToUpdate) {
        await Product.updateOne(
          { _id: product._id },
          { $set: { newest: false } },
          { new: true }
        );
      }

      console.log("Newest property updated successfully.");
    } catch (error) {
      console.error("Error updating newest property:", error);
    }
  });
};
