package services;

import com.fasterxml.jackson.databind.ObjectMapper;
import DAO.UsersOrderItemsDAO;
import models.OrderItem;
import utils.AppErrorType;
import utils.CustomApplicationException;
import utils.ResponsesUtil;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class OrderitemsService {

    private ObjectMapper objectMapper = new ObjectMapper();

    public String doPost(HttpServletRequest request) throws Exception {
    	
        String path = request.getPathInfo();

        try {
            String[] pathParts = path.split("/");
            int orderId;
            orderId = Integer.parseInt(pathParts[4]); 

            String payload = (String) request.getAttribute("requestPayload");
            OrderItem orderItem = objectMapper.readValue(payload, OrderItem.class);
            orderItem.setOrderId(orderId); 
            
            // Check if the foodItemId already exists in the current order
            List<OrderItem> existingOrderItems = UsersOrderItemsDAO.getOrderItemsByOrderId(orderId);
            for (OrderItem existingOrderItem : existingOrderItems) {
                if (existingOrderItem.getFoodItemId() == orderItem.getFoodItemId()) {
                    throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "This food item is already added to the cart.");
                }
            }

            int res = UsersOrderItemsDAO.addOrderItem(orderItem);
            if (res > 0) {
            	return ResponsesUtil.createSuccessResponse("Added to cart successfully.");
            } else {
            	throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to add cart item.");
            }
        } catch (Exception e) {
            throw e;
        }
    }

    
    
    public String doPut(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();

        try {
            String[] pathParts = path.split("/");
            
            int orderId;
            int orderItemId;
            orderId = Integer.parseInt(pathParts[4]); 
            orderItemId = Integer.parseInt(pathParts[6]); 
            
            OrderItem existingOrderItem = UsersOrderItemsDAO.getOrderItemById(orderItemId);
            if (existingOrderItem == null) {
                throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Order item not found.");
            }
           
            String payload = (String) request.getAttribute("requestPayload");
            OrderItem orderItem = objectMapper.readValue(payload, OrderItem.class);
           
            orderItem.setOrderId(orderId);
            orderItem.setOrderItemId(orderItemId);

            
            boolean isUpdated = UsersOrderItemsDAO.updateOrderItem(orderItem);
            if (isUpdated) {
            	return ResponsesUtil.createSuccessResponse("Updated cart item successfully.");
            } else {
            	throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to update order item.");
            }

        } catch (Exception e) {
            throw e;
        }
    }
    
    
    
    public String doDelete(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();
        
        try {
            String[] pathParts = path.split("/");
            int orderItemId;
            orderItemId = Integer.parseInt(pathParts[6]);
            
            OrderItem existingOrderItem = UsersOrderItemsDAO.getOrderItemById(orderItemId);
            if (existingOrderItem == null) {
                throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Order item not found.");
            }
            
            boolean deleted = UsersOrderItemsDAO.deleteOrderItem(orderItemId);
            if (deleted) {
            	return ResponsesUtil.createSuccessResponse("Cart item deleted successfully.");
            } else {
            	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Cart item not found.");
            }
            
        } catch (Exception e) {
            throw e;
        }
    }

    
    
    public String doGet(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();

        try {
            String[] pathParts = path.split("/");
            int orderId;
            orderId = Integer.parseInt(pathParts[4]);
            
            List<OrderItem> orderItems = UsersOrderItemsDAO.getOrderItemsByOrderId(orderId);
            
            if (orderItems.isEmpty()) {
            	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "No order items found.");
            }
            return objectMapper.writeValueAsString(orderItems);
            
        } catch (Exception e) {
            throw e;
        }
    }

}
