package zina.zantt.autho.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client")
public class ClientApiController {
    @GetMapping("/register")
    public ResponseEntity getRegisted() {
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/register")
    public ResponseEntity regist() {
        return ResponseEntity.ok("Success");
    }
}
