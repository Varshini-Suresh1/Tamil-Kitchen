package utils;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class CORSFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Add CORS headers
        httpResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Refresh-Token, New-Access-Token");
        httpResponse.setHeader("Access-Control-Expose-Headers", "New-Access-Token, Authorization");


        // Handle preflight (OPTIONS) request
        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
            httpResponse.setStatus(HttpServletResponse.SC_OK); // Return 200 OK for preflight requests
            return;
        }   

        // Continue with the existing filter logic for other requests
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // You can add init logic here if needed
    }

    @Override
    public void destroy() {
        // You can add destroy logic here if needed
    }
}
