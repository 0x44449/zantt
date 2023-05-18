package zina.zantt.autho.Entities;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity(name = "client")
@Builder
@Getter
public class ClientEntity {
    @Id
    @Column(nullable = false, updatable = false)
    private String clientId;
    @Column(nullable = false)
    private String clientName;
    @Column(nullable = false)
    private String clientSecret;
    @Column
    private String logoUri;
    @Column
    private String allowRedirectUris; // comma separated list
    @Column
    private String allowCallbackUris; // comma separated list
    @Column
    private String allowOrigins; // comma separated list
    @Column
    private String grantTypes; // comma separated list
    @Column
    private String jwks;
    @Column
    private String jwksUri;
    @Column
    private LocalDateTime createdDateTime;
}
