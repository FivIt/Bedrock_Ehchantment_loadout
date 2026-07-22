import {
  world,
  system,
  ItemStack,
  ItemComponentTypes,
  EnchantmentType,
  EntityComponentTypes,
  EquipmentSlot,
} from "@minecraft/server";

function ench(item, id, level) {
  const comp = item.getComponent(ItemComponentTypes.Enchantable);
  if (comp) comp.addEnchantment({ type: new EnchantmentType(id), level: level });
  return item;
}

// places a potion by its PE/Bedrock aux data value directly into a main-inventory
// slot (0-26, i.e. the 3 rows below the hotbar), since the script API has no
// clean component for "which potion" yet, this rides on the old give/replaceitem
// numeric system, run as the player so it actually lands in their inventory
function potionAt(player, invIndex, dataValue, count) {
  try {
    player.runCommand(`replaceitem entity @s slot.inventory ${invIndex} splash_potion ${count} ${dataValue}`);
  } catch (e) {
    player.sendMessage(`§cCouldn't place potion at inventory slot ${invIndex}: ${e}`);
  }
}

function buildKit(player) {
  const invComp = player.getComponent(EntityComponentTypes.Inventory);
  const container = invComp.container;
  const equip = player.getComponent(EntityComponentTypes.Equippable);

  // ===== Equipped =====
  const helmet = new ItemStack("minecraft:netherite_helmet", 1);
  ench(helmet, "minecraft:protection", 4);
  ench(helmet, "minecraft:unbreaking", 3);
  ench(helmet, "minecraft:mending", 1);
  ench(helmet, "minecraft:respiration", 3);
  ench(helmet, "minecraft:aqua_affinity", 1);

  const chest = new ItemStack("minecraft:netherite_chestplate", 1);
  ench(chest, "minecraft:protection", 4);
  ench(chest, "minecraft:unbreaking", 3);
  ench(chest, "minecraft:mending", 1);

  const legs = new ItemStack("minecraft:netherite_leggings", 1);
  ench(legs, "minecraft:protection", 4);
  ench(legs, "minecraft:unbreaking", 3);
  ench(legs, "minecraft:mending", 1);
  ench(legs, "minecraft:swift_sneak", 3);

  const boots = new ItemStack("minecraft:netherite_boots", 1);
  ench(boots, "minecraft:protection", 4);
  ench(boots, "minecraft:unbreaking", 3);
  ench(boots, "minecraft:mending", 1);
  ench(boots, "minecraft:feather_falling", 4);
  ench(boots, "minecraft:depth_strider", 3);

  if (equip) {
    equip.setEquipment(EquipmentSlot.Head, helmet);
    equip.setEquipment(EquipmentSlot.Chest, chest);
    equip.setEquipment(EquipmentSlot.Legs, legs);
    equip.setEquipment(EquipmentSlot.Feet, boots);
    equip.setEquipment(EquipmentSlot.Offhand, new ItemStack("minecraft:totem_of_undying", 1));
  }

  // ===== Row 1 / hotbar, container slots 0-8 =====
  const sword = new ItemStack("minecraft:netherite_sword", 1);
  ench(sword, "minecraft:sharpness", 5);
  ench(sword, "minecraft:unbreaking", 3);
  ench(sword, "minecraft:mending", 1);
  ench(sword, "minecraft:looting", 3);
  ench(sword, "minecraft:fire_aspect", 2);
  ench(sword, "minecraft:knockback", 2);
  container.setItem(0, sword);

  const spearLunge = new ItemStack("minecraft:netherite_spear", 1);
  ench(spearLunge, "minecraft:sharpness", 5);
  ench(spearLunge, "minecraft:unbreaking", 3);
  ench(spearLunge, "minecraft:looting", 3);
  ench(spearLunge, "minecraft:fire_aspect", 2);
  ench(spearLunge, "minecraft:knockback", 2);
  ench(spearLunge, "minecraft:lunge", 3);
  container.setItem(1, spearLunge);

  const spearMend = new ItemStack("minecraft:netherite_spear", 1);
  ench(spearMend, "minecraft:sharpness", 5);
  ench(spearMend, "minecraft:unbreaking", 3);
  ench(spearMend, "minecraft:mending", 1);
  ench(spearMend, "minecraft:looting", 3);
  ench(spearMend, "minecraft:fire_aspect", 2);
  ench(spearMend, "minecraft:knockback", 2);
  container.setItem(2, spearMend);

  const bow = new ItemStack("minecraft:bow", 1);
  ench(bow, "minecraft:power", 5);
  ench(bow, "minecraft:unbreaking", 3);
  ench(bow, "minecraft:flame", 1);
  ench(bow, "minecraft:infinity", 1);
  container.setItem(3, bow);

  container.setItem(4, new ItemStack("minecraft:golden_carrot", 64));
  container.setItem(5, new ItemStack("minecraft:golden_apple", 64));
  container.setItem(6, new ItemStack("minecraft:ender_pearl", 16));
  container.setItem(7, new ItemStack("minecraft:totem_of_undying", 1));
  container.setItem(8, new ItemStack("minecraft:snow", 64));

  // ===== Row 2, container slots 9-17 =====
  container.setItem(9, new ItemStack("minecraft:ender_pearl", 16));
  container.setItem(10, new ItemStack("minecraft:ender_pearl", 16));
  container.setItem(11, new ItemStack("minecraft:snow", 64));
  container.setItem(12, new ItemStack("minecraft:snow", 64));
  container.setItem(13, new ItemStack("minecraft:snow", 64));
  container.setItem(14, new ItemStack("minecraft:totem_of_undying", 1));
  container.setItem(15, new ItemStack("minecraft:totem_of_undying", 1));
  container.setItem(16, new ItemStack("minecraft:totem_of_undying", 1));
  const shovel = new ItemStack("minecraft:netherite_shovel", 1);
  ench(shovel, "minecraft:efficiency", 5);
  ench(shovel, "minecraft:unbreaking", 3);
  ench(shovel, "minecraft:mending", 1);
  container.setItem(17, shovel);

  // ===== Row 3, container slots 18-26 (= slot.inventory.9-17) =====
  container.setItem(22, new ItemStack("minecraft:arrow", 1)); // plain, per your note on boss immunity
  container.setItem(26, new ItemStack("minecraft:carved_pumpkin", 1));
  potionAt(player, 9, 32, 1);  // extended strength
  potionAt(player, 10, 32, 1);
  potionAt(player, 11, 32, 1);
  potionAt(player, 12, 32, 1);
  potionAt(player, 14, 22, 1); // instant health II
  potionAt(player, 15, 22, 1);
  potionAt(player, 16, 22, 1);

  // ===== Row 4, container slots 27-35 (= slot.inventory.18-26) =====
  container.setItem(27, new ItemStack("minecraft:ender_chest", 1));
  potionAt(player, 19, 15, 1); // extended swiftness
  potionAt(player, 20, 15, 1);
  potionAt(player, 21, 15, 1);
  potionAt(player, 22, 15, 1);
  potionAt(player, 23, 22, 1); // instant health II
  potionAt(player, 24, 22, 1);
  potionAt(player, 25, 22, 1);
}

system.afterEvents.scriptEventReceive.subscribe((ev) => {
  if (ev.id !== "darwin:gear") return;

  let player = ev.sourceEntity;
  if (!player || player.typeId !== "minecraft:player") {
    player = world.getAllPlayers()[0];
  }
  if (!player) return;

  buildKit(player);
  player.sendMessage("§l§b§k'::§r§l§o§eFull loadout equipped and enchanted, §r§qGood Luck!! §l§e<3§r§l§b§k::'");
});import {
  world,
  system,
  ItemStack,
  ItemComponentTypes,
  EnchantmentType,
  EntityComponentTypes,
  EquipmentSlot,
} from "@minecraft/server";

function ench(item, id, level) {
  const comp = item.getComponent(ItemComponentTypes.Enchantable);
  if (comp) comp.addEnchantment({ type: new EnchantmentType(id), level: level });
  return item;
}

// places a potion by its PE/Bedrock aux data value directly into a main-inventory
// slot (0-26, i.e. the 3 rows below the hotbar), since the script API has no
// clean component for "which potion" yet, this rides on the old give/replaceitem
// numeric system, run as the player so it actually lands in their inventory
function potionAt(player, invIndex, dataValue, count) {
  player.runCommand(`replaceitem entity @s slot.inventory.${invIndex} 0 splash_potion ${count} ${dataValue}`);
}

function buildKit(player) {
  const invComp = player.getComponent(EntityComponentTypes.Inventory);
  const container = invComp.container;
  const equip = player.getComponent(EntityComponentTypes.Equippable);

  // ===== Equipped =====
  const helmet = new ItemStack("minecraft:netherite_helmet", 1);
  ench(helmet, "minecraft:protection", 4);
  ench(helmet, "minecraft:unbreaking", 3);
  ench(helmet, "minecraft:mending", 1);
  ench(helmet, "minecraft:respiration", 3);
  ench(helmet, "minecraft:aqua_affinity", 1);

  const chest = new ItemStack("minecraft:netherite_chestplate", 1);
  ench(chest, "minecraft:protection", 4);
  ench(chest, "minecraft:unbreaking", 3);
  ench(chest, "minecraft:mending", 1);

  const legs = new ItemStack("minecraft:netherite_leggings", 1);
  ench(legs, "minecraft:protection", 4);
  ench(legs, "minecraft:unbreaking", 3);
  ench(legs, "minecraft:mending", 1);
  ench(legs, "minecraft:swift_sneak", 3);

  const boots = new ItemStack("minecraft:netherite_boots", 1);
  ench(boots, "minecraft:protection", 4);
  ench(boots, "minecraft:unbreaking", 3);
  ench(boots, "minecraft:mending", 1);
  ench(boots, "minecraft:feather_falling", 4);
  ench(boots, "minecraft:depth_strider", 3);

  if (equip) {
    equip.setEquipment(EquipmentSlot.Head, helmet);
    equip.setEquipment(EquipmentSlot.Chest, chest);
    equip.setEquipment(EquipmentSlot.Legs, legs);
    equip.setEquipment(EquipmentSlot.Feet, boots);
    equip.setEquipment(EquipmentSlot.Offhand, new ItemStack("minecraft:totem_of_undying", 1));
  }

  // ===== Row 1 / hotbar, container slots 0-8 =====
  const sword = new ItemStack("minecraft:netherite_sword", 1);
  ench(sword, "minecraft:sharpness", 5);
  ench(sword, "minecraft:unbreaking", 3);
  ench(sword, "minecraft:mending", 1);
  ench(sword, "minecraft:looting", 3);
  ench(sword, "minecraft:fire_aspect", 2);
  ench(sword, "minecraft:knockback", 2);
  container.setItem(0, sword);

  const spearLunge = new ItemStack("minecraft:netherite_spear", 1);
  ench(spearLunge, "minecraft:sharpness", 5);
  ench(spearLunge, "minecraft:unbreaking", 3);
  ench(spearLunge, "minecraft:looting", 3);
  ench(spearLunge, "minecraft:fire_aspect", 2);
  ench(spearLunge, "minecraft:knockback", 2);
  ench(spearLunge, "minecraft:lunge", 3);
  container.setItem(1, spearLunge);

  const spearMend = new ItemStack("minecraft:netherite_spear", 1);
  ench(spearMend, "minecraft:sharpness", 5);
  ench(spearMend, "minecraft:unbreaking", 3);
  ench(spearMend, "minecraft:mending", 1);
  ench(spearMend, "minecraft:looting", 3);
  ench(spearMend, "minecraft:fire_aspect", 2);
  ench(spearMend, "minecraft:knockback", 2);
  container.setItem(2, spearMend);

  const bow = new ItemStack("minecraft:bow", 1);
  ench(bow, "minecraft:power", 5);
  ench(bow, "minecraft:unbreaking", 3);
  ench(bow, "minecraft:flame", 1);
  ench(bow, "minecraft:infinity", 1);
  container.setItem(3, bow);

  container.setItem(4, new ItemStack("minecraft:golden_carrot", 64));
  container.setItem(5, new ItemStack("minecraft:golden_apple", 64));
  container.setItem(6, new ItemStack("minecraft:ender_pearl", 16));
  container.setItem(7, new ItemStack("minecraft:totem_of_undying", 1));
  container.setItem(8, new ItemStack("minecraft:snow", 64));

  // ===== Row 2, container slots 9-17 =====
  container.setItem(9, new ItemStack("minecraft:ender_pearl", 16));
  container.setItem(10, new ItemStack("minecraft:ender_pearl", 16));
  container.setItem(11, new ItemStack("minecraft:snow", 64));
  container.setItem(12, new ItemStack("minecraft:snow", 64));
  container.setItem(13, new ItemStack("minecraft:snow", 64));
  container.setItem(14, new ItemStack("minecraft:totem_of_undying", 1));
  container.setItem(15, new ItemStack("minecraft:totem_of_undying", 1));
  container.setItem(16, new ItemStack("minecraft:totem_of_undying", 1));
  container.setItem(17, new ItemStack("minecraft:netherite_shovel", 1));

  // ===== Row 3, container slots 18-26 (= slot.inventory.9-17) =====
  container.setItem(22, new ItemStack("minecraft:arrow", 1)); // plain, per your note on boss immunity
  container.setItem(26, new ItemStack("minecraft:carved_pumpkin", 1));
  potionAt(player, 9, 32, 1);  // extended strength
  potionAt(player, 10, 32, 1);
  potionAt(player, 11, 32, 1);
  potionAt(player, 12, 32, 1);
  potionAt(player, 14, 22, 1); // instant health II
  potionAt(player, 15, 22, 1);
  potionAt(player, 16, 22, 1);

  // ===== Row 4, container slots 27-35 (= slot.inventory.18-26) =====
  container.setItem(27, new ItemStack("minecraft:ender_chest", 1));
  potionAt(player, 19, 15, 1); // extended swiftness
  potionAt(player, 20, 15, 1);
  potionAt(player, 21, 15, 1);
  potionAt(player, 22, 15, 1);
  potionAt(player, 23, 22, 1); // instant health II
  potionAt(player, 24, 22, 1);
  potionAt(player, 25, 22, 1);
}

system.afterEvents.scriptEventReceive.subscribe((ev) => {
  if (ev.id !== "darwin:gear") return;

  let player = ev.sourceEntity;
  if (!player || player.typeId !== "minecraft:player") {
    player = world.getAllPlayers()[0];
  }
  if (!player) return;

  buildKit(player);
  player.sendMessage("§aFull loadout placed, exact slots, enchanted, equipped.");
});
