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
    private LocalDateTime createdDateTime;

//    @Id
//    @Column(nullable = false, updatable = false)
//    private String clientId;
//    @Column(nullable = false)
//    private String clientName;
//    @Column(nullable = false)
//    private String scope; // String containing a space-separated list of scope values of OAuth 2.0
//    @Column
//    private String redirectUri1;
//    @Column
//    private String redirectUri2;
//    @Column
//    private String redirectUri3;
//    @Column
//    private String jwks;
//    @Column
//    private String jwksUri;
//    @Column(nullable = false)
//    private LocalDateTime createdDateTime;
//    @Column
//    @Enumerated(EnumType.STRING)
//    private GrantType grantType;
//    @Column
//    private String clientSecret;
//
//    public String getClientId() {
//        return clientId;
//    }
//
//    public void setClientId(String clientId) {
//        this.clientId = clientId;
//    }
//
//    public String getClientName() {
//        return clientName;
//    }
//
//    public void setClientName(String clientName) {
//        this.clientName = clientName;
//    }
//
//    public String getScope() {
//        return scope;
//    }
//
//    public void setScope(String scope) {
//        this.scope = scope;
//    }
//
//    public String getRedirectUri1() {
//        return redirectUri1;
//    }
//
//    public void setRedirectUri1(String redirectUri1) {
//        this.redirectUri1 = redirectUri1;
//    }
//
//    public String getRedirectUri2() {
//        return redirectUri2;
//    }
//
//    public void setRedirectUri2(String redirectUri2) {
//        this.redirectUri2 = redirectUri2;
//    }
//
//    public String getRedirectUri3() {
//        return redirectUri3;
//    }
//
//    public void setRedirectUri3(String redirectUri3) {
//        this.redirectUri3 = redirectUri3;
//    }
//
//    public String getJwks() {
//        return jwks;
//    }
//
//    public void setJwks(String jwks) {
//        this.jwks = jwks;
//    }
//
//    public String getJwksUri() {
//        return jwksUri;
//    }
//
//    public void setJwksUri(String jwksUri) {
//        this.jwksUri = jwksUri;
//    }
//
//    public LocalDateTime getCreatedDateTime() {
//        return createdDateTime;
//    }
//
//    public void setCreatedDateTime(LocalDateTime createdDateTime) {
//        this.createdDateTime = createdDateTime;
//    }
}
