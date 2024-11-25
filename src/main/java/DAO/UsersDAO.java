package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import models.User;
import utils.DBQueryHandler;
import utils.POJOExtractor;
import utils.ResultsetToPOJO;


public class UsersDAO {

	
	
    public static int signup(User user) {
    	POJOExtractor.FieldData fieldData = POJOExtractor.extractFields(user, "userid","role");

        String[] columns = fieldData.getColumns();
        Object[] values = fieldData.getValues();

        try {
            return DBQueryHandler.insertQuery("User", columns, values);
        } catch (Exception e) {
            if (e instanceof SQLException) {
                SQLException sqlException = (SQLException) e;
                if (sqlException.getSQLState().equals("23505")) { // Unique constraint violation
                    return -1;
                }
            }
            return 0; // General failure
        }
    }
    

    
    public static User getUserByUsername(String username){
        String[] selectColumns = {"*"};
        String[] conditionColumns = {"username"};
        Object[] conditionValues = {username};

        try (ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"User\""}, null, conditionColumns, conditionValues, new String[]{"="}, null, null)) {
            if (rs != null && rs.next()) {
               
            	return ResultsetToPOJO.mapResultSetToPOJO(rs, User.class);
                
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null; // Authentication failed
    }

    
    // Method to get all users from the database
    public static List<User> getAllUsers() {
        List<User> userList = new ArrayList<>();
        String[] selectColumns = {"*"};

        try (ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"User\""}, null, null, new Object[0], null, null, null)) {
            while (rs != null && rs.next()) {
                User user = ResultsetToPOJO.mapResultSetToPOJO(rs, User.class);
                userList.add(user); // Add user to the list
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Handle SQL exceptions
        } catch (Exception e) {
            e.printStackTrace(); // Handle other exceptions
        }

        return userList; // Return list of users
    }
    
    
    
    public static User getUserById(int userId) {
    	User user = new User();
    	String[] selectColumns = {"userid","username","encryptedPwd", "name", "mobileNo", "role"};
    	String[] tableNames = {"\"User\""};
        String[] conditionColumns = {"UserID"};
        Object[] conditionValues = {userId};

        try (ResultSet rs = DBQueryHandler.readQuery(selectColumns, tableNames, null,conditionColumns, conditionValues,  new String[]{"="}, null, null)) {
            while (rs != null && rs.next()) {
            	return ResultsetToPOJO.mapResultSetToPOJO(rs, User.class);
            }
        } catch (SQLException e) {
            e.printStackTrace(); 
        } catch (Exception e) {
            e.printStackTrace(); 
        }

        return user;
    }
    
    
    
    public static boolean updatePassword(int userId, String encryptedPassword) {
        String[] columns = {"encryptedPwd"};
        Object[] values = {encryptedPassword};
        String[] conditionColumns = {"userId"};
        Object[] conditionValues = {userId};

        try {
            int result = DBQueryHandler.updateQuery("User", columns, values, conditionColumns, conditionValues, new String[]{"="}, null);
            return result > 0;  
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    
    
    public static boolean updateUserRole(int userId, int role) {
        String[] columns = {"role"};
        Object[] values = {role};
        String[] conditionColumns = {"userid"};
        Object[] conditionValues = {userId};

        try {
            int result = DBQueryHandler.updateQuery("User", columns, values, conditionColumns, conditionValues, new String[]{"="}, null);
            return result > 0;  // Return true if update was successful
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
}
