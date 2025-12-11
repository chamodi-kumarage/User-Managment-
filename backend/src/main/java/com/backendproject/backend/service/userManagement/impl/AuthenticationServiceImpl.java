package com.backendproject.backend.service.userManagement.impl;

import com.backendproject.backend.dto.userManagement.JwtAuthenticationResponse;
import com.backendproject.backend.dto.userManagement.RefreshTokenRequest;
import com.backendproject.backend.dto.userManagement.SignUpRequest;
import com.backendproject.backend.dto.userManagement.SigninRequest;
import com.backendproject.backend.model.userManagement.User;
import com.backendproject.backend.repository.userManagement.UserRepository;
import com.backendproject.backend.service.userManagement.AuthenticationService;
import com.backendproject.backend.service.userManagement.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Override
    public User signUp(SignUpRequest req) {
        User user = User.builder()
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .address(req.getAddress())
                .phoneNumber(req.getPhoneNumber())
                .email(req.getEmail())
                .dateOfBirth(req.getDateOfBirth())
                .gender(req.getGender())
                .role(req.getRole())
                .password(passwordEncoder.encode(req.getPassword()))
                .build();
        return userRepository.save(user);
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );
        var user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email"));

        var jwt = jwtService.generateToken(user);
        var refresh = jwtService.generateRefreshToken(new HashMap<>(), user);

        var resp = new JwtAuthenticationResponse();
        resp.setToken(jwt);
        resp.setRefreshToken(refresh);
        return resp;
    }

    @Override
    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest request) {
        String userEmail = jwtService.extractUsername(request.getToken());
        var user = userRepository.findByEmail(userEmail).orElseThrow();

        if (jwtService.isTokenValid(request.getToken(), user)) {
            var jwt = jwtService.generateToken(user);
            var resp = new JwtAuthenticationResponse();
            resp.setToken(jwt);
            resp.setRefreshToken(request.getToken());
            return resp;
        }
        throw new IllegalArgumentException("Invalid refresh token");
    }
}
