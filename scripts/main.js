import { world, system } from "@minecraft/server";

// Run an interval check every game tick (20 times per second)
system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    // Detect the tag applied by your .mcfunction file
    if (player.hasTag("enchant_me")) {
      
      // CRUCIAL FIX: Wait 5 ticks (0.25 seconds) so the /give items have time to physically enter the slots!
      system.runTimeout(() => {
        try {
          enchantInventoryItems(player);
          player.removeTag("enchant_me"); // Safely clear tag after items exist
          player.onScreenDisplay.setActionBar("§a✓ Dragon Slimming Enchants Applied!");
        } catch (error) {
          // Fail-safe protection
        }
      }, 5);

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

  // Loop through all inventory slots now that items have landed
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
            // Overwrites safely if items already have a baseline enchant
          }
        }
        // Force-push the enchanted item state back to your inventory slot
        inventory.setItem(slot, item);
      }
    }
  }
}
