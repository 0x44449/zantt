package zina.zantt.autho.Models;

import java.util.List;

//   https://www.rfc-editor.org/rfc/rfc7591
//   Additionally, the authorization server MUST return all registered
//   metadata about this client, including any fields provisioned by the
//   authorization server itself.
public class RegistedClient {
    private String clientId;
    private String clientSecret;
    private int clientIdIssuedAt;
    private int clientSecretExpiresAt;
    private List<String> redirectUris;
    private List<String> grantTypes; // ["authorization_code", "refresh_token"]
    private String clientName;
    private String tokenEndpointAuthMethod; // "client_secret_basic"
    private String logoUri;
    private String jwks;
    private String jwksUri;
}
