package world.ucode.cashflow.models.dao;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
public class Tag {
    @Id
    @Column(name="tagId")
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String name;
    //    private byte icon;
    private String description;
    private BigDecimal price;
}
