package com.backendproject.backend.dto.userManagement;

import com.backendproject.backend.model.userManagement.Gender;
import com.backendproject.backend.model.userManagement.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private String email;
    private String password;
    private LocalDate dateOfBirth;
    private Gender gender; // MALE/FEMALE/OTHER
    private Role role;     // CUSTOMER/SUPPLIER/DELIVERY/PRODUCTION/QUALITY/OWNER
}
