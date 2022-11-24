let active = undefined;
export function RevCompatibility(
  ent,
  EntSprite,
  data,
  IRFconfig,
  spawnTracer,
  RemoveLaserIndicator,
  AfterDedLaserIndicator,
  TargetLaserIndicator,
  REVEL
): void {
  //Punker

  if(ent.Type == 479 && ent.Variant == 2678 && IRFconfig.Punker){
    if(EntSprite.IsPlaying("Attack2 Left Start") && (EntSprite.GetFrame() > 8 && EntSprite.GetFrame() < 29)){
      spawnTracer(ent, 90, [2], 35, false, 2, 0, 0);
      return;
    }
    if(EntSprite.IsPlaying("Attack2 Right Start") && (EntSprite.GetFrame() > 8 && EntSprite.GetFrame() < 29)){
      spawnTracer(ent, 90, [4], 35, false, 2, 0, 0);
      return;
    }
    if((EntSprite.IsPlaying("Attack2 Right Start") || EntSprite.IsPlaying("Attack2 Left Start") && EntSprite.GetFrame() > 29)){
      data.Danger = 0;
      RemoveLaserIndicator(ent)
      return;
    }
  }//Cats
  else if(ent.Type == 505 && (ent.Variant !== 2680 && ent.Variant !== 2678) && EntSprite.IsPlaying("WrappedIdle") == false){active = ent}
  else if(ent.Type == 505 && ent.Variant == 2680 && IRFconfig.Cat){
    if(EntSprite.IsPlaying("BrimstoneStart") && (EntSprite.GetFrame() < 32 && EntSprite.GetFrame() > 9) ){
      data.Rotate = true;
      let angle = (
        ent.Position - active.Position
      ).GetAngleDegrees();
      TargetLaserIndicator(ent, [angle], [180], 40, false, 2, 0, 0);
      return;
    }
    if((EntSprite.IsPlaying("BrimstoneStart") && EntSprite.GetFrame() > 32)){
      data.Danger = 0;
      RemoveLaserIndicator(ent)
      return;
    }
  }//Maxwell
  else if (ent.Type == 676 && ent.Variant == 845 && IRFconfig.Maxwell) {
    if (EntSprite.IsPlaying("Door Brimstone Start") && (EntSprite.GetFrame() < 57 && EntSprite.GetFrame() > 40)) {
      //let rotation = EntSprite.Rotation + 90;
      spawnTracer(ent, ent.SpriteRotation + 90, [1], 0, false, 2, 0, 0);
      return;
    }

    if (EntSprite.IsPlaying("Door Brimstone Start") && (EntSprite.GetFrame() > 57)) {
      if (data.IndicatorBrim) {
        data.Danger = 0;
        RemoveLaserIndicator(ent);
        return;
      }
    }
    //
  }
}