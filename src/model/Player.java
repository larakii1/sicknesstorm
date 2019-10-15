package model;

import java.util.ArrayList;

public class Player {

	private int id;
	private String name;
	private ArrayList<Integer> playerTerritories = new ArrayList<Integer>();

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<Integer> getPlayerTerritories() {
		return playerTerritories;
	}
	public void setPlayerTerritories(ArrayList<Integer> playerTerritories) {
		this.playerTerritories = playerTerritories;
	}

	public void addTerritory(Territory territory) {

	}

	public void deleteTerritory(Territory territory) {
	
	}
	
	
		
	}




