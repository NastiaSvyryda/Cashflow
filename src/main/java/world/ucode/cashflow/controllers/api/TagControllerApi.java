package world.ucode.cashflow.controllers.api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import world.ucode.cashflow.models.dao.Tag;
import world.ucode.cashflow.repositories.TagRepo;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/tag")
public class TagControllerApi {
    @Autowired
    private TagRepo tagRepo;

    @PostMapping("/create")
    public void createTag(@RequestBody Tag tag, HttpServletResponse response) throws IOException {
        try {
            log.info("CREATE TAG");
            tagRepo.save(tag);
        }
        catch (Exception e) {
            e.printStackTrace();
            response.sendError(400, "Bad Request");
        }
    }

    @PostMapping("/update")
    public void updateTag(@RequestBody Tag newTag, HttpServletResponse response) throws IOException {
        log.info("UPDATE TAG");
        try {
            Tag tag = tagRepo.findById(newTag.getId());
            tag.setName(newTag.getName().equals("") ? tag.getName() : newTag.getName());
//            category.setIcon(newCategory.getIcon() == null ? category.getIcon() : newCategory.getIcon());
            tag.setDescription(newTag.getDescription().equals("") ? tag.getDescription() : newTag.getDescription());
            tag.setPrice(newTag.getPrice() == null ? tag.getPrice() : newTag.getPrice());
            tagRepo.save(tag);
        }
        catch (Exception e) {
            e.printStackTrace();
            response.sendError(400, "Bad Request");
        }
    }

    @PostMapping("/delete")
    public void deleteTag(@RequestBody Tag tag, HttpServletResponse response) throws IOException {
        log.info("DELETE TAG");
        try {
            tagRepo.delete(tag);
        }
        catch (Exception e) {
            e.printStackTrace();
            response.sendError(400, "Bad Request");
        }
    }
}
