const canvas = document.getElementById('canvas1');
const ctx= canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray= [];
let adjustX = 5;
let adjustY = 5;

//Mouse hareketleri
const mouse = {
    x: null,
    y: null,
    radius: 450
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x ; //- (window.innerWidth * 33)/100;
    mouse.y = event.y ; //- (window.innerHeight * 33)/100;  bu hareketlerle de canvasın boyutunu ve pozisyonunu değiştirdiğinde mouse optimizasyonunu sağlayabilriz
    mouse.radius = 50;
    // console.log(mouse.x,mouse.y);
})
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

ctx.fillStyle='White';
ctx.font = '15px Giulia';
ctx.fillText('HOŞGELDİNİZ',10,23);
const textCoordinates = ctx.getImageData(0,0,canvas.width,canvas.height);

class Particle {//parçacıklar yani dotların özellikleri, her bir particle çağırdığımızda x ve y değerleri alınıp uygun şekilde bir dot oluşturuluyor
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 1;
        this.baseX = this.x;//her dot için ilk verilen x konumunu tutuyor.
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5;//dotların ağırlığını belirliyoruz. her dotun kendine has bir ağırlığı oluyor-1 ile 30 arasında-
        //ve sonrasında bu ağırlığı gidip directionX ve directionY değişkenlerinde kullanarak hareket hızlarında
        //ağırlıklarının da etkisi olduğunu görüyoruz. daha gerçekçi bir grünüm kazanıyor.
        //density arttığında ağırlık artıyor anlamına geliyor gibi görünse de ağırlığı directionX ve Y ile doğru orantılı yaptığımız için dotların ağırlıkları arttıkça hızları da artacaktır.

    }
    draw(){//bu fonksiyon dotları çiziyor
        ctx.fillStyle= getRandomColor();
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
        let force = (maxDistance - distance) /maxDistance;//burada ise sayıyı yani force değerini maxistance'a bağlı olarak 0 ile 1 arasına koyuyoruz.çekim kuvveti yani force,dot mouse pointerinden ne kadar uzaksa o kadar az oluyor.
        let directionX = forceDirectionX * force * this.density;//bu kısımlarda da dotun konumunun ve ağırlığının dotun hızını belirlemesini sağlıyoruz.
        let directionY = forceDirectionY * force * this.density;
        if(distance < mouse.radius){//farenin etrafında dot olup olmadığına bakıyor her bir dot için
            this.x -= directionX * 0.8;//hareketin hızını çarpım işlemiyle artırıp azaltabiliriz
            this.y -= directionY * 0.8;//+ işlemi ise dotun fare imlecine yaklaştığını gösteriyor
            
        }
        else {
            if(this.x !== this.baseX){// eğer dotun x konumu constructorda belirlenen dotun doğma nktasına eşit değilse
                let dx = this.x - this.baseX;//şimdiki konumuyla doğduğu konumu arasındaki farkı bul
                this.x -= dx/10;//ve şimdiki konumu ve doğduğu konumu eşit olana kadar yavaş yavaş yerine getir bölme işlemi ile dotların geri dönme hızını kontrol edebiliriz
            }
            if (this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10; 
            }
        }
    }
}
function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height;y < y2; y++){//burada kullanılan height width ve data özellikleri, getimagedata metodunun sağladığı ayrıcalıklardandır.
        for (let x = 0 , x2 = textCoordinates.width;x < x2; x++){
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){//data özelliği 40000 boyutlu bir dizi,  Uint8ClampedArray deniyor.     !!!!YAZARKEN KEŞFETTİĞİM BİR HATAMDA EĞER  < 128 YAPARSAK HERYERE DOT ÇİZİP HARFİ BOŞ BIRAKIYOR EĞER > 128 YAPARSAK SADECE HARFİ ÇİZİYOR.!!!
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 5,positionY * 5 ));//dotlar arasındaki boşlukları bu çarpma işemiyle düzenleyebiliriz
            }

        }
    }



    // for (let i = 0; i < 1000; i++) {
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height;
    //     particleArray.push(new Particle(x,y));
        //1000 adet rastgele dot oluşturmamızı sağlıyor.
    // }
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