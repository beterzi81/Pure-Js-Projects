const canvas = document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray= [];

//Mouse hareketleri
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse.x,mouse.y);
})

ctx.fillStyle='White';
ctx.font = '30px Verdana';
ctx.fillText('A',0,40);
const data = ctx.getImageData(0,0,100,100);

class Particle {//parçacıklar yani dotların özellikleri, her bir particle çağırdığımızda x ve y değerleri alınıp uygun şekilde bir dot oluşturuluyor
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;

    }
    draw(){//bu fonksiyon dotları çiziyor
        ctx.fillStyle= 'red';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx/ distance;
        let forceDirectionY = dy/ distance;
        let maxDistance = mouse.radius;
        if(distance < 51){//farenin etrafında dot olup olmadığına bakıyor her bir dot için
            this.x += forceDirectionX * 3;//hareketin hızını çarpım işlemiyle artırıp azaltabiliriz
            this.y += forceDirectionY * 3;//+ işlemi ise dotun fare imlecine yaklaştığını gösteriyor
            
        }
        else {
            this.size = 3;
        }
    }
}
function init() {
    particleArray = [];
    for (let i = 0; i < 500; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x,y));
        
    }
}
init();
console.log(particleArray);
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}
animate();