package com.excelr.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity

@Data
public class Bookings {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private LocalDateTime checkin;
	private LocalDateTime checkout;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@OneToMany
	@JoinColumn(name = "category_id", nullable = false)
	private List<Category> category;
	
	@OneToMany
	@JoinColumn(name = "room_id", nullable = false)
	private List<Rooms> rooms;
	
}
