package com.backendproject.backend.controller.userManagement;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/owner")
public class OwnerController {
    @GetMapping
    public ResponseEntity<String> sayHello() { return ResponseEntity.ok("Hello Owner"); }
}
