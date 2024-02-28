package com.PISBP.Controler;

import com.PISBP.dao.NewVest;
import com.PISBP.dao.VestBaseInfo;
import com.PISBP.dao.VestResponse;
import com.PISBP.entity.Vest;
import com.PISBP.service.VestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/vest")
public class VestController {

    private final VestService vestService;

    public VestController(VestService vestService) {
        this.vestService = vestService;
    }

    @GetMapping("/todays")
    public ResponseEntity<List<VestBaseInfo>> getTodays(){
        List<VestBaseInfo> vesti= vestService.getTodays();
        return ResponseEntity.ok().body(vesti);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateNews(@RequestBody NewVest vest, @RequestParam Integer id){
        vestService.updateVest(vest,id);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/all")
    public ResponseEntity<List<VestBaseInfo>> getAll(){
        List<VestBaseInfo> vesti= vestService.getAll();
        return ResponseEntity.ok(vesti);
    }
    @GetMapping("/published")
    public ResponseEntity<List<VestBaseInfo>> getPublished(){
        List<VestBaseInfo> vesti= vestService.getByState("published");
        return ResponseEntity.ok(vesti);
    }

    @GetMapping("/forApprove")
    public ResponseEntity<List<VestBaseInfo>> forApprove(@RequestParam Integer userId){
        List<VestBaseInfo> vesti= vestService.getForApprove(userId);
        return ResponseEntity.ok(vesti);
    }

    @GetMapping("/my")
    public ResponseEntity<List<VestBaseInfo>> getMy(@RequestParam Integer userId){
        List<VestBaseInfo> vesti= vestService.getEditableByUserId(userId);
        return ResponseEntity.ok(vesti);
    }

    @GetMapping("/toApproving")
    public ResponseEntity<String> toApproving(@RequestParam Integer vestId){
        vestService.changeState(vestId,"approving");
        return ResponseEntity.ok("Success");
    }
    @GetMapping("/toDraft")
    public ResponseEntity<String> toDraft(@RequestParam Integer vestId){
        vestService.changeState(vestId,"draft");
        return ResponseEntity.ok("Success");
    }
    @GetMapping("/toPublished")
    public ResponseEntity<String> toPublished(@RequestParam Integer vestId){
        vestService.changeState(vestId,"published");
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<VestResponse> getOneVest(@PathVariable(name = "id") Integer id){
        VestResponse vest= vestService.getById(id);
        return ResponseEntity.ok(vest);
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<String> deleteOneVest(@PathVariable(name = "id") Integer id){
        vestService.delete(id);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/new")
    public ResponseEntity<String> addVest(@RequestBody NewVest vest){
        vestService.saveVest(vest);
        return ResponseEntity.ok().body("Success");
    }
    @GetMapping("/like")
    public ResponseEntity<String> like(@RequestParam Integer id){
        vestService.like(id);
        return ResponseEntity.ok("Success");
    }
    @GetMapping("/dislike")
    public ResponseEntity<String> dislike(@RequestParam Integer id){
        vestService.dislike(id);
        return ResponseEntity.ok("Success");
    }

}
