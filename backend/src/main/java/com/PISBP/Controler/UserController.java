package com.PISBP.Controler;

import com.PISBP.dao.NewUser;
import com.PISBP.dao.UserData;
import com.PISBP.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserData>> getUsers(){
        List<UserData> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/new")
    public ResponseEntity<String> addUser(@RequestBody NewUser user){
        userService.addUser(user);
        return ResponseEntity.ok("success");
    }
    @GetMapping("/changeRole")
    public ResponseEntity<String> setRole(@RequestParam Integer userId,@RequestParam String role){
        userService.setRole(userId,role);
        return ResponseEntity.ok("Success");
    }
}
