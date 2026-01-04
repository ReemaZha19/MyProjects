package com.employ.management.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.employ.management.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByFirstNameContainingIgnoreCase(String keyword);
    List<Employee> findByLastNameContainingIgnoreCase(String keyword);
    List<Employee> findByEmailContainingIgnoreCase(String keyword);
    List<Employee> findByPositionContainingIgnoreCase(String keyword);
}
