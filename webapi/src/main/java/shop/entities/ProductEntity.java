package shop.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 500 , nullable = false)
    private String name;
    @Column(length = 4000 )

    private String description;
    private double price;
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date dateCreated;
    private  boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "category_id" , nullable = false)
    private CategoryEntity category;


    @OneToMany(mappedBy = "product")
    private List<ProductImageEntity> productImages = new ArrayList<>();

}
