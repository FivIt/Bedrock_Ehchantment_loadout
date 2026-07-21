import { world, system } from "@minecraft/server";

// Run an interval check every game tick (20 times per second)
system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    // Detect the tag applied by your .mcfunction file
    if (player.hasTag("enchant_me")) {
      try {
        enchantInventoryItems(player);
        player.removeTag("enchant_me"); // Remove tag immediately to stop loops
        player.onScreenDisplay.setActionBar("§a✓ Dragon Slimming Enchants Applied!");
      } catch (error) {
        // Safe console fail-safe
      }
    }
  }
}, 1);

function enchantInventoryItems(player) {
  const inventoryComponent = player.getComponent("minecraft:inventory");
  if (!inventoryComponent) return;
  const inventory = inventoryComponent.container;

  // Dictionary matching your function items to maximum tier enchants
  const enchantLayout = {
    "minecraft:netherite_helmet": [
      { type: "protection", level: 4 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 },
      { type: "respiration", level: 3 },
      { type: "aqua_affinity", level: 1 }
    ],
    "minecraft:netherite_chestplate": [
      { type: "protection", level: 4 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 }
    ],
    "minecraft:netherite_leggings": [
      { type: "protection", level: 4 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 }
    ],
    "minecraft:netherite_boots": [
      { type: "protection", level: 4 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 },
      { type: "feather_falling", level: 4 }
    ],
    "minecraft:netherite_sword": [
      { type: "sharpness", level: 5 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 }
    ],
    "minecraft:netherite_pickaxe": [
      { type: "efficiency", level: 5 },
      { type: "unbreaking", level: 3 },
      { type: "mending", level: 1 }
    ],
    "minecraft:bow": [
      { type: "power", level: 5 },
      { type: "infinity", level: 1 },
      { type: "unbreaking", level: 3 }
    ]
  };

  // Loop through all 36 standard inventory slots
  for (let slot = 0; slot < inventory.size; slot++) {
    const item = inventory.getItem(slot);
    if (!item) continue;

    if (enchantLayout[item.typeId]) {
      const enchantComponent = item.getComponent("minecraft:enchantable");
      if (enchantComponent) {
        const targetEnchants = enchantLayout[item.typeId];
        
        for (const enchant of targetEnchants) {
          try {
            enchantComponent.addEnchantment({ type: enchant.type, level: enchant.level });
          } catch (e) {
            // Overwrites or bypasses conflicting enchants safely
          }
        }
        // Force update the slot so changes display on your screen
        inventory.setItem(slot, item);
      }
    }
  }
}
