package com.backendproject.backend.dto.userManagement;

import lombok.Data;

@Data
public class VerifyOtpRequest {
    private String identifier;
    private String otp;
}
