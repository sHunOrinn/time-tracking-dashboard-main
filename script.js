let data = [];
let timeFrame = 'daily';

const dailyBtn = document.getElementById('daily');
const weeklyBtn = document.getElementById('weekly');
const monthlyBtn = document.getElementById('monthly');
const buttons = [dailyBtn, weeklyBtn, monthlyBtn];

const hours = document.getElementsByClassName('time');
const previous_hours = document.getElementsByClassName('previous-time');

function renderData() {
    for (let i = 0; i < data.length; i++) {
        // Cập nhật số giờ hiện tại
        hours[i].textContent = data[i].timeframes[timeFrame].current
            + (data[i].timeframes[timeFrame].current <= 1 ? 'hr' : 'hrs');
        // Cập nhật số giờ trước đó
        let label = '';
        if (timeFrame === 'daily') label = 'Yesterday';
        else if (timeFrame === 'weekly') label = 'Last Week';
        else label = 'Last Month';
        previous_hours[i].textContent = `${label} - ${data[i].timeframes[timeFrame]
            .previous}${data[i].timeframes[timeFrame].previous <= 1 ? 'hr' : 'hrs'}`;
    }
}

function setActive(btn) {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

buttons.forEach(btn => {
    btn.addEventListener('click', function () {
        timeFrame = btn.dataset.timeframe;
        setActive(btn);
        renderData();
        console.log(timeFrame);
    });
});

fetch('./data.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        renderData();
        setActive(weeklyBtn); // Mặc định chọn Weekly
        timeFrame = 'weekly';
        renderData();
    });
