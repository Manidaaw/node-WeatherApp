console.log('Client side javascript is loaded!')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.getElementById('message-1')
const messageTwo=document.getElementById('message-2')
const messageThree=document.getElementById('message-3')
const messageFour=document.getElementById('message-4')
const messageFive=document.getElementById('message-5')

weatherForm.addEventListener('submit',(e)=> {
 e.preventDefault()
 const location=search.value
 messageOne.textContent='loading...'
 messageTwo.textContent=''
 fetch('/weather?address='+encodeURIComponent(location)).then((response)=> {
 response.json().then((data)=> {
  if(data.error) {
   messageOne.textContent=data.error
   return console.log(data.error)
  }
  console.log(data)
  messageOne.textContent=''
  messageTwo.textContent='Location is :'+data.location
  messageThree.textContent='Is this day? '+data.is_day
  messageFour.textContent='Temperature is '+data.Temperature+', but it feels like '+data.feelslike
  messageFive.textContent='Humidity is: '+data.humidity })
})
})