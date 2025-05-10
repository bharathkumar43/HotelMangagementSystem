package com.excelr.controller;


import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @PostMapping("/create")
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> data) {
        Map<String, Object> response = new HashMap<>();

        try {
            int amount = (int) data.get("amount"); // in rupees
            String currency = (String) data.get("currency");

            RazorpayClient razorpay = new RazorpayClient("YOUR_KEY_ID", "YOUR_KEY_SECRET");

            JSONObject options = new JSONObject();
            options.put("amount", amount * 100); // amount in paise
            options.put("currency", currency);
            options.put("receipt", "txn_123456");

            Order order = razorpay.orders.create(options);

            response.put("id", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("status", order.get("status"));

        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", e.getMessage());
        }

        return response;
    }
}
