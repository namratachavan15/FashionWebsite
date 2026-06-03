package com.example.Product.Controller;

import com.example.Product.Config.RazorpayConfig;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment")
@CrossOrigin("*")
public class PaymentController {

    @PostMapping("/create-order")
    public String createOrder(@RequestBody Map<String, Object> data) throws Exception {

        int amount = (int) data.get("amount");

        RazorpayClient client =
                new RazorpayClient(RazorpayConfig.KEY_ID, RazorpayConfig.KEY_SECRET);

        JSONObject options = new JSONObject();
        options.put("amount", amount * 100); // paisa
        options.put("currency", "INR");
        options.put("payment_capture", 1);

        Order order = client.orders.create(options);

        return order.toString();
    }
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {

        String orderId = data.get("razorpay_order_id");
        String paymentId = data.get("razorpay_payment_id");
        String signature = data.get("razorpay_signature");

        try {
            RazorpayClient client =
                    new RazorpayClient(RazorpayConfig.KEY_ID, RazorpayConfig.KEY_SECRET);

            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", orderId);
            options.put("razorpay_payment_id", paymentId);
            options.put("razorpay_signature", signature);

            boolean status = Utils.verifyPaymentSignature(options, RazorpayConfig.KEY_SECRET);

            if (status) {
                return ResponseEntity.ok("Payment Verified");
            } else {
                return ResponseEntity.status(400).body("Invalid Payment");
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
