package com.backendproject.backend.controller.userManagement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debug")
public class AuthDebugController {

    @GetMapping("/whoami")
    public ResponseEntity<?> whoami(Authentication auth) {
        if (auth == null) {
            return ResponseEntity.status(401).body("No authentication");
        }
        List<String> authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        return ResponseEntity.ok(new WhoAmI(auth.getName(), authorities));
    }

    record WhoAmI(String username, List<String> authorities) {}
}
