package utils;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

public class ResponseUtil {

    // Wraps the data inside message string
    public static void sendResponse(HttpServletResponse response, int statusCode, String message) throws IOException {
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.getWriter().write(message);
    }
}
