
import express from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import puppeteer from "puppeteer";
const OrderPdfController = async(req, res) =>{
    try {
        const {orderId} = req.params ;
      

        const order = await orderModel.findById(orderId) ;
        const user = await userModel.findById(order.userId) ;
      
        // console.log(order.address)
        // console.log(order.userId)
        if (!order) return res.status(404).json({ error: "Order not found" }) ;

        const html = `<style>
.customer-info {
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 400px;
}

.customer-info h3 {
  color: #232f3e;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.customer-info p {
  margin: 12px 0;
  line-height: 1.4;
  color: #333;
  font-size: 14px;
}

.customer-info p:first-of-type {
  margin-top: 0;
}

.customer-info p:last-of-type {
  margin-bottom: 0;
}

.customer-info b {
  color: #232f3e;
  font-weight: 600;
}

.customer-info br {
  margin-bottom: 4px;
  display: block;
  content: "";
}
</style>

<!-- Customer Details (Amazon Style) -->
<div class="customer-info">
  <h3>Customer Details</h3>

  <p><b>${order.user?.name || user.name}</b></p>

  <p>
    ${order.user?.address?.street || order.address.street}<br />
    ${order.user?.address?.city ||  order.address.city}, 
    ${order.user?.address?.state || order.address.state} - 
    ${order.user?.address?.pincode || order.address.zipcode}
  </p>

  <p><b>Phone:</b> ${order.user?.phone || "N/A"}</p>
</div>

` ;


      const broswer = await puppeteer.launch({
        headless: true,
        args:["--no-sandbox", "--disable-setuid-sandbox"]
      }) ;

      const page = await broswer.newPage() ;
      await page.setContent(html, { waitUntil: "networkidle0" }) ;

      const pdfBuffer = await page.pdf({format:"A4"}) ;
      broswer.close() ;

      res.set({
         "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=order_${orderId}.pdf`,
      "Content-Length": pdfBuffer.length,
      }) ;

      res.send(pdfBuffer) ;
        
    } catch (error) {
        console.log('ordercontroler Error', error.message) ;
        res.status(500).json({ error: "PDF generation failed" });
    }
}

export default OrderPdfController ;