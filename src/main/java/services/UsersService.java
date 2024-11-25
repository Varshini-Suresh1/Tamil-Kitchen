package services;

import DAO.RestaurantsDAO;
import DAO.UsersDAO;
import models.User;
import utils.AppErrorType;
import utils.JWTUtil;
import utils.ResponsesUtil;
import utils.CustomApplicationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.mindrot.jbcrypt.BCrypt;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UsersService {
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Object doPost(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();
        String action = path.split("/")[2];

        String payload = (String) request.getAttribute("requestPayload");
        User userInput = objectMapper.readValue(payload, User.class);
       
        try {
	        switch (action) {
	            case "login":
	            	 return handleLogin(userInput);
	            case "signup":
	                return handleSignup(userInput);
	            default:
	                throw new CustomApplicationException(AppErrorType.ACTION_NOT_FOUND);
	        }
        }
        catch (CustomApplicationException e) {
        	throw e;
        } 
    }

    
    
    
    public String doGet(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();
        String[] pathParts = path.split("/");

        if (pathParts.length == 3) {
            int userId = Integer.parseInt(pathParts[2]);
            return handleGetUserById(userId);
            
        } else if(pathParts.length == 2 ) {
        	return handleGetAllUsers();
        }
        else{
            throw new CustomApplicationException(AppErrorType.ACTION_NOT_FOUND);
        }
    }

    
    

    public String doPut(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();
        String[] pathParts = path.split("/");
        int userId = Integer.parseInt(pathParts[2]);

        
        String payload = (String) request.getAttribute("requestPayload");
        @SuppressWarnings("unchecked")
		Map<String, Object> jsonInput = objectMapper.readValue(payload, HashMap.class);

        String oldPassword = (String) jsonInput.get("oldPassword");
        String newPassword = (String) jsonInput.get("newPassword");


        User user = UsersDAO.getUserById(userId);
        if (user == null) {
            throw new CustomApplicationException(AppErrorType.USER_NOT_FOUND);
        }

        boolean isPasswordValid = BCrypt.checkpw(oldPassword, user.getEncryptedPwd());
        if (!isPasswordValid) {
            throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "Old password is incorrect.");
        }

        if (oldPassword.equals(newPassword)) {
            throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "New password cannot be the same as the old password.");
        }

        String newHashedPassword = BCrypt.hashpw(newPassword, BCrypt.gensalt());
        boolean isUpdated = UsersDAO.updatePassword(userId, newHashedPassword);

        if (!isUpdated) {
            throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR);
        }
        else {
        	 return ResponsesUtil.createSuccessResponse("Password updation successful.");
        }
    }

    
    
    private Map<String,String> handleLogin(User userInput) throws Exception {

        String username = userInput.getUsername();
        String rawPassword = userInput.getEncryptedPwd();

        User user = UsersDAO.getUserByUsername(username);
        if (user == null) {
            throw new CustomApplicationException(AppErrorType.UNAUTHORIZED_ACCESS, "Invalid username.");
        }

        boolean passwordMatch = BCrypt.checkpw(rawPassword, user.getEncryptedPwd());
        if (!passwordMatch) {
            throw new CustomApplicationException(AppErrorType.UNAUTHORIZED_ACCESS, "Invalid password.");
        }

        int restaurantId = (user.getRole() == 1) ? RestaurantsDAO.getRestaurantId(user.getUserId()) : 0;
        
        String accessToken = JWTUtil.createAccessToken(user.getUserId(), user.getRole(), restaurantId);
        String refreshToken = JWTUtil.createRefreshToken(user.getUserId());

        Map<String, String> tokens = new HashMap<>();
        tokens.put("Access-Token", accessToken);
        tokens.put("Refresh-Token", refreshToken);

        return tokens;
    }

    
    
    private String handleSignup(User userInput) throws Exception {
    
    	try {
    		 System.out.println("Signup Request:");
    	        System.out.println("Username: " + userInput.getUsername());
    	        System.out.println("Encrypted Password: " + userInput.getEncryptedPwd());
    	        System.out.println("Name: " + userInput.getName());
    	        System.out.println("Mobile No: " + userInput.getMobileno());
    	        System.out.println("Role: " + userInput.getRole());
            int signupResult = UsersDAO.signup(userInput);
            if (signupResult > 0) {
                return ResponsesUtil.createSuccessResponse("Signup successful.");
            } else if(signupResult == -1 ){
                throw new CustomApplicationException(AppErrorType.DUPLICATE_ENTRY, "Username already exist.");
            }
            else {
                throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Signup failed.");
            }
        } catch (CustomApplicationException e) {
            throw e; 
        }
    }

    
    
    private String handleGetAllUsers() throws Exception {
        List<User> allUsers =UsersDAO.getAllUsers();
        if (allUsers.isEmpty()) {
            throw new CustomApplicationException(AppErrorType.USER_NOT_FOUND, "No users found.");
        } else {
        	return objectMapper.writeValueAsString(allUsers);
        }
    }

    
    
    private String handleGetUserById(int userId) throws Exception {
        User user = UsersDAO.getUserById(userId);
        if (user.getUserId() == 0) {
            throw new CustomApplicationException(AppErrorType.USER_NOT_FOUND);
        } else {
        	return objectMapper.writeValueAsString(user);
        }
    }
}
