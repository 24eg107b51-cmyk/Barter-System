package com.bartersystem.user;

import com.bartersystem.user.dto.AuthResponse;
import com.bartersystem.user.dto.LoginRequest;
import com.bartersystem.user.dto.RegisterRequest;
import com.bartersystem.user.dto.StudentResponse;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<StudentResponse> register(@Valid @RequestBody RegisterRequest request) {
        StudentResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentStudent(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> details = new HashMap<>();
        details.put("email", jwt.getSubject());
        details.put("studentId", jwt.getClaim("studentId"));
        details.put("fullName", jwt.getClaim("fullName"));
        return ResponseEntity.ok(details);
    }
}
