package models;

import java.math.BigDecimal;

public class PriceHistory {
    private int priceHistoryId;
    private int foodItemId;
    private BigDecimal price;
    private long updatedDate; // Epoch time
    
    public int getPriceHistoryId() {
        return priceHistoryId;
    }

    public void setPriceHistoryId(int priceHistoryId) {
        this.priceHistoryId = priceHistoryId;
    }

    public int getFoodItemId() {
        return foodItemId;
    }

    public void setFoodItemId(int foodItemId) {
        this.foodItemId = foodItemId;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public long getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(long updatedDate) {
        this.updatedDate = updatedDate;
    }
}
