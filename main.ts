namespace SpriteKind {
    export const Nav = SpriteKind.create()
    export const Mushroom = SpriteKind.create()
    export const Obstacle = SpriteKind.create()
    export const usedsign = SpriteKind.create()
    export const Badfood = SpriteKind.create()
    export const baddrink = SpriteKind.create()
    export const save = SpriteKind.create()
    export const sign = SpriteKind.create()
}
namespace StatusBarKind {
    export const hunger = StatusBarKind.create()
    export const Thirst = StatusBarKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu_off) {
        if (Main_Character.vy == 0) {
            Main_Character.vy = -175
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Obstacle, function (sprite, otherSprite) {
    dead = 1
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`dirty_water`, function (sprite, location) {
    if (controller.B.isPressed()) {
        Thirst += -10
        Thirst_Bar.value += -25
        hunger += -10
        Hunger_Bar.value += -25
        pause(100)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu_off) {
        Main_Character.vx += -100
        animation.runImageAnimation(
        Main_Character,
        assets.animation`myAnim0`,
        100,
        true
        )
        pause(50)
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (menu_off) {
        Main_Character.vx = 0
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (menu_off) {
        Main_Character.vx = 0
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu_off) {
        Main_Character.vx += 100
        animation.runImageAnimation(
        Main_Character,
        assets.animation`myAnim1`,
        100,
        true
        )
        pause(50)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Badfood, function (sprite, otherSprite) {
    hunger += -20
    Hunger_Bar.value += -20
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`clean_water`, function (sprite, location) {
    if (controller.B.isPressed()) {
        Thirst += 10
        Thirst_Bar.value += 15
        pause(100)
    }
})
sprites.onOverlap(SpriteKind.sign, SpriteKind.Player, function (sprite, otherSprite) {
    if (used == 0) {
        Signpost1 = sprites.create(assets.image`myImage1`, SpriteKind.sign)
        game.showLongText("Red capped mushrooms are dangererous, dont eat them", DialogLayout.Bottom)
        used = 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    hunger += 10
    Hunger_Bar.value += 15
    sprites.destroy(otherSprite)
})
function start () {
    scene.setBackgroundImage(img`
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
        `)
    Main_Character = sprites.create(img`
        . f f f . f f f f f . . . . 
        f f f f f c c c c f f . . . 
        f f f f b c c c c c c f . . 
        f f f c 3 c c c c c c f . . 
        . f 3 3 c c c c c c c c f . 
        . f f f c c c c c 4 c c f . 
        . f f f f c c c 4 4 e f f . 
        . f f 4 4 f b f 4 4 e f f . 
        . . f 4 d 4 1 f d d f f . . 
        . . f f f 4 d d d d f . . . 
        . . . f e e 4 4 4 e f . . . 
        . . . 4 d d e 3 3 3 f . . . 
        . . . e d d e 3 3 3 f . . . 
        . . . f e e f 6 6 6 f . . . 
        . . . . f f f f f f . . . . 
        . . . . . f f f . . . . . . 
        `, SpriteKind.Player)
    tiles.setCurrentTilemap(tilemap`level0`)
    Main_Character.ay = 350
    scene.cameraFollowSprite(Main_Character)
    for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
        Mushroom = sprites.create(assets.image`myImage2`, SpriteKind.Food)
        tiles.placeOnTile(Mushroom, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        Mushroom = sprites.create(assets.image`myImage3`, SpriteKind.Badfood)
        tiles.placeOnTile(Mushroom, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        water = sprites.create(img`
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            `, SpriteKind.Obstacle)
        animation.runImageAnimation(
        water,
        [img`
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 9 1 1 1 1 1 1 1 1 1 
            9 1 1 1 9 9 9 9 9 1 1 9 9 1 1 1 
            9 9 1 9 9 6 9 9 9 1 9 9 9 9 1 9 
            6 9 9 9 6 6 6 6 9 9 9 6 6 9 9 9 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 8 6 6 6 8 6 6 6 6 6 6 
            8 8 6 8 8 8 8 6 8 8 8 8 6 6 6 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            `,img`
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 9 1 1 1 1 1 1 1 1 1 
            9 1 1 1 9 9 9 9 9 1 1 9 9 1 1 1 
            9 9 1 9 9 9 9 9 9 1 9 9 9 9 1 9 
            9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
            9 9 9 9 6 6 9 9 6 9 9 6 6 9 9 9 
            9 6 6 6 6 6 6 6 6 6 6 6 6 6 9 6 
            6 6 6 6 6 6 6 6 6 6 6 8 6 6 6 6 
            8 6 6 8 8 8 6 6 8 6 8 8 8 8 6 8 
            8 8 8 8 8 8 6 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
            `],
        500,
        true
        )
        tiles.placeOnTile(water, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        Hunger_Bar = statusbars.create(30, 6, StatusBarKind.hunger)
        Thirst_Bar = statusbars.create(30, 6, StatusBarKind.Thirst)
        Thirst_Bar.setColor(8, 1)
        Hunger_Bar.setColor(7, 1)
        Hunger_Bar.positionDirection(CollisionDirection.Top)
        Thirst_Bar.positionDirection(CollisionDirection.Top)
        Hunger_Bar.setOffsetPadding(-60, 5)
        Thirst_Bar.setOffsetPadding(-20, 5)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        dirty_water = sprites.create(img`
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
            `, SpriteKind.Obstacle)
        tiles.placeOnTile(dirty_water, value)
        animation.runImageAnimation(
        dirty_water,
        assets.animation`myAnim2`,
        500,
        true
        )
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        Signpost1 = sprites.create(assets.image`myImage1`, SpriteKind.sign)
        tiles.placeOnTile(Signpost1, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    used = 0
}
let Thirst_Logic = 0
let hunger_logic = 0
let dirty_water: Sprite = null
let water: Sprite = null
let Mushroom: Sprite = null
let Signpost1: Sprite = null
let used = 0
let Hunger_Bar: StatusBarSprite = null
let hunger = 0
let Thirst_Bar: StatusBarSprite = null
let Thirst = 0
let Main_Character: Sprite = null
let menu_off = false
let dead = 0
dead = 0
scene.setBackgroundImage(assets.image`myImage`)
let myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("New Game")
)
myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Background, 11)
menu_off = false
myMenu.left = 8
myMenu.bottom = 90
myMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
    if (menu_off == false) {
        start()
        menu_off = true
        myMenu.setFlag(SpriteFlag.Invisible, true)
    }
})
if (dead == 1) {
    scene.setBackgroundImage(assets.image`myImage`)
    myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("New Game")
    )
    myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Background, 11)
    menu_off = false
    myMenu.left = 8
    myMenu.bottom = 90
    myMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
        if (menu_off == false) {
            start()
            menu_off = true
            myMenu.setFlag(SpriteFlag.Invisible, true)
        }
    })
    dead = 0
    game.reset()
}
forever(function () {
    if (menu_off) {
        pause(2000)
        hunger_logic = randint(0, 10)
        if (hunger_logic <= 4) {
            Hunger_Bar.value += -10
        }
    }
})
forever(function () {
    if (menu_off) {
        pause(2000)
        Thirst_Logic = randint(0, 10)
        if (Thirst_Logic <= 4) {
            Thirst_Bar.value += -10
        }
    }
})
forever(function () {
    if (menu_off) {
        if (Main_Character.vx == 0) {
            animation.stopAnimation(animation.AnimationTypes.All, Main_Character)
        }
    }
})
