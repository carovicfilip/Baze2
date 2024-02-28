package com.PISBP.Controler;

import com.PISBP.dao.NewComment;
import com.PISBP.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/komentar")
public class KomentarController {
    private final CommentService commentService;

    public KomentarController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/new")
    public ResponseEntity<String> postComment(@RequestBody NewComment comment){
        commentService.addNew(comment);
        return ResponseEntity.ok("Success");
    }
    @GetMapping("/like")
    public ResponseEntity<String> like(@RequestParam Integer id){
        commentService.like(id);
        return ResponseEntity.ok("Success");
    }
    @GetMapping("/dislike")
    public ResponseEntity<String> dislike(@RequestParam Integer id){
        commentService.dislike(id);
        return ResponseEntity.ok("Success");
    }
}
