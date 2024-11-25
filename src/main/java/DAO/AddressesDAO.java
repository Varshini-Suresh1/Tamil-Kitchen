package DAO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import models.Address;
import utils.DBQueryHandler;
import utils.POJOExtractor;
import utils.ResultsetToPOJO;

public class AddressesDAO {

	public static int addAddress(Address address) {
		POJOExtractor.FieldData fieldData = POJOExtractor.extractFields(address, "addressId");

        String[] columns = fieldData.getColumns();
        Object[] values = fieldData.getValues();

        try {
            return DBQueryHandler.insertQuery("Addresses", columns, values);
        } catch (Exception e) {
            if (e instanceof SQLException) {
                SQLException sqlException = (SQLException) e;
                if (sqlException.getSQLState().equals("23505")) { // Duplicate key error
                    return -1;
                }
            }
            e.printStackTrace();
            return 0; // General failure
        }
	}
	
	
	
	public static boolean updateAddress(Address address) {
	    String[] columns = {"Address", "Location", "IsDefault", "IsActive"};
	    Object[] values = {address.getAddress(), address.getLocation(), address.getIsDefault(), address.getIsActive()};
	    String[] conditionColumns = {"AddressID"};
	    Object[] conditionValues = {address.getAddressId()};

	    try {
	        int result = DBQueryHandler.updateQuery("Addresses", columns, values, conditionColumns, conditionValues, new String[]{"="}, null);
	        return result > 0;  // Return true if the update was successful
	    } catch (Exception e) {
	        e.printStackTrace();
	        return false;
	    }
	}
	
	

	public static List<Address> getActiveAddressesForUser(int userId) {
        List<Address> activeAddresses = new ArrayList<>();
        String[] selectColumns = {"*"};
        String[] conditionColumns = {"UserID", "IsActive"};
        Object[] conditionValues = {userId, true}; // Only active addresses

        try (ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"Addresses\""}, null, conditionColumns, conditionValues,new String[]{"=", "="}, new String[]{"AND"}, null)) {
            while (rs != null && rs.next()) {
            	Address address = ResultsetToPOJO.mapResultSetToPOJO(rs, Address.class);
                activeAddresses.add(address); 
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return activeAddresses; // Return list of active addresses
    }
	
	
	
	public static Address getDefaultAddressForUser(int userId) {
		Address address = new Address();
        String[] selectColumns = {"*"};
        String[] conditionColumns = {"UserID", "IsDefault"};
        Object[] conditionValues = {userId, true}; 

        try (ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"Addresses\""}, null, conditionColumns, conditionValues,new String[]{"=", "="}, new String[]{"AND"}, null)) {
            while (rs != null && rs.next()) {
            	address = ResultsetToPOJO.mapResultSetToPOJO(rs, Address.class);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return address; // Return list of active addresses
    }

	
	
	public static Address getAddressById(int addressId) {
	    Address address = null;
	    String[] selectColumns = {"AddressID", "UserID", "Address", "Location", "IsDefault", "IsActive"};
	    String[] conditionColumns = {"AddressID"};
	    Object[] conditionValues = {addressId};

	    try (ResultSet rs = DBQueryHandler.readQuery(selectColumns, new String[]{"\"Addresses\""}, null, conditionColumns, conditionValues, new String[]{"="}, null, null)) {
	        if (rs != null && rs.next()) {
	        	address = ResultsetToPOJO.mapResultSetToPOJO(rs, Address.class);
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    return address;  // Return the fetched address
	}

	
	

}
