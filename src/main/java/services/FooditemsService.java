package services;

import models.FoodDetails;
import models.Fooditem;
import models.Restaurant;
import utils.AppErrorType;
import utils.CustomApplicationException;
import utils.ResponsesUtil;
import DAO.FoodDetailsDAO;
import DAO.FooditemsDAO;
import DAO.RestaurantsDAO;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.List;

public class FooditemsService {
	private final ObjectMapper objectMapper = new ObjectMapper();
	
	
	public String doPost(HttpServletRequest request) throws Exception {

	    try {
	        String path = request.getPathInfo();
	        String[] pathParts = path.split("/");
	        int restaurantId = Integer.parseInt(pathParts[2]);

	        // Retrieve restaurant details to check if it's vegetarian
	        Restaurant restaurant = RestaurantsDAO.getRestaurantById(restaurantId);
	        boolean isVegRestaurant = restaurant.getIsVeg();

	        String payload = (String) request.getAttribute("requestPayload");
	        Fooditem foodItem = objectMapper.readValue(payload, Fooditem.class);
	        foodItem.setRestaurantID(restaurantId);


	        // Check if the food item is compatible with the restaurant's veg status
	        FoodDetails foodDetails = null;
			try {
				foodDetails = FoodDetailsDAO.getFoodDetailsById(foodItem.getFoodDetailsId());
			} catch (Exception e) {
				throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to get food details.");
			}
	        if (isVegRestaurant && !foodDetails.getisVeg()) {
	            return ResponsesUtil.createErrorResponse("Only vegetarian food items can be added to this restaurant.");
	        }

	        // Proceed with adding the new food item
	        int foodItemId = FooditemsDAO.addFoodItem(foodItem);
	        if (foodItemId > 0) {
	            BigDecimal price = foodItem.getPrice();
	            int priceHistoryId = FooditemsDAO.addFoodItemPrice(price, foodItemId);

	            if (priceHistoryId > 0) {
	               return ResponsesUtil.createSuccessResponse("Food item added successfully.", foodItemId);
	            } else {
	                throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR,"Failed to add price history.");
	            }
	        } 
	        else if (foodItemId == -1) {
	        	throw new CustomApplicationException(AppErrorType.DUPLICATE_ENTRY, "FoodItem already exists.");
	        }else {
	            throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to add food item.");
	        }
	    } catch (CustomApplicationException e) {
	        throw e;
	    }
	}


	
	
	public String doPut(HttpServletRequest request) throws Exception {
	    String path = request.getPathInfo();

	        String[] pathParts = path.split("/");

	        int restaurantId, foodItemId;
	        restaurantId = Integer.parseInt(pathParts[2]);
	        foodItemId = Integer.parseInt(pathParts[4]);
	        
	        
	        // Check if the food item exists
	        Fooditem existingFoodItem = FooditemsDAO.getFoodItemById(foodItemId);
	        if (existingFoodItem == null) {
	        	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "FoodItem not found.");
	        }
	        
	        
	        String payload = (String) request.getAttribute("requestPayload");
	        Fooditem foodItem = objectMapper.readValue(payload, Fooditem.class);

	        foodItem.setRestaurantID(restaurantId);
	        foodItem.setFoodItemID(foodItemId);

	        Boolean isSuccess = FooditemsDAO.updateFoodItem(foodItem);

	        //While updating stock, price will not be provided
	        if (foodItem.getPrice() != null) {
	            BigDecimal price = foodItem.getPrice();
	            int priceHistoryId = FooditemsDAO.addFoodItemPrice(price, foodItemId);
	            
	            if (priceHistoryId <= 0) {
	                throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to update price history.");
	            }
	        }

	        if (isSuccess) {
	            return ResponsesUtil.createSuccessResponse("FoodItem updated successfully.");
	        } else {
	            throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to update food item.");
	        }
	}

	
	

	public String doDelete(HttpServletRequest request) throws Exception {
		String path = request.getPathInfo();

			String[] pathParts = path.split("/");

			int restaurantId, foodItemId;
	        restaurantId = Integer.parseInt(pathParts[2]);
			foodItemId = Integer.parseInt(pathParts[4]);

			
			// Check if the food item exists
	        Fooditem existingFoodItem = FooditemsDAO.getFoodItemById(foodItemId);
	        if (existingFoodItem == null || existingFoodItem.getRestaurantID() != restaurantId) {
	        	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "FoodItem not found.");
	        }
	        
	        
			boolean foodItemDeleted = FooditemsDAO.deleteFoodItem(foodItemId);

			if (foodItemDeleted) {
				return ResponsesUtil.createSuccessResponse("Food item deleted successfully.");
			} else {
				throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to delete food item.");
			}
	}

	
	
	public String doGet(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();

        try {
            String[] pathParts = path.split("/");
            String stockParam = request.getParameter("stockThreshold");

            int restaurantId;
            restaurantId = Integer.parseInt(pathParts[2]);

            Restaurant restaurant=RestaurantsDAO.getRestaurantById(restaurantId);
            if (restaurant ==null) {
                throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Restaurant does not exist.");
            }
            
            if (stockParam == null) {
                if (pathParts.length == 4 && "fooditems".equals(pathParts[3])) {
                    return handleListFoodItems(restaurantId);
                } else if (pathParts.length == 5) {
                    try {
                        int foodItemId = Integer.parseInt(pathParts[4]);
                        return handleGetFoodItemById(restaurantId, foodItemId);
                    } catch (Exception e) {
                        throw new CustomApplicationException(AppErrorType.ACTION_NOT_FOUND, "Invalid food item ID format.");
                    }
                } else {
                    throw new CustomApplicationException(AppErrorType.ACTION_NOT_FOUND);
                }
            } else {
                try {
                    int stock = Integer.parseInt(stockParam);
                    return handleGetFoodItemBystock(stock, restaurantId);
                } catch (NumberFormatException e) {
                    throw new CustomApplicationException(AppErrorType.ACTION_NOT_FOUND, "Invalid stock threshold format.");
                }
            }
        } catch (CustomApplicationException e) {
            throw e; // Rethrow the exception for handling in the GenericCRUDServlet
        }
    }

	
	
	private String handleGetFoodItemById(int restaurantId, int foodItemId)
			throws Exception {
		try {
			Fooditem foodItem = FooditemsDAO.getFoodItemById(foodItemId); // Fetch FooditemDTO instead of
																						// Fooditem

			if (foodItem.getFoodItemID() != 0) {
				return objectMapper.writeValueAsString(foodItem);
			} else {
				throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Food item not found.");
			}

		} catch (CustomApplicationException e) {
			throw e;
		}
	}

	
	
	private String handleListFoodItems(int restaurantId) throws Exception {
		try {
			List<Fooditem> foodItems = FooditemsDAO.getAllFoodItems(restaurantId);

			if (foodItems.isEmpty()) {
				throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Food items not found.");
			} else {
				return objectMapper.writeValueAsString(foodItems);
			}
		} catch (CustomApplicationException e) {
			throw e;
		}
	}

	
	
	private String handleGetFoodItemBystock(int stock, int restaurantId) throws Exception {

		try {
			List<Fooditem> foodItems = FooditemsDAO.getFoodItemByStock(stock, restaurantId);

			if (foodItems.isEmpty()) {
				throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Food items not found.");
			} else {
				return objectMapper.writeValueAsString(foodItems);
			}
		} catch (CustomApplicationException e) {
			throw e;
		}
	}

}
