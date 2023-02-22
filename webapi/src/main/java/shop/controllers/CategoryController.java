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
import shop.storage.StorageService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository _categoryRepository;
    private final StorageService storageService;

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> index() {
        var list = _categoryRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> create(@RequestBody CreateCategoryDTO model) {
        try {
            CategoryEntity category = new CategoryEntity();
            category.setName(model.getName());
            category.setDescription(model.getDescription());

            String fileName = storageService.save(model.getImageBase64());
            category.setImage(fileName);

            _categoryRepository.save(category);
            return new ResponseEntity<>(category, HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        }

    }

    @PutMapping
    public ResponseEntity<CategoryEntity> update(@RequestBody CategoryUpdateVM model) {
        var category = _categoryRepository.findById(model.getId());
        if (!category.isPresent())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        CategoryEntity cat = category.get();
        cat.setName(model.getName());
        cat.setDescription(model.getDescription());

        storageService.updateFile(cat.getImage(),model.getImageBase64());
        _categoryRepository.save(cat);
        return new ResponseEntity<>(cat, HttpStatus.OK);


    }

    @DeleteMapping
    public ResponseEntity<String> delete(@PathParam("id") int id) {
        var category = _categoryRepository.findById(id);
        if (!category.isPresent())
            return new ResponseEntity<>("Not found id:" + id, HttpStatus.BAD_REQUEST);

        CategoryEntity cat = category.get();
        Boolean result = storageService.deleteFile(cat.getImage());

        if (result)
        {
            _categoryRepository.delete(cat);
            return new ResponseEntity<>("delete element \"" + cat.getName() + "\"", HttpStatus.OK);
        }

        return new ResponseEntity<>("Not deleted \"" + cat.getName() + "\"", HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryEntity> get(@PathVariable("id") int id) {
        var catOption = _categoryRepository.findById(id);
        if (!catOption.isPresent())
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(catOption.get(), HttpStatus.OK);

    }

}
