package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import models.FoodDetails;
import utils.DBQueryHandler;
import utils.POJOExtractor;
import utils.ResultsetToPOJO;

public class FoodDetailsDAO {

    public static int addFoodDetails(FoodDetails foodDetails) {
    	POJOExtractor.FieldData fieldData = POJOExtractor.extractFields(foodDetails, "foodDetailsID");

        String[] columns = fieldData.getColumns();
        Object[] values = fieldData.getValues();

        try {
            return DBQueryHandler.insertQuery("FoodDetails", columns, values); 
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

    
    
    public static List<FoodDetails> getAllFoodDetails() {
        List<FoodDetails> foodDetailsList = new ArrayList<>();
        String[] selectColumns = {"*"};
        String[] orderByColumns = {"foodDetailsId"};  
        boolean[] isAscending = {false};  
        
        try (ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"FoodDetails\""}, null, null, new Object[0], null, null, null,orderByColumns, 
                isAscending)) {
            while (rs != null && rs.next()) {
                FoodDetails foodDetails = ResultsetToPOJO.mapResultSetToPOJO(rs, FoodDetails.class);
                foodDetailsList.add(foodDetails); 
            }
        } catch (SQLException e) {
            e.printStackTrace(); 
        } catch (Exception e) {
            e.printStackTrace(); 
        }

        return foodDetailsList; 
    }

    
    
    public static FoodDetails getFoodDetailsById(int foodDetailsId) throws SQLException {
        String[] selectColumns = {"*"};
        String[] conditionColumns = {"foodDetailsId"};
        Object[] conditionValues = {foodDetailsId};
        String[] operators = { "="}; 

        FoodDetails foodDetail = null;
	    ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"FoodDetails\""}, null,conditionColumns,conditionValues,operators,null, null);
		try {
            if (rs != null && rs.next()) {
            	foodDetail =ResultsetToPOJO.mapResultSetToPOJO(rs, FoodDetails.class);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
		return foodDetail;
    }
    
    
    
    
}
