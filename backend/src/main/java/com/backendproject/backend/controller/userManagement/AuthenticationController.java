package com.backendproject.backend.controller.userManagement;
import com.backendproject.backend.dto.userManagement.ForgotPasswordRequest;
import com.backendproject.backend.dto.userManagement.VerifyOtpRequest;
import com.backendproject.backend.dto.userManagement.ResetPasswordRequest;
import com.backendproject.backend.service.userManagement.impl.ForgotPasswordService;

import com.backendproject.backend.dto.userManagement.JwtAuthenticationResponse;
import com.backendproject.backend.dto.userManagement.RefreshTokenRequest;
import com.backendproject.backend.dto.userManagement.SignUpRequest;
import com.backendproject.backend.dto.userManagement.SigninRequest;
import com.backendproject.backend.model.userManagement.User;
import com.backendproject.backend.service.userManagement.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final ForgotPasswordService forgotPasswordService;

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody SignUpRequest signUpRequest) {
        return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest) {
        return ResponseEntity.ok(authenticationService.signin(signinRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }

    @PostMapping("/forgot-password/request")
    public ResponseEntity<Map<String, String>> requestReset(@RequestBody ForgotPasswordRequest req) {
        String key = forgotPasswordService.requestReset(req.getIdentifier());
        return ResponseEntity.ok(Map.of("identifier", key, "message", "OTP sent"));
    }


    @PostMapping("/forgot-password/verify")
    public ResponseEntity<String> verifyOtp(@RequestBody VerifyOtpRequest req) {
        boolean ok = forgotPasswordService.verifyOtp(req.getIdentifier(), req.getOtp());
        if (!ok) return ResponseEntity.badRequest().body("Invalid or expired OTP");
        return ResponseEntity.ok("OTP verified");
    }

    @PostMapping("/forgot-password/reset")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest req) {
        forgotPasswordService.resetPassword(req.getIdentifier(), req.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }

}
