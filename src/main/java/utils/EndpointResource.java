package utils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public enum EndpointResource {
	
	LOGIN_POST(
			"POST", 
			"/api/v1/users/login",
			null, 
            Map.of(
                "username", Map.of("pattern", "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", "nullable", false),
                "encryptedPwd", Map.of("pattern", "^(?!.*\s).{3,20}$", "nullable", false)
            ), null),
            
	SIGNUP_POST(
			"POST", 
			"/api/v1/users/signup",
			null, 
             
			Map.of(
                 "username", Map.of("pattern", "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", "nullable", false),
                 "encryptedPwd", Map.of("pattern", "^(?!.*\s).{3,20}$", "nullable", false),
                 "name", Map.of("pattern", "^[A-Za-z ]{1,255}$", "nullable", false),
                 "mobileno", Map.of("pattern", "^[0-9]{10}$", "nullable", false))
             ,null),
	
		
	 	USERS_GET(
	    		"GET", 
	    		"/api/v1/users", 
	    		Arrays.asList(0), null,null),
	    
	    USERS_GET_ID(
	    		"GET", 
	    		"/api/v1/users/{id}", 
	    		Arrays.asList(0, 2), null,null),

	    
	    
	    
	    USER_ADDRESSES_POST(
	    		"POST", 
	    		"/api/v1/users/{id}/addresses", 
	    		Arrays.asList(2),
	        
	    		Map.of(
	    				"address", Map.of("pattern", "^(?=(.*[A-Za-z]){5})[A-Za-z0-9, /]{1,255}$", "nullable", false),
	    		        "location", Map.of("pattern", "^[A-Za-z ]{1,255}$", "nullable", false),
	    		        "isDefault", Map.of("type", "^(true|false)$", "nullable", false)
	    		    ),null),
	    
	    @SuppressWarnings("serial")
		USER_ADDRESSES_GET(
	    		"GET", 
	    		"/api/v1/users/{id}/addresses", 
	    		Arrays.asList(2), null,
	    		new HashMap<String, String>() {{
		            put("isDefault", "^(true|false)$");          
		        }}),
	    
	    USER_ADDRESS_BY_ID_GET(
	    		"GET", 
	    		"/api/v1/users/{id}/addresses/{id}",
	    		Arrays.asList(2), null,null),

	    USER_ADDRESS_BY_ID_PUT(
	    		"PUT", 
	    		"/api/v1/users/{id}/addresses/{id}", 
	    		Arrays.asList(2),
	        
	    		Map.of(
	    				"address", Map.of("pattern", "^(?=(.*[A-Za-z]){5})[A-Za-z0-9, /]{1,255}$", "nullable", false),
	    		        "location", Map.of("pattern", "^[A-Za-z ]{1,255}$", "nullable", false),
	    		        "isDefault", Map.of("type", "^(true|false)$", "nullable", false)
	    		    ),null),
	    
	    USER_ADDRESS_BY_ID_DELETE(
	    		"DELETE", 
	    		"/api/v1/users/{id}/addresses/{id}", 
	    		Arrays.asList(2), null,null),

	    
	    
	    USER_PASSWORD_PUT(
	    		"PUT", 
	    		"/api/v1/users/{id}", 
	    		Arrays.asList(2),
	        
	    		Map.of(
	            "oldPassword", Map.of("pattern", "^(?!.*\s).{3,20}$", "nullable", false),
	            "newPassword", Map.of("pattern", "^(?!.*\s).{3,20}$", "nullable", false)
	        ),null),
	    
	    

    RESTAURANTS_POST(
    		"POST", 
    		"/api/v1/restaurants", 
    		Arrays.asList(0),
        
    		Map.of(
            "name", Map.of("pattern", "^[A-Za-z ]{1,255}$", "nullable", false),
            "location", Map.of("pattern", "^[A-Za-z ]{1,255}$", "nullable", false),
            "isVeg", Map.of("type", Boolean.class, "nullable", false),
            "ownerUsername", Map.of("pattern", "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", "nullable", false)
        ),null),

    @SuppressWarnings("serial")
    RESTAURANTS_GET(
    	    "GET", 
    	    "/api/v1/restaurants", 
    	    Arrays.asList(0, 2), 
    	    null,
    	    new HashMap<String, String>() {{
    	        put("location", "^[A-Za-z\\s]{1,255}$");       // For string types
    	        put("restaurantName", "^[A-Za-z\\s+]{1,255}$");
    	        put("type", "^(true|false)$");                 // For boolean types
    	        put("ratingThreshold", "^\\d+$");              // For integer types
    	        put("foodName", "^[A-Za-z\\s+]{1,255}$");       // For string types
    	    }}
    	),

    
    RESTAURANT_BY_ID_GET(
    		"GET", 
    		"/api/v1/restaurants/{id}",
    		Arrays.asList(0, 1, 2), null,null),

    RESTAURANT_BY_ID_PUT(
    		"PUT", 
    		"/api/v1/restaurants/{id}", 
    		Arrays.asList(0),
        
    		Map.of(
            "name", Map.of("pattern", "^[A-Za-z ]{1,255}$", "nullable", false),
            "location", Map.of("pattern", "^[A-Za-z ]{1,255}$", "nullable", false),
            "isVeg", Map.of("type","^(true|false)$", "nullable", false),
            "ownerUsername", Map.of("pattern", "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", "nullable", false)
        ),null),

    RESTAURANT_BY_ID_DELETE(
    		"DELETE", 
    		"/api/v1/restaurants/{id}", 
    		Arrays.asList(0), null,null),

    
    
    
    FOODITEMS_POST(
    	    "POST", 
    	    "/api/v1/restaurants/{id}/fooditems", 
    	    Arrays.asList(0, 1),
    	    
    	    Map.of(
    	        "stock", Map.of("pattern", "^\\d+$", "nullable", false), // Allows only non-negative integers
    	        "foodDetailsId", Map.of("pattern", "^\\d+$", "nullable", false), // Allows only non-negative integers
    	        "price", Map.of("pattern", "^\\d+(\\.\\d{1,2})?$", "nullable", false) // Allows only valid prices
    	    )
    	    ,null),

    
    FOODITEMS_GET(
    		"GET", 
    		"/api/v1/restaurants/{id}/fooditems", 
    		Arrays.asList(0, 1, 2), null,null),

    
	FOODITEM_BY_ID_GET(
    		"GET", 
    		"/api/v1/restaurants/{id}/fooditems/{id}", 
    		Arrays.asList(0, 1, 2), null,null),

    FOODITEM_BY_ID_PUT(
    		"PUT", 
    		"/api/v1/restaurants/{id}/fooditems/{id}", 
    		Arrays.asList(0, 1),
        
    		Map.of(
            "stock", Map.of("pattern", "^\\d+$", "nullable", false),
            "price", Map.of("pattern", "^\\d+(\\.\\d{1,2})?$", "nullable", true)),null),
    
    FOODITEM_BY_ID_DELETE(
    		"DELETE", 
    		"/api/v1/restaurants/{id}/fooditems/{id}", 
    		Arrays.asList(0, 1), null,null),

    
    
    
    RESTAURANT_ORDERS_GET(
    		"GET", 
    		"/api/v1/restaurants/{id}/orders", 
    		Arrays.asList(0,1), null,null),
    RESTAURANT_ORDER_BY_ID_PUT(
    		"PUT", 
    		"/api/v1/restaurants/{id}/orders/{id}", 
    		Arrays.asList(0,1),
        
    		Map.of(
    		"isCompleted", Map.of("pattern", "^(-1|0|1|2)$", "nullable", true)
        ),null),
    
    
    
    
    
    USER_ORDERS_POST(
    	    "POST", 
    	    "/api/v1/users/{id}/orders", 
    	    Arrays.asList(2),
    	    Map.of(
    	        "restaurantId", Map.of("pattern", "^\\d+$", "nullable", false),
    	        "orderItems", Map.of(
    	            "type", List.class, 
    	            "nullable", false,
    	            "elementRules", Map.of(
    	                "foodItemId", Map.of("pattern", "^\\d+$", "nullable", false),
    	                "quantity", Map.of("type", "^\\d+$", "nullable", false)
    	            )
    	        )
    	    )
    	    ,null),
    
    @SuppressWarnings("serial")
	USER_ORDERS_GET(
    		"GET", 
    		"/api/v1/users/{id}/orders", 
    		Arrays.asList(2), null,
    		new HashMap<String, String>() {{
	            put("isCompleted",  "^[A-Za-z\\s]{1,255}$");  
	        }}),
    
    USER_ORDER_BY_ID_GET(
    		"GET", 
    		"/api/v1/users/{id}/orders/{id}", 
    		Arrays.asList(2), null,null),

    USER_ORDER_BY_ID_PUT(
    	    "PUT", 
    	    "/api/v1/users/{id}/orders/{id}", 
    	    Arrays.asList(2),
    	    
    	    Map.of(
    	        "isCompleted", Map.of("pattern", "^(-1|0|1|2)$", "nullable", true),
    	        "rating", Map.of("pattern", "^\\d+(\\.\\d{1,2})?$", "nullable", true)
    	    ),null),

    
    USER_ORDER_BY_ID_DELETE(
    		"DELETE", 
    		"/api/v1/users/{id}/orders/{id}", 
    		Arrays.asList(2), null,null),

    
    
    
    ORDER_ITEMS_POST(
    		"POST", 
    		"/api/v1/users/{id}/orders/{id}/orderitems", 
    		Arrays.asList(2),
        
    		Map.of(
            "foodItemId", Map.of("pattern", "^\\d+$", "nullable", false),
            "quantity", Map.of("pattern", "^\\d+$", "nullable", false)
        ),null),
    
    ORDER_ITEMS_GET(
    		"GET", 
    		"/api/v1/users/{id}/orders/{id}/orderitems", 
    		Arrays.asList(2), null,null),
    
    ORDER_ITEM_BY_ID_GET(
    		"GET", 
    		"/api/v1/users/{id}/orders/{id}/orderitems/{id}", 
    		Arrays.asList(2), null,null),

    ORDER_ITEM_BY_ID_PUT(
    		"PUT", 
    		"/api/v1/users/{id}/orders/{id}/orderitems/{id}", 
    		Arrays.asList(2),
        
    		Map.of(
            "foodItemId", Map.of("pattern", "^\\d+$", "nullable", true),
            "quantity", Map.of("pattern", "^\\d+$", "nullable", false)
        ),null),
    
    ORDER_ITEM_BY_ID_DELETE(
    		"DELETE", 
    		"/api/v1/users/{id}/orders/{id}/orderitems/{id}", 
    		Arrays.asList(2), null,null),

    
    
    
   
    FOODDETAILS_GET(
    		"GET", 
    		"/api/v1/fooddetails", 
    		Arrays.asList(0, 1, 2), null,null),
	
    FOODDETAILS_POST(
    		"POST", 
    		"/api/v1/fooddetails", 
    		Arrays.asList(0,1), 
    		Map.of(
    	            "name", Map.of("pattern", "^[A-Za-z ]{1,255}$", "nullable", false),
    	            "type", Map.of("pattern","^(|1|2|3)$","nullable", false),
    	            "isVeg", Map.of("type", "^(true|false)$", "nullable", false)
    	        )
    		,null);
	 
	
    private final String method;
    private final String uri;
    private final List<Integer> roles;
    private final Map<String, Object> payload;
    private final Map<String, String> queryParams; // Changed from Class<?> to String for regex patterns

    EndpointResource(String method, String uri, List<Integer> roles, Map<String, Object> payload, Map<String, String> queryParams) {
        this.method = method;
        this.uri = uri;
        this.roles = roles;
        this.payload = payload;
        this.queryParams = queryParams;
    }

    public String getMethod() {
        return method; 
    }

    public String getUri() {
        return uri;
    }

    public List<Integer> getRoles() {
        return roles;
    }

    public Map<String, Object> getPayload() {
        return payload;
    }

    public Map<String, String> getQueryParams() {
        return queryParams;
    }

}
