let container = document.querySelector('.container');
let btn =document.querySelector('.start_btn');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');

btn.onclick = function() {
    let score = 0;
    let time = 15;
    container.innerHTML = "";

    let interval = setInterval(function showTarget(){

        let target = document.createElement('img');
        target.id="target";
        target.src="../images/silly.png";
        container.append(target);
        target.style.top = Math.random() * (500 - target.offsetHeight) + 'px';
        target.style.left = Math.random() * (600 - target.offsetWidth) + 'px';

        setTimeout(function() {
            target.remove();}, 500)

            target.onclick = function(){
                score += 1;
                target.style.display = 'none'
            }
            time -= 1;

            scoreContainer.innerHTML = `Score : ${score}`
            timeContainer.innerHTML = `Temps : ${time}`

            if(time === 0){
                clearInterval(interval);
                container.innerHTML = "Game over"
            }
    }, 1000);
}