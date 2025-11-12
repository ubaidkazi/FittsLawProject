package com.fittslaw.FittsLawProject.Repo;

import com.fittslaw.FittsLawProject.Models.Trial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrialRepository extends JpaRepository<Trial, Long> {
    // You can add custom queries later if needed
}