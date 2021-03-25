import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './expense.reducer';
import { IExpense } from 'app/shared/model/expense.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExpenseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ExpenseDetail = (props: IExpenseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { expenseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Expense [<b>{expenseEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="descripption">Descripption</span>
          </dt>
          <dd>{expenseEntity.descripption}</dd>
          <dt>
            <span id="amount">Amount</span>
          </dt>
          <dd>{expenseEntity.amount}</dd>
          <dt>
            <span id="expenseDate">Expense Date</span>
          </dt>
          <dd>
            {expenseEntity.expenseDate ? <TextFormat value={expenseEntity.expenseDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/expense" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/expense/${expenseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ expense }: IRootState) => ({
  expenseEntity: expense.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDetail);
