package shop.controllers;

import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.CategoryDTO;
import shop.dto.UploadImageDto;
import shop.dto.viewModels.CategoryUpdateVM;
import shop.storage.StorageService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;



@RestController
@AllArgsConstructor
public class HomeController {
    private final StorageService storageService;
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

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serverfile (@PathVariable String filename)
    {
        Resource file = storageService.loadAsResource(filename);
        String urlFileName = URLEncoder.encode("Це прикольна дівчина.jpg", StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\""+urlFileName+"\"")
                .body(file);
    }

    @PostMapping("/upload")
    public String upload(@RequestBody UploadImageDto model)
    {
        String filename = storageService.save(model.getBase64());
        return filename;
    }

}