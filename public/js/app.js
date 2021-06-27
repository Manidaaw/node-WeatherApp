console.log('Client side javascript is loaded!')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.getElementById('message-1')
const messageTwo=document.getElementById('message-2')

weatherForm.addEventListener('submit',(e)=> {
 e.preventDefault()
 const location=search.value
 messageOne.textContent='loading...'
 messageTwo.textContent=''
 fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=> {
 response.json().then((data)=> {
  if(data.error) {
   messageOne.textContent=data.error
   return console.log(data.error)
  }
  console.log(data)
  messageOne.textContent='Temperature is: '+data.Temperature
  messageTwo.textContent=data.location
 })
})
})