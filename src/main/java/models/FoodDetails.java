package models;

public class FoodDetails {
    private int foodDetailsID;
    private String name;
    private Integer type; 
    private Boolean isVeg;

    public int getFoodDetailsID() {
        return foodDetailsID;
    }

    public void setFoodDetailsID(int foodDetailsID) {
        this.foodDetailsID = foodDetailsID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Boolean getisVeg() {
        return isVeg;
    }

    public void setisVeg(Boolean isVeg) {
        this.isVeg = isVeg;
    }
}
