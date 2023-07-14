import React from 'react';

export default function DisplayUpdate(props){
    return(
        <React.Fragment>
            <li key={props.expense.id} className="list-group-item">
                <input  type="text"
                        name="descriptionToBeModified"
                        value={props.descriptionToBeModified}
                        onChange={props.updateFormField}
                        placeholder="Update description"
                />
                <br/>
                <input  type="text"
                        name="amountToBeModified"
                        value={props.amountToBeModified}
                        onChange={props.updateFormField}
                        placeholder="Update amount"
                />
                <br/>
                Reconciled? 
                <input  type="checkbox"
                        checked={props.expense.reconciled===true}
                        name="reconciled"
                        onChange={()=>props.checkExpense(props.expense.id)}
                />
                {props.expense.reconciled? 'Yes': 'No'}
                <br/>

                <button    className="ms-3 btn btn-danger btn-sm"
                        onClick={()=>props.updateFields(props.expense.id)}
                >
                Edit
                </button>
                <br/>
            </li>
        </React.Fragment>
    )
}




