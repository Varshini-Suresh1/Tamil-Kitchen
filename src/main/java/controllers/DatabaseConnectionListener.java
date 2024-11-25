package controllers;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import utils.DBConnectionPool;

@WebListener
public class DatabaseConnectionListener implements ServletContextListener {

    private DBConnectionPool dbConnectionPool;

    
    
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // Get Singleton instance without passing constants
        dbConnectionPool = DBConnectionPool.getInstance();
        System.out.println("Connection pool initialized.");
    }

    
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        if (dbConnectionPool != null) {
            dbConnectionPool.closePool();
            System.out.println("Context is being destroyed, connection pool closed.");
        } else {
            System.out.println("No connection pool to close.");
        }
    }
}
