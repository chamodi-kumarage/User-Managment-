package com.backendproject.backend.service.userManagement.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendOtp(String to, String otp) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Your Password Reset OTP");
        msg.setText("Your OTP code is: " + otp + "\nIt will expire in 5 minutes.");
        mailSender.send(msg);
    }
}
