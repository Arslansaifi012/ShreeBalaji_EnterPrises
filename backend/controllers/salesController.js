
import orderModel from '../models/orderModel.js'

const salesController = async (req, res) => {

  try {

    const sales = await orderModel.aggregate([
      // ✔ Only take orders which have createdAt field
      {
        $match: {
          createdAt: { $exists: true }
        }
      },

      // ✔ Group orders by month
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$amount" },
          totalOrders: { $sum: 1 }
        }
      },

      // ✔ Format output
      {
        $project: {
          month: "$_id",
          totalSales: 1,
          totalOrders: 1,
          _id: 0
        }
      },

      // ✔ Sort by month ASC (Jan → Dec)
      { $sort: { month: 1 } }
    ]);

    res.json({
      success: true,
      sales
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching sales" });
  }
}

export default salesController ;

