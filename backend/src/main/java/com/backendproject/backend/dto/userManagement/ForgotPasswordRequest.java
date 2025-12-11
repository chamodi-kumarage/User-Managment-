package com.backendproject.backend.dto.userManagement;

import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private String identifier; // email or phone
}
