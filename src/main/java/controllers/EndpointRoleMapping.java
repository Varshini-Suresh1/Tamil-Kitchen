// EndpointRoleMapping.java
package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import utils.EndpointResource;
import utils.ResponseUtil;
import utils.ResponsesUtil;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import java.util.regex.Pattern;
import java.util.Map;

@SuppressWarnings("unchecked")
public class EndpointRoleMapping {
    
	public static boolean hasAccess(String requestEndpoint, String httpMethod, int userRole, String payload, HttpServletResponse response) throws IOException {
	    // Strip query parameters from the request endpoint for URI matching
	    String pathOnly = requestEndpoint.split("\\?")[0];

	    for (EndpointResource resource : EndpointResource.values()) {
	        
	        // Match both URI (without query params) and HTTP method
	        if ((resource.getUri().equals(pathOnly) || 
	             pathOnly.matches(resource.getUri().replace("{id}", "\\d+"))) && 
	            resource.getMethod().equalsIgnoreCase(httpMethod)) {

	        	

	            List<Integer> allowedRoles = resource.getRoles();
            	
	            if (!(allowedRoles==null) && !allowedRoles.contains(userRole)) {

	                ResponseUtil.sendResponse(response, HttpServletResponse.SC_FORBIDDEN, ResponsesUtil.createErrorResponse("Access denied."));
	                return false;
	            }
	            // Validate payload for POST and PUT methods
	            if (("POST".equalsIgnoreCase(httpMethod) || "PUT".equalsIgnoreCase(httpMethod)) && 
	                (payload == null || payload.isEmpty())) {
	                ResponseUtil.sendResponse(response, HttpServletResponse.SC_BAD_REQUEST, ResponsesUtil.createErrorResponse("Missing Required Field"));
	                return false;
	            }

	            if (("POST".equalsIgnoreCase(httpMethod) || "PUT".equalsIgnoreCase(httpMethod)) && 
	                resource.getPayload() != null && 
	                !validatePayload(resource, payload, response)) {
	                return false;
	            }

	            // Validate query parameters for GET method
	            if ("GET".equalsIgnoreCase(httpMethod)) {
	                Map<String, String> expectedParams = resource.getQueryParams();

	                Map<String, String> requestParams = parseQueryParams(requestEndpoint);

	                // Check if incoming parameters match the expected params map
	                if (!(expectedParams == null)) {
	                    // Check if incoming parameters match the expected params map
	                    if (!validateQueryParams(requestParams, expectedParams, response)) {
	                        return false;
	                } 
	                }
	            }
	            return true; 
	        }
	    }
	    ResponseUtil.sendResponse(response, HttpServletResponse.SC_FORBIDDEN, ResponsesUtil.createErrorResponse("Access denied No matching resource."));
	    return false; 
	}

	
	
	
	private static Map<String, String> parseQueryParams(String requestEndpoint) {
	    Map<String, String> queryParams = new HashMap<>();
	    
	    if (requestEndpoint.contains("?")) {
	        String[] parts = requestEndpoint.split("\\?");
	        if (parts.length > 1) {
	            String[] pairs = parts[1].split("&");
	            for (String pair : pairs) {
	                String[] keyValue = pair.split("=");
	                if (keyValue.length == 2) {
	                    queryParams.put(keyValue[0], keyValue[1]);
	                }
	            }
	        }
	    }
	    
	    return queryParams;
	}

	
	
	
	private static boolean validateQueryParams(Map<String, String> requestParams, Map<String, String> expectedParams, HttpServletResponse response) throws IOException {
	    // Check for unexpected parameters
	    for (String param : requestParams.keySet()) {
	        if (!expectedParams.containsKey(param)) {
	            ResponseUtil.sendResponse(response, HttpServletResponse.SC_BAD_REQUEST, ResponsesUtil.createErrorResponse("Unexpected query parameter: ",param));
	            return false;
	        }
	    }
	    
	    // Validate parameter regex patterns
	    for (Map.Entry<String, String> expectedEntry : expectedParams.entrySet()) {
	        String paramName = expectedEntry.getKey();
	        String regexPattern = expectedEntry.getValue();
	        String paramValue = requestParams.get(paramName);

	        // If parameter is missing or null, skip validation
	        if (paramValue == null) continue;

	        if (!Pattern.matches(regexPattern, paramValue)) {
	            ResponseUtil.sendResponse(response, HttpServletResponse.SC_BAD_REQUEST, ResponsesUtil.createErrorResponse("Invalid format for parameter " ,paramName));
	            return false;
	        }
	    }
	    return true;
	}

	
	
	private static boolean validatePayload(EndpointResource resource, String payload, HttpServletResponse response) throws IOException {
	    ObjectMapper objectMapper = new ObjectMapper();
	    Map<String, Object> payloadMap;

	    try {
	        payloadMap = objectMapper.readValue(payload, Map.class);
	    } catch (IOException e) {
	        ResponseUtil.sendResponse(response, HttpServletResponse.SC_BAD_REQUEST, ResponsesUtil.createErrorResponse("Invalid JSON format"));
	        return false;
	    }

	    Map<String, Object> expectedStructure = resource.getPayload();
	    if (expectedStructure == null) return true;

	    for (Map.Entry<String, Object> field : expectedStructure.entrySet()) {
	        String fieldName = field.getKey();
	        Map<String, Object> fieldAttributes = (Map<String, Object>) field.getValue();
	        boolean isNullable = (boolean) fieldAttributes.get("nullable");

	        
	        if (!payloadMap.containsKey(fieldName)) {
	            if (!isNullable) {
	                ResponseUtil.sendResponse(response, HttpServletResponse.SC_BAD_REQUEST, ResponsesUtil.createErrorResponse("Missing Required Field: " , fieldName));
	                return false;
	            } else {
	                continue; 
	            }
	        }

	        
	        Object value = payloadMap.get(fieldName);
	        Object expectedValue = fieldAttributes.get("pattern") != null ? fieldAttributes.get("pattern") : fieldAttributes.get("type");

	        Map<String, Object> elementRules = (Map<String, Object>) fieldAttributes.get("elementRules"); // Get elementRules if available

	        if (value != null && !isValidType(value, expectedValue, elementRules)) {
	            ResponseUtil.sendResponse(response, HttpServletResponse.SC_BAD_REQUEST, ResponsesUtil.createErrorResponse("Invalid data entered for: " , fieldName));
	            return false;
	        }
	    }

	    for (String key : payloadMap.keySet()) {
	        if (!expectedStructure.containsKey(key)) {
	            ResponseUtil.sendResponse(response, HttpServletResponse.SC_BAD_REQUEST, ResponsesUtil.createErrorResponse("Unexpected Field Found: " , key));
	            return false;
	        }
	    }

	    return true;
	}



	
	private static boolean isValidType(Object value, Object expectedValue, Map<String, Object> elementRules) {
	    // Handle case where expectedValue is a List.class
	    if (expectedValue instanceof Class && List.class.isAssignableFrom((Class<?>) expectedValue)) {
	        if (value instanceof List) {
	            List<?> valueList = (List<?>) value;
	            for (Object item : valueList) {
	                if (!(item instanceof Map)) {
	                    return false;
	                }
	                // Handle each list item (Map)
	                Map<?, ?> itemMap = (Map<?, ?>) item;
	                if (!validateItem(itemMap, elementRules)) {
	                    return false;
	                }
	            }
	            return true;
	        } else {
	            return false;
	        }
	    }

	    // Handle case where expectedValue is a String (e.g., regex for validation)
	    if (expectedValue instanceof String && value instanceof String) {
	        String pattern = (String) expectedValue;
	        String valueStr = ((String) value).trim();
	        if (!Pattern.matches(pattern, valueStr)) {
	            return false;
	        }
	    }

	    // Handle Integer pattern matching
	    if (expectedValue instanceof String && value instanceof Integer) {
	    	 System.out.println("Entering isValidType with value: " + value + " (type: " + (value != null ? value.getClass().getName() : "null") + ")");
	 	    System.out.println("expectedValue: " + expectedValue + " (type: " + (expectedValue != null ? expectedValue.getClass().getName() : "null") + ")");
	        String pattern = (String) expectedValue;
	        String valueStr = value.toString();
	        if (!Pattern.matches(pattern, valueStr)) {
	            return false;
	        }
	    }

	    // Handle case where expectedValue is a Class (e.g., type checking)
	    if (expectedValue instanceof Class) {
	        Class<?> expectedClass = (Class<?>) expectedValue;
	        if (expectedClass.isInstance(value)) {
	            return true;
	        } else {
	            return false;
	        }
	    }

	    // Handle other field validations (Integer, etc.)
	    if (expectedValue instanceof Integer && value instanceof Integer) {
	        Integer expectedInt = (Integer) expectedValue;
	        Integer actualInt = (Integer) value;
	        if (!expectedInt.equals(actualInt)) { //.equals :ensure values are equal, not just references.
	            return false;
	        }
	    }

	    return true;
	}
	
	
	

	private static boolean validateItem(Map<?, ?> itemMap, Map<String, Object> elementRules) {
	    // Iterate over each entry in elementRules
	    for (Map.Entry<String, Object> rule : elementRules.entrySet()) { //entryset => returns set of all entries in the map
	        String elementName = (String) rule.getKey();
	        Map<String, Object> fieldRules = (Map<String, Object>) rule.getValue();

	        Object elementValue = itemMap.get(elementName);

	        Object expectedType = fieldRules.get("type");
	        Object expectedPattern = fieldRules.get("pattern");

	        // Ensure expectedType is not null and handle validation accordingly
	        if (expectedType != null) {
	            if (!isValidType(elementValue, expectedType, fieldRules)) {
	                return false;
	            }
	        } else if (expectedPattern != null) {
	            String pattern = (String) expectedPattern;
	            if (elementValue instanceof String && !Pattern.matches(pattern, (String) elementValue)) {
	                return false;
	            }
	        } else {
	            return false;
	        }
	    }
	    return true;
	}


}