package zina.zantt.autho.Types;

public enum GrantType {
    CLIENT_CREDENTIALS("client_credentials"),
    AUTHORIZAIOTN_CODE("authorization_code"),
    CLIENT_ASSERTION("client_assertion");

    private final String grantType;

    public String getGrantType() {
        return grantType;
    }

    GrantType(String grantType) {
        this.grantType = grantType;
    }
}
