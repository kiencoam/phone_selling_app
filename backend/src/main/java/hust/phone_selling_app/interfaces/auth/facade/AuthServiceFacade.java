package hust.phone_selling_app.interfaces.auth.facade;

public interface AuthServiceFacade {

    public String registerCustomer(String email, String password, String fullName);

    public String loginCustomer(String email, String password);

    public String loginStaff(String email, String password);

    public String loginAdmin(String email, String password);

}
