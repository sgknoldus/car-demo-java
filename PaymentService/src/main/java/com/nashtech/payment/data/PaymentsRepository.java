package com.nashtech.payment.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentsRepository extends JpaRepository<Payment,String> {

    Payment findByOrderId(String orderId);
}