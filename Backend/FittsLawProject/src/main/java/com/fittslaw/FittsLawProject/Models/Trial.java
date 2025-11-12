package com.fittslaw.FittsLawProject.Models;


import jakarta.persistence.*;

@Entity
@Table(name = "trials")
public class Trial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int participantId;
    private int blockNumber;
    private int trialNumber;
    private int diameter;
    private int distance;
    private String direction;
    private double movementTimeMs;
    private boolean hit;
    private double clickX;
    private double clickY;
    private double targetX;
    private double targetY;

    // Constructors
    public Trial() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getParticipantId() { return participantId; }
    public void setParticipantId(int participantId) { this.participantId = participantId; }

    public int getBlockNumber() { return blockNumber; }
    public void setBlockNumber(int blockNumber) { this.blockNumber = blockNumber; }

    public int getTrialNumber() { return trialNumber; }
    public void setTrialNumber(int trialNumber) { this.trialNumber = trialNumber; }

    public int getDiameter() { return diameter; }
    public void setDiameter(int diameter) { this.diameter = diameter; }

    public int getDistance() { return distance; }
    public void setDistance(int distance) { this.distance = distance; }

    public String getDirection() { return direction; }
    public void setDirection(String direction) { this.direction = direction; }

    public double getMovementTimeMs() { return movementTimeMs; }
    public void setMovementTimeMs(double movementTimeMs) { this.movementTimeMs = movementTimeMs; }

    public boolean isHit() { return hit; }
    public void setHit(boolean hit) { this.hit = hit; }

    public double getClickX() { return clickX; }
    public void setClickX(double clickX) { this.clickX = clickX; }

    public double getClickY() { return clickY; }
    public void setClickY(double clickY) { this.clickY = clickY; }

    public double getTargetX() { return targetX; }
    public void setTargetX(double targetX) { this.targetX = targetX; }

    public double getTargetY() { return targetY; }
    public void setTargetY(double targetY) { this.targetY = targetY; }
}
