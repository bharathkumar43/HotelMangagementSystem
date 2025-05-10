package com.excelr.service;


import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    private RazorpayClient razorpayClient;

    public PaymentService() throws Exception {
        this.razorpayClient = new RazorpayClient("YOUR_KEY_ID", "YOUR_KEY_SECRET");
    }

    public Map<String, Object> createOrder(int amount, String currency) {
        Map<String, Object> response = new HashMap<>();

        try {
            JSONObject options = new JSONObject();
            options.put("amount", amount * 100); // convert to paise
            options.put("currency", currency);
            options.put("receipt", "txn_" + System.currentTimeMillis());

            Order order = razorpayClient.orders.create(options);

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

