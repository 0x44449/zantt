package zina.zantt.autho.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zina.zantt.autho.Entities.ClientEntity;
import zina.zantt.autho.Models.RegistedClient;
import zina.zantt.autho.Repositories.ClientRepository;
import zina.zantt.autho.Types.GrantType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    private String generateClientId() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public void registByClientAssertion(String clientName,
                                        List<String> redirectUris,
                                        String jwks) {

    }

    public void registClient(String clientName,
                             String logoUri,
                             List<String> allowRedirectUris,
                             List<String> allowCallbackUris,
                             List<String> allowOrigins,
                             List<GrantType> grantTypes) {
        var client = ClientEntity.builder()
                .clientId(generateClientId())
                .clientName(clientName)
                .logoUri(logoUri)
                .allowRedirectUris(String.join(",", allowRedirectUris))
                .allowCallbackUris(String.join(",", allowCallbackUris))
                .allowOrigins(String.join(",", allowOrigins))
                .grantTypes(grantTypes.stream()
                        .map(GrantType::toString)
                        .collect(Collectors.joining(",")))
                .createdDateTime(LocalDateTime.now())
                .build();
    }

//    public RegistedClient registClient(String clientName,
//                                       List<String> redirectUris,
//                                       String jwks) {
//        var client = new ClientEntity();
//        client.setClientId(generateClientId());
//        client.setClientName(clientName);
//        for (var uri : redirectUris) {
//            if (client.getRedirectUri1() == null) {
//                client.setRedirectUri1(uri);
//            } else if (client.getRedirectUri2() == null) {
//                client.setRedirectUri2(uri);
//            } else if (client.getRedirectUri3() == null) {
//                client.setRedirectUri3(uri);
//            } else {
//                break;
//            }
//        }
//        client.setScope("");
//        client.setJwks(jwks);
//        client.setCreatedDateTime(LocalDateTime.now());
//
//        var addedClient = clientRepository.save(client);
//
//        var registedClient = new RegistedClient();
//        return registedClient;
//    }
}
