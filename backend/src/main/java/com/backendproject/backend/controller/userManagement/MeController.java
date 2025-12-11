package com.backendproject.backend.controller.userManagement;

import com.backendproject.backend.dto.userManagement.UpdateMeRequest;
import com.backendproject.backend.model.userManagement.User;
import com.backendproject.backend.repository.userManagement.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
public class MeController {

    private final UserRepository userRepository;

    // -------- GET current profile --------
    @GetMapping("/api/v1/auth/me")
    public ResponseEntity<MeDto> me(@AuthenticationPrincipal UserDetails principal) {
        User u = userRepository.findByEmail(principal.getUsername())
                .orElseThrow();
        return ResponseEntity.ok(toDto(u));
    }

    // -------- FULL UPDATE (PUT) --------
    @PutMapping("/api/v1/auth/me")
    public ResponseEntity<MeDto> updateMe(
            @AuthenticationPrincipal UserDetails principal,
            @Valid @RequestBody UpdateMeRequest req
    ) {
        User u = userRepository.findByEmail(principal.getUsername())
                .orElseThrow();

        // Treat as full/replace-style update (require non-null fields on client)
        if (req.getFirstName() != null) u.setFirstName(req.getFirstName());
        if (req.getLastName() != null)  u.setLastName(req.getLastName());
        u.setAddress(req.getAddress());
        u.setPhoneNumber(req.getPhoneNumber());
        u.setDateOfBirth(req.getDateOfBirth());
        u.setGender(req.getGender());

        User saved = userRepository.save(u);
        return ResponseEntity.ok(toDto(saved));
    }

    // -------- PARTIAL UPDATE (PATCH) --------
    @PatchMapping("/api/v1/auth/me")
    public ResponseEntity<MeDto> patchMe(
            @AuthenticationPrincipal UserDetails principal,
            @RequestBody UpdateMeRequest req
    ) {
        User u = userRepository.findByEmail(principal.getUsername())
                .orElseThrow();

        if (req.getFirstName() != null)   u.setFirstName(req.getFirstName());
        if (req.getLastName() != null)    u.setLastName(req.getLastName());
        if (req.getAddress() != null)     u.setAddress(req.getAddress());
        if (req.getPhoneNumber() != null) u.setPhoneNumber(req.getPhoneNumber());
        if (req.getDateOfBirth() != null) u.setDateOfBirth(req.getDateOfBirth());
        if (req.getGender() != null)      u.setGender(req.getGender());

        User saved = userRepository.save(u);
        return ResponseEntity.ok(toDto(saved));
    }

    // -------- DELETE ACCOUNT --------
    @DeleteMapping("/api/v1/auth/me")
    public ResponseEntity<Void> deleteMe(@AuthenticationPrincipal UserDetails principal) {
        User u = userRepository.findByEmail(principal.getUsername())
                .orElseThrow();

        try {
            userRepository.delete(u);
        } catch (DataIntegrityViolationException ex) {
            // If other tables reference coco_user with FK constraints
            return ResponseEntity.status(409).build(); // Conflict
        }
        return ResponseEntity.noContent().build();
    }

    private MeDto toDto(User u) {
        MeDto dto = new MeDto();
        dto.setId(u.getId());
        dto.setEmail(u.getEmail());
        dto.setFirstName(u.getFirstName());
        dto.setLastName(u.getLastName());
        dto.setRole(u.getRole().name());
        dto.setAddress(u.getAddress());
        dto.setPhoneNumber(u.getPhoneNumber());
        dto.setDateOfBirth(u.getDateOfBirth() != null ? u.getDateOfBirth().toString() : null);
        dto.setGender(u.getGender() != null ? u.getGender().name() : null);
        return dto;
    }

    @Data
    static class MeDto {
        private Integer id;
        private String email;
        private String firstName;
        private String lastName;
        private String role;

        private String address;
        private String phoneNumber;
        private String dateOfBirth; // ISO string
        private String gender;      // enum name
    }
}
