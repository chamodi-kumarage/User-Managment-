package com.backendproject.backend.service.userManagement;

import com.backendproject.backend.dto.userManagement.JwtAuthenticationResponse;
import com.backendproject.backend.dto.userManagement.RefreshTokenRequest;
import com.backendproject.backend.dto.userManagement.SignUpRequest;
import com.backendproject.backend.dto.userManagement.SigninRequest;
import com.backendproject.backend.model.userManagement.User;

public interface AuthenticationService {
    User signUp(SignUpRequest signUpRequest);
    JwtAuthenticationResponse signin(SigninRequest signinRequest);
    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
