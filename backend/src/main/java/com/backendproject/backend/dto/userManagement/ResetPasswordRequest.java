package com.backendproject.backend.dto.userManagement;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String identifier;
    private String newPassword;
}
