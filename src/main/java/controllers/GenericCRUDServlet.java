package controllers;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

import utils.CustomApplicationException;
import utils.ResponseUtil;
import utils.ResponsesUtil;

public class GenericCRUDServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        handleRequest(req, resp, req.getMethod());
    }

    private void handleRequest(HttpServletRequest req, HttpServletResponse resp, String httpMethod) throws IOException {
    	
    	
    	
        String path = req.getPathInfo(); 
        String[] segments = path != null ? path.split("/") : new String[0];

        
        
        String resource = (segments.length > 1 && isNumeric(segments[segments.length - 1])) 
                          ? segments[segments.length - 2] 
                          : (segments.length > 0 ? segments[segments.length - 1] : null);

        if (resource != null && ("signup".equals(resource) || "login".equals(resource))) {
            resource = "users";
        }
        
        
        
        if (resource != null && !resource.isEmpty()) {
            String serviceClassName = "services." + capitalize(resource) + "Service";
            
            try {
                
                Class<?> controllerClass = Class.forName(serviceClassName);
                
                // Print the method name
                String servletMethodName = "do" + httpMethod.substring(0, 1).toUpperCase() + httpMethod.substring(1).toLowerCase();
                
                Method method = controllerClass.getDeclaredMethod(servletMethodName, HttpServletRequest.class);
                Object controllerInstance = controllerClass.getDeclaredConstructor().newInstance();
                
                
                try {
                    Object result = method.invoke(controllerInstance, req);
                    
                    if (result instanceof Map) {
                        @SuppressWarnings("unchecked")
                        Map<String, String> tokens = (Map<String, String>) result;
                        tokens.forEach(resp::setHeader);

                        ResponseUtil.sendResponse(resp, HttpServletResponse.SC_OK, "Login successful.");
                    } else if (result instanceof String) {
                    	
                        String responseMessage = (String) result;
                        ResponseUtil.sendResponse(resp, HttpServletResponse.SC_OK, responseMessage);
                    } else {

                        ResponseUtil.sendResponse(resp, HttpServletResponse.SC_OK, "Request processed successfully.");
                    }
                } 
                catch (InvocationTargetException e) {
                    Throwable cause = e.getCause();

                    if (cause instanceof CustomApplicationException) {
                        CustomApplicationException cae = (CustomApplicationException) cause;
                        
                        // Check if the response is already committed
                        if (!resp.isCommitted()) {
                            // Set the status and response content for CustomApplicationException
                            resp.setStatus(cae.getErrorCode());
                            resp.setContentType("application/json");
                            String error = ResponsesUtil.createErrorResponse(cae.getMessage());
                            resp.getWriter().write(error);
                            resp.getWriter().flush();  // Ensure the response is sent immediately
                        } else {
                            System.out.println("Response was already committed, cannot modify.");
                        }
                    } else {
                        if (!resp.isCommitted()) {
                            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                            resp.setContentType("application/json");
                            resp.getWriter().write(ResponsesUtil.createErrorResponse("Unexpected error occurred."));
                            resp.getWriter().flush();
                        }
                    }
                }
            } 
            catch (ClassNotFoundException e) {
            	String errorResponse = ResponsesUtil.createErrorResponse("Controller not found: " , serviceClassName);
                ResponseUtil.sendResponse(resp, HttpServletResponse.SC_NOT_FOUND, errorResponse);
            } catch (NoSuchMethodException e) {
            	String errorResponse = ResponsesUtil.createErrorResponse("Method not found in controller: " , serviceClassName);
                ResponseUtil.sendResponse(resp, HttpServletResponse.SC_NOT_FOUND, errorResponse);
            } catch (Exception e) {
            	String errorResponse = ResponsesUtil.createErrorResponse("Internal server error");
                ResponseUtil.sendResponse(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, errorResponse);
            }
        } else {
        	String errorResponse = ResponsesUtil.createErrorResponse("Invalid API path");
            ResponseUtil.sendResponse(resp, HttpServletResponse.SC_BAD_REQUEST, errorResponse);
        }
    }


    private boolean isNumeric(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private String capitalize(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
