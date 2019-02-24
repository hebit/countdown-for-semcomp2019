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
		item[j].style.transition = "transform 0.8s cubic-bezier(.77,0,.18,1) 0s, opacity 0.3s ease 0.4s";
		item[j].style.transform = "rotateX(-180deg)";
		item[j].style.opacity = 0;	
	}
	
}

function reset(item, i){
	for (var j = 1 ; j >= i; j--) {
		item[j].style.transition = "none";
		item[j].style.transform = "rotateX(0)";
		item[j].style.opacity = 1;
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
			flipAbs.innerHTML = "";
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
	,400);
	setTimeout(
		() => {
			fillStaticShapes(target, time)
		}
	,400)
}



function updateDataStructure(){
	var semcompDate = new Date("Mar 21, 2019, 14:00:00").getTime();
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

function fillStaticShapes(target,time){
	const staticShapes = target.querySelectorAll('.flip-shape:not(.abs)');

	Array.from(staticShapes)[0].innerHTML = "<span>" + parseInt(time/10) + "</span>";
	Array.from(staticShapes)[1].innerHTML = "<span>" + parseInt(time/10) + "</span>";
	Array.from(staticShapes)[2].innerHTML = "<span>" + time%10 + "</span>";
	Array.from(staticShapes)[3].innerHTML = "<span>" + time%10 + "</span>";

}

function finishCount(count){
	const countBlocks = document.querySelectorAll('.count-block');
	let msg = ['S','E','M','C','O','M','P','!'];
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