package com.fittslaw.FittsLawProject.Controllers;

import com.fittslaw.FittsLawProject.Models.Trial;
import com.fittslaw.FittsLawProject.Repo.TrialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fittslaw/trials")
@CrossOrigin(origins = "http://localhost:5173") // allowing React frontend
public class TrialController {

    @Autowired
    private TrialRepository trialRepository;

    // Save multiple trials at once
    @PostMapping
    public ResponseEntity<String> saveTrials(@RequestBody List<Trial> trials) {
        trialRepository.saveAll(trials);
        return ResponseEntity.ok("Trials saved successfully");
    }

    // Optional: get all trials (for testing)
    @GetMapping
    public List<Trial> getAllTrials() {
        return trialRepository.findAll();
    }
}
