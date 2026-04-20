package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products") // Maps to a table named 'products' in MySQL
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Best for MySQL Auto-Increment
    private Long id;

    private String name;
    private String description;
    private double price;
    private int quantity;
    private String category;
    
    @Column(length = 500)
    private String imageUrl;
}