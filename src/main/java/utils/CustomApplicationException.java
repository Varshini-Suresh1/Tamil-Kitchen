package utils;

	@SuppressWarnings("serial")
	public class CustomApplicationException extends Exception {
		private final int errorCode;

	    // Constructor accepting the AppErrorType enum
	    public CustomApplicationException(AppErrorType errorType) {
	        super(errorType.getMessage()); // Set the message for the parent RuntimeException
	        this.errorCode = errorType.getCode();
	      
	    }

	    // Optionally, you can have a constructor that allows custom messages
	    public CustomApplicationException(AppErrorType errorType, String customMessage) {
	        super(customMessage);
	        this.errorCode = errorType.getCode();
	        
	    }

	    // Getters for the error code and message
	    public int getErrorCode() {
	        return errorCode;
	    }
	    
	}