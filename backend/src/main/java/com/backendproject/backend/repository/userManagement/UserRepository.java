package com.backendproject.backend.repository.userManagement;

import com.backendproject.backend.model.userManagement.Role;
import com.backendproject.backend.model.userManagement.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    User findByRole(Role role);

    boolean existsByEmail(String email);
    List<User> findByRoleNot(Role role);
}
