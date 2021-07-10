controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 5 5 5 . . . 
        5 5 5 5 5 5 5 5 5 5 4 4 5 5 . . 
        . . . . . . 5 5 5 5 4 5 5 5 . . 
        . . . . . . . . . 5 5 5 5 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, spaceShip, 200, 0)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(100)
    music.zapped.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 200)
    music.smallCrash.play()
    scene.cameraShake(4, 200)
})
let enemyShip: Sprite = null
let projectile: Sprite = null
let spaceShip: Sprite = null
effects.starField.startScreenEffect()
spaceShip = sprites.create(img`
    1 f f f f f f f f f f f f f f f 
    f 1 f f f f f 1 f 1 f f f f f f 
    4 4 4 6 f f f f 1 f f f f f f f 
    f 6 6 6 6 f f 1 f 1 f f f 1 f f 
    f 1 f 1 6 6 6 f f f f f f f f f 
    f f 1 f 6 6 6 6 f f f f f f f f 
    f f f 1 f 6 6 6 6 6 6 f f f f f 
    f 1 f f f a 8 8 8 8 8 8 8 8 f f 
    f f f f a a a 6 6 6 6 6 6 6 6 6 
    f f f f a a a 6 6 6 6 6 6 6 6 f 
    f f f f f a 8 8 8 8 8 8 8 8 f f 
    f f 6 6 6 6 6 6 6 6 6 f f f f f 
    f 6 6 6 6 6 f f f f f f f f f f 
    4 4 4 f f f f f f f f f f f f f 
    f f f f 1 f 1 f f f f f 1 f f f 
    f f f f f 1 f f f f f f f f f f 
    `, SpriteKind.Player)
controller.moveSprite(spaceShip)
spaceShip.setStayInScreen(true)
info.setLife(5)
game.onUpdateInterval(2000, function () {
    enemyShip = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........fffff.........
        ........ff1111bff.......
        .......fb1111111bf......
        .......f111111111f......
        ......fd1111111ffff.....
        ......fd111dd1c111bf....
        ......fb11fcdf1b1bff....
        ......f11111bfbfbff.....
        ......f1b1bdfcffff......
        ......fbfbfcfcccf.......
        ......ffffffffff........
        .........ffffff.........
        .........ffffff.........
        .........fffffff..f.....
        ..........fffffffff.....
        ...........fffffff......
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = -30
    enemyShip.y = randint(20, scene.screenHeight() - 4)
})
