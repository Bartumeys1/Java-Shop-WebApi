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
    public ResponseEntity<List<CategoryEntity>> index (){
        var list = _categoryRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> create(@RequestBody CreateCategoryDTO model){
        CategoryEntity category = new CategoryEntity();
        category.setName(model.getName());
        _categoryRepository.save(category);
        return new ResponseEntity<>(category,HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<CategoryEntity> update(@RequestBody CategoryUpdateVM model)
    {
        try {
            CategoryEntity category = _categoryRepository.findById(model.getId()).get();
            category.setName(model.getName());
            _categoryRepository.save(category);
            return new ResponseEntity<>(category,HttpStatus.OK);

        }catch (Exception ex)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@PathParam("id") int id)
    {
        try{
            CategoryEntity category  = _categoryRepository.findById(id).get();
            _categoryRepository.delete(category);
            return new ResponseEntity<>("delete element \""+category.getName()+"\"", HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>("Not found id:"+id,HttpStatus.BAD_REQUEST);
        }

    }

}
