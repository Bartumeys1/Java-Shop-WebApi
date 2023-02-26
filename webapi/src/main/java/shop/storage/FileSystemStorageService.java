package shop.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileSystemStorageService implements StorageService{
    private final Path rootlocation;
    public  FileSystemStorageService (StorageProperties properties)
    {
        rootlocation = Paths.get(properties.getLocation());
    }
    @Override
    public void init() {
        try{
            if(!Files.exists(rootlocation))
                Files.createDirectories(rootlocation);
        }
        catch (IOException ex){
            throw new StorageException("Помикла стоврення папки", ex);
        }
    }

    @Override
    public Resource loadAsResource(String filename) {
        try{
            Path file = rootlocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable())
                return resource;
            else
                throw new StorageException("File problems: "+filename);
        }
        catch (MalformedURLException ex) {
            throw new StorageException("File not found: " + filename);
        }
    }

    @Override
    public String save(String base64) {
        try {
            if(base64.isEmpty()) {
                throw new StorageException("Пустий base64");
            }
            UUID uuid = UUID.randomUUID();
            String randomFileName = uuid.toString()+".jpg";
            String [] charArray = base64.split(",");
            Base64.Decoder decoder = Base64.getDecoder();
            byte [] bytes = new byte[0];
            bytes = decoder.decode(charArray[1]);
            String folder = rootlocation.toString()+"/"+randomFileName;
            try(FileOutputStream stream = new FileOutputStream(folder)){
                stream.write(bytes);
            }
            return randomFileName;
        } catch (IOException e) {
            throw new StorageException("Проблема перетворення та збереження base64", e);
        }
    }

    @Override
    public Boolean deleteFile(String fileName) {

        File file = new File(rootlocation.resolve(fileName).toString());

        if (!file.exists()){
            System.out.println(fileName + " Not Found.");
            return false;
        }
        else
        if(file.delete()) {
           System.out.println(fileName + " deleted.");
            return true;
        }

        return false;
    }

    @Override
    public void updateFile(String oldFileName , String base64) {
        try {
            if (base64.isEmpty())
                throw new StorageException("Failed to store empty base64 ");

            String [] charArray = base64.split(",");
            Base64.Decoder decoder = Base64.getDecoder();
            byte [] bytes = new byte[0];
            bytes = decoder.decode(charArray[1]);
            String fullPath = rootlocation.resolve(oldFileName).toString();
            try(FileOutputStream stream = new FileOutputStream(fullPath)){
                stream.write(bytes);
            }
        } catch (Exception e) {
            throw new StorageException("Failed to save file ", e);
        }
    }
}
