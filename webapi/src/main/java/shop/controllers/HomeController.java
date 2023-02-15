package shop.controllers;

import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import shop.dto.CategoryDTO;
import shop.dto.viewModels.CategoryUpdateVM;

import java.util.ArrayList;
import java.util.List;



@RestController
@AllArgsConstructor
public class HomeController {
    private static List<CategoryDTO> list = new ArrayList<CategoryDTO>(){{
        add(new CategoryDTO(1,"Test1"));
        add(new CategoryDTO(2,"Test2"));
        add(new CategoryDTO(3,"Test3"));

    }};
    @GetMapping("/")
    public List<CategoryDTO> index(){
        return list;
    }

    @PostMapping("/")
    public void add(@RequestBody CategoryDTO model){
        list.add(model);
    }
    @DeleteMapping("/")
    public void delete(@PathParam("id")int id){
        int index = 0;
        for ( var cat: list) {
            if(cat.getId() == id)
                break;
            index++;
        };
        if(index>=list.size())
            return;
        list.remove(index);

    }

    @PutMapping("/")
    public void update(@RequestBody CategoryUpdateVM model){
        int index = 0;
        for ( var cat: list) {
            if(cat.getId() == model.getId())
                break;
            index++;
        };
        if(index>=list.size())
            return;

        list.get(index).setName(model.getName());

    }
}