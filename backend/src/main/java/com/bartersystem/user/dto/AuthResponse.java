package com.bartersystem.user.dto;

public class AuthResponse {

    private String token;
    private String tokenType;
    private Long expiresIn;
    private StudentResponse student;

    public AuthResponse() {
    }

    public AuthResponse(String token, String tokenType, Long expiresIn, StudentResponse student) {
        this.token = token;
        this.tokenType = tokenType;
        this.expiresIn = expiresIn;
        this.student = student;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public StudentResponse getStudent() {
        return student;
    }

    public StudentResponse getUser() {
        return student;
    }

    public void setStudent(StudentResponse student) {
        this.student = student;
    }
}
