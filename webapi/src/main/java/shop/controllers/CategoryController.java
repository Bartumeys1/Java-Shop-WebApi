package shop.controllers;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CreateCategoryDTO;
import shop.dto.category.UpdateCategoryDTO;
import shop.entities.CategoryEntity;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository _categoryRepository;
    private final StorageService storageService;
    private final CategoryMapper categoryMapper;

    @GetMapping
    public ResponseEntity<List<CategoryItemDTO>> index() {
        var list = _categoryRepository.findAll();
        var model = categoryMapper.CategoryItemDTOsToCategories(list);
        return new ResponseEntity<>(model, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryItemDTO> create(@Valid @RequestBody CreateCategoryDTO model) {
        try {
            var category = categoryMapper.CategoryByCreateCategoryGTO(model);

            String fileName = storageService.save(model.getImageBase64());
            category.setImage(fileName);
            _categoryRepository.save(category);
            var catDTO = categoryMapper.CategoryItemDTOByCategory(category);
            return new ResponseEntity<>(catDTO, HttpStatus.CREATED);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<CategoryItemDTO> update(@Valid @RequestBody UpdateCategoryDTO model) {
        var category = _categoryRepository.findById(model.getId());
        if (!category.isPresent())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        CategoryEntity cat = category.get();
        cat.setName(model.getName());
        cat.setDescription(model.getDescription());

        storageService.updateFile(cat.getImage(),model.getImageBase64());
        _categoryRepository.save(cat);
        var catDTO = categoryMapper.CategoryItemDTOByCategory(cat);
        return new ResponseEntity<>(catDTO, HttpStatus.OK);


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
