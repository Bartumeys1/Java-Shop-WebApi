package shop.entities;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "tbl_productImages")
public class ProductImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 200, nullable = false)
    private String name;
    private int priority;
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date dateCreated;
    private  boolean isDeleted;
    @ManyToOne
    @JoinColumn(name = "product_id",nullable = true)
    private ProductEntity product;
}
