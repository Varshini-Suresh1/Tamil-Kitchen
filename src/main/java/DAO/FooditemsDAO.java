package DAO;

import models.FoodDetails;
import models.Fooditem;
import utils.DBQueryHandler;
import utils.POJOExtractor;
import utils.ResultsetToPOJO;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import java.util.List;

public class FooditemsDAO {
	
	public static int addFoodItem(Fooditem foodItem) throws SQLException {
	    String tableName = "FoodItem";
	    POJOExtractor.FieldData fieldData = POJOExtractor.extractFields(foodItem, "foodItemid","foodDetails","price");

        String[] columns = fieldData.getColumns();
        Object[] values = fieldData.getValues();

        try {
        	return DBQueryHandler.insertQuery(tableName, columns, values);
        }
        catch (Exception e) {
            if (e instanceof SQLException) {
                SQLException sqlException = (SQLException) e;
                if (sqlException.getSQLState().equals("23505")) { 
                    return -1;
                }
            }
            e.printStackTrace();
            return 0; 
        }
	    
	}
	
	
	
	public static int addFoodItemPrice(BigDecimal price,int foodItemId) throws SQLException {
        String[] columns = {"FoodItemID", "Price", "UpdatedDate"};
        Object[] values = {foodItemId, price, System.currentTimeMillis() / 1000}; 

        int priceHistoryId = DBQueryHandler.insertQuery("PriceHistory", columns, values);

	    return priceHistoryId;
	}
	
	
	
	public static boolean updateFoodItem(Fooditem foodItem) throws SQLException {
	    String[] columns = { "Stock"};
	    Object[] values = {foodItem.getStock()};
	    String[] conditionColumns = {"FoodItemID", "RestaurantID"};
	    Object[] conditionValues = {foodItem.getFoodItemID(), foodItem.getRestaurantID()};
	    String[] logicalOperator = {"AND"};

	    int r=DBQueryHandler.updateQuery("FoodItem", columns, values, conditionColumns, conditionValues, new String[]{"=", "="}, logicalOperator);
	    return r>0;
	}

	

	
	public static boolean deleteFoodItem(int foodItemId) throws SQLException {
		 String[] columns = { "isFoodItemDeleted"};
		    Object[] values = {true};
		    String[] conditionColumns = {"FoodItemID"};
		    Object[] conditionValues = {foodItemId};

		    int r=DBQueryHandler.updateQuery("FoodItem", columns, values, conditionColumns, conditionValues, new String[]{"="},null);
		    return r>0;
	}

	
	
	public static List<Fooditem> getAllFoodItems(int restaurantID) {
	    List<Fooditem> foodItems = new ArrayList<>();

	    // SQL Columns including soldQuantity calculation
	    String[] selectColumns = {
	        "f.FoodItemID",
	        "f.Stock",
	        "f.RestaurantID",
	        "f.FoodDetailsID",
	        "fd.Name",
	        "fd.Type",
	        "fd.IsVeg",
	        "(SELECT ph.Price FROM \"PriceHistory\" ph WHERE ph.FoodItemID = f.FoodItemID ORDER BY ph.UpdatedDate DESC LIMIT 1) AS price",
	        "(SELECT COALESCE(SUM(oi.Quantity), 0) " +
	            "FROM \"OrderItem\" oi " +
	            "JOIN \"Order\" o ON oi.OrderID = o.OrderID " +
	            "WHERE oi.FoodItemID = f.FoodItemID AND o.IsCompleted = 2) AS SoldQuantity"  // Calculating soldQuantity
	    };

	    String[] tableNames = { "\"FoodItem\" f", "\"FoodDetails\" fd" };
	    String[][] joinConditions = { { "f.FoodDetailsID", "fd.FoodDetailsID" } };
	    String[] joinTypes = { "INNER" };

	    String[] conditionColumns = { "f.RestaurantID", "isfoodItemDeleted" };
	    Object[] conditionValues = { restaurantID, false };
	    String[] operators = { "=", "=" };
	    String[] logicalOperators = { "AND" };
	    String[] orderByColumns = { "f.FoodItemID" };
	    boolean[] isAscending = { false };

	    try {
	        ResultSet rs = DBQueryHandler.readQuery(selectColumns, tableNames, joinConditions,
	                conditionColumns, conditionValues, operators, logicalOperators, joinTypes, orderByColumns, isAscending);

	        while (rs.next()) {
	        	Fooditem foodItem ;
	        	foodItem = ResultsetToPOJO.mapResultSetToPOJO(rs, Fooditem.class);
	        	FoodDetails foodDetails = new FoodDetails();
	        	foodDetails= ResultsetToPOJO.mapResultSetToPOJO(rs, FoodDetails.class);
	        	foodItem.setFoodDetails(foodDetails);
	        	
	            foodItems.add(foodItem);
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    return foodItems;
	}


	
	
	 public static List<Fooditem> getFoodItemByStock(int stock, int restaurantId) {
		    List<Fooditem> foodItems = new ArrayList<>();
		    
		    String[] selectColumns = {
		        "f.FoodItemID",
		        "f.Stock",
		        "f.RestaurantID",
		        "f.FoodDetailsID",
		        "fd.Name AS name",
		        "fd.Type",
		        "fd.IsVeg",
		        "(SELECT ph.Price FROM \"PriceHistory\" ph WHERE ph.FoodItemID = f.FoodItemID ORDER BY ph.UpdatedDate DESC LIMIT 1) AS price",
		        "(SELECT COALESCE(SUM(oi.Quantity), 0) " +
			            "FROM \"OrderItem\" oi " +
			            "JOIN \"Order\" o ON oi.OrderID = o.OrderID " +
			            "WHERE oi.FoodItemID = f.FoodItemID AND o.IsCompleted = 2) AS SoldQuantity" 
		    };

		    String[] tableNames = { "\"FoodItem\" f", "\"FoodDetails\" fd" };
		    String[][] joinConditions = { { "f.FoodDetailsID", "fd.FoodDetailsID" } };
		    String[] joinTypes = { "INNER" };

		    String[] conditionColumns = { "f.RestaurantID", "f.Stock" ,"f.isfoodItemDeleted"};
		    Object[] conditionValues = { restaurantId, stock ,false}; 
		    String[] operators = { "=", "<=" ,"="};
		    String[] logicalOperators = { "AND" ,"AND"};
	        String[] orderByColumns = {"f.foodItemID"};  
	        boolean[] isAscending = {false};  

		    try {
		        ResultSet rs = DBQueryHandler.readQuery(selectColumns, tableNames, joinConditions,
		                conditionColumns, conditionValues, operators, logicalOperators, joinTypes,orderByColumns, 
		                isAscending);
		        
		        while (rs.next()) {
		        	Fooditem foodItem ;
		        	foodItem = ResultsetToPOJO.mapResultSetToPOJO(rs, Fooditem.class);
		        	FoodDetails foodDetails = new FoodDetails();
		        	foodDetails= ResultsetToPOJO.mapResultSetToPOJO(rs, FoodDetails.class);
		        	foodItem.setFoodDetails(foodDetails);
		        	
		            foodItems.add(foodItem);
		        }
		        
		    } catch (SQLException e) {
		        e.printStackTrace();
		    }

		    return foodItems;
		}


	 
	 
	 public static Fooditem getFoodItemById(int foodItemId) {

		    Fooditem foodItem = null;

		    String[] selectColumns = {
		        "f.FoodItemID",
		        "f.Stock",
		        "f.RestaurantID",
		        "f.FoodDetailsID",
		        "fd.Name AS name",
		        "fd.Type",
		        "fd.IsVeg",
		        "(SELECT ph.Price FROM \"PriceHistory\" ph WHERE ph.FoodItemID = f.FoodItemID ORDER BY ph.UpdatedDate DESC LIMIT 1) AS price",
		        "(SELECT COALESCE(SUM(oi.Quantity), 0) " +
			            "FROM \"OrderItem\" oi " +
			            "JOIN \"Order\" o ON oi.OrderID = o.OrderID " +
			            "WHERE oi.FoodItemID = f.FoodItemID AND o.IsCompleted = 2) AS SoldQuantity" 
		    };

		    String[] tableNames = { "\"FoodItem\" f", "\"FoodDetails\" fd" };
		    String[][] joinConditions = { { "f.FoodDetailsID", "fd.FoodDetailsID" } };
		    String[] joinTypes = { "INNER" };
		    String[] conditionColumns = { "f.FoodItemID" ,"f.isfoodItemDeleted"};
		    Object[] conditionValues = { foodItemId ,false};
		    String[] operators = { "=" ,"="};
		    String[] logicalOperators = {"AND"};

		    try {
		        ResultSet rs = DBQueryHandler.readQuery(selectColumns, tableNames, joinConditions,
		                conditionColumns, conditionValues, operators, logicalOperators, joinTypes);
		        if (rs.next()) {
		        	foodItem = ResultsetToPOJO.mapResultSetToPOJO(rs, Fooditem.class);
		        	FoodDetails foodDetails = new FoodDetails();
		        	foodDetails= ResultsetToPOJO.mapResultSetToPOJO(rs, FoodDetails.class);
		        	foodItem.setFoodDetails(foodDetails);
		        }

		    } catch (SQLException e) {
		        e.printStackTrace();
		    }

		    return foodItem;  
		}

	 
	 
	 public static Fooditem getFoodItemByFoodId(int foodItemId) {
		    Fooditem foodItem = new Fooditem();
		    String[] selectColumns = {
		        "f.FoodItemID",
		        "f.Stock",
		        "f.RestaurantID",
		        "f.FoodDetailsID",
		        "fd.Name AS name",
		        "fd.Type",
		        "fd.IsVeg",
		        "(SELECT ph.Price FROM \"PriceHistory\" ph WHERE ph.FoodItemID = f.FoodItemID ORDER BY ph.UpdatedDate DESC LIMIT 1) AS price",
		    };

		    String[] tableNames = { "\"FoodItem\" f", "\"FoodDetails\" fd" };
		    String[][] joinConditions = { { "f.FoodDetailsID", "fd.FoodDetailsID" } };
		    String[] joinTypes = { "INNER" };
		    String[] conditionColumns = {"f.FoodItemID" ,"f.isfoodItemDeleted"};
		    Object[] conditionValues = {foodItemId ,false};
		    String[] operators = { "=", "=" };
		    String[] logicalOperators = { "AND"};

		    try {
		        ResultSet rs = DBQueryHandler.readQuery(selectColumns, tableNames, joinConditions,
		                conditionColumns, conditionValues, operators, logicalOperators, joinTypes);
		        if (rs.next()) {
		        	foodItem = ResultsetToPOJO.mapResultSetToPOJO(rs, Fooditem.class);
		        	FoodDetails foodDetails = new FoodDetails();
		        	foodDetails= ResultsetToPOJO.mapResultSetToPOJO(rs, FoodDetails.class);
		        	foodItem.setFoodDetails(foodDetails);
		        }

		    } catch (SQLException e) {
		        e.printStackTrace();
		    }

		    return foodItem; 
		}
	 
		
	
	
}
