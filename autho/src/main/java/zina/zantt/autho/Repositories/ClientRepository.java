package zina.zantt.autho.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import zina.zantt.autho.Entities.ClientEntity;

public interface ClientRepository extends JpaRepository<ClientEntity, String> {
}
