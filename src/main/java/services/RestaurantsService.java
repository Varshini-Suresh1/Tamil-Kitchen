package services;

import models.Fooditem;
import models.Restaurant;
import models.User;
import utils.AppErrorType;
import utils.CustomApplicationException;
import utils.ResponsesUtil;
import DAO.FooditemsDAO;
import DAO.RestaurantsDAO;
import DAO.UsersDAO;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;


import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RestaurantsService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    UsersDAO userDAO=new UsersDAO();
    
    
    
    public String doPost(HttpServletRequest request) throws Exception {
    	
        try {
        	String payload = (String) request.getAttribute("requestPayload");
            Restaurant restaurant = objectMapper.readValue(payload, Restaurant.class);

            String ownerUsername = restaurant.getOwnerUsername();
            User existingUser = UsersDAO.getUserByUsername(ownerUsername);
            
            if (existingUser != null) {
            	if (existingUser.getRole() == 1) {
                 	 throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "User is already an owner.");
                }
            	
                existingUser.setRole(1);
                boolean isUpdated = UsersDAO.updateUserRole(existingUser.getUserId(), 1);
                if (!isUpdated) {
                	throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to update user role.");
                }
                restaurant.setOwnerId(existingUser.getUserId());
            } else {
            	throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "User does not exist.");
            }

            int restaurantId = RestaurantsDAO.addRestaurant(restaurant);
            if (restaurantId > 0) {
            	return ResponsesUtil.createSuccessResponse("Restaurant added successfully.", restaurantId);
            } else {
            	throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to add Restaurant.");
            }
        }catch (CustomApplicationException e) {
            throw e;
        }
    }

    
    
    public String doPut(HttpServletRequest request) throws Exception {
    	
        String path = request.getPathInfo();

            int restaurantId = Integer.parseInt(path.split("/")[2]);

            String payload = (String) request.getAttribute("requestPayload");
            Restaurant updatedRestaurantData = objectMapper.readValue(payload, Restaurant.class);
            String newOwnerUsername = updatedRestaurantData.getOwnerUsername(); 

            // Step 1: Retrieve existing restaurant details by restaurantId
            Restaurant existingRestaurant = RestaurantsDAO.getRestaurantById(restaurantId);
            if (existingRestaurant == null) {
                throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Restaurant not found.");
            }

            // Step 2: If restaurant is being updated to Veg, check if all food items are Veg
            if (updatedRestaurantData.getIsVeg() && !existingRestaurant.getIsVeg()) {
                List<Fooditem> foodItems = FooditemsDAO.getAllFoodItems(restaurantId);
                
                // Check if all food items are veg
                for (Fooditem foodItem : foodItems) {
                    if (!foodItem.getFoodDetails().getisVeg()) {
                        throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "Cannot change to a Veg restaurant. There are non-veg food items.");
                    }
                }
            }

            // Step 3: Retrieve the current owner user details by ownerId from existing restaurant
            int currentOwnerId = existingRestaurant.getOwnerId();
            User currentOwner = UsersDAO.getUserById(currentOwnerId);

            if (currentOwner == null) {
                throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Current owner not found.");
            }

            // Step 4: Check if the current owner's username matches the new owner username in the payload
            if (currentOwner.getUsername().equals(newOwnerUsername)) {
                // If usernames match, continue with restaurant update
                updatedRestaurantData.setOwnerId(currentOwnerId);
            } else {
                // If usernames do not match, update roles as required

                // Step 4a: Set the current owner’s role to 2 (e.g., user)
                boolean isCurrentOwnerRoleUpdated = UsersDAO.updateUserRole(currentOwnerId, 2);
                if (!isCurrentOwnerRoleUpdated) {
                    throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to update the role of current owner.");
                }

                // Step 4b: Retrieve new owner user by username from payload
                User newOwner = UsersDAO.getUserByUsername(newOwnerUsername);
                if (newOwner == null) {
                    throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "New owner does not exist.");
                }

                // Step 4c: Set the new owner's role to 1 (e.g., owner)
                boolean isNewOwnerRoleUpdated = UsersDAO.updateUserRole(newOwner.getUserId(), 1);
                if (!isNewOwnerRoleUpdated) {
                    throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to update the role of new owner.");
                }

                // Update restaurant with new ownerId
                updatedRestaurantData.setOwnerId(newOwner.getUserId());
            }

            // Step 5: Update restaurant details
            boolean success = RestaurantsDAO.updateRestaurant(updatedRestaurantData, restaurantId);
            if (success) {
                      return  ResponsesUtil.createSuccessResponse("Restaurant updated successfully.");
            } else {
                throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Failed to update restaurant.");
            }
    }



    
    public String doDelete(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();


            int restaurantId = Integer.parseInt(path.split("/")[2]);
            Restaurant restaurant = RestaurantsDAO.getRestaurantById(restaurantId);
            
            if (restaurant == null) {
            	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Restaurant not found.");
            }

            int ownerId = restaurant.getOwnerId();
            RestaurantsDAO.deleteRestaurant(restaurantId);
            boolean success = UsersDAO.updateUserRole(ownerId, 2);
            
            if (success) {
            	return ResponsesUtil.createSuccessResponse("Restaurant deleted successfully.");
            } else {
            	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Restaurant not found.");
            }
    }
    
    
    
    public String doGet(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();
        try {
            String[] pathParts = path.split("/");

            if (pathParts.length == 3) {
                return handleGetRestaurantById(Integer.parseInt(pathParts[2]));
            } else if (pathParts.length == 2) {
                return handleListRestaurants(request);
            } else {
                throw new CustomApplicationException(AppErrorType.ACTION_NOT_FOUND);
            }
        } catch (CustomApplicationException e) {
            throw e;
        }
    }

    
    
    private String handleListRestaurants(HttpServletRequest request) throws Exception {
        String location = request.getParameter("location");
        String foodName = request.getParameter("foodName");
        String restaurantName = request.getParameter("restaurantName");
        String isVeg = request.getParameter("type");
        String rating = request.getParameter("ratingThreshold");

        if (foodName != null && !foodName.isEmpty() && location != null && !location.isEmpty()) {
        	return handleListRestaurantsByFoodName(foodName, location);
        } else {
            BigDecimal parsedRating = (rating != null && !rating.isEmpty()) ? new BigDecimal(rating) : null;
            return handleSearchRestaurants(location, restaurantName, isVeg, parsedRating);
        }
    }
    
    
    
    private String handleSearchRestaurants(String location, String restaurantName, String isVeg, BigDecimal rating) throws Exception {
        
            List<Restaurant> restaurants = RestaurantsDAO.getAllRestaurants(location, restaurantName, isVeg, rating);
            if (restaurants.isEmpty()) {
            	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Restaurant not found.");
            } else {
                List<Restaurant> filteredRestaurants = new ArrayList<>();

                	for (Restaurant restaurant : restaurants) {
                        BigDecimal avgRating = RestaurantsDAO.getRestaurantAverageRating(restaurant.getRestaurantId());
                        if (avgRating != null) {
                            restaurant.setRating(avgRating);
                            if (rating == null || restaurant.getRating().compareTo(rating) >= 0) {
                                filteredRestaurants.add(restaurant);
                            }
                        } 
                    }
                    return objectMapper.writeValueAsString(filteredRestaurants);
            }
    }
    
    

    private String handleGetRestaurantById(int restaurantId) throws Exception {
        
           Restaurant restaurant;
		try {
			restaurant = RestaurantsDAO.getRestaurantById(restaurantId);
            if (restaurant != null) {
                BigDecimal avgRating = RestaurantsDAO.getRestaurantAverageRating(restaurantId);
                restaurant.setRating(avgRating);

                return objectMapper.writeValueAsString(restaurant);
            } else {
                throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Restaurant not found.");
            }
		} catch (SQLException e) {
			throw e;
		}
    }
    
  
    
    private String handleListRestaurantsByFoodName(String foodName, String location) throws Exception {
       
            List<Restaurant> restaurants =RestaurantsDAO.getRestaurantsByFoodName(foodName, location);

            if (restaurants.isEmpty()) {
            	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "No Restaurants found for given fooditem.");
            } else {
                // Update each restaurant's rating before sending the response
                for (Restaurant restaurant : restaurants) {
                    BigDecimal avgRating = RestaurantsDAO.getRestaurantAverageRating(restaurant.getRestaurantId());
                    restaurant.setRating(avgRating);
                }
                // Convert the list of restaurants to JSON and send the response
                return objectMapper.writeValueAsString(restaurants);
            }
    }

}
