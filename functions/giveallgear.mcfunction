# Maxed Out Gear Command (Hardcore Edition)
# Run this function to get fully enchanted end-game gear
# Usage: /function giveallgear

# Clear player inventory first
clear @s

# ===== ARMOR =====

# Helmet: Protection 4, Mending 1, Unbreaking 3, Respiration 3, Aqua Affinity
give @s diamond_helmet 1 0 {"minecraft:enchantments":{"minecraft:protection":4,"minecraft:mending":1,"minecraft:unbreaking":3,"minecraft:respiration":3,"minecraft:aqua_affinity":1},"display":{"Name":"Maxed Helmet"}}

# Chestplate: Protection 4, Mending 1, Unbreaking 3
give @s diamond_chestplate 1 0 {"minecraft:enchantments":{"minecraft:protection":4,"minecraft:mending":1,"minecraft:unbreaking":3},"display":{"Name":"Maxed Chestplate"}}

# Leggings: Protection 4, Mending 1, Unbreaking 3, Swift Sneak 3
give @s diamond_leggings 1 0 {"minecraft:enchantments":{"minecraft:protection":4,"minecraft:mending":1,"minecraft:unbreaking":3,"minecraft:swift_sneak":3},"display":{"Name":"Maxed Leggings"}}

# Boots: Protection 4, Mending 1, Unbreaking 3, Feather Falling 4, Depth Strider 3
give @s diamond_boots 1 0 {"minecraft:enchantments":{"minecraft:protection":4,"minecraft:mending":1,"minecraft:unbreaking":3,"minecraft:feather_falling":4,"minecraft:depth_strider":3},"display":{"Name":"Maxed Boots"}}

# ===== WEAPONS =====

# Sword: Sharpness 5, Mending 1, Unbreaking 3, Looting 3, Fire Aspect 2, Knockback 2
give @s diamond_sword 1 0 {"minecraft:enchantments":{"minecraft:sharpness":5,"minecraft:mending":1,"minecraft:unbreaking":3,"minecraft:looting":3,"minecraft:fire_aspect":2,"minecraft:knockback":2},"display":{"Name":"Maxed Sword"}}

# Spear 1: Sharpness 5, Mending 1, Unbreaking 3, Looting 3, Fire Aspect 2, Knockback 2
give @s diamond_sword 1 0 {"minecraft:enchantments":{"minecraft:sharpness":5,"minecraft:mending":1,"minecraft:unbreaking":3,"minecraft:looting":3,"minecraft:fire_aspect":2,"minecraft:knockback":2},"display":{"Name":"Maxed Spear 1"}}

# Spear 2: Sharpness 5, Mending 1, Unbreaking 3, Looting 3, Fire Aspect 2, Knockback 2, Lunge 3
give @s diamond_sword 1 0 {"minecraft:enchantments":{"minecraft:sharpness":5,"minecraft:mending":1,"minecraft:unbreaking":3,"minecraft:looting":3,"minecraft:fire_aspect":2,"minecraft:knockback":2,"minecraft:lunge":3},"display":{"Name":"Maxed Spear 2"}}

# Bow: Power 5, Unbreaking 3, Flame 1, Infinity 1
give @s bow 1 0 {"minecraft:enchantments":{"minecraft:power":5,"minecraft:unbreaking":3,"minecraft:flame":1,"minecraft:infinity":1},"display":{"Name":"Maxed Bow"}}

# ===== CONSUMABLES & UTILITIES =====

# Golden Apples x64
give @s golden_apple 64

# Carrots x64
give @s carrot 64

# Splash Potion of Strength x16
give @s splash_potion 16 0 {"minecraft:potion_contents":{"potion":"minecraft:strength"}}

# Splash Potion of Speed x16
give @s splash_potion 16 0 {"minecraft:potion_contents":{"potion":"minecraft:swiftness"}}

# Potion of Slow Falling x16
give @s potion 16 0 {"minecraft:potion_contents":{"potion":"minecraft:slow_falling"}}

# Splash Potion of Healing x38
give @s splash_potion 38 0 {"minecraft:potion_contents":{"potion":"minecraft:healing"}}

# Ender Pearls x64 (Stack 1)
give @s ender_pearl 64

# Ender Pearls x64 (Stack 2)
give @s ender_pearl 64

# Ender Pearls x64 (Stack 3)
give @s ender_pearl 64

# Harming Tipped Arrow x1
give @s arrow 1 0 {"minecraft:potion_contents":{"potion":"minecraft:harming"}}

# Totems of Undying x5
give @s totem_of_undying 5

# Ender Chest x1
give @s ender_chest 1

# ===== DRAGON SLAYING UTILITIES =====

# Blocks for building (Obsidian for safety)
give @s obsidian 32

# Healing Potions for backup
give @s potion 16 0 {"minecraft:potion_contents":{"potion":"minecraft:healing"}}

# Milk bucket for potion effects
give @s milk_bucket 4

# Pumpkin for enderman protection
give @s pumpkin 1

# Success message
tellraw @s {"text":"✓ Maxed Out Gear Pack loaded! Ready to slay the Ender Dragon on Hardcore!","color":"green"}
