package com.backendproject.backend.service.userManagement.impl;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {
    private final Map<String, OtpEntry> otpStore = new ConcurrentHashMap<>();
    private final Random random = new Random();

    public String generateOtp(String identifier) {
        String key = identifier.trim().toLowerCase();
        String otp = String.valueOf(100000 + random.nextInt(900000));
        otpStore.put(key, new OtpEntry(otp, Instant.now().plusSeconds(300)));
        return otp;
    }

    public boolean validateOtp(String identifier, String otp) {
        String key = identifier.trim().toLowerCase();
        OtpEntry entry = otpStore.get(key);
        if (entry == null) return false;
        if (Instant.now().isAfter(entry.expiry)) return false;
        return entry.otp.equals(otp);
    }

    public void clearOtp(String identifier) {
        otpStore.remove(identifier.trim().toLowerCase());
    }


    private record OtpEntry(String otp, Instant expiry) {}
}
