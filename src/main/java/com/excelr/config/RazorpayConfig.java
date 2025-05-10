package com.excelr.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.razorpay.RazorpayClient;

@Configuration
public class RazorpayConfig {

    @Bean
    public RazorpayClient razorpayClient() throws Exception {
        return new RazorpayClient("YOUR_KEY_ID", "YOUR_KEY_SECRET");
    }
}
