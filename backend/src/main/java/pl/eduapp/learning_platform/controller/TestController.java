package pl.eduapp.learning_platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demo")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "hello, zalogowałeś się pomyślnie";
    }
}
