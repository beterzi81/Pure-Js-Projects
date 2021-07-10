const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const edge = 40;
let drawing = false;
const mouse ={
    x:null,
    y:null
}
function getRandomColor() {//rastgele bir renk kodu geriye döndüren bir fonksiyon
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



window.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;

})

class Root {
    constructor(x,y,color,centerX,centerY){//burada iki farklı x ve y alınmasının sebebi de baştaki x ve y'lerin, parçacıkların anlık olarak yerini tutacak olması.centerX ve centerY ise sürekli parçacığın oluşturulduğu koordinatları tutmalı
    this.x = x;
    this.y = y;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.centerX = centerX;
    this.centerY = centerY;
}

draw(){
    this.speedX += (Math.random() - 0.5) / 2; //bu kısımdaki random, her parçacığın hızının farklı olmasını sağlayacak
    this.speedY +=  (Math.random() - 0.5) / 2;// -0.5 ise negatif hızlı yani ters yönlü parçacıklar da olmasını sağlayacak
    this.x += this.speedX;//parçacıkları hareket ettiriyoruz. eğer yukarıdaki işlemlerdeki negatiflik-pozitiflik durumu burada etkisini gösteriyor ve parçacığın yönünü belirliyor.
    this.y += this.speedY;

    const distanceX = this.x - this.centerX;//burada anlamamız gereken şey parçacığın tek yönlü olmamasından kaynaklı uzaklığın hesaplanma işleminin,
    const distanceY = this.y - this.centerY;// bir üçgen gibi düşünülüp x ve y düzleminde teker teker uzaklığının hesaplanıp, tam uzaklığını bulmak için
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);//hipotenüs teoremini kullanmamız
    const radius = (-distance / edge + 1) * edge / 10;//distance değeri 0'dan başlayarak artacak, ve bizim belirlediğimiz edge değerine gelince radiusun değeri 0 olacak.Yani sonuç olarak parçacıkların gidebilecekleri maksimum uzaklığı belirlemiş olacağız.
//burada farkettiğim bir şey var.bu kod satırı sayesinde, başlangıç noktasına doğru yaklaşan parçalar, aynı zamanda da bu denklemden dolay bir boyut artışı yaşıyorlar(radius artışı)
    if (radius > 0) {//radius değişkenine bağlı bir çizim kodu yazıyoruz
        console.log(1);
        requestAnimationFrame(this.draw.bind(this));//dışarıdan bir fonksiyon ile draw fonksiyonunu çağırdığımızda bile bu this.draw olayını göremeyebiliyor. bu yüzden this kısmını buradaki this ile bağladık ve artık her yerden bu draw metotuna sorunsuzca erişebiliyoruz
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);//dairemizi çiziyoruz.
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.strokeStyle = 'red';//buradan parçacığın kabuk rengini değiştirebilirsiniz, en çok görünecek renk budur
        ctx.stroke();
    }

}
}

function branchOut(){
    const centerX = mouse.x;//hareketlerin başladığı yerlerin, for döngüsü dışında bir ataması yapılıyor.
    const centerY = mouse.y;
    for(let i = 0; i < 4; i++){
        let rainbow = getRandomColor();
        const root = new Root(mouse.x,mouse.y,rainbow,centerX,centerY);
        root.draw();//yukarıda oluşturduğumuz Root tipli root değişkenimizin draw metotunu çağırıyoruz.

    }
}

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function() {//fareyi oynattığımızda gerçekleşecek olayları
    if (drawing) {
    //ctx.fillStyle = 'rgba(255,255,225,0.005)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    //eğer arkaplanın veya çizdiğimiz şeylerin, başka şeyler çizdikçe kaybolmasını istiyorsanız açabilirsiniz
    branchOut();   
    }

});

window.addEventListener('mousedown', function(){
    drawing = true;
});

window.addEventListener('mouseup' , function(){
    drawing = false;
})
