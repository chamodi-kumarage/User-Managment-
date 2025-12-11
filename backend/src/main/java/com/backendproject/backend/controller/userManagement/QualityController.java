package com.backendproject.backend.controller.userManagement;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quality")
public class QualityController {
    @GetMapping
    public ResponseEntity<String> sayHello() { return ResponseEntity.ok("Hello Quality inspector"); }
}
