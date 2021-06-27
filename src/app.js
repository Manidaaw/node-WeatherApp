const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const express=require('express')
const path=require('path')
const hbs=require('hbs')

const app=express()
const port=process.env.PORT || 3000

const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=> {
 res.render('index',{
  title:'Weather App',
  name:'Mani'
 })
})
app.get('/about',(req,res)=> {
 res.render('about',{
  title:'About Me',
  name:'Mani'
 })
})
app.get('/help',(req,res)=> {
 res.render('help',{
   title:'Help',
  name:'Mani',
  help:'Help!!!'
 })
})

app.get('/weather',(req,res)=> {
  if(!req.query.address) {
    return res.send({
      error:'You must provide an address'
    })
  }

   geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
 if(error) {
  return res.send({error})
 }

 forecast(latitude,longitude,(error,{temperature,feelslike,humidity,is_day}={})=> {
  if(error) {
  return res.send({error})
 }
 res.send({
   Temperature:temperature,
   location,
   humidity,
   feelslike,
   is_day,
   address:req.query.address
 })
})
})
})

app.get('/products',(req,res)=> {
  if(!req.query.search) {
    return res.send({
      error:'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res)=> {
 res.render('404',{
  title:'404',
  name:'Mani',
  errorMessage:'Help article not found'
 })
})
app.get('*',(req,res)=> {
 res.render('404',{
  title:'404',
  name:'Mani',
  errorMessage:'Page not found'
 })
})

app.listen(port,()=> {
 console.log('Server is up on port '+port)
})