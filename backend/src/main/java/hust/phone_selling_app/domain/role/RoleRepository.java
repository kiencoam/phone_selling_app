package hust.phone_selling_app.domain.role;

public interface RoleRepository {

    public Role findById(Long id);

    public Role findByCode(String code);

    public Role save(Role role);

    public void deleteById(Long id);

}
