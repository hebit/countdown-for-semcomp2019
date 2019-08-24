let days = 40;
let hours = 10;
let minutes = 25;
let seconds = 36;

const daysBlock = document.querySelector('.days');
const hoursBlock = document.querySelector('.hours');
const minutesBlock = document.querySelector('.minutes');
const secondsBlock = document.querySelector('.seconds');

function flip(item, i, j = 1){
	for (j = j; j >= i; j--) {
		item[j].style.transition = "transform 0.8s cubic-bezier(.77,0,.18,1) 0s, opacity 0.3s ease 0.4s, box-shadow 0.8s ease 0s";
		item[j].style.transform = "rotateX(-180deg)";
		item[j].style.opacity = 0;
		item[j].style.boxShadow = "0 2px 10px rgba(0,0,0,0.0)";
	}
}

function reset(item, i){
	for (var j = 1 ; j >= i; j--) {
		item[j].style.transition = "box-shadow 0.2s ease 0s";
		item[j].style.transform = "rotateX(0)";
		item[j].style.opacity = 1;
		item[j].style.boxShadow = "0 2px 10px rgba(0,0,0,0.6)";
	}
}

function flipByTime(target, time){
	const flipAbs = target.querySelectorAll('.abs');

	let lastValue = [];
	lastValue[0] = parseInt(Array.from(flipAbs)[0].querySelector('span').innerHTML);
	lastValue[1] = parseInt(Array.from(flipAbs)[1].querySelector('span').innerHTML);
	let i = lastValue[0] == parseInt(time/10) ? 1 : 0;
	i = lastValue[1] == (time % 10) ? 2 : i;

	flip(flipAbs,i);
	
	setTimeout(
		() =>{
			if(i != 2){
				setTimeout(
					() => {
						reset(flipAbs, i);

						let pos = 0;
						Array.from(flipAbs).forEach(
							(item)=> {
								digit = pos == 0 ? parseInt(time/10) : time % 10;
								item.innerHTML = "<span>" + digit + "</span>";
								pos++;
							}

						);
					}
				,450);
			}
		}
	,400);
	setTimeout(
		() => {
			fillStaticShapes(target, time, i)
		}
	,400)
}



function updateDataStructure(){
	var semcompDate = new Date("Out 21, 2019, 14:00:00").getTime();
	var now = new Date().getTime();
	var timeLeft = semcompDate - now;
	timeLeft = getFormatedTime(timeLeft);
	
	days = timeLeft.days;
	hours = timeLeft.hours;
	minutes = timeLeft.minutes;
	seconds = timeLeft.seconds;
	response = days >= 0 ? true : false;
	return response;
}

function getFormatedTime(timeLeft){
	const daySet = 24 * 60 * 60 * 1000;
	const hourSet = 60 * 60 * 1000;
	const minuteSet = 60 * 1000;
	const secondSet = 1000;
	timeLeft = {
		"days": Math.floor(timeLeft / (daySet)),
		"hours": Math.floor((timeLeft % daySet) / (hourSet)),
		"minutes": Math.floor((timeLeft % hourSet) / (minuteSet)),
		"seconds": Math.floor((timeLeft % minuteSet) / (secondSet))
	}
	// console.log(timeLeft);
	return timeLeft;
}

function fillStaticShapes(target,time,i){
	const staticShapes = target.querySelectorAll('.flip-shape:not(.abs)');
	const digits = [parseInt(time/10), time%10];
	
	for(var j  = 1; j >= i; j--){
		Array.from(staticShapes)[j * 2].innerHTML = "<span>" + digits[j] + "</span>";
		Array.from(staticShapes)[j * 2 + 1].innerHTML = "<span>" + digits[j] + "</span>";
	}
}

function finishCount(count){
	const countBlocks = document.querySelectorAll('.count-block');
	let msg = ['É','H','O','J','E','!','!','!'];
	let pos = 0;

	const flipAbs = document.querySelectorAll('.abs');

	flip(flipAbs,0,7);

	Array.from(countBlocks).forEach(
		(block) => {
			block.style.width = "auto";
			const staticShapes = block.querySelectorAll('.flip-shape');
			
			Array.from(staticShapes).forEach(
				(shape) => {

					shape.innerHTML = "<span>" + msg[pos] + "</span>";
				}
			);
			pos++;
		}
	);
	
	clearInterval(count);

}

function startCount(){
	var count = setInterval(
		() => {
			if(updateDataStructure()){
				flipByTime(secondsBlock, seconds);
				flipByTime(minutesBlock, minutes);
				flipByTime(hoursBlock, hours);
				flipByTime(daysBlock, days);
			}else{
				finishCount(count);
				
			}
		}
	, 1000)
}

startCount();
