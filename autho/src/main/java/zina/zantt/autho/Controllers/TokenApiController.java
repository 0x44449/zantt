package zina.zantt.autho.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zina.zantt.autho.Service.TokenService;

@RestController
@RequestMapping("/api/token")
public class TokenApiController {
    private final TokenService tokenService;

    @Autowired
    public TokenApiController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @GetMapping("private-key/{seed}")
    public ResponseEntity createPrivateKey(@PathVariable("seed") String seed) {
        try {
            var privateKeyString = tokenService.getPrivateKeyBase64(seed);
            return ResponseEntity.ok(privateKeyString);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("public-key/{seed}")
    public ResponseEntity createPublicKey(@PathVariable("seed") String seed) {
        try {
            var publicKeyString = tokenService.getPublicKeyBase64(seed);
            return ResponseEntity.ok(publicKeyString);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @PostMapping("")
//    public ResponseEntity publishToken() {
//        return ResponseEntity.ok("Success");
//    }
}
