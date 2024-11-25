package models;

import java.math.BigDecimal;

public class Fooditem {
    private int foodItemID;
    private int restaurantID;
    private int foodDetailsId; 
    private FoodDetails foodDetails; 
    private Integer stock;  
    private BigDecimal price;

    private long soldQuantity;  

    public int getFoodItemID() {
        return foodItemID;
    }

    public void setFoodItemID(int foodItemID) {
        this.foodItemID = foodItemID;
    }

    public int getRestaurantID() {
        return restaurantID;
    }

    public void setRestaurantID(int restaurantID) {
        this.restaurantID = restaurantID;
    }

    public int getFoodDetailsId() {
        return foodDetailsId;
    }

    public void setFoodDetailsId(int foodDetailsId) { 
        this.foodDetailsId = foodDetailsId;
    }

    public FoodDetails getFoodDetails() {
        return foodDetails;
    }

    public void setFoodDetails(FoodDetails foodDetails) {
        this.foodDetails = foodDetails;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public long getSoldQuantity() {  
        return soldQuantity;
    }

    public void setSoldQuantity(long soldQuantity) {  
        this.soldQuantity = soldQuantity;
    }
}
