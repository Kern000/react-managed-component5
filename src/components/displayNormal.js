import React from 'react';

export default function DisplayNormal (props){
    return(
        <React.Fragment>
                <li key={props.expense.id} className="list-group-item">
                    Expense: {props.expense.description} <br/>
                    Amount: {props.expense.expenseAmount} <br/>
                    Reconciled?
                    <input  type="checkbox"
                            checked={props.expense.reconciled===true}
                            onChange={()=>props.checkExpense(props.expense.id)}
                    />
                    {props.expense.reconciled? 'Yes': 'No'}
                    <br/>
    
                    <button className="ms-3 btn btn-danger btn-sm"
                            onClick={()=> props.setupForUpdate(props.expense)}>
                    Edit 
                    </button>
                    
                    <button className="ms-3 btn btn-info btn-sm"
                            onClick={()=>props.deleteExpense(props.expense.id)}
                    > 
                    Delete 
                    </button>
                    <br/>
                </li>
        
        </React.Fragment>
    )
}