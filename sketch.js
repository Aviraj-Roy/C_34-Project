var dog, happyDog, dogImg, happyDogImg, foodS, foodStock;
var database;

function preload()
{
  dogImg = loadImage("Dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup() 
{
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(300, 350, 10, 10);
  dog.scale = 0.14;
  dog.addImage(dogImg);

  foodStock = database.ref('food');//food of databse updates it and helps to keep the stock. there is a error in the documentation of whitehatJr
  foodStock.on("value", readStock);  
}


function draw() 
{  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImg); 
  }

  drawSprites();

  textSize(20);
  fill("white");
  stroke("green"); strokeWeight(20);
  text("Total Stock : "+20,180,200);

  textSize(20);
  fill("white");
  stroke("red"); strokeWeight(20);
  text("Food Remaning : "+foodS,160,260);
  
  textSize(20);
  fill("white");
  stroke("blue"); 
  strokeWeight(20);
  text("Note: Press UP_ARROW Key To Feed Drago Milk",20,100);


}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{
  if(x <= 0)
  {
    x=0;
  }
  else
  {
    x-=1;
  }

  database.ref("/").update({
    food:x
  })
}