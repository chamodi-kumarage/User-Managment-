package com.backendproject.backend.dto.userManagement;

import com.backendproject.backend.model.userManagement.Gender;
import com.backendproject.backend.model.userManagement.Role;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDto {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private String phoneNumber;
    private String address;
    private Gender gender;
    private LocalDate dateOfBirth;
}
