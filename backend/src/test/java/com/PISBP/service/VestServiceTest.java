package com.PISBP.service;

import com.PISBP.entity.Vest;
import com.PISBP.repository.VestReposotory;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class VestServiceTest {

    @Mock
    private VestReposotory vestRepository;

    @InjectMocks
    private VestService vestService;

    @Test
    void like() {
        Vest vest = new Vest();
        vest.setId(1);
        vest.setBrojLajkova(0);

        // Mock the behavior of VestRepository
        when(vestRepository.findById(1)).thenReturn(Optional.of(vest));
        when(vestRepository.save(any(Vest.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Call the like method
        vestService.like(1);

        // Verify that the method was called with the correct ID
        verify(vestRepository).findById(1);

        // Verify that the number of likes has been incremented
        assertEquals(1, vest.getBrojLajkova());

        // Verify that save method was called
        verify(vestRepository).save(vest);

    }

    @Test
    void dislike() {
        Vest vest = new Vest();
        vest.setId(1);
        vest.setBrojDisajkova(0);

        // Mock the behavior of VestRepository
        when(vestRepository.findById(1)).thenReturn(Optional.of(vest));
        when(vestRepository.save(any(Vest.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Call the dislike method
        vestService.dislike(1);

        // Verify that the method was called with the correct ID
        verify(vestRepository).findById(1);

        // Verify that the number of dislikes has been incremented
        assertEquals(1, vest.getBrojDisajkova());

        // Verify that save method was called
        verify(vestRepository).save(vest);
    }

    @Test
    void changeState() {
        Vest vest = new Vest();
        vest.setId(1);
        vest.setState("draft");

        // Mock the behavior of VestRepository
        when(vestRepository.findById(1)).thenReturn(Optional.of(vest));
        when(vestRepository.save(any(Vest.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Call the changeState method
        boolean result = vestService.changeState(1, "approving");

        // Verify that the method was called with the correct ID
        verify(vestRepository).findById(1);

        // Verify that the state has been changed
        assertEquals("approving", vest.getState());

        // Verify that save method was called
        verify(vestRepository).save(vest);

        // Verify that the method returns true
        assertTrue(result);
    }
}