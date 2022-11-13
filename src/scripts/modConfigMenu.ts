export function ModConfig(IRFconfig) {
  if (ModConfigMenu !== undefined) {
    ModConfigMenu.RemoveCategory("Watch out, laser!");

    ModConfigMenu.AddSpace("Watch out, laser!", "About");
    ModConfigMenu.AddText("Watch out, laser!","About",() => "Watch out, laser!",);
    ModConfigMenu.AddSpace("Watch out, laser!", "About");
    ModConfigMenu.AddText("Watch out, laser!", "About", () => `Version 0.5`);

    ModConfigMenu.AddSpace("Watch out, laser!", "About");
    ModConfigMenu.AddText("Watch out, laser!", "About", () => "Mod made by Tidloas with love");
    ModConfigMenu.AddSpace("Watch out, laser!", "About");

    ModConfigMenu.AddSetting("Watch out, laser!", `Vanilla`, {
      Type: ModConfigMenuOptionType.BOOLEAN,
      CurrentSetting() {
        return IRFconfig.Laser;
      },
      Display() {
        let onOff = "Tracer";
        if (IRFconfig.Laser == true) {
          onOff = "Laser";
        }
        return `Style for the indicator: ${onOff}`;
      },
      OnChange(IsOn) {
        IRFconfig.Laser = IsOn as boolean;
      },
      Info: [`Laser or Tracer`],
    });

    function addItem(entity, type, name, desc) {
      ModConfigMenu.AddSetting("Watch out, laser!", `${type}`, {
        Type: ModConfigMenuOptionType.BOOLEAN,
        CurrentSetting() {
          return IRFconfig[entity];
        },
        Display() {
          let onOff = "Disabled";
          if (IRFconfig[entity] == true) {
            onOff = "Enabled";
          }
          return `${name}: ${onOff}`;
        },
        OnChange(IsOn) {
          IRFconfig[entity] = IsOn as boolean;
        },
        Info: [`${desc}`],
      });
    }
    addItem("RageCreep", "Vanilla", "Rage Creep", "Enables the indicator for RageCreep and his variants.");
    addItem("Uriel", "Vanilla", "Uriel", "Enables the indicator for Uriel");
    addItem("Gabriel", "Vanilla", "Gabriel", "Enables the indicator for Gabriel");
    addItem("Monstro", "Vanilla", "Monstro", "Enables the indicator for Monstro and his variants.");
    addItem("Adversary", "Vanilla", "The Adversary", "Enables the indicator for Adversary.");
    addItem("DarkOne", "Vanilla", "Dark One", "Enables the indicator for Dark One.");
    addItem("SoulSucker", "Vanilla", "Soul Sucker", "Enables the indicator for SoulSucker and his variants.");
    addItem("Vis", "Vanilla", "Vis", "Enables the indicator for Vis and his variants.");
    addItem("RedGhost", "Vanilla", "RedGhost", "Enables the indicator for Red Ghost.");
    addItem("Goat", "Vanilla", "Goat", "Enables the indicator for the Goat.");
    addItem("BrimstoneHead", "Vanilla", "Brimstone Head", "Enables the indicator for BrimstoneHead(obstacle).");
    addItem("Krampus", "Vanilla", "Krampus", "Enables the indicator for Krampus(I really did my best...).");
    addItem("BlightedOvum", "Vanilla", "BlightedOvum", "Enables the indicator for Blighted Ovum.");
    addItem("Forsaken", "Vanilla", "Forsaken", "Enables the indicator for Forsaken and his variants.");
    addItem("BloodEye", "Vanilla", "Blood Eye", "Enables the indicator for BloodEye.");
    addItem("ReapCreep", "Vanilla", "Reap Creep", "Enables the indicator for Reap Creep.");
    addItem("Bloat", "Vanilla", "Bloat", "Enables the indicator for Bloat.");
    addItem("Sister", "Vanilla", "Sister vis", "Enables the indicator for Sister's vis.");
    addItem("Visage", "Vanilla", "Visage", "Enables the indicator for Visage.");
    addItem("BrimBomb", "Vanilla", "BrimBomb", "Enables the indicator for BrimBomb(horny boys).");
    addItem("Mother", "Vanilla", "Mother", "Enables the indicator for Mother(witness).");
    addItem("TheLamb", "Vanilla", "The Lamb", "Enables the indicator for The Lamb.");
    addItem("Dogma", "Vanilla", "Dogma", "Enables the indicator for Dogma.");
    addItem("Gluttony", "Vanilla", "Gluttony", "Enables the indicator for Gluttony.");
    addItem("UltraGreed", "Vanilla", "Ultra Greed", "Enables the indicator for Ultra Greed(door).");
    addItem("Haunt", "Vanilla", "Haunt", "Enables the indicator for Haunt.");
    addItem("Mom", "Vanilla", "Mom", "Enables the indicator for Mom(door).");
    addItem("MegaSatan", "Vanilla", "Mega Satan", "Enables the indicator for Mega Satan.");
    addItem("TheBeast", "Vanilla", "The Beast", "Enables the indicator for The Beast.");

    ModConfigMenu.AddSpace("Watch out, laser!", "ChangeLog");
    ModConfigMenu.AddText("Watch out, laser!", "ChangeLog", () => "Hey Hello! ");



  }
}
