package zina.zantt.autho.Entities;

import jakarta.persistence.Entity;

@Entity(name = "client")
public class ClientEntity {
    private String softwareId;
    private String clientName;
    private String scope; // String containing a space-separated list of scope values of OAuth 2.0
    private String redirectUri1;
    private String redirectUri2;
    private String redirectUri3;
    private String jwks;
    private String jwksUri;
}
