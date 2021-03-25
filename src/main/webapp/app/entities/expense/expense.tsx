import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './expense.reducer';
import { IExpense } from 'app/shared/model/expense.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExpenseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Expense = (props: IExpenseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { expenseList, match, loading } = props;
  return (
    <div>
      <h2 id="expense-heading">
        Expenses
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Expense
        </Link>
      </h2>
      <div className="table-responsive">
        {expenseList && expenseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripption</th>
                <th>Amount</th>
                <th>Expense Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {expenseList.map((expense, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${expense.id}`} color="link" size="sm">
                      {expense.id}
                    </Button>
                  </td>
                  <td>{expense.descripption}</td>
                  <td>{expense.amount}</td>
                  <td>
                    {expense.expenseDate ? <TextFormat type="date" value={expense.expenseDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${expense.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${expense.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${expense.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Expenses found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ expense }: IRootState) => ({
  expenseList: expense.entities,
  loading: expense.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
