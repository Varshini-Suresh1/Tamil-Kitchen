package controllers;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import DAO.RestaurantsDAO;
import utils.JWTUtil;
import models.User;
import utils.ResponseUtil;
import utils.ResponsesUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.SQLException;

public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String requestURI = httpRequest.getRequestURI();
        String authHeader = httpRequest.getHeader("Authorization");
        String refreshTokenHeader = httpRequest.getHeader("Refresh-Token");

       
        User user = null;

        if (!isPublicEndpoint(requestURI)) {
        	
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                ResponseUtil.sendResponse(httpResponse, HttpServletResponse.SC_UNAUTHORIZED,ResponsesUtil.createErrorResponse("Authorization header missing or invalid."));
                return;
            }

            String token = authHeader.substring(7);
            user = JWTUtil.validateTokenAndGetUser(token);

            if (user == null) {
                if (refreshTokenHeader == null) {
                    ResponseUtil.sendResponse(httpResponse, HttpServletResponse.SC_UNAUTHORIZED,ResponsesUtil.createErrorResponse("Refresh token missing."));
                    return;
                }

                user = JWTUtil.validateRefreshToken(refreshTokenHeader);
                if (user == null) {
                    ResponseUtil.sendResponse(httpResponse, HttpServletResponse.SC_UNAUTHORIZED,ResponsesUtil.createErrorResponse("Redirecting to Login."));
                    return;
                }

                int restaurantId = 0;
				try {
					restaurantId = (user.getRole() == 1) ? RestaurantsDAO.getRestaurantId(user.getUserId()) : 0;
				} catch (SQLException e) {
					ResponseUtil.sendResponse(httpResponse, HttpServletResponse.SC_NOT_FOUND,ResponsesUtil.createErrorResponse("RestaurantId not found."));
				}

                
                String newAccessToken = JWTUtil.createAccessToken(user.getUserId(), user.getRole(), restaurantId);
                System.out.println("New Access Token: " + newAccessToken);

                httpResponse.setHeader("New-Access-Token", newAccessToken);
                
            }
            
            String path = httpRequest.getPathInfo();
            String[] pathParts = path.split("/");
            
            
            
            if (user.getRole() != 0) {
                if ("users".equals(pathParts[1])) {
                    Integer userIdFromUrl;
                    try {
                        userIdFromUrl = Integer.parseInt(pathParts[2]);
                    } catch (NumberFormatException e) {
                        ResponseUtil.sendResponse(httpResponse, HttpServletResponse.SC_FORBIDDEN,ResponsesUtil.createErrorResponse("Unauthorized: Invalid User ID format."));
                        return;
                    }

                    if (!userIdFromUrl.equals(user.getUserId())) {
                        ResponseUtil.sendResponse(httpResponse, HttpServletResponse.SC_FORBIDDEN,ResponsesUtil.createErrorResponse("Unauthorized: User ID mismatch."));
                        return;
                    }
                }

                if (user.getRole() == 1 && pathParts.length > 2 && "restaurants".equals(pathParts[1])) {
                    Integer restaurantIdFromUrl;
                    try {
                        restaurantIdFromUrl = Integer.parseInt(pathParts[2]);
                    } catch (NumberFormatException e) {
                        ResponseUtil.sendResponse(httpResponse, HttpServletResponse.SC_FORBIDDEN,ResponsesUtil.createErrorResponse("Unauthorized: Invalid Restaurant ID format."));
                        return;
                    }

                    int restaurantId = 0;
					try {
						restaurantId = RestaurantsDAO.getRestaurantId(user.getUserId());
					} catch (SQLException e) {
						ResponseUtil.sendResponse(httpResponse, HttpServletResponse.SC_NOT_FOUND,ResponsesUtil.createErrorResponse("RestaurantId not found."));
					}

                    if (!restaurantIdFromUrl.equals(restaurantId)) {
                        ResponseUtil.sendResponse(httpResponse, HttpServletResponse.SC_FORBIDDEN,ResponsesUtil.createErrorResponse("Unauthorized: Restaurant ID mismatch."));
                        return;
                    }
                }
            }

        }
       
        StringBuilder payloadBuilder = new StringBuilder();

        String queryString = httpRequest.getQueryString();
        if (queryString != null && !queryString.isEmpty()) {
            requestURI += "?" + queryString;
        }

        if ("POST".equalsIgnoreCase(httpRequest.getMethod()) || "PUT".equalsIgnoreCase(httpRequest.getMethod())) {
            BufferedReader reader = httpRequest.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                payloadBuilder.append(line);
            }
        }
        
        String payload = payloadBuilder.toString();

        httpRequest.setAttribute("requestPayload", payload);

        int userRole;
        if(user!=null) {
        	userRole = user.getRole();
        }
        else {
        	userRole=0;
        }
        
        HttpServletResponse httpResponse1 = (HttpServletResponse) response;
        if (!EndpointRoleMapping.hasAccess(requestURI, httpRequest.getMethod(), userRole, payload, httpResponse1)) {
            return;
        }

        chain.doFilter(request, response);
    }

    

    private boolean isPublicEndpoint(String requestURI) {
        return requestURI.equals("/api/v1/users/login") || requestURI.equals("/api/v1/users/signup");
    }
}
