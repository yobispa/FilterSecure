fetch("https://nl.aliexpress.com/item/1005004998757903.html")                             
.then (res => res.json())
.then (data => {
    console.log(data)
})