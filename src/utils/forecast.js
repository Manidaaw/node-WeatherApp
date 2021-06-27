const request=require('request')

const forecast=(latitude,longitude,callback)=> {
 const url='http://api.weatherstack.com/current?access_key=c8ef7d0c4dfecf548b55bfad2121671c&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'';
request({url,json:true},(error,response)=> {
 if(error) {
  callback('Unable to connect to weather service',undefined)
 }
 else if(response.body.error) {
  callback('Unable to find location',undefined)
 }
 else {
  callback(undefined,response.body.current.temperature)
 }
})
}

module.exports=forecast