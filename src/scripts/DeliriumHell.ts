declare const BetterMonsters: unknown | undefined;

//! I hate Delirium
export function IHateDelirium(
  ent,
  EntSprite,
  data,
  IRFconfig,
  spawnTracer,
  RemoveLaserIndicator,
  AfterDedLaserIndicator,
  TargetLaserIndicator,
): void {
  let fileName: string = EntSprite.GetFilename();

  if (fileName.includes("Dark One.anm2")) {
    if (
      //DarkOne
      ent.ToNPC().State == 9 &&
      EntSprite.IsPlaying("Attack2") &&
      EntSprite.GetFrame() < 25
    ) {
      spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
      return;
    }
    if (
      (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 25) ||
      EntSprite.IsFinished("Attack2")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
  //Uriel
  if (fileName.includes("angel.anm2")) {
    if (ent.ToNPC().State == 9 && EntSprite.IsPlaying("Charging")) {
      spawnTracer(ent, 90, [1], 50, false, 2, 2, 2);
      return;
    }
    if (BetterMonsters == undefined || ent.Variant == 0) {
      if (ent.ToNPC().State == 10 && EntSprite.IsPlaying("Charging")) {
        spawnTracer(ent, 90, [0.5, 1.5], 50, true, 2, 2, 2);
        return;
      }
    } else {
      if (
        (ent.ToNPC().State == 10 && EntSprite.IsPlaying("Charging")) ||
        (ent.ToNPC().State == 12 &&
          EntSprite.IsPlaying("LaserShot") &&
          EntSprite.GetFrame() <= 5 &&
          ent.Variant == 1)
      ) {
        data.Rotate = true;
        let angle = (
          ent.Position -
          Vector(
            ent.ToNPC().GetPlayerTarget().Position.X,
            ent.ToNPC().GetPlayerTarget().Position.Y + 30,
          )
        ).GetAngleDegrees(); //this is used to calculate the angle between isaac and the entity, technically, where will the entity shoot
        TargetLaserIndicator(
          //Target is a little different than the basic function.
          ent,
          [angle, angle], //the angle is put here instead of the basic 90°, becomes a table
          [215, 145], //A bit different than the multiplier, but works the same way. Manages the number of lasers and changes the angle. for example, if the laser is to be directed at isaac, the value should be 180. to give an image, https://imgur.com/QddRjUG
          40,
          false,
          1,
          1,
          1,
        );
      }
    }
    if (
      (EntSprite.IsPlaying("LaserShot") && EntSprite.GetFrame() >= 5) ||
      EntSprite.IsFinished("LaserShot")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }

  //Gabriel

  if (fileName.includes("angel2.anm2")) {
    if (
      ent.ToNPC().State == 9 &&
      (EntSprite.IsPlaying("Charging") ||
        EntSprite.IsPlaying("Float") ||
        EntSprite.IsPlaying("Shield"))
    ) {
      if (BetterMonsters !== undefined && ent.Variant == 1)
        spawnTracer(ent, 90, [1, 2, 3, 4], 50, false, 2, 2, 2);
      else spawnTracer(ent, 90, [1, 2, 3, 4], 50, true, 2, 2, 2);
      return;
    } else if (
      ent.ToNPC().State == 10 &&
      EntSprite.IsPlaying("Charging2") &&
      (BetterMonsters == undefined || ent.Variant == 0)
    ) {
      spawnTracer(ent, 90, [0.5, 1.5, 2.5, 3.5], 50, true, 2, 2, 2);
      return;
    }

    if (
      (EntSprite.IsPlaying("LaserShot") && EntSprite.GetFrame() > 4) ||
      EntSprite.IsFinished("LaserShot")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }

  if (fileName.includes("Monstro II.anm2")) {
    if (
      ent.ToNPC().State == 8 &&
      EntSprite.IsPlaying("Taunt") &&
      EntSprite.GetFrame() < 20 &&
      EntSprite.GetFrame() > 5
    ) {
      if (EntSprite.FlipX == true) {
        spawnTracer(ent, 90, [4], 20, false, 2, 0, 0);
        return;
      } else {
        spawnTracer(ent, 90, [2], 20, false, 2, 0, 0);
        return;
      }
    }

    if (
      (EntSprite.IsPlaying("Taunt") && EntSprite.GetFrame() > 20) ||
      EntSprite.IsFinished("Taunt")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }

  if (fileName.includes("Dark One 2.anm2")) {
    if (
      ent.ToNPC().State == 9 &&
      EntSprite.IsPlaying("Attack2") &&
      EntSprite.GetFrame() < 25
    ) {
      spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
      return;
    }
    if (
      (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 25) ||
      EntSprite.IsFinished("Attack2")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }

  if (fileName.includes("the fallen.anm2")) {
    if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 35) {
      spawnTracer(ent, 90, [1, 2, 3, 4], 40, false, 2, 0, 0);
      return;
    }
    if (
      (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 35) ||
      EntSprite.IsFinished("Attack2")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }

  if (fileName.includes("Krampus")) {
    if (
      EntSprite.IsPlaying("Attack2Alt") &&
      EntSprite.GetFrame() < 31 &&
      EntSprite.GetFrame() > 5
    ) {
      spawnTracer(ent, 90, [1, 2, 3, 4], 40, false, 2, 0, 0);
    }
    if (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() < 35) {
      spawnTracer(
        ent,
        90,
        [1, 2, 3, 4, 1.5, 2.5, 3.5, 4.5],
        40,
        false,
        2,
        0,
        0,
      );
      return;
    }
    if (
      (EntSprite.IsPlaying("Attack2") && EntSprite.GetFrame() > 35) ||
      (EntSprite.IsPlaying("Attack2Alt") && EntSprite.GetFrame() > 31) ||
      EntSprite.IsFinished("Attack2") ||
      EntSprite.IsFinished("Attack2Alt")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }

  if (fileName.includes("Ovum Baby.anm2") && BetterMonsters == undefined) {
    if (
      EntSprite.IsPlaying("Attack01") &&
      EntSprite.FlipX == false &&
      EntSprite.GetFrame() < 30
    ) {
      spawnTracer(ent, 90, [4], 40, false, 2, 0, 0);
      return;
    }
    if (
      EntSprite.IsPlaying("Attack01") &&
      EntSprite.FlipX == true &&
      EntSprite.GetFrame() < 30
    ) {
      spawnTracer(ent, 90, [2], 40, false, 2, 0, 0);
      return;
    }

    if (
      (EntSprite.IsPlaying("Attack01") && EntSprite.GetFrame() > 35) ||
      EntSprite.IsFinished("Attack01")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }

  if (fileName.includes("TheForsaken.anm2")) {
    if (BetterMonsters == undefined) {
      data.Rotate = true;
      if (EntSprite.IsPlaying("BlastStart") && EntSprite.GetFrame() <= 22) {
        let angle = (
          ent.Position - ent.ToNPC().GetPlayerTarget().Position
        ).GetAngleDegrees();
        TargetLaserIndicator(
          ent,
          [angle, angle, angle],
          [0, 120, 240],
          30,
          false,
          2,
          0,
          0,
        );
        return;
      }

      if (
        (EntSprite.IsPlaying("BlastStart") && EntSprite.GetFrame() >= 23) ||
        EntSprite.IsPlaying("Blasting") ||
        EntSprite.IsFinished("Blasting")
      ) {
        if (data.IndicatorBrim) {
          data.Danger = 0;
          RemoveLaserIndicator(ent);
          return;
        }
      }
    }
  }

  if (fileName.includes("The Bloat.anm2")) {
    if (EntSprite.IsPlaying("AttackAlt01") && EntSprite.GetFrame() < 10) {
      spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
      return;
    }
    if (EntSprite.IsPlaying("AttackAlt02") && EntSprite.GetFrame() < 10) {
      spawnTracer(ent, 90, [2, 4], 70, false, 2, 0, 0);
      return;
    }

    if (
      ((EntSprite.IsPlaying("AttackAlt01") ||
        EntSprite.IsPlaying("AttackAlt02")) &&
        EntSprite.GetFrame() > 10) ||
      EntSprite.IsFinished("AttackAlt01") ||
      EntSprite.IsFinished("AttackAlt02")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
  if (fileName.includes("SistersVis.anm2")) {
    data.Mega = true;
    if (
      EntSprite.IsPlaying("LaserStartDown") &&
      EntSprite.GetFrame() > 26 &&
      (ent.ToNPC().State == 10 ||
        ent.ToNPC().State == 9 ||
        ent.ToNPC().State == 11)
    ) {
      spawnTracer(ent, 90, [1], 30, false, 2, 0, 0);
      return;
    }
    if (
      EntSprite.IsPlaying("LaserStartSide") &&
      EntSprite.GetFrame() > 26 &&
      EntSprite.FlipX == true &&
      (ent.ToNPC().State == 10 ||
        ent.ToNPC().State == 9 ||
        ent.ToNPC().State == 11)
    ) {
      spawnTracer(ent, 90, [2], 30, false, 2, 0, 0);
      return;
    }
    if (
      EntSprite.IsPlaying("LaserStartSide") &&
      EntSprite.GetFrame() > 26 &&
      EntSprite.FlipX == false &&
      (ent.ToNPC().State == 10 ||
        ent.ToNPC().State == 9 ||
        ent.ToNPC().State == 11)
    ) {
      spawnTracer(ent, 90, [4], 30, false, 2, 0, 0);
      return;
    }
    if (
      EntSprite.IsPlaying("LaserStartUp") &&
      EntSprite.GetFrame() > 26 &&
      (ent.ToNPC().State == 10 ||
        ent.ToNPC().State == 9 ||
        ent.ToNPC().State == 11)
    ) {
      spawnTracer(ent, 90, [3], 30, false, 2, 0, 0);
      return;
    }

    if (
      EntSprite.IsPlaying("LaserLoopDown") ||
      EntSprite.IsPlaying("LaserLoopUp") ||
      EntSprite.IsPlaying("LaserLoopSide") ||
      EntSprite.IsFinished("LaserStartDown") ||
      EntSprite.IsFinished("LaserStartSide") ||
      EntSprite.IsFinished("LaserStartUp")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
  if (fileName.includes("Satan.anm2")) {
    if (BetterMonsters !== undefined) {
      if (
        EntSprite.IsPlaying("Attack02") &&
        EntSprite.GetFrame() < 20 &&
        ent.ToNPC().State == 9
      ) {
        spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
        return;
      }

      if (
        EntSprite.IsPlaying("Attack03") &&
        EntSprite.GetFrame() >= 5 &&
        EntSprite.GetFrame() <= 20 &&
        ent.ToNPC().State == 13
      ) {
        let angle = (
          Vector(ent.Position.X + 100, ent.Position.Y) -
          Vector(
            ent.ToNPC().GetPlayerTarget().Position.X,
            ent.ToNPC().GetPlayerTarget().Position.Y + 30,
          )
        ).GetAngleDegrees();
        let angle2 = (
          Vector(ent.Position.X - 100, ent.Position.Y) -
          Vector(
            ent.ToNPC().GetPlayerTarget().Position.X,
            ent.ToNPC().GetPlayerTarget().Position.Y + 30,
          )
        ).GetAngleDegrees();
        TargetLaserIndicator(
          ent,
          [angle2, angle],
          [180, 180],
          40,
          false,
          2,
          0,
          0,
          [100, -100],
        );
        return;
      }

      if (
        (EntSprite.IsPlaying("Attack02") && EntSprite.GetFrame() > 20) ||
        (EntSprite.IsPlaying("Attack03") && EntSprite.GetFrame() > 15) ||
        EntSprite.IsFinished("Attack02") ||
        EntSprite.IsFinished("Attack03")
      ) {
        if (data.IndicatorBrim) {
          data.Danger = 0;
          RemoveLaserIndicator(ent);
          return;
        }
      }
    } else {
      if (
        EntSprite.IsPlaying("Attack02") &&
        EntSprite.GetFrame() < 20 &&
        ent.ToNPC().State == 9
      ) {
        spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
        return;
      }

      if (
        EntSprite.IsPlaying("Attack03") &&
        EntSprite.GetFrame() < 15 &&
        ent.ToNPC().State == 10
      ) {
        spawnTracer(ent, 90, [1.3, 4.7], 40, false, 2, 0, 0, [110, -110]);
        return;
      }

      if (
        (EntSprite.IsPlaying("Attack02") && EntSprite.GetFrame() > 20) ||
        (EntSprite.IsPlaying("Attack03") && EntSprite.GetFrame() > 15) ||
        EntSprite.IsFinished("Attack02") ||
        EntSprite.IsFinished("Attack03")
      ) {
        if (data.IndicatorBrim) {
          data.Danger = 0;
          RemoveLaserIndicator(ent);
          return;
        }
      }
    }
  }
  if (fileName.includes("TheLamb.anm2")) {
    if (EntSprite.IsPlaying("HeadCharge") && ent.ToNPC().State == 11) {
      spawnTracer(ent, 90, [1, 2, 3, 4], 50, false, 2, 0, 0);
      return;
    }

    if (
      (EntSprite.IsPlaying("HeadShoot2Start") && EntSprite.GetFrame() > 10) ||
      EntSprite.IsFinished("HeadShoot2Start")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
  if (fileName.includes("Haunt.anm2")) {
    if (ent.SubType == 0) {
      if (
        EntSprite.IsPlaying("LaserNoSkin") &&
        ent.ToNPC().State == 9 &&
        EntSprite.GetFrame() < 20
      ) {
        spawnTracer(ent, 90, [1], 50, false, 2, 0, 0);
        return;
      }
    }
    if (ent.SubType == 2) {
      if (
        EntSprite.IsPlaying("LaserNoSkin") &&
        ent.ToNPC().State == 9 &&
        EntSprite.GetFrame() < 20
      ) {
        spawnTracer(ent, 90, [0.5, 1.5], 50, false, 2, 0, 0);
        return;
      }
    }
    if (
      (EntSprite.IsPlaying("LaserNoSkin") && EntSprite.GetFrame() > 20) ||
      EntSprite.IsFinished("LaserNoSkin")
    ) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
    if (data.IndicatorBrim) {
      if (
        EntSprite.IsFinished("LaserShot") ||
        EntSprite.IsFinished("Attack2") ||
        EntSprite.IsFinished("LaserShot") ||
        EntSprite.IsFinished("Taunt") ||
        EntSprite.IsFinished("Attack2Alt") ||
        EntSprite.IsFinished("Attack01") ||
        EntSprite.IsFinished("Blasting") ||
        EntSprite.IsFinished("AttackAlt01") ||
        EntSprite.IsFinished("AttackAlt02") ||
        EntSprite.IsFinished("LaserStartDown") ||
        EntSprite.IsFinished("LaserStartSide") ||
        EntSprite.IsFinished("LaserStartUp") ||
        EntSprite.IsFinished("Attack02") ||
        EntSprite.IsFinished("Attack03") ||
        EntSprite.IsFinished("HeadShoot2Start") ||
        EntSprite.IsFinished("LaserNoSkin")
      ) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
  }
}
