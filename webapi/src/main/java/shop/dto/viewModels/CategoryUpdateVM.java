package shop.dto.viewModels;

import lombok.Data;

@Data
public class CategoryUpdateVM {
    private int id;
    private String name;
    public CategoryUpdateVM() {
    }

    public CategoryUpdateVM(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
