package shop.controllers;

import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.CreateCategoryDTO;
import shop.dto.viewModels.CategoryUpdateVM;
import shop.entities.CategoryEntity;
import shop.repositories.CategoryRepository;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository _categoryRepository;

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> index() {
        var list = _categoryRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> create(@RequestBody CreateCategoryDTO model) {
        CategoryEntity category = new CategoryEntity();
        category.setName(model.getName());
        category.setDescription(model.getDescription());
        category.setImage(model.getImage());
        _categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<CategoryEntity> update(@RequestBody CategoryUpdateVM model) {
        var category = _categoryRepository.findById(model.getId());
        if (!category.isPresent())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        CategoryEntity cat = category.get();
        cat.setName(model.getName());
        cat.setDescription(model.getDescription());
        cat.setImage(model.getImage());
        _categoryRepository.save(cat);
        return new ResponseEntity<>(cat, HttpStatus.OK);


    }

    @DeleteMapping
    public ResponseEntity<String> delete(@PathParam("id") int id) {
        var category = _categoryRepository.findById(id);
        if (!category.isPresent())
            return new ResponseEntity<>("Not found id:" + id, HttpStatus.BAD_REQUEST);

        CategoryEntity cat = category.get();
        _categoryRepository.delete(cat);
        return new ResponseEntity<>("delete element \"" + cat.getName() + "\"", HttpStatus.OK);

    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryEntity> get(@PathVariable("id") int id) {
        var catOption = _categoryRepository.findById(id);
        if (!catOption.isPresent())
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(catOption.get(), HttpStatus.OK);

    }

}
