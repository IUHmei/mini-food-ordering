package minifood.userservice.controller;
import minifood.userservice.entity.User;
import minifood.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository repo;

    @GetMapping
    public List<User> getAll() {
        return repo.findAll();
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return repo.save(user);
    }
}