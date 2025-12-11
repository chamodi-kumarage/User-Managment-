package com.backendproject.backend.dto.userManagement;

import lombok.Data;

@Data
public class SigninRequest {
    private String email;
    private String password;
}
