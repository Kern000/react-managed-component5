import React from 'react';


export default function AddItem(props){
    return(
        <React.Fragment>
            <h5>Enter new expenses</h5>
            <input  type="text"
                    name="newDescription"
                    value={props.newDescription}
                    onChange={props.updateFormField}
                    placeholder="Enter new description"
            />
            <br/>
            <input  type="text"
                    name="newAmount"
                    value={props.newAmount}
                    onChange={props.updateFormField}
                    placeholder="Enter Amount"
            />
            <br/>
            <button onClick={props.addItem}>
                Add
            </button>
        </React.Fragment>
    )
}