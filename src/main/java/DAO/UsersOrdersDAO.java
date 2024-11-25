package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import models.Order;
import models.OrderItem;
import utils.DBQueryHandler;
import utils.POJOExtractor;
import utils.ResultsetToPOJO;

public class UsersOrdersDAO {

    public static int addOrder(Order order) throws SQLException {
        String tableName = "Order";
        POJOExtractor.FieldData fieldData = POJOExtractor.extractFields(order, "orderId","restaurantId","orderItems","addressId");

        String[] columns = fieldData.getColumns();
        Object[] values = fieldData.getValues();

        int orderId = DBQueryHandler.insertQuery(tableName, columns, values);
        return orderId;  
    }
    
    
    public static boolean updateOrder(Order order) throws SQLException {
        POJOExtractor.FieldData fieldData = POJOExtractor.extractFields(order, "userId","orderId","restaurantId","orderItems"); 

        String[] updateColumns = fieldData.getColumns();
        Object[] updateValues = fieldData.getValues();
        String[] conditionColumns = {"OrderID"};
        Object[] conditionValues = {order.getOrderId()};

        try {
            int rowsUpdated = DBQueryHandler.updateQuery(
                "Order", 
                updateColumns, 
                updateValues, 
                conditionColumns, 
                conditionValues, 
                new String[]{"="}, 
                null
            );
            return rowsUpdated > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;  
    }

    
    public static boolean deleteOrder(int orderId) throws Exception{
        String[] conditionColumns = {"OrderID"}; 
        Object[] conditionValues = {orderId}; 

        try {
            int rowsDeleted = DBQueryHandler.deleteQuery("OrderItem", conditionColumns, conditionValues, new String[]{"="},null);
            int rows=DBQueryHandler.deleteQuery("Order", conditionColumns, conditionValues, new String[]{"="},null);
            return rowsDeleted+rows > 0;  
        } catch (Exception e) {
            throw e; 
        }
    }
    
    
    
    public static Order getOrder(int orderId) throws SQLException {
    	Order order= null;
        String[] selectColumns = {"*"};
        String[] conditionColumns = {"OrderId"};
        Object[] conditionValues = {orderId};
        String[] operators = { "="}; 

        
	    ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"Order\""}, null,conditionColumns,conditionValues,operators,null, null);
		try {
            if (rs != null && rs.next()) {
            	order = ResultsetToPOJO.mapResultSetToPOJO(rs, Order.class); 
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return order;
    }
    
    
    
    
    public static Order getOrderById(int userId, int orderId) throws SQLException {
        Order order = null;
        String[] selectColumns = {
                "o.OrderID",
                "o.UserID",
                "o.OrderDate",
                "o.AddressId",
                "o.isCompleted",
                "o.rating",
                "oi.FoodItemID",
                "oi.Quantity",
                "fi.restaurantID",
                "r.Name AS RestaurantName", 
                "(SELECT ph.Price FROM \"PriceHistory\" ph WHERE ph.FoodItemID = oi.FoodItemID AND ph.UpdatedDate <= o.OrderDate ORDER BY ph.UpdatedDate DESC LIMIT 1) AS LatestPrice",
                "(SELECT fd.Name FROM \"FoodDetails\" fd WHERE fd.FoodDetailsID = fi.FoodDetailsID) AS FoodName"
            };

            String[] tableNames = {
                "\"Order\" o", 
                "\"OrderItem\" oi", 
                "\"FoodItem\" fi", 
                "\"Restaurant\" r" 
            };

            String[][] joinConditions = {
                {"o.OrderID", "oi.OrderID"},
                {"fi.FoodItemID", "oi.FoodItemID"},
                {"fi.RestaurantID", "r.RestaurantID"} 
            };
        
        String[] conditionColumns = {"o.OrderID", "o.UserID"};
        Object[] conditionValues = {orderId, userId};
        String[] operators = {"=", "="};

        ResultSet resultSet = DBQueryHandler.readQuery(
            selectColumns, 
            tableNames, 
            joinConditions, 
            conditionColumns, 
            conditionValues, 
            operators, 
            new String[]{"AND"}, 
            new String[]{"INNER", "INNER", "INNER"}
        );

        try {
            if (resultSet != null && resultSet.next()) {
                order = ResultsetToPOJO.mapResultSetToPOJO(resultSet, Order.class);

                List<OrderItem> orderItems = new ArrayList<>();
                do {
                    OrderItem orderItem = ResultsetToPOJO.mapResultSetToPOJO(resultSet, OrderItem.class);
                    orderItems.add(orderItem);
                } while (resultSet.next() && orderId == resultSet.getInt("OrderID"));

                order.setOrderItems(orderItems);
            }
        } catch (SQLException e) {
           throw e;
        } finally {
            if (resultSet != null) {
                resultSet.close();
            }
        }

        return order; 
    }
    
    
    
    public static List<Order> getOrdersByCompletionStatus(int userId, Integer isCompleted) throws SQLException {
        List<Order> orders = new ArrayList<>();
        //The orders with no OrderItem will not be included in reseltSet as "INNER JOIN" is used
        String[] selectColumns = {
            "o.OrderID",
            "o.UserID",
            "o.OrderDate",
            "o.AddressId",
            "o.isCompleted",
            "o.rating",
            "oi.FoodItemID",
            "oi.Quantity",
            "fi.restaurantID",
            "r.Name AS RestaurantName", 
            "(SELECT ph.Price FROM \"PriceHistory\" ph WHERE ph.FoodItemID = oi.FoodItemID AND ph.UpdatedDate <= o.OrderDate ORDER BY ph.UpdatedDate DESC LIMIT 1) AS LatestPrice",
            "(SELECT fd.Name FROM \"FoodDetails\" fd WHERE fd.FoodDetailsID = fi.FoodDetailsID) AS FoodName"
        };

        String[] tableNames = {
            "\"Order\" o", 
            "\"OrderItem\" oi", 
            "\"FoodItem\" fi", 
            "\"Restaurant\" r" 
        };

        String[][] joinConditions = {
            {"o.OrderID", "oi.OrderID"},
            {"fi.FoodItemID", "oi.FoodItemID"},
            {"fi.RestaurantID", "r.RestaurantID"} 
        };

        String[] conditionColumns = {"o.UserID", "o.isCompleted"};
        Object[] conditionValues = {userId, isCompleted}; 

        String[] operators = {"=", "="}; 

        String[] joinTypes = {"INNER", "INNER", "INNER"}; 

        ResultSet resultSet = DBQueryHandler.readQuery(
            selectColumns,
            tableNames,
            joinConditions,
            conditionColumns,
            conditionValues,
            operators,
            new String[]{"AND"}, 
            joinTypes
        );

        try {
        	 Order currentOrder = null;
             List<OrderItem> currentOrderItems = new ArrayList<>();
             
            while (resultSet != null && resultSet.next()) {
                int orderId = resultSet.getInt("OrderID");

                // If a new order is found, push the current order and reset
                if (currentOrder == null || currentOrder.getOrderId() != orderId) {
                    if (currentOrder != null) {
                        currentOrder.setOrderItems(currentOrderItems);
                        orders.add(currentOrder);
                    }

                    // Create a new order and reset the order items
                    currentOrder = ResultsetToPOJO.mapResultSetToPOJO(resultSet, Order.class);
                    currentOrderItems = new ArrayList<>();
                }

                // Add the current order item
                OrderItem orderItem = ResultsetToPOJO.mapResultSetToPOJO(resultSet, OrderItem.class);
                currentOrderItems.add(orderItem);
            }

            // Add the last order after finishing the loop
            if (currentOrder != null) {
                currentOrder.setOrderItems(currentOrderItems);
                orders.add(currentOrder);
            }

        } catch (SQLException e) {
            throw e;
        } finally {
            if (resultSet != null) {
                resultSet.close();
            }
        }

        return orders;
    }
    
    
    
    public static List<Order> getOrdersByRestaurantId(int restaurantId, Integer isCompleted) throws SQLException {
        List<Order> orders = new ArrayList<>();
        Order currentOrder = null;
        int lastOrderId = -1;

        String[] selectColumns = {
            "o.OrderID",
            "o.UserID",
            "o.OrderDate",
            "o.AddressId",
            "o.isCompleted",
            "oi.FoodItemID",
            "oi.Quantity",
            "fi.RestaurantID",
            "r.Name AS RestaurantName",
            "(SELECT ph.Price FROM \"PriceHistory\" ph WHERE ph.FoodItemID = oi.FoodItemID AND ph.UpdatedDate <= o.OrderDate ORDER BY ph.UpdatedDate DESC LIMIT 1) AS price",
            "(SELECT fd.Name FROM \"FoodDetails\" fd WHERE fd.FoodDetailsID = fi.FoodDetailsID) AS foodItemName",
            "a.Address",
            "a.Location"
        };

        String[] tableNames = {
            "\"Order\" o",
            "\"OrderItem\" oi",
            "\"FoodItem\" fi",
            "\"Restaurant\" r",
            "\"Addresses\" a"
        };

        String[][] joinConditions = {
            {"o.OrderID", "oi.OrderID"},
            {"fi.FoodItemID", "oi.FoodItemID"},
            {"fi.RestaurantID", "r.RestaurantID"},
            {"o.AddressID", "a.AddressID"} 
        };

        List<String> conditionColumns = new ArrayList<>();
        List<Object> conditionValues = new ArrayList<>();
        List<String> operators = new ArrayList<>();

        conditionColumns.add("fi.RestaurantID");
        conditionValues.add(restaurantId);
        operators.add("=");

        if (isCompleted != null) {
            conditionColumns.add("o.isCompleted");
            conditionValues.add(isCompleted);
            operators.add("=");
        }

        String[] conditionColumnsArray = conditionColumns.toArray(new String[0]);
        Object[] conditionValuesArray = conditionValues.toArray();
        String[] operatorsArray = operators.toArray(new String[0]);

        String[] joinTypes = {"INNER", "INNER", "INNER", "LEFT"};

        ResultSet resultSet = DBQueryHandler.readQuery(
            selectColumns,
            tableNames,
            joinConditions,
            conditionColumnsArray,
            conditionValuesArray,
            operatorsArray,
            new String[]{"AND"}, 
            joinTypes
        );

        try {
            while (resultSet != null && resultSet.next()) {
                int orderId = resultSet.getInt("OrderID");

                if (orderId != lastOrderId) {
                    currentOrder = new Order();
                    currentOrder =  ResultsetToPOJO.mapResultSetToPOJO(resultSet, Order.class);

                    currentOrder.setOrderItems(new ArrayList<>());
                    orders.add(currentOrder);
                    lastOrderId = orderId;
                }

                OrderItem orderItem = new OrderItem();
                orderItem =  ResultsetToPOJO.mapResultSetToPOJO(resultSet, OrderItem.class);

                currentOrder.getOrderItems().add(orderItem);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return orders;
    }

    
    public static List<Order> getOrdersByUserId(int userId) throws SQLException {
        List<Order> orders = new ArrayList<>();
        Order currentOrder = null; 
        int lastOrderId = -1; 

        String[] selectColumns = {
            "o.OrderID",
            "o.UserID",
            "o.OrderDate",
            "o.AddressId",
            "o.isCompleted",
            "o.rating",
            "oi.FoodItemID",
            "oi.Quantity",
            "fi.RestaurantID",
            "r.Name AS RestaurantName",
            "(SELECT ph.Price FROM \"PriceHistory\" ph WHERE ph.FoodItemID = oi.FoodItemID AND ph.UpdatedDate <= o.OrderDate ORDER BY ph.UpdatedDate DESC LIMIT 1) AS price",
            "(SELECT fd.Name FROM \"FoodDetails\" fd WHERE fd.FoodDetailsID = fi.FoodDetailsID) AS foodItemName",
            "a.Address",
            "a.Location"
        };

        String[] tableNames = {
            "\"Order\" o", 
            "\"OrderItem\" oi", 
            "\"FoodItem\" fi", 
            "\"Restaurant\" r",
            "\"Addresses\" a"
        };

        String[][] joinConditions = {
            {"o.OrderID", "oi.OrderID"},
            {"fi.FoodItemID", "oi.FoodItemID"},
            {"fi.RestaurantID", "r.RestaurantID"},
            {"o.AddressID", "a.AddressID"}
        };

        String[] conditionColumns = {"o.userID","o.isCompleted"};
        Object[] conditionValues = {userId,0};

        String[] operators = {"=","!="};
        String[] joinTypes = {"INNER", "INNER", "INNER", "LEFT"}; 
        String[] orderByColumns = {"o.OrderID"};  
        boolean[] isAscending = {false}; 
        
        ResultSet resultSet = DBQueryHandler.readQuery(
            selectColumns,
            tableNames,
            joinConditions,
            conditionColumns,
            conditionValues,
            operators,
            new String[]{"AND"}, 
            joinTypes,
            orderByColumns, 
            isAscending
        );

        try {
            while (resultSet != null && resultSet.next()) {
                int orderId = resultSet.getInt("OrderID");

                if (orderId != lastOrderId) {
                    currentOrder = new Order();
                    currentOrder =  ResultsetToPOJO.mapResultSetToPOJO(resultSet, Order.class);

                    currentOrder.setOrderItems(new ArrayList<>());
                    orders.add(currentOrder);
                    lastOrderId = orderId;
                }

                OrderItem orderItem = new OrderItem();
                orderItem =  ResultsetToPOJO.mapResultSetToPOJO(resultSet, OrderItem.class);

                currentOrder.getOrderItems().add(orderItem);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return orders;
    }


}
