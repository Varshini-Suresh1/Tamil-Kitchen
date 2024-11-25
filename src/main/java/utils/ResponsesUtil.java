package utils;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ResponsesUtil {
    private static final ObjectMapper objectMapper = new ObjectMapper(); 

    
    
    
    public static String createSuccessResponse(String message) {
        Map<String, String> jsonObject = new HashMap<>();
        jsonObject.put("message", message);
        return convertToJson(jsonObject);
    }
    
    
    

    public static String createSuccessResponse(String message, long value) {
        Map<String, Object> jsonObject = new HashMap<>();
        jsonObject.put("message", message);
        jsonObject.put("value", value);
        return convertToJson(jsonObject);
    }

    
    
    
    // Method to create an error response
    public static String createErrorResponse(String errorMessage) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", errorMessage);
        return convertToJson(errorResponse); 
    }

    
    
    public static String createErrorResponse(String message, String value) {
        Map<String, Object> jsonObject = new HashMap<>();
        jsonObject.put("error", message);
        jsonObject.put("value", value);
        return convertToJson(jsonObject);
    }
    
    
    
    
    // Method to convert a Map to a JSON string using Jackson
    private static String convertToJson(Object data) {
        try {
            return objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            return "{\"error\":\"Error creating JSON response\"}"; 
        }
    }
}
