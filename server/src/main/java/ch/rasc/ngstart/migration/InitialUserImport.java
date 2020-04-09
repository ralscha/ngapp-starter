package ch.rasc.ngstart.migration;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import liquibase.change.custom.CustomTaskChange;
import liquibase.database.Database;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.CustomChangeException;
import liquibase.exception.DatabaseException;
import liquibase.exception.ValidationErrors;
import liquibase.resource.ResourceAccessor;

public class InitialUserImport implements CustomTaskChange {

	@Override
	public String getConfirmationMessage() {
		return "Initial User Import successful";
	}

	@Override
	public void setUp() {
		// nothing here
	}

	@Override
	public void setFileOpener(ResourceAccessor resourceAccessor) {
		// nothing here
	}

	@Override
	public ValidationErrors validate(Database database) {
		return null;
	}

	@Override
	public void execute(Database database) throws CustomChangeException {
		PasswordEncoder pe = new Argon2PasswordEncoder(16, 32, 8, 1 << 16, 4);

		JdbcConnection databaseConnection = (JdbcConnection) database.getConnection();

		try (PreparedStatement pstmt = databaseConnection.prepareStatement(
				"insert into app_user(user_name, first_name, last_name, email, password_hash, authorities, enabled) values(?,?,?,?,?,?,?)")) {

			pstmt.setString(1, "admin");
			pstmt.setString(2, "admin");
			pstmt.setString(3, "admin");
			pstmt.setString(4, "admin@start.com");
			pstmt.setString(5, pe.encode("admin"));
			pstmt.setString(6, "ADMIN");
			pstmt.setBoolean(7, true);
			pstmt.executeUpdate();

			pstmt.setString(1, "user");
			pstmt.setString(2, "user");
			pstmt.setString(3, "user");
			pstmt.setString(4, "user@start.com");
			pstmt.setString(5, pe.encode("user"));
			pstmt.setString(6, "USER");
			pstmt.setBoolean(7, true);
			pstmt.executeUpdate();

			databaseConnection.commit();
			database.commit();
		}
		catch (SQLException e) {
			throw new CustomChangeException(e);
		}
		catch (DatabaseException e) {
			throw new CustomChangeException(e);
		}

	}

}
