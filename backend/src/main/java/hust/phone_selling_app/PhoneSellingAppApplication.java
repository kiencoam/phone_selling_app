package hust.phone_selling_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PhoneSellingAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhoneSellingAppApplication.class, args);
	}

}
