import React, { useState, useEffect } from 'react'
import addNew from './components/AddNew'
import Person from './components/Person'
import axios from 'axios'





const App = (props) => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  
  const rows = () => persons.filter(person =>{
    console.log(person.name.indexOf(newFilter))
    return person.name.indexOf(newFilter) >= 0
   
  })
  
  //.map(person => <li key = {person.name} >{person.name} {person.number}</li>)
  .map(person => 
    <Person
    
    key = {person.name}
    person = {person}
    />
    
    )

   


  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNoteChangeNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNoteChangeFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  
  const addNew = (event) => {
    event.preventDefault()
    
    if(persons.some(person => person.name === `${newName}`))
    {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
     
      
    }else{
      const noteObject = {
        name: newName,
        number: newNumber
      }


      axios
        .post('http://localhost:3001/persons', noteObject)
        .then(response =>{
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

      /*
     


      
      setPersons(persons.concat(noteObject))
      console.log('Button clicked', event.target)
      */
  
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        
          <form>
          Filter shown with: <input value = {newFilter}
          onChange = {handleNoteChangeFilter}
          />
          </form>
        
        </div>
      <h2>Add new</h2>
        <div>
          <form onSubmit = {addNew}>
          Name: <input value = {newName}
          onChange = {handleNoteChange}
          />
          </form>

        </div>
        <div>
          <form onSubmit = {addNew}>
          Phone number: <input value = {newNumber}
          onChange = {handleNoteChangeNumber}
          />
          </form>

        </div>
        <div>
        <button type="submit" onClick={addNew}>add</button>
        </div>
        <div>
          
        </div>
      <h2>Numbers</h2>
    <ul>
  
    {rows()}
    </ul>
   
    </div>
  )

}

export default App