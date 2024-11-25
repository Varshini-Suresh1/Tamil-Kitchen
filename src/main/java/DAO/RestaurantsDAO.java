package DAO;

import models.Restaurant;
import utils.DBQueryHandler;
import utils.POJOExtractor;
import utils.ResultsetToPOJO;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RestaurantsDAO {


    public static int addRestaurant(Restaurant restaurant) {
    	POJOExtractor.FieldData fieldData = POJOExtractor.extractFields(restaurant, "restaurantId","ownerUsername");

        String[] columns = fieldData.getColumns();
        Object[] values = fieldData.getValues();

        try {
            return DBQueryHandler.insertQuery("Restaurant", columns, values);
        } catch (Exception e) {
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

    public static boolean updateRestaurant(Restaurant restaurant, int restaurantId) throws SQLException {
        POJOExtractor.FieldData fieldData = POJOExtractor.extractFields(restaurant, "restaurantId","ownerUsername");

        String[] columns = fieldData.getColumns();
        Object[] values = fieldData.getValues();
        String[] conditionColumns = {"restaurantId"};
        Object[] conditionValues = {restaurantId};
        int r = DBQueryHandler.updateQuery(
            "Restaurant", columns, values, conditionColumns, conditionValues, new String[]{"="}, null
        );
        
        return r > 0;
    }


    public static boolean deleteRestaurant(int restaurantId) throws SQLException {
        String[] columns = {"isactive"};
        Object[] values = {false};
        String[] conditionColumns = {"restaurantId"};
        Object[] conditionValues = {restaurantId};
        int r = DBQueryHandler.updateQuery(
            "Restaurant", columns, values, conditionColumns, conditionValues, new String[]{"="}, null
        );

        return r > 0; 

    }
    
    
    
    public static Restaurant getRestaurantById(int restaurantId) throws SQLException {
        Restaurant restaurant = null;
        String[] selectColumns = {"*"};
        String[] conditionColumns = {"RestaurantID","isactive"};
        Object[] conditionValues = {restaurantId,true};
        String[] operators = { "=", "=" }; 
	    String[] logicalOperators = { "AND" };

        
	    ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"Restaurant\""}, null,conditionColumns,conditionValues,operators,logicalOperators, null);
		try {
            if (rs != null && rs.next()) {
            	restaurant = ResultsetToPOJO.mapResultSetToPOJO(rs, Restaurant.class); 
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return restaurant;
    }
    
    
    
    public static int getRestaurantId(int ownerId) throws SQLException {
        String[] selectColumns = {"restaurantId"};
        String[] conditionColumns = {"ownerId","isactive"};
        Object[] conditionValues = {ownerId,true};
        String[] operators = { "=" ,"="}; 
        String[] logicalOperators = {"AND"};
        
	    ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"Restaurant\""}, null,conditionColumns,conditionValues,operators,logicalOperators, null);
		try {
            if (rs != null && rs.next()) {
            	return rs.getInt("RestaurantID");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return 0;
    }
    
    
    

    public static List<Restaurant> getAllRestaurants(String location, String restaurantName, String isVeg, BigDecimal ratingThreshold) {
        List<Restaurant> restaurantList = new ArrayList<>();

        String[] selectColumns = {
            "r.RestaurantID",
            "r.Name",
            "r.Location",
            "r.IsVeg",
            "r.OwnerID",
            "u.Username AS OwnerUsername"  
        };

        String[] tableNames = {"\"Restaurant\" r", "\"User\" u"};

        String[][] joinConditions = {
            {"r.OwnerID", "u.UserID"} 
        };

        String[] joinTypes = {"INNER"};

        List<String> conditionColumns = new ArrayList<>();
        List<Object> conditionValues = new ArrayList<>();
        List<String> operators = new ArrayList<>();
        List<String> logicalOperators = new ArrayList<>();
        
        conditionColumns.add("r.isactive");
        conditionValues.add(true);
        operators.add("=");

        if (location != null && !location.isEmpty()) {
            conditionColumns.add("r.Location");
            conditionValues.add(location);
            operators.add("=");
        }

        if (restaurantName != null && !restaurantName.isEmpty()) {
            conditionColumns.add("LOWER(r.Name)");  
            conditionValues.add("%" + restaurantName.toLowerCase() + "%");  
            operators.add("LIKE");
        }

        if (isVeg != null) {
            conditionColumns.add("r.IsVeg");
            conditionValues.add(Boolean.parseBoolean(isVeg)); 
            operators.add("=");
        }
        
        if (conditionColumns.size() > 1) {
            for (int i = 0; i < conditionColumns.size() - 1; i++) {
                logicalOperators.add("AND");
            }
        }
        
        String[] orderByColumns = {"r.RestaurantID"};  
        boolean[] isAscending = {false};  
        try (ResultSet rs = DBQueryHandler.readQuery(
                selectColumns, 
                tableNames, 
                joinConditions, 
                conditionColumns.toArray(new String[0]), 
                conditionValues.toArray(new Object[0]), 
                operators.toArray(new String[0]), 
                logicalOperators.toArray(new String[0]), 
                joinTypes, 
                orderByColumns, 
                isAscending)) {
            
            while (rs != null && rs.next()) {
                Restaurant restaurant = ResultsetToPOJO.mapResultSetToPOJO(rs, Restaurant.class); 
                restaurant.setOwnerUsername(rs.getString("OwnerUsername"));
                
                    restaurantList.add(restaurant);  
                
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return restaurantList;  
    }

    
    
    
    
    public static List<Restaurant> getRestaurantsByFoodName(String foodName, String location) throws SQLException {
        String[] selectColumns = {
            "r.RestaurantID", "r.Name","r.IsVeg", "r.Location"
        };
        String[] tableNames = {
            "\"Restaurant\" r",
            "\"FoodItem\" fi",
            "\"FoodDetails\" fd"
        };

        String[][] joinConditions = {
            {"fi.RestaurantID", "r.RestaurantID"}, 
            {"fi.FoodDetailsID", "fd.FoodDetailsID"} 
        };

        String[] conditionColumns = {"LOWER(fd.Name)","r.isactive","r.location","fi.isFoodItemDeleted"};
        Object[] conditionValues = {"%" + foodName.toLowerCase() + "%", true, location, false};
        String[] operators = {"LIKE", "=", "=", "="};
        String[] logicalOperators = {"AND","AND","AND"}; 

        String[] joinTypes = {"INNER", "INNER"}; 
        String[] orderByColumns = {"r.RestaurantID"};  
        boolean[] isAscending = {false};  

        ResultSet rs = DBQueryHandler.readQuery(selectColumns, tableNames, joinConditions, conditionColumns, conditionValues, operators, logicalOperators, joinTypes,orderByColumns, 
                isAscending);

        List<Restaurant> restaurants = new ArrayList<>();
        try {
            while (rs.next()) {
            	Restaurant res =ResultsetToPOJO.mapResultSetToPOJO(rs, Restaurant.class); 
	            restaurants.add(res);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return restaurants; 
    }
    
    
   
    
    public static BigDecimal getRestaurantAverageRating(int restaurantId) throws SQLException {
        String[] selectColumns = {"COALESCE(ROUND(AVG(o.Rating), 1), 0) AS rating"};
        String[] tableNames = {"\"Order\" o", "\"OrderItem\" oi", "\"FoodItem\" fi"};
        
        String[][] joinConditions = {
            {"o.OrderID", "oi.OrderID"}, 
            {"oi.FoodItemID", "fi.FoodItemID"} 
        };

        String[] conditionColumns = {"o.Rating", "fi.RestaurantID"};
        Object[] conditionValues = {0, restaurantId}; 
        String[] operators = {">", "="}; 
        String[] logicalOperators = {"AND"}; 

        String[] joinTypes = {"INNER", "INNER"};

        ResultSet rs = DBQueryHandler.readQuery(selectColumns, tableNames, joinConditions, conditionColumns, conditionValues, operators, logicalOperators, joinTypes);

        try {
            if (rs.next()) {
                return rs.getBigDecimal("rating");
            } else {
                return BigDecimal.ZERO; 
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null; 
        }
    }

}
