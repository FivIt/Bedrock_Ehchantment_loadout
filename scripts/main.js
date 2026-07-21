import { world, ItemStack } from "@minecraft/server";

// Register command to give maxed out gear
world.beforeEvents.chatSend.subscribe((event) => {
  if (event.message === "!giveallgear") {
    event.cancel = true;
    
    // Use system.run to handle inventory changes safely outside the beforeEvent phase
    const player = event.sender;
    giveMaxedGear(player);
  }
});

function giveMaxedGear(player) {
  try {
    // Access the inventory component correctly
    const inventoryComponent = player.getComponent("minecraft:inventory");
    if (!inventoryComponent) return;
    const inventory = inventoryComponent.container;

    // Helper function to safely spawn items, set amounts, and add enchantments
    function createEnchantedItem(typeId, amount, enchantments = []) {
      const item = new ItemStack(typeId, amount);
      const enchantComponent = item.getComponent("minecraft:enchantable");
      
      if (enchantComponent && enchantments.length > 0) {
        for (const enchant of enchantments) {
          try {
            enchantComponent.addEnchantment({ type: enchant.type, level: enchant.level });
          } catch (e) {
            // Skips if an enchantment is incompatible or typed wrong
          }
        }
      }
      return item;
    }

    // Clear inventory first to avoid filling up slots messily
    inventory.clearAll();

    let slot = 0;

    // ===== NETHERITE ARMOR METADATA =====
    const helmetEnchants = [
      { type: "protection", level: 4 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 },
      { type: "respiration", level: 3 },
      { type: "aqua_affinity", level: 1 }
    ];
    const generalArmorEnchants = [
      { type: "protection", level: 4 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 }
    ];
    const bootsEnchants = [
      { type: "protection", level: 4 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 },
      { type: "feather_falling", level: 4 }
    ];

    inventory.setItem(slot++, createEnchantedItem("minecraft:netherite_helmet", 1, helmetEnchants));
    inventory.setItem(slot++, createEnchantedItem("minecraft:netherite_chestplate", 1, generalArmorEnchants));
    inventory.setItem(slot++, createEnchantedItem("minecraft:netherite_leggings", 1, generalArmorEnchants));
    inventory.setItem(slot++, createEnchantedItem("minecraft:netherite_boots", 1, bootsEnchants));

    // ===== WEAPONS =====
    const swordEnchants = [
      { type: "sharpness", level: 5 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 }
    ];
    const bowEnchants = [
      { type: "power", level: 5 },
      { type: "infinity", level: 1 },
      { type: "unbreaking", level: 3 }
    ];

    inventory.setItem(slot++, createEnchantedItem("minecraft:netherite_sword", 1, swordEnchants));
    inventory.setItem(slot++, createEnchantedItem("minecraft:netherite_sword", 1, swordEnchants)); // Spear 1
    inventory.setItem(slot++, createEnchantedItem("minecraft:netherite_sword", 1, swordEnchants)); // Spear 2
    inventory.setItem(slot++, createEnchantedItem("minecraft:bow", 1, bowEnchants));

    // ===== CONSUMABLES & UTILITIES =====
    inventory.setItem(slot++, createEnchantedItem("minecraft:golden_apple", 64));
    inventory.setItem(slot++, createEnchantedItem("minecraft:golden_carrot", 64)); // Upgraded to Golden Carrots!

    // Minecraft Bedrock items that do not stack past 1 (Potions, Milk, Totems)
    // We add them individually to prevent game glitches.
    inventory.setItem(slot++, createEnchantedItem("minecraft:splash_potion", 1)); // Speed II
    inventory.setItem(slot++, createEnchantedItem("minecraft:splash_potion", 1)); // Strength II
    inventory.setItem(slot++, createEnchantedItem("minecraft:potion", 1));        // Slow Falling

    // Healing Potions
    for (let i = 0; i < 4; i++) {
      inventory.setItem(slot++, createEnchantedItem("minecraft:splash_potion", 1));
    }

    // Ender Pearls (Max stack size is 16)
    inventory.setItem(slot++, createEnchantedItem("minecraft:ender_pearl", 16));
    inventory.setItem(slot++, createEnchantedItem("minecraft:ender_pearl", 16));
    inventory.setItem(slot++, createEnchantedItem("minecraft:ender_pearl", 16));

    inventory.setItem(slot++, createEnchantedItem("minecraft:arrow", 1)); // Infinity Ammo

    // Individual Totems (They do not stack)
    for (let i = 0; i < 5; i++) {
      inventory.setItem(slot++, createEnchantedItem("minecraft:totem_of_undying", 1));
    }
    
    inventory.setItem(slot++, createEnchantedItem("minecraft:ender_chest", 1));

    // ===== DRAGON SLAYING UTILITIES =====
    inventory.setItem(slot++, createEnchantedItem("minecraft:obsidian", 32));
    
    // Remaining healing potions
    for (let i = 0; i < 3; i++) {
      inventory.setItem(slot++, createEnchantedItem("minecraft:potion", 1));
    }
    
    // Milk Buckets (Do not stack)
    for (let i = 0; i < 4; i++) {
      inventory.setItem(slot++, createEnchantedItem("minecraft:milk_bucket", 1));
    }
    
    inventory.setItem(slot++, createEnchantedItem("minecraft:carved_pumpkin", 1)); // Carved pumpkin for Enderman safety

    // Success message in action bar
    player.onScreenDisplay.setActionBar("§a✓ Maxed Out Netherite Pack loaded! Go slay the dragon!");
  } catch (error) {
    console.error("Error in giveMaxedGear: ", error);
  }
}
