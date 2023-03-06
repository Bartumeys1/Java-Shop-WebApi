package shop.controllers;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductItemDTO;
import shop.entities.ProductEntity;
import shop.interfaces.ProductService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/products")
public class ProductController {
    private final ProductService _productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductEntity> create(@Valid @ModelAttribute ProductCreateDTO model) {
        var result = _productService.create(model);
        if (result != null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @GetMapping
    public ResponseEntity<List<ProductItemDTO>> get (){
        var result = _productService.get();
        if (result != null)
            return new ResponseEntity<>(result, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping
    public ResponseEntity<String>delete(@PathParam("id") int id)
    {
        _productService.delete(id);
        return new ResponseEntity<>("delete product ", HttpStatus.OK);
    }
}
