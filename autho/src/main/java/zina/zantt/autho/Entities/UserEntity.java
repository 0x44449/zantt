package zina.zantt.autho.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "user")
public class UserEntity {
    @Id
    @Column(nullable = false, updatable = false)
    private String userId;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String userName;
}
