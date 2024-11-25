package services;

import com.fasterxml.jackson.databind.ObjectMapper;
import DAO.UsersOrdersDAO;
import DAO.AddressesDAO;
import DAO.FooditemsDAO;
import DAO.RestaurantsDAO;
import DAO.UsersOrderItemsDAO;
import models.Address;
import models.Fooditem;
import models.Order;
import models.OrderItem;
import models.Restaurant;
import utils.AppErrorType;
import utils.CustomApplicationException;
import utils.ResponsesUtil;

import javax.servlet.http.HttpServletRequest;

import java.sql.SQLException;
import java.util.List;

public class OrdersService {

	private ObjectMapper objectMapper = new ObjectMapper();

	public String doPost(HttpServletRequest request) throws Exception {
		
		String path = request.getPathInfo();

		try {
			String[] pathParts = path.split("/");
			int userId = Integer.parseInt(pathParts[2]);
			

			String payload = (String) request.getAttribute("requestPayload");
			Order order = objectMapper.readValue(payload, Order.class);
			
			List<Order> orders = UsersOrdersDAO.getOrdersByRestaurantId(order.getRestaurantId(), 0);
			boolean existingOrder = false;
		    for (Order existing : orders) {
		        if (existing.getUserId() == userId) {
		            existingOrder = true;
		            break;
		        }
		    }
			if (existingOrder) {
				throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "Cart for the given restaurant already exists!");
			}
			
			order.setUserId(userId);
			order.setOrderDate(System.currentTimeMillis() / 1000); // Set order date as current epoch time

			int orderId = UsersOrdersDAO.addOrder(order);
			if (orderId > 0) {
				OrderItem item = order.getOrderItems().get(0);
				item.setOrderId(orderId);
				int result = UsersOrderItemsDAO.addOrderItem(item);
				if (result > 0) {
					return ResponsesUtil.createSuccessResponse("Order added to cart successfully.");
				} else {
					throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR,
							"Failed to add order item.");
				}
			} else {
				throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to place order.");
			}

		} catch (CustomApplicationException e) {
			throw e;
		}
	}

	
	
	public String doPut(HttpServletRequest request) throws Exception {

	    String path = request.getPathInfo();
	    String[] pathParts = path.split("/");

	    int userId = Integer.parseInt(pathParts[2]);
	    int orderId = Integer.parseInt(pathParts[4]);

	    // Retrieve order for the user
	    Order userOrder = UsersOrdersDAO.getOrder(orderId);

	    if (userOrder == null) {
	        throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Order not found for the user.");
	    }

	    String payload = (String) request.getAttribute("requestPayload");
	    Order orderInput = objectMapper.readValue(payload, Order.class);
	    orderInput.setOrderId(orderId);
	    orderInput.setUserId(userId);

	    Address address = AddressesDAO.getDefaultAddressForUser(userId);
	    int addressId = address.getAddressId();

	 // Logic for completed status of 1 (setting order date, address ID, and stock check)
	    if (orderInput.getisCompleted() == 1) {
	        List<OrderItem> orderItems = UsersOrderItemsDAO.getOrderItemsByOrderId(orderId);
	        if (orderItems == null || orderItems.isEmpty()) {
	            throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "No Order Items found for the given Order.");
	        }

	        boolean stockSufficient = true;
	        StringBuilder responseMessage = new StringBuilder();

	        for (OrderItem orderItem : orderItems) {
	            int foodItemId = orderItem.getFoodItemId();
	            int orderedQuantity = orderItem.getQuantity();

	            Fooditem foodItem = FooditemsDAO.getFoodItemById(foodItemId);

	            if (foodItem != null && foodItem.getStock() != null) {
	                int currentStock = foodItem.getStock();
	                if (currentStock < orderedQuantity) {
	                    responseMessage.append("Insufficient stock for food item: ")
	                            .append(foodItem.getFoodDetails().getName()).append(". ");
	                    stockSufficient = false;
	                }
	            } else {
	                responseMessage.append("Food item not found or invalid: ")
	                        .append(orderItem.getFoodItemId()).append(". ");
	                stockSufficient = false;
	            }
	        }

	        if (!stockSufficient) {
	            // Send error response for insufficient stock
	        	throw new CustomApplicationException(AppErrorType.INVALID_INPUT,responseMessage.toString().trim());
	        }

	        // All stock checks passed, set order date and address
	        orderInput.setOrderDate(System.currentTimeMillis() / 1000); // Set current epoch time
	        orderInput.setAddressId(addressId);
	    }
	    
	    // Logic for accept order with completed status of 2
	    if (orderInput.getisCompleted() == 2) {
	        List<OrderItem> orderItems = UsersOrderItemsDAO.getOrderItemsByOrderId(orderId);
	        if (orderItems == null || orderItems.isEmpty()) {
	            throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "No Order Items found for the given Order");
	        }

	        boolean stockUpdated = true;
	        StringBuilder responseMessage = new StringBuilder();

	        for (OrderItem orderItem : orderItems) {
	            int foodItemId = orderItem.getFoodItemId();
	            int orderedQuantity = orderItem.getQuantity();

	            Fooditem foodItem = FooditemsDAO.getFoodItemByFoodId(foodItemId);

	            if (foodItem != null && foodItem.getStock() != null) {
	                int currentStock = foodItem.getStock();
	                if (currentStock >= orderedQuantity) {
	                    // Decrease the stock by the ordered quantity
	                    foodItem.setStock(currentStock - orderedQuantity);
	                    FooditemsDAO.updateFoodItem(foodItem);
	                } else {
	                    responseMessage.append("Insufficient stock for food item: ").append(foodItem.getFoodDetails().getName()).append(". ");
	                    stockUpdated = false;
	                }
	            } else {
	                responseMessage.append("Food item not found: ").append(foodItem.getFoodDetails().getName()).append(". ");
	                stockUpdated = false;
	            }
	        }

	        if (!stockUpdated) {
	            // Send error response for insufficient stock
	            return ResponsesUtil.createErrorResponse(responseMessage.toString().trim());
	        }
	    }

	    // Update the order in the database
	    boolean updated = UsersOrdersDAO.updateOrder(orderInput);
	    if (updated) {
	        return ResponsesUtil.createSuccessResponse("Order updated successfully");
	    } else {
	        throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to update the order.");
	    }
	}

	
	
	public String doDelete(HttpServletRequest request) throws Exception {
		
		String path = request.getPathInfo();

			String[] pathParts = path.split("/");
			int orderId,userId ;
			userId = Integer.parseInt(pathParts[2]);
			orderId = Integer.parseInt(pathParts[4]); 
			
			// Retrieve orders of the user
			Order userOrders = UsersOrdersDAO.getOrderById(userId,orderId);
	        
	        if (userOrders==null) {
	            throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Order not found for the user.");
	        }
			
			boolean deleted = UsersOrdersDAO.deleteOrder(orderId);
			if (deleted) {
				return ResponsesUtil.createSuccessResponse("Cart deleted successfully.");
			} else {
				throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Deletion failed.");
			}
	}

	
	
	public String doGet(HttpServletRequest request) throws Exception {
		
		String path = request.getPathInfo();

		try {
			String[] pathParts = path.split("/");

			switch (pathParts.length) {
			case 4:
				if ("users".equalsIgnoreCase(pathParts[1]) && "orders".equalsIgnoreCase(pathParts[3])) {
					int userId = Integer.parseInt(pathParts[2]);
					return handleGetUserOrders(request, userId);
				}

				
				else if ("restaurants".equalsIgnoreCase(pathParts[1]) && "orders".equalsIgnoreCase(pathParts[3])) {
					int restaurantId = Integer.parseInt(pathParts[2]);
					
					Restaurant restaurant=RestaurantsDAO.getRestaurantById(restaurantId);
		            if (restaurant ==null) {
		                throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Restaurant does not exist.");
		            }
		            
					return handleGetOrdersByRestaurantId(request, restaurantId);
				}
			case 5:
				if ("users".equalsIgnoreCase(pathParts[1]) && "orders".equalsIgnoreCase(pathParts[3])) {
					int userId = Integer.parseInt(pathParts[2]);
					int orderId = Integer.parseInt(pathParts[4]);
					return handleGetOrderByID(request, userId, orderId);
				}
			default:
				throw new CustomApplicationException(AppErrorType.ACTION_NOT_FOUND);
			}

		} catch (CustomApplicationException e) {
			throw e;
		}
	}

	
	
	private String handleGetUserOrders(HttpServletRequest request, int userId) throws Exception {
		// Get the 'isCompleted' parameter from the request
		String isCompletedParam = request.getParameter("isCompleted");
		Integer isCompleted = null;

		// Map the query parameter to respective integers
		if (isCompletedParam != null) {
			switch (isCompletedParam.toLowerCase()) {
			case "accepted":
				isCompleted = 2;
				break;
			case "placed":
				isCompleted = 1;
				break;
			case "rejected":
				isCompleted = -1;
				break;
			case "cart":
				isCompleted = 0;
				break;
			default:
				throw new CustomApplicationException(AppErrorType.ACTION_NOT_FOUND,"Invalid IsCompleted parameter. It must be 'accepted', 'placed', or 'rejected'");
			}
		}

		try {
			List<Order> orders;
			
			// If 'isCompleted' is provided, get orders by completion status
			if (isCompleted != null) {
				orders = UsersOrdersDAO.getOrdersByCompletionStatus(userId, isCompleted);
			} else {
				orders = UsersOrdersDAO.getOrdersByUserId(userId);
			}
			for (Order order : orders) {
			    if (Integer.valueOf(0).equals(isCompleted)) {
			        List<OrderItem> orderItems = UsersOrderItemsDAO.getOrderItemsByOrderId(order.getOrderId());
			        order.setOrderItems(orderItems);
			    }
			}
			if (orders.isEmpty()) {
				throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "No orders found.");
			}

			return objectMapper.writeValueAsString(orders);

		} catch (CustomApplicationException e) {
			throw e;
		}
	}

	
	
	private String handleGetOrdersByRestaurantId(HttpServletRequest request, int restaurantId) throws Exception {
		String isCompletedParam = request.getParameter("isCompleted");
		Integer isCompleted = null;

		// Map the query parameter to respective integers
		if (isCompletedParam != null) {
			switch (isCompletedParam.toLowerCase()) {
			case "accepted":
				isCompleted = 2;
				break;
			case "placed":
				isCompleted = 1;
				break;
			case "rejected":
				isCompleted = -1;
				break;
			case "cart":
				isCompleted = 0;
				break;
			default:
				throw new CustomApplicationException(AppErrorType.ACTION_NOT_FOUND,
						"Invalid IsCompleted parameter. It must be 'accepted', 'placed', or 'rejected'");
			}
		}

		try {
			// Fetch orders for the restaurant based on completion status
			List<Order> orders = UsersOrdersDAO.getOrdersByRestaurantId(restaurantId, isCompleted);

			if (orders.isEmpty()) {
				throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "No orders found.");
			}

			return objectMapper.writeValueAsString(orders);
		} catch (CustomApplicationException e) {
			throw e;
		}
	}

	
	
	private String handleGetOrderByID(HttpServletRequest request, int userId, int orderId) throws Exception {

		try {
			Order orders = UsersOrdersDAO.getOrderById(userId, orderId);

			if (orders == null) {
				throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "No orders found.");
			}
			return objectMapper.writeValueAsString(orders);

		} catch (SQLException e) {
			throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR);

		}
	}

}
