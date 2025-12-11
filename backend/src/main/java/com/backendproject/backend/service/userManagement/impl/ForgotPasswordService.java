package com.backendproject.backend.service.userManagement.impl;

import com.backendproject.backend.model.userManagement.User;
import com.backendproject.backend.repository.userManagement.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {

    private final UserRepository userRepository;
    private final OtpService otpService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public String requestReset(String identifier) {
        User user = userRepository.findByEmail(identifier)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String otp = otpService.generateOtp(user.getEmail().toLowerCase()); // normalize
        emailService.sendOtp(user.getEmail(), otp);

        return user.getEmail().toLowerCase(); // send back identifier to use later
    }


    public boolean verifyOtp(String identifier, String otp) {
        return otpService.validateOtp(identifier, otp);
    }

    public void resetPassword(String identifier, String newPassword) {
        User user = userRepository.findByEmail(identifier)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        otpService.clearOtp(identifier);
    }
}
