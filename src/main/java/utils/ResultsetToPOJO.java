package utils;

import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ResultsetToPOJO {

	public static <T> T mapResultSetToPOJO(ResultSet rs, Class<T> clazz) throws SQLException {
        try {
            T instance = clazz.getDeclaredConstructor().newInstance();

            // Iterate through fields of the class
            for (Field field : clazz.getDeclaredFields()) {
                field.setAccessible(true);

                // Use the field name to get the column value from ResultSet
                try {
                    Object value = rs.getObject(field.getName());
                    if (value != null) {
                        field.set(instance, value);
                    }
                } catch (SQLException e) {
                }
            }
            return instance;
        } catch (Exception e) {
            throw new SQLException("Error mapping ResultSet to POJO: " + clazz.getSimpleName(), e);
        }
    }
}
