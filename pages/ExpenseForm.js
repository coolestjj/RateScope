import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

import Input from './Input';
import MyButton from '../UI/MyButton';

function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
    category: {
      value: defaultValues ? defaultValues.category : 'None',
      isValid: true,
    },
    plan: {
      value: defaultValues ? defaultValues.plan : 'None',
      isValid: true,
    },
    rate: {
      value: defaultValues ? defaultValues.rate : 'None',
      isValid: true,
    },
    type: {
      value: defaultValues ? defaultValues.type : 'expense',
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const category = [
      {key:'0', value:'None'},
      {key:'1', value:'Utilities'},
      {key:'2', value:'Rent'},
      {key:'3', value:'Transportation'},
  ]

  const plan = [
    {key:'0', value:'None'},
    {key:'1', value:'Weekly'},
    {key:'2', value:'Monthly'},
    {key:'3', value:'Annually'},
  ]

  const rate = [
    {key:'0', value:'None'},
    {key:'1', value:'AK'},
    {key:'2', value:'AL'},
    {key:'3', value:'IL'},
  ]

  const type = [
    {key:'0', value:'expense'},
    {key:'1', value:'income'},
  ]




  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      category: inputs.category.value,
      plan: inputs.plan.value,
      rate: inputs.rate.value,
      type: inputs.type.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const categoryIsValid = expenseData.category.trim().length > 0;
    const planIsValid = expenseData.plan.trim().length > 0;
    const rateIsValid = expenseData.rate.trim().length > 0;
    const typeIsValid = expenseData.type.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid || !categoryIsValid 
      || !planIsValid || !rateIsValid || !typeIsValid) {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          category: {
            value: curInputs.category.value,
            isValid: categoryIsValid,
          },
          plan: {
            value: curInputs.plan.value,
            isValid: planIsValid,
          },
          rate: {
            value: curInputs.rate.value,
            isValid: rateIsValid,
          },
          type: {
            value: curInputs.type.value,
            isValid: typeIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid ||
    !inputs.category.isValid ||
    !inputs.plan.isValid ||
    !inputs.rate.isValid ||
    !inputs.type.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Expense  |  Income</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />

      <Text style={{color:"white", margin:4}}>Category</Text>
      <SelectList 
        setSelected={(val) => inputChangedHandler('category', val)} 
        data={category} 
        save="value" 
        placeholder={inputs.category.value}
        boxStyles={{borderColor: "white"}}
        inputStyles={{color:"white"}}
        dropdownTextStyles={{color:"white"}}
        dropdownStyles={{borderColor:"#99e2b4"}}
      />
      <Text style={{color:"white", margin:4}}>Plan</Text>
      <SelectList 
        setSelected={(val) => inputChangedHandler('plan', val)} 
        data={plan} 
        save="value"
        placeholder={inputs.plan.value}
        boxStyles={{borderColor: "white"}}
        inputStyles={{color:"white"}}
        dropdownTextStyles={{color:"white"}}
        dropdownStyles={{borderColor:"#99e2b4"}}
      />
      <Text style={{color:"white", margin:4}}>Rate</Text>
      <SelectList 
        setSelected={(val) => inputChangedHandler('rate', val)} 
        data={rate} 
        save="value"
        placeholder={inputs.rate.value}
        boxStyles={{borderColor: "white"}}
        inputStyles={{color:"white"}}
        dropdownTextStyles={{color:"white"}}
        dropdownStyles={{borderColor:"#99e2b4"}}
      />
      <Text style={{color:"white", margin:4}}>Type</Text>
      <SelectList 
        setSelected={(val) => inputChangedHandler('type', val)} 
        data={type} 
        save="value"
        placeholder={inputs.type.value}
        boxStyles={{borderColor: "white"}}
        inputStyles={{color:"white"}}
        dropdownTextStyles={{color:"white"}}
        dropdownStyles={{borderColor:"#99e2b4"}}
      />

      
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values
        </Text>
      )}
      <View style={styles.buttons}>
        <MyButton style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </MyButton>
        <MyButton style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </MyButton>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: "#ffcec9",
    margin: 8,
    fontSize: 16
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginTop: 12,
    
  },
});