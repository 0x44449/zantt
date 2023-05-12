package zina.zantt.autho.Models.Requests;

import java.util.List;

public class RegistClientBody {
    private String clientName;
    private List<String> redirectUris;
    private String jwks;
}
