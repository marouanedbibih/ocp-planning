package org.fahdpln.backend.config;

import com.github.javafaker.Faker;
import lombok.RequiredArgsConstructor;
import org.fahdpln.backend.departement.Departement;
import org.fahdpln.backend.employee.Employee;
import org.fahdpln.backend.schedule.Schedule;
import org.fahdpln.backend.schedule.Weekday;
import org.fahdpln.backend.user.User;
import org.fahdpln.backend.user.UserRole;
import org.fahdpln.backend.employee.EmployeeRepository;
import org.fahdpln.backend.departement.DepartementRepository;
import org.fahdpln.backend.schedule.ScheduleRepository;
import org.fahdpln.backend.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

@Component
@RequiredArgsConstructor
public class DatabaseInit implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartementRepository departementRepository;
    private final ScheduleRepository scheduleRepository;
    private final Faker faker;
    private final PasswordEncoder passwordEncoder;

    private static final String DEFAULT_PASSWORD = "password";

    @Override
    public void run(String... args) {
        try {
            initAdmin();

            // Create 10 departments with their respective secretaries and employees
            IntStream.range(0, 10).forEach(i -> {
                Departement department = createDepartment();
                departementRepository.save(department);
                
                createSecretaries(department);
                createEmployees(department);
            });

            System.out.println("Database has been populated with initial data using Faker.");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("An error occurred while populating the database.");
        }
    }

    /**
     * Initializes the admin user.
     */
    private void initAdmin() {
        User admin = User.builder()
                .username("admin")
                .name("Admin")
                .email("admin@ocp.com")
                .phone("1234567890")
                .password(passwordEncoder.encode(DEFAULT_PASSWORD))
                .role(UserRole.ADMIN)
                .build();
        userRepository.save(admin);
    }

    /**
     * Creates a department with a random name.
     *
     * @return The created department.
     */
    private Departement createDepartment() {
        Departement department = new Departement();
        department.setName(faker.company().name());
        return department;
    }

    /**
     * Creates 10 secretaries for a given department.
     *
     * @param department The department where secretaries will be assigned.
     */
    private void createSecretaries(Departement department) {
        IntStream.range(0, 10).forEach(i -> {
            User secretaryUser = createUser(UserRole.SECRETARY);
            userRepository.save(secretaryUser);

            Employee secretaryEmployee = new Employee();
            secretaryEmployee.setUser(secretaryUser);
            secretaryEmployee.setJob("Secretary");
            secretaryEmployee.setIsSecretary(true);
            secretaryEmployee.setDepartement(department);
            employeeRepository.save(secretaryEmployee);
        });
    }

    /**
     * Creates 10 employees for a given department and assigns schedules.
     *
     * @param department The department where employees will be assigned.
     */
    private void createEmployees(Departement department) {
        IntStream.range(0, 10).forEach(i -> {
            User employeeUser = createUser(UserRole.EMPLOYEE);
            userRepository.save(employeeUser);

            Employee employee = new Employee();
            employee.setUser(employeeUser);
            employee.setJob(faker.job().title());
            employee.setIsSecretary(false);
            employee.setDepartement(department);
            employeeRepository.save(employee);

            createSchedulesForEmployee(employee);
        });
    }

    /**
     * Creates a user with random details and the specified role.
     *
     * @param role The role to assign to the user.
     * @return The created user.
     */
    private User createUser(UserRole role) {
        return new User(
                faker.name().username(),
                faker.name().fullName(),
                faker.internet().emailAddress(),
                faker.phoneNumber().phoneNumber(),
                passwordEncoder.encode(DEFAULT_PASSWORD),
                role,
                null
        );
    }

    /**
     * Creates schedules for a given employee.
     *
     * @param employee The employee to assign schedules to.
     */
    private void createSchedulesForEmployee(Employee employee) {
        List<Schedule> schedules = Arrays.stream(Weekday.values())  // Use Arrays.stream() to convert the array to a stream
                .map(weekday -> {
                    Schedule schedule = new Schedule();
                    schedule.setEmployee(employee);
                    schedule.setWeekday(weekday);
                    schedule.setStartHour(LocalTime.of(9, 0));
                    schedule.setEndHour(LocalTime.of(17, 0));
                    return schedule;
                })
                .toList();  // Collect the results into a List
    
        scheduleRepository.saveAll(schedules);
    
        // Assign schedules to employee
        employee.setSchedules(schedules);
        employeeRepository.save(employee);
    }
}
