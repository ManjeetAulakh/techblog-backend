package com.blogsite.blogapi.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "posts")
@NoArgsConstructor
@Setter
@Getter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pid;

    private String title;
    private String content;
    private Date date;
    private String image;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;

    /*by deafult it take field name that is user then go user class and take id name so
     full name user_id or category_cat_id  as when name is catId then it use _ after 
     capital letter */


    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Comment> comments = new HashSet<>();
}


/*
 * @ManyToOne() → Many posts can belong to one category.
Example:
Category "Technology" can have 10 posts → Many Post instances point to one Category.
@JoinColumn(name = "category_id") → This tells JPA:
In the posts table, there will be a column category_id.
This column stores the primary key of the Category entity.
Without @JoinColumn, JPA would default the column name using the field name 
and id: category_cat_id (because of camelCase to snake_case conversion). 
 */