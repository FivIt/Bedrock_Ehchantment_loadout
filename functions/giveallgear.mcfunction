# Maxed Out Gear Command ( Dragon Slimming Loadout)
# Run this function to get fully enchanted end-game gear optimized for Ender Dragon fight
# Usage: /function giveallgear

# Clear player inventory first
clear @s

# ===== EQUIPPED SLOTS (Armor + Off-Hand) =====

# Helmet: Netherite with Protection IV, Feather Falling IV
give @s netherite_helmet 1

# Chestplate: Netherite with Protection IV
give @s netherite_chestplate 1

# Leggings: Netherite with Protection IV
give @s netherite_leggings 1

# Boots: Netherite with Protection IV, Feather Falling IV
give @s netherite_boots 1

# ===== HOTBAR (9 Slots) =====

# Slot 1: Netherite Sword (Sharpness V)
give @s netherite_sword 1

# Slot 2: Netherite Pickaxe
give @s netherite_pickaxe 1

# Slot 3: Bow (Power V with Infinity)
give @s bow 1

# Slot 4: Water Bucket (Endermen safety)
give @s water_bucket 1

# Slot 5: Golden Carrots x64 (food + health regen)
give @s golden_carrot 64

# Slot 6: Ender Pearls x64 (void safety)
give @s ender_pearl 64

# Slot 7: Cobblestone x64 (building blocks)
give @s cobblestone 64

# Slot 8: Glass Bottles x16 (for dragon's breath)
give @s glass_bottle 16

# Slot 9: Totem of Undying #2 (quick-swap backup)
give @s totem_of_undying 1

# ===== MAIN INVENTORY (27 Slots) =====

# Boss-Melting Potions (4 Slots)

# Potion of Strength II x2 (Data value 33)
give @s potion 2 33

# Potion of Swiftness II x2 (Data value 16)
give @s potion 2 16

# Extra Life Insurance (5 Slots): 5 Totems of Undying
give @s totem_of_undying 5

# Void & Fall Defense (3 Slots): 3 stacks Ender Pearls
give @s ender_pearl 16
give @s ender_pearl 16
give @s ender_pearl 16

# Extra Food (1 Slot): Golden Carrots backup
give @s golden_carrot 64

# Bridging & Building (10 Slots): 10 stacks Cobblestone
give @s cobblestone 64
give @s cobblestone 64
give @s cobblestone 64
give @s cobblestone 64
give @s cobblestone 64
give @s cobblestone 64
give @s cobblestone 64
give @s cobblestone 64
give @s cobblestone 64
give @s cobblestone 64

# Tower Climbing (2 Slots): 2 stacks Ladders
give @s ladder 64
give @s ladder 64

# Crystal Snipers (2 Slots): 2 stacks Snowballs
give @s snowball 64
give @s snowball 64

# TRIGGER FOR SCRIPT (Crucial!)
tag @s add enchant_me
