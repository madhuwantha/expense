import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IExpense } from 'app/shared/model/expense.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './expense.reducer';

export interface IExpenseDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ExpenseDeleteDialog = (props: IExpenseDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/expense');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.expenseEntity.id);
  };

  const { expenseEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody id="expenseApp.expense.delete.question">Are you sure you want to delete this Expense?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp; Cancel
        </Button>
        <Button id="jhi-confirm-delete-expense" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp; Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ expense }: IRootState) => ({
  expenseEntity: expense.entity,
  updateSuccess: expense.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDeleteDialog);
