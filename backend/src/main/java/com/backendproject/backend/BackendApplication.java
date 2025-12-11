package com.backendproject.backend;

import com.backendproject.backend.model.userManagement.Gender;
import com.backendproject.backend.model.userManagement.Role;
import com.backendproject.backend.model.userManagement.User;
import com.backendproject.backend.repository.userManagement.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    private final UserRepository userRepository;

    public BackendApplication(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) {
        var owner = userRepository.findByRole(Role.OWNER);
        if (owner == null) {
            User u = User.builder()
                    .email("shopowner@gmail.com")
                    .firstName("Shop")
                    .lastName("Owner")
                    .role(Role.OWNER)
                    .gender(Gender.MALE)
                    .password(new BCryptPasswordEncoder().encode("shopowner"))
                    .build();
            userRepository.save(u);
        }

        // Create production user for testing
        var productionUser = userRepository.findByRole(Role.PRODUCTION);
        if (productionUser == null) {
            User u = User.builder()
                    .email("production@test.com")
                    .firstName("Production")
                    .lastName("Staff")
                    .role(Role.PRODUCTION)
                    .gender(Gender.MALE)
                    .password(new BCryptPasswordEncoder().encode("production"))
                    .build();
            userRepository.save(u);
        }
    }
}
