# Maxed Out Gear Command (Hardcore Edition)
# Run this function to get fully enchanted end-game gear
# Usage: /function giveallgear

# Clear player inventory first
clear @s

# ===== ARMOR =====

# Helmet
give @s netherite_helmet 1

# Chestplate
give @s netherite_chestplate 1

# Leggings
give @s netherite_leggings 1

# Boots
give @s netherite_boots 1

# ===== WEAPONS =====

# Sword
give @s netherite_sword 1

# Spear 1
give @s netherite_spear 1

# Spear 2
give @s netherite_spear 1

# Bow
give @s bow 1

# ===== CONSUMABLES & UTILITIES =====

# Golden Apples x64
give @s golden_apple 64

# Carrots x64
give @s carrot 64

# Splash Potion of Strength x1 (potions don't stack in Bedrock)
give @s splash_potion 1

# Splash Potion of Speed x1
give @s splash_potion 1

# Potion of Slow Falling x1
give @s potion 1

# Splash Potion of Healing x1
give @s splash_potion 1

# Ender Pearls x64 (Stack 1)
give @s ender_pearl 64

# Ender Pearls x64 (Stack 2)
give @s ender_pearl 64

# Ender Pearls x64 (Stack 3)
give @s ender_pearl 64

# Arrow x64
give @s arrow 64

# Totems of Undying x5
give @s totem_of_undying 5

# Ender Chest x1
give @s ender_chest 1

# ===== DRAGON SLAYING UTILITIES =====

# Blocks for building (Obsidian for safety)
give @s obsidian 32

# Healing Potions for backup x1
give @s potion 1

# Milk bucket for potion effects
give @s milk_bucket 4

# Pumpkin for enderman protection
give @s pumpkin 1

# Success message
tellraw @s {"text":"✓ Maxed Out Gear Pack loaded! Ready to slay the Ender Dragon on Hardcore!","color":"green"}
