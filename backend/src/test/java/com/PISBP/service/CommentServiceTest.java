package com.PISBP.service;

import com.PISBP.dao.NewComment;
import com.PISBP.entity.Komentar;
import com.PISBP.entity.Vest;
import com.PISBP.repository.KomentarRepository;
import com.PISBP.repository.VestReposotory;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class CommentServiceTest {

    @Mock
    private VestReposotory vestReposotory;

    @Mock
    private KomentarRepository komentarRepository;

    @InjectMocks
    private CommentService komentarService;

    @Test
    public void testAddNew() {
        // Create a sample NewComment object
        NewComment comment = new NewComment();
        comment.setVestId(1);
        comment.setText("Sample comment");
        comment.setUsername("user123");

        // Create a sample Vest object
        Vest vest = new Vest();
        vest.setId(1);

        // Mock the behavior of VestRepository
        when(vestReposotory.getById(1)).thenReturn(vest);

        // Call the addNew method
        komentarService.addNew(comment);

        // Verify that the method was called with the correct parameters
        verify(vestReposotory).getById(1);

        // Verify that a new Komentar was created and saved
        verify(komentarRepository).save(any(Komentar.class));

        verify(komentarRepository).save(argThat(komentar ->
                komentar.getVest().equals(vest) && // Check if the Vest is correct
                        komentar.getText().equals(comment.getText()) && // Check if the text matches
                        komentar.getUsername().equals(comment.getUsername()) && // Check if the username matches
                        komentar.getBrojLajkova() == 0 && // Check if likes are initialized to 0
                        komentar.getBrojDislajkova() == 0 // Check if dislikes are initialized to 0
        ));
    }
}