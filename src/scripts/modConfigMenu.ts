export function ModConfig(IRFconfig) {
  if (ModConfigMenu !== undefined) {
    ModConfigMenu.RemoveCategory("Coming Down!");

    ModConfigMenu.AddSpace("Coming Down!", "About");
    ModConfigMenu.AddText("Coming Down!","About",() => "Coming Down ![Rework]",);
    ModConfigMenu.AddSpace("Coming Down!", "About");
    ModConfigMenu.AddText("Coming Down!", "About", () => `Version 2.1`);

    ModConfigMenu.AddSpace("Coming Down!", "About");
    ModConfigMenu.AddText("Coming Down!", "About", () => "Remake made by Tidloas with love");
    ModConfigMenu.AddSpace("Coming Down!", "About");

    ModConfigMenu.AddSetting("Coming Down!", `Vanilla`, {
      Type: ModConfigMenuOptionType.BOOLEAN,
      CurrentSetting() {
        return IRFconfig.FatSack;
      },
      Display() {
        let onOff = "Disabled";
        if (IRFconfig.FatSack == true) {
          onOff = "Enabled";
        }
        return `FatSack: ${onOff}`;
      },
      OnChange(IsOn) {
        IRFconfig.FatSack = IsOn as boolean;
      },
      Info: [`disables the indicator for FatSack and his variants`],
    });

    function addItem(entity, type, name, desc) {
      ModConfigMenu.AddSetting("Coming Down!", `${type}`, {
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
          if(entity == "AllProjectile" && (IsOn == 1 || true)){
            IRFconfig["RockFall"] = false
          }
          if(entity == "RockFall" && (IsOn == 1 || true)){
            IRFconfig["AllProjectile"] = false
          }
          if(entity == "Daddy" && (IsOn == 0 || false)){
            IRFconfig["DadAlt"] = false
          }
          IRFconfig[entity] = IsOn as boolean;
        },
        Info: [`${desc}`],
      });
    }
    addItem("Leaper", "Vanilla", "Leaper", "Enables the indicator for Leaper and his variants.");

    addItem("Debug", "Special", "Debug", "Displays text with information about an entity, useful for when I am working or if you want to propose a mod..");

    ModConfigMenu.AddSpace("Coming Down!", "ChangeLog");
    ModConfigMenu.AddText("Coming Down!", "ChangeLog", () => "+ Alternative animation for daddy(wip) ");
    ModConfigMenu.AddText("Coming Down!", "ChangeLog", () => "+ added some Revelation boss/mobs");

    ModConfigMenu.AddSpace("Coming Down!", "Credit");
    ModConfigMenu.AddSpace("Coming Down!", "Credit");
    ModConfigMenu.AddSpace("Coming Down!", "Credit");
    ModConfigMenu.AddText("Coming Down!", "Credit", () => "PixelPlz for his advice and help");
    ModConfigMenu.AddText("Coming Down!", "Credit", () => "Querty for his contribution on the Revamp");
    ModConfigMenu.AddText("Coming Down!", "Credit", () => "Made with the IsaacScript framework");


  }
}
