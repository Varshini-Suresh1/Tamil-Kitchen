package utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

import models.User;
import DAO.UsersDAO;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTUtil {
	static String  SECRET_KEY = System.getenv("JWT_SECRET_KEY");
	
    private static final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256; 

    // Expiration times in milliseconds
    private static final long ACCESS_TOKEN_EXPIRATION = 1 * 60 * 60 * 1000L; // 1 hour in milliseconds
    private static final long REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000L; // 7 days in milliseconds



    public static String createAccessToken(int userId, int role, int restaurantId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("role", role);
        claims.put("restaurantId", restaurantId);
        long currentTimeMillis = System.currentTimeMillis();
        
        //Jwts.builder() method expects the setIssuedAt() and setExpiration() methods to receive Date objects
        Date creationDate = new Date(currentTimeMillis);
        Date expirationDate = new Date(currentTimeMillis + ACCESS_TOKEN_EXPIRATION); 

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(creationDate)
                .setExpiration(expirationDate)
                .signWith(SIGNATURE_ALGORITHM, SECRET_KEY.getBytes(StandardCharsets.UTF_8))
                .compact();
    }

   
    
    
    public static String createRefreshToken(int userId) {
        long currentTimeMillis = System.currentTimeMillis();
        Date creationDate = new Date(currentTimeMillis);
        Date expirationDate = new Date(currentTimeMillis + REFRESH_TOKEN_EXPIRATION); 

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(creationDate)
                .setExpiration(expirationDate)
                .signWith(SIGNATURE_ALGORITHM, SECRET_KEY.getBytes(StandardCharsets.UTF_8))
                .compact();
    }

    
    
    public static Claims validateJWT(String jwt) {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8))
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (SignatureException e) {
            System.out.println("JWT signature does not match: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("JWT is expired: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("JWT validation failed: " + e.getMessage());
        }
        return null;
    }

    
    
    public static User validateTokenAndGetUser(String token) {
        Claims claims = validateJWT(token);
        if (claims == null) {
            return null; 
        }

        int userId = (Integer) claims.get("userId");
        int role = (Integer) claims.get("role");

        User user = UsersDAO.getUserById(userId);

        if (user != null && user.getRole() == role) {
            return user;
        }

        return null; 
    }

    
    
    public static User validateRefreshToken(String refreshToken) {
        Claims claims = validateJWT(refreshToken);
        if (claims == null) {
            return null;
        }

        int userId = Integer.parseInt(claims.getSubject());
        return UsersDAO.getUserById(userId); 
    }

    
    
    public static boolean isTokenNearingExpiry(String token) {
        try {
            Claims claims = Jwts.parser()
                                .setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8))
                                .parseClaimsJws(token)
                                .getBody();
            Date expiration = claims.getExpiration();
            System.out.println("Expiration of refresh token:"+expiration);
            long timeToExpiry = expiration.getTime() - System.currentTimeMillis();

            return timeToExpiry < 1 * 60 * 1000; // 5 minute in milliseconds
        } catch (ExpiredJwtException e) {
            System.out.println("Token is already expired: " + e.getMessage());
            return true; // Consider it nearing expiry if already expired
        } catch (SignatureException e) {
            System.out.println("Invalid token signature: " + e.getMessage());
            return false; // If the signature doesn't match, treat it as invalid
        } catch (Exception e) {
            System.out.println("Token validation error: " + e.getMessage());
            return false; // Handle any other unexpected exceptions
        }
    }


}
