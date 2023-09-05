package com.nashtech.common.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PaymentDetails {
    String bank;
    String cardNumber;
    Integer validUntilMonth;
    Integer validUntilYear;
    Integer cvv;

}