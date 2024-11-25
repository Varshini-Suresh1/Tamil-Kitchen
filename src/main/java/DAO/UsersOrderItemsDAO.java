package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import models.OrderItem;
import utils.DBQueryHandler;
import utils.POJOExtractor;
import utils.ResultsetToPOJO;

public class UsersOrderItemsDAO {

    public static int addOrderItem(OrderItem orderItem) throws SQLException {
        String tableName = "OrderItem";
        POJOExtractor.FieldData fieldData = POJOExtractor.extractFields(orderItem, "orderItemId","price","foodItemName");

        String[] columns = fieldData.getColumns();
        Object[] values = fieldData.getValues();
        int insertedRows = DBQueryHandler.insertQuery(tableName, columns, values);
        return insertedRows;  
    }
    
    
    
    public static boolean updateOrderItem(OrderItem orderItem) {
        String[] updateColumns = {"Quantity"};  
        Object[] updateValues = {orderItem.getQuantity()};  
        String[] conditionColumns = {"OrderItemID"}; 
        Object[] conditionValues = {orderItem.getOrderItemId()};  

        try {
            int rowsUpdated = DBQueryHandler.updateQuery("OrderItem", updateColumns, updateValues, conditionColumns, conditionValues, new String[]{"="}, null);
            return rowsUpdated > 0;  
        } catch (Exception e) {
            e.printStackTrace();  
        }

        return false; 
    }

    
    
    public static boolean deleteOrderItem(int orderItemId){
        String[] conditionColumns = {"OrderItemID"};  
        Object[] conditionValues = {orderItemId};  

        try {
            int rowsDeleted = DBQueryHandler.deleteQuery("OrderItem", conditionColumns, conditionValues, new String[]{"="},null);
            return rowsDeleted > 0; 
        } catch (Exception e) {
            e.printStackTrace();  
        }

        return false; 
    }
    
    
    
    
    public static OrderItem getOrderItemById(int orderItemId) throws SQLException {
        OrderItem orderItem = null;
        String[] selectColumns = {"OrderItemID", "OrderID", "FoodItemID", "Quantity"};
        String[] conditionColumns = {"OrderItemID"};
        Object[] conditionValues = {orderItemId};
        String[] operators = {"="};

        ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"OrderItem\""}, null, conditionColumns, conditionValues, operators, null, null);
        
        try {
            if (rs != null && rs.next()) {
                orderItem = new OrderItem();
                orderItem=ResultsetToPOJO.mapResultSetToPOJO(rs, OrderItem.class);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orderItem;
    }
    
    
    

    public static List<OrderItem> getOrderItemsByOrderId(int orderId) throws SQLException {
        List<OrderItem> orderItems = new ArrayList<>();

        String[] selectColumns = {
            "oi.OrderItemID", 
            "oi.OrderID", 
            "oi.FoodItemID", 
            "oi.Quantity",
            "fd.Name AS FoodItemName", 
            "(SELECT ph.Price FROM \"PriceHistory\" ph WHERE ph.FoodItemID = fi.FoodItemID ORDER BY ph.UpdatedDate DESC LIMIT 1) AS Price"  // Subquery to fetch the latest price
        };

        String[] tableNames = {
            "\"OrderItem\" oi", 
            "\"FoodItem\" fi", 
            "\"FoodDetails\" fd"
        };

        // Define the join conditions
        String[][] joinConditions = {
            {"oi.FoodItemID", "fi.FoodItemID"},      
            {"fi.FoodDetailsID", "fd.FoodDetailsID"}  
        };

        String[] conditionColumns = {"oi.OrderID"};
        Object[] conditionValues = {orderId};
        String[] operators = {"="};
        String[] logicalOperators = null;  

        String[] joinTypes = {"INNER", "INNER"};

        try (ResultSet rs = DBQueryHandler.readQuery(selectColumns, tableNames, joinConditions, conditionColumns, conditionValues, operators, logicalOperators, joinTypes)) {
            while (rs != null && rs.next()) {
                OrderItem orderItem = new OrderItem();
                orderItem=ResultsetToPOJO.mapResultSetToPOJO(rs, OrderItem.class);

                orderItems.add(orderItem);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw e; 
        }

        return orderItems;
    }
}
