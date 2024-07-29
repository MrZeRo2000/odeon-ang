import {Router} from "@angular/router";
import {isArtifactTypeMusic, isArtifactTypeVideo} from "../../../model/artifacts";

export function artifactNavigation(router: Router, artifactId: number, artifactTypeId: number): void {
  let routePath = ''
  if (isArtifactTypeMusic(artifactTypeId)) {
    routePath = 'artifacts'
  } else if (isArtifactTypeVideo(artifactTypeId)) {
    routePath = 'artifacts-video'
  }
  if (!!routePath) {
    router.navigate(
      [routePath],
      {queryParams: {'artifactId': artifactId, 'artifactTypeId': artifactTypeId}})
  }
}
