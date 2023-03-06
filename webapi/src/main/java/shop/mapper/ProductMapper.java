package shop.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.dto.product.ProductCreateDTO;
import shop.dto.product.ProductItemDTO;
import shop.entities.ProductEntity;

@Mapper(componentModel = "spring")

public interface ProductMapper {
    ProductEntity ProductByProductCreateDTO (ProductCreateDTO model);
    @Mapping(target = "category" , ignore = true)
    ProductItemDTO ProductItemDTOByProductEntity(ProductEntity product);
}