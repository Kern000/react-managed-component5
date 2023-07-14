import React from 'react';
import axios from 'axios';
import AddItem from './addItem';
import DisplayNormal from './displayNormal';
import DisplayUpdate from './displayUpdate';

export default class BudgetTracker extends React.Component{

    state={
        newDescription:'',
        newAmount:'',
        itemToBeModified:'',
        descriptionToBeModified:'',
        amountToBeModified:'',
        checkboxToBeModified:'',
        expenses:[]
    }

    importData = async () => {
        const response=await axios.get('./expense.json')
        const data = response.data
        this.setState({
            expenses:data
        })
    }

    componentDidMount(){
        this.importData();
    }

    render(){
        return(
        <React.Fragment>
            <h2> Expense Tracking </h2>
            <ul>
            {this.state.expenses.map((expense) => 
                this.state.itemToBeModified !== expense.id? 
                <DisplayNormal 
                    expense={expense}
                    checkExpense={this.checkExpense}
                    setupForUpdate={this.setupForUpdate}
                    deleteExpense={this.deleteExpense}                
                /> 
                : 
                <DisplayUpdate
                    expense={expense}
                    descriptionToBeModified={this.state.descriptionToBeModified}
                    updateFormField={this.updateFormField}
                    amountToBeModified={this.state.amountToBeModified}
                    checkExpense={this.checkExpense}
                    updateFields={this.updateFields}
                />
            )}  
            </ul>
            
            <AddItem
            newDescription = {this.state.newDescription}
            updateFormField = {this.updateFormField}
            newAmount = {this.state.newAmount}
            addItem = {this.addItem}            
            />

        </React.Fragment>
        )
    }

    setupForUpdate = (expense) => {
        this.setState({
        'itemToBeModified':expense.id,
        'descriptionToBeModified':expense.description,
        'amountToBeModified':expense.expenseAmount,
        })
    }


    addItem = () => {
        const newItem={
            'id':Math.floor(Math.random()*1000),
            'description': this.state.newDescription,
            'expenseAmount': this.state.newAmount,
            'reconciled':false
        }

        const clone = [...this.state.expenses]
        clone.push(newItem)

        this.setState({
            expenses: clone,
            newDescription:'',
            newAmount:''
        })
    }
    
    checkExpense = (expenseId) =>{
        let indexToChange= this.state.expenses.findIndex(expense=> expense.id === expenseId);
        let itemToChange = this.state.expenses[indexToChange];
        let cloneExpense = {...itemToChange}
        cloneExpense.reconciled = !cloneExpense.reconciled
        const left = this.state.expenses.slice(0,indexToChange)
        const right = this.state.expenses.slice(indexToChange+1)
        const modifiedList = [...left,cloneExpense,...right]

        this.setState({
            'expenses': modifiedList
            
        })
    }

    updateFields = (expenseId)=>{

        const clone=this.state.expenses.slice()
        const indexToChange=clone.findIndex(expense => expense.id === expenseId);
        const itemToChange=clone[indexToChange];
        itemToChange.description = this.state.descriptionToBeModified;
        itemToChange.expenseAmount = this.state.amountToBeModified;
        const left=this.state.expenses.slice(0, indexToChange)
        const right=this.state.expenses.slice(indexToChange+1)
        const modifiedList = [...left,itemToChange,...right]

        this.setState({
            'expenses':modifiedList,
            'itemToBeModified':'',
            'descriptionToBeModified':'',
            'amountToBeModified':''           
        })
    }

    deleteExpense = (expenseId) => {
        const indexToDelete=this.state.expenses.findIndex(expense => expense.id === expenseId);
        const left=this.state.expenses.slice(0, indexToDelete);
        const right=this.state.expenses.slice(indexToDelete+1);
        const modifiedList=[...left, ...right]
        this.setState({
            "expenses":modifiedList
        })
    }

    updateFormField =(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }




}

// componentDidMount(){ } inbuild function to setState based on axios - if component mount, this will call it along with await (synchronous)
// this.updateFormField should be added without ()=> in the onchange because it is not calling anything unlike those functions taking parameter
// have to use clone.push(newItem) this will add newItem to clone, but if you assign variable const newClone = clone.push(newItem), it will return the array length instead as that is the 'return' value (for clone.push())
// other way is to put modifiedList = [...clone, newItem]
