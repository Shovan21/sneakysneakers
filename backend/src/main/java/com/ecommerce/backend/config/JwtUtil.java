package com.ecommerce.backend.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    // Use a static key so tokens remain valid across server restarts.
    // In a real application, this should be injected from application.properties
    private final String SECRET_KEY = "mySuperSecretKeyForJwtThatIsLongEnoughToWorkWithHS256Algorithm";
    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    private final int expirationMs = 86400000; // 1 day

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + expirationMs))
                .signWith(key)
                .compact();
    }

    // ADD THIS METHOD: To extract the username from the token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}