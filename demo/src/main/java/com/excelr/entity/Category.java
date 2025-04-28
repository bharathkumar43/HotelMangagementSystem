package com.excelr.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String type; // AC, Non-AC, Luxury
	private String desciption;
	private String image;
	private Double cost;
	private String offer;
	
	
	@OneToMany(mappedBy = "Rooms", cascade = CascadeType.ALL)
	private List<Rooms> room;
}
