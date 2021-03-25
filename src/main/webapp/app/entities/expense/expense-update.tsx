import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './expense.reducer';
import { IExpense } from 'app/shared/model/expense.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExpenseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ExpenseUpdate = (props: IExpenseUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { expenseEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/expense');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...expenseEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="expenseApp.expense.home.createOrEditLabel">Create or edit a Expense</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : expenseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="expense-id">ID</Label>
                  <AvInput id="expense-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descripptionLabel" for="expense-descripption">
                  Descripption
                </Label>
                <AvField id="expense-descripption" type="text" name="descripption" />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="expense-amount">
                  Amount
                </Label>
                <AvField id="expense-amount" type="string" className="form-control" name="amount" />
              </AvGroup>
              <AvGroup>
                <Label id="expenseDateLabel" for="expense-expenseDate">
                  Expense Date
                </Label>
                <AvField id="expense-expenseDate" type="date" className="form-control" name="expenseDate" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/expense" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  expenseEntity: storeState.expense.entity,
  loading: storeState.expense.loading,
  updating: storeState.expense.updating,
  updateSuccess: storeState.expense.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseUpdate);
