package zina.zantt.autho.Service;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zina.zantt.autho.Repositories.ClientRepository;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;
import java.security.spec.ECGenParameterSpec;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Service
public class TokenService {
    private final String CIPER_ALGORITHM = "RSA/ECB/NoPadding";
    private final String KEY_GEN_ALGORITHM = "EC";
    private final String SEED_HASH_ALGORITHM = "SHA-256";
    private final String KEY_RANDOM_ALGORITHM = "SHA1PRNG";

    private final ClientRepository clientRepository;

    @Autowired
    public TokenService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    private void getPrivateKey() {
        var keyPair = Keys.keyPairFor(SignatureAlgorithm.ES256);
    }

    private PrivateKey getPrivateKeyFromBase64(String base64)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        var decoded = Base64.getDecoder().decode(base64);
        return KeyFactory.getInstance(KEY_GEN_ALGORITHM).generatePrivate(
                new PKCS8EncodedKeySpec(decoded)
        );
    }

    private PrivateKey genES256PrivateKey(String seed) throws NoSuchAlgorithmException, InvalidAlgorithmParameterException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC");

        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        random.setSeed(md.digest(seed.getBytes()));

        keyPairGenerator.initialize(new ECGenParameterSpec("secp256r1"), random);

        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        return keyPair.getPrivate();
    }

    private PublicKey genES256PublicKey(String seed) throws NoSuchAlgorithmException, InvalidAlgorithmParameterException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC");

        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        random.setSeed(md.digest(seed.getBytes()));

        keyPairGenerator.initialize(new ECGenParameterSpec("secp256r1"), random);

        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        return keyPair.getPublic();
    }

    private PublicKey getPublicKeyFromBase64(String base64)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        var decoded = Base64.getDecoder().decode(base64);
        return KeyFactory.getInstance(KEY_GEN_ALGORITHM).generatePublic(
                new X509EncodedKeySpec(decoded)
        );
    }

    private byte[] decrypt(PrivateKey privateKey, byte[] secret)
            throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException,
            InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        Cipher cipher = Cipher.getInstance(CIPER_ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        cipher.update(secret);
        return cipher.doFinal();
    }

    public String getPrivateKeyBase64(String seed) throws NoSuchAlgorithmException, InvalidAlgorithmParameterException {
        var privateKey = genES256PrivateKey(seed);
        return Base64.getEncoder().encodeToString(privateKey.getEncoded());
    }

    public String getPublicKeyBase64(String seed) throws NoSuchAlgorithmException, InvalidAlgorithmParameterException {
        var publicKey = genES256PublicKey(seed);
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }

    public void publishToken(String clientCredentials) {
        try {
            // Get private key from secret place...
            var privateKey = genES256PrivateKey("secret");



            // Decode JWT by private key
            // Check if JWT is valid
            // - The issuer (iss) claim must be the client_id of the client application
            // - The subject (sub) claim must be the client_id of the client application
            // - The audience (aud) claim must be the authorization server
            // - The JWT ID (jti) is unique to that token request (the token must not be re-used)
            // - The token has an expires at (exp) claim, and, optionally, an issued at (iat) claim

            // If JWT is valid, publish token
        }
        catch (Exception e) {
            // If JWT is invalid, return error
        }
    }

    public void issueTokenByAssertion(String clientId, String scope, String state, String clientAssertion) {
        // get client by clientId
        var client = clientRepository.findById(clientId).orElse(null);
        if (client == null) {
            // throw error
        }

        client.getJwksUri();

        // create JWT token by jwks, it's a public key

    }

    public void issueCodeByJwks(String clientId, String scope, String jwks) {

    }
}
