package com.backendproject.backend.dto.userManagement;

import com.backendproject.backend.model.userManagement.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

/**
 * Used for PUT/PATCH updates on /api/v1/auth/me.
 * For PATCH, fields may be null (ignored). For PUT, you should send full set.
 */
@Data
public class UpdateMeRequest {

    // Required for PUT (not enforced here to keep PATCH flexible)
    private String firstName;
    private String lastName;

    private String address;

    @Pattern(regexp = "^[0-9+\\-()\\s]{7,20}$",
            message = "Phone number format is invalid")
    private String phoneNumber;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    private Gender gender; // MALE/FEMALE/OTHER
}
