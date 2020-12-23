package world.ucode.cashflow.repositories;

import org.springframework.data.repository.CrudRepository;
import world.ucode.cashflow.models.Transaction;
import world.ucode.cashflow.models.Wallet;

import java.util.List;

public interface WalletRepo extends CrudRepository<Wallet, Long> {
    List<Wallet> findByCurrency_Id(int currencyId);
    List<Wallet> findByUser_Id(int userId);
}