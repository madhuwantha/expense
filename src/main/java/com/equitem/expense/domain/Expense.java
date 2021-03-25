package com.equitem.expense.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Expense.
 */
@Entity
@Table(name = "expense")
public class Expense implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descripption")
    private String descripption;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "expense_date")
    private LocalDate expenseDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripption() {
        return descripption;
    }

    public Expense descripption(String descripption) {
        this.descripption = descripption;
        return this;
    }

    public void setDescripption(String descripption) {
        this.descripption = descripption;
    }

    public Double getAmount() {
        return amount;
    }

    public Expense amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public Expense expenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
        return this;
    }

    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Expense)) {
            return false;
        }
        return id != null && id.equals(((Expense) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Expense{" +
            "id=" + getId() +
            ", descripption='" + getDescripption() + "'" +
            ", amount=" + getAmount() +
            ", expenseDate='" + getExpenseDate() + "'" +
            "}";
    }
}
