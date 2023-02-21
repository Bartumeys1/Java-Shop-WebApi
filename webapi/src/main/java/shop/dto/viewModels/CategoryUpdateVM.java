package shop.dto.viewModels;

import lombok.Data;

@Data
public class CategoryUpdateVM {
    private int id;
    private String name;
    private String description;
    private String image;
    public CategoryUpdateVM() {
    }

    public CategoryUpdateVM(String name, String description, String image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
}
