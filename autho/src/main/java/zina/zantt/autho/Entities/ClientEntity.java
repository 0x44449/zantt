package zina.zantt.autho.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity(name = "client")
public class ClientEntity {
    @Id
    @GeneratedValue(generator = "uuid_string")
    @GenericGenerator(name = "uuid_string", strategy = "zina.zantt.autho.Entities.Generators.UuidStringGenerator")
    @Column(nullable = false, updatable = false)
    private String softwareId;
    @Column(nullable = false)
    private String clientName;
    @Column(nullable = false)
    private String scope; // String containing a space-separated list of scope values of OAuth 2.0
    @Column
    private String redirectUri1;
    @Column
    private String redirectUri2;
    @Column
    private String redirectUri3;
    @Column
    private String jwks;
    @Column
    private String jwksUri;
    @Column(nullable = false)
    private LocalDateTime createdDateTime;
}
