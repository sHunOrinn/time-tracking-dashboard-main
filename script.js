fetch('./data.json').then((response) => {
    if(!response.ok) return console.log('Network response was not ok');
    console.log(response);
    console.log(response.status);
    console.log(response.statusText);
    return response.json();
}).then((data) => {
    console.log(data);
});