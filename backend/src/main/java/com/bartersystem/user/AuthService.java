package com.bartersystem.user;

import com.bartersystem.user.dto.AuthResponse;
import com.bartersystem.user.dto.LoginRequest;
import com.bartersystem.user.dto.RegisterRequest;
import com.bartersystem.user.dto.StudentResponse;
import com.bartersystem.user.exception.DuplicateEmailException;
import com.bartersystem.user.exception.InvalidCredentialsException;
import com.bartersystem.user.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            StudentRepository studentRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public StudentResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (studentRepository.existsByEmail(normalizedEmail)) {
            throw new DuplicateEmailException("Email is already registered");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        Student student = new Student(
                request.getFullName().trim(),
                normalizedEmail,
                encodedPassword);

        Student saved = studentRepository.save(student);

        return new StudentResponse(saved.getId(), saved.getFullName(), saved.getEmail());
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        Student student = studentRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), student.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(student);
        StudentResponse studentResponse = new StudentResponse(
                student.getId(),
                student.getFullName(),
                student.getEmail());

        return new AuthResponse(token, "Bearer", jwtService.getExpirationSeconds(), studentResponse);
    }
}
