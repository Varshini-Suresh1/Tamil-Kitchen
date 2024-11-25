package utils;

import java.math.BigDecimal;
import java.sql.*;

public class DBQueryHandler {

	private static DBConnectionPool dbConnection;

	static {
		// Get Singleton instance of DBConnection
		dbConnection = DBConnectionPool.getInstance();
	}

	
	
	public static int insertQuery(String tableName, String[] columns, Object[] values) throws SQLException {
		validateInputs(columns, values);
		StringBuilder sql = new StringBuilder("INSERT INTO ").append("\"").append(tableName).append("\" (");
		sql.append(String.join(", ", columns)).append(") VALUES (");
		sql.append("?,".repeat(values.length)).deleteCharAt(sql.length() - 1).append(")");

		return executeInsertAndGetId(sql.toString(), values);
	}

	
	
	
	public static int updateQuery(String tableName, String[] columns, Object[] values, String[] conditionColumns,
			Object[] conditionValues, String[] operators, String[] logicalOperators) throws SQLException {
		System.out.println("\nExecuting Update Query.");
		validateInputs(columns, values);

		StringBuilder sql = new StringBuilder("UPDATE ").append("\"").append(tableName).append("\" SET ");
		for (int i = 0; i < columns.length; i++) {
			sql.append(columns[i]).append(" = ?");
			if (i < columns.length - 1) {
				sql.append(", ");
			}
		}
		if (conditionColumns != null && conditionColumns.length > 0) {
			sql.append(buildWhereClause(conditionColumns, operators, logicalOperators));
		}

		// Combine the values for the SET clause and the WHERE conditions
		Object[] combinedValues = new Object[values.length + conditionValues.length];
		System.arraycopy(values, 0, combinedValues, 0, values.length);
		System.arraycopy(conditionValues, 0, combinedValues, values.length, conditionValues.length);

		int r = executeUpdate(sql.toString(), combinedValues);
		return r;
	}

	
	
	
	public static int deleteQuery(String tableName, String[] conditionColumns, Object[] conditionValues,
			String[] operators, String[] logicalOperators) throws SQLException {
		System.out.println("\nExecuting Delete Query.");
		StringBuilder sql = new StringBuilder("DELETE FROM ").append("\"").append(tableName).append("\"");

		if (conditionColumns != null && conditionColumns.length > 0) {
			sql.append(buildWhereClause(conditionColumns, operators, logicalOperators));
		}
		int r = executeUpdate(sql.toString(), conditionValues);
		return r;
	}

	
	
	
	// readQuery with basic SELECT and WHERE
	public static ResultSet readQuery(
	        String[] selectColumns, String[] tableNames, String[][] joinConditions,
	        String[] conditionColumns, Object[] conditionValues, String[] operators,
	        String[] logicalOperators, String[] joinTypes) throws SQLException {

	    String sql = buildSelectQuery(selectColumns, tableNames, joinConditions, conditionColumns, operators, logicalOperators, joinTypes, null, null);
	    
	    // Execute the query and return the ResultSet
	    return executeRead(sql, conditionValues);
	}
	
	

	// readQuery with SELECT, WHERE, and ORDER BY
	public static ResultSet readQuery(
	        String[] selectColumns, String[] tableNames, String[][] joinConditions,
	        String[] conditionColumns, Object[] conditionValues, String[] operators,
	        String[] logicalOperators, String[] joinTypes, String[] orderByColumns, boolean[] isAscending) throws SQLException {

	    String sql = buildSelectQuery(selectColumns, tableNames, joinConditions, conditionColumns, operators, logicalOperators, joinTypes, orderByColumns, isAscending);
	    
	    // Execute the query and return the ResultSet
	    return executeRead(sql, conditionValues);
	}
	
	
	
	// Utility method to build WHERE clause 
	private static StringBuilder buildWhereClause(String[] conditionColumns, String[] operators,
	                                              String[] logicalOperators) {
	    StringBuilder whereClause = new StringBuilder(" WHERE ");
	    for (int i = 0; i < conditionColumns.length; i++) {
	        whereClause.append(conditionColumns[i]).append(" ").append(operators[i]).append(" ?");
	        if (i < conditionColumns.length - 1) {
	            whereClause.append(" ").append(logicalOperators[i]).append(" ");
	        }
	    }
	    return whereClause;
	}

	
	
	
	// Common method for building the SQL query
	private static String buildSelectQuery(
	            String[] selectColumns, String[] tableNames, String[][] joinConditions,
	            String[] conditionColumns, String[] operators, String[] logicalOperators,
	            String[] joinTypes, String[] orderByColumns, boolean[] isAscending) {

	    StringBuilder sql = new StringBuilder("SELECT ");

	    // Handle SELECT columns
	    if (selectColumns.length == 1 && "*".equals(selectColumns[0])) {
	        sql.append("*");
	    } else {
	        sql.append(String.join(", ", selectColumns));
	    }

	    sql.append(" FROM ").append(tableNames[0]);

	    // Handle joins if multiple tables are involved
	    if (tableNames.length > 1 && joinConditions != null) {
	        for (int i = 1; i < tableNames.length; i++) {
	            sql.append(" ").append(joinTypes[i - 1])
	                .append(" JOIN ").append(tableNames[i])
	                .append(" ON ").append(joinConditions[i - 1][0])
	                .append(" = ").append(joinConditions[i - 1][1]);
	        }
	    }

	    // Add WHERE clause if conditions are provided
	    if (conditionColumns != null && conditionColumns.length > 0) {
	        sql.append(buildWhereClause(conditionColumns, operators, logicalOperators));
	    }

	    // Add ORDER BY clause if provided
	    if (orderByColumns != null && orderByColumns.length > 0) {
	        sql.append(" ORDER BY ");
	        for (int i = 0; i < orderByColumns.length; i++) {
	            sql.append(orderByColumns[i]).append(isAscending[i] ? " ASC" : " DESC");
	            if (i < orderByColumns.length - 1) {
	                sql.append(", ");
	            }
	        }
	    }

	    return sql.toString();
	}


	
	

	private static int executeInsertAndGetId(String sql, Object[] values) throws SQLException {
		Connection connection = null;
		try {
			connection = dbConnection.getConnection();
			PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			setPreparedStatementValues(pstmt, values);
			int affectedRows = pstmt.executeUpdate();
			if (affectedRows > 0) {
				ResultSet rs = pstmt.getGeneratedKeys();
				if (rs.next()) {
					return rs.getInt(1); // Return the first generated key
				}
			}
		} catch (SQLException e) {
			throw e;
		} finally {
			dbConnection.releaseConnection(connection); // Release the connection back to the pool
		}
		return -1; // Return -1 if insertion fails
	}

	
	
	
	private static int executeUpdate(String sql, Object[] values) throws SQLException {
		Connection connection = null;
		try {
			connection = dbConnection.getConnection(); 
			PreparedStatement pstmt = connection.prepareStatement(sql);
			setPreparedStatementValues(pstmt, values);
			return pstmt.executeUpdate();
		} catch (SQLException e) {
			throw e;
		} finally {
			dbConnection.releaseConnection(connection); 
		}
	}

	
	
	
	private static ResultSet executeRead(String sql, Object[] values) throws SQLException {
		Connection connection = null;
		try {
			connection = dbConnection.getConnection(); 
			PreparedStatement pstmt = connection.prepareStatement(sql);
			setPreparedStatementValues(pstmt, values);
			return pstmt.executeQuery();
		} catch (SQLException e) {
			throw e;
		} finally {
			dbConnection.releaseConnection(connection); 
		}
	}
	
	
	

	public static void setPreparedStatementValues(PreparedStatement pstmt, Object[] values) throws SQLException {
		for (int i = 0; i < values.length; i++) {
			if (values[i] instanceof String) {
				pstmt.setString(i + 1, (String) values[i]);
			} else if (values[i] instanceof Integer) {
				pstmt.setInt(i + 1, (Integer) values[i]);
			} else if (values[i] instanceof Long) {
				pstmt.setLong(i + 1, (Long) values[i]); 
			} else if (values[i] instanceof Double) {
				pstmt.setDouble(i + 1, (Double) values[i]);
			} else if (values[i] instanceof Float) {
				pstmt.setFloat(i + 1, (Float) values[i]);
			} else if (values[i] instanceof Boolean) {
				pstmt.setBoolean(i + 1, (Boolean) values[i]);
			} else if (values[i] == null) {
				pstmt.setNull(i + 1, Types.NULL);
			} else if (values[i] instanceof BigDecimal) {
				pstmt.setBigDecimal(i + 1, (BigDecimal) values[i]);
			} else {
				throw new IllegalArgumentException("Unsupported type: " + values[i].getClass());
			}
		}
	}

	
	
	
	private static void validateInputs(String[] columns, Object[] values) {
		if (columns.length != values.length) {
			throw new IllegalArgumentException("Number of columns and values must match.");
		}
	}

}
