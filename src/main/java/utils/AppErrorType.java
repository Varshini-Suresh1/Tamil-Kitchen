package utils;

public enum AppErrorType {

	    // Define your error codes and messages
	    INTERNAL_SERVER_ERROR(500, "Internal server error"),
	    DATABASE_ERROR(501, "Database connection error"),
	    USER_NOT_FOUND(404, "User not found"),
	    INVALID_INPUT(400, "Invalid input"),  //bad request
	    UNAUTHORIZED_ACCESS(401, "Unauthorized access"),
	    FORBIDDEN_ACCESS(403, "Forbidden access"),
	    RESOURCE_NOT_FOUND(404, "Resource not found"),
	    DUPLICATE_ENTRY(409, "Already exists."),
		ACTION_NOT_FOUND(405,"Action Not supported");
       
	    private final int code;
	    private final String message;

	    AppErrorType(int code, String message) {
	        this.code = code;
	        this.message = message;
	    }

	    public int getCode() {
	        return code;
	    }

	    public String getMessage() {
	        return message;
	    }
	}