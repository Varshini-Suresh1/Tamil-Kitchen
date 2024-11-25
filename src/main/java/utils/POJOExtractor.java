package utils;

import java.lang.reflect.Field;
import java.util.*;

import org.mindrot.jbcrypt.BCrypt;

public class POJOExtractor {

    public static class FieldData {
        private String[] columns;
        private Object[] values;

        public FieldData(String[] columns, Object[] values) {
            this.columns = columns;
            this.values = values;
        }

        public String[] getColumns() {
            return columns;
        }

        public Object[] getValues() {
            return values;
        }
    }

    public static <T> FieldData extractFields(T pojo, String... excludeFields) {
        List<String> columnsList = new ArrayList<>();
        List<Object> valuesList = new ArrayList<>();
        
        Set<String> excludeFieldSet = new HashSet<>(Arrays.asList(excludeFields)); // Convert to Set for faster lookups

        try {
            // Iterate over all fields of the POJO class
            for (Field field : pojo.getClass().getDeclaredFields()) {
                field.setAccessible(true); // Allow access to private fields

                String fieldName = field.getName();
                Object value = field.get(pojo); // Get value of the field
             // Encrypt the password if field is "encryptedPwd" (customize as needed)
                if ("encryptedPwd".equals(fieldName) && value instanceof String) {
                    value = BCrypt.hashpw((String) value, BCrypt.gensalt());
                }

             // If the field is not in the exclusion list and the value is not null and not zero, add it
                if (!excludeFieldSet.contains(fieldName) && value != null && !(value instanceof Number && ((Number) value).intValue() == 0)) {
                    columnsList.add(fieldName);
                    valuesList.add(value);
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        String[] columns = columnsList.toArray(new String[0]);
        Object[] values = valuesList.toArray(new Object[0]); // Specify the type here
        return new FieldData(columns, values);
    }
    
}
