package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.Queue;

public class DBConnectionPool {
    private static DBConnectionPool instance;  // Singleton instance
    private final String jdbcUrl = "jdbc:postgresql://localhost:5432/Tamil Kitchen";
    private final String username = "postgres";
    private final String password = "12345";
    private final int maxPoolSize = 10;  // Connection pool size limit
    private final Queue<Connection> availableConnections;
    private int currentPoolSize = 0;

    
    
    // Private constructor to prevent instance of the class cann't be created directly from outside the class
    private DBConnectionPool() {
        this.availableConnections = new LinkedList<>();
    }

    
    
    // Singleton instance retrieval method, ensures only one instance of connection pool is created,
    // avoiding each part of the application creating a connection pool
    public static synchronized DBConnectionPool getInstance() {
        if (instance == null) {
            instance = new DBConnectionPool();
        }
        return instance;
    }

    
    
    // Get a connection from the pool
    public synchronized Connection getConnection() throws SQLException {
        if (!availableConnections.isEmpty()) {
        	// Reuse existing connection
            return availableConnections.poll();  
        } else if (currentPoolSize < maxPoolSize) {
            // Create a new connection if pool size allows
        	try {
        		
                currentPoolSize++;  
                return DriverManager.getConnection(jdbcUrl, username, password);
            } catch (SQLException e) {
                // Decrement the pool size if connection creation fails
                currentPoolSize--;  
                throw e;  
            }
        } else {
            throw new SQLException("Connection pool limit reached");
        }
    }

    
    
    public synchronized void releaseConnection(Connection connection) {
        if (connection != null) {
        	// Add the connection back to the pool
            availableConnections.offer(connection);  
        }
    }

    
    
    // Close all connections in the pool
    public synchronized void closePool() {
        while (!availableConnections.isEmpty()) {
            try {
            	//System.out.println("1");
                availableConnections.poll().close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
