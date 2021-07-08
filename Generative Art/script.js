const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const edge = 80;

const mouse ={
    x:null,
    y:null
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
}


}
