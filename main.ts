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
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    status.spriteAttachedTo().destroy()
    status.destroy(effects.disintegrate, 200)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -35
    info.changeScoreBy(100)
    music.zapped.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.disintegrate, 200)
    music.smallCrash.play()
    scene.cameraShake(4, 200)
})
let statusbar: StatusBarSprite = null
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
let enemySpeed = 10
let enemySpawnTime = 2000
game.onUpdateInterval(5000, function () {
    enemySpeed += 5
    enemySpeed = Math.min(enemySpeed, 50)
    enemySpawnTime += -500
    enemySpawnTime = Math.max(enemySpawnTime, 500)
})
forever(function () {
    enemyShip = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f1111111df.......
        ......fd1111111ddf......
        ......fd111111dddf......
        ......fd111ddddddf......
        ......fd1dfbddddbf......
        ......fbddfcdbbbcf......
        .......f11111bbcf.......
        .......f1b1fffff........
        .......fbfc111bf........
        ........ff1b1bff........
        .........fbfbfff.f......
        ..........ffffffff......
        ............fffff.......
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = 0 - enemySpeed
    enemyShip.y = randint(10, scene.screenHeight() - 4)
    statusbar = statusbars.create(15, 4, StatusBarKind.EnemyHealth)
    statusbar.setColor(4, 2)
    statusbar.setLabel("HP")
    statusbar.attachToSprite(enemyShip)
    pause(enemySpawnTime)
})
