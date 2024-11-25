package services;

import models.Address;
import utils.AppErrorType;
import utils.CustomApplicationException;
import utils.ResponsesUtil;
import DAO.AddressesDAO;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;

import java.util.List;

public class AddressesService {
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public String doPost(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();
        
        int userId;
        userId = Integer.parseInt(path.split("/")[2]); 
        
        String payload = (String) request.getAttribute("requestPayload");  //Since the httpRequest is read in AuthFilter itself , payload cannot be read again from HttpRequest
        //System.out.println("Payload in AddressService:"+payload);

        try {
            Address address = objectMapper.readValue(payload, Address.class);
            address.setUserId(userId); 

            int addressId =AddressesDAO.addAddress(address);
            if (addressId > 0) {
            	return ResponsesUtil.createSuccessResponse("Address added successfully.", addressId );
            } else {
            	throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to add address.");
            }
        }catch (CustomApplicationException e) {
            throw e;
        }
    }
    
    

    public String doGet(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();

        try {
            String[] pathParts = path.split("/");
            int userId = Integer.parseInt(pathParts[2]);

            String isDefaultParam = request.getParameter("isDefault");

            boolean isDefault = isDefaultParam != null && Boolean.parseBoolean(isDefaultParam);

            if (isDefault) {
                try {
                    Address defaultAddress =AddressesDAO.getDefaultAddressForUser(userId);

                    if (defaultAddress.getAddressId() != 0) {
                       return objectMapper.writeValueAsString(defaultAddress);
                    } else {
                    	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Default address not found for user.");
                    }
                } catch (CustomApplicationException e) {
                    throw e;
                }
                
            } else{
                // Fetch all active addresses for the user
                try {
                    List<Address> activeAddresses = AddressesDAO.getActiveAddressesForUser(userId);

                    if (!activeAddresses.isEmpty()) {
                       return objectMapper.writeValueAsString(activeAddresses);
                    } 
                    else {
                    	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "No active addresses found for user.");
                    }
                } catch (CustomApplicationException e) {
                    throw e;
                }
            } 
        } catch (CustomApplicationException e) {
            throw e;
        }
    }


    
    public String doPut(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();

        try {
            // Extract userId and addressId from the API path
            String[] pathParts = path.split("/");
            int userId = Integer.parseInt(pathParts[2]);
            int addressId = Integer.parseInt(pathParts[4]);

            // Fetch the existing address
            Address existingAddress = AddressesDAO.getAddressById(addressId);

            // If address does not exist or is not active
            if (existingAddress == null) {
            	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Address not found.");
            }

            // Parse the request body for the updated address details
            Address updatedAddress;
            String payload = (String) request.getAttribute("requestPayload");
            updatedAddress = objectMapper.readValue(payload, Address.class);
           
            
            updatedAddress.setUserId(userId);
            updatedAddress.setAddressId(addressId);

            
            Boolean isDefault = updatedAddress.getIsDefault();
            if (isDefault) {
                // Scenario 1: Set all other active addresses' isDefault to false
                List<Address> activeAddresses = AddressesDAO.getActiveAddressesForUser(userId);

                // Update all active addresses to isDefault = false
                for (Address addr : activeAddresses) {
                    if (addr.getIsDefault()) {
                        addr.setIsDefault(false);
                        AddressesDAO.updateAddress(addr);
                    }
                }

                AddressesDAO.updateAddress(updatedAddress);
                
                int addressID=existingAddress.getAddressId();
                return ResponsesUtil.createSuccessResponse("Address updated successfully.",addressID);
            } else {
                // Scenario 2: Editing the already existing active saved address
                // Deactivate the current address
                existingAddress.setIsActive(false);
                AddressesDAO.updateAddress(existingAddress);

                // Create a new entry with isActive = true and isDefault = false
                updatedAddress.setIsActive(true); 
                int addressID=AddressesDAO.addAddress(updatedAddress);

                return ResponsesUtil.createSuccessResponse("Address updated successfully.",addressID);
            }
        } catch (CustomApplicationException e) {
            throw e;
        }
    }

    
    
    public String doDelete(HttpServletRequest request) throws Exception {
        String path = request.getPathInfo();

        try {
            String[] pathParts = path.split("/");
            int addressId = Integer.parseInt(pathParts[4]);

            Address address = AddressesDAO.getAddressById(addressId);

            if (address == null) {
            	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "Address not found.");
            }
            // Check if the address is the default one
            if (address.getIsDefault()) {
            	throw new CustomApplicationException(AppErrorType.INVALID_INPUT, "Cannot delete the default address.");
            }

            // Set the address as inactive (isActive = false) and default to false (to be safe)
            address.setIsActive(false);
            address.setIsDefault(false); 

            // Update the address in the database
            AddressesDAO.updateAddress(address);

           return ResponsesUtil.createSuccessResponse("Address deleted successfully.");

        } catch (CustomApplicationException e) {
            throw e;
        }
    }

}
