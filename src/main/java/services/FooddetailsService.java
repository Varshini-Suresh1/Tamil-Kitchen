package services;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import models.FoodDetails;
import utils.AppErrorType;
import utils.CustomApplicationException;
import utils.ResponsesUtil;

import com.fasterxml.jackson.databind.ObjectMapper;

import DAO.FoodDetailsDAO;

public class FooddetailsService {
	private final ObjectMapper objectMapper = new ObjectMapper();
	
	public String doPost(HttpServletRequest request) throws Exception {

	    try {
	        String payload = (String) request.getAttribute("requestPayload");
	        
	        FoodDetails newFoodDetail = objectMapper.readValue(payload, FoodDetails.class);

	            int foodDetailsID = FoodDetailsDAO.addFoodDetails(newFoodDetail);

	            if (foodDetailsID > 0) {
	                return ResponsesUtil.createSuccessResponse("FoodDetails added successfully", foodDetailsID);
	            } 
	            else if (foodDetailsID == -1){
		        	throw new CustomApplicationException(AppErrorType.DUPLICATE_ENTRY, "Food Detail already exists.");
	            }else {
	                throw new CustomApplicationException(AppErrorType.INTERNAL_SERVER_ERROR, "Failed to add FoodDetail.");
	            }
	    } catch (CustomApplicationException e) {
	        throw e;
	    }
	}

	
	
    public String doGet(HttpServletRequest request) throws Exception {

        List<FoodDetails> allFoodDetails = FoodDetailsDAO.getAllFoodDetails();

        if (allFoodDetails.isEmpty()) {
        	throw new CustomApplicationException(AppErrorType.RESOURCE_NOT_FOUND, "No food details found.");
        } else {
            return objectMapper.writeValueAsString(allFoodDetails);
        }
    }

}
