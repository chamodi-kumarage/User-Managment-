package com.backendproject.backend.controller.userManagement;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/supplier")
public class SupplierController {
    @GetMapping
    public ResponseEntity<String> sayHello() { return ResponseEntity.ok("Hello Supplier"); }
    }


