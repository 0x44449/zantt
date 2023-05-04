package zina.zantt.autho.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity(name = "refresh-info")
public class RefreshInfoEntity {
    @Id
    @Column(nullable = false, updatable = false, length = 1000)
    private String refreshToken;
    @Column(nullable = false, updatable = false, length = 1000)
    private String accessToken;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDateTime;
    @Column(nullable = false)
    private LocalDateTime expiresDateTime;
}
